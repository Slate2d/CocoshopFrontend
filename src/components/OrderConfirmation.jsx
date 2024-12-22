import { useParams } from 'react-router-dom';
const OrderConfirmation = () => {
    const { id } = useParams();
    return (
      <div>
        <h1>Order Confirmed!</h1>
        <p>Order ID: {id}</p>
      </div>
    );
  };
export default OrderConfirmation;