import React, {useState, useEffect, useContext} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {doc, updateDoc, getDoc} from 'firebase/firestore';
import {db} from '../utils/firebaseConfig.jsx';
import {getAuth} from 'firebase/auth';
import {UserContext} from '../utils/UserContext.jsx';
import {motion} from 'framer-motion';
import {fadeIn} from '../variants.jsx';

const Auction = () => {
	const {user, setUser} = useContext(UserContext);
	const [bid, setBid] = useState(0);
	const [highestBidder, setHighestBidder] = useState('Unknown Bidder');
	const location = useLocation();
	const auction = location.state?.auction;
	const navigate = useNavigate();

	useEffect(() => {
		const fetchHighestBidder = async () => {
			if (auction.bidder_id) {
				try {
					const bidderRef = doc(db, 'users', auction.bidder_id);
					const bidderSnap = await getDoc(bidderRef);

					if (bidderSnap.exists()) {
						setHighestBidder(bidderSnap.data().first_name);
					}
				} catch (error) {
					console.error('Error fetching highest bidder: ', error);
				}
			}
		};

		fetchHighestBidder();
	}, [auction.bidder_id]);

	const handleLogout = () => {
		const auth = getAuth();
		auth.signOut().then(() => {
			navigate('/');
			setUser(null);
		});
	};

	const handleBidding = (e) => {
		setBid(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (bid <= auction.current_bid || !bid) {
			alert('Bid needs to be higher than the current one!');
			return;
		}

		const newAmount = user.amount - parseFloat(bid);

		if (newAmount < 0) {
			alert('You don’t have enough budget to place this bid!');
			return;
		}

		try {
			const auctionRef = doc(db, 'auctions', auction.id);
			await updateDoc(auctionRef, {
				current_bid: parseFloat(bid),
				bidder_id: user.id
			});

			const userRef = doc(db, 'users', user.id);
			await updateDoc(userRef, {
				amount: newAmount
			});

			setUser((prevUser) => ({...prevUser, amount: newAmount}));
			alert('Your bid was placed successfully!');
			navigate('/auctions');

		} catch (error) {
			console.error('Error placing bid: ', error);
			alert('Failed to place bid. Try again.');
		}
	};

	const returnToHomepage = (e) => {
		e.preventDefault();
		navigate('/auctions');
	};

	const calculateTimeRemaining = (endDate) => {
		const timeDiff = new Date(endDate) - new Date();
		if (timeDiff <= 0) return 'Auction ended';
		const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
		return `${days} days`;
	};

	return (
		<div className='w-full pt-16 overflow-hidden'>
			<motion.div
				variants={fadeIn('up')}
				initial='hidden'
				whileInView={'show'}
				viewport={{once: false, amount: 0.4}}
				className='container mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10'>
				<div className='flex flex-col md:flex-row justify-between items-center mb-8'>
					<h1 className='text-3xl md:text-4xl text-black font-semibold underline text-center md:text-left'>
						{auction.product_name}
						<span className='text-lg md:text-xl mx-2 block md:inline'>Created by {auction.seller_name} </span>
					</h1>
					<div className='flex flex-wrap justify-center md:justify-end mt-4 md:mt-0'>
						<button
							className='mx-2 my-2 font-semibold bg-black text-white px-4 py-2 rounded hover:bg-cyan-300 hover:text-black transition duration-300'
							onClick={returnToHomepage}
						>
							Homepage
						</button>
						<button
							className='mx-2 my-2 font-semibold bg-black text-white px-4 py-2 rounded hover:bg-cyan-300 hover:text-black transition duration-300'
							onClick={handleLogout}
						>
							Logout
						</button>
					</div>
				</div>
				<div className='flex justify-center mb-4'>
					<h3 className='text-lg md:text-xl text-black'>
						Time Remaining: {calculateTimeRemaining(auction.end_date)}
					</h3>
				</div>
				<div className='flex justify-center mb-6'>
					<p className='text-lg md:text-xl text-center'>{auction.description}</p>
				</div>
				<div className='flex flex-col md:flex-row justify-between items-center mx-auto'>
					<h1 className='text-3xl md:text-4xl text-black font-semibold mx-auto'>
						<span className='text-lg md:text-xl mx-2'>Current highest bid is</span>
						${auction.current_bid}
						<span className='text-lg md:text-xl mx-2'>by {highestBidder}</span>
					</h1>
					{user.id !== auction.seller_id && (
						<form onSubmit={handleSubmit} className='flex mt-4 md:mt-0'>
							<input
								className='font-semibold w-[300px] md:w-[350px] bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 focus:outline-none focus:bg-white focus:border-black transition duration-300'
								id='grid-bid'
								type='number'
								name='bid'
								placeholder='Place a bid above the current one'
								onChange={handleBidding}
							/>
							<button className='font-semibold bg-black text-white px-5 py-2 mx-2 rounded hover:bg-cyan-300 hover:text-black transition duration-300' type='submit'>
								BID
							</button>
						</form>
					)}
				</div>
			</motion.div>
		</div>
	);
};

export default Auction;
