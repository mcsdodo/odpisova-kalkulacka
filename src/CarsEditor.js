import P from './P.js'
import { Form, ListGroup, Button, Row, Col } from 'react-bootstrap';
import React, { useContext, useReducer } from 'react';
import { CarsContext } from './CarsContext';
import CarsEditorRow from './CarsEditorRow.js';

function CarsEditor() {

    const [myCars, , settings, setSettings] = useContext(CarsContext);
    const [, forceUpdate] = useReducer(x => x + 1, 0); //re-render editor with newly added car

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
            <ListGroup variant="flush" className="">
                {myCars.map(car =>
                    <CarsEditorRow car={car} key={car.id}>
                        <div className="p-1">
                            <Button variant="danger">
                                <i className="bi bi-trash"></i>
                            </Button>
                        </div>
                    </CarsEditorRow>
                )}
                <CarsEditorRow car={{}} forceUpdate={forceUpdate}>
                    <div className="p-1">
                        <Button variant="success" type="submit">
                            <i className="bi bi-plus-square"></i>
                        </Button>
                    </div>
                </CarsEditorRow>
            </ListGroup>
            <p>{JSON.stringify(myCars)}</p>
            <p>{JSON.stringify(settings)}</p>
        </>
    );
}
P.CarsEditor = CarsEditor;
