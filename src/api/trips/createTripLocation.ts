import { CreateTripLocation, Location } from "../../types";
import client from "../client";

const createTripLocation = async (
  values: CreateTripLocation,
): Promise<Location | null> => {
  const response = await client.from("locations").insert(values).select();

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data[0];
};

export default createTripLocation;
