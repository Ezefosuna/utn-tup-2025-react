import { createContext, useContext, useEffect, useState } from "react"
const ObjectsContext = createContext(null);

export const ObjectsProvider = ({children}) => {
    const [objects, setObjects] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    
    const fetchObjects = async () => {
        try {
            const response = await fetch('http://localhost:8000/objects')
            if (!response.ok) {
                throw new Error(`Error al traer objetos ${response.status}`)
            }
            const data = await response.json();
            setObjects(data)
        } catch (error) {
            console.log(`error al obtener objects ${error}`)
            throw error;
        }
    }

    const addObject = async (name, color) => {
        setIsLoading(true)
        try {
            const response = await fetch('http://localhost:8000/objects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    data: { color: color }
                })
            })
            
            if (!response.ok) {
                throw new Error(`Error al crear objeto ${response.status}`)
            }
            
            // Refrescar la lista después de crear
            await fetchObjects()
        } catch (error) {
            console.log(`error al crear object ${error}`)
            throw error;
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchObjects()
    },[]);    
    
    return (
        <ObjectsContext.Provider value={{ objects, addObject, isLoading }}>
            {children}
        </ObjectsContext.Provider>
    )
}

export const useObjects = () => {
    return useContext(ObjectsContext);
}