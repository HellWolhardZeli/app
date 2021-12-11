import axios from 'axios';
import React, { useEffect, useState } from 'react';

import './App.css';
import Dropdown from './features/Dropdown/Dropdown';

function App() {
	const [data, setData] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:5000/data').then((res) => {
			setData(res.data);
			console.log(res.data);
		});
	}, []);

	return (
		<div>
			{data.map((data) => {
				return (
					<div>
						{<div>{data.country}</div>}
						{data.state.map((data) => {
							return <Dropdown title={data.state} items={data.city}></Dropdown>;
						})}
					</div>
				);
			})}
		</div>
	);
}

export default App;
