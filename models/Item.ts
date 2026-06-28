
export type ItemStatus = "AVAILABLE" | "PENDING" | "GONE";

export type Item = {
  id: string;
  title: string;
  description: string;
  location: string;
  status: "AVAILABLE" | "PENDING" | "GONE";
  owner_id: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string | null;

  pickup_type: "PORCH" | "PUBLIC_MEETUP" | null;
  public_location: string | null;
  private_address: string | null;
  pickup_instructions: string | null;
  pickup_window: string | null;
  meetup_location: string | null;
  meetup_time_options: string[] | null;
};