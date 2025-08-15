type SpinnerProps = {
  size?: number;
  color?: string;
  children?: string;
};

export default function LoadingSpinner({
  size = 40,
  color = "gray",
  children,
}: SpinnerProps) {
  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <div className="relative" style={{ width: size, height: size }}>
        <div
          className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin"
          style={{
            borderColor: `${color}33`,
            borderTopColor: color,
          }}
        />
        <div
          className="absolute inset-0 rounded-full blur-[3px] opacity-40"
          style={{
            backgroundColor: color,
          }}
        />
      </div>
      {children && (
        <p style={{ color: color }} className="text-sm text-center font-medium">
          {children}
        </p>
      )}
    </div>
  );
}
