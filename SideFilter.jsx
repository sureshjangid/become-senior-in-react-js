import { filter } from 'src/assets/svgIcons/index';
import FormRenderer from './FilterHeader';
import styles from './table.module.scss';
import { PARAMS, initial_state, voterReducer } from 'src/superAdmin/pages/Article';
import { useEffect, useReducer, useState } from 'react';
import { Form, Formik, useFormikContext } from 'formik';
import { CustomDiv } from '../Style';
import { components } from 'src/utils/staticGrid';

const SideFilter = ({ handleSideFilter, formSchema, onSubmit, onEveryChange, showSubmitButton }) => {
	const [values, setValues] = useState({});
	const [state, dispatchData] = useReducer(voterReducer, initial_state);
	useEffect(() => {}, [state.params]);
	const GetFormikValues = () => {
		const { values } = useFormikContext();

		useEffect(() => {
			setValues(values);
		}, [values]);

		return null;
	};
	useEffect(() => {
		onEveryChange && onEveryChange(values);
	}, [values]);
	return (
		<div className={styles.sideFilter}>
			<div className={styles.header}>
				<span onClick={() => handleSideFilter()}>{filter} Filters</span>
			</div>
			{/* <FormRenderer
				{...{
					formSchema,
					onSubmit,
					showSubmitButton,
					onEveryChange,

				}}
			/> */}
			<Formik initialValues={{}} onSubmit={onSubmit}>
				{({ handleChange, values, setFieldValue, isSubmitting, resetForm }) => {
					return (
						<CustomDiv>
							<Form className="form">
								{formSchema.map((data, i) => {
									const Component = components[data.type];
									return (
										<>
											<Component
												data={data}
												handleChange={handleChange}
												values={values}
												setFieldValue={setFieldValue}
												moreOption={true}
											/>
										</>
									);
								})}

								{showSubmitButton && (
									<button className={styles.secondary} variant="outlined" type="submit" disabled={isSubmitting}>
										{isSubmitting ? 'Loading...' : 'Find'}
									</button>
								)}
							</Form>
							<button className={styles.clearFitler} onClick={() => resetForm()}>
								Clear All Filter
							</button>
							<GetFormikValues />
						</CustomDiv>
					);
				}}
			</Formik>
			<div className={styles.bottompart}>
				
				<button className={styles.primary} onClick={() => handleSideFilter()}>
					Apply
				</button>
				<button className={styles.danger} onClick={() => handleSideFilter()}>
					Close
				</button>
				
			</div>
		</div>
	);
};

export default SideFilter;
