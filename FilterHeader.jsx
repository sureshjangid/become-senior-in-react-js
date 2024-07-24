import { Form, Formik, useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import { components } from 'src/utils/staticGrid';
import { CustomDiv } from '../Style';
import styles from './table.module.scss';

function FormRenderer({ formSchema, onSubmit, onEveryChange, showSubmitButton, apiData }) {
	const [values, setValues] = useState(apiData || {});

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

	// useEffect(() => {
	// 	setValues(apiData);
	// }, [apiData]);

	return (
		<div>
			<Formik initialValues={values} enableReinitialize onSubmit={onSubmit}>
				{({ handleChange, values, setFieldValue, isSubmitting }) => {
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
										{isSubmitting ? 'Loading...' : 'Submit'}
									</button>
								)}
							</Form>
							{/* {showSubmitButton && ( */}
							{/* <button className={styles.clearFitler} onClick={() => resetForm()}>
								Clear All Filter
							</button> */}
							{/* )} */}
							<GetFormikValues />
						</CustomDiv>
					);
				}}
			</Formik>
		</div>
	);
}

export default FormRenderer;
