import React, { useState } from "react";
import {
  X,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Save,
  Clock,
} from "lucide-react";
import LoadingButton from "./LoadingButton";
import Select from "./common/Input/Select";
import { useLoading } from "../hooks/useLoading";

interface Message {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: string;
  submittedAt: string;
  priority: string;
  communicationHistory?: Array<{
    date: string;
    type: "email" | "phone" | "note";
    content: string;
    agent: string;
  }>;
}

interface MessageModalProps {
  message: Message | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (id: number, newStatus: string) => void;
}

const MessageModal: React.FC<MessageModalProps> = ({
  message,
  isOpen,
  onClose,
  onStatusUpdate,
}) => {
  const [currentStatus, setCurrentStatus] = useState(message?.status || "");
  const { isLoading, withLoading } = useLoading();

  const statusOptions = [
    { value: "New", label: "New", color: "bg-blue-100 text-blue-800" },
    {
      value: "In Progress",
      label: "In Progress",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      value: "Responded",
      label: "Responded",
      color: "bg-green-100 text-green-800",
    },
    { value: "Closed", label: "Closed", color: "bg-gray-100 text-gray-800" },
  ];

  const handleStatusUpdate = async () => {
    if (!message || currentStatus === message.status) return;

    await withLoading(async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onStatusUpdate(message.id, currentStatus);
    });
  };

  const getStatusColor = (status: string) => {
    const statusOption = statusOptions.find(
      (option) => option.value === status
    );
    return statusOption?.color || "bg-gray-100 text-gray-800";
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

  if (!isOpen || !message) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Message Details
            </h2>
            <p className="text-gray-600">ID: #{message.id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Status Management */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Status Management
              </h3>
              <div className="flex items-center space-x-2">
                <span
                  className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                    message.status
                  )}`}
                >
                  {message.status}
                </span>
                <span
                  className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getPriorityColor(
                    message.priority
                  )}`}
                >
                  {message.priority} Priority
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Select
                value={currentStatus}
                onChange={(e) => setCurrentStatus(e.target.value)}
                disabled={isLoading}
                placeholder="Select status"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              <LoadingButton
                onClick={handleStatusUpdate}
                isLoading={isLoading}
                loadingText="Updating..."
                disabled={currentStatus === message.status}
                variant="primary"
              >
                <Save className="w-4 h-4" />
                <span>Update Status</span>
              </LoadingButton>
            </div>
          </div>

          {/* Customer Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Customer Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary-100 rounded-lg p-2">
                    <MessageSquare className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-semibold text-gray-900">
                      {message.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-primary-100 rounded-lg p-2">
                    <Mail className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-semibold text-gray-900">
                      {message.email}
                    </p>
                  </div>
                </div>
                {message.phone && (
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary-100 rounded-lg p-2">
                      <Phone className="w-5 h-5 text-primary-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="font-semibold text-gray-900">
                        {message.phone}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary-100 rounded-lg p-2">
                    <Clock className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Submitted</p>
                    <p className="font-semibold text-gray-900">
                      {message.submittedAt}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Message Content */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Message Content
            </h3>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Subject</h4>
                <p className="text-gray-700">{message.subject}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Message</h4>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {message.message}
                </p>
              </div>
            </div>
          </div>

          {/* Communication History */}
          {message.communicationHistory &&
            message.communicationHistory.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Communication History
                </h3>
                <div className="space-y-4">
                  {message.communicationHistory.map((comm, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              comm.type === "email"
                                ? "bg-blue-100 text-blue-800"
                                : comm.type === "phone"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {comm.type.charAt(0).toUpperCase() +
                              comm.type.slice(1)}
                          </span>
                          <span className="text-sm text-gray-600">
                            by {comm.agent}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {comm.date}
                        </span>
                      </div>
                      <p className="text-gray-700">{comm.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Close
          </button>
          <button className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors">
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
