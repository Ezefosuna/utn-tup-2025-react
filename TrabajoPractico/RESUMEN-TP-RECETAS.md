# 🍽️ Trabajo Práctico: Aplicación de Recetas
## Desarrollo con React + Material-UI + React Router DOM

---

## 📌 Resumen Ejecutivo

**¿Qué vas a construir?**  
Una aplicación web moderna de recetas de cocina con listado y detalle de recetas.

**Tecnologías:**
- ⚛️ React 19
- 🎨 Material-UI 7
- 🧭 React Router DOM 7
- 📦 Vite

**Duración estimada:** 4 semanas (20-28 horas de trabajo)

---

## 🎯 Funcionalidades Principales

### 1️⃣ Listado de Recetas (`/recetas`)
- Grid de cards responsive (1 columna mobile, 2 tablet, 3 desktop)
- Cada card muestra:
  - Imagen
  - Título
  - Descripción breve
  - Tiempo de preparación
  - Dificultad (Fácil/Media/Difícil)
  - Porciones
  - Botón "Ver Receta"

### 2️⃣ Detalle de Receta (`/recetas/:id`)
- Información completa de la receta:
  - Imagen destacada
  - Título y descripción
  - Datos generales (tiempo, dificultad, porciones)
  - Lista de ingredientes (cantidad + unidad + nombre)
  - Pasos de preparación numerados
  - Botón "Volver al Listado"

---

## 📂 Estructura Requerida

```
src/
├── components/
│   ├── recetas/
│   │   ├── RecetaCard.jsx
│   │   ├── RecetasList.jsx
│   │   ├── RecetaDetalle.jsx
│   │   └── IngredientesList.jsx
│   └── layout/
│       └── Navbar.jsx
├── contexts/
│   └── RecetasContext.jsx
├── data/
│   └── recetas.json (mínimo 6 recetas)
├── pages/
│   ├── RecetasListPage.jsx
│   └── RecetaDetallePage.jsx
├── App.jsx
└── main.jsx
```

---

## 💾 Estructura del JSON

```json
{
  "id": 1,
  "titulo": "Pasta Carbonara",
  "descripcion": "Receta clásica italiana...",
  "imagen": "https://...",
  "tiempoPreparacion": "30 minutos",
  "dificultad": "Media",
  "porciones": 4,
  "ingredientes": [
    { "cantidad": "400", "unidad": "g", "nombre": "Spaghetti" }
  ],
  "pasos": [
    "Paso 1...",
    "Paso 2..."
  ],
  "categoria": "Platos Principales"
}
```

**⚠️ Importante:** El JSON debe tener **mínimo 6 recetas completas**

---

## 🛠️ Requisitos Técnicos

### React Router DOM
```jsx
<Route path="/" element={<RecetasListPage />} />
<Route path="/recetas" element={<RecetasListPage />} />
<Route path="/recetas/:id" element={<RecetaDetallePage />} />
```

### Context API
```jsx
export const RecetasProvider = ({ children }) => {
  const [recetas, setRecetas] = useState([]);
  // Cargar desde JSON
  // ...
  return (
    <RecetasContext.Provider value={{ recetas, getRecetaById }}>
      {children}
    </RecetasContext.Provider>
  );
};
```

### Material-UI (Componentes requeridos)
- `Container`, `Grid`, `Stack`
- `Card`, `CardMedia`, `CardContent`, `CardActions`
- `Typography`, `Button`, `Chip`
- `List`, `ListItem`, `Divider`
- Iconos: `AccessTime`, `Restaurant`, `People`

---

## 📊 Evaluación (100 puntos)

| Aspecto | Puntos |
|---------|--------|
| **Funcionalidad** | 40 pts |
| - Listado funcional | 10 |
| - Navegación | 10 |
| - Detalle completo | 10 |
| - Context API | 10 |
| **Diseño y UX** | 30 pts |
| - Responsive design | 10 |
| - Material-UI | 10 |
| - Interfaz visual | 10 |
| **Código y Organización** | 20 pts |
| - Estructura correcta | 5 |
| - Componentes bien organizados | 5 |
| - Calidad del código | 5 |
| - JSON completo | 5 |
| **Extras** | 10 pts |
| - README.md | 3 |
| - Manejo de estados | 2 |
| - Manejo de errores | 2 |
| - Animaciones/extras | 3 |

---

## 📅 Cronograma Sugerido

