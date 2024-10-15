import React, {useContext, useState} from 'react';
import AuctionsTable from "../components/AuctionsTable.jsx";
import {getAuth} from 'firebase/auth';
import {useNavigate} from "react-router-dom";
import {UserContext} from "../utils/UserContext.jsx";
import {motion} from "framer-motion";
import {fadeIn} from "../variants.jsx";

const Homepage = () => {
	const {user, setUser} = useContext(UserContext);
	const [selectedAuction, setSelectedAuction] = useState(null);
	const navigate = useNavigate();
	const handleLogout = () => {
		const auth = getAuth();
		auth.signOut().then(() => {
			navigate('/');
			setUser(null);
		});
	};

	const handleAuctionClick = (auction) => {
		setSelectedAuction(auction);
		navigate('/auction/information', {state: {auction}});
	};

	const handleNewAuctionClick = () => {
		navigate('/auction/new')
	}

	return (
		<div className='w-full pt-5 overflow-hidden'>
			<div className='flex flex-1 justify-between items-center'>
				<motion.h1
					variants={fadeIn('right')}
					initial='hidden'
					whileInView={'show'}
					viewport={{once: false, amount: 0.4}}
					className='font-semibold text-4xl mx-auto underline'>Current Auctions</motion.h1>
				<motion.div
					variants={fadeIn('left')}
					initial='hidden'
					whileInView={'show'}
					viewport={{once: false, amount: 0.4}}
					className='flex mx-auto'>
					{user ? (
						<>
							<h4 className='font-semibold text-2xl'>Hi, {user.first_name}</h4>
							<button className='mx-5 font-semibold bg-black text-white px-3 rounded hover:bg-cyan-300 hover:text-black transition duration-300' onClick={handleLogout}>
								Logout
							</button>
						</>
					) : (
						<button
							className='mx-5 font-semibold bg-black text-white px-3 rounded hover:bg-cyan-300 hover:text-black transition duration-300'onClick={handleLogout}>
							Login Again
						</button>
					)}
				</motion.div>
			</div>
			<motion.div
				variants={fadeIn('up')}
				initial='hidden'
				whileInView={'show'}
				viewport={{once: false, amount: 0.4}}
				className="flex items-center justify-center px-6 py-12">
				<div>
					<AuctionsTable onAuctionClick={handleAuctionClick}/>
				</div>
			</motion.div>
			<div className='flex flex-1 justify-between items-center'>
				{user && (
					<>
						<button
							className='mx-auto font-semibold bg-black text-white px-5 py-2 rounded hover:bg-cyan-300 hover:text-black transition duration-300'
							onClick={handleNewAuctionClick}>
							New Auction
						</button>
						<h4 className='mx-auto'>Your current budget: ${user.amount}</h4>
					</>
				)}
			</div>
		</div>
	);
}

export default Homepage;
