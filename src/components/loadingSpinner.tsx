type SpinnerProps = {
  size?: number;
  color?: string;
  children?: string;
};

export default function LoadingSpinner({
  size = 40,
  color = "blue",
  children,
}: SpinnerProps) {
  return (
    <div className="flex flex-col justify-center">
      <div
        className="animate-spin rounded-2xl border-4  border-t-transparent self-center"
        style={{ width: size, height: size, borderColor: color }}
      />
      {children && <p style={{ color: color }}>{children}</p>}
    </div>
  );
}
