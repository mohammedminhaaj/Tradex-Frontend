import { PoundSterling, WalletMinimal } from 'lucide-react';
import { useState } from 'react';
import ActionButton, { ActionMode } from '../forms/ActionForm';

type ActionGroupTypes = {
	name: string;
	quantity?: number | undefined;
	isLoading: boolean;
	disableSell?: boolean | undefined;
	toggleDetailsModal: () => void;
};

const ActionGroup: React.FC<ActionGroupTypes> = ({
	name,
	quantity,
	isLoading,
	disableSell,
	toggleDetailsModal,
}: ActionGroupTypes) => {
	// State to manage whether the user has clicked on 'Buy' or 'Sell'
	const [actionMode, setActionMode] = useState<ActionMode | null>(null);

	// If Action mode is selected, show the action button along with the quantity input
	return actionMode ? (
		<ActionButton
			mode={actionMode}
			onCancel={() => setActionMode(null)}
			toggleDetailsModal={toggleDetailsModal}
			name={name}
			availableQuantity={quantity}
		/>
	) : (
		// Show the Buy and Sell button if action state is null
		<>
			{!disableSell && ( // Only display the sell button if disableSell prop is false or not specificied
				<button
					onClick={() => setActionMode(ActionMode.SELL)}
					type='button'
					title='Sell'
					disabled={isLoading}
					className='w-full flex justify-center items-center gap-2 transition-all duration-300 bg-red-500 hover:bg-red-600 text-white hover:gap-4 rounded-xl px-4 py-2 disabled:hover:bg-gray-500'>
					<PoundSterling className='size-4' /> Sell
				</button>
			)}
			<button
				type='button'
				onClick={() => setActionMode(ActionMode.BUY)}
				title='Buy'
				disabled={isLoading}
				className='w-full flex justify-center items-center gap-2 bg-violet-500 text-white px-4 py-2 rounded-xl transition-all duration-300 hover:bg-violet-600 hover:gap-4 disabled:bg-gray-500'>
				<WalletMinimal className='size-4' />
				Buy
			</button>
		</>
	);
};

export default ActionGroup;
