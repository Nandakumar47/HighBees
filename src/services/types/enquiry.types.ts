export interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  adults: number;
  children: number;
  destination: string;
  departureCity: string;
  departureDate: string;
  duration: string;
  budget: string;
  status: "New" | "In Progress" | "Converted" | "Closed";
  submittedAt: string;
  message: string;
  communicationHistory?: Array<{
    date: string;
    type: "email" | "phone" | "note";
    content: string;
    agent: string;
  }>;
}

export interface CreateEnquiryData {
  name: string;
  email: string;
  phone: string;
  adults: number;
  children: number;
  destination: string;
  departureCity: string;
  departureDate: string;
  duration: string;
  budget: string;
  message: string;
}

export interface UpdateEnquiryData {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
  adults?: number;
  children?: number;
  destination?: string;
  departureCity?: string;
  departureDate?: string;
  duration?: string;
  budget?: string;
  status?: "New" | "In Progress" | "Converted" | "Closed";
  message?: string;
}
