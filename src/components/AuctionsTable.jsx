import React, { useContext, useEffect, useState } from 'react';
import { db } from '../utils/firebaseConfig.jsx';
import { collection, getDocs, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { UserContext } from '../utils/UserContext.jsx';

const AuctionsTable = ({ onAuctionClick }) => {
	const { user } = useContext(UserContext);
	const [auctions, setAuctions] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchAuctions = async () => {
			try {
				const auctionsCollection = collection(db, 'auctions');
				const auctionSnapshot = await getDocs(auctionsCollection);
				const auctionList = await Promise.all(
					auctionSnapshot.docs.map(async (auctionDoc) => {
						const auctionData = auctionDoc.data();
						const endDate = auctionData.end_date?.toDate
							? auctionData.end_date.toDate()
							: auctionData.end_date;
						const sellerRef = doc(db, 'users', auctionData.seller_id);
						const sellerDoc = await getDoc(sellerRef);

						const sellerName = sellerDoc.exists()
							? sellerDoc.data().first_name
							: 'Unknown Seller';
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
			} finally {
				setLoading(false);
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
		<div className="max-w-full mx-auto px-4">
			{loading ? (
				<div className="w-10 h-10 border-4 border-t-red-800 border-gray-300 rounded-full animate-spin mx-auto mt-16"></div>
			) : (
				<div>
					<table className="table-auto w-full border-collapse">
						<thead className="text-xs uppercase text-black bg-gray-50">
						<tr>
							<th scope="col" className="px-5 py-2 whitespace-nowrap">
								<span className="text-center">Product</span>
							</th>
							<th scope="col" className="px-5 py-2 whitespace-nowrap">
								<span className="text-center">Seller</span>
							</th>
							<th scope="col" className="px-5 py-2 whitespace-nowrap">
								<span className="text-left">Top Bid</span>
							</th>
							<th scope="col" className="px-5 py-2 whitespace-nowrap">
								<span className="text-left">Time Remaining</span>
							</th>
							<th scope="col" className="px-5 py-2 whitespace-nowrap"></th>
						</tr>
						</thead>
						<tbody className="text-sm divide-y divide-gray-100">
						{auctions.map((auction) => (
							<tr
								key={auction.id}
								className="hover:bg-red-800 hover:text-white transition duration-200 text-md cursor-pointer"
							>
								<td className="px-5 py-2 whitespace-nowrap"
										onClick={() => onAuctionClick(auction)}>
									<div className="flex items-center">
										<div className="font-semibold">{auction.product_name}</div>
									</div>
								</td>
								<td className="px-5 py-2 whitespace-nowrap">
									<div className="text-left">{auction.seller_name}</div>
								</td>
								<td className="px-5 py-2 whitespace-nowrap">
									<div className="text-left">${auction.current_bid}</div>
								</td>
								<td className="px-5 py-2 whitespace-nowrap">
									<div className="text-left">{calculateTimeRemaining(auction.end_date)}</div>
								</td>
								<td className="px-5 whitespace-nowrap text-end">
									{user && auction.seller_id === user.id && (
										<button
											type="button"
											className="font-semibold inline-flex items-center text-sm rounded-lg border border-transparent focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
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
			)}
		</div>
	);
};

export default AuctionsTable;