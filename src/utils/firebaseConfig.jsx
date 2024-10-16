import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
	apiKey: "your-api-key",
	authDomain: "your-auth-domain",
	databaseURL: "your-database-url",
	projectId: "your-project-id",
	storageBucket: "your-storage-bucket",
	messagingSenderId: "your-messaging-sender-id",
	appId: "your-app-id",
	measurementId: "your-measurement-id"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);