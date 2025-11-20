import { createContext, useContext, useEffect, useState } from "react"
const RecetaContext = createContext(null);

export const RecetaProvider = ({children}) => {
    const [productos, setProductos] = useState([])
    useEffect(() => {
        fetch('/src/data/productos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al traer productos ${response.status}`)
            }
            return response.json();
        })
        .then(data => {
            setProductos(data)
        })
        .catch(error =>  {
            console.log(`error al obtener productos ${error} `)
            setError(true)
        })
    },[]);    
    return (
        <RecetaContext.Provider value={productos}>
            {children}
        </RecetaContext.Provider>
    )
}

export const useProductos = () => {
    return useContext(RecetaContext);
}