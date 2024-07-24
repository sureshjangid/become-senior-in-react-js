import React, { useEffect, useRef, useState } from 'react';
import Table from './Table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { confirmAlert } from 'react-confirm-alert';
import { useTranslation } from 'react-i18next';

function TableWithActions({ columns, rows, actionFunctions, editIndex, isDeleting }) {
	const { t } = useTranslation();
	const handleDeleteOpen = index => {
		confirmAlert({
			title: t('Are you sure you want to Delete'),
			message: t('Are you sure to do this.'),
			buttons: [
				{
					label: t('Delete'),
					onClick: () => actionFunctions?.delete(index)
				},
				{
					label: t('Cancel'),
					onClick: () => console.log('Cancel clicked')
				}
			]
		});
	};

	const actionColumn = {
		label: 'Actions',
		render: (_, index) => {
			return (
				<div>
					{editIndex !== index && (
						<EditIcon
							onClick={() => {
								actionFunctions?.edit(index);
							}}
						/>
					)}

					{!isDeleting ? (
						<DeleteIcon onClick={() => handleDeleteOpen(index)} />
					) : (
						<DeleteIcon style={{ color: '#cdcdcd' }} />
					)}
				</div>
			);
		}
	};

	let [actionColumns, setActionColumns] = useState([...columns, actionColumn]);

	useEffect(() => {
		const actionColIndex = actionColumns.findIndex(e => e.label === 'Actions');
		actionColumns[actionColIndex] = actionColumn;
		setActionColumns([...actionColumns]);
	}, [rows, editIndex]);

	return (
		<>
			<Table {...{ rows, columns: actionColumns }} />
		</>
	);
}

export default TableWithActions;
