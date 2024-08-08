import { useMutation } from '@tanstack/react-query';
import useToast from '../../hooks/useToast';
import { MessageType } from '../../store/MessageProvider';
import { SubmitHandler, useForm } from 'react-hook-form';
import { login } from '../../lib/auth_helper';
import { Loader2 } from 'lucide-react';
import { useAuthContext } from '../../store/AuthProvider';
import { redirect } from 'react-router-dom';

export type LoginFormInput = {
	username: string;
	password: string;
};

const LoginForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<LoginFormInput>();

	const toast = useToast();

	const { login: loginLocally } = useAuthContext();

	const { mutate, isPending } = useMutation({
		mutationFn: login,
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

				reset({ password: '' });
			} else {
				toast(payload.message);
				loginLocally(payload.data['auth_token']);
				redirect('/dashboard');
			}
		},
		onError: (error) => {
			toast(error.message, MessageType.ERROR);
		},
	});

	// const { push } = useRouter();

	// const searchParams = useSearchParams();

	const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
		mutate({ username: data.username, password: data.password });
	};

	return (
		<form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
			<div className='relative'>
				<input
					id='username-field'
					required
					{...register('username', {
						required: 'This field is required',
						minLength: {
							value: 6,
							message:
								'Username should contain atleast 6 characters',
						},
					})}
					className={`form-input peer ${errors.username && 'error'}`}
					title='Username'
					type='text'
				/>
				<label
					className={`form-label ${
						errors.username && 'text-red-500'
					}`}
					htmlFor='username-field'>
					Username
				</label>
			</div>
			{errors.username && (
				<p className='text-xs text-red-500'>
					{errors.username.message}
				</p>
			)}
			<div className='relative'>
				<input
					id='password-field'
					required
					{...register('password', {
						required: 'This field is required',
						minLength: {
							value: 6,
							message:
								'Password should contain atleast 6 characters',
						},
					})}
					className={`form-input peer ${errors.password && 'error'}`}
					title='Password'
					type='password'
				/>
				<label
					htmlFor='password-field'
					className={`form-label  ${
						errors.password && 'text-red-500'
					}`}>
					Password
				</label>
			</div>
			{errors.password && (
				<p className='text-xs text-red-500'>
					{errors.password.message}
				</p>
			)}
			<button
				disabled={isPending}
				title='Login'
				type='submit'
				className='primary-button'>
				{isPending ? (
					<Loader2 className='animate-spin mx-auto' />
				) : (
					'Login'
				)}
			</button>
		</form>
	);
};

export default LoginForm;
