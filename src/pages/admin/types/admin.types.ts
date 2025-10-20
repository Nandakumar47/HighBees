import { Enquiry } from "../../../services/types/enquiry.types";
import { ContactMessage } from "../../../services/types/contact.types";

export interface DashboardStats {
  title: string;
  value: string;
  change: string;
  icon: any;
  color: string;
}

export interface RecentEnquiry {
  id: number;
  name: string;
  destination: string;
  date: string;
  status: string;
}

export interface RecentMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  date: string;
}

export interface DashboardData {
  stats: DashboardStats[];
  recentEnquiries: RecentEnquiry[];
  recentMessages: RecentMessage[];
  totalEnquiries: number;
  convertedEnquiries: number;
  conversionRate: number;
}

export interface EnquiryModalProps {
  enquiry: Enquiry | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (id: number, newStatus: string) => void;
}

export interface MessageModalProps {
  message: ContactMessage | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (id: number, newStatus: string) => void;
}
