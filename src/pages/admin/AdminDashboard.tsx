import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  Users,
  MessageSquare,
  Calendar,
  LogOut,
  Mail,
  Target,
} from "lucide-react";
import PageLoader from "../../components/PageLoader";
import { useLoading } from "../../hooks/useLoading";
import { enquiryService } from "../../services/enquiryService";
import { contactService } from "../../services/contactService";
import { Enquiry } from "../../services/types/enquiry.types";
import { ContactMessage } from "../../services/types/contact.types";
import { DashboardData } from "./types/admin.types";
import { useToast } from "../../components/common/Toast/Toast";

const AdminDashboard = () => {
  const { logout } = useAuth();
  const { showToast } = useToast();
  const { isLoading, withLoading } = useLoading(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );

  useEffect(() => {
    const loadDashboardData = async () => {
      await withLoading(async () => {
        try {
          // Fetch real data from APIs
          const [enquiries, messages] = await Promise.all([
            enquiryService.getAllEnquiries(),
            contactService.getAllMessages(),
          ]);

          // Calculate conversion rate
          const totalEnquiries = enquiries.length;
          const convertedEnquiries = enquiries.filter(
            (e) => e.status === "Converted"
          ).length;
          const conversionRate =
            totalEnquiries > 0
              ? Math.round((convertedEnquiries / totalEnquiries) * 100)
              : 0;

          // Get recent enquiries (last 3)
          const recentEnquiries = enquiries
            .sort(
              (a, b) =>
                new Date(b.submittedAt).getTime() -
                new Date(a.submittedAt).getTime()
            )
            .slice(0, 3)
            .map((enquiry) => ({
              id: enquiry.id,
              name: enquiry.name,
              destination: enquiry.destination,
              date: new Date(enquiry.submittedAt).toLocaleDateString(),
              status: enquiry.status,
            }));

          // Get recent messages (last 3)
          const recentMessages = messages
            .sort(
              (a, b) =>
                new Date(b.submittedAt).getTime() -
                new Date(a.submittedAt).getTime()
            )
            .slice(0, 3)
            .map((message) => ({
              id: message.id,
              name: message.name,
              email: message.email,
              subject: message.subject,
              date: new Date(message.submittedAt).toLocaleDateString(),
            }));

          const stats = [
            {
              title: "Total Enquiries",
              value: totalEnquiries.toString(),
              change: "+12%", // This could be calculated from historical data
              icon: Users,
              color: "bg-blue-500",
            },
            {
              title: "Contact Messages",
              value: messages.length.toString(),
              change: "+8%", // This could be calculated from historical data
              icon: MessageSquare,
              color: "bg-green-500",
            },
            {
              title: "This Month",
              value: enquiries
                .filter((e) => {
                  const enquiryDate = new Date(e.submittedAt);
                  const now = new Date();
                  return (
                    enquiryDate.getMonth() === now.getMonth() &&
                    enquiryDate.getFullYear() === now.getFullYear()
                  );
                })
                .length.toString(),
              change: "+23%", // This could be calculated from historical data
              icon: Calendar,
              color: "bg-purple-500",
            },
            {
              title: "Conversion Rate",
              value: `${conversionRate}%`,
              change: conversionRate >= 30 ? "+5%" : "-2%",
              icon: Target,
              color: "bg-orange-500",
            },
          ];

          setDashboardData({
            stats,
            recentEnquiries,
            recentMessages,
            totalEnquiries,
            convertedEnquiries,
            conversionRate,
          });
        } catch (error) {
          console.error("Error loading dashboard data:", error);
          showToast(
            "Failed to load dashboard data. Please try again.",
            "error"
          );
        }
      });
    };

    loadDashboardData();
  }, [withLoading, showToast]);

  if (isLoading) {
    return <PageLoader message="Loading dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <img
                src="/logo.png"
                alt="High Bees Holidays"
                className="h-6 sm:h-8 w-auto"
              />
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                Admin Dashboard
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
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Welcome back, Admin!
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Here's what's happening with High Bees Holidays today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {dashboardData?.stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-4 sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p
                      className={`text-xs sm:text-sm ${
                        stat.change.startsWith("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`${stat.color} rounded-lg p-2 sm:p-3`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Conversion Metrics */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
            Conversion Metrics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">
                {dashboardData?.totalEnquiries ?? "-"}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                Total Enquiries
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2">
                {dashboardData?.convertedEnquiries ?? "-"}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Converted</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-1 sm:mb-2">
                {dashboardData?.conversionRate
                  ? `${dashboardData.conversionRate}%`
                  : "-"}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                Conversion Rate
              </div>
            </div>
          </div>
          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${dashboardData?.conversionRate || 0}%` }}
            ></div>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            {dashboardData?.conversionRate
              ? dashboardData.conversionRate >= 30
                ? "Excellent conversion rate!"
                : "Room for improvement in conversion rate."
              : "No data available for conversion analysis."}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Link
            to="/admin/enquiries"
            className="bg-white rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="bg-blue-100 rounded-lg p-2 sm:p-3 group-hover:bg-blue-200 transition-colors">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  View All Enquiries
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Manage trip enquiries and bookings
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/contact-messages"
            className="bg-white rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="bg-green-100 rounded-lg p-2 sm:p-3 group-hover:bg-green-200 transition-colors">
                <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Contact Messages
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  View and respond to customer messages
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Recent Enquiries */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Recent Enquiries
              </h3>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                {dashboardData?.recentEnquiries.map((enquiry) => (
                  <div
                    key={enquiry.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-gray-900 text-sm sm:text-base">
                        {enquiry.name}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {enquiry.destination}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          enquiry.status === "New"
                            ? "bg-blue-100 text-blue-800"
                            : enquiry.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : enquiry.status === "Converted"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {enquiry.status}
                      </span>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {enquiry.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/admin/enquiries"
                className="block text-center text-primary-500 hover:text-primary-600 font-medium mt-3 sm:mt-4 text-sm sm:text-base"
              >
                View All Enquiries
              </Link>
            </div>
          </div>

          {/* Recent Messages */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Recent Messages
              </h3>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                {dashboardData?.recentMessages.map((message) => (
                  <div
                    key={message.id}
                    className="flex items-start space-x-2 sm:space-x-3"
                  >
                    <div className="bg-gray-100 rounded-full p-1.5 sm:p-2">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm sm:text-base">
                        {message.name}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {message.subject}
                      </p>
                      <p className="text-xs text-gray-500">
                        {message.email} • {message.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/admin/contact-messages"
                className="block text-center text-primary-500 hover:text-primary-600 font-medium mt-3 sm:mt-4 text-sm sm:text-base"
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
