import P from './P.js'
import { Form, Row, Col } from 'react-bootstrap';

function SettingsEditor({ settings, setSettings }) {
    return (
        <Row>
            <Col>
                <P.Row label="DPH %">
                    <Form.Control type="number" min="0" max="1" step="0.01"
                        value={settings.vat} name="vat"
                        onChange={(e) => setSettings(previous => ({ ...previous, vat: Number.parseFloat(e.target.value) }))}
                    />
                </P.Row>
            </Col>
            <Col>
                <P.Row label="Daň z príjmu PO %">
                    <Form.Control type="number" min="0" max="1" step="0.01"
                        value={settings.tax} name="tax"
                        onChange={(e) => setSettings(previous => ({ ...previous, tax: Number.parseFloat(e.target.value) }))}
                    />
                </P.Row>
            </Col>
            <Col>
                <P.Row label="Poistenie %">
                    <Form.Control type="number" min="0" max="1" step="0.00001"
                        value={settings.insuranceRatio} name="insuranceRatio"
                        onChange={(e) => setSettings(previous => ({ ...previous, insuranceRatio: Number.parseFloat(e.target.value) }))}
                    />
                </P.Row>
            </Col>
        </Row>
    )
}

P.SettingsEditor = SettingsEditor;