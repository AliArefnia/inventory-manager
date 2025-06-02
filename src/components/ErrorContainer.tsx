type ErrorProps = {
  children: string;
  className?: string;
};

export default function ErrorContainer({ children, className }: ErrorProps) {
  return (
    <div
      className={`p-4 bg-red-100 text-red-700 rounded-md text-sm mt-4 border border-red-300 text-center ${className}`}
    >
      <strong>Error:</strong> {children}
    </div>
  );
}
