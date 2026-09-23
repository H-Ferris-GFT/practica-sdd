# SPEC-001 — Buscador de películas en IMDB

> Estado: DRAFT
> Owner: Formacion SDD
> Ticket origen: Prueba inicial de flujo SDD

## Que hace

Esta funcionalidad define una primera versión de un buscador de películas en la API de iMDB

## Fuera de alcance

- Modificacion de peliculas ya existentes.
- Busquedas avanzadas, filtros o paginacion.
- Autenticacion y autorizacion.

## Quien lo usa

| Actor | Rol |
|---|---|
| Principal | Cliente consumidor del buscador de películas en la API de IMDB |

**Precondiciones**:

- El servicio REST de peliculas debe estar disponible para recibir peticiones: si no se cumple → la operacion no puede ejecutarse y se devuelve error de disponibilidad.
- Debe haber al menos tres letras en el campo de búsqueda

## Flujo normal / happy path

1. El cliente invoca el endpoint de búsqueda de películas con el nombre de la película a buscar.
2. El sistema valida que la peticion cumple las reglas minimas de entrada.
3. El sistema busca la película en el catalogo de peliculas.
4. El cliente invoca el endpoint de búsqueda de películas.
5. El sistema devuelve la lista de películas registrados en ese momento.
