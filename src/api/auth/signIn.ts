import client from '../client';

const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const {
    error,
    data: { session },
  } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return session;
};

export default signIn;
