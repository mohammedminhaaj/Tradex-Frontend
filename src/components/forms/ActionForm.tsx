import { Check, Loader2, X } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useToast from '../../hooks/useToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { modifyUserStock } from '../../lib/stock_helper';
import { MessageType } from '../../store/MessageProvider';
import { useAuthContext } from '../../store/AuthProvider';
import { redirect } from 'react-router-dom';

export enum ActionMode {
	BUY = 'buy',
	SELL = 'sell',
}

export type ActionFormInput = {
	quantity: number;
};

type ActionFormProps = {
	mode: ActionMode;
	onCancel: () => void;
	toggleDetailsModal: () => void;
	name: string;
	availableQuantity?: number | undefined;
};

const ActionForm: React.FC<ActionFormProps> = ({
	mode,
	onCancel,
	toggleDetailsModal,
	name,
	availableQuantity,
}: ActionFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ActionFormInput>();

	const toast = useToast();

	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: modifyUserStock,
		onSuccess: async (response) => {
			const payload = await response.json();
			if (response.status >= 400) {
				if (payload.data) {
					for (const field of Object.keys(payload.data)) {
						toast(
							`${field}: ${payload.data[field][0]}`,
							MessageType.ERROR
						);
					}
				} else {
					toast(payload.message, MessageType.ERROR);
				}
			} else {
				toast(payload.message);
				toggleDetailsModal();
				queryClient.invalidateQueries({ queryKey: ['userStocks'] });
			}
		},
		onError: (error) => {
			toast(error.message, MessageType.ERROR);
		},
	});

	const { userToken } = useAuthContext();

	const onSubmit: SubmitHandler<ActionFormInput> = async (data) => {
		if (!userToken) redirect('/login');
		else
			mutate({
				quantity: data.quantity,
				name: name,
				mode: mode,
				token: userToken,
			});
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='w-full flex justify-center items-center gap-2'>
			<fieldset className='flex flex-col'>
				<label htmlFor='stock-quantity' className='sr-only'>
					Quantity
				</label>
				<input
					required
					placeholder='Enter Quantity'
					id='stock-quantity'
					{...register('quantity', {
						required: 'This field is required',
						min: {
							value: 1,
							message: "Negative numbers? Seriously?"
						},
						...(mode === ActionMode.SELL && {
							max: {
								value: availableQuantity!,
								message: 'Cannot sell more than you own.',
							},
						}),
					})}
					title='Quantity'
					type='number'
					className='basis-7/12 border rounded-xl p-2 w-full focus:ring-violet-500 outline-violet-500'
				/>
				{errors.quantity && (
					<p className='text-xs text-red-500'>
						{errors.quantity.message}
					</p>
				)}
			</fieldset>
			<button
				type='submit'
				disabled={isPending}
				title={mode}
				className='w-full basis-4/12 bg-violet-500 hover:bg-violet-500 transition-all duration-300 text-white disabled:bg-gray-500 rounded-xl px-4 py-2 uppercase flex justify-center items-center gap-2 hover:gap-4'>
				{isPending ? (
					<Loader2 className='animate-spin' />
				) : (
					<>
						<Check className='size-4' />
						{mode}
					</>
				)}
			</button>
			<button
				type='button'
				title='Cancel'
				onClick={onCancel}
				className='basis-1/12 w-full'>
				<X className='mx-auto' />
			</button>
		</form>
	);
};

export default ActionForm;
