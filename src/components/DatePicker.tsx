import { format } from "date-fns";

import Input, { InputProps } from "./Input";

type DatePickerProps = Omit<InputProps, "type" | "value"> & {
  value: number | string | null | undefined;
};

const DatePicker = (props: DatePickerProps) => {
  const { value, ...rest } = props;

  return (
    <Input
      type="date"
      value={value ? format(new Date(value), "yyyy-MM-dd") : undefined}
      {...rest}
    />
  );
};

export default DatePicker;
