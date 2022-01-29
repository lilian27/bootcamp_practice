import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'

const Pais = ({ pais }) => {
    return (
        <Card className="mt-2">
            <Card.Body>
                <Card.Title>{pais.flag} {pais.name.official}</Card.Title>
            </Card.Body>
        </Card>
    )
}
export default Pais