import { Search } from 'lucide-react';
import { useId } from 'react';

const SearchBar: React.FC = () => {
	const searchId = useId();
	return (
		<form className='relative w-full md:w-fit'>
			<label htmlFor={searchId} className='sr-only'>
				Search
			</label>
			<input
				id={searchId}
				name='search'
				type='text'
				title='search'
				placeholder='Search here...'
				className='w-full md:w-fit border rounded-xl focus:ring-violet-500 outline-violet-500 px-2 pr-10 py-1 placeholder:text-sm'
			/>
			<button
				className='absolute inset-y-0 right-0 bg-violet-500 rounded-xl px-2 text-white transition-colors duration-300 hover:bg-violet-600'
				type='submit'
				title='Search'>
				<Search className='size-5' />
			</button>
		</form>
	);
};

export default SearchBar;
