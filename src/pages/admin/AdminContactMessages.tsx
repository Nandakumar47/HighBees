import React, { useState } from "react";
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
} from "lucide-react";
import Select from "../../components/common/Input/Select";
import MessageModal from "../../components/MessageModal";
import Input from "../../components/common/Input/Input";

const AdminContactMessages = () => {
  const { logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data - In production, this would come from an API
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      phone: "+1 (555) 321-0987",
      subject: "Group booking inquiry for family reunion",
      message:
        "Hi, I'm planning a family reunion trip for 15 people to Greece. We're looking for accommodations and activities suitable for all ages. Could you help us plan this? We have a budget of around $30,000 for the entire group and are flexible with dates in June or July.",
      status: "New",
      submittedAt: "2024-01-15 3:45 PM",
      priority: "High",
      communicationHistory: [],
    },
    {
      id: 2,
      name: "David Brown",
      email: "david.brown@email.com",
      phone: "+1 (555) 654-3210",
      subject: "Travel insurance question",
      message:
        "I have a question about travel insurance coverage for my upcoming trip to Iceland. What options do you recommend for adventure activities like glacier hiking and Northern Lights tours? I want to make sure I'm fully covered.",
      status: "In Progress",
      submittedAt: "2024-01-14 11:20 AM",
      priority: "Medium",
      communicationHistory: [
        {
          date: "2024-01-14 2:00 PM",
          type: "email",
          content:
            "Sent comprehensive travel insurance options and coverage details.",
          agent: "Sarah Chen",
        },
      ],
    },
    {
      id: 3,
      name: "Lisa Garcia",
      email: "lisa.garcia@email.com",
      phone: "+1 (555) 789-0123",
      subject: "Cancellation policy inquiry",
      message:
        "I need to understand your cancellation policy for international trips. My travel dates might change due to work commitments. What are the penalties and how close to the departure date can I cancel?",
      status: "Responded",
      submittedAt: "2024-01-13 9:15 AM",
      priority: "Low",
      communicationHistory: [
        {
          date: "2024-01-13 11:00 AM",
          type: "email",
          content:
            "Provided detailed cancellation policy and flexible booking options.",
          agent: "Michael Rodriguez",
        },
        {
          date: "2024-01-13 3:30 PM",
          type: "phone",
          content:
            "Follow-up call to clarify specific concerns about work schedule.",
          agent: "Michael Rodriguez",
        },
      ],
    },
    {
      id: 4,
      name: "Robert Johnson",
      email: "robert.j@email.com",
      phone: "+1 (555) 456-7890",
      subject: "Honeymoon package customization",
      message:
        "We're interested in your honeymoon packages but would like to customize the itinerary. Can we discuss options for a romantic trip to Santorini? We're looking for private dining experiences and couples spa treatments.",
      status: "New",
      submittedAt: "2024-01-12 2:30 PM",
      priority: "High",
      communicationHistory: [],
    },
    {
      id: 5,
      name: "Maria Rodriguez",
      email: "maria.rodriguez@email.com",
      phone: "+1 (555) 234-5678",
      subject: "Accessibility requirements",
      message:
        "I'm traveling with my elderly mother who uses a wheelchair. Do you have experience with accessible travel arrangements? We're interested in a European tour but need to ensure all accommodations and transportation are wheelchair accessible.",
      status: "In Progress",
      submittedAt: "2024-01-11 4:50 PM",
      priority: "High",
      communicationHistory: [
        {
          date: "2024-01-12 9:00 AM",
          type: "email",
          content:
            "Sent accessible travel options and specialized tour packages.",
          agent: "Emma Thompson",
        },
      ],
    },
    {
      id: 6,
      name: "James Wilson",
      email: "james.wilson@email.com",
      phone: "+1 (555) 345-6789",
      subject: "Corporate travel rates",
      message:
        "Our company is interested in establishing a corporate travel account. Could you provide information about business rates and services? We typically book 20-30 trips per year for our executives.",
      status: "Responded",
      submittedAt: "2024-01-10 10:15 AM",
      priority: "Medium",
      communicationHistory: [
        {
          date: "2024-01-10 2:00 PM",
          type: "email",
          content:
            "Sent corporate travel packages and volume discount information.",
          agent: "David Park",
        },
        {
          date: "2024-01-11 10:00 AM",
          type: "phone",
          content: "Discussed specific corporate needs and contract terms.",
          agent: "David Park",
        },
      ],
    },
  ]);

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const handleStatusUpdate = (id: number, newStatus: string) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === id ? { ...message, status: newStatus } : message
      )
    );
    setSelectedMessage((prev) =>
      prev ? { ...prev, status: newStatus } : null
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/admin/dashboard"
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <img
                src="/logo.png"
                alt="High Bees Holidays"
                className="h-8 w-auto"
              />
              <h1 className="text-xl font-bold text-gray-900">
                Contact Messages
              </h1>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Contact Messages
          </h2>
          <p className="text-gray-600">
            View and respond to customer contact form submissions
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
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
              <Filter className="w-5 h-5 text-gray-400" />
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                placeholder="All Status"
                className="min-w-[180px]"
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-2xl font-bold text-blue-600">
              {messages.filter((m) => m.status === "New").length}
            </div>
            <div className="text-sm text-gray-600">New Messages</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {messages.filter((m) => m.status === "In Progress").length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-2xl font-bold text-green-600">
              {messages.filter((m) => m.status === "Responded").length}
            </div>
            <div className="text-sm text-gray-600">Responded</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-2xl font-bold text-gray-900">
              {messages.length}
            </div>
            <div className="text-sm text-gray-600">Total Messages</div>
          </div>
        </div>

        {/* Messages List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="divide-y divide-gray-200">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {message.name}
                      </h3>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          message.status
                        )}`}
                      >
                        {message.status}
                      </span>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(
                          message.priority
                        )}`}
                      >
                        {message.priority} Priority
                      </span>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <Mail className="w-4 h-4" />
                        <span>{message.email}</span>
                      </div>
                      {message.phone && (
                        <div className="flex items-center space-x-1">
                          <Phone className="w-4 h-4" />
                          <span>{message.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{message.submittedAt}</span>
                      </div>
                    </div>

                    <h4 className="font-medium text-gray-900 mb-2">
                      {message.subject}
                    </h4>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {message.message}
                    </p>
                  </div>

                  <div className="ml-4 flex-shrink-0">
                    <button
                      onClick={() => handleViewMessage(message)}
                      className="text-primary-600 hover:text-primary-900 flex items-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredMessages.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <MessageSquare className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No messages found
              </h3>
              <p className="text-gray-500">
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
