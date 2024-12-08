import React from 'react';
import Login from "../components/Login.jsx";
import Registration from "../components/Registration.jsx";
import {motion} from "framer-motion";
import {fadeIn} from "../variants.jsx";

const Auth = () => {
	return (
		<div className="min-h-screen flex items-center justify-center px-6 py-12">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl">
				<motion.div
					variants={fadeIn('down')}
					initial='hidden'
					whileInView={'show'}
					viewport={{once: false, amount: 0.3}}
					className="bg-white p-8 shadow-md rounded-lg hover:shadow-xl">
					<h1 className="text-3xl font-bold font-mono text-center mb-4">Login</h1>
					<p className="text-center font-mono text-gray-500 mb-6">Enter your login credentials.</p>
					<div className="flex justify-center">
						<Login />
					</div>
				</motion.div>
				<motion.div
					variants={fadeIn('up')}
					initial='hidden'
					whileInView={'show'}
					viewport={{once: false, amount: 0.3}}
					className="bg-white p-8 shadow-md rounded-lg hover:shadow-xl">
					<h1 className="text-3xl font-bold font-mono text-center mb-4">Register</h1>
					<p className="text-center font-mono text-gray-500 mb-6">Enter the credentials below to register.</p>
					<div className="flex justify-center">
						<Registration />
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default Auth;
