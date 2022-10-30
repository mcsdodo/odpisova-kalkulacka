import { Formik } from "formik";
import React, { useContext } from 'react';
import { Form, ListGroup, InputGroup } from 'react-bootstrap';
import { CarsContext } from './CarsContext';
import * as yup from "yup"

function CarsEditorRow({ car, children, forceUpdate }) {

    const schema = yup.object({
        name: yup.string().required(),
        price: yup.number().required(),
        writeoff: yup.number().required(),
        resaleValue: yup.number().required()
    });

    const [, setCarPropWithId, , , createNewCar] = useContext(CarsContext);

    return (
        <Formik initialValues={car}
            validateOnChange="false"
            validateOnBlur="false"
            enableReinitialize="true"
            onSubmit={(values, actions) => {
                createNewCar(values)
                forceUpdate();
            }}
            validationSchema={schema}>
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                touched,
                values,
                errors,
            }) => {
                const handleChangeFacade = (e, parseImpl) => {
                    parseImpl = parseImpl || (() => e.target.value);
                    const val = e.target.value ? parseImpl(e.target.value) : undefined;
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
                                    onChange={e => handleChangeFacade(e)}
                                    isInvalid={errors.name}
                                />
                                <Form.Control.Feedback type="invalid">Vyplň názov</Form.Control.Feedback>
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
                                    <Form.Control.Feedback type="invalid">Vyplň cenu</Form.Control.Feedback>
                                </InputGroup>
                            </div>
                            <div className="p-1">
                                <Form.Control type="number" min="1" max="4" required
                                    value={values.writeoff}
                                    name="writeoff"
                                    onChange={e => handleChangeFacade(e, Number.parseFloat)}
                                    isInvalid={errors.writeoff}
                                />
                                <Form.Control.Feedback type="invalid">Vyplň dĺžku odpisu</Form.Control.Feedback>
                            </div>
                            <div className="p-1">
                                <Form.Control type="number" min="0" max="1" step="0.1" required
                                    value={values.resaleValue}
                                    name="resaleValue"
                                    onChange={e => handleChangeFacade(e, Number.parseFloat)}
                                    isInvalid={errors.resaleValue}
                                    onBlur={handleBlur}
                                />
                                <Form.Control.Feedback type="invalid">Vyplň zostatkovú hodnotu</Form.Control.Feedback>
                            </div>
                            {children}
                        </ListGroup.Item>
                        {JSON.stringify(touched)}
                        {JSON.stringify(errors)}
                    </Form>
                )
            }}

        </Formik>
    )
}

export default CarsEditorRow;