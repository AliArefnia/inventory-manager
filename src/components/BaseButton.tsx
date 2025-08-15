type BaseButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "borderBlue" | "borderRed";
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
};

export default function BaseButton({
  children,
  onClick,
  disabled = false,
  variant,
  className = "",
  type,
}: BaseButtonProps) {
  const baseStyle =
    "px-4 py-2 rounded transition-all duration-200 font-medium cursor-pointer rounded-lg ";
  const variants = {
    primary: `bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300`,
    secondary: `bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100`,
    borderBlue: `bg-white rounded border-2 border-blue-600 text-blue-600`,
    borderRed: `bg-white rounded border-2 border-red-600 text-red-600`,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variant && variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
