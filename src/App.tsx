import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProducts from "./components/pages/AddProducts";
import Home from "./components/pages/Home";
import { ProductsContextProvider } from "./contexts/ProductContext";
import "./App.css";

function App() {
	return (
		<div className="App">
			<ProductsContextProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Home />} />
						{/* Created an extra page in order to add faster products to Firebase */}
						<Route path="/add" element={<AddProducts />} />
					</Routes>
				</BrowserRouter>
			</ProductsContextProvider>
		</div>
	);
}

export default App;
