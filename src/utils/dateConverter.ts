import { DateTime } from "luxon";

export const DateConverter = (stringDate: string): string  => {
  try {
    const dateFormat = DateTime.fromISO(stringDate!);

    if (!dateFormat.isValid) {
      return DateTime.now().toUTC().toISO()!;
    }

    const dateConverted = dateFormat.toUTC().toISO();
    return dateConverted || DateTime.now().toUTC().toISO()!;
  } catch (err) {
    return DateTime.now().toUTC().toISO()!;
  }
};