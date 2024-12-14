import React, {useContext, useState} from 'react';
import {collection, getDocs, query, where} from 'firebase/firestore';
import {db} from '../utils/firebaseConfig.jsx';
import {useNavigate} from 'react-router-dom';
import {UserContext} from '../utils/UserContext.jsx';

const Login = () => {
	const {setUser} = useContext(UserContext);
	const [form, setForm] = useState({username: '', password: ''});
	const navigate = useNavigate();

	const handleChange = (e) => {
		setForm({...form, [e.target.name]: e.target.value});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!form.username || !form.password) {
			alert('Please fill in both fields.');
			return;
		}

		const userQuery = query(collection(db, 'users'), where('username', '==', form.username));
		const userSnapshot = await getDocs(userQuery);
		if (userSnapshot.empty) {
			alert('Invalid username or password!');
			return;
		}

		const userData = userSnapshot.docs[0].data();

		if (userData.password === form.password) {
			alert('Login successful!');
			setUser({...userData, id: userSnapshot.docs[0].id});
			navigate('/auctions');
		} else {
			alert('Invalid username or password!');
		}
	};

	return (
		<>
			<form className='w-full max-w-lg' onSubmit={handleSubmit}>
				<div className='flex flex-wrap -mx-3 mb-6'>
					<div className='w-full px-3 lg:px-0'>
						<input
							className='font-semibold block w-full bg-gray-200 text-red-800 border border-gray-200 rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white focus:border-red-800 transition duration-200'
							id='grid-username' type='text' name='username' placeholder='Username' onChange={handleChange} />
					</div>
				</div>
				<div className='flex flex-wrap -mx-3 mb-6'>
					<div className='w-full px-3 lg:px-0'>
						<input
							className='font-semibold block w-full bg-gray-200 text-red-800 border border-gray-200 rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white focus:border-red-800 transition duration-200'
							id='grid-password' type='password' name='password' placeholder='Password' onChange={handleChange} />
					</div>
				</div>
				<button	className='text-md px-6 py-2 bg-transparent font-bold text-red-800 border border-red-800 rounded-xl
								hover:bg-red-800 hover:text-white duration-200 transform active:scale-95 focus:outline-none' type='submit'>
					Login
				</button>
			</form>
		</>
	);
}

export default Login;