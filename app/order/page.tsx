import { getOrder } from "@/libs/api"
import { authOptions } from "@/libs/auth";
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation'


const Order = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
		redirect('/');
	}

    const email = session?.user?.email as string;
    const orderData: any = await getOrder(email);
    
    console.log(orderData)
    return(
        <div className="max-container mt-10 h-screen">
            <div className="mt-10 text-bold font-bold text-2xl">Orders</div>

            <div className="relative overflow-x-auto px-6 sm:px-12 md:px-20 lg:px-36 pb-40">

            <table className='w-full text sm text-left text-gray-400'>
  <thead className="txt-xs uppercase bg-gray-700 text-gray-400">
    <tr>
        <th scope='col' className="px-6 py-3">Product(s) Name </th>
        <th scope='col' className="px-6 py-3">Unit Price </th>
        <th scope='col' className="px-6 py-3">Order Status</th>
        <th scope='col' className="px-6 py-3">Total Price</th>
        
    </tr>

  </thead>
  <tbody>
    {orderData.map((order:any) => {
        const totalPrice = order.items.reduce((acc:any, item:any) => {
            const itemPrice = item.quantity * item.shop.price
            return acc + itemPrice
        }, 0)
        return(
            <tr key={order._id} className="border-b bg-gray-800 border-gray-700">

                <th scope="row" className="px-6 py-6 font-medium whitespace-nowrap text-white">

                        {order.items.map((item:any) =>
                            <span key={item._id}>{item.shop.name} ({item.quantity}) <br /> </span>
                        )}
                    </th>

                    <td className="px-6 py-4">
                    {order.items.map((item:any) =>
                            <span key={item._id}>${item.shop.price} <br /> </span>
                        )}
                    </td>
                    <td className="px-6 py-4">{order.orderStatus}</td>
                    <td className="px-6 py-4">${totalPrice}</td>
                   

            </tr>
        )
        

    })}   
  </tbody>
</table>
            </div>

            </div>
    )
}

export default Order