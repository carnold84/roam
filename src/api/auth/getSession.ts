import client from '../client';

const getSession = async () => {
  return await client.auth.getSession().then(({ data: { session } }) => {
    return session;
  });
};

export default getSession;
