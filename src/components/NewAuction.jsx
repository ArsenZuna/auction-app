import React, {useContext, useState} from 'react';
import {getAuth} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
import {addDoc, collection} from 'firebase/firestore';
import {db} from '../utils/firebaseConfig.jsx';
import {UserContext} from '../utils/UserContext.jsx';
import {motion} from 'framer-motion';
import {fadeIn} from '../variants.jsx';

const NewAuction = () => {
	const {user} = useContext(UserContext);
	const [newAuction, setNewAuction] = useState({
		product_name: '',
		description: '',
		starting_bid: 0,
		end_date: '',
	});
	const navigate = useNavigate();

	const handleChange = (e) => {
		const {name, value} = e.target;
		setNewAuction((prevAuction) => ({
			...prevAuction,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!newAuction.product_name || !newAuction.description || !newAuction.starting_bid || !newAuction.end_date) {
			alert('Please fill in all fields.');
			return;
		}

		try {
			await addDoc(collection(db, 'auctions'), {
				product_name: newAuction.product_name,
				description: newAuction.description,
				starting_bid: parseFloat(newAuction.starting_bid),
				current_bid: parseFloat(newAuction.starting_bid),
				end_date: new Date(newAuction.end_date),
				seller_id: user.id,
			});

			alert('Auction created successfully!');
			navigate('/auctions');
		} catch (error) {
			console.error('Error creating auction: ', error);
			alert('Failed to create auction. Please try again.');
		}
	};

	const handleLogout = () => {
		const auth = getAuth();
		auth.signOut().then(() => {
			navigate('/');
		});
	};

	const returnToHomepage = (e) => {
		e.preventDefault();
		navigate('/auctions');
	};

	return (
		<div className='w-full pt-16 overflow-hidden'>
			<motion.div
				variants={fadeIn('down')}
				initial='hidden'
				whileInView={'show'}
				viewport={{once: false, amount: 0.4}}
				className='container mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10'>
				<div className='flex flex-col md:flex-row justify-between items-center mb-6'>
					<h1 className='text-4xl text-black font-semibold underline text-center md:text-left'>
						New Auction
					</h1>
					<div className='flex flex-wrap justify-center md:justify-end mt-4 md:mt-0'>
						<button
							className='mx-2 my-2 font-semibold bg-black text-white px-4 py-2 rounded hover:bg-slate-300 hover:text-black transition duration-300'
							onClick={returnToHomepage}
						>
							Homepage
						</button>
						<button
							className='mx-2 my-2 font-semibold bg-black text-white px-4 py-2 rounded hover:bg-slate-300 hover:text-black transition duration-300'
							onClick={handleLogout}
						>
							Logout
						</button>
					</div>
				</div>
				<form className='pt-6' onSubmit={handleSubmit}>
					<div className='flex flex-col md:flex-row justify-center w-full'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
							<div>
								<label className='block mb-1'>Product Name</label>
								<input
									className='font-semibold w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 focus:outline-none focus:bg-white focus:border-black transition duration-300'
									type='text'
									name='product_name'
									value={newAuction.product_name}
									onChange={handleChange}
									placeholder='Enter product name'
									required
								/>
							</div>
							<div>
								<label className='block mb-1'>Starting Bid</label>
								<input
									className='font-semibold w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 focus:outline-none focus:bg-white focus:border-black transition duration-300'
									type='number'
									name='starting_bid'
									value={newAuction.starting_bid}
									onChange={handleChange}
									placeholder='Set starting bid'
									required
								/>
							</div>
							<div>
								<label className='block mb-1'>Description</label>
								<textarea
									className='font-semibold w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 focus:outline-none focus:bg-white focus:border-black transition duration-300'
									rows='5'
									name='description'
									value={newAuction.description}
									onChange={handleChange}
									placeholder='Enter product description'
									required
								/>
							</div>
							<div className='md:pt-10'>
								<label className='block mb-1'>End Date</label>
								<input
									className='font-semibold w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 focus:outline-none focus:bg-white focus:border-black transition duration-300'
									type='date'
									name='end_date'
									value={newAuction.end_date}
									onChange={handleChange}
									required
								/>
							</div>
						</div>
					</div>
					<div className='flex justify-center pt-10'>
						<button className='font-semibold bg-black text-white px-5 py-2 mx-3 rounded hover:bg-cyan-300 hover:text-black transition duration-300' type='submit'>
							Create Auction
						</button>
					</div>
				</form>
			</motion.div>
		</div>
	);
};

export default NewAuction;
