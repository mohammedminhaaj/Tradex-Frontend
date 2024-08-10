import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const Pagination: React.FC<{ totalRecords: number }> = ({
	totalRecords,
}: {
	totalRecords: number;
}) => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const location = useLocation();

	const numberOfPages: number = Math.ceil(totalRecords / 10);

	const buttons: JSX.Element[] = [];

	const params = new URLSearchParams(searchParams);

	const getActivePage: () => number = () => {
		for (let i: number = 1; i <= numberOfPages; i++) {
			const isPagePresent: boolean = searchParams.has('page');
			const isActive: boolean =
				(i === 1 && !isPagePresent) ||
				(isPagePresent && searchParams.get('page') === i.toString());
			if (isActive) return i;
		}
		return -1;
	};

	const activePage: number = getActivePage();

	let startPage = activePage - 2;
	let endPage = activePage + 2;

	if (startPage < 1) {
		endPage = Math.min(endPage + (1 - startPage), numberOfPages);
		startPage = 1;
	}
	if (endPage > numberOfPages) {
		startPage = Math.max(1, startPage - (endPage - numberOfPages));
		endPage = numberOfPages;
	}

	for (let i: number = startPage; i <= endPage; i++) {
		const isActive: boolean = i === activePage;
		buttons.push(
			<button
				type='button'
				disabled={isActive}
				title={`Go to page ${i}`}
				onClick={() => {
					handlePageClick(i);
				}}
				className={`px-4 py-1 rounded-xl text-sm transition-colors duration-300 ${
					isActive
						? 'bg-violet-500 text-white'
						: 'hover:bg-violet-500 hover:text-white'
				}`}
				key={`page-${i}`}>
				{i}
			</button>
		);
	}

	const handlePageClick = (page: number) => {
		page === 1
			? params.delete('page')
			: params.set('page', page.toString());
		navigate(`${location.pathname}?${params.toString()}`, {
			replace: true,
		});
	};

	const handlePreviousClick = () => {
		activePage !== 1 &&
			(activePage - 1 === 1
				? params.delete('page')
				: params.set('page', (activePage - 1).toString()));
		navigate(`${location.pathname}?${params.toString()}`, {
			replace: true,
		});
	};

	const handleNextClick = () => {
		activePage !== numberOfPages &&
			params.set('page', (activePage + 1).toString());
		navigate(`${location.pathname}?${params.toString()}`, {
			replace: true,
		});
	};

	return (
		<section className='py-5 flex justify-center items-center md:justify-end'>
			<div className='flex gap-2'>
				<button
					onClick={handlePreviousClick}
					type='button'
					title='Previous'
					disabled={activePage === startPage}
					className='text-violet-500 p-1 rounded-xl transition-colors duration-300 hover:bg-violet-500 hover:text-white disabled:text-gray-500 disabled:hover:bg-transparent'>
					<ChevronLeft size={20} />
				</button>
				{buttons}
				<button
					onClick={handleNextClick}
					disabled={activePage === endPage}
					type='button'
					title='Next'
					className='text-violet-500 p-1 rounded-xl transition-colors duration-300 hover:bg-violet-500 hover:text-white disabled:text-gray-500 disabled:hover:bg-transparent'>
					<ChevronRight size={20} />
				</button>
			</div>
		</section>
	);
};

export default Pagination;
