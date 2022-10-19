import './App.css';
import './Row';
import P from './P';

import { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';


function App() {
  const iterations = 10;
  const vat = 0.2;
  const tax = 0.21;
  const divTax = 0.07;
  const insuranceRatio = 0.02761;

  const [myCarId, setMyCarId] = useState(0);

  const [myCars, setMyCars] = useState(Object.assign({}, [
    { name: "RAV4 Prime", price: 53186, writeoff: 2, resaleValue: 0.8 },
    { name: "RAV4 Hybrid", price: 43236, writeoff: 4, resaleValue: 0.6 },
  ]));

  const setCarProp = (prop, val) => setMyCars(prev => {
    const updatedCar = { ...prev[myCarId], [prop]: val };
    const updatedCars = { ...prev, [myCarId]: updatedCar };
    return updatedCars;
  });

  const myCar = () => myCars[myCarId];

  const [startingFunds, setFunds] = useState(8000);

  const submit = () => alert('Submitted');
  const getPriceExVAT = () => -Math.round(myCar().price / (1 + vat));
  const getInsurance = () => -Math.round(myCar().price * insuranceRatio) * myCar().writeoff;
  const getTotalWriteoff = () => -Math.round((getPriceExVAT() + getInsurance()) * tax);
  const getResaleValue = () => Math.round(-getPriceExVAT() * myCar().resaleValue);
  const getResaleTax = () => -Math.round(getResaleValue() * tax);
  const getTotalCost = () => getPriceExVAT() + getInsurance() + getTotalWriteoff() +
    getResaleValue() + getResaleTax();

  return (
    <Container className="p-5 mb-4 mt-4 bg-light rounded-3">
      <h1 className="header">Koľko stojí {myCar().name}</h1>
      <Form>
        <P.Row label="Auto">
          <Form.Select
            onChange={(e) => setMyCarId(e.target.value)}>
            {
              Object.entries(myCars).map(([key, value]) =>
                <option key={key} value={key}>
                  {value.name} ({value.price}€)
                </option>)
            }
          </Form.Select>
        </P.Row>
        <Row>
          <Col>
            <P.Row label="Dĺžka odpisu" min="2" max="4"
              tooltip="Pre elektrické/plugin-hybridné vozidlá možnosť 2 roky. Ostatné 4.">
              <Form.Control type="number" min="1" max="10"
                value={myCars[myCarId].writeoff} name="writeoff"
                onChange={(e) => setCarProp(e.target.name, e.target.value)}
              />
            </P.Row>
          </Col>
          <Col>
            <P.Row label="Zostatková hodnota %">
              <Form.Control type="number" step="0.1" min="0.0" max="1.0"
                value={myCars[myCarId].resaleValue} name="resaleValue"
                onChange={(e) => setCarProp(e.target.name, e.target.value)}
              />
            </P.Row>
          </Col>
        </Row>
        <P.Row label="Bez DPH" tooltip="DPH 20%">
          <Form.Control type="text" value={getPriceExVAT()} disabled></Form.Control>
        </P.Row>
        <P.Row label={myCar().writeoff + " roky poistka"} tooltip="2.761% ročne z ceny auta.">
          <Form.Control type="text" value={getInsurance()} disabled />
        </P.Row>
        <P.Row label={myCar().writeoff + " roky odpisy"} tooltip={"Cena + poistenie * " + (tax * 100) + "%"}>
          <Form.Control type="text" value={getTotalWriteoff()} disabled />
        </P.Row>
        <P.Row label="Zostatková hodnota € (bez DPH)">
          <Form.Control type="number" value={getResaleValue()} disabled />
        </P.Row>
        <P.Row label="Daň z predaja €" tooltip={"Zostatková cena * " + (tax * 100) + "%"}>
          <Form.Control type="number" value={getResaleTax()} disabled />
        </P.Row>
        <Row>
          <Col>
            <P.Row label={"Celkovo za " + myCar().writeoff + " roky"}>
              <Form.Control type="number" value={getTotalCost()} disabled />
            </P.Row>
          </Col>
          <Col>
            <P.Row label="Celkovo za 1 rok">
              <Form.Control type="number"
                value={Math.round(getTotalCost() / myCar().writeoff)} disabled />
            </P.Row>
          </Col>
          <Col>
            <P.Row label="Celkovo za 1 mesiac">
              <Form.Control type="number"
                value={Math.round(getTotalCost() / myCar().writeoff / 12)} disabled />
            </P.Row>
          </Col>
        </Row>


        {/* <P.Row label="Vstupný kapitál">
          <Form.Control type="number" value={startingFunds}
            onChange={(event) => setFunds(event.target.value)} />
        </P.Row> */}
        <p>{JSON.stringify(myCars)}</p>
        <Button onClick={submit}>Submit</Button>
      </Form>
    </Container>
  );
}

export default App;
