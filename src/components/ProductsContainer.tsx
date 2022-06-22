import React, { useEffect, useMemo, useState } from "react";
import { Container, Row } from "react-bootstrap";
import ProductsCard, { ProductProps } from "./ProductsCard";
import Pagination from "./Pagination";

let PageSize = 6;

type ProductsContainerProps = {
	productsData: ProductProps[];
	sortingValue: string;
	selectedCategories: string[];
	selectedPriceRange: string;
	handleAddToCart: (selectedItem: ProductProps) => void;
};

function ProductsContainer(props: ProductsContainerProps) {
	const { productsData, sortingValue, selectedCategories, selectedPriceRange } =
		props;
	const [currentPage, setCurrentPage] = useState(1);
	const [products, setProducts] = useState<ProductProps[]>([]);

	const getFilteredProducts = () => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;

		return products.slice(firstPageIndex, lastPageIndex);
	};

	const filteredProducts = useMemo(getFilteredProducts, [
		currentPage,
		products,
	]);

	useEffect(() => {
		const productsStringified = localStorage.getItem("products");
		let tempProducts: ProductProps[] = [];

		if (productsStringified != null) {
			tempProducts = JSON.parse(productsStringified);
			tempProducts = filterProductsByPrice(tempProducts, selectedPriceRange);
			tempProducts = filterProductsByCategory(tempProducts, selectedCategories);
			tempProducts = tempProducts.sort(sortProductByKey(sortingValue));
		}

		setProducts(tempProducts);
	}, [productsData, selectedCategories, selectedPriceRange, sortingValue]);

	useEffect(() => {
		setCurrentPage(1);
	}, [selectedCategories]);

	return (
		<Container style={{ padding: 0 }}>
			<Row>
				{filteredProducts.length > 0 ? (
					RenderProductList(props, filteredProducts)
				) : (
					<p>No items with selected filters</p>
				)}
			</Row>
			<Pagination
				className="pagination-bar"
				currentPage={currentPage}
				totalCount={products.length}
				pageSize={PageSize}
				onPageChange={(page: React.SetStateAction<number>) =>
					setCurrentPage(page)
				}
			/>
		</Container>
	);
}

function RenderProductList(
	props: ProductsContainerProps,
	products: ProductProps[]
) {
	return products.map((product, index) => {
		return (
			<ProductsCard
				key={index}
				item={product}
				handleAddToCart={props.handleAddToCart}
			/>
		);
	});
}

// Sort products by key
function sortProductByKey(key: string) {
	let sortOrder = 1;
	if (key[0] === "-") {
		sortOrder = -1;
		key = key.substring(1);
	}
	return function (a: any, b: any) {
		var result = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
		return result * sortOrder;
	};
}

// Filters products based on given categories
function filterProductsByCategory(
	products: ProductProps[],
	categories: string[]
) {
	if (categories.length === 0) {
		return products;
	}

	products = products.filter((prod) => {
		const foundCategory = categories.some((category) => {
			return prod.category === category;
		});

		return foundCategory;
	});

	return products;
}

// Filters products based on given price range
function filterProductsByPrice(products: ProductProps[], priceRange: string) {
	if (priceRange.length === 0) {
		return products;
	}

	// eslint-disable-next-line array-callback-return
	products = products.filter((prod) => {
		switch (priceRange) {
			case "lowerThan20":
				return prod.price < 20;
			case "between20and100":
				return prod.price >= 20 && prod.price < 100;
			case "between100and200":
				return prod.price >= 100 && prod.price < 200;
			case "moreThan200":
				return prod.price >= 200;
		}
	});

	return products;
}

export default ProductsContainer;
