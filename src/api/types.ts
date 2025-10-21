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
