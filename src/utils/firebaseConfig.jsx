import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyB4f7FDa17SFg40QvMBQAdMJLVQ0JLCi28",
	authDomain: "auctionapp-project.firebaseapp.com",
	databaseURL: "https://auctionapp-project-default-rtdb.firebaseio.com",
	projectId: "auctionapp-project",
	storageBucket: "auctionapp-project.firebasestorage.app",
	messagingSenderId: "853754778238",
	appId: "1:853754778238:web:5b4382d7b0495d3dbd7e2f",
	measurementId: "G-ZMMP3N433W"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);