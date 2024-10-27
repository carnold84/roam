import client from "../client";

const getTrip = async (id: string) => {
  const { data, error } = await client
    .from("trips")
    .select(
      `
      *,
      locations (*)
    `,
    )
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
};

export default getTrip;
