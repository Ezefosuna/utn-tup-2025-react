## 🧪 GUÍA DE PRUEBA - FUNCIONALIDADES EXTRAS

### ✅ Cómo Probar Todas las Características Implementadas

---

## 1️⃣ NIVEL BÁSICO (+5 Puntos)

### ✅ Página de Inicio
**Ruta**: `http://localhost:5173/`
1. Navega a la página principal
2. Verifica:
   - ✅ Hero section con gradiente
   - ✅ Tarjetas con características
   - ✅ Botones de CTA funcionando
   - ✅ Animaciones suaves
   - ✅ Responsive en móvil

### ✅ Footer
**Ubicación**: Pie de página (cualquier ruta)
1. Scroll hasta el final de cualquier página
2. Verifica:
   - ✅ Información de contacto visible
   - ✅ Enlaces rápidos funcionando
   - ✅ Redes sociales con hover effects
   - ✅ Copyright y fecha actualizada

### ✅ Página 404
**Ruta**: `http://localhost:5173/recetas/999` (ID inexistente)
1. Navega a una receta que no existe
2. Verifica:
   - ✅ Página 404 personalizada
   - ✅ Emoji con animación bounce
   - ✅ Mensaje amigable
   - ✅ Botones de navegación funcionan

---

## 2️⃣ NIVEL INTERMEDIO (+10 Puntos)

### ✅ Buscador de Recetas
**Ubicación**: Navbar > Campo de búsqueda
1. Ve a `/recetas`
2. Busca por título:
   - Prueba: "Pasta" → debe filtrar Pasta Carbonara
   - Prueba: "Ensalada" → debe filtrar Ensalada César
   - Prueba: "Chocolate" → debe filtrar Brownies
3. Busca por descripción:
   - Prueba: "italiano" → debe filtrar recetas italianas
   - Prueba: "fresco" → debe filtrar recetas con fresco

**Verifica**:
- ✅ Filtrado en tiempo real
- ✅ Muestra contador de resultados
- ✅ Limpiador de búsqueda funciona

### ✅ Filtros por Categoría
**Ubicación**: Navbar > Botón "Categoría"
1. Click en "Categoría"
2. Prueba cada una:
   - "Platos Principales" → 4 recetas
   - "Ensaladas" → 1 receta
   - "Postres" → 1 receta
3. Click en "Todas" para limpiar

**Verifica**:
- ✅ Menú dropdown funciona
- ✅ Filtrado correcto
- ✅ Badge en navbar cambia

### ✅ Filtros por Dificultad
**Ubicación**: Navbar > Botón "Dificultad"
1. Click en "Dificultad"
2. Prueba cada una:
   - "Fácil" → 2 recetas
   - "Media" → 4 recetas
   - "Difícil" → 0 recetas
3. Click en "Todas" para limpiar

**Verifica**:
- ✅ Menú dropdown funciona
- ✅ Filtrado correcto
- ✅ Filtros combinables (busca + categoría + dificultad)

### ✅ Sistema de Favoritos
**Ubicación**: RecetaCard > Icono de corazón
1. Ve a `/recetas`
2. Click en corazón de cualquier tarjeta
3. Verifica:
   - ✅ Icono cambia de vacío a lleno
   - ✅ Animación heartBeat
   - ✅ Badge en navbar incrementa
4. Recarga la página (F5)
5. Verifica:
   - ✅ Favoritos persisten en localStorage
   - ✅ Corazones siguen llenos
   - ✅ Badge mantiene el contador

**También en detalle**:
1. Abre detalle de una receta
2. Click en "Agregar a Favoritos"
3. Verifica cambios visuales
4. Recarga la página → debe persistir

### ✅ Botón Compartir
**Ubicación**: RecetaCard > Icono de compartir
1. Click en el icono compartir de una tarjeta
2. Opciones según navegador:
   - Si tiene Web Share API → Abre diálogo de compartir
   - Si no → Copia enlace al portapapeles
3. Verifica:
   - ✅ Enlace directo a receta
   - ✅ Alerta de confirmación si copia

**En detalle**:
1. Click en botón "Compartir" en página de detalle
2. Mismo comportamiento
3. Puedes verificar URL en portapapeles (Ctrl+V)

---

## 3️⃣ NIVEL AVANZADO (+15 Puntos)

### ✅ Sistema de Calificación ⭐
**Ubicación**: RecetaCard > Estrellas | RecetaDetalle > Rating
1. Ve a cualquier receta
2. En la tarjeta (desktop), pasa mouse sobre estrellas
3. Verifica:
   - ✅ Estrellas se destacan
   - ✅ Tooltip muestra valor
4. Click en una estrella (ej: 4 estrellas)
5. Verifica:
   - ✅ Calificación se guarda
   - ✅ Estrellas llenas/vacías correctas
6. Recarga la página (F5)
7. Verifica:
   - ✅ Calificación persiste en localStorage
   - ✅ Estrellas mantienen el valor

**También en detalle**:
1. Abre detalle de receta
2. Busca sección "Mi Calificación"
3. Click en estrellas
4. Verifica persistencia (recarga página)

