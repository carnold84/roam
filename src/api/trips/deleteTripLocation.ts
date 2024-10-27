import { Location } from "../../types";
import client from "../client";

const deleteTripLocation = async (location: Location) => {
  const { error } = await client
    .from("locations")
    .delete()
    .eq("id", location.id);

  if (error) {
    throw new Error(error.message);
  }

  return location;
};

export default deleteTripLocation;
