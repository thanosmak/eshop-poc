import React, { createContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/Config";
import { ProductProps } from "../components/ProductsCard";

export const ProductsContext = createContext({
	productsList: [] as ProductProps[],
});

export const ProductsContextProvider: React.FC<any> = (props) => {
	const [productsList, setProducts] = useState<ProductProps[]>([]);

	useEffect(() => {
		const setProductsToLocalStorage = (products: ProductProps[]) => {
			localStorage.setItem("products", JSON.stringify(products));
		};

		const getProducts = async () => {
			const prevProducts: ProductProps[] = [];
			try {
				const querySnapshot = await getDocs(collection(db, "products"));
				querySnapshot.forEach((doc) => {
					prevProducts.push({ ...doc.data(), id: doc.id } as ProductProps);
				});
				setProducts(prevProducts);
				setProductsToLocalStorage(prevProducts);
			} catch (error) {
				console.log(error);
			}
		};

		getProducts();
	}, []);

	return (
		<ProductsContext.Provider value={{ productsList }}>
			{props.children}
		</ProductsContext.Provider>
	);
};
