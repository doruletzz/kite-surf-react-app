import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import './Filter.scss';

import filterSrc from '../../../assets/filter.svg';
import { useAppDispatch, useAppSelector } from '../../../features/app/hooks';
import { setFilter } from '../../../features/spot/slice';

const Filter = () => {
	const [isSelected, setIsSelected] = useState(false);

	const { filter } = useAppSelector((state) => state.spot);
	const dispatch = useAppDispatch();

	return (
		<div>
			{!isSelected ? (
				<h5 className='title' onClick={() => setIsSelected(true)}>
					<span>
						<img src={filterSrc} className='filter_icon' />
						Filters
					</span>
				</h5>
			) : (
				<Form className='filter_form'>
					<div
						className='close_button'
						role='button'
						onClick={() => setIsSelected(false)}
					>
						x
					</div>
					<Form.Group
						className='content'
						controlId='formCountryFilter'
					>
						<Form.Label className='label'>Country</Form.Label>
						<Form.Control
							className='control'
							value={filter.country}
							onChange={(event) =>
								dispatch(
									setFilter({
										...filter,
										country: event.target.value,
									})
								)
							}
							type='text'
							placeholder='Romania'
						/>
					</Form.Group>

					<Form.Group className='mb-3' controlId='formCountryFilter'>
						<Form.Label className='label'>
							Wind Probability
						</Form.Label>
						<Form.Control
							className='control'
							type='number'
							value={filter.probability}
							onChange={(event) =>
								dispatch(
									setFilter({
										...filter,
										probability:
											parseInt(event.target.value) &&
											parseInt(event.target.value)
												? parseInt(event.target.value)
												: 0,
									})
								)
							}
							placeholder='100'
						/>
					</Form.Group>

					<Button
						className={
							!filter.isApplied
								? 'button_apply'
								: 'button_unapply'
						}
						onClick={() =>
							dispatch(
								setFilter({
									...filter,
									isApplied: !filter.isApplied,
								})
							)
						}
					>
						{filter.isApplied ? 'Remove Filter' : 'Add Filter'}
					</Button>
				</Form>
			)}
		</div>
	);
};

export default Filter;
