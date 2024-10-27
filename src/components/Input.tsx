import { JSX, Show } from "solid-js";

export type InputProps = JSX.IntrinsicElements["input"] & {
  error?: string;
  label?: string;
};

const Input = (props: InputProps) => {
  const { label, ...rest } = props;

  return (
    <div class="flex flex-col gap-0.5">
      <Show when={label}>
        <label>{label}</label>
      </Show>
      <input class="grow border border-neutral-200 px-3 py-2" {...rest} />
      {props.error && <p>{props.error}</p>}
    </div>
  );
};

export default Input;
