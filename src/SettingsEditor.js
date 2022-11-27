import P from './P.js'
import { Form, Row, Col } from 'react-bootstrap';

function SettingsEditor({ settings, setSettings }) {
    return (
        <>
            <Row>
                <Col sm>
                    <P.Row label="DPH %">
                        <Form.Control type="number" min="0" max="100" step="1"
                            value={settings.vat} name="vat"
                            onChange={(e) => setSettings(previous => ({ ...previous, vat: Number.parseFloat(e.target.value) }))}
                        />
                    </P.Row>
                </Col>
                <Col sm>
                    <P.Row label="Daň z príjmu PO %">
                        <Form.Control type="number" min="0" max="100" step="1"
                            value={settings.tax} name="tax"
                            onChange={(e) => setSettings(previous => ({ ...previous, tax: Number.parseFloat(e.target.value) }))}
                        />
                    </P.Row>
                </Col>
                <Col sm>
                    <P.Row label="Poistenie %">
                        <Form.Control type="number" min="0" max="20" step="0.001"
                            value={settings.insuranceRatio} name="insuranceRatio"
                            onChange={(e) => setSettings(previous => ({ ...previous, insuranceRatio: Number.parseFloat(e.target.value) }))}
                        />
                    </P.Row>
                </Col>
            </Row>
            <Row>
                <Col sm>
                    <P.Row>
                        <Form.Check type="switch" label="Zamamätaj si hodnoty"
                            checked={settings.useLocalStorage} onChange={e => setSettings(previous => ({ ...previous, useLocalStorage: !previous.useLocalStorage }))} />
                    </P.Row>
                </Col>
            </Row>
        </>
    )
}

P.SettingsEditor = SettingsEditor;
