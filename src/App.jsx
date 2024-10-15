import React, {useState} from 'react';
import Routes from "./routes/Routes.jsx";
import {UserProvider} from './utils/UserContext';

const App = () => {
	const [user, setUser] = useState(null);

	return (
		<div className='font-sans'>
			<Routes/>
		</div>
	);
};

export default App;
