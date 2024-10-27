import { Trip } from "../../types";
import client from "../client";

const deleteTrip = async (trip: Trip): Promise<Trip> => {
  const { error } = await client.from("trips").delete().eq("id", trip.id);

  if (error) {
    throw new Error(error.message);
  }

  return trip;
};

export default deleteTrip;
