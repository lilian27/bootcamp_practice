import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'

const DetallePais = ({ pais }) => {

    const lenguajes = []
    console.log('detalle', pais);
    for (const lista in pais.languages) {
        lenguajes.push(pais.languages[lista])
    }
    return (
        <div>
            <Card >
                <Card.Body>
                    <Card.Title>{pais.flag} {pais.name.official}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem><b>Capital:</b> <span>{pais.capital}</span></ListGroupItem>
                    <ListGroupItem><b>Population:</b> <span>{pais.population}</span></ListGroupItem>
                    <ListGroupItem><b>Lenguajes</b>
                        <ul>
                            {
                                lenguajes.map(data => (
                                    <li key={data}>{data}</li>
                                ))
                            }
                        </ul></ListGroupItem>
                </ListGroup>
            </Card>
        </div>
    )
}

export default DetallePais