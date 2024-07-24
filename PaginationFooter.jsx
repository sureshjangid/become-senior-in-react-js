import { useState } from 'react';
import styles from '../../superAdmin/pages/dashboard/dashboard.module.scss';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { useTranslation } from 'react-i18next';
function PaginationFooter({
	limitPerPage = 10,
	currentPage = 0,
	totalPage = 0,
	numberOfButtons = 5,
	onButtonClick,
	handlePageNumber
}) {
	const [inputPage, setInputPage] = useState(currentPage);
	const { t } = useTranslation();

	const handleInputPage = e => {
		let value = parseInt(e.target.value);
		if (value <= totalPage) {
			onButtonClick(value);
			setInputPage(value);
		} else if (e.target.value === '') {
			setInputPage('');
		}
	};

	const paginationNumberArr = () => {
		let arr = [];
		if (currentPage > 2) {
			for (
				let i = currentPage - 2;
				i < (currentPage + numberOfButtons - 2 > totalPage ? totalPage + 1 : currentPage + numberOfButtons - 2);
				i++
			) {
				arr.push(i);
			}
		} else if (currentPage === 2) {
			for (
				let i = currentPage - 1;
				i < (currentPage + numberOfButtons - 1 > totalPage ? totalPage + 1 : currentPage + numberOfButtons - 1);
				i++
			) {
				arr.push(i);
			}
		} else if (currentPage === 1) {
			for (
				let i = currentPage;
				i < (currentPage + numberOfButtons > totalPage ? totalPage + 1 : currentPage + numberOfButtons);
				i++
			) {
				arr.push(i);
			}
		}

		return arr;
	};

	// const totalPages = Math.ceil(totalPage / limitPerPage);

	return (
		<div className={styles.pagination}>
			{t('Total Pages')}: {totalPage} {/* {<EditCalendarIcon onClick={() => setChange(!change)} />} */}
			{/* {!change ? (
					<> */}
			<button onClick={() => onButtonClick('pre')} disabled={currentPage === 1 || currentPage === 0}>
				Pre
			</button>
			{paginationNumberArr().map(e => {
				return (
					<button
						style={{ background: currentPage === e && '#1E4F9C', color: currentPage === e && '#fff' }}
						onClick={() => onButtonClick(e)}
					>
						{e}
					</button>
				);
			})}
			<button onClick={() => onButtonClick('next')} disabled={totalPage === 0 || currentPage === totalPage}>
				Next
			</button>
			{/* </> */}
			{/* ) : ( */}
			<>{/* <input value={inputPage} placeholder={`Page number 1-${totalPage}`} onChange={handleInputPage} /> */}</>
			{/* )} */}
		</div>
	);
}

export default PaginationFooter;
