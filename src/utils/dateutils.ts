import { format } from "date-fns";

export function fDateTime(date: Date | null) {
  if (!date) {
    return "";
  }
  try {
    return format(new Date(date), "dd MMM yyyy p");
  } catch (error) {
    return "";
  }
}
