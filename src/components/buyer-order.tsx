import { Button } from "./ui/button";

export const BuyerOrder = () => {
  return (
    <div className="col-span-3 no-scrollbars relative w-full overflow-x-auto">
      <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody className="">
          <tr className="text-base text-gray-500 border-t whitespace-nowrap px-2 border-b default-border-bottom">
            {orderHeader.map((header, i) => (
              <td key={i} className="py-4 whitespace-nowrap text-center">
                {header}
              </td>
            ))}
          </tr>

          {orders.map((order, i) => (
            <tr
              key={i}
              className="bg-white text-center border-b hover:bg-gray-50"
            >
              <td className="text-center py-4">
                <span className="text-lg text-gray-500 font-medium">
                  {order.orderNumber}
                </span>
              </td>
              <td>
                <span className="text-base text-gray-500 whitespace-nowrap">
                  {order.date}
                </span>
              </td>
              <td>
                <span className="text-sm rounded text-green-500 bg-green-100 p-2">
                  {order.status}
                </span>
              </td>
              <td>
                <span className="text-base text-gray-500 whitespace-nowrap px-2 ">
                  {order.amount}
                </span>
              </td>
              <td>
                <Button className="text-xs shadow-none rounded-none text-black bg-main font-bold">
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const orderHeader = ["Order", "Date", "Status", "Amount", "Action"];

interface Order {
  orderNumber: string;
  date: string;
  status: string;
  amount: string;
}

const orders: Order[] = [
  {
    orderNumber: "#354",
    date: "Feb 05, 2021",
    status: "Completed",
    amount: "$757",
  },
  {
    orderNumber: "#354",
    date: "Feb 05, 2021",
    status: "Completed",
    amount: "$757",
  },
  {
    orderNumber: "#354",
    date: "Feb 05, 2021",
    status: "Completed",
    amount: "$757",
  },
  {
    orderNumber: "#354",
    date: "Feb 05, 2021",
    status: "Completed",
    amount: "$757",
  },
  {
    orderNumber: "#354",
    date: "Feb 05, 2021",
    status: "Completed",
    amount: "$757",
  },
  {
    orderNumber: "#354",
    date: "Feb 05, 2021",
    status: "Completed",
    amount: "$757",
  },
  {
    orderNumber: "#354",
    date: "Feb 05, 2021",
    status: "Completed",
    amount: "$757",
  },
];
