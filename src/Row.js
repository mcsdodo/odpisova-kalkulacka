import P from './P.js'
import { OverlayTrigger, Tooltip, Form, InputGroup, FloatingLabel } from 'react-bootstrap';

function Row({ label, children, tooltip }) {

    const childrenWithTooltip = (
        <OverlayTrigger
            placement={'top'}
            delay={{ show: 250, hide: 400 }}
            overlay={
                <Tooltip>
                    {tooltip}
                </Tooltip>
            }>
            {children}
        </OverlayTrigger>
    );

    const floating = (
        <Form.Group className="mb-2">
            <FloatingLabel label={label}>
                {tooltip ? childrenWithTooltip : children}
            </FloatingLabel>
        </Form.Group>
    );

    return floating;
}
P.Row = Row;