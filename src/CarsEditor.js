import P from './P.js'
import { ListGroup } from 'react-bootstrap';
import CarsEditorRow from './CarsEditorRow.js';

function CarsEditor({ myCars, setMyCars }) {

    return (
        <>
            <ListGroup variant="flush" className="">
                {myCars.map(car =>
                    <CarsEditorRow car={car} key={car.id} myCars={myCars} setMyCars={setMyCars} />
                )}
                <CarsEditorRow car={{}} isAdd myCars={myCars} setMyCars={setMyCars} />
            </ListGroup>
            <p>{JSON.stringify(myCars)}</p>
        </>
    );
}
P.CarsEditor = CarsEditor;
