import React, {useState} from 'react';
import {collection, addDoc, getDocs, query, where} from 'firebase/firestore';
import {db} from '../utils/firebaseConfig.jsx';

const Registration = () => {
	const [form, setForm] = useState({
		username: '',
		first_name: '',
		last_name: '',
		password: '',
		confirm_password: ''
	});

	const handleChange = (e) => {
		setForm({...form, [e.target.name]: e.target.value});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!form.username || !form.first_name || !form.last_name || !form.password || !form.confirm_password) {
			alert('Please fill in all the fields.');
		}

		if (form.password !== form.confirm_password) {
			alert('Passwords do not match!');
		}

		const userQuery = query(collection(db, 'users'), where('username', '==', form.username));
		const userSnapshot = await getDocs(userQuery);
		if (!userSnapshot.empty) {
			alert('Username already exists!');
		}

		try {
			await addDoc(collection(db, 'users'), {
				username: form.username,
				first_name: form.first_name,
				last_name: form.last_name,
				password: form.password,
				amount: 1000
			});
			alert(`Registration Successful! Try to login now, ${form.first_name}`);
		} catch (error) {
			alert('Error, could not register user!', error);
		}
	};

	return (
		<>
			<form className='w-full max-w-lg' onSubmit={handleSubmit}>
				<div className='flex flex-wrap -mx-3 mb-6'>
					<div className='w-full px-3'>
						<input className='font-semibold block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white focus:border-black transition duration-300'
							id='grid-password' type='username' name='username' placeholder='Username' onChange={handleChange} required/>
					</div>
				</div>
				<div className='flex flex-wrap -mx-3 mb-6'>
					<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
						<input className='font-semibold appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white focus:border-black transition duration-300'
							id='grid-first-name' type='text' name='first_name' placeholder='First name' onChange={handleChange}/>
					</div>
					<div className='w-full md:w-1/2 px-3'>
						<input className='font-semibold appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white focus:border-black transition duration-300'
							id='grid-last-name' type='text' name='last_name' placeholder='Last name' onChange={handleChange} required/>
					</div>
				</div>
				<div className='flex flex-wrap -mx-3 mb-6'>
					<div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
						<input className='font-semibold appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white focus:border-black transition duration-300'
							id='grid-password' type='password' name='password' placeholder='Password' onChange={handleChange} required />
					</div>
					<div className='w-full md:w-1/2 px-3'>
						<input className='font-semibold appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white focus:border-black transition duration-300'
							id='grid-password' type='password' name='confirm_password' placeholder='Confirm Password' onChange={handleChange} required />
					</div>
				</div>
				<button className='font-semibold bg-black text-white px-5 py-2 rounded hover:bg-cyan-300 hover:text-black transition duration-300' type='submit'>
					Register
				</button>
			</form>
		</>
	)
};

export default Registration;