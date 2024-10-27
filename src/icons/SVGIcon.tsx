import { JSX } from 'solid-js';

export type SVGIconProps = {
  height?: string;
  width?: string;
};

type SVGIconRootProps = SVGIconProps & {
  children: JSX.Element;
};

const SVGIcon = (props: SVGIconRootProps) => {
  return (
    <svg
      width={props.width ?? '24px'}
      height={props.height ?? '24px'}
      viewBox="0 0 24 24"
      stroke-width="1.5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="currentcolor"
    >
      {props.children}
    </svg>
  );
};

export default SVGIcon;
