import { Session } from '@supabase/supabase-js';

import client from '../client';

const onAuthStateChange = (
  onStateChange: (callback: Session | null) => void
) => {
  const {
    data: { subscription },
  } = client.auth.onAuthStateChange((_event, session) => {
    onStateChange(session);
  });

  const unsubscribe = () => {
    subscription.unsubscribe();
  };

  return { unsubscribe };
};

export default onAuthStateChange;
