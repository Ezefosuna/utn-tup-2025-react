# Guía Completa de React Router DOM en Español

## Índice
1. [Introducción](#introducción)
2. [Instalación](#instalación)
3. [Conceptos Básicos](#conceptos-básicos)
4. [Configuración Inicial](#configuración-inicial)
5. [Navegación](#navegación)
6. [Rutas Anidadas](#rutas-anidadas)
7. [Parámetros de URL](#parámetros-de-url)
8. [Hooks de React Router](#hooks-de-react-router)
9. [Navegación Programática](#navegación-programática)
10. [Rutas Protegidas](#rutas-protegidas)
11. [Manejo de Errores 404](#manejo-de-errores-404)
12. [Ejemplos Avanzados](#ejemplos-avanzados)

## Introducción

React Router DOM es la librería estándar para manejar el enrutamiento en aplicaciones React. Te permite crear aplicaciones de una sola página (SPA) con múltiples vistas y URLs diferentes.

## Instalación

```bash
npm install react-router-dom
```

## Conceptos Básicos

### Componentes Principales

- **BrowserRouter**: Proporciona el contexto de enrutamiento
- **Routes**: Contenedor para todas las rutas
- **Route**: Define una ruta específica
- **Link**: Componente para navegación declarativa
- **NavLink**: Link con estilos activos

### Estructura Base
```jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/acerca">Acerca</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/acerca" element={<Acerca />} />
      </Routes>
    </Router>
  )
}
```

## Configuración Inicial

### 1. Configurar el Router Principal

En tu archivo principal (App.jsx):

```jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ObjectsPage from './pages/ObjectsPage'
import RecetaPage from './pages/RecetaPage'

function App() {
  return (
    <Router>
      <div>
        <nav style={{ 
          padding: '20px', 
          borderBottom: '1px solid #ccc',
          marginBottom: '20px',
          backgroundColor: '#f5f5f5'
        }}>
          <Link to="/" style={{ marginRight: '20px' }}>
            Inicio
          </Link>
          <Link to="/objects" style={{ marginRight: '20px' }}>
            Objetos
          </Link>
          <Link to="/receta">
            Recetas
          </Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/objects" element={<ObjectsPage />} />
          <Route path="/receta" element={<RecetaPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
```

## Navegación

### Link vs NavLink

**Link**: Navegación básica
```jsx
<Link to="/productos">Ver Productos</Link>
```

**NavLink**: Con estilos activos
```jsx
<NavLink 
  to="/productos" 
  style={({ isActive }) => ({
    color: isActive ? '#ff6347' : '#333',
    textDecoration: isActive ? 'underline' : 'none'
  })}
>
  Productos
</NavLink>
```

### Navegación con Estado
```jsx
<Link 
  to="/producto/123" 
  state={{ from: 'lista-productos' }}
>
  Ver Producto
</Link>
```

## Rutas Anidadas

Para crear rutas anidadas, utiliza rutas hijas:

```jsx
import { Outlet } from 'react-router-dom'

// Componente padre
function Dashboard() {
  return (
    <div>
      <h1>Panel de Control</h1>
      <nav>
        <Link to="estadisticas">Estadísticas</Link>
        <Link to="configuracion">Configuración</Link>
      </nav>
      <Outlet /> {/* Aquí se renderizan las rutas hijas */}
    </div>
  )
}

// En App.jsx
<Routes>
  <Route path="/dashboard" element={<Dashboard />}>
    <Route path="estadisticas" element={<Estadisticas />} />
    <Route path="configuracion" element={<Configuracion />} />
    <Route index element={<DashboardHome />} /> {/* Ruta por defecto */}
  </Route>
</Routes>
```

## Parámetros de URL

### Parámetros Simples
```jsx
// Definir la ruta
<Route path="/usuario/:id" element={<PerfilUsuario />} />

// Acceder al parámetro en el componente
import { useParams } from 'react-router-dom'

function PerfilUsuario() {
  const { id } = useParams()
  
  return <div>ID del usuario: {id}</div>
}
```

### Múltiples Parámetros
```jsx
<Route path="/categoria/:categoria/producto/:id" element={<DetalleProducto />} />

function DetalleProducto() {
  const { categoria, id } = useParams()
  
  return (
    <div>
      <p>Categoría: {categoria}</p>
      <p>ID del Producto: {id}</p>
    </div>
  )
}
```

### Parámetros Opcionales
```jsx
<Route path="/buscar/:termino?" element={<Busqueda />} />
```

## Hooks de React Router

### useNavigate
```jsx
import { useNavigate } from 'react-router-dom'

function MiComponente() {
  const navigate = useNavigate()
  
  const manejarClick = () => {
    // Navegar programáticamente
    navigate('/productos')
    
    // Con estado
    navigate('/productos', { state: { filtro: 'activos' } })
    
    // Reemplazar en el historial
    navigate('/productos', { replace: true })
    
    // Navegar hacia atrás
    navigate(-1)
  }
  
  return <button onClick={manejarClick}>Ir a Productos</button>
}
```

### useLocation
```jsx
import { useLocation } from 'react-router-dom'

function MiComponente() {
  const location = useLocation()
  
  console.log(location.pathname) // '/productos'
  console.log(location.search)   // '?categoria=electronica'
  console.log(location.state)    // Estado pasado desde navigate
  
  return <div>Ruta actual: {location.pathname}</div>
}
```

### useSearchParams
```jsx
import { useSearchParams } from 'react-router-dom'

function ListaProductos() {
  const [searchParams, setSearchParams] = useSearchParams()
  
  const categoria = searchParams.get('categoria') || 'todas'
  const ordenar = searchParams.get('ordenar') || 'nombre'
  
  const cambiarFiltro = (nuevaCategoria) => {
    setSearchParams({ categoria: nuevaCategoria, ordenar })
  }
  
  return (
    <div>
      <p>Categoría actual: {categoria}</p>
      <button onClick={() => cambiarFiltro('electronica')}>
        Filtrar por Electrónica
      </button>
    </div>
  )
}
```

## Navegación Programática

### Ejemplo Completo
```jsx
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function FormularioLogin() {
  const [usuario, setUsuario] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  
  // Obtener la ruta desde donde vino el usuario
  const from = location.state?.from?.pathname || '/'
  
  const manejarSubmit = async (e) => {
    e.preventDefault()
    
    try {
      // Lógica de login aquí
      await login(usuario)
      
      // Redirigir al usuario a donde estaba antes
      navigate(from, { replace: true })
    } catch (error) {
      console.error('Error de login:', error)
    }
  }
  
  return (
    <form onSubmit={manejarSubmit}>
      <input 
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        placeholder="Usuario"
      />
      <button type="submit">Iniciar Sesión</button>
    </form>
  )
}
```

## Rutas Protegidas

### Crear un Componente de Ruta Protegida
```jsx
import { Navigate, useLocation } from 'react-router-dom'

function RutaProtegida({ children }) {
  const isAuthenticated = useAuth() // Tu lógica de autenticación
  const location = useLocation()
  
  if (!isAuthenticated) {
    // Redirigir al login pasando la ubicación actual
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  
  return children
}

// Uso en las rutas
<Routes>
  <Route path="/login" element={<Login />} />
  <Route 
    path="/dashboard" 
    element={
      <RutaProtegida>
        <Dashboard />
      </RutaProtegida>
    } 
  />
  <Route 
    path="/perfil" 
    element={
      <RutaProtegida>
        <Perfil />
      </RutaProtegida>
    } 
  />
</Routes>
```

### Hook Personalizado para Autenticación
```jsx
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  
  const login = async (credentials) => {
    // Lógica de login
    const userData = await authenticateUser(credentials)
    setUser(userData)
  }
  
  const logout = () => {
    setUser(null)
  }
  
  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  }
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
```

## Manejo de Errores 404

### Ruta Catch-All
```jsx
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/acerca" element={<Acerca />} />
      
      {/* Ruta para páginas no encontradas */}
      <Route path="*" element={<PaginaNoEncontrada />} />
    </Routes>
  )
}

function PaginaNoEncontrada() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Página No Encontrada</h1>
      <p>La página que buscas no existe.</p>
      <Link to="/">Volver al Inicio</Link>
    </div>
  )
}
```

## Ejemplos Avanzados

### Layout con Navegación Persistente
```jsx
import { Outlet, NavLink } from 'react-router-dom'

function Layout() {
  return (
    <div className="app-layout">
      <header>
        <nav>
          <NavLink to="/" end>Inicio</NavLink>
          <NavLink to="/productos">Productos</NavLink>
          <NavLink to="/contacto">Contacto</NavLink>
        </nav>
      </header>
      
      <main>
        <Outlet /> {/* Aquí se renderizan las rutas hijas */}
      </main>
      
      <footer>
        <p>&copy; 2024 Mi Aplicación</p>
      </footer>
    </div>
  )
}

// En App.jsx
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Inicio />} />
    <Route path="productos" element={<Productos />} />
    <Route path="contacto" element={<Contacto />} />
  </Route>
</Routes>
```

### Carga Perezosa (Lazy Loading)
```jsx
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

// Importación perezosa
const ProductosPage = lazy(() => import('./pages/ProductosPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route 
        path="/productos" 
        element={
          <Suspense fallback={<div>Cargando productos...</div>}>
            <ProductosPage />
          </Suspense>
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <Suspense fallback={<div>Cargando dashboard...</div>}>
            <DashboardPage />
          </Suspense>
        } 
      />
    </Routes>
  )
}
```

### Breadcrumbs (Migas de Pan)
```jsx
import { useLocation, Link } from 'react-router-dom'

function Breadcrumbs() {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)
  
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
          const isLast = index === pathnames.length - 1
          
          return isLast ? (
            <li key={name} aria-current="page">
              {name}
            </li>
          ) : (
            <li key={name}>
              <Link to={routeTo}>{name}</Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
```

## Mejores Prácticas

### 1. Estructura de Archivos
```
src/
  components/
    layout/
      Layout.jsx
      Navbar.jsx
    common/
      ProtectedRoute.jsx
      NotFound.jsx
  pages/
    HomePage.jsx
    ProductsPage.jsx
    AboutPage.jsx
  hooks/
    useAuth.js
  contexts/
    AuthContext.jsx
```

### 2. Nombres de Rutas Consistentes
```jsx
// ✅ Bueno: URLs claras y semánticas
<Route path="/productos" element={<ProductosPage />} />
<Route path="/productos/:id" element={<DetalleProducto />} />
<Route path="/usuarios/:id/perfil" element={<PerfilUsuario />} />

// ❌ Evitar: URLs confusas
<Route path="/p" element={<ProductosPage />} />
<Route path="/data/:x" element={<DetalleProducto />} />
```

### 3. Manejo de Estados de Carga
```jsx
function ProductoDetalle() {
  const { id } = useParams()
  const [producto, setProducto] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    async function cargarProducto() {
      try {
        setCargando(true)
        const data = await fetchProducto(id)
        setProducto(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setCargando(false)
      }
    }
    
    cargarProducto()
  }, [id])
  
  if (cargando) return <div>Cargando producto...</div>
  if (error) return <div>Error: {error}</div>
  if (!producto) return <div>Producto no encontrado</div>
  
  return <div>{/* Contenido del producto */}</div>
}
```

## Consejos Adicionales

1. **Usa `replace: true`** cuando no quieras que el usuario pueda volver atrás
2. **Valida parámetros** antes de hacer peticiones a la API
3. **Usa Suspense** para carga perezosa de componentes
4. **Implementa breadcrumbs** para mejor UX en aplicaciones complejas
5. **Maneja estados de error** para rutas que fallan al cargar

Esta guía cubre los aspectos más importantes de React Router DOM. ¡Practica con diferentes configuraciones para dominar la librería!
