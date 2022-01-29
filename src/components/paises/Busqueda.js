
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Resultado from "./Resultado"
import { Form, Button, Row, Col } from 'react-bootstrap'

const Busqueda = () => {
    const [newPais, setNewPais] = useState('')
    const [countrys, setCountrys] = useState([])
    const handleNewPaisChange = (event) => {
        setNewPais(event.target.value)
    }

    useEffect(() => {
        if (newPais !== '') {
            const url = `https://restcountries.com/v3.1/name/${newPais}`;
            axios.get(url).then((response) => {
                setCountrys(response.data)
            }).catch(function (error) {
                setCountrys([])
                console.log('um error ha ocurrido', error);
            })
        }
    }, [newPais])

    return (
        <div>
            <Form >
                <Row>
                    <Col sm="12" md="4">
                        <Form.Group className="mb-3" controlId="filtro" value={newPais}
                            onChange={handleNewPaisChange}>
                            <Form.Control type="text" placeholder="Ingrese nombre pais" />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>

            <p className="mt-5"> Se han encontrado {countrys.length} resultado(s){countrys.length > 10 ? ', favor ser más especifico.' : ''}</p>

            {countrys.length > 0 && countrys.length < 10 ? <Resultado paises={countrys}></Resultado> : null}

        </div>
    )
}

export default Busqueda;