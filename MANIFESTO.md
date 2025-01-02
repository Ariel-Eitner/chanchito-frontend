# Manifiesto del Proyecto

Este documento establece las pautas y reglas generales para el desarrollo y mantenimiento de este proyecto. Su propósito es asegurar que el código sea legible, mantenible y coherente a lo largo del tiempo.

## 1. Organización de Imports

- Primero React: Todos los imports primero deben ser los internos (React, NextJS), luego las librerias y luego todos los del proyecto.
- Orden Alfabético: Todos los imports deben estar ordenados alfabéticamente.
- Imports desde index: Siempre que sea posible, importa desde un archivo index.ts para centralizar las dependencias de un módulo. Esto reduce el número de imports y simplifica la gestión de módulos.

## 2. Uso de Hooks

### 2.1. `useState`

- Nombres Descriptivos: Los nombres de los estados deben ser descriptivos y específicos. Ejemplos:
  - ❌ isLoading
  - ✅ isLoadingUser
  - ✅ isLoadingLogin
- Orden Alfabético: Los hooks `useState` deben estar ordenados alfabéticamente para facilitar su búsqueda y comprensión.

### 2.2. `useEffect`

- Posición en el Componente: Todos los hooks useEffect deben ejecutarse antes del retorno (return) del componente.
- Reglas de Dependencias: Asegúrate de incluir todas las dependencias necesarias en el array de dependencias. Si no hay dependencias, se debe especificar claramente con un comentario el motivo.

## 3. Estructura de Componentes

### 3.1. Componentes de Página (page.tsx)

- Número de Componentes: Un archivo de página `(page.tsx)` debe importar uno o, como máximo, dos componentes.
- Encapsulación de Lógica: El componente importado en la página debe encapsular toda la lógica necesaria para esa vista, manteniendo el archivo de la página limpio y enfocado.

### 3.2. Separación de Lógica y Renderizado

- Componentes de Lógica: La lógica del negocio o la gestión del estado deben estar separadas del componente de renderizado. Usa componentes contenedores para manejar la lógica y componentes presentacionales para manejar el renderizado.
- Componentes Presentacionales: Los componentes dedicados solo al renderizado deben recibir props y no manejar lógica interna o estado. Su propósito es simplemente mostrar la UI.

## 4. Nombrado de Variables y Funciones

- Nombres Descriptivos: Tanto las variables como las funciones deben tener nombres descriptivos que indiquen claramente su propósito.
- Convenciones de Nombres: Usa la convención de camelCase para nombres de variables y funciones, y PascalCase para componentes de React.
