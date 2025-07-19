import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Users, 
  MessageSquare, 
  BarChart3, 
  Calendar,
  LogOut,
  Mail,
  Phone,
  MapPin,
  TrendingUp,
  Target
} from 'lucide-react';
import PageLoader from '../../components/PageLoader';
import { useLoading } from '../../hooks/useLoading';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const { isLoading, withLoading } = useLoading(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      await withLoading(async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock data for calculations
        const enquiries = [
          { id: 1, status: 'New' },
          { id: 2, status: 'In Progress' },
          { id: 3, status: 'Converted' },
          { id: 4, status: 'New' },
          { id: 5, status: 'Closed' },
          { id: 6, status: 'Converted' },
          { id: 7, status: 'In Progress' },
          { id: 8, status: 'Converted' }
        ];

        const messages = [
          { id: 1, status: 'New' },
          { id: 2, status: 'In Progress' },
          { id: 3, status: 'Responded' },
          { id: 4, status: 'New' },
          { id: 5, status: 'In Progress' },
          { id: 6, status: 'Responded' }
        ];

        // Calculate conversion rate
        const totalEnquiries = enquiries.length;
        const convertedEnquiries = enquiries.filter(e => e.status === 'Converted').length;
        const conversionRate = totalEnquiries > 0 ? Math.round((convertedEnquiries / totalEnquiries) * 100) : 0;

        const stats = [
          {
            title: 'Total Enquiries',
            value: totalEnquiries.toString(),
            change: '+12%',
            icon: Users,
            color: 'bg-blue-500'
          },
          {
            title: 'Contact Messages',
            value: messages.length.toString(),
            change: '+8%',
            icon: MessageSquare,
            color: 'bg-green-500'
          },
          {
            title: 'This Month',
            value: '45',
            change: '+23%',
            icon: Calendar,
            color: 'bg-purple-500'
          },
          {
            title: 'Conversion Rate',
            value: `${conversionRate}%`,
            change: conversionRate >= 30 ? '+5%' : '-2%',
            icon: Target,
            color: 'bg-orange-500'
          }
        ];

        const recentEnquiries = [
          {
            id: 1,
            name: 'John Smith',
            destination: 'Santorini, Greece',
            date: '2024-01-15',
            status: 'New'
          },
          {
            id: 2,
            name: 'Sarah Johnson',
            destination: 'Maldives',
            date: '2024-01-14',
            status: 'In Progress'
          },
          {
            id: 3,
            name: 'Mike Chen',
            destination: 'Kyoto, Japan',
            date: '2024-01-13',
            status: 'Converted'
          }
        ];

        const recentMessages = [
          {
            id: 1,
            name: 'Emma Wilson',
            email: 'emma@email.com',
            subject: 'Group booking inquiry',
            date: '2024-01-15'
          },
          {
            id: 2,
            name: 'David Brown',
            email: 'david@email.com',
            subject: 'Travel insurance question',
            date: '2024-01-14'
          },
          {
            id: 3,
            name: 'Lisa Garcia',
            email: 'lisa@email.com',
            subject: 'Cancellation policy',
            date: '2024-01-13'
          }
        ];

        setDashboardData({
          stats,
          recentEnquiries,
          recentMessages,
          totalEnquiries,
          convertedEnquiries,
          conversionRate
        });
      });
    };

    loadDashboardData();
  }, [withLoading]);

  if (isLoading) {
    return <PageLoader message="Loading dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <img 
                src="/ChatGPT Image Jun 21, 2025, 12_51_51 AM.png" 
                alt="High Bees Holidays" 
                className="h-8 w-auto"
              />
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, Admin!</h2>
          <p className="text-gray-600">Here's what's happening with High Bees Holidays today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardData?.stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`${stat.color} rounded-lg p-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Conversion Metrics */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{dashboardData?.totalEnquiries}</div>
              <div className="text-sm text-gray-600">Total Enquiries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{dashboardData?.convertedEnquiries}</div>
              <div className="text-sm text-gray-600">Converted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">{dashboardData?.conversionRate}%</div>
              <div className="text-sm text-gray-600">Conversion Rate</div>
            </div>
          </div>
          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${dashboardData?.conversionRate}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {dashboardData?.conversionRate >= 30 ? 'Excellent conversion rate!' : 'Room for improvement in conversion rate.'}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/admin/enquiries"
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 rounded-lg p-3 group-hover:bg-blue-200 transition-colors">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">View All Enquiries</h3>
                <p className="text-gray-600">Manage trip enquiries and bookings</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/contact-messages"
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 rounded-lg p-3 group-hover:bg-green-200 transition-colors">
                <MessageSquare className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Contact Messages</h3>
                <p className="text-gray-600">View and respond to customer messages</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Enquiries */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Enquiries</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {dashboardData?.recentEnquiries.map((enquiry) => (
                  <div key={enquiry.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{enquiry.name}</p>
                      <p className="text-sm text-gray-600">{enquiry.destination}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        enquiry.status === 'New' ? 'bg-blue-100 text-blue-800' :
                        enquiry.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        enquiry.status === 'Converted' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {enquiry.status}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">{enquiry.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/admin/enquiries"
                className="block text-center text-primary-500 hover:text-primary-600 font-medium mt-4"
              >
                View All Enquiries
              </Link>
            </div>
          </div>

          {/* Recent Messages */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Messages</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {dashboardData?.recentMessages.map((message) => (
                  <div key={message.id} className="flex items-start space-x-3">
                    <div className="bg-gray-100 rounded-full p-2">
                      <Mail className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{message.name}</p>
                      <p className="text-sm text-gray-600">{message.subject}</p>
                      <p className="text-xs text-gray-500">{message.email} • {message.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/admin/contact-messages"
                className="block text-center text-primary-500 hover:text-primary-600 font-medium mt-4"
              >
                View All Messages
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;