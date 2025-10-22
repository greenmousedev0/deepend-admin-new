export interface FoodProps {
  id: string;
  name: string;
  description: string;
  price: string;
  categoryId: number;
  imageUrls: {
    url: string;
    path: string;
  }[];
  quantity: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SingleFoodProps {
  id: string;
  name: string;
  description: string;
  price: string;
  categoryId: number;
  imageUrls: {
    url: string;
    path: string;
  }[];
  quantity: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FoodCategory {
  id: number;
  name: string;
  description: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}
export interface FoodAddon {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudioBooking {
  id: string;
  userId: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  totalPrice: string;
  status: string;
}

export interface Studio {
  id: number;
  name: string;
  location: string;
  hourlyRate: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StudioAvailability {
  id: string;
  studioId: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface Hotel {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  imageUrls: {
    url: string;
    path: string;
  }[];
  rating: string;
  isAvailable: boolean;
  coordinates: {
    lat: number;
    lon: number;
  };
  createdAt: string;
  updatedAt: string;
  amenities: {
    id: number;
    name: string;
    icon: string;
  }[];
  rooms: {
    id: string;
    name: string;
    description: string;
    pricePerNight: string;
    imageUrls: {
      url: string;
      path: string;
    }[];
    capacity: number;
    isAvailable: boolean;
  }[];
}

export interface HotelInfo {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  imageUrls: {
    url: string;
    path: string;
  }[];
  rating: string;
  isAvailable: boolean;
  coordinates: {
    lat: number;
    lon: number;
  };
  createdAt: string;
  updatedAt: string;
  amenities: {
    id: number;
    name: string;
    icon: string;
  }[];
  rooms: {
    id: string;
    name: string;
    description: string;
    pricePerNight: string;
    imageUrls: {
      url: string;
      path: string;
    }[];
    capacity: number;
    isAvailable: boolean;
  }[];
}

export interface Amenity {
  id: number;
  name: string;
  icon: string;
  iconPath: string;
  createdAt: string;
  updatedAt: string;
}
