import NavigationBar from '../components/NavigationBar';

const DashboardLayout: React.FC<{
	children: React.ReactNode;
}> = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<NavigationBar />
			<main className='mt-12 md:mt-20 p-5'>{children}</main>
		</>
	);
};

export default DashboardLayout;
