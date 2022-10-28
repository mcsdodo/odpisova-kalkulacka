import P from './P.js'
import { Form, Col, Row, Table, Accordion, ListGroup, Button, Offcanvas, InputGroup } from 'react-bootstrap';
import React, { useState, useContext } from 'react';

import { CarsContext } from './CarsContext';

function CarEditorRow({ ...props }) {
    return (
        <tr>
            <td><Form.Check type="radio" name="cars-check"></Form.Check></td>
            <td>{props.name}</td>
            <td>{props.price}</td>
            <td>{props.writeoff}</td>
            <td>{props.resaleValue}</td>
        </tr>
        // <Row>
        //     <Col className="p-1">
        //         <P.Row label="Názov">
        //             <Form.Control type="text" value={props.name}
        //                 onChange={e => props.setCarPropWithId(props.carIdx, "name", e.target.value)}
        //             />
        //         </P.Row>
        //     </Col>
        //     <Col className="p-1">
        //         <P.Row label="Cena">
        //             <Form.Control type="number" value={props.price}
        //                 onChange={e => props.setCarPropWithId(props.carIdx, "price", e.target.value)}
        //             />
        //         </P.Row>
        //     </Col>
        //     <Col className="p-1">
        //         <P.Row label="Odpis">
        //             <Form.Control type="number" value={props.writeoff} min="1" max="4"
        //                 onChange={e => props.setCarPropWithId(props.carIdx, "writeoff", e.target.value)}
        //             />
        //         </P.Row>
        //     </Col>
        //     <Col className="p-1">
        //         <P.Row label="Zostatková hodnota">
        //             <Form.Control type="number" value={props.resaleValue} min="0" max="1" step="0.1"
        //                 onChange={e => props.setCarPropWithId(props.carIdx, "resaleValue", e.target.value)}
        //             />
        //         </P.Row>
        //     </Col>
        // </Row>
    )
}

function CarsEditor({ name }) {

    const [myCars, setMyCars] = useContext(CarsContext);

    const setCarPropWithId = (id, prop, val) => setMyCars(prev => {
        const updatedCar = { ...prev[id], [prop]: val };
        const updatedCars = { ...prev, [id]: updatedCar };
        return updatedCars;
    });

    const cars = Object.entries(myCars).map(([key, val]) => ({ ...val, id: key }));

    return (
        <>
            <ListGroup variant="flush" className="">
                {cars.map(car =>
                    <ListGroup.Item className="d-flex align-items-start rounded-3 mb-2 border">
                        <div className="p-2">
                            <Form.Control type="text"
                                value={car.name}
                                onChange={e => setCarPropWithId(car.id, "name", e.target.value)}
                            />
                        </div>
                        <div className="p-2">
                            <InputGroup>
                                <Form.Control type="number" value={car.price} min="1"
                                    onChange={e => setCarPropWithId(car.id, "price", e.target.value)}
                                />
                                <InputGroup.Text>€</InputGroup.Text>
                            </InputGroup>
                        </div>
                        <div className="p-2">
                            <InputGroup>
                                <Form.Control type="number" value={car.writeoff} min="1" max="4"
                                    onChange={e => setCarPropWithId(car.id, "writeoff", e.target.value)}
                                />
                            </InputGroup>
                        </div>

                        <div className="p-2">
                            <InputGroup>
                                <Form.Control type="number" value={car.resaleValue} min="0" max="1" step="0.1"
                                    onChange={e => setCarPropWithId(car.id, "resaleValue", e.target.value)}
                                />
                            </InputGroup>
                        </div>

                        <div className="ms-auto p-2">
                            <Button variant="danger">
                                <i className="bi bi-trash"></i>
                            </Button>
                        </div>
                    </ListGroup.Item>
                )}
            </ListGroup>
            <Button variant="success">
                <i className="bi bi-plus-square"></i>
            </Button>
            <p>{JSON.stringify(myCars)}</p>
        </>
    );
}
P.CarsEditor = CarsEditor;
