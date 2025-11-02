import axios from "axios";
import { CreateDestinationData } from "./types/destination.types";

class DestinationService {
  private baseURL = "/api/destination";

  // Create a new destination
  async createDestination(
    destinationData: CreateDestinationData
  ): Promise<any> {
    try {
      const response = await axios.post(this.baseURL, destinationData);
      return response.data;
    } catch (error) {
      console.error("Error creating destination:", error);
      throw error;
    }
  }

  // Get destination by ID
  async getDestinationById(id: number): Promise<any> {
    try {
      const response = await axios.get(`${this.baseURL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching destination ${id}:`, error);
      throw error;
    }
  }
}

export const destinationService = new DestinationService();

