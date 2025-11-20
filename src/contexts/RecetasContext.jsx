import { createContext, useContext, useEffect, useState } from "react";
import recetasData from "../data/recetas.json";

const RecetasContext = createContext(null);

export const RecetasProvider = ({ children }) => {
  const [recetas, setRecetas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [favoritos, setFavoritos] = useState([]);
  const [ratings, setRatings] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  // Cargar datos iniciales y desde localStorage
  useEffect(() => {
    try {
      setIsLoading(true);
      setTimeout(() => {
        // Enriquecer recetas con calificación inicial
        const recetasEnriquecidas = recetasData.map(receta => ({
          ...receta,
          calificacion: 0
        }));
        setRecetas(recetasEnriquecidas);
        setIsLoading(false);
      }, 500);
    } catch (err) {
      console.error('Error al cargar recetas:', err);
      setError('Error al cargar las recetas');
      setIsLoading(false);
    }

    // Cargar favoritos desde localStorage
    const favoritosGuardados = localStorage.getItem('favoritos');
    if (favoritosGuardados) {
      try {
        setFavoritos(JSON.parse(favoritosGuardados));
      } catch (err) {
        console.error('Error al cargar favoritos:', err);
      }
    }

    // Cargar ratings desde localStorage
    const ratingsGuardados = localStorage.getItem('ratings');
    if (ratingsGuardados) {
      try {
        setRatings(JSON.parse(ratingsGuardados));
      } catch (err) {
        console.error('Error al cargar ratings:', err);
      }
    }

    // Cargar preferencia de dark mode
    const darkModeGuardado = localStorage.getItem('darkMode');
    if (darkModeGuardado) {
      setDarkMode(JSON.parse(darkModeGuardado));
    }
  }, []);

  // Función para obtener una receta por ID
  const getRecetaById = (id) => {
    return recetas.find(receta => receta.id === parseInt(id));
  };

  // Función para buscar recetas
  const getRecetasFiltradas = () => {
    return recetas.filter(receta => {
      const matchSearch = receta.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receta.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = !categoryFilter || receta.categoria === categoryFilter;
      const matchDifficulty = !difficultyFilter || receta.dificultad === difficultyFilter;
      return matchSearch && matchCategory && matchDifficulty;
    });
  };

  // Función para obtener categorías únicas
  const getCategorias = () => {
    const categorias = new Set(recetas.map(r => r.categoria));
    return Array.from(categorias).sort();
  };

  // Función para obtener dificultades únicas
  const getDificultades = () => {
    const dificultades = new Set(recetas.map(r => r.dificultad));
    return Array.from(dificultades);
  };

  // Función para agregar/quitar favorito
  const toggleFavorito = (recetaId) => {
    setFavoritos(prev => {
      const nuevosFavoritos = prev.includes(recetaId)
        ? prev.filter(id => id !== recetaId)
        : [...prev, recetaId];
      localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
      return nuevosFavoritos;
    });
  };

  // Función para verificar si es favorito
  const isFavorito = (recetaId) => {
    return favoritos.includes(recetaId);
  };

  // Función para establecer rating
  const setRating = (recetaId, rating) => {
    setRatings(prev => {
      const nuevoRatings = { ...prev, [recetaId]: rating };
      localStorage.setItem('ratings', JSON.stringify(nuevoRatings));
      return nuevoRatings;
    });
  };

  // Función para obtener rating
  const getRating = (recetaId) => {
    return ratings[recetaId] || 0;
  };

  // Función para cambiar dark mode
  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const nuevoValor = !prev;
      localStorage.setItem('darkMode', JSON.stringify(nuevoValor));
      return nuevoValor;
    });
  };

  return (
    <RecetasContext.Provider value={{
      recetas,
      isLoading,
      error,
      getRecetaById,
      searchTerm,
      setSearchTerm,
      categoryFilter,
      setCategoryFilter,
      difficultyFilter,
      setDifficultyFilter,
      getRecetasFiltradas,
      getCategorias,
      getDificultades,
      favoritos,
      toggleFavorito,
      isFavorito,
      ratings,
      setRating,
      getRating,
      darkMode,
      toggleDarkMode
    }}>
      {children}
    </RecetasContext.Provider>
  );
};

export const useRecetas = () => {
  const context = useContext(RecetasContext);
  if (!context) {
    throw new Error('useRecetas debe ser usado dentro de RecetasProvider');
  }
  return context;
};