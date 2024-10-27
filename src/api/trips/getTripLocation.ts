import client from "../client";

const getTripLocation = async (id: string) => {
  const { data, error } = await client
    .from("locations")
    .select("*")
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
};

export default getTripLocation;
