# SPEC-001 — Buscador de películas

> Estado: READY FOR TECH PLAN
> Owner: Formación SDD
> Ticket origen: Prueba inicial de flujo SDD

## Qué hace

La funcionalidad permite buscar películas dentro del catálogo disponible en la aplicación, filtrando por texto introducido por el usuario.

El usuario escribe un término de búsqueda y el sistema muestra únicamente las películas cuyo título contiene ese texto, ignorando mayúsculas y minúsculas.

## Fuera de alcance

- Modificar películas ya existentes.
- Búsquedas avanzadas con filtros combinados.
- Paginación ni ordenamiento complejo.
- Autenticación ni autorización.
- Integración con una API externa.
- Validación de longitud mínima del texto de búsqueda (esta regla pertenece a SPEC-002).

## Quién lo usa

| Actor | Rol |
|---|---|
| Usuario | Consulta el catálogo de películas desde la interfaz de la aplicación |

## Precondiciones

- La pantalla del buscador está visible y cargada.
- El catálogo de películas está disponible en la aplicación.
- El campo de búsqueda existe en la interfaz.

## Reglas de negocio

1. La búsqueda es insensible a mayúsculas y minúsculas.
2. La comparación se realiza sobre el título de la película.
3. Si no existen coincidencias, la aplicación muestra un estado vacío.
4. Si el catálogo no está disponible, la aplicación informa del problema al usuario.

## Flujo normal / happy path

1. El usuario accede a la pantalla del buscador.
2. El usuario escribe un texto de búsqueda.
3. El sistema valida que la entrada exista y que el catálogo esté disponible.
4. El sistema compara el texto con los títulos del catálogo disponible.
5. El sistema filtra las películas cuyo título contenga el texto introducido.
6. El sistema muestra la lista de resultados coincidentes.

## Casos de error y validación

### Caso 1: sin resultados
- Entrada: `zzzz`
- Resultado esperado: se muestra un estado vacío indicando que no se encontraron películas para ese criterio.

### Caso 2: catálogo no disponible
- Situación: la colección de películas no está disponible en la aplicación.
- Resultado esperado: se muestra un mensaje de error informando que no se puede consultar el catálogo en ese momento.

## Criterios de aceptación

- Si el usuario busca `tita`, la aplicación muestra películas como `Titanic` si ese título está en el catálogo.
- Si el usuario busca `mAriA`, también se detectan coincidencias con `Maria` o `María` si existen en el catálogo.
- Si no hay coincidencias, la interfaz muestra un mensaje explícito de “sin resultados”.
- La funcionalidad no incluye filtros avanzados ni paginación.
- La validación de longitud mínima del texto de búsqueda queda fuera de esta historia y corresponde a SPEC-002.

## Ejemplo de escenario Gherkin

```gherkin
Escenario: búsqueda válida de película
  Dado que el usuario está en la pantalla del buscador
  Y el catálogo contiene películas con títulos como "Titanic" y "La vida es bella"
  Cuando escribe "tita" en el campo de búsqueda
  Entonces la aplicación muestra únicamente "Titanic"

Escenario: sin resultados
  Dado que el usuario está en la pantalla del buscador
  Cuando escribe "zzzz"
  Entonces la aplicación muestra un estado vacío
  Y un mensaje indicando que no se encontraron películas
```
