import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { ProductProps } from "./ProductsCard";
import { CartContext } from "../contexts/CartContext";
import "../css/FeaturedProduct.css";

type FeaturedProductProps = {
	products: ProductProps[];
};

function FeaturedProduct(props: FeaturedProductProps) {
	const [featuredProdudct, setFeaturedProdudct] = useState<ProductProps>();
	const [isMobile, setIsMobile] = useState(false);
	const { addToCart } = useContext(CartContext);
	const { products } = props;

	const addFeaturedProductToCart = () => {
		if (featuredProdudct) {
			addToCart(featuredProdudct);
		}
	};

	useEffect(() => {
		const windowWidth = window.innerWidth <= 576;
		const featuredItem = products.find((element) => element.features);
		setIsMobile(windowWidth);
		setFeaturedProdudct(featuredItem);
	}, [products]);

	return (
		<Container className="featured-container">
			<Stack direction="horizontal" className="justify-content-md-between">
				<h3>
					<b>{featuredProdudct?.name}</b>
				</h3>
				{!isMobile && (
					<Button
						className=" add-product-button feature-add-button-desktop"
						onClick={() => addFeaturedProductToCart()}
					>
						Add to cart
					</Button>
				)}
			</Stack>

			<Row className="featured-image-section">
				<div className="feature-image-container">
					<div
						className="featured-image"
						role="img"
						aria-label={featuredProdudct?.name}
						style={{ background: `url(${featuredProdudct?.image.src})` }}
					>
						<span className="featured-product-label">Featured Product</span>
					</div>
				</div>
			</Row>
			{isMobile && (
				<Button
					className=" add-product-button feature-add-button-mobile"
					onClick={() => addFeaturedProductToCart()}
				>
					Add to cart
				</Button>
			)}
			<Row className="featured-bottom-section justify-content-md-between">
				<Col md={6} className="featured-details-container">
					<h5 className="feature-details-title">
						About the {featuredProdudct?.name}
					</h5>
					<h5 className="feature-details-sub">{featuredProdudct?.category}</h5>
					<div className="featured-details">
						{featuredProdudct?.details.description}
					</div>
				</Col>
				<Col md={4} className="featured-recommendation-container">
					<h5 className="feature-details-title">People also buy</h5>
					<Stack
						direction="horizontal"
						gap={3}
						className="justify-content-md-between"
					>
						<div
							className="featured-recommendation-image"
							role="img"
							aria-label={featuredProdudct?.details.recommendations[0].alt}
							style={{
								background: `url(${featuredProdudct?.details.recommendations[0].src})`,
							}}
						></div>
						<div
							className="featured-recommendation-image"
							role="img"
							aria-label={featuredProdudct?.details.recommendations[1].alt}
							style={{
								background: `url(${featuredProdudct?.details.recommendations[1].src})`,
							}}
						></div>
						<div
							className="featured-recommendation-image"
							role="img"
							aria-label={featuredProdudct?.details.recommendations[2].alt}
							style={{
								background: `url(${featuredProdudct?.details.recommendations[2].src})`,
							}}
						></div>
					</Stack>
					<h5 className="feature-details-title">Details</h5>
					<div className="feature-details-sub">
						Size: {featuredProdudct?.details.dimmentions.height} x{" "}
						{featuredProdudct?.details.dimmentions.width} pixel
					</div>
					<div className="feature-details-sub">
						Size:
						{featuredProdudct?.details.size &&
							featuredProdudct?.details.size / 1000}{" "}
						mb
					</div>
				</Col>
			</Row>
		</Container>
	);
}

export default FeaturedProduct;
