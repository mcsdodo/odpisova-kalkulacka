import P from './P.js'
import { useState, useContext } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { CarsContext } from './CarsContext';

function Summary() {

    const [myCars, setCarPropWithId, settings] = useContext(CarsContext);
    const [myCarId, setMyCarId] = useState(myCars[0].id);

    const setCarProp = (prop, val) => setCarPropWithId(myCarId, prop, val);

    const [selling, setSelling] = useState(true);

    const myCar = () => myCars.find(car => car.id === myCarId);

    const [startingFunds, setFunds] = useState(8000);
    const [writeoffPeriods, setWriteoffPeriods] = useState(5);

    const getPriceExVAT = () => -Math.round(myCar().price / (1 + settings.vat));
    const getInsurance = () => -Math.round(myCar().price * settings.insuranceRatio) * myCar().writeoff;
    const getTotalWriteoff = () => -Math.round((getPriceExVAT() + getInsurance()) * settings.tax);
    const getResaleValue = () => Math.round(-getPriceExVAT() * myCar().resaleValue);
    const getResaleTax = () => -Math.round(getResaleValue() * settings.tax);
    const getTotalCost = () => getPriceExVAT() + getInsurance() + getTotalWriteoff() +
        getResaleValue() + getResaleTax();
    const getFirstCarTotalCost = () => getTotalCost() + Number.parseInt(startingFunds);

    const getNextCarCosts = () => [...Array(writeoffPeriods - 1)].map(c => getTotalCost());

    return (
        <Form>
            <P.Row label="Auto">
                <Form.Select
                    onChange={(e) => setMyCarId(e.target.value)}>
                    {
                        Object.entries(myCars).map(([, value]) =>
                            <option key={value.id} value={value.id}>
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
                                onChange={e => setFunds(e.target.value)} />
                        </P.Row>
                    </P.Row>
                </Col>
                <Col>
                    <P.Row label="Dĺžka odpisu"
                        tooltip="Pre elektrické/plugin-hybridné vozidlá možnosť 2 roky. Ostatné 4.">
                        <Form.Control type="number" min="2" max="4"
                            value={myCar().writeoff} name="writeoff"
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
                            value={myCar().resaleValue} name="resaleValue"
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
            <P.Row label={myCar().writeoff + " roky odpisy"} tooltip={"Cena + poistenie * " + (settings.tax * 100) + "%"}>
                <Form.Control type="text" value={getTotalWriteoff()} disabled />
            </P.Row>
            <P.Row label="Zostatková hodnota € (bez DPH)">
                <Form.Control type="number" value={getResaleValue()} disabled />
            </P.Row>
            <P.Row label="Daň z predaja €" tooltip={"Zostatková cena * " + (settings.tax * 100) + "%"}>
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
        </Form>
    );
}


P.Summary = Summary;