import { createSignal } from "solid-js";

type SignInFormProps = {
  isLoading: boolean;
  onSubmit: ({ email, password }: { email: string; password: string }) => void;
};

const SignInForm = (props: SignInFormProps) => {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");

  return (
    <div class="flex h-screen w-screen items-center justify-center">
      <form
        class="flex w-full max-w-xl flex-col gap-5 p-10"
        onSubmit={(e) => {
          e.preventDefault();

          props.onSubmit({
            email: email(),
            password: password(),
          });
        }}
      >
        <div class="input_container">
          <label class="input_label" for="email">
            Email
          </label>
          <input
            class="input_text"
            id="email"
            type="email"
            placeholder="Your email"
            value={email()}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div class="input_container">
          <label class="input_label" for="password">
            Password
          </label>
          <input
            class="input_text"
            id="password"
            type="password"
            placeholder="Your password"
            value={password()}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <button
          aria-live="polite"
          class="btn_primary"
          disabled={props.isLoading}
          type="submit"
        >
          {props.isLoading ? <span>Signing in...</span> : <span>Sign In</span>}
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
