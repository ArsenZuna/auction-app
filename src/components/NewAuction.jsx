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
				className='container mx-auto bg-white rounded-2xl p-6 md:p-10'>
				<div className='flex flex-col md:flex-row justify-between items-center mb-8'>
					<div className='flex flex-wrap justify-center md:justify-end mb-4 lg:mb-0'>
						<button
							className='mx-3 text-sm px-2 py-2 bg-transparent font-bold text-red-800 border border-red-800 rounded-xl
								hover:bg-red-800 hover:text-white duration-200 transform active:scale-95 focus:outline-none'
							onClick={returnToHomepage}
						>
							Homepage
						</button>
						<button
							className='mx-3 text-sm px-2 py-2 bg-transparent font-bold text-red-800 border border-red-800 rounded-xl
								hover:bg-red-800 hover:text-white duration-200 transform active:scale-95 focus:outline-none'
							onClick={handleLogout}
						>
							Logout
						</button>
					</div>
					<h1 className='text-3xl md:text-4xl text-black font-semibold text-center md:text-left'>
						New Auction
					</h1>
				</div>
				<form className='pt-6' onSubmit={handleSubmit}>
					<div className='flex flex-col md:flex-row justify-center w-full'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
							<div>
								<label className='block mb-1'>Product Name</label>
								<input
									className='font-semibold w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 focus:outline-none focus:bg-white focus:border-black transition duration-200'
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
									className='font-semibold w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 focus:outline-none focus:bg-white focus:border-black transition duration-200'
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
									className='font-semibold w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 focus:outline-none focus:bg-white focus:border-black transition duration-200'
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
									className='font-semibold w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 focus:outline-none focus:bg-white focus:border-black transition duration-200'
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
						<button className='text-md px-4 py-4 bg-transparent font-bold text-red-800 border border-red-800 rounded-xl
								hover:bg-red-800 hover:text-white duration-200 transform active:scale-95 focus:outline-none' type='submit'>
							Create Auction
						</button>
					</div>
				</form>
			</motion.div>
		</div>
	);
};

export default NewAuction;
