import { TouchableOpacity } from "react-native";

import { Text } from "./nativewindui/Text";

import { cn } from "@/lib/utils";

const Chip = ({
  selected,
  ...props
}: React.ComponentProps<typeof TouchableOpacity> & {
  selected?: boolean;
}) => {
  return (
    <TouchableOpacity
      {...props}
      className={cn(
        "px-2 w-fit min-w-16 py-1 items-center rounded-full bg-card border border-muted/40",
        selected && "bg-primary border-transparent",
      )}
    >
      <Text
        className={cn(
          "font-semibold text-card-foreground",
          selected && "text-primary-foreground",
        )}
      >
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};

export default Chip;
