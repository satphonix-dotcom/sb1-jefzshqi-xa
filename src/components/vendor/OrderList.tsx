import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { formatPrice, formatDate } from '../../utils/formatters';
import { Order } from '../../types';

interface OrderListProps {
  limit?: number;
}

const OrderList: React.FC<OrderListProps> = ({ limit }) => {
  const { orders } = useAppSelector(state => state.orders);
  const displayOrders = limit ? orders.slice(0, limit) : orders;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {displayOrders.map((order: Order) => (
            <tr key={order._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link 
                  to={`/orders/${order._id}`}
                  className="text-yellow-600 hover:text-yellow-900"
                >
                  #{order._id.slice(-6)}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {formatDate(order.createdAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'}`}>
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {formatPrice(order.total)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;