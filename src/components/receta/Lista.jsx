import { useProductos } from "../../contexts/RecetaContext";

function ListaIngredientes(props) {

    const productos = useProductos()
    const listProductos = productos.map(p => 
        <li key={p.id}>{p.nombre}</li>
    );
    return (
        <>
            {!props.titulo && <p>Sin titulo</p>}
            {props.titulo && <p>{props.titulo}</p>}
            <ul>{listProductos}</ul>
        </>
    )
}

export default ListaIngredientes;