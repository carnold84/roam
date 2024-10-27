import { format } from "date-fns";

const formatTimestamp = (date: string) => {
  return format(new Date(date), "yyyy-MM-dd'T'HH:mm:ssxxx");
};

export default formatTimestamp;
