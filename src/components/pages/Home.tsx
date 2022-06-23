import { useContext, useEffect, useState } from "react";
import { Col, Container, Dropdown, DropdownButton, Row } from "react-bootstrap";
import { Icon } from "react-icons-kit";
import { arrows_vertical } from "react-icons-kit/ikons/arrows_vertical";
import { mix } from "react-icons-kit/entypo/mix";
import FeaturedProduct from "../FeaturedProduct";
import Filter from "../Filter";
import NavigationBar from "../NavigationBar";
import ProductsContainer from "../ProductsContainer";
import { ProductProps } from "../ProductsCard";
import { ProductsContext } from "../../contexts/ProductContext";
import "../../css/Home.css";

function Home() {
	const [products, setProducts] = useState<ProductProps[]>([]);
	const [sortTitle, setSortTitle] = useState<string>("name");
	const [sortingValue, setSortingValue] = useState<string>("name");
	const [categoryFilterData, setCategoryFilterData] = useState<string[]>([]);
	const [priceFilterData, setPriceFilterData] = useState("");
	const [isMobile, setIsMobile] = useState(false);
	const [showMobileFilter, setShowMobileFilter] = useState(false);

	const { productsList } = useContext(ProductsContext);

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
			<NavigationBar />
			<FeaturedProduct products={products} />
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
						<Filter
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
						/>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default Home;
