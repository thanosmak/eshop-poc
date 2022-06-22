import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../utils/Config";
import { Button } from "react-bootstrap";

function AddProducts() {
	const [productName, setProductName] = useState("");
	const [productCategory, setProductCategory] = useState("");
	const [productPrice, setProductPrice] = useState(0);
	const [productCurrency, setProductCurrency] = useState("USD");
	const [productImage, setProductImage] = useState("");
	const [productBestseller, setProductBestseller] = useState(false);
	const [productFeatured, setProductFeatured] = useState(false);

	const addProduct = async (e: any) => {
		e.preventDefault();

		const productToAdd = {
			name: productName,
			category: productCategory,
			price: productPrice,
			currency: productCurrency,
			image: {
				src: productImage,
				alt: "",
			},
			besteseller: productBestseller,
			features: productFeatured,
			details: null,
		};
		console.log(productToAdd);

		// Add a new document with a generated id.
		const docRef = await addDoc(collection(db, "products"), productToAdd);
		console.log("Document written with ID: ", docRef.id);
	};

	return (
		<div className="container">
			<h2>Add Products</h2>
			<form autoComplete="off" className="form-group" onSubmit={addProduct}>
				<label htmlFor="product-name">Name</label>
				<br />
				<input
					type="text"
					className="form-control"
					onChange={(e) => setProductName(e.target.value)}
					value={productName}
				/>
				<br />

				<label htmlFor="product-category">Category</label>
				<br />
				<input
					type="text"
					className="form-control"
					onChange={(e) => setProductCategory(e.target.value)}
					value={productCategory}
				/>
				<br />

				<label htmlFor="product-price">Price</label>
				<br />
				<input
					type="number"
					className="form-control"
					onChange={(e) => setProductPrice(e.target.valueAsNumber)}
					value={productPrice}
				/>
				<br />

				<label htmlFor="product-currency">Currency</label>
				<br />
				<input
					type="text"
					className="form-control"
					onChange={(e) => setProductCurrency(e.target.value)}
					value={productCurrency}
				/>
				<br />

				<label htmlFor="product-image">Image URL</label>
				<br />
				<input
					type="text"
					className="form-control"
					onChange={(e) => setProductImage(e.target.value)}
					value={productImage}
				/>
				<br />

				<label htmlFor="product-bestseller">Bestseller</label>
				<br />
				<input
					type="checkbox"
					onChange={(e) => setProductBestseller(e.target.checked)}
					checked={productBestseller}
				/>
				<br />

				<label htmlFor="product-featured">Featured</label>
				<br />
				<input
					type="checkbox"
					onChange={(e) => setProductFeatured(e.target.checked)}
					checked={productFeatured}
				/>
				<br />
				<Button className="btn btn-success btn-md">ADD</Button>
			</form>
		</div>
	);
}

export default AddProducts;
