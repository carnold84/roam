import client from "../client";

const getTrips = async () => {
  const { data, error } = await client.from("trips").select(`
    *,
    locations (*)
  `);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default getTrips;
