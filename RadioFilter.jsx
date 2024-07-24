import { useState } from 'react';
import { filter, search } from 'src/assets/svgIcons/index';
import SideFilter from './SideFilter';
import styles from './table.module.scss';

const RadioFilter = ({
	secondaryHeaderBody,
	handleSearch = null,
	label = null,
	handleTabs = null,
	sideFilter,
	handleSideFilter,
	filters = null,
	onEveryChange,
	searchBar = true,
	placeHolder = null,
	sideBarFilter = true
}) => {
	const [activeTab, setActiveTab] = useState(label && label[0]?.name); // Set default active tab
	const handleTabClick = tabName => {
		handleTabs(tabName);
		setActiveTab(tabName);
	};
	return (
		<div className={styles.subTab}>
			<div className={styles.tabButton}>
				{label?.map((l, i) => (
					<button
						key={i}
						onClick={() => handleTabClick(l.name)}
						style={{
							backgroundColor: activeTab === l.name ? '#fff' : '#fff',
							color: activeTab === l.name ? '#0091ff' : '#878a99',
							paddingBottom: activeTab === l.name ? '12px' : '12px',
							borderBottom: activeTab === l.name ? 'solid 1px #0091ff' : ''
						}}
					>
						{l.label}
					</button>
				))}
			</div>

			{!!secondaryHeaderBody && <div> {secondaryHeaderBody} </div>}
			<div className={styles.searchFilter}>
				{searchBar && (
					<div className={styles.searchBox}>
						{search}
						<input
							className="sureshjangid"
							type="search"
							autoComplete="off"
							placeholder={placeHolder}
							name="search"
							onChange={e => handleSearch(e.target.value)}
						/>
					</div>
				)}

				{filters && (
					<>
						<div onClick={() => handleSideFilter()}>{filter}</div>{' '}
						<div className={`${styles.filterSidebar} ${sideFilter ? 'openfilter' : null}`}>
							{sideFilter && (
								<SideFilter
									handleSideFilter={handleSideFilter}
									{...{
										formSchema: filters,
										onSubmit: null,
										showSubmitButton: null,
										onEveryChange
									}}
								/>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default RadioFilter;
