import classnames from "classnames";
import { usePagination, DOTS } from "../utils/usePagination";
import "../css/Pagination.css";

type PaginationProps = {
	onPageChange: (page: React.SetStateAction<number>) => void;
	totalCount: number;
	siblingCount?: 1;
	currentPage: number;
	pageSize: number;
	className: string;
};

const Pagination = (props: PaginationProps) => {
	const {
		onPageChange,
		totalCount,
		siblingCount = 1,
		currentPage,
		pageSize,
		className,
	} = props;

	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	});

	// If there are less than 2 times in pagination range we shall not render the component
	if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
		return null;
	}

	const onNext = () => {
		onPageChange(currentPage + 1);
	};

	const onPrevious = () => {
		onPageChange(currentPage - 1);
	};

	let lastPage = paginationRange
		? paginationRange[paginationRange.length - 1]
		: 6;
	return (
		<ul
			className={classnames("pagination-container", { [className]: className })}
		>
			{/* Left navigation arrow */}
			<li
				className={classnames("pagination-item", {
					disabled: currentPage === 1,
				})}
				onClick={onPrevious}
			>
				<div className="arrow left" />
			</li>
			{paginationRange?.map((pageNumber) => {
				// If the pageItem is a DOT, render the DOTS unicode character
				if (pageNumber === DOTS) {
					return (
						<li key={pageNumber} className="pagination-item dots">
							&#8230;
						</li>
					);
				}

				// Render our Page Pills
				return (
					<li
						key={pageNumber}
						className={classnames("pagination-item", {
							selected: pageNumber === currentPage,
						})}
						onClick={() => onPageChange(pageNumber as number)}
					>
						{pageNumber}
					</li>
				);
			})}
			{/*  Right Navigation arrow */}
			<li
				className={classnames("pagination-item", {
					disabled: currentPage === lastPage,
				})}
				onClick={onNext}
			>
				<div className="arrow right" />
			</li>
		</ul>
	);
};

export default Pagination;
