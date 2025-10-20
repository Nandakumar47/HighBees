import axios from "axios";
import {
  Enquiry,
  CreateEnquiryData,
  UpdateEnquiryData,
} from "./types/enquiry.types";

class EnquiryService {
  private baseURL = "/api/enquiry";

  // Get all enquiries
  async getAllEnquiries(): Promise<Enquiry[]> {
    try {
      const response = await axios.get(this.baseURL);
      return response.data;
    } catch (error) {
      console.error("Error fetching enquiries:", error);
      throw error;
    }
  }

  // Get enquiry by ID
  async getEnquiryById(id: number): Promise<Enquiry> {
    try {
      const response = await axios.get(`${this.baseURL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching enquiry ${id}:`, error);
      throw error;
    }
  }

  // Create a new enquiry
  async createEnquiry(enquiryData: CreateEnquiryData): Promise<Enquiry> {
    try {
      const response = await axios.post(this.baseURL, enquiryData);
      return response.data;
    } catch (error) {
      console.error("Error creating enquiry:", error);
      throw error;
    }
  }

  // Update an existing enquiry
  async updateEnquiry(enquiryData: UpdateEnquiryData): Promise<Enquiry> {
    try {
      const response = await axios.put(this.baseURL, enquiryData);
      return response.data;
    } catch (error) {
      console.error(`Error updating enquiry ${enquiryData.id}:`, error);
      throw error;
    }
  }

  // Delete an enquiry by ID
  async deleteEnquiry(id: number): Promise<void> {
    try {
      await axios.delete(`${this.baseURL}/${id}`);
    } catch (error) {
      console.error(`Error deleting enquiry ${id}:`, error);
      throw error;
    }
  }
}

export const enquiryService = new EnquiryService();
