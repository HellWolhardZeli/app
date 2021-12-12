import axios from 'axios';
import React, { useEffect, useState } from 'react';

import styles from './App.module.css';
import Dropdown from './features/Dropdown/Dropdown';

function App() {
	const [data, setData] = useState([]);

	const [areSelected, setAreSelected] = useState([]);

	const [selectedStates, setSelectedStates] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:5000/data').then((res) => {
			setData(res.data);
		});
	}, []);
	// useEffect(() => {
	// 	selectedStates;
	// });

	const onChangeHandler = (item, type) => {
		if (!selectedStates.some((arr) => arr.id === item.id)) {
			setSelectedStates([...selectedStates, item]);
		} else {
			var temp = selectedStates;
			temp = temp.filter((e) => e.id !== item.id);
			setSelectedStates([...temp]);
		}
		temp = [];
		selectedStates.forEach((e) => temp.push(e.state));
	};
	const handleOnChange = (item) => {
		if (!areSelected.some((arr) => arr.id === item.id)) {
			setAreSelected([...areSelected, item]);
		} else {
			var temp = areSelected;
			temp = temp.filter((e) => e.id !== item.id);
			setAreSelected([...temp]);
		}
	};

	return (
		<div className={styles.container}>
			{data.map((data) => {
				return (
					<div>
						{<div>{data.country}</div>}
						{data.state.map((data) => {
							return (
								<div className={styles.state}>
									<div className={styles.checkBox}>
										<input
											type='checkbox'
											onChange={() => onChangeHandler(data, 'state')}>
											{/* {selectedStates.find((e) => e.id === data.id)
											? 'Selected'
											: 'Not Selected'} */}
										</input>
									</div>

									<div className={styles.dropdown}>
										<Dropdown
											title={data.state}
											items={data.city}
											areSelected={areSelected}
											handleOnChange={handleOnChange}></Dropdown>
									</div>
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
}

export default App;
