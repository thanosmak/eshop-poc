import { Col, Row } from "react-bootstrap";
import { ProductProps } from "./ProductsCard";

type CartItemProps = {
	item: ProductProps;
	quantity: number;
	handleAddToCart: (selectedItem: ProductProps) => void;
	handleRemoveFromCart: (id: string) => void;
};

function CartItem(props: CartItemProps) {
	const { item, quantity, handleAddToCart, handleRemoveFromCart } = props;
	return (
		<Row className="cart-item-container">
			<Col>
				<div className="cart-item-name">{item.name}</div>
				<div className="cart-item-price">${item.price * quantity}</div>
				<div className="cart-item-quantity">
					Quantity:
					<span
						className="change-quantity-button"
						onClick={() => handleRemoveFromCart(item.id)}
					>
						-
					</span>
					<span>{quantity}</span>
					<span
						className="change-quantity-button"
						onClick={() => handleAddToCart(item)}
					>
						+
					</span>
				</div>
			</Col>
			<Col>
				<div
					className="cart-item-image"
					role="img"
					aria-label={item.name}
					style={{
						background: `url(${item.image.src})`,
					}}
				></div>
			</Col>
		</Row>
	);
}

export default CartItem;
