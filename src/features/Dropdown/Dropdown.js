import React, { useState, useEffect } from 'react';

import styles from './Dropdown.module.css';

export default function Dropdown({
	title,
	items,
	areSelected,
	handleOnChange,
	allSelected,
}) {
	const [isOpen, setIsOpen] = useState();

	useEffect(() => {
		if (allSelected) {
			setIsOpen(true);
		} else {
		}
	}, [allSelected, items]);

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
									areSelected.find((arr) => arr.name === item.name)
										? true
										: false
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
