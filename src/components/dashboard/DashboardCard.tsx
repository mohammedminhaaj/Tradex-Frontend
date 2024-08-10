import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type DashboardCardProps = {
	children: React.ReactNode;
	title: string;
	viewAllowed: boolean;
	link?: string | undefined;
	className?: string | undefined;
};

const DashboardCard: React.FC<DashboardCardProps> = ({
	children,
	title,
	viewAllowed,
	link,
	className,
}: DashboardCardProps) => (
	<section
		className={`${
			className ? className : '' // Allowing classnames to be included from parent component
		} shadow-xl rounded-xl p-5 space-y-5`}>
		<header className='flex justify-between items-center'>
			<h2 className='font-bold text-xl'>{title}</h2>
			{viewAllowed && ( // Check if user can click on the view all link
				<Link
					to={link || '/'} // If no link is specified, redirect to home
					title='View All'
					type='button'
					className='flex gap-2 justify-center items-center text-xs md:text-sm transition-all duration-300 hover:gap-4 hover:text-violet-500'>
					View All <ArrowRight className='size-4 md:size-5' />
				</Link>
			)}
		</header>
		{children}
	</section>
);

export default DashboardCard;
