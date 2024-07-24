import { useTranslation } from 'react-i18next';
// import { styles } from 'src/superAdmin/pages/Article';
import styles from './table.module.scss';
import { trackingApp } from 'src/assets/images';
import PropTypes from 'prop-types';

function Table({ rows, columns, showSNo }) {
	const { t } = useTranslation();

	return (
		<div className={styles.tableWrapper}>
			<table>
				<thead>
					<tr>
						{showSNo && <th>{t('S.No.')}</th>}
						{columns?.map((column, i) => {
							return (
								<th title={column?.detail} key={i}>
									{column.headerRender ? column.headerRender(column, i) : t(column.label)}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					{Array.isArray(rows) && rows.length !== 0 ? (
						rows.map((row, i) => {
							return (
								<tr key={i}>
									{showSNo && <td>{i + 1}</td>}
									{columns?.map((column, colI) => {
										if (column.render) return <td key={colI}>{column.render(row, i)}</td>;
										else return <td key={colI}>{row[column.name] ? row[column.name] : ' - '}</td>;
									})}
								</tr>
							);
						})
					) : (
						<tr>
							<td colSpan={columns.length + (showSNo ? 1 : 0)}>
								<div className={styles.noData}>
									<img src={trackingApp} height={100} alt="" />
									<h3>Looks like there is no data.</h3>
								</div>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}

const column = {
	name: PropTypes.string,
	label: PropTypes.string,
	render: PropTypes.func,
	headerRender: PropTypes.func
};

Table.propTypes = {
	columns: PropTypes.arrayOf(column),
	rows: PropTypes.array,
	showSNo: PropTypes.bool
};

export default Table;
