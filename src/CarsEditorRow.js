import { Formik } from "formik";
import { Form, ListGroup, InputGroup, Button } from 'react-bootstrap';
import updateObjectPropertyInListById from "./Utils";
import * as yup from "yup"

function CarsEditorRow({ car, isAdd, myCars, setMyCars }) {

    const schema = yup.object({
        name: yup.string().required("Vyplň názov"),
        price: yup.number().min(1, "Min. 1").required("Vyplň cenu"),
        writeoff: yup.number().min(2, "Min. 2").max(4, "Max. 4").required("Vyplň dĺžku odpisu"),
        resaleValue: yup.number().min(0, "Min. 0").max(100, "Max. 100").required("Vyplň zostatkovú hodnotu")
    });
    if (window.debug)
        console.log("EditorRow render")

    const createNewCar = (car) => {
        const newCar = { ...car, id: crypto.randomUUID() };
        const newMyCars = myCars.concat(newCar);
        setMyCars(newMyCars);
        return newCar;
    };

    const removeCar = (id) => {
        const newList = myCars.filter(car => car.id !== id);
        setMyCars(newList);
    };

    return (
        <Formik initialValues={car}
            enableReinitialize="true"
            onSubmit={(values, actions) => {
                createNewCar(values)
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
            }) => {
                const handleChangeFacade = (e, parseImpl) => {
                    parseImpl = parseImpl || (() => e.target.value);
                    const val = (e.target.value) ? parseImpl(e.target.value) : undefined;

                    setMyCars(prev => {
                        return updateObjectPropertyInListById(prev, car.id, e.target.name, val);
                    })
                    handleChange(e);
                }

                return (
                    <Form noValidate onSubmit={handleSubmit}>
                        <ListGroup.Item className="d-md-flex rounded-3 mb-2 border justify-content-between">
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
                                <Form.Control type="number" min="0" max="100" step="5" required
                                    value={values.resaleValue}
                                    name="resaleValue"
                                    onChange={e => handleChangeFacade(e, Number.parseFloat)}
                                    isInvalid={errors.resaleValue}
                                />
                                <Form.Control.Feedback type="invalid">{errors.resaleValue}</Form.Control.Feedback>
                            </div>
                            {isAdd && <div className="p-1">
                                <Button variant="success" type="submit">
                                    <i className="bi bi-plus-square"></i>
                                </Button>
                            </div>}
                            {!isAdd && <div className="p-1">
                                <Button variant="danger" onClick={() => removeCar(car.id)}>
                                    <i className="bi bi-trash"></i>
                                </Button>
                            </div>}
                        </ListGroup.Item>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default CarsEditorRow;