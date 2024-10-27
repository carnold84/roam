import { Database } from "./api/database.types";

export type CreateTrip = Omit<
  Database["public"]["Tables"]["trips"]["Insert"],
  "created_at" | "id" | "updated_at" | "user_id"
>;

export type UpdateTrip = Partial<
  Omit<
    Database["public"]["Tables"]["trips"]["Row"],
    "created_at" | "id" | "updated_at" | "user_id"
  >
>;

export type CreateTripLocation = Omit<
  Database["public"]["Tables"]["locations"]["Insert"],
  "created_at" | "id" | "updated_at" | "user_id"
>;

export type Location = Database["public"]["Tables"]["locations"]["Row"];

export type Trip = Database["public"]["Tables"]["trips"]["Row"] & {
  locations: Database["public"]["Tables"]["locations"]["Row"][];
};

/* export type Location = {
  createdAt: string;
  endAt: string;
  id: string;
  name: string;
  notes: string | null;
  startAt: string;
  tripId: string;
  updatedAt: string;
  userId: string;
};

export type Trip = {
  createdAt: string;
  id: string;
  locations: Location[];
  title: string;
  updatedAt: string;
  userId: string;
}; */
