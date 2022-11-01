import { Formik } from "formik";
import React, { useContext } from 'react';
import { Form, ListGroup, InputGroup } from 'react-bootstrap';
import { CarsContext } from './CarsContext';
import * as yup from "yup"

function CarsEditorRow({ car, children, forceUpdate }) {

    const schema = yup.object({
        name: yup.string().required("Vyplň názov"),
        price: yup.number().min(1, "Min. 1").required("Vyplň cenu"),
        writeoff: yup.number().min(2, "Min. 2").max(4, "Max. 4").required("Vyplň dĺžku odpisu"),
        resaleValue: yup.number().min(0, "Min. 0").max(1, "Max. 1").required("Vyplň zostatkovú hodnotu")
    });
    const [, setCarPropWithId, , , createNewCar] = useContext(CarsContext);
    return (
        <Formik initialValues={car}
            enableReinitialize="true"
            onSubmit={(values, actions) => {
                createNewCar(values)
                forceUpdate();
                actions.resetForm({
                    values: {
                        name: '',
                        price: '',
                        writeoff: '',
                        resaleValue: ''
                    }
                })
            }}
            validationSchema={schema}>
            {({
                handleSubmit,
                handleChange,
                values,
                errors,
                isValid,
            }) => {
                const handleChangeFacade = (e, parseImpl) => {
                    parseImpl = parseImpl || (() => e.target.value);
                    const val = (e.target.value) ? parseImpl(e.target.value) : undefined;
                    setCarPropWithId(car.id, e.target.name, val);
                    handleChange(e);
                }

                return (
                    <Form noValidate onSubmit={handleSubmit}>
                        <ListGroup.Item className="d-flex align-items-start rounded-3 mb-2 border">
                            <div className="p-1">
                                <Form.Control type="text" required
                                    name="name"
                                    value={values.name}
                                    onChange={handleChangeFacade}
                                    isInvalid={errors.name}
                                />
                                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                            </div>
                            <div className="p-1">
                                <InputGroup hasValidation >
                                    <Form.Control type="number" min="1" required
                                        value={values.price}
                                        name="price"
                                        onChange={e => handleChangeFacade(e, Number.parseInt)}
                                        isInvalid={errors.price}
                                    />
                                    <InputGroup.Text>€</InputGroup.Text>
                                    <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                                </InputGroup>
                            </div>
                            <div className="p-1">
                                <Form.Control type="number" min="1" max="4" required
                                    value={values.writeoff}
                                    name="writeoff"
                                    onChange={e => handleChangeFacade(e, Number.parseFloat)}
                                    isInvalid={errors.writeoff}
                                />
                                <Form.Control.Feedback type="invalid">{errors.writeoff}</Form.Control.Feedback>
                            </div>
                            <div className="p-1">
                                <Form.Control type="number" min="0" max="1" step="0.1" required
                                    value={values.resaleValue}
                                    name="resaleValue"
                                    onChange={e => handleChangeFacade(e, Number.parseFloat)}
                                    isInvalid={errors.resaleValue}
                                />
                                <Form.Control.Feedback type="invalid">{errors.resaleValue}</Form.Control.Feedback>
                            </div>
                            {children}
                        </ListGroup.Item>
                        {JSON.stringify(errors)}
                    </Form>
                )
            }}

        </Formik>
    )
}

export default CarsEditorRow;