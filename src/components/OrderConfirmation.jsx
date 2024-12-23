import { useParams } from 'react-router-dom';
import './../css/OrderConfirmation.css'; // Импортируем стили

const OrderConfirmation = () => {
    const { id } = useParams();
    return (
        <div className="order-confirmation">
            <h1>Order Confirmed!</h1>
            <p>Order ID: {id}</p>
        </div>
    );
};

export default OrderConfirmation;
