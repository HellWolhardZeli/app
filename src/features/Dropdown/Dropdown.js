import React, { useState } from 'react';

import styles from './Dropdown.module.css';

export default function Dropdown({ title, items }) {
	const [isOpen, setIsOpen] = useState(false);
	const [areSelected, setAreSelected] = useState([]);
	const handleOnClick = (item) => {
		if (!areSelected.some((arr) => arr.id === item.id)) {
			setAreSelected([...areSelected, item]);
		} else {
			var temp = areSelected;
			temp = temp.filter((e) => e.id !== item.id);
			setAreSelected([...temp]);
		}
	};

	return (
		<div>
			<div
				className={styles.main}
				onClick={() => {
					setIsOpen(!isOpen);
				}}>
				<div className={styles.title}>{title}</div>
				<div className={styles.toggle}>{isOpen ? 'Close' : 'Open'}</div>
			</div>
			{isOpen && (
				<div>
					{items.map((item) => (
						<div key={item.id}>
							<div>{item.name}</div>
							<button
								onClick={() => {
									handleOnClick(item);
								}}>
								{areSelected.find((e) => e.id === item.id)
									? 'Selected'
									: 'Not Selected'}
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
