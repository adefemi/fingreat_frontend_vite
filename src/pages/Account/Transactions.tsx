import TransactionTable from "../../components/common/myTable";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

// convert the above invoices to string[][]
const newInvoices = invoices.map((invoice) => {
  return Object.values(invoice);
});

const Transaction = () => {
  return (
    <div className="mt-10">
      <h1 className="text-2xl font-light mb-5">Transaction History</h1>
      <TransactionTable
        body={newInvoices}
        heading={[
          "Invoice",
          "Payment Status",
          "Total Amount",
          "Payment Method",
        ]}
      />
    </div>
  );
};

export default Transaction;
