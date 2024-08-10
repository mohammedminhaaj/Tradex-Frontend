import NavigationBar from '../components/NavigationBar';
import { motion } from 'framer-motion';

const DashboardLayout: React.FC<{
	children: React.ReactNode;
}> = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<NavigationBar />
			<motion.main
				initial={{ opacity: 0, x: -100 }}
				animate={{ opacity: 1, x: 0 }}
				exit={{ opacity: 0, x: -100 }}
				transition={{ bounce: 0 }}
				className='mt-12 md:mt-20 p-5 space-y-5'>
				{children}
			</motion.main>
		</>
	);
};

export default DashboardLayout;
