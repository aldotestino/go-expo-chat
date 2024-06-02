import { useColorScheme } from "./useColorScheme";

export function useUserColor() {
  const { isDarkColorScheme } = useColorScheme();

  const colorsDark = [
    "text-red-400",
    "text-orange-400",
    "text-yellow-400",
    "text-green-400",
    "text-blue-400",
    "text-indigo-400",
    "text-purple-400",
    "text-pink-400",
  ];

  const colors = [
    "text-red-600",
    "text-orange-600",
    "text-yellow-600",
    "text-green-600",
    "text-blue-600",
    "text-indigo-600",
    "text-purple-600",
    "text-pink-600",
  ];

  function getColor(username: string) {
    const charCode = username
      .split("")
      .map((char) => char.charCodeAt(0))
      .reduce((acc, curr) => acc + curr, 0);

    const index = charCode % colors.length;
    return isDarkColorScheme ? colorsDark[index] : colors[index];
  }

  return { getColor };
}
