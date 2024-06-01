import { View } from "react-native";

import { cn } from "@/lib/utils";

function Separator({ className }: { className?: string }) {
  return (
    <View className={cn("border-b border-muted/40 self-stretch", className)} />
  );
}

export default Separator;
