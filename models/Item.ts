
export type ItemStatus = "AVAILABLE" | "PENDING" | "GONE";

export type Item = {
  id: number;
  userId: number;

  title: string;
  description: string;

  imageUrls: string[];

  city: string;
  pickupWindow: string;

  status: ItemStatus;
};