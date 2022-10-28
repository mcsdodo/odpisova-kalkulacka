import P from './P.js'
import { Form, Col, Row, Table, Accordion, ListGroup, Button, Offcanvas } from 'react-bootstrap';
import React, { useState } from 'react';

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

function CarsEditor({ name, myCars, setCarPropWithId }) {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const cars = Object.entries(myCars).map(([key, val]) => val);

    return (
        <>
            <Button variant="primary" onClick={handleShow} className="me-2">
                {name}
            </Button>
            <Offcanvas show={show} onHide={handleClose} placement="top">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup variant="flush" className="w-50">
                        {cars.map((car, idx) =>
                            <>
                                <ListGroup.Item className="d-flex align-items-start">
                                    <div className="p-2">{car.name}</div>
                                    <div className="p-2">{car.price}</div>

                                    <div className="ms-auto">
                                        <Button variant="outline-secondary" size="sm" className="m-1">
                                            <i className="bi bi-pencil-square"></i>
                                        </Button>
                                        <Button variant="outline-danger" size="sm" className="m-1">
                                            <i className="bi bi-trash"></i>
                                        </Button>
                                    </div>

                                </ListGroup.Item>
                            </>
                        )
                        }
                    </ListGroup>
                </Offcanvas.Body>
                <p>{JSON.stringify(myCars)}</p>

            </Offcanvas>
        </>
    );
}
P.CarsEditor = CarsEditor;
