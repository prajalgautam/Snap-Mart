import { PRODUCTS_ROUTE } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import { FaImage } from "react-icons/fa6";

const OrderTable = ({ order }) => {
  return (
    <div className="relative overflow-x-auto py-5">
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="text-sm text-body border-b border-gray-200 text-gray-500">
          <tr>
            <th scope="col" className="px-6 py-3 font-medium">
              Product
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Qty
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Price
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {order.orderItems?.map((item, index) => {
            const imageUrl =
              item.product?.imageUrls?.[0];

            return (
              <tr key={index} className="border-b border-gray-200 text-gray-700 dark:text-white">
                <td className="w-full px-6 py-4 font-semibold text-heading">
                  <div className="flex items-center gap-5">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt=""
                        height={100}
                        width={100}
                        className="h-15 w-15 rounded-md object-cover"
                      />
                    ) : (
                      <div className="h-15 w-15 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-md">
                        <FaImage className="text-2xl text-gray-400" />
                      </div>
                    )}
                    <h4 className="whitespace-nowrap mr-10">
                      {item.product?.name || "Product"}
                    </h4>
                  </div>
                </td>
                <td className="min-w-32 px-6 py-4">x{item.quantity}</td>
                <td className="min-w-32 px-6 py-4 font-semibold text-heading">
                  Rs. {item.product?.price || 0}
                </td>
                <td className="min-w-32 px-6 py-4">
                  <Link
                    href={`${PRODUCTS_ROUTE}/${item.product?._id || "#"}`}
                    className="font-medium text-blue-500 hover:underline"
                  >
                    view
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
