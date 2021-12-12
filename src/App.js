import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';

import styles from './App.module.css';
import Dropdown from './features/Dropdown/Dropdown';

function App() {
	const [data, setData] = useState([]);
	const [formData, setFormData] = useState({ states: [], cities: [] });

	const [areSelected, setAreSelected] = useState([]);

	const [selectedStates, setSelectedStates] = useState([]);

	const [isOpen, setIsOpen] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:5000/data').then((res) => {
			setData(res.data);
		});
	}, []);
	const isFirstRender = useRef(true);
	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		axios.post('http://localhost:5000/post', formData);
	}, [formData]);

	const onChangeHandler = (item, type) => {
		if (!selectedStates.some((arr) => arr.id === item.id)) {
			setSelectedStates([...selectedStates, item]);
			setAreSelected([...areSelected, ...item.city]);
			// setIsOpen([...isOpen, item.id]);
		} else {
			var temp = selectedStates;
			temp = temp.filter((e) => e.id !== item.id);
			var cityArr = item.city;
			// console.log(cityArr);
			setSelectedStates([...temp]);
			var filteredArray = areSelected.filter(
				(e) => !cityArr.filter((ele) => ele.name === e.name).length
			);
			setAreSelected(filteredArray);
		}
		temp = [];
		selectedStates.forEach((e) => temp.push(e.state));
	};
	const handleOnChange = (item) => {
		if (!areSelected.some((arr) => arr.name === item.name)) {
			setAreSelected([...areSelected, item]);
		} else {
			var temp = areSelected;
			temp = temp.filter((e) => e.name !== item.name);
			setAreSelected([...temp]);
		}
	};
	const handleSubmit = () => {
		var cities = [];
		var states = [];
		areSelected.forEach((e) => {
			cities.push(e.name);
		});
		selectedStates.forEach((e) => states.push(e.state));
		setFormData({ cities: cities, states: states });

		// console.log(formData);
	};
	const isStateSelected = (item) => {
		return selectedStates.some((arr) => arr.id === item.id);
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
											key={data.id}
											title={data.state}
											items={data.city}
											areSelected={areSelected}
											handleOnChange={handleOnChange}
											allSelected={isStateSelected(data)}></Dropdown>
									</div>
								</div>
							);
						})}
					</div>
				);
			})}
			<button onClick={handleSubmit}>Submit</button>
		</div>
	);
}

export default App;
