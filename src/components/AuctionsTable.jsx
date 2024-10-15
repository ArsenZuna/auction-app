import React, {useContext, useEffect, useState} from 'react';
import {db} from '../utils/firebaseConfig.jsx';
import {collection, getDocs, doc, getDoc, deleteDoc} from 'firebase/firestore';
import {UserContext} from '../utils/UserContext.jsx';

const AuctionsTable = ({onAuctionClick}) => {
	const {user, setUser} = useContext(UserContext);
	const [auctions, setAuctions] = useState([]);

	useEffect(() => {
		const fetchAuctions = async () => {
			try {
				const auctionsCollection = collection(db, 'auctions');
				const auctionSnapshot = await getDocs(auctionsCollection);
				const auctionList = await Promise.all(
					auctionSnapshot.docs.map(async (auctionDoc) => {
						const auctionData = auctionDoc.data();
						const endDate = auctionData.end_date?.toDate ? auctionData.end_date.toDate() : auctionData.end_date;
						const sellerRef = doc(db, 'users', auctionData.seller_id);
						const sellerDoc = await getDoc(sellerRef);

						const sellerName = sellerDoc.exists() ? sellerDoc.data().first_name : 'Unknown Seller';
						return {
							id: auctionDoc.id,
							...auctionData,
							end_date: endDate,
							seller_name: sellerName,
						};
					})
				);

				const sortedAuctions = auctionList.sort((a, b) => new Date(a.end_date) - new Date(b.end_date));

				setAuctions(sortedAuctions);
			} catch (error) {
				console.error('Error fetching auctions:', error);
			}
		};
		fetchAuctions();
	}, []);

	const calculateTimeRemaining = (endDate) => {
		const timeDiff = new Date(endDate) - new Date();
		if (timeDiff <= 0) return 'Auction ended';
		const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
		return `${days} days`;
	};

	const handleDelete = async (auctionId) => {
		try {
			await deleteDoc(doc(db, 'auctions', auctionId));
			setAuctions(auctions.filter((auction) => auction.id !== auctionId));
		} catch (error) {
			console.error('Error deleting auction:', error);
		}
	};

	return (
		<div className='flex flex-1 justify-center items-center align-middle p-5 md:p-10'>
			<div className='overflow-x-auto sm:w-full xl:w-[850px]'>
				<table className='min-w-full divide-y divide-gray-200 dark:divide-neutral-700 bg-white'>
					<thead>
					<tr>
						<th scope='col' className='px-5 py-3 text-start text-sm font-medium text-gray-500 uppercase dark:text-neutral-500'>Product</th>
						<th scope='col' className='px-5 py-3 text-start text-sm font-medium text-gray-500 uppercase dark:text-neutral-500'>Seller</th>
						<th scope='col' className='px-5 py-3 text-start text-sm font-medium text-gray-500 uppercase dark:text-neutral-500'>Top Bid</th>
						<th scope='col' className='px-5 py-3 text-start text-sm font-medium text-gray-500 uppercase dark:text-neutral-500'>Time Remaining</th>
						<th scope='col' className='px-5 py-3 text-end text-sm font-medium text-gray-500 uppercase dark:text-neutral-500'></th>
					</tr>
					</thead>
					<tbody className='divide-y divide-gray-200 dark:divide-neutral-700'>
					{auctions.map((auction) => (
						<tr key={auction.id} className='hover:bg-cyan-300 transition duration-300 text-md'>
							<td className='px-5 py-4 whitespace-nowrap text-black hover:font-semibold'>
								<button onClick={() => onAuctionClick(auction)}>{auction.product_name}</button>
							</td>
							<td className='px-5 py-4 whitespace-nowrap text-black hover:font-semibold'>
								<button onClick={() => onAuctionClick(auction)}>{auction.seller_name}</button>
							</td>
							<td className='px-5 py-4 whitespace-nowrap text-black hover:font-semibold'>
								<button onClick={() => onAuctionClick(auction)}>${auction.current_bid}</button>
							</td>
							<td className='px-5 py-4 whitespace-nowrap text-black hover:font-semibold'>
								<button onClick={() => onAuctionClick(auction)}>{calculateTimeRemaining(auction.end_date)}</button>
							</td>
							<td className='px-5 py-4 whitespace-nowrap text-end font-medium'>
								{user && auction.seller_id === user.id && (
									<button
										type='button'
										className='font-semibold text-[16px] inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400'
										onClick={() => handleDelete(auction.id)}
									>
										Delete
									</button>
								)}
							</td>
						</tr>
					))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AuctionsTable;
