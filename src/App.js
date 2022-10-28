import './App.css';
import './Row';
import './CarRow';
import './CarsEditor';
import P from './P';

import { useState } from 'react';
import { Container, Form, Row, Col, Tabs, Tab } from 'react-bootstrap';


function App() {
  const vat = 0.2;
  const tax = 0.21;
  const divTax = 0.07;
  const insuranceRatio = 0.02761;

  const [myCarId, setMyCarId] = useState(0);

  const [myCars, setMyCars] = useState(Object.assign({}, [
    { name: "RAV4 Prime", price: 53186, writeoff: 2, resaleValue: 0.8 },
    { name: "RAV4 Hybrid", price: 43236, writeoff: 4, resaleValue: 0.6 },
  ]));

  const setCarProp = (prop, val) => setCarPropWithId(myCarId, prop, val);

  const setCarPropWithId = (id, prop, val) => setMyCars(prev => {
    const updatedCar = { ...prev[id], [prop]: val };
    const updatedCars = { ...prev, [id]: updatedCar };
    return updatedCars;
  });

  const [selling, setSelling] = useState(true);

  const myCar = () => myCars[myCarId];

  const [startingFunds, setFunds] = useState(8000);
  const [useStartingFunds, setUseStartingFunds] = useState(true);
  const [writeoffPeriods, setWriteoffPeriods] = useState(5);

  const getPriceExVAT = () => -Math.round(myCar().price / (1 + vat));
  const getInsurance = () => -Math.round(myCar().price * insuranceRatio) * myCar().writeoff;
  const getTotalWriteoff = () => -Math.round((getPriceExVAT() + getInsurance()) * tax);
  const getResaleValue = () => Math.round(-getPriceExVAT() * myCar().resaleValue);
  const getResaleTax = () => -Math.round(getResaleValue() * tax);
  const getTotalCost = () => getPriceExVAT() + getInsurance() + getTotalWriteoff() +
    getResaleValue() + getResaleTax();
  const getFirstCarTotalCost = () => getTotalCost() + Number.parseInt(useStartingFunds ? startingFunds : 0);;
  const getTotalNetCost = () => getTotalCost() * (1 - divTax);

  const getNextCarCosts = () => [...Array(writeoffPeriods - 1)].map(c => getTotalCost());

  return (
    <Container className="p-5 mb-4 mt-4 bg-light rounded-3">
      <h1 className="header">Koľko stojí auto?</h1>
      <P.CarsEditor name="Autá" myCars={myCars} setCarPropWithId={setCarPropWithId}></P.CarsEditor>

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
            <P.Row>
              <P.Row label="Vstupný kapitál"
                tooltip="Použi v prípade, že začínaš podnikať a vložíš/predáš súkromné auto do vlastnej firmy.">
                <Form.Control type="number" value={startingFunds} min="0" step="500"
                  onChange={e => setFunds(e.target.value)} disabled={!useStartingFunds} />
              </P.Row>
            </P.Row>
          </Col>
          <Col>
            <P.Row label="Dĺžka odpisu"
              tooltip="Pre elektrické/plugin-hybridné vozidlá možnosť 2 roky. Ostatné 4.">
              <Form.Control type="number" min="2" max="4"
                value={myCars[myCarId].writeoff} name="writeoff"
                onChange={(e) => {
                  setCarProp(e.target.name, e.target.value);
                  let writeoffint = Number.parseInt(e.target.value);
                  setCarProp("resaleValue", 1 - (0.1 * writeoffint));
                }
                }
              />
            </P.Row>
          </Col>
          <Col>
            <P.Row label="Zostatková hodnota %"
              tooltip="Automatická zmena so zmenou odpisu. (1-0.1*odpis)"                >
              <Form.Control type="number" step="0.1" min="0.0" max="1.0"
                value={myCars[myCarId].resaleValue} name="resaleValue"
                onChange={(e) => setCarProp(e.target.name, e.target.value)}
              />
            </P.Row>
          </Col>
        </Row>
        <Row>
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
        <Form.Label>Náklad 1. auto</Form.Label>
        <P.CarRow writeoff={myCar().writeoff} totalcost={getFirstCarTotalCost()} ></P.CarRow>
        {getNextCarCosts().length > 0 && <Form.Label>Náklad 2. a ďalšie</Form.Label>}
        {getNextCarCosts().length > 0 &&
          <P.CarRow writeoff={myCar().writeoff} totalcost={getNextCarCosts()[0]} ></P.CarRow>
        }
        <Form.Label>Náklad dlhodobo</Form.Label>
        <Row>
          <Col>
            <P.Row label="Počet odpisových období" tooltip="">
              <Form.Control type="number" min="1" max="10"
                value={writeoffPeriods} onChange={e => setWriteoffPeriods(e.target.value)} />
            </P.Row>
          </Col>
          <Col>
            <P.Row>
              <Form.Check type="switch" label="Predaj na konci podnikania"
                checked={selling} onChange={e => setSelling(!selling)} />
            </P.Row>
          </Col>
        </Row>
        <P.CarRow writeoff={myCar().writeoff * writeoffPeriods}
          totalcost={getFirstCarTotalCost()
            + getNextCarCosts().reduce((sum, c) => sum + c, 0)
            + (!selling ? -getResaleValue() : 0)} >

        </P.CarRow>

        <p>{JSON.stringify(myCars)}</p>
      </Form>
    </Container>
  );
}

export default App;
