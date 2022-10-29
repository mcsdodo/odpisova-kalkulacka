import P from './P.js'
import { Form, ListGroup, Button, InputGroup, Row, Col } from 'react-bootstrap';
import React, { useContext, useState } from 'react';

import { CarsContext } from './CarsContext';

function CarsEditorCol({ tooltip, children }) {
    return (
        <div className="p-1">
            {children}
        </div>
    )
}

function CarsEditor() {

    const [myCars, setCarPropWithId, settings, setSettings] = useContext(CarsContext);
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <>
            <Row>
                <Col>
                    <P.Row label="DPH %">
                        <Form.Control type="number" min="0" max="1" step="0.01"
                            value={settings.vat} name="vat"
                            onChange={(e) => setSettings({ ...settings, vat: Number.parseFloat(e.target.value) })}
                        />
                    </P.Row>
                </Col>
                <Col>
                    <P.Row label="Daň z príjmu PO %">
                        <Form.Control type="number" min="0" max="1" step="0.01"
                            value={settings.tax} name="tax"
                            onChange={(e) => setSettings({ ...settings, tax: Number.parseFloat(e.target.value) })}
                        />
                    </P.Row>
                </Col>
                <Col>
                    <P.Row label="Poistenie %">
                        <Form.Control type="number" min="0" max="1" step="0.00001"
                            value={settings.insuranceRatio} name="insuranceRatio"
                            onChange={(e) => setSettings({ ...settings, insuranceRatio: Number.parseFloat(e.target.value) })}
                        />
                    </P.Row>
                </Col>
            </Row>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <ListGroup variant="flush" className="">
                    {myCars.map(car =>
                        <ListGroup.Item className="d-flex align-items-start rounded-3 mb-2 border">
                            <CarsEditorCol>
                                <Form.Control type="text"
                                    value={car.name}
                                    onChange={e => setCarPropWithId(car.id, "name", e.target.value)}
                                />
                            </CarsEditorCol>
                            <CarsEditorCol>
                                <InputGroup >
                                    <Form.Control type="number" min="1" required
                                        value={car.price}
                                        onChange={e => setCarPropWithId(car.id, "price", Number.parseInt(e.target.value))}
                                    />
                                    <InputGroup.Text>€</InputGroup.Text>
                                </InputGroup>
                                <Form.Control.Feedback type="invalid">Vyplň cenu</Form.Control.Feedback>
                            </CarsEditorCol>
                            <CarsEditorCol>
                                <Form.Control type="number" min="1" max="4" required
                                    value={car.writeoff}
                                    onChange={e => setCarPropWithId(car.id, "writeoff", Number.parseFloat(e.target.value))}
                                />
                            </CarsEditorCol>
                            <CarsEditorCol>
                                <Form.Control type="number" min="0" max="1" step="0.1" required
                                    value={car.resaleValue}
                                    onChange={e => setCarPropWithId(car.id, "resaleValue", Number.parseFloat(e.target.value))}
                                />
                            </CarsEditorCol>
                            <CarsEditorCol>
                                <Button variant="danger">
                                    <i className="bi bi-trash"></i>
                                </Button>
                            </CarsEditorCol>
                        </ListGroup.Item>
                    )}
                    <ListGroup.Item className="d-flex align-items-start rounded-3 mb-2 border">
                        <CarsEditorCol tooltip="Názov">
                            <Form.Control type="text" required />
                            {/* <Form.Control.Feedback type="invalid">Vyplň názov</Form.Control.Feedback> */}
                        </CarsEditorCol>
                        <CarsEditorCol tooltip="Cena vr. DPH">
                            <InputGroup>
                                <Form.Control type="number" min="1" required />
                                <InputGroup.Text>€</InputGroup.Text>
                                {/* <Form.Control.Feedback type="invalid">Vyplň cenu</Form.Control.Feedback> */}
                            </InputGroup>
                        </CarsEditorCol>
                        <CarsEditorCol tooltip="Dĺžka odpisu">
                            <Form.Control type="number" min="1" max="4" required />
                            {/* <Form.Control.Feedback type="invalid">Vyplň dĺžku odpisu</Form.Control.Feedback> */}
                        </CarsEditorCol>
                        <CarsEditorCol tooltip="Zostatková hodnota %">
                            <Form.Control type="number" min="0" max="1" step="0.1" required />
                            {/* <Form.Control.Feedback type="invalid">Vyplň zostatkovú hodnotu</Form.Control.Feedback> */}
                        </CarsEditorCol>
                        <CarsEditorCol>
                            <Button variant="success" type="submit">
                                <i className="bi bi-plus-square"></i>
                            </Button>
                        </CarsEditorCol>
                    </ListGroup.Item>
                </ListGroup>
            </Form>


            <p>{JSON.stringify(myCars)}</p>
            <p>{JSON.stringify(settings)}</p>
        </>
    );
}
P.CarsEditor = CarsEditor;
