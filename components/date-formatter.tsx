import { parseISO, format } from "date-fns";
import { enGB } from "date-fns/locale";

interface Props {
  dateString: string;
  dateFormat?: string;
}

const DateFormatter = ({ dateString, dateFormat }: Props) => {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, dateFormat ?? "PP", { locale: enGB })}</time>;
};

export default DateFormatter;
