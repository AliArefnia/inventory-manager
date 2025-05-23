type ErrorProps = {
  children: string;
};

export default function ErrorContainer({ children }: ErrorProps) {
  return (
    <div className="p-4 bg-red-100 text-red-700 rounded-md text-sm mt-4 border border-red-300">
      <strong>Error:</strong> {children}
    </div>
  );
}
