import { Trip, UpdateTrip } from "../../types";
import client from "../client";

type UpdateTripArgs = {
  id: string;
  values: UpdateTrip;
};

const updateTrip = async ({
  id,
  values,
}: UpdateTripArgs): Promise<Trip | null> => {
  console.log(values);
  const { data, error } = await client.from("trips").update(values).eq("id", id)
    .select(`
    *,
    locations (*)
  `);

  console.log(data);

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
};

export default updateTrip;
