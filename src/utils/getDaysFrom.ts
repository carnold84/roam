import { addDays, startOfDay } from "date-fns";

import formatTimestamp from "./formatTimestamp";

type Args = {
  date?: string;
  numDays: number;
};

const getDaysFrom = ({ date, numDays }: Args) => {
  const nextDate = date ? new Date(date) : new Date();

  return formatTimestamp(addDays(startOfDay(nextDate), numDays).toISOString());
};

export default getDaysFrom;
