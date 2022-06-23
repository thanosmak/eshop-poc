import { useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import "../css/Filter.css";

type Prices = {
	lowerThan20: boolean;
	between20and100: boolean;
	between100and200: boolean;
	moreThan200: boolean;
};

type FilterProps = {
	setCategoryFilterData: (categoryFilterData: string[]) => void;
	setPriceFilterData: (priceFilterData: string) => void;
	isMobile: boolean;
	showMobileFilter: boolean;
	closeMobileFiler: () => void;
};

function Filter(props: FilterProps) {
	const {
		setCategoryFilterData,
		setPriceFilterData,
		isMobile,
		showMobileFilter,
		closeMobileFiler,
	} = props;
	const defaultPrices: Prices = {
		lowerThan20: false,
		between20and100: false,
		between100and200: false,
		moreThan200: false,
	};
	const [categories, setCategories] = useState<string[]>([]);
	const [price, setPrice] = useState(defaultPrices);

	const priceRadioButtonLabels = {
		lowerThan20: "Lower than $20",
		between20and100: "$20 - $100",
		between100and200: "$100 - $200",
		moreThan200: "More than $200",
	};

	const categoryCheckboxHandler = (category: string) => {
		const index = categories.findIndex((cat) => cat === category);
		if (index === -1) {
			categories.push(category);
		} else {
			categories.splice(index, 1);
		}
		setCategories(categories);
		setCategoryFilterData(categories);
	};

	const priceCheckboxHandler = <P extends keyof Prices>(
		key: P,
		value: Prices[P]
	) => {
		setPrice({ ...defaultPrices, [key]: value });
		if (value) {
			setPriceFilterData(key);
		} else {
			setPriceFilterData("");
		}
	};

	const clearFilter = () => {
		setPrice(defaultPrices);
		setPriceFilterData("");
		setCategories([]);
		setCategoryFilterData([]);
		closeMobileFiler();
	};

	const CustomCheckboxButton = (props: { name: string }) => {
		const isChecked = categories.find((el) => el === props.name);

		return (
			<label>
				<input
					type="checkbox"
					checked={isChecked !== undefined}
					onChange={() => {
						categoryCheckboxHandler(props.name);
					}}
				/>
				<span className="category-label">{props.name}</span>
			</label>
		);
	};

	const CustomRadioButtons = <P extends keyof Prices>(props: { name: P }) => {
		return (
			<label>
				<input
					type="radio"
					checked={price[props.name]}
					onChange={() => {}}
					onClick={() => priceCheckboxHandler(props.name, !price[props.name])}
				/>
				<span className="category-label">
					{priceRadioButtonLabels[props.name]}
				</span>
			</label>
		);
	};

	const FilterComponents = () => {
		return (
			<div className="container">
				<div className="filter-title">Category</div>
				<Stack gap={3} className="filter-buttons">
					{[
						"people",
						"premium",
						"pets",
						"food",
						"landmarks",
						"cities",
						"nature",
					].map((option, index) => {
						return <CustomCheckboxButton key={index} name={option} />;
					})}
				</Stack>
				<hr />
				<div className="filter-title">Price</div>
				<Stack gap={3} className="filter-buttons">
					{[
						"lowerThan20",
						"between20and100",
						"between100and200",
						"moreThan200",
					].map((option, index) => {
						return (
							<CustomRadioButtons key={index} name={option as keyof Prices} />
						);
					})}
				</Stack>
			</div>
		);
	};

	return (
		<>
			{!isMobile && FilterComponents()}

			{isMobile && (
				<Modal
					className="filter-modal"
					show={showMobileFilter}
					fullscreen={"sm-down"}
					onHide={() => closeMobileFiler()}
				>
					<Modal.Header closeButton>
						<Modal.Title>Filter</Modal.Title>
					</Modal.Header>
					<Modal.Body>{FilterComponents()}</Modal.Body>
					<Modal.Footer className="justify-content-between">
						<Button
							className="add-product-button clear-cart-button"
							onClick={() => clearFilter()}
							style={{ width: "40%", marginTop: 0 }}
						>
							Clear
						</Button>
						<Button
							className="add-product-button"
							onClick={() => closeMobileFiler()}
							style={{ width: "40%" }}
						>
							Save
						</Button>
					</Modal.Footer>
				</Modal>
			)}
		</>
	);
}

export default Filter;
