import { ArrowRight } from 'lucide-react';

const DashboardCard: React.FC<{
	children: React.ReactNode;
	title: string;
	viewAllowed: boolean;
	className?: string | undefined;
}> = ({
	children,
	title,
	viewAllowed,
	className,
}: {
	children: React.ReactNode;
	title: string;
	viewAllowed: boolean;
	className?: string | undefined;
}) => (
	<section
		className={`${
			className ? className : ''
		} shadow-xl rounded-xl p-5 space-y-5`}>
		<header className='flex justify-between items-center'>
			<h2 className='font-bold text-xl'>{title}</h2>
			{viewAllowed && (
				<button
					title='View All'
					type='button'
					className='flex gap-2 justify-center items-center text-xs md:text-sm transition-all duration-300 hover:gap-4 hover:text-violet-500'>
					View All <ArrowRight className='size-4 md:size-5' />
				</button>
			)}
		</header>
		{children}
	</section>
);

export default DashboardCard;
