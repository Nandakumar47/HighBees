import axios from "axios";
import {
  ContactMessage,
  CreateContactMessageData,
  UpdateContactMessageData,
} from "./types/contact.types";

class ContactService {
  private baseURL = "/api/contact";

  // Get all contact messages
  async getAllMessages(): Promise<ContactMessage[]> {
    try {
      const response = await axios.get(this.baseURL);
      return response.data;
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      throw error;
    }
  }

  // Get contact message by ID
  async getMessageById(id: number): Promise<ContactMessage> {
    try {
      const response = await axios.get(`${this.baseURL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching contact message ${id}:`, error);
      throw error;
    }
  }

  // Create a new contact message
  async createMessage(
    messageData: CreateContactMessageData
  ): Promise<ContactMessage> {
    try {
      const response = await axios.post(this.baseURL, messageData);
      return response.data;
    } catch (error) {
      console.error("Error creating contact message:", error);
      throw error;
    }
  }

  // Update an existing contact message
  async updateMessage(
    messageData: UpdateContactMessageData
  ): Promise<ContactMessage> {
    try {
      const response = await axios.put(this.baseURL, messageData);
      return response.data;
    } catch (error) {
      console.error(`Error updating contact message ${messageData.id}:`, error);
      throw error;
    }
  }

  // Delete a contact message by ID
  async deleteMessage(id: number): Promise<void> {
    try {
      await axios.delete(`${this.baseURL}/${id}`);
    } catch (error) {
      console.error(`Error deleting contact message ${id}:`, error);
      throw error;
    }
  }
}

export const contactService = new ContactService();
