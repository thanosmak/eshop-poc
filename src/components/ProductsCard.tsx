import { useContext, useEffect, useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { CartContext } from "../contexts/CartContext";
import "../css/ProductCard.css";

export interface ProductImageDetails {
	src: string;
	alt: string;
}
export interface ProductCardDetails {
	description: string;
	dimmentions: {
		height: string;
		width: string;
	};
	recommendations: ProductImageDetails[];
	size: number;
}
export interface ProductProps {
	id: string;
	besteseller: boolean;
	category: string;
	currency: string;
	details: ProductCardDetails;
	features: boolean;
	image: ProductImageDetails;
	name: string;
	price: number;
}

type ProductCardProps = {
	item: ProductProps;
};

function ProductsCard(props: ProductCardProps) {
	const { item } = props;
	const [showAddButton, setShowAddButton] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const { addToCart } = useContext(CartContext);

	useEffect(() => {
		const windowWidth = window.innerWidth <= 576;
		setIsMobile(windowWidth);
	}, []);

	return (
		<Col md={4}>
			<Card
				className="product-card"
				onMouseEnter={() => setShowAddButton(true)}
				onMouseLeave={() => setShowAddButton(false)}
			>
				<Card.Img
					variant="top"
					src={item?.image.src}
					alt={item?.name}
					className="product-cart-image"
				/>
				<Card.ImgOverlay style={{ padding: 0 }}>
					{item.besteseller && (
						<Card.Subtitle className="product-card-label">
							Best Seller
						</Card.Subtitle>
					)}
					<Button
						className={`add-product-button product-card-add-product ${
							showAddButton || isMobile ? "visible-button" : "hidden-button"
						}`}
						variant="primary"
						onClick={() => addToCart(item)}
						style={{
							top: item.besteseller ? 320 : 352,
						}}
					>
						ADD TO CART
					</Button>
				</Card.ImgOverlay>
				<Card.Body className="product-card-body">
					<Card.Subtitle className="product-card-category">
						{item?.category}
					</Card.Subtitle>
					<Card.Title className="product-card-title">{item?.name}</Card.Title>
					<Card.Text className="product-card-price">${item?.price}</Card.Text>
				</Card.Body>
			</Card>
		</Col>
	);
}

export default ProductsCard;
