import DetallePais from "./DetallePais";
import Pais from "./Pais"


const Resultado = ({ paises }) => {
    if (paises.length > 1) {
        return (
            <div>
                {paises.map(data => (
                    <Pais pais={data} />
                ))}
            </div>
        )
    } else {
        return (
            <DetallePais pais={paises[0]} />
        )
    }
}
export default Resultado