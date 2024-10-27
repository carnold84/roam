import { CreateTrip, Trip } from "../../types";
import client from "../client";

const createTrip = async (values: CreateTrip): Promise<Trip | null> => {
  const response = await client.from("trips").insert(values).select(`
    *,
    locations (*)
  `);

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data[0];
};

export default createTrip;