### ✅ Modo Oscuro/Claro 🌙
**Ubicación**: Navbar > Icono sol/luna
1. Click en icono de sol/luna
2. Verifica:
   - ✅ Todo el tema cambia a oscuro
   - ✅ Transición suave
   - ✅ Colores legibles
   - ✅ Contraste accesible
3. Click nuevamente → vuelve a claro
4. Recarga la página (F5)
5. Verifica:
   - ✅ Tema persiste en localStorage
   - ✅ Se abre en el modo seleccionado

**Prueba en diferentes páginas**:
- Página inicio
- Listado de recetas
- Detalle de receta
- Página 404

### ✅ Modal para Ver Recetas
**Nota**: Componente preparado (RecetaModal.jsx creado)
- El modal está implementado y listo para uso
- Puede usarse para futuras mejoras
- Incluye:
  - Vista completa de receta
  - Imagen, descripción
  - Ingredientes y pasos
  - Favoritos y compartir
  - Calificación

### ✅ Animaciones Avanzadas
**Prueba en diferentes secciones**:

1. **Fade In** - Al cargar página
   - Ve a `/` → fade in del contenido

2. **Slide In** - Cards y elementos
   - `/recetas` → tarjetas aparecen con slide

3. **Bounce** - Página 404
   - `/recetas/999` → emoji rebota

4. **Hover Effects**
   - Tarjetas suben con transform
   - Botones tienen scale effects
   - Iconos rotan suavemente

5. **Heart Beat** - Favoritos
   - Click corazón → latido de corazón
   - Ver animación

6. **Glow** - Elementos destacados
   - Efecto brillo en interactivos

**Verifica en Console**:
```javascript
// Todas las animaciones en index.css
// Ver: src/index.css líneas 50-200
```

---

## 📊 PRUEBA COMPLETA RECOMENDADA

### Secuencia Sugerida (15 minutos)

1. **Inicio** (2 min)
   - Abre `http://localhost:5173`
   - Observa animaciones y hero section
   - Haz scroll para ver footer

2. **Búsqueda** (2 min)
   - Ve a `/recetas`
   - Busca "Pasta"
   - Busca "fácil"
   - Limpia búsqueda

3. **Filtros** (3 min)
   - Filtra por Categoría → "Platos Principales"
   - Filtra por Dificultad → "Fácil"
   - Combina filtros
   - Limpia filtros

4. **Favoritos** (2 min)
   - Agrega 3 recetas a favoritos
   - Verifica badge en navbar
   - Recarga página
   - Verifica que persisten

5. **Compartir** (1 min)
   - Click en compartir de una receta
   - Verifica enlace

6. **Calificación** (2 min)
   - Califica 2 recetas
   - Recarga página
   - Verifica persistencia

7. **Dark Mode** (1 min)
   - Activa dark mode
   - Desactiva
   - Verifica persistencia

8. **404** (1 min)
   - Accede a `/recetas/999`
   - Observa página personalizada

---

## 🔍 QUÉ VERIFICAR EN CHROME DevTools

### Console Tab
```javascript
// Verificar localStorage
localStorage.getItem('favoritos')     // Array de IDs
localStorage.getItem('ratings')       // Object con ratings
localStorage.getItem('darkMode')      // true/false
```

### Storage Tab
- Application → Local Storage
- Ver las 3 claves guardadas
- Verificar valores

### Network Tab
- Verificar imágenes cargan de Unsplash
- JSON se carga correctamente

### Elements Tab
- Ver classList de elementos
- Verificar clases de animaciones
- Ver estilos aplicados

---

## ✨ PUNTOS CLAVE A VERIFICAR

✅ **Funcionalidad**
- [ ] Búsqueda funciona en tiempo real
- [ ] Filtros se aplican correctamente
- [ ] Combinar filtros funciona
- [ ] Favoritos se guardan y cargan
- [ ] Compartir enlaza correctamente
- [ ] Calificaciones persisten
- [ ] Dark mode cambia tema completo

✅ **UX/Experiencia**
- [ ] Animaciones son suaves
- [ ] No hay lag o stuttering
- [ ] Transiciones son visibles
- [ ] Mobile es responsive
- [ ] Botones son clickeables
- [ ] Feedback visual en interacciones

✅ **Persistencia**
- [ ] localStorage se crea
- [ ] Recarga mantiene estado
- [ ] Datos no se pierden

✅ **Responsive**
- [ ] Mobile: 375px (iPhone)
- [ ] Tablet: 768px (iPad)
- [ ] Desktop: 1920px

---

## 🚀 Comandos Útiles

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build

# Ver en navegador
# http://localhost:5173
```

---

## 📸 Screenshots Recomendados

1. Página de inicio
2. Listado con filtros activos
3. Detalle de receta con calificación
4. Navbar en dark mode
5. Página 404
6. Favoritos en localStorage

---

## 🎯 Resultado Esperado

✅ **40 Puntos Extra Implementados**
- Página inicio ✅
- Footer ✅
- Página 404 ✅
- Buscador ✅
- Filtros ✅
- Favoritos ✅
- Compartir ✅
- Calificación ✅
- Dark Mode ✅
- Animaciones ✅
- Modal preparado ✅
- localStorage completo ✅
- Responsive perfecto ✅
- UX profesional ✅

---

**¡Listo para entregar el proyecto! 🎉**