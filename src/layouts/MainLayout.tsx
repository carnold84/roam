import { A } from "@solidjs/router";
import { ParentProps, createSignal } from "solid-js";

import { useAuth } from "../context/AuthProvider";

const MainLayout = (props: ParentProps) => {
  const [isSigningOut, setIsSigningOut] = createSignal<boolean>(false);
  const { signOut } = useAuth();

  return (
    <div>
      <header class="flex w-full items-center justify-between border-b border-neutral-300 px-4 py-3">
        <A href="/">
          <h1>Traveller</h1>
        </A>
        <button
          class="btn_primary"
          on:click={async () => {
            setIsSigningOut(true);
            await signOut();
            setIsSigningOut(false);
          }}
        >
          {isSigningOut() ? <span>Signing out...</span> : <span>Sign Out</span>}
        </button>
      </header>
      <main class="p-10">{props.children}</main>
    </div>
  );
};

export default MainLayout;
