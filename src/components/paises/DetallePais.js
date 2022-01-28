const DetallePais = ({ pais }) => {
    
    const lenguajes = []
    console.log('detalle', pais);
    for(const lista in pais.languages){
        lenguajes.push(pais.languages[lista])
    }
    return (
        <div>
            <h2>{pais.name.official}</h2>
            <div><b>Capital:</b> <span>{pais.capital}</span></div>
            <div><b>Population:</b> <span>{pais.population}</span></div>
            <div>
            <b>Lenguajes</b>
            <ul>
                {
                    lenguajes.map(data => (
                        <li key={data}>{data}</li>
                    ))
                }
            </ul>
            {pais.flag}
            <image src={pais.flag} alt="bandera" width="8%"></image>
            </div>
        </div>
    )
}

export default DetallePais