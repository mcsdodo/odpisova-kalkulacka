import './App.css';
import './Row';
import './CarRow';
import './CarsEditor';
import './Summary'
import P from './P';

import { Container, Tabs, Tab } from 'react-bootstrap';
import { CarsContextProvider } from './CarsContext';

function App() {

  return (
    <Container className="p-5 mb-4 mt-4 bg-light rounded-3">
      <h1 className="header">Koľko stojí auto?</h1>
      <CarsContextProvider>
        <Tabs className="mb-3" defaultActiveKey="editor">
          {/* <Tabs className="mb-3" > */}
          <Tab eventKey="summary" title="Zhrnutie">
            <P.Summary></P.Summary>
          </Tab>
          <Tab eventKey="editor" title="Nastavenia">
            <P.CarsEditor></P.CarsEditor>
          </Tab>
        </Tabs>
      </CarsContextProvider>
    </Container>
  );
}

export default App;
