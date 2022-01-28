const Pais = ({ pais }) => {
    return (
        <div> 
            <li key={pais.name.official}> {pais.name.official} </li>
        </div>
    )
}
export default Pais