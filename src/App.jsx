import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const express = require('express');
const app = express();
const http = require('http');
const port = process.env.PORT;


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function App() {
  return (
    <>
    {/* Page Container */}
      <Container>

    {/* header row  */}
      <Row>
      <Col> Icon </Col>
      <Col xs={6}> Par the Course</Col>

      <Col> Logout </Col>
      </Row>
    {/* Main container */}
      <Row>  
      {/* Games container */}
      <Col> Games </Col>
      {/* High-score container */}
      <Col> High Score </Col>

      </Row>  
        </Container>
    </>
  )
}

export default App
