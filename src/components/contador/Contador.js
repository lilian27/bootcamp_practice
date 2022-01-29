import React, { useState } from 'react'
import { Button, Row, Col, Container } from 'react-bootstrap'

const Contador = ({ note, toggleImportance }) => {
    const [counter, setCounter] = useState(0)
    const increaseByOne = () => setCounter(counter + 1)
    const decreaseByOne = () => setCounter(counter - 1)
    const setToZero = () => setCounter(0)

    return (
        <div className="pt-5">
            <Container>
                <Row className="justify-content-md-center">
                    <Col sm="12" className="pb-3">
                        <h2 className="text-center">Counter</h2>
                        <h3 className="text-center fs-1 fw-bold">{counter}</h3>
                    </Col>
                    <Col sm="12" md="2"><Button variant="outline-primary" className="btn-block"  onClick={increaseByOne} >Aumentar</Button></Col>
                    <Col sm="12" md="2"><Button variant="outline-dark" className="btn-block" onClick={setToZero} >Reiniciar</Button></Col>
                    <Col sm="12" md="2"><Button variant="outline-danger" className="btn-block" onClick={decreaseByOne} >Disminuir</Button></Col>
                </Row>
            </Container>
        </div>
    )
}

export default Contador