import { PolymorphicProps } from "@kobalte/core";
import { ButtonRootProps, Root } from "@kobalte/core/button";
import { ValidComponent, mergeProps, splitProps } from "solid-js";

type ButtonProps = ButtonRootProps &
  ValidComponent & {
    variant?: "icon" | "primary" | "text";
  };

const Button = (props: PolymorphicProps<ButtonProps>) => {
  const merged = mergeProps({ variant: "text" }, props);
  const [local, others] = splitProps(merged, ["variant"]);

  return (
    <Root
      class="text-sm"
      classList={{
        "p-2 hover:bg-neutral-100 text-neutral-700 hover:text-neutral-900 text-neutral-500 hover:text-neutral-800":
          local.variant === "icon",
        "px-3 py-2 border-lime-700 bg-lime-600 text-white hover:border-lime-600 hover:bg-lime-500":
          local.variant === "primary",
        "px-3 py-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100":
          local.variant === "text",
      }}
      {...others}
    />
  );
};

export default Button;
