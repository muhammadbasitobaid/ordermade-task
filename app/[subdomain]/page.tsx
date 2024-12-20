import { getOrdersByCompany } from "../data/orders";

// This component should now use server-side logic
export default async function SubdomainPage({ params }: { params: { subdomain: string } }) {
  const subdomain = params.subdomain.split(".")[0] || "";

  const companyDatabase = {
    daraz: { name: "Daraz", logo: "/daraz.png" },
    foodpanda: { name: "FoodPanda", logo: "/foodpanda.png" },
  };

  const companyData = companyDatabase[subdomain];
  if (!companyData) {
    return <div className="text-red-500 text-center font-semibold">Error: Company not found!</div>;
  }

  // Assuming getOrdersByCompany is a synchronous function or has been adapted for SSR
  const orders = getOrdersByCompany(subdomain);
  companyData.orders = orders;

  return (
    <div className="container mx-auto p-6">
      <header className="text-center mb-8">
        <img src={companyData.logo} alt={`${companyData.name} Logo`} className="mx-auto mb-4 "  width="100"/>
        <h1 className="text-3xl font-semibold text-primary">{`Orders for ${companyData.name}`}</h1>
      </header>
      <table className="min-w-full table-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-6 py-3 font-medium text-gray-700">Order ID</th>
            <th className="px-6 py-3 font-medium text-gray-700">Customer Name</th>
            <th className="px-6 py-3 font-medium text-gray-700">Amount</th>
            <th className="px-6 py-3 font-medium text-gray-700">Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {companyData.orders?.map((order) => (
            <tr key={order.orderId} className="hover:bg-gray-50">
              <td className="px-6 py-4 border-b">{order.orderId}</td>
              <td className="px-6 py-4 border-b">{order.customerName}</td>
              <td className="px-6 py-4 border-b">{order.amount}</td>
              <td className="px-6 py-4 border-b">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
