import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  ArrowLeft, 
  LogOut, 
  Search, 
  Filter, 
  Eye, 
  Mail, 
  Phone,
  Calendar,
  MapPin,
  Users,
  DollarSign
} from 'lucide-react';
import EnquiryModal from '../../components/EnquiryModal';
import PageLoader from '../../components/PageLoader';
import { TableRowSkeleton } from '../../components/SkeletonLoader';
import { useLoading } from '../../hooks/useLoading';

const AdminEnquiries = () => {
  const { logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enquiries, setEnquiries] = useState([]);
  const { isLoading, withLoading } = useLoading(true);

  useEffect(() => {
    const loadEnquiries = async () => {
      await withLoading(async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const enquiriesData = [
          {
            id: 1,
            name: 'John Smith',
            email: 'john.smith@email.com',
            phone: '+1 (555) 123-4567',
            adults: 2,
            children: 1,
            destination: 'Santorini, Greece',
            departureCity: 'New York',
            departureDate: '2024-03-15',
            duration: '7 days',
            budget: '$2,000 - $3,000',
            status: 'New',
            submittedAt: '2024-01-15 10:30 AM',
            message: 'We are looking for a romantic getaway with our child. Would prefer family-friendly accommodations with beautiful sunset views.',
            communicationHistory: [
              {
                date: '2024-01-15 2:30 PM',
                type: 'email',
                content: 'Initial enquiry received and acknowledged.',
                agent: 'Sarah Chen'
              }
            ]
          },
          {
            id: 2,
            name: 'Sarah Johnson',
            email: 'sarah.j@email.com',
            phone: '+1 (555) 987-6543',
            adults: 2,
            children: 0,
            destination: 'Maldives',
            departureCity: 'Los Angeles',
            departureDate: '2024-04-20',
            duration: '5 days',
            budget: '$5,000 - $10,000',
            status: 'In Progress',
            submittedAt: '2024-01-14 2:15 PM',
            message: 'Honeymoon trip. Looking for overwater bungalows and spa treatments.',
            communicationHistory: [
              {
                date: '2024-01-14 3:00 PM',
                type: 'email',
                content: 'Sent initial honeymoon package options.',
                agent: 'Michael Rodriguez'
              },
              {
                date: '2024-01-15 10:00 AM',
                type: 'phone',
                content: 'Discussed specific resort preferences and dietary requirements.',
                agent: 'Michael Rodriguez'
              }
            ]
          },
          {
            id: 3,
            name: 'Mike Chen',
            email: 'mike.chen@email.com',
            phone: '+1 (555) 456-7890',
            adults: 1,
            children: 0,
            destination: 'Kyoto, Japan',
            departureCity: 'San Francisco',
            departureDate: '2024-05-10',
            duration: '10 days',
            budget: '$3,000 - $5,000',
            status: 'Converted',
            submittedAt: '2024-01-13 9:45 AM',
            message: 'Solo cultural trip. Interested in traditional experiences and temples.',
            communicationHistory: [
              {
                date: '2024-01-13 11:00 AM',
                type: 'email',
                content: 'Sent cultural tour itinerary options.',
                agent: 'Emma Thompson'
              },
              {
                date: '2024-01-14 2:00 PM',
                type: 'phone',
                content: 'Finalized booking and payment processed.',
                agent: 'Emma Thompson'
              }
            ]
          },
          {
            id: 4,
            name: 'Emma Wilson',
            email: 'emma.wilson@email.com',
            phone: '+1 (555) 321-0987',
            adults: 4,
            children: 2,
            destination: 'Costa Rica',
            departureCity: 'Miami',
            departureDate: '2024-06-01',
            duration: '8 days',
            budget: '$1,000 - $2,000',
            status: 'New',
            submittedAt: '2024-01-12 4:20 PM',
            message: 'Family adventure trip with teenagers. Looking for eco-friendly accommodations and wildlife experiences.',
            communicationHistory: []
          },
          {
            id: 5,
            name: 'David Brown',
            email: 'david.brown@email.com',
            phone: '+1 (555) 654-3210',
            adults: 2,
            children: 0,
            destination: 'Northern Lights, Iceland',
            departureCity: 'Boston',
            departureDate: '2024-02-28',
            duration: '6 days',
            budget: '$2,000 - $3,000',
            status: 'Closed',
            submittedAt: '2024-01-11 11:10 AM',
            message: 'Winter trip to see Northern Lights. Interested in glacier tours and hot springs.',
            communicationHistory: [
              {
                date: '2024-01-11 1:00 PM',
                type: 'email',
                content: 'Sent Northern Lights tour packages.',
                agent: 'David Park'
              },
              {
                date: '2024-01-12 9:00 AM',
                type: 'note',
                content: 'Customer decided to postpone trip due to personal reasons.',
                agent: 'David Park'
              }
            ]
          }
        ];
        
        setEnquiries(enquiriesData);
      });
    };

    loadEnquiries();
  }, [withLoading]);

  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesSearch = enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         enquiry.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || enquiry.status.toLowerCase().replace(' ', '-') === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Converted':
        return 'bg-green-100 text-green-800';
      case 'Closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewEnquiry = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setIsModalOpen(true);
  };

  const handleStatusUpdate = (id: number, newStatus: string) => {
    setEnquiries(prev => prev.map(enquiry => 
      enquiry.id === id ? { ...enquiry, status: newStatus } : enquiry
    ));
    setSelectedEnquiry(prev => prev ? { ...prev, status: newStatus } : null);
  };

  // Calculate conversion rate
  const totalEnquiries = enquiries.length;
  const convertedEnquiries = enquiries.filter(e => e.status === 'Converted').length;
  const conversionRate = totalEnquiries > 0 ? Math.round((convertedEnquiries / totalEnquiries) * 100) : 0;

  if (isLoading) {
    return <PageLoader message="Loading enquiries..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/admin/dashboard" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <img 
                src="/ChatGPT Image Jun 21, 2025, 12_51_51 AM.png" 
                alt="High Bees Holidays" 
                className="h-8 w-auto"
              />
              <h1 className="text-xl font-bold text-gray-900">Travel Enquiries</h1>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Travel Enquiries</h2>
          <p className="text-gray-600">Manage and respond to customer travel enquiries</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, email, or destination..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="converted">Converted</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-2xl font-bold text-blue-600">{enquiries.filter(e => e.status === 'New').length}</div>
            <div className="text-sm text-gray-600">New Enquiries</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-2xl font-bold text-yellow-600">{enquiries.filter(e => e.status === 'In Progress').length}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-2xl font-bold text-green-600">{convertedEnquiries}</div>
            <div className="text-sm text-gray-600">Converted</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-2xl font-bold text-gray-600">{enquiries.filter(e => e.status === 'Closed').length}</div>
            <div className="text-sm text-gray-600">Closed</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-2xl font-bold text-primary-600">{conversionRate}%</div>
            <div className="text-sm text-gray-600">Conversion Rate</div>
          </div>
        </div>

        {/* Enquiries Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trip Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Travel Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEnquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{enquiry.name}</div>
                        <div className="text-sm text-gray-500 flex items-center space-x-1">
                          <Mail className="w-3 h-3" />
                          <span>{enquiry.email}</span>
                        </div>
                        <div className="text-sm text-gray-500 flex items-center space-x-1">
                          <Phone className="w-3 h-3" />
                          <span>{enquiry.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{enquiry.destination}</span>
                        </div>
                        <div className="text-sm text-gray-500 flex items-center space-x-1">
                          <DollarSign className="w-3 h-3" />
                          <span>{enquiry.budget}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900 flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{enquiry.departureDate}</span>
                        </div>
                        <div className="text-sm text-gray-500">{enquiry.duration}</div>
                        <div className="text-sm text-gray-500 flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{enquiry.adults} adults, {enquiry.children} children</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(enquiry.status)}`}>
                        {enquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {enquiry.submittedAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleViewEnquiry(enquiry)}
                        className="text-primary-600 hover:text-primary-900 flex items-center space-x-1"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredEnquiries.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No enquiries found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        enquiry={selectedEnquiry}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEnquiry(null);
        }}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
};

export default AdminEnquiries;