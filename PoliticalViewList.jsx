import { usePermissions } from 'src/customHooks/usePermissions';
import {
	AddPopUp,
	FileDownloadIcon,
	FilterTable,
	ModalComponent,
	MsgPopup,
	NotificationsIcon,
	RadioFilter,
	addUserJson,
	defaultUserImage,
	exportCsv,
	filters,
	getCookie,
	getParamsForUrl,
	handleActiveInActive,
	handleBulkMoreOption,
	handleSingleApprovalReject,
	styles,
	useDispatch,
	CHECKED_INDEXS,
	INDEX_NO,
	IS_LOADING,
	PAGE,
	PAGE_LIMIT,
	PARAMS,
	POPUP,
	POPUP_TYPE,
	REASON,
	TAB,
	useState,
	useReducer,
	voterReducer,
	initial_state,
	useEffect,
	useNavigate,
	getPoliticalViewData,
	CHECK_IS_FILLED,
	MORE_ACTION_OPTION,
	MoreVertIcon,
	Link,
	USER_ID,
	VoterRoleDetails,
	SEARCH,
	SIDE_FILTER
} from './index';
import { permissions } from 'src/utils/roles';
import { UserHasPermission } from 'src/superAdmin/components/Permission/Index';

let lastRequest = 0;

function PoliticalViewList() {
	const [data, setData] = useState([]);
	const [tabs, setSets] = useState('Approved');
	const role = getCookie('role');
	const [state, dispatchData] = useReducer(voterReducer, initial_state);

	const { userHasPermission } = usePermissions();

	const navigate = useNavigate();
	const dispatch = useDispatch();
	// Get data from api.

	const getRowsData = async () => {
		dispatchData({ type: IS_LOADING, value: true });
		const endpoint = `${state.currentPage}/${state.limitPerPage}?${
			state.tab === 'inactive' ? 'userStatus' : 'voterStatus'
		}=${state.tab === 'inactive' ? 'false' : state.tab === 'Pending' ? 'Approved' : state.tab}		${
			state.search ? `&search=${state.search}` : ''
		}${state.params ? getParamsForUrl(state.params) : ''}`;

		// Skip previous request data
		const requestId = Math.random();
		lastRequest = requestId;

		getPoliticalViewData(endpoint)
			.then(data => {
				if (lastRequest === requestId) {
					setData(data);
				}
			})
			.catch(err => console.log(err))
			.finally(() => {
				if (lastRequest === requestId) {
					dispatchData({ type: IS_LOADING, value: false });
					dispatchData({ type: CHECKED_INDEXS, checkedIndexs: [] });
				}
			});
	};

	// Function that is called when any value is been changed in primary header.
	const handleEveryChangeOfPrimaryFilter = values => {
		if (!!Object.values(values).length) {
			dispatchData({ type: PARAMS, params: values });
		}
	};
	const handleReason = value => {
		dispatchData({ type: REASON, reasonValue: value });
	};
	// To export data of current page
	const handleExport = () => {
		let exportIds = [];

		if (state.checkedIndexs.length === 0) {
			exportIds = data?.data?.map(e => e._id);
			dispatchData({ type: CHECKED_INDEXS, checkedIndexs: [] });
		} else {
			state.checkedIndexs.forEach(indexValue => exportIds.push(data?.data[indexValue]?._id));
			dispatchData({ type: CHECKED_INDEXS, checkedIndexs: [] });
		}

		// Hit api to export data
		dispatch(
			exportCsv({
				selectedCheckbox: exportIds,
				currentPage: state.currentPage,
				entriesPerPage: state.limitPerPage,
				type: 'user'
			})
		);
	};

	// Handle checkbox click to select a row or multiple
	const handleCheckboxClick = index => {
		// Keeping indexes intead of ids for more flexibility and control.
		if (state.checkedIndexs.includes(index)) {
			dispatchData({ type: CHECKED_INDEXS, checkedIndexs: state.checkedIndexs.filter(e => e !== index) });
		} else {
			dispatchData({ type: CHECKED_INDEXS, checkedIndexs: [...state.checkedIndexs, index] });
		}
	};

	// Handle pagination buttons 'data' should be 'next', 'pre' or a page number
	const onPaginationButtonClick = data => {
		if (data === 'pre' && state.currentPage !== 1) {
			dispatchData({ type: PAGE, page: state.currentPage - 1 });
		} else if (data === 'next' && state.currentPage !== totalPage) {
			dispatchData({ type: PAGE, page: state.currentPage + 1 });
		} else if (!isNaN(data)) {
			dispatchData({ type: PAGE, page: data });
		}
	};

	const handleUpadateUserLocally = (type, indexes, flag) => {
		let dataCopy = structuredClone(data);
		indexes.forEach(indexValue => {
			switch (flag) {
				case 'approvalReject':
					if (type === 'approve') {
						dataCopy.data[indexValue].voterStatus = 'Approved';
						dispatchData({ type: CHECKED_INDEXS, checkedIndexs: [] });
					} else {
						dataCopy.data[indexValue].voterStatus = 'Rejected';
						dispatchData({ type: CHECKED_INDEXS, checkedIndexs: [] });
						getRowsData();
					}
					break;
				case 'activeInActive':
					break;
				default:
					dataCopy.data[indexValue].userStatus = type;
			}
		});

		setData(dataCopy);
	};
	const handleTabs = tab => {
		dispatchData({ type: TAB, value: tab });
	};

	const handleSearch = value => {
		dispatchData({ type: SEARCH, searchValue: value });
	};

	// sidebar Filter
	const handleSideFilter = () => {
		dispatchData({ type: SIDE_FILTER });
	};
	// Active and inActive for single User
	const handleSingleActiveInAcitve = (type, index) => {
		updateSingleVoter(type, index, 'activeInActive');
	};

	// Updates single user for type = 'active' | 'inactive' | 'approve' | 'reject'
	const updateSingleVoter = (type, index, flag) => {
		let id = data.data?.[index]?._id;
		handleUserUpdateApiCall(type, [id], flag);

		// update voter status on locally before it updates in backend
		handleUpadateUserLocally(type, [index], flag);
	};

	// Handles Api call for updating a user for type = 'active' | 'inactive' | 'approve' | 'reject'
	const handleUserUpdateApiCall = (type, ids, flag) => {
		switch (flag) {
			case 'approvalReject':
				dispatch(handleSingleApprovalReject({ id: ids, type })).then(() => {});
				break;
			case 'bulkMoreOption':
				dispatch(
					handleBulkMoreOption({
						selectedCheckbox: ids,
						currentPage: state.currentPage,
						entriesPerPage: state.limitPerPage,
						type
					})
				)
					.then(() => {
						dispatchData({ type: CHECKED_INDEXS, checkedIndexs: [] });

						// dispatch(getUsersData(`${state.currentPage}/${state.limitPerPage}`));
					})
					.catch(error => {
						getRowsData();
						console.error('Error:', error);
					});
				break;
			case 'activeInActive':
				handleActiveInActive({ reason: state.reason }, { id: ids, type }).then(() => {
					dispatchData({ type: POPUP, value: false });
					getRowsData();
				});
				break;
			default:
				console.log('nothing');
		}
	};

	const handleAddButtonClick = () => {
		dispatchData({ type: POPUP_TYPE, value: 'addNew' });
		dispatchData({ type: POPUP, value: true });
	};

	// Single approval and Reject
	const singleApprovalReject = (index, type) => {
		updateSingleVoter(type, index, 'approvalReject');
	};

	const radioLabelFilter = [
		{ name: 'Approved', label: 'Approved' },
		{ name: 'Rejected', label: 'Rejected' },
		{ name: 'inactive', label: 'Inactive' }
	];

	const FilterBtn = (
		<>
			<RadioFilter
				label={radioLabelFilter}
				placeHolder={'Search by Name'}
				handleTabs={handleTabs}
				sideFilter={state.sideFilter}
				filters={filters}
				onEveryChange={handleEveryChangeOfPrimaryFilter}
				handleSearch={handleSearch}
				handleSideFilter={handleSideFilter}
			/>
		</>
	);

	const handleBulkApprovalReject = name => {
		let ids = [];
		state.checkedIndexs.forEach(indexValue => ids.push(data?.data[indexValue]?._id));
		if (name === 'approve') {
			handleUserUpdateApiCall(name, ids, 'bulkMoreOption');
			handleUpadateUserLocally(name, state.checkedIndexs, 'approvalReject');
		}
	};
	const handlePopup = index => {
		dispatchData({ type: INDEX_NO, indexValue: index });
		const foundObject = data.data.find((element, i) => i === index);
		if (foundObject) {
			const isFilledValue = foundObject.isFilled;
			dispatchData({ type: CHECK_IS_FILLED, checkIsFilled: isFilledValue });
			dispatchData({ type: POPUP, value: true });
		}
	};
	// JSX for secondary header of table.
	const secondaryHeaderBody = (
		<>
			<div className={styles.TableHead}>
				<div className={styles.TablesLength}>
					<div>
						<label>Items Per Page</label>
						<select onChange={event => dispatchData({ type: PAGE_LIMIT, limit: Number(event.target.value) })}>
							<option value={10}>10</option>
							<option value={20}>20</option>
							<option value={30}>30</option>
							<option value={50}>50</option>
							<option value={100}>100</option>
						</select>
					</div>
				</div>

				<div className={styles.tblCaption}>
					<NotificationsIcon />

					<button onClick={handleExport} className={styles.secondary}>
						<FileDownloadIcon />
						Export
					</button>
				</div>
			</div>
		</>
	);

	const handleToggleMoreOption = userId => {
		dispatchData({
			type: MORE_ACTION_OPTION,
			moreActionOption: prev => ({
				...prev,
				[userId]: !prev[userId]
			})
		});
	};

	// Select all rows
	const handleSelectAll = e => {
		const { checked } = e.target;
		if (checked) {
			dispatchData({
				type: CHECKED_INDEXS,
				checkedIndexs: Array.from({ length: data?.data?.length }, (_, index) => index)
			});
		} else {
			dispatchData({
				type: CHECKED_INDEXS,
				checkedIndexs: []
			});
		}
	};

	// Columns Json
	const columns = [
		{
			headerRender: () => (
				<input
					type="checkbox"
					checked={state?.checkedIndexs?.length === data?.data?.length}
					onChange={handleSelectAll}
				/>
			),
			render: (user, index) => {
				return (
					<>
						<input
							type="checkbox"
							checked={state.checkedIndexs.includes(index)}
							onChange={() => handleCheckboxClick(index)}
						/>
					</>
				);
			}
		},
		{
			label: 'Name',
			render: user => {
				return (
					<>
						<div className={styles.UserData}>
							<div className={styles.userimg}>
								<img
									height="20px"
									width="10px"
									src={
										user?.profileImage ? `${process.env.REACT_APP_MEDIA_URL}${user?.profileImage}` : defaultUserImage
									}
									alt=""
								/>
							</div>
							{user.fullName}
						</div>
					</>
				);
			}
		},
		{ name: 'relationName', label: "Father's/Husband Name" },
		{ name: 'district', label: 'District' },
		{ name: 'ac_name', label: 'Assembly Constituency' },
		{ name: 'mandal', label: 'Mandal' },
		{ name: 'city', label: 'City / GP' },
		{ name: 'gender', label: 'Gender' },
		{ name: 'age', label: 'Age' },
		{ name: `${state.tab === 'inactive' ? 'userStatus' : 'voterStatus'}`, label: 'Status' },

		{
			label: 'Actions',
			render: (a, index) => {
				return (
					<>
						<div>
							<UserHasPermission permission={permissions.ASSIGN_ROLE_TO_VOTER.value}>
								{a.voterStatus === 'Approved' && (
									<div className={styles.tableAction}>
										{state.popUp &&
											state.popupType === 'assignRole' &&
											navigate(`/superAdmin/assign-role`, {
												state: {
													isFilled: a?.isFilled,
													userId: state.userId && state.userId,
													indexId: state.indexNo,
													type: 'politicalView'
												}
											})}
										<UserHasPermission permission={permissions.ASSIGN_ROLE_TO_VOTER.value}>
											{state.tab === 'Approved' && (
												<button
													onClick={() => {
														handlePopup(index);
														dispatchData({ type: POPUP_TYPE, value: 'assignRole' });
														dispatchData({ type: USER_ID, userId: a._id });
													}}
												>
													Assign Role
												</button>
											)}
										</UserHasPermission>
									</div>
								)}
							</UserHasPermission>

							{/* // <div>
							// 	<p>Approved</p>

							// 	<MoreVertIcon onClick={() => handleToggleMoreOption(a._id)} />

							// 	{state.moreActionOption[a._id] && (
							// 		<ul className={styles.DropDown}>
							// 			<li>
							// 				<Link to={'/superAdmin/multiple-role'} state={{ isFilled: a?.isFilled, user_id: a?._id }}>
							// 					multiple role
							// 				</Link>
							// 			</li>
							// 		</ul>
							// 	)}
							// </div> */}
						</div>
					</>
				);
			}
		}
	];

	// Calculate total number of pages
	const totalPage = Math.ceil(data.totalData / state.limitPerPage);
	useEffect(() => {
		getRowsData();
	}, [state.limitPerPage, state.currentPage, state.tab, state.search]);

	useEffect(() => {
		getRowsData();
	}, [state.params.state > 0 && state.params]);

	useEffect(() => {
		dispatchData({ type: TAB, value: 'Approved' });
	}, []);

	return (
		<div>
			{/* {state.popUp && state.checkIsFilled && (
				<ModalComponent
					open={state.popUp}
					handleClose={() => dispatchData({ type: POPUP, value: true })}
					handleOpen={() => dispatchData({ type: POPUP, value: false })}
				></ModalComponent>
			)} */}

			{state.popUp && (
				<ModalComponent
					open={state.popUp}
					handleClose={() => {
						dispatchData({ type: POPUP, value: false });
						dispatchData({ type: POPUP_TYPE, value: '' });
					}}
					handleOpen={() => dispatchData({ type: POPUP, value: true })}
					title={''}
				>
					{(role === 'Admin' && state.popupType === 'active') || state.popupType === 'inactive' ? (
						<MsgPopup
							handleReason={handleReason}
							handleSingleActiveInAcitve={handleSingleActiveInAcitve}
							popupType={state.popupType}
							indexNo={state.indexNo}
						/>
					) : state.popupType === 'addNew' ? (
						<AddPopUp tableName={'voterlist'} popUpLable={addUserJson} />
					) : (
						state.popupType === 'assignRole' &&
						state.checkIsFilled && (
							<VoterRoleDetails
								userId={state.userId}
								singleApprovalReject={singleApprovalReject}
								indexId={state.indexNo}
							/>
						)
					)}
				</ModalComponent>
			)}
			<FilterTable
				filterShow={false}
				radioFilterComponent={FilterBtn}
				columns={columns}
				rows={data?.data}
				filterSchema={filters}
				secondaryHeaderBody={secondaryHeaderBody}
				onPaginationButtonClick={onPaginationButtonClick}
				currentPage={state.currentPage}
				isLoading={state.isLoading}
				totalPage={totalPage}
				onEveryChangeOfFilter={handleEveryChangeOfPrimaryFilter}
				addButtonLabel={userHasPermission(permissions.ADD_USER_BY_CLIENT.value) && '+ Add New'}
				addButtonOnClick={handleAddButtonClick}
				showSNo={false}
			/>
		</div>
	);
}

export default PoliticalViewList;
