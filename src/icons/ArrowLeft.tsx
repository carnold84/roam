import SVGIcon, { SVGIconProps } from './SVGIcon';

const ArrowLeft = (props: SVGIconProps) => {
  return (
    <SVGIcon {...props}>
      <path
        d="M21 12L3 12M3 12L11.5 3.5M3 12L11.5 20.5"
        stroke="currentcolor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SVGIcon>
  );
};

export default ArrowLeft;
