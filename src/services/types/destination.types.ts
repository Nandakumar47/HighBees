export interface CreateDestinationData {
  name: string;
  country: string;
  continent: string;
  heroImage: string;
  gallery: string[];
  description: string;
  highlights: string[];
  bestTimeToVisit: {
    months: string;
    weather: string;
    temperature: string;
  };
  visaRequirements: {
    required: boolean;
    details: string;
    processingTime?: string;
  };
  currency: {
    code: string;
    name: string;
    exchangeRate: string;
  };
  language: {
    primary: string;
    others?: string[];
  };
  weather: {
    climate: string;
    rainySeasons?: string;
    drySeasons?: string;
  };
  budgetRange: {
    budget: string;
    midRange: string;
    luxury: string;
  };
  itineraries: Array<{
    id: string;
    title: string;
    duration: string;
    price: number;
    highlights: string[];
    dayByDay: Array<{
      id: number;
      day: number;
      title: string;
      activities: string[];
    }>;
  }>;
  attractions: Array<{
    id?: number;
    name: string;
    type: string;
    coordinates: [number, number];
    description: string;
  }>;
  reviews: Array<{
    id: string;
    name: string;
    rating: number;
    date: string;
    comment: string;
    avatar: string;
    tripType: string;
  }>;
  customizationOptions: {
    accommodations: string[];
    transportation: string[];
    activities: string[];
    specialRequirements: string[];
  };
  enquiries?: any[];
}

