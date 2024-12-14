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
		<div className='w-full pt-16 overflow-hidden'>
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
					viewport={{once: false, amount: 0.2}}
					className='flex mx-auto'>
					{user ? (
						<>
							<h4 className='font-semibold text-2xl'>Hi, {user.first_name}</h4>
							<button	className='mx-3 text-sm px-2 py-2 bg-transparent font-bold text-red-800 border border-red-800 rounded-xl
								hover:bg-red-800 hover:text-white duration-200 transform active:scale-95 focus:outline-none' onClick={handleLogout}>
								Logout
							</button>
						</>
					) : (
						<button	className='text-sm px-2 py-2 bg-transparent font-bold text-red-800 border border-red-800 rounded-xl
								hover:bg-red-800 hover:text-white duration-200 transform active:scale-95 focus:outline-none' onClick={handleLogout}>
							Login Again
						</button>
					)}
				</motion.div>
			</div>
			<motion.div
				variants={fadeIn('up')}
				initial='hidden'
				whileInView={'show'}
				viewport={{once: false, amount: 0.2}}
				className="flex items-center justify-center px-6 py-12">
				<div className="overflow-auto">
					<AuctionsTable onAuctionClick={handleAuctionClick}/>
				</div>
			</motion.div>
			<div className='flex flex-1 justify-between items-center'>
				{user && (
					<>
						<button
							className='mx-auto text-sm px-4 py-4 bg-transparent font-bold text-red-800 border border-red-800 rounded-xl
								hover:bg-red-800 hover:text-white duration-200 transform active:scale-95 focus:outline-none'
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
