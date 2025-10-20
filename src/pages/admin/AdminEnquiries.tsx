import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
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
  DollarSign,
  Trash2,
} from "lucide-react";
import Select from "../../components/common/Input/Select";
import EnquiryModal from "../../components/EnquiryModal";
import PageLoader from "../../components/PageLoader";
import { useLoading } from "../../hooks/useLoading";
import Input from "../../components/common/Input/Input";
import { enquiryService } from "../../services/enquiryService";
import { Enquiry } from "../../services/types/enquiry.types";
import { useToast } from "../../components/common/Toast/Toast";

const AdminEnquiries = () => {
  const { logout } = useAuth();
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const { isLoading, withLoading } = useLoading(true);

  useEffect(() => {
    const loadEnquiries = async () => {
      await withLoading(async () => {
        try {
          const enquiriesData = await enquiryService.getAllEnquiries();
          setEnquiries(enquiriesData);
        } catch (error) {
          console.error("Error loading enquiries:", error);
          showToast("Failed to load enquiries. Please try again.", "error");
        }
      });
    };

    loadEnquiries();
  }, [withLoading, showToast]);

  const filteredEnquiries = enquiries.filter((enquiry) => {
    const matchesSearch =
      enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      enquiry.status.toLowerCase().replace(" ", "-") === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Converted":
        return "bg-green-100 text-green-800";
      case "Closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewEnquiry = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    setIsModalOpen(true);
  };

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    try {
      await enquiryService.updateEnquiry({
        id,
        status: newStatus as "New" | "In Progress" | "Converted" | "Closed",
      });

      setEnquiries((prev: Enquiry[]) =>
        prev.map((enquiry: Enquiry) =>
          enquiry.id === id
            ? {
                ...enquiry,
                status: newStatus as
                  | "New"
                  | "In Progress"
                  | "Converted"
                  | "Closed",
              }
            : enquiry
        )
      );
      setSelectedEnquiry((prev: Enquiry | null) =>
        prev
          ? {
              ...prev,
              status: newStatus as
                | "New"
                | "In Progress"
                | "Converted"
                | "Closed",
            }
          : null
      );

      showToast("Enquiry status updated successfully", "success");
    } catch (error) {
      console.error("Error updating enquiry status:", error);
      showToast("Failed to update enquiry status. Please try again.", "error");
    }
  };

  const handleDeleteEnquiry = async (id: number) => {
    if (
      window.confirm(
        "Are you sure you want to delete this enquiry? This action cannot be undone."
      )
    ) {
      try {
        await enquiryService.deleteEnquiry(id);
        setEnquiries((prev: Enquiry[]) =>
          prev.filter((enquiry) => enquiry.id !== id)
        );
        showToast("Enquiry deleted successfully", "success");
      } catch (error) {
        console.error("Error deleting enquiry:", error);
        showToast("Failed to delete enquiry. Please try again.", "error");
      }
    }
  };

  // Calculate conversion rate
  const totalEnquiries = enquiries.length;
  const convertedEnquiries = enquiries.filter(
    (e) => e.status === "Converted"
  ).length;
  const conversionRate =
    totalEnquiries > 0
      ? Math.round((convertedEnquiries / totalEnquiries) * 100)
      : 0;

  if (isLoading) {
    return <PageLoader message="Loading enquiries..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link
                to="/admin/dashboard"
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <img
                src="/logo.png"
                alt="High Bees Holidays"
                className="h-6 sm:h-8 w-auto"
              />
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                Travel Enquiries
              </h1>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Travel Enquiries
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Manage and respond to customer travel enquiries
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search by name, email, or destination..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={Search}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                placeholder="All Status"
                className="min-w-[140px] sm:min-w-[180px]"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="converted">Converted</option>
                <option value="closed">Closed</option>
              </Select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-blue-600">
              {enquiries.filter((e) => e.status === "New").length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">
              New Enquiries
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-yellow-600">
              {enquiries.filter((e) => e.status === "In Progress").length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-green-600">
              {convertedEnquiries}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Converted</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-gray-600">
              {enquiries.filter((e) => e.status === "Closed").length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Closed</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-primary-600">
              {conversionRate ? `${conversionRate}%` : "-"}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">
              Conversion Rate
            </div>
          </div>
        </div>

        {/* Enquiries Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Trip Details
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Travel Info
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Submitted
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEnquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {enquiry.name}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500 flex items-center space-x-1">
                          <Mail className="w-3 h-3" />
                          <span className="truncate">{enquiry.email}</span>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500 flex items-center space-x-1">
                          <Phone className="w-3 h-3" />
                          <span>{enquiry.phone}</span>
                        </div>
                        {/* Mobile: Show trip details inline */}
                        <div className="sm:hidden mt-2">
                          <div className="text-xs text-gray-900 flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{enquiry.destination}</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {enquiry.departureDate} • {enquiry.duration}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
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
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                      <div>
                        <div className="text-sm text-gray-900 flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{enquiry.departureDate}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {enquiry.duration}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>
                            {enquiry.adults} adults, {enquiry.children} children
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          enquiry.status
                        )}`}
                      >
                        {enquiry.status}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                      {enquiry.submittedAt}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewEnquiry(enquiry)}
                          className="text-primary-600 hover:text-primary-900 flex items-center space-x-1"
                        >
                          <Eye className="w-4 h-4" />
                          <span className="hidden sm:inline">View</span>
                        </button>
                        <button
                          onClick={() => handleDeleteEnquiry(enquiry.id)}
                          className="text-red-600 hover:text-red-900 flex items-center space-x-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredEnquiries.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <div className="text-gray-400 mb-3 sm:mb-4">
                <Search className="w-10 h-10 sm:w-12 sm:h-12 mx-auto" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                No enquiries found
              </h3>
              <p className="text-sm sm:text-base text-gray-500">
                Try adjusting your search criteria
              </p>
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
