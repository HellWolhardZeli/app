import React, { useEffect, useState } from 'react';

import styles from './Dropdown.module.css';

export default function Dropdown({
	title,
	items,
	areSelected,
	handleOnChange,
}) {
	const [isOpen, setIsOpen] = useState(false);

	// useEffect(() => {
	// 	if (allSelected) {
	// 		setAreSelected(items);
	// 		setIsOpen(true);
	// 	} else {
	// 		setAreSelected([]);
	// 	}
	// }, [allSelected, items, setAreSelected]);

	return (
		<div>
			<div
				className={styles.main}
				onClick={() => {
					setIsOpen(!isOpen);
				}}>
				<div className={styles.title}>{title}</div>
			</div>
			{isOpen && (
				<div>
					{items.map((item) => (
						<div key={item.id} style={{ marginTop: '5px' }}>
							<input
								type='checkbox'
								checked={
									areSelected.find((arr) => arr.id === item.id) ? true : false
								}
								onChange={() => {
									handleOnChange(item);
								}}></input>
							<span className={styles.subItems}>{item.name}</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
