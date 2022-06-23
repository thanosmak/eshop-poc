import { useContext, useEffect, useState } from "react";
import Cart from "./Cart";
import { Badge, Container, Navbar } from "react-bootstrap";
import "../css/Navigation.css";
import { CartContext } from "../contexts/CartContext";

function NavigationBar() {
	const { getTotalCartItems } = useContext(CartContext);
	const [cartItemsNumber, setCartItemsNumber] = useState(0);

	useEffect(() => {
		setCartItemsNumber(getTotalCartItems());
	}, [getTotalCartItems]);

	return (
		<Navbar fixed="top" className="navigation-bar">
			<Container className="navigation-container">
				<Navbar.Brand>
					<b style={{ letterSpacing: "0.2rem" }}>BEJΛMΛS_</b>
				</Navbar.Brand>
				<Navbar.Collapse className="justify-content-end">
					<Navbar.Text>
						<Cart />
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
