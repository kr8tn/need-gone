
export type Item = {
  id: number;
  userId: number;

  title: string;
  description: string;

  imageUrls: string[];

  city: string;
  pickupWindow: string;

  status: "available" | "pending" | "claimed";
};