import Ionicons from "@expo/vector-icons/Ionicons";
import { forwardRef } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";

import { Text } from "@/components/nativewindui/Text";
import { useColorScheme } from "@/lib/hooks/useColorScheme";
import { cn } from "@/lib/utils";

const buttonBgVariants = {
  primary: "bg-primary",
  destructive: "bg-destructive",
  outline: "border border-muted/40",
  link: "bg-transparent",
  flat: "bg-card border border-muted/40",
};

const buttonTextVariants = {
  primary: "text-primary-foreground",
  destructive: "text-destructive-foreground",
  outline: "text-foreground",
  link: "text-primary",
  flat: "text-card-foreground",
};

const buttonSizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const iconSizes = {
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
};

type ButtonProps = React.ComponentProps<typeof TouchableOpacity> & {
  loading?: boolean;
  variant?: "primary" | "destructive" | "outline" | "link" | "flat";
  size?: "sm" | "md" | "lg" | "xl";
  iconLeft?: React.ComponentProps<typeof Ionicons>["name"];
  iconRight?: React.ComponentProps<typeof Ionicons>["name"];
};

const Button = forwardRef<TouchableOpacity, ButtonProps>(
  (
    {
      variant = "primary",
      iconLeft,
      iconRight,
      loading,
      size = "lg",
      ...props
    },
    ref,
  ) => {
    const { colors } = useColorScheme();

    return (
      <TouchableOpacity
        {...props}
        ref={ref}
        className={cn(
          "w-full py-2 px-3 flex-row justify-center items-center gap-2 rounded-lg border border-transparent",
          buttonBgVariants[variant],
          props.disabled && "opacity-50",
          props.className,
        )}
      >
        {loading && (
          <ActivityIndicator className={buttonTextVariants[variant]} />
        )}
        {iconLeft && !loading && (
          <Ionicons
            name={iconLeft}
            size={iconSizes[size]}
            color={variant === "link" ? colors.primary : colors.foreground}
          />
        )}
        <Text className={cn(buttonTextVariants[variant], buttonSizes[size])}>
          {props.children}
        </Text>
        {iconRight && !loading && (
          <Ionicons
            name={iconRight}
            size={iconSizes[size]}
            color={variant === "link" ? colors.primary : colors.foreground}
          />
        )}
      </TouchableOpacity>
    );
  },
);

export default Button;
