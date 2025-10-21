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
