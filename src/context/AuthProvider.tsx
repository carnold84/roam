import { Session } from "@supabase/supabase-js";
import {
  ParentComponent,
  Show,
  createContext,
  createSignal,
  onCleanup,
  onMount,
  useContext,
} from "solid-js";

import getSession from "../api/auth/getSession";
import onAuthStateChange from "../api/auth/onAuthStateChange";
import authSignIn from "../api/auth/signIn";
import authSignOut from "../api/auth/signOut";
import SignInForm from "../components/SignInForm";

interface AuthContextType {
  session: Session;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType>();

const AuthProvider: ParentComponent = (props) => {
  const [isLoading, setIsLoading] = createSignal<boolean>(true);
  const [isSaving, setIsSaving] = createSignal<boolean>(false);
  const [session, setSession] = createSignal<Session | null>(null);

  const signOut = async () => {
    return await authSignOut()
      .then(() => {
        setSession(null);
      })
      .catch((error: Error) => {
        console.error(error);
      });
  };

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      setIsSaving(true);

      const session = await authSignIn({
        email,
        password,
      });
      setSession(session);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setIsSaving(false);
    }
  };

  onMount(() => {
    getSession().then((session) => {
      setSession(session);
      setIsLoading(false);
    });
  });

  onCleanup(() => {
    const { unsubscribe } = onAuthStateChange((session) => {
      setSession(session);
    });

    unsubscribe();
  });

  return (
    <Show when={!isLoading()} fallback={<p>Loading...</p>}>
      <Show
        when={session()}
        keyed
        fallback={<SignInForm isLoading={isSaving()} onSubmit={signIn} />}
      >
        {(variable) => {
          return (
            <AuthContext.Provider value={{ session: variable, signOut }}>
              {props.children}
            </AuthContext.Provider>
          );
        }}
      </Show>
    </Show>
  );
};

export const useAuth = () => {
  return useContext(AuthContext)!;
};

export default AuthProvider;