| Semana | Tareas |
|--------|--------|
| **1** | Setup del proyecto + Context + JSON con 6 recetas |
| **2** | Página de listado completa con diseño responsive |
| **3** | Página de detalle completa con toda la información |
| **4** | Testing + refinamiento + documentación + entrega |

---

## 📦 Entrega

### Opciones:
1. **GitHub/GitLab** (recomendado): Repositorio público con README.md
2. **ZIP**: `TP_Recetas_ApellidoNombre.zip` (sin node_modules)

### README.md debe incluir:
- Descripción del proyecto
- Tecnologías utilizadas
- Instrucciones de instalación (`npm install`)
- Instrucciones de ejecución (`npm run dev`)
- Screenshots (opcional pero recomendado)

### ✅ Checklist Pre-Entrega:
- [ ] `npm run dev` funciona sin errores
- [ ] Todas las rutas funcionan
- [ ] JSON tiene 6+ recetas completas
- [ ] Navegación entre páginas funciona
- [ ] Responsive en mobile, tablet y desktop
- [ ] README.md completo
- [ ] Sin archivos innecesarios (node_modules, .env)

---

## 🌟 Funcionalidades Extra (Opcional)

**+5 puntos:**
- Página de inicio con descripción
- Footer con información
- Página 404 personalizada

**+10 puntos:**
- Buscador de recetas
- Filtros (categoría, dificultad)
- Favoritos con localStorage
- Botón "Compartir"

**+15 puntos:**
- Modal para ver recetas
- Sistema de calificación
- Dark mode
- Animaciones avanzadas

---

## 📚 Recursos de Ayuda

### Documentación Oficial
- [React](https://react.dev/)
- [React Router DOM](https://reactrouter.com/)
- [Material-UI](https://mui.com/)

### Guías Incluidas en el Proyecto
- `GUIA-MATERIAL-UI.md`: Guía completa de Material-UI
- `GUIA-REACT-ROUTER-DOM.md`: Guía de React Router DOM
- `EJEMPLO-recetas.json`: Ejemplo de JSON (8 recetas de referencia)

### Imágenes Gratuitas
- [Unsplash](https://unsplash.com/s/photos/food)
- [Pexels](https://www.pexels.com/search/food/)

---

## 💡 Consejos Importantes

1. **Lee todo el enunciado** antes de empezar a programar
2. **Empieza por lo básico**: primero funcionalidad, luego diseño
3. **Testea constantemente**: verifica cada componente que crees
4. **Usa las guías**: tienes documentación completa de Material-UI y React Router
5. **Consulta temprano**: no esperes al último día para preguntar dudas
6. **Responsive desde el inicio**: prueba en diferentes tamaños mientras desarrollas

---

## ❓ Preguntas Frecuentes

**P: ¿Puedo usar CSS personalizado además de Material-UI?**  
R: Sí, pero la mayor parte del diseño debe ser con Material-UI.

**P: ¿Qué hago si una receta no existe?**  
R: Muestra un mensaje amigable y un botón para volver al listado.

**P: ¿Puedo agregar más campos al JSON?**  
R: Sí, pero no elimines los campos requeridos.

**P: ¿Necesito implementar un backend?**  
R: No, solo frontend con datos desde JSON local.

**P: ¿Puedo trabajar en grupo?**  
R: No, el trabajo es **individual**.

---

## 📧 Consultas

**Horario de consultas:** [Completar]  
**Email:** [Completar]  
**Foro:** [Completar si aplica]

**⏰ Las consultas deben realizarse con al menos 48 horas antes de la entrega**

---

## 🎯 Resultado Esperado

Tu aplicación final debería:
- ✅ Verse profesional y moderna
- ✅ Funcionar perfectamente en mobile, tablet y desktop
- ✅ Tener código limpio y bien organizado
- ✅ Cumplir con todos los requisitos técnicos
- ✅ Demostrar comprensión de React, Router y Material-UI

---

## 📖 Documento Completo

Para ver el enunciado completo con todos los detalles, ejemplos de código y especificaciones técnicas, consulta:

📄 **ENUNCIADO-TP-RECETAS.md**

---

**¡Mucho éxito con tu proyecto!** 🚀

Si sigues el cronograma sugerido y consultas dudas a tiempo, vas a lograr un excelente resultado.

---

**Fechas importantes:**
- 📅 Publicación: [Completar]
- 📅 Entrega: [Completar]
- 📅 Peso en la nota: [Completar]

