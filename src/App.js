import './App.css';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


function App() {
  return (
    <Container className="p-3">
    <Container className="p-5 mb-4 bg-light rounded-3">
      <h1 className="header">Welcome To React-Bootstrap</h1>
      {/* <ExampleToast> */}
        We now have Toasts
        <span role="img" aria-label="tada">
          🎉
        </span>
      {/* </ExampleToast> */}
    </Container>
  </Container>
  );
}

export default App;
