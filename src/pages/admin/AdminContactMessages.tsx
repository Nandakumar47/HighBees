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
  MessageSquare,
  Trash2,
} from "lucide-react";
import Select from "../../components/common/Input/Select";
import MessageModal from "../../components/MessageModal";
import Input from "../../components/common/Input/Input";
import { contactService } from "../../services/contactService";
import { ContactMessage } from "../../services/types/contact.types";
import { useToast } from "../../components/common/Toast/Toast";
import { useLoading } from "../../hooks/useLoading";
import PageLoader from "../../components/PageLoader";

const AdminContactMessages = () => {
  const { logout } = useAuth();
  const { showToast } = useToast();
  const { isLoading, withLoading } = useLoading(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    const loadMessages = async () => {
      await withLoading(async () => {
        try {
          const messagesData = await contactService.getAllMessages();
          setMessages(messagesData);
        } catch (error) {
          console.error("Error loading messages:", error);
          showToast("Failed to load messages. Please try again.", "error");
        }
      });
    };

    loadMessages();
  }, [withLoading, showToast]);

  if (isLoading) {
    return <PageLoader message="Loading messages..." />;
  }

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      message.status.toLowerCase().replace(" ", "-") === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Responded":
        return "bg-green-100 text-green-800";
      case "Closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    try {
      await contactService.updateMessage({
        id,
        status: newStatus as "New" | "In Progress" | "Responded" | "Closed",
      });

      setMessages((prev: ContactMessage[]) =>
        prev.map((message: ContactMessage) =>
          message.id === id
            ? {
                ...message,
                status: newStatus as
                  | "New"
                  | "In Progress"
                  | "Responded"
                  | "Closed",
              }
            : message
        )
      );
      setSelectedMessage((prev: ContactMessage | null) =>
        prev
          ? {
              ...prev,
              status: newStatus as
                | "New"
                | "In Progress"
                | "Responded"
                | "Closed",
            }
          : null
      );

      showToast("Message status updated successfully", "success");
    } catch (error) {
      console.error("Error updating message status:", error);
      showToast("Failed to update message status. Please try again.", "error");
    }
  };

  const handleDeleteMessage = async (id: number) => {
    if (
      window.confirm(
        "Are you sure you want to delete this message? This action cannot be undone."
      )
    ) {
      try {
        await contactService.deleteMessage(id);
        setMessages((prev: ContactMessage[]) =>
          prev.filter((message) => message.id !== id)
        );
        showToast("Message deleted successfully", "success");
      } catch (error) {
        console.error("Error deleting message:", error);
        showToast("Failed to delete message. Please try again.", "error");
      }
    }
  };

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
                Contact Messages
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
            Contact Messages
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            View and respond to customer contact form submissions
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search by name, email, or subject..."
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
                <option value="responded">Responded</option>
                <option value="closed">Closed</option>
              </Select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-blue-600">
              {messages.filter((m) => m.status === "New").length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">New Messages</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-yellow-600">
              {messages.filter((m) => m.status === "In Progress").length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-green-600">
              {messages.filter((m) => m.status === "Responded").length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Responded</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-gray-900">
              {messages.length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">
              Total Messages
            </div>
          </div>
        </div>

        {/* Messages List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="divide-y divide-gray-200">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className="p-4 sm:p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                      <h3 className="text-base sm:text-lg font-medium text-gray-900">
                        {message.name}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            message.status
                          )}`}
                        >
                          {message.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="truncate">{message.email}</span>
                      </div>
                      {message.phone && (
                        <div className="flex items-center space-x-1">
                          <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{message.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{message.submittedAt}</span>
                      </div>
                    </div>

                    <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">
                      {message.subject}
                    </h4>
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm sm:text-base">
                      {message.message}
                    </p>
                  </div>

                  <div className="ml-2 sm:ml-4 flex-shrink-0">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewMessage(message)}
                        className="text-primary-600 hover:text-primary-900 flex items-center space-x-1"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="hidden sm:inline">View</span>
                      </button>
                      <button
                        onClick={() => handleDeleteMessage(message.id)}
                        className="text-red-600 hover:text-red-900 flex items-center space-x-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredMessages.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <div className="text-gray-400 mb-3 sm:mb-4">
                <MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 mx-auto" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                No messages found
              </h3>
              <p className="text-sm sm:text-base text-gray-500">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Message Modal */}
      <MessageModal
        message={selectedMessage}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedMessage(null);
        }}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
};

export default AdminContactMessages;
