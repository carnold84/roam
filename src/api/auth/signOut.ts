import client from '../client';

const signOut = async () => {
  return await client.auth.signOut();
};

export default signOut;
