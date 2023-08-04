import { ValidationError } from "yup";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DATE_REGEX =
  /(?:^|\D)(?:(?:0?[1-9]|[12][0-9]|3[01])\/(?:0?[1-9]|1[0-2])\/(?:\d{4}))(?:\D|$)/gm;

export const setDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${MONTHS[month]} ${day}, ${year}`;
};

export const checkForDates = (date: string) => {
  const match = date.match(DATE_REGEX);

  return match || [];
};

export const findIndexById = <T extends { id: string }>(
  id: string,
  data: T[]
) => data.findIndex((item) => item.id === id);

export const formatYupErrors = (error: ValidationError) => {
  const yupErrors: Record<string, string[]> = {};
  yupErrors["base"] = error.errors;

  error.inner.forEach((err) => {
    console.log(err);
    if (!err.path) return;

    if (!yupErrors[err.path]) {
      yupErrors[err.path] = [err.message];
    } else {
      yupErrors[err.path].push(err.message);
    }
  });

  return yupErrors;
};
