export default function DashboardHome() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Total Products</h3>
        <p className="text-3xl font-bold">total count</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Low Stock</h3>
        <p className="text-3xl font-bold">6</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        <ul className="text-sm mt-2 list-disc list-inside">
          <li>Added new product: iPhone</li>
          <li>Updated stock: Samsung TV</li>
        </ul>
      </div>
    </div>
  );
}
