import './App.css';
import './Row';
import './CarRow';
import './CarsEditor';
import './Summary'
import './SettingsEditor'
import P from './P';

import { useState } from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';

function App() {
  const debug = false;
  const [settings, setSettings] = useState({
    vat: 20,
    tax: 21,
    insuranceRatio: 2.761
  });

  const [myCars, setMyCars] = useState([
    { name: "RAV4 Prime", price: 53186, writeoff: 2, resaleValue: 80, id: crypto.randomUUID() },
    { name: "RAV4 Hybrid", price: 43236, writeoff: 4, resaleValue: 60, id: crypto.randomUUID() },
  ]);

  return (
    <Container className="p-5 bg-light rounded-3" >
      <h1 className="header">Koľko stojí auto?</h1>
      <Tabs className="mb-3" defaultActiveKey="editor" unmountOnExit="true">
        <Tab eventKey="summary" title="Zhrnutie" tabClassName="cars-nav-link">
          <P.Summary settings={settings} myCars={myCars} setMyCars={setMyCars}></P.Summary>
        </Tab>
        <Tab eventKey="editor" title="Nastavenia" tabClassName="cars-nav-link">
          <P.SettingsEditor settings={settings} setSettings={setSettings}></P.SettingsEditor>
          <P.CarsEditor myCars={myCars} setMyCars={setMyCars}></P.CarsEditor>
        </Tab>
      </Tabs>
      {debug && <p>{JSON.stringify(myCars)}</p>}
      {debug && <p>{JSON.stringify(settings)}</p>}
    </Container>
  );
}

export default App;
