import React, { createContext, useCallback, useMemo, useState } from "react";
import { CartItemProps } from "../components/Cart";
import { ProductProps } from "../components/ProductsCard";

export const CartContext = createContext({
	cartItems: [] as CartItemProps[],
	addToCart: (_selectedItem: ProductProps) => {},
	removeFromCart: (_id: string) => {},
	clearCart: () => {},
	getTotalCartItems: () => 0 as number,
	cartOpen: false,
	setCartOpen: (_value: boolean) => {},
});

export const CartContextProvider: React.FC<any> = (props) => {
	const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
	const [cartOpen, setCartOpen] = useState(false);

	const addToCart = (selectedItem: ProductProps) => {
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

	const removeFromCart = (id: string) => {
		setCartItems((prev) =>
			prev.reduce((prevItem, item) => {
				if (item.item.id === id) {
					if (item.quantity === 1) {
						return prevItem;
					}
					return [...prevItem, { ...item, quantity: item.quantity - 1 }];
				} else {
					return [...prevItem, item];
				}
			}, [] as CartItemProps[])
		);
	};

	const clearCart = () => {
		setCartItems([]);
	};

	const getTotalCartItems = useCallback(
		() => cartItems.reduce((prev, item) => prev + item.quantity, 0),
		[cartItems]
	);

	const contextValue = useMemo(
		() => ({
			cartItems,
			addToCart,
			removeFromCart,
			clearCart,
			getTotalCartItems,
			cartOpen,
			setCartOpen,
		}),
		[cartItems, cartOpen, getTotalCartItems]
	);

	return (
		<CartContext.Provider value={contextValue}>
			{props.children}
		</CartContext.Provider>
	);
};
