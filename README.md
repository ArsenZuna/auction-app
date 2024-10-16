# Auction App

An auctions website similar in many ways to ebay wherein a user can post items they have for sale. All new users to the site start with
$1000 which they can use to bid with. Once logged in, the home page has a table of all current bid that can accessed leading to details 
on a separate page. From the details page users can bid on all auctions up to the amount of their remaining funds. After an auction ends, 
it pays out the proper amount to the auction poster.

## Features

- **User Authentication:** Secure login system to register and authenticate users.
- **Ongoing Auctions:** Users can look at the current ongoing auctions and select to view each of them.
- **Selected Auction Information:** Display of the selected auction information, with current highest bid and bidder, opportunity to bid and validation check if you are able to bid or not.
- **New Auctions:** Users can place out a new auction anytime they are logged in.

## Technologies Used

- **React.js:** Frontend framework.
- **Vite:** Fast build tool for modern web development.
- **React Router v6:** Enables "client side routing".
- **Firebase:** For authentication and real-time data updates.
- **TailwindCSS:** For styling the application.
- **Framer Motion:** HTML elements, supercharged with animation capabilities.

## Prerequisites

- **Node.js** (version 18+ recommended)
- **npm** (for package management)

## Installation

- **1. Clone repository**

`git clone https://github.com/ArsenZuna/auction-app.git`

`cd auction-app`

- **2. Install dependencies**

`npm install`

- **3. Start development server**

`npm run dev`

## Usage

- **Browse Auctions:** Users can view all available auctions on the homepage.
- **Place a Bid:** Users can place a bid by clicking on an auction and submitting a bid amount.
- **Manage Auctions:** Users can add new auction items, monitor active bids and delete auctions they have put out.


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

- **Licensed**