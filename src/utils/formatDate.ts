import { format } from "date-fns";

const formatDate = (date: string) => {
  return format(new Date(date), "dd MMM yy");
};

export default formatDate;
