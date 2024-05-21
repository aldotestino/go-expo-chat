import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function isSameWeek(date1: Date, date2: Date): boolean {
  const diff = date2.getTime() - date1.getTime();
  const diffDays = diff / (1000 * 3600 * 24);
  return diffDays < 7;
}

function isSameYear(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear();
}

function setupDateFormat(date: Date) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };

  const time = date.toLocaleTimeString("it-IT", options);

  return {
    today,
    yesterday,
    time,
  };
}

export function formatDate(date: Date): string {
  const { today, yesterday, time } = setupDateFormat(date);

  if (isSameDay(date, today)) {
    return `Today at ${time}`;
  } else if (isSameDay(date, yesterday)) {
    return `Yesterday at ${time}`;
  } else if (isSameWeek(date, today)) {
    return `${dayNames[date.getDay()]} at ${time}`;
  } else {
    const dayName = dayNames[date.getDay()];

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    if (isSameYear(date, today)) return `${dayName} ${day} ${month} at ${time}`;

    return `${dayName} ${day} ${month} ${year} at ${time}`;
  }
}

export function formatPreviewDate(date: Date): string {
  const { today, yesterday, time } = setupDateFormat(date);

  if (isSameDay(date, today)) {
    return time;
  } else if (isSameDay(date, yesterday)) {
    return "Yesterday";
  } else if (isSameWeek(date, today)) {
    return dayNames[date.getDay()];
  } else {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(2);

    return `${day}/${month}/${year}`;
  }
}
