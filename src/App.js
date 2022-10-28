import './App.css';
import './Row';
import './CarRow';
import './CarsEditor';
import './Summary'
import P from './P';

import { useState, createContext } from 'react';
import { Container, Form, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { CarsContextProvider } from './CarsContext';

function App() {

  return (
    <Container className="p-5 mb-4 mt-4 bg-light rounded-3">
      <h1 className="header">Koľko stojí auto?</h1>
      <CarsContextProvider>
        <Tabs className="mb-3" defaultActiveKey="editor">
          <Tab eventKey="summary" title="Zhrnutie">
            <P.Summary></P.Summary>
          </Tab>
          <Tab eventKey="editor" title="Vozidlá">
            <P.CarsEditor name="Autá"></P.CarsEditor>
          </Tab>
        </Tabs>
      </CarsContextProvider>

    </Container>
  );
}

export default App;
