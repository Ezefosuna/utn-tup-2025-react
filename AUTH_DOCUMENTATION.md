# Sistema de Autenticación - Documentación

## 📋 Descripción General

Este proyecto implementa un **sistema completo de autenticación** utilizando React Context API, simulando endpoints externos mediante archivos JSON locales.

## ✅ Características Implementadas

### 1. **Autenticación con Usuario y Contraseña**
- Login con validación de credenciales
- Interfaz moderna con Material-UI
- Soporte para cuentas demo

### 2. **Generación y Uso de Bearer Token**
- Tokens únicos generados por sesión
- Almacenamiento seguro en localStorage
- Formato: `Bearer_{userId}_{timestamp}_{randomString}`

### 3. **Protección de Rutas**
- Componente `ProtectedRoute` que redirige a login si no está autenticado
- Rutas automáticamente protegidas
- Soporte para loading states

### 4. **Endpoint Protegido Simulado**
- Función `getProtectedData()` que requiere autenticación
- Simula delay de red
- Retorna datos personalizados según el usuario

### 5. **Persistencia de Sesión**
- localStorage automático al iniciar sesión
- Restauración de sesión al recargar la página
- Limpieza de sesión al cerrar sesión

## 🏗️ Estructura de Carpetas

```
src/
├── contexts/
│   ├── AuthContext.jsx          # Contexto de autenticación
│   └── RecetasContext.jsx       # Contexto existente
├── hooks/
│   └── useAuth.js               # Hook personalizado para auth
├── pages/
│   ├── LoginPage.jsx            # Página de login
│   ├── ProfilePage.jsx          # Página de perfil protegida
│   └── ...
├── components/
│   └── auth/
│       └── ProtectedRoute.jsx   # Componente de protección de rutas
└── data/
    └── users.json              # Base de datos simulada de usuarios
```

## 👤 Cuentas Demo Disponibles

Puedes usar cualquiera de estas credenciales para probar:

| Usuario | Contraseña | Nombre |
|---------|-----------|--------|
| usuario1 | password123 | Usuario Demo |
| chef | chef123 | Chef Principal |
| admin | admin123 | Administrador |

## 🔐 Flujo de Autenticación

```
Login Page
    ↓
Validar credenciales (users.json)
    ↓
Generar Bearer Token
    ↓
Guardar en localStorage
    ↓
Establecer en Context
    ↓
Redirigir a Home
    ↓
Acceso a rutas protegidas
```

## 🚀 Cómo Usar

### 1. **Importar el AuthProvider en App.jsx**
```jsx
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <YourApp />
    </AuthProvider>
  );
}
```

### 2. **Usar el Hook useAuth**
```jsx
import { useAuth } from './hooks/useAuth';

function MyComponent() {
  const { user, token, login, logout, isAuthenticated } = useAuth();
  
  if (isAuthenticated()) {
    return <p>Bienvenido, {user.fullName}</p>;
  }
  
  return <LoginPage />;
}
```

### 3. **Proteger Rutas**
```jsx
import ProtectedRoute from './components/auth/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';

<Route path="/profile" element={
  <ProtectedRoute>
    <ProfilePage />
  </ProtectedRoute>
} />
```

## 📦 API de AuthContext

### Estado
- `user` - Objeto del usuario autenticado
- `token` - Bearer token actual
- `loading` - Estado de carga
- `error` - Mensaje de error

### Métodos

#### `login(username, password)`
Inicia sesión con usuario y contraseña.
```javascript
const result = await login('usuario1', 'password123');
if (result.success) {
  console.log('Sesión iniciada');
}
```

#### `logout()`
Cierra la sesión actual.
```javascript
logout(); // Limpia token, usuario y localStorage
```

#### `isAuthenticated()`
Verifica si el usuario está autenticado.
```javascript
if (isAuthenticated()) {
  // Mostrar contenido protegido
}
```

#### `getProtectedData()`
Obtiene datos protegidos (requiere autenticación).
```javascript
try {
  const data = await getProtectedData();
  console.log(data.message); // "Datos protegidos para..."
} catch (err) {
  console.error(err.message);
}
```

## 🎨 Componentes UI

### LoginPage
- Formulario de login con validación
- Botones demo para pruebas rápidas
- Campos: Usuario y Contraseña
- Mostrar/Ocultar contraseña

### ProfilePage
- Información del usuario autenticado
- Token de autenticación (primeros 50 caracteres)
- Botón para obtener datos protegidos
- Botón de cerrar sesión

## 💾 Almacenamiento Local

El sistema persiste:
- **authToken** - Bearer token
- **authUser** - Datos del usuario (JSON)

Se limpian automáticamente al cerrar sesión.

## 🔒 Seguridad

### Implementado
- ✅ Validación de credenciales
- ✅ Bearer tokens únicos
- ✅ localStorage con manejo seguro
- ✅ Protección de rutas

### Consideraciones
- 🔹 Este es un sistema simulado para demostración
- 🔹 Las contraseñas se almacenan localmente (no para producción)
- 🔹 En producción, usar autenticación real (JWT, OAuth, etc.)

## 🧪 Testing del Sistema

1. **Abrir aplicación**: http://localhost:5173/
2. **Click en "Iniciar Sesión"** en la barra de navegación
3. **Usar una cuenta demo** o ingresar manualmente
4. **Ver perfil**: Click en el icono de usuario
5. **Obtener datos protegidos**: Click en el botón de la página de perfil
6. **Cerrar sesión**: Click en "Cerrar Sesión"

## 📝 Próximas Mejoras Sugeridas

- [ ] Autenticación con Google/GitHub
- [ ] Recuperación de contraseña
- [ ] Dos factores de autenticación (2FA)
- [ ] Historial de sesiones
- [ ] Roles y permisos avanzados

## ✨ Notas Finales

Este sistema proporciona una base sólida para:
- Aprender cómo funciona la autenticación en React
- Prototipado rápido de aplicaciones con login
- Migración futura a un backend real

¡Disfruta del sistema de autenticación! 🚀
