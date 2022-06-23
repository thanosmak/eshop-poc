import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProducts from "./components/pages/AddProducts";
import Home from "./components/pages/Home";
import { CartContextProvider } from "./contexts/CartContext";
import { ProductsContextProvider } from "./contexts/ProductContext";
import "./App.css";

function App() {
	return (
		<div className="App">
			<ProductsContextProvider>
				<CartContextProvider>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Home />} />
							{/* Created an extra page in order to add faster products to Firebase */}
							<Route path="/add" element={<AddProducts />} />
						</Routes>
					</BrowserRouter>
				</CartContextProvider>
			</ProductsContextProvider>
		</div>
	);
}

export default App;
