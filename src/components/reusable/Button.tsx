import { ReactNode } from "react";

interface Props {
  colour: "primary" | "delete";
  size?: "sm" | "md" | "lg";
  variant?: "filled" | "transparent" | "outlined";
  textAlignment?: "start" | "center" | "end";
  width?: "fit" | "full";
  iconOnly?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

const variantClasses: Record<
  "filled" | "outlined" | "transparent",
  Record<"primary" | "delete", string>
> = {
  filled: {
    primary: "bg-amber-500 hover:bg-amber-400",
    delete: "bg-[#c9431a] hover:bg-[#cf5630]",
  },
  outlined: {
    primary: "border border-amber-400 text-amber-400",
    delete: "border border-[#cf5630] text-[#cf5630]",
  },
  transparent: {
    primary: "text-amber-400 hover:underline",
    delete: "text-[#cf5630] hover:underline",
  },
};

const sizeClass = {
  sm: "text-sm px-1 py-1",
  md: "text-md px-2 py-1",
  lg: "text-lg px-4 py-2",
};

const alignmentClass = {
  start: "text-left",
  center: "text-center",
  end: "text-right",
};

const Button = ({
  colour,
  size = "md",
  variant = "filled",
  textAlignment = "center",
  iconOnly = false,
  isDisabled,
  onClick,
  children,
}: Props) => {
  const variantClass = variantClasses[variant][colour];

  return (
    <button
      onClick={onClick}
      className={`
        ${variantClass}
        ${sizeClass[size]}
        ${alignmentClass[textAlignment]}
        ${iconOnly ? "p-2" : ""}
        rounded-lg
        transition-all
        font-medium
      `}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
