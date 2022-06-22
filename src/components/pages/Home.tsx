import { useContext, useEffect, useState } from "react";
import { Col, Container, Dropdown, DropdownButton, Row } from "react-bootstrap";
import { Icon } from "react-icons-kit";
import { arrows_vertical } from "react-icons-kit/ikons/arrows_vertical";
import { mix } from "react-icons-kit/entypo/mix";
import FeaturedProduct from "../FeaturedProduct";
import FilterContainer from "../FilterContainer";
import NavigationBar from "../NavigationBar";
import ProductsContainer from "../ProductsContainer";
import { ProductProps } from "../ProductsCard";
import { CartItemProps } from "../Cart";
import { ProductsContext } from "../../contexts/ProductContext";
import "../../css/Home.css";

function Home() {
	const [products, setProducts] = useState<ProductProps[]>([]);
	const [sortTitle, setSortTitle] = useState<string>("name");
	const [sortingValue, setSortingValue] = useState<string>("name");
	const [categoryFilterData, setCategoryFilterData] = useState<string[]>([]);
	const [priceFilterData, setPriceFilterData] = useState("");
	const [cartOpen, setCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
	const [isMobile, setIsMobile] = useState(false);
	const [showMobileFilter, setShowMobileFilter] = useState(false);

	const { productsList } = useContext(ProductsContext);

	// Product list functions
	const handleCategoryFilterData = (filterData: string[]) => {
		setCategoryFilterData([...filterData]);
	};

	const handlePriceFilterData = (filterData: string) => {
		setPriceFilterData(filterData);
	};

	const handleSortButtonTitle = (sortValue: string) => {
		setSortTitle(sortValue);
		setSortingValue(sortValue);
	};

	const handleAscendDescend = () => {
		if (sortingValue[0] === "-") {
			setSortingValue(sortingValue.substring(1));
		} else {
			setSortingValue("-" + sortingValue);
		}
	};

	// Cart functions
	const handleAddToCart = (selectedItem: ProductProps) => {
		setCartItems((prev) => {
			// Check if item is already in cart
			const indexOfItemInCart = prev.findIndex(
				(item) => item.item.id === selectedItem.id
			);
			const cartItem: CartItemProps = {
				item: selectedItem,
				quantity: 1,
			};
			const copyOfCartItems = JSON.parse(JSON.stringify(prev));

			// Not in cart
			if (indexOfItemInCart === -1) {
				return [...copyOfCartItems, cartItem];
			} else {
				copyOfCartItems[indexOfItemInCart].quantity++;
				return copyOfCartItems;
			}
		});

		setCartOpen(true);
	};

	const handleRemoveFromCart = (id: string) => {
		setCartItems((prev) =>
			prev.reduce((prevItem, item) => {
				if (item.item.id === id) {
					if (item.quantity === 1) return prevItem;
					return [...prevItem, { ...item, quantity: item.quantity - 1 }];
				} else {
					return [...prevItem, item];
				}
			}, [] as CartItemProps[])
		);
	};

	const handleClearCart = () => {
		setCartItems([]);
		setCartOpen(false);
	};

	const getTotalCartItems = (items: CartItemProps[]) =>
		items.reduce((prev, item) => prev + item.quantity, 0);

	const openFilterModal = () => {
		setShowMobileFilter(true);
	};

	useEffect(() => {
		setProducts(productsList);
		const windowWidth = window.innerWidth <= 576;
		setIsMobile(windowWidth);
	}, [productsList]);

	return (
		<div className="home-wrapper">
			<NavigationBar
				cartItems={cartItems}
				cartOpen={cartOpen}
				cartItemsLength={getTotalCartItems(cartItems)}
				onCartOpen={() => setCartOpen(true)}
				onCartClose={() => setCartOpen(false)}
				clearCart={() => handleClearCart()}
				handleAddToCart={handleAddToCart}
				handleRemoveFromCart={handleRemoveFromCart}
			/>
			<FeaturedProduct products={products} handleAddToCart={handleAddToCart} />
			<Container className="main-body-container">
				<Row style={{ margin: "0px auto 26px" }}>
					<Col className="main-body-title">Photography</Col>
					<Col className="sort-by-container">
						<Icon
							size={16}
							icon={arrows_vertical}
							onClick={() => handleAscendDescend()}
						/>
						<div>Sort By</div>
						<DropdownButton
							id="sort-dropdown-button"
							title={sortTitle}
							drop="down"
						>
							<Dropdown.Item onClick={() => handleSortButtonTitle("price")}>
								Price
							</Dropdown.Item>
							<Dropdown.Item onClick={() => handleSortButtonTitle("name")}>
								Name
							</Dropdown.Item>
						</DropdownButton>
					</Col>
					{isMobile && (
						<div className="filter-button-container">
							<Icon
								className="filter-button"
								size={16}
								icon={mix}
								onClick={() => openFilterModal()}
							/>
						</div>
					)}
				</Row>
				<Row>
					<Col md={3}>
						<FilterContainer
							setCategoryFilterData={handleCategoryFilterData}
							setPriceFilterData={handlePriceFilterData}
							isMobile={isMobile}
							showMobileFilter={showMobileFilter}
							closeMobileFiler={() => setShowMobileFilter(false)}
						/>
					</Col>
					<Col md>
						<ProductsContainer
							productsData={products}
							sortingValue={sortingValue}
							selectedCategories={categoryFilterData}
							selectedPriceRange={priceFilterData}
							handleAddToCart={handleAddToCart}
						/>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default Home;
