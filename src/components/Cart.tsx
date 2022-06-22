import { Button, Col, Dropdown, Row } from "react-bootstrap";
import Icon from "react-icons-kit";
import { shoppingCart } from "react-icons-kit/feather/shoppingCart";
import CartItem from "./CartItem";
import { ProductProps } from "./ProductsCard";

export type CartItemProps = {
	item: ProductProps;
	quantity: number;
};
type CartProps = {
	cartItems: CartItemProps[];
	cartOpen: boolean;
	onCartOpen: () => void;
	onCartClose: () => void;
	clearCart: () => void;
	handleAddToCart: (selectedItem: ProductProps) => void;
	handleRemoveFromCart: (id: string) => void;
};

const Cart = (props: CartProps) => {
	const {
		cartItems,
		cartOpen,
		onCartClose,
		clearCart,
		onCartOpen,
		handleAddToCart,
		handleRemoveFromCart,
	} = props;

	const toggleCart = () => {
		if (cartOpen) {
			onCartClose();
		} else {
			onCartOpen();
		}
	};

	return (
		<Dropdown
			show={cartOpen}
			autoClose="outside"
			drop={"start"}
			style={{ display: "inline-block" }}
		>
			<Dropdown.Toggle className="cart-icon-button">
				<Icon
					size={32}
					icon={shoppingCart}
					className="cart-icon"
					onClick={() => toggleCart()}
				/>
			</Dropdown.Toggle>

			<Dropdown.Menu className="cart-dialog-container ">
				<Row>
					{cartItems.length > 0 && (
						<Col>
							<h3>
								Total: $
								{cartItems.reduce(
									(prev, curr) => prev + curr.item.price * curr.quantity,
									0
								)}
							</h3>
						</Col>
					)}
					<Col xs={2}>
						<Button
							className="close-cart-button"
							onClick={onCartClose}
							style={{ width: "100%" }}
						>
							X
						</Button>
					</Col>
				</Row>
				{cartItems.length ? (
					cartItems.map((cartItem) => (
						<CartItem
							key={cartItem.item.id}
							item={cartItem.item}
							quantity={cartItem.quantity}
							handleAddToCart={handleAddToCart}
							handleRemoveFromCart={handleRemoveFromCart}
						/>
					))
				) : (
					<div style={{ padding: "16px 8px" }}>
						There are no items in the cart right now.
					</div>
				)}
				<Button
					className="add-product-button clear-cart-button"
					onClick={clearCart}
				>
					Clear
				</Button>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default Cart;
