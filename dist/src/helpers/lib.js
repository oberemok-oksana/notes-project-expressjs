"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatYupErrors = exports.findIndexById = exports.checkForDates = exports.setDate = void 0;
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
const DATE_REGEX = /(?:^|\D)(?:(?:0?[1-9]|[12][0-9]|3[01])\/(?:0?[1-9]|1[0-2])\/(?:\d{4}))(?:\D|$)/gm;
const setDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${MONTHS[month]} ${day}, ${year}`;
};
exports.setDate = setDate;
const checkForDates = (date) => {
    const match = date.match(DATE_REGEX);
    return (match === null || match === void 0 ? void 0 : match.join(", ")) || "";
};
exports.checkForDates = checkForDates;
const findIndexById = (id, data) => data.findIndex((item) => item.id === id);
exports.findIndexById = findIndexById;
const formatYupErrors = (error) => {
    const yupErrors = {};
    error.inner.forEach((err) => {
        console.log(err.path);
        if (!err.path)
            return;
        if (!yupErrors[err.path]) {
            yupErrors[err.path] = [err.message];
        }
        else {
            yupErrors[err.path].push(err.message);
        }
    });
    return yupErrors;
};
exports.formatYupErrors = formatYupErrors;
