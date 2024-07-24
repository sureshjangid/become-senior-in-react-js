import spinner from 'src/assets/images/spinner.gif';
import FormRenderer from './FilterHeader';
import PaginationFooter from './PaginationFooter';
import Table from './Table';
import styles from './table.module.scss';

function FilterTable({
	filterSchema = null,
	columns = null,
	rows = null,
	onFilterSubmit = null,
	secondaryHeaderBody = null,
	onPaginationButtonClick = null,
	currentPage = null,
	isLoading = null,
	totalPage = null,
	showSNo = null,
	onEveryChangeOfFilter = null,
	addButtonLabel = null,
	addButtonOnClick = null,
	radioFilterComponent = false,
	handlePageNumber = null,
	limitPerPage = null,
	sideFilterhide = false
}) {
	return (
		<div className={styles.rolePermission}>
			{!!filterSchema && (
				<>
					{sideFilterhide && radioFilterComponent && (
						<FormRenderer
							{...{
								formSchema: filterSchema,
								onSubmit: onFilterSubmit,
								showSubmitButton: !!onFilterSubmit,
								onEveryChange: onEveryChangeOfFilter
							}}
						/>
					)}
					<div className={styles.addNewuser}>
						{!!addButtonLabel && (
							<button className={styles.primary} onClick={addButtonOnClick}>
								{addButtonLabel}
							</button>
						)}
					</div>
				</>
			)}
			{radioFilterComponent && <div className={styles.subtabHeader}>{radioFilterComponent}</div>}

			<div className={`${styles.ecard} ${styles.subTable}`}>
				{!!secondaryHeaderBody && <div> {secondaryHeaderBody}</div>}

				{!isLoading ? (
					// !!rows?.length ? (
					<Table {...{ rows, columns, showSNo }} />
				) : (
					// ) : (
					// 	<div style={{ textAlign: 'center' }}>
					// 		<img src={trackingApp} height={100} alt="" />
					// 		<h3>Looks like there is no data.</h3>
					// 	</div>
					// )
					<div style={{ display: 'flex', justifyContent: 'center', margin: '30px' }}>
						<img src={spinner} alt="Loading..." height={50} />
					</div>
				)}
				<PaginationFooter
					limitPerPage={limitPerPage}
					onButtonClick={onPaginationButtonClick}
					currentPage={currentPage}
					totalPage={totalPage}
					handlePageNumber={handlePageNumber}
				/>
			</div>

			<div style={{ display: 'flex', justifyContent: 'flex-end' }}></div>
		</div>
	);
}

export default FilterTable;
