import P from './P.js'
import { Form, Col, Row } from 'react-bootstrap';

function CarRow({ writeoff, totalcost }) {
    const years = (writeoff === 1 ? "rok" : (writeoff < 5 ? "roky" : "rokov"));
    return (
        <Row>
            <Col sm>
                <P.Row label={"Celkovo / " + writeoff + " " + years}>
                    <Form.Control type="number" value={totalcost} disabled />
                </P.Row>
            </Col>
            <Col sm>
                <P.Row label="Celkovo / 1 rok">
                    <Form.Control type="number"
                        value={Math.round(totalcost / writeoff)} disabled />
                </P.Row>
            </Col>
            <Col sm>
                <P.Row label="Celkovo / 1 mesiac">
                    <Form.Control type="number"
                        value={Math.round(totalcost / writeoff / 12)} disabled />
                </P.Row>
            </Col>
        </Row>
    );
}
P.CarRow = CarRow;
