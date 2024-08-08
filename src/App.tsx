import Toast from './components/Toast';
import { router } from './lib/routes';
import { Providers } from './store/Providers';
import { RouterProvider } from 'react-router-dom';

function App() {
	return (
		<Providers>
			<Toast />
			<RouterProvider router={router} />
		</Providers>
	);
}

export default App;
