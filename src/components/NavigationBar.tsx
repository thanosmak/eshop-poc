import { useEffect, useState } from "react";
import Cart from "./Cart";
import { Badge, Container, Navbar } from "react-bootstrap";
import { CartItemProps } from "./Cart";
import { ProductProps } from "./ProductsCard";
import "../css/Navigation.css";

type NavigationBarProps = {
	cartItems: CartItemProps[];
	cartOpen: boolean;
	cartItemsLength: number;
	onCartOpen: () => void;
	onCartClose: () => void;
	clearCart: () => void;
	handleAddToCart: (selectedItem: ProductProps) => void;
	handleRemoveFromCart: (id: string) => void;
};

function NavigationBar(props: NavigationBarProps) {
	const {
		cartItems,
		cartItemsLength,
		onCartOpen,
		cartOpen,
		onCartClose,
		clearCart,
		handleAddToCart,
		handleRemoveFromCart,
	} = props;
	const [cartItemsNumber, setCartItemsNumber] = useState(0);

	useEffect(() => {
		setCartItemsNumber(cartItemsLength);
	}, [cartItemsLength]);

	return (
		<Navbar fixed="top" className="navigation-bar">
			<Container className="navigation-container">
				<Navbar.Brand>
					<b style={{ letterSpacing: "0.2rem" }}>BEJΛMΛS_</b>
				</Navbar.Brand>
				<Navbar.Collapse className="justify-content-end">
					<Navbar.Text>
						<Cart
							cartItems={cartItems}
							cartOpen={cartOpen}
							onCartOpen={() => onCartOpen()}
							onCartClose={() => onCartClose()}
							clearCart={() => clearCart()}
							handleAddToCart={handleAddToCart}
							handleRemoveFromCart={handleRemoveFromCart}
						/>
						<Badge pill className="cart-badge">
							{cartItemsNumber > 0 && cartItemsNumber}
						</Badge>
					</Navbar.Text>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavigationBar;
