export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "New" | "In Progress" | "Responded" | "Closed";
  submittedAt: string;
  phone?: string;
  company?: string;
}

export interface CreateContactMessageData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  company?: string;
}

export interface UpdateContactMessageData {
  id: number;
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  status?: "New" | "In Progress" | "Responded" | "Closed";
  phone?: string;
  company?: string;
}
