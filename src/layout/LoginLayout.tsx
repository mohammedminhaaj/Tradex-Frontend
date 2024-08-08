import Logo from '../components/Logo';

const LoginLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
	children,
}: Readonly<{ children: React.ReactNode }>) => {
	return (
		<>
			<header className='flex p-5'>
				<Logo />
			</header>
			<main className='flex flex-col mx-auto w-11/12 md:w-5/12 lg:w-4/12 xl:w-3/12 gap-10'>
				<div className='flex flex-col gap-5 shadow-xl p-10 rounded-2xl'>
					{children}
				</div>
			</main>
		</>
	);
};

export default LoginLayout;
