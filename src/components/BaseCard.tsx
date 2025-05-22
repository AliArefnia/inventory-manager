import type { ReactNode } from "react";

function BaseCard({
  title,
  count,
  children,
}: {
  title: string;
  count?: number;
  children?: ReactNode;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {" "}
      <h3 className="text-lg font-sans">{title}</h3>
      {count && <p className="text-3xl font-bold">{count}</p>}
      {children && <div>{children}</div>}
    </div>
  );
}

export default BaseCard;
