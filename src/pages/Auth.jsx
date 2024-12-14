import React, {useState} from 'react';
import Login from "../components/Login.jsx";
import Registration from "../components/Registration.jsx";
import {motion} from "framer-motion";
import {fadeIn} from "../variants.jsx";

const Auth = () => {
	const [isRightPanelActive, setIsRightPanelActive] = useState(false);
	const handleSignUpClick = () => {
		setIsRightPanelActive(true);
	};

	const handleSignInClick = () => {
		setIsRightPanelActive(false);
	};

	return (
		<>
			<div className="auth min-h-screen flex items-center justify-center px-6 py-12">
				<div
					className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}
				>
					<div className="form-container register-container">
						<motion.div
							variants={fadeIn('left')}
							initial='hidden'
							whileInView={'show'}
							viewport={{once: false, amount: 0.3}}
							className="forms"
						>
							<h1 className="text-3xl font-bold text-center mb-1 lg:mb-4">Register</h1>
							<div className="flex justify-center p-4">
								<Registration/>
							</div>
						</motion.div>
					</div>
					<div className="form-container login-container">
						<motion.div
							variants={fadeIn('right')}
							initial='hidden'
							whileInView={'show'}
							viewport={{once: false, amount: 0.3}}
							className="forms"
						>
							<h1 className="text-3xl font-bold text-center mb-4">Login</h1>
							<div className="flex justify-center">
								<Login />
							</div>
						</motion.div>
					</div>
					<div className="overlay-container">
						<div className="overlay">
							<div className="overlay-panel overlay-left">
								<h1 className="text-2xl font-semibold p-2">Welcome!</h1>
								<p className="text-lg">
									Enter the credentials to register and participate in auctions.
								</p>
								<div className="pt-3">
									<button className='text-md px-6 py-2 bg-transparent font-bold text-white border border-white rounded-xl
								hover:bg-white hover:text-red-800 duration-200 transform active:scale-95 focus:outline-none'
													onClick={handleSignInClick}>
										Login
									</button>
								</div>
							</div>
							<div className="overlay-panel overlay-right">
								<h1 className="text-2xl font-semibold p-2">Hello, Friend!</h1>
								<p className="text-lg">
									Enter your account details and find out what is going on.
								</p>
								<div className="p-4">
									<button className='text-md px-6 py-2 bg-transparent font-bold text-white border border-white rounded-xl
								hover:bg-white hover:text-red-800 duration-200 transform active:scale-95 focus:outline-none'
													onClick={handleSignUpClick}>
										Register
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Auth;
