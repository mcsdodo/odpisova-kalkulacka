import './App.css';
import './Row';
import './CarRow';
import './CarsEditor';
import './Summary'
import './SettingsEditor'
import P from './P';

import { useState, useEffect } from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';

function App() {

  const useCache = localStorage["settings"] && JSON.parse(localStorage["settings"]).useLocalStorage;
  const getCachedValue = (key) => {
    if (useCache) {
      return localStorage[key];
    } else {
      return undefined;
    }
  }

  const initialSettingsValues = getCachedValue("settings") ? JSON.parse(getCachedValue("settings")) : {
    vat: 20,
    tax: 21,
    insuranceRatio: 2.761,
    useLocalStorage: false
  };

  const [settings, setSettings] = useState(initialSettingsValues);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  const initialCarsValues = getCachedValue("myCars") ? JSON.parse(getCachedValue("myCars")) : [
    { name: "RAV4 Plug In", price: 53186, writeoff: 2, resaleValue: 80, id: crypto.randomUUID() },
    { name: "RAV4 Hybrid", price: 43236, writeoff: 4, resaleValue: 60, id: crypto.randomUUID() },
  ];

  const [myCars, setMyCars] = useState(initialCarsValues);

  useEffect(() => {
    localStorage.setItem('myCars', JSON.stringify(myCars));
  }, [myCars]);

  return (
    <Container className="p-5 bg-light rounded-3" >
      <h1 className="header">Koľko stojí auto?</h1>
      <Tabs className="mb-3" defaultActiveKey="summary" unmountOnExit>
        <Tab eventKey="summary" title="Zhrnutie" tabClassName="cars-nav-link">
          <P.Summary settings={settings} myCars={myCars} setMyCars={setMyCars}></P.Summary>
        </Tab>
        <Tab eventKey="editor" title="Nastavenia" tabClassName="cars-nav-link" unmountOnExit>
          <P.SettingsEditor settings={settings} setSettings={setSettings}></P.SettingsEditor>
          <P.CarsEditor myCars={myCars} setMyCars={setMyCars}></P.CarsEditor>
        </Tab>
      </Tabs>
      {window.debug && <p>{JSON.stringify(myCars)}</p>}
      {window.debug && <p>{JSON.stringify(settings)}</p>}
    </Container>
  );
}

export default App;
