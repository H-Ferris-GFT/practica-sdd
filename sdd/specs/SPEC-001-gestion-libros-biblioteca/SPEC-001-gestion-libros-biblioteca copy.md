# SPEC-001 — Gestion de libros de biblioteca

> Estado: DRAFT
> Owner: Formacion SDD
> Ticket origen: Prueba inicial de flujo SDD

## Que hace

Esta funcionalidad define una primera version de un servicio REST de biblioteca.
Permite dar de alta libros en el sistema y consultar el conjunto de libros registrados.
El objetivo es disponer de una base minima sobre la que recorrer el flujo SDD completo: spec, auditoria, plan tecnico e implementacion.
En esta iteracion solo entra el alta de libros y la consulta de libros existentes.

## Fuera de alcance

- Modificacion de libros ya existentes.
- Eliminacion de libros.
- Prestamo, devolucion o reserva de libros.
- Busquedas avanzadas, filtros o paginacion.
- Autenticacion y autorizacion.

## Quien lo usa

| Actor | Rol |
|---|---|
| Principal | Cliente consumidor del servicio REST de biblioteca |

**Precondiciones**:

- El servicio REST de biblioteca debe estar disponible para recibir peticiones: si no se cumple → la operacion no puede ejecutarse y se devuelve error de disponibilidad.
- La peticion de alta debe incluir la informacion minima obligatoria del libro: si no se cumple → la operacion se rechaza y el libro no se registra.

## Flujo normal / happy path

1. El cliente invoca el endpoint de alta de libros con la informacion del libro.
2. El sistema valida que la peticion cumple las reglas minimas de entrada.
3. El sistema registra el libro en el catalogo de biblioteca.
4. El cliente invoca el endpoint de consulta de libros.
5. El sistema devuelve la lista de libros registrados en ese momento.

## Reglas de negocio

| Regla | Consecuencia si no se cumple |
|---|---|
| La primera version del servicio solo permite alta de libros y consulta del catalogo registrado. | Cualquier operacion fuera de ese alcance queda fuera de la version y no debe implementarse en esta spec. |
| Un libro solo puede darse de alta si la peticion incluye `titulo`, `autor` e `isbn`. | La solicitud se rechaza y el libro no se persiste. |
| El `isbn` identifica de forma univoca un libro y lo aporta el cliente en la peticion de alta. | Si no se informa `isbn`, la solicitud se rechaza y el libro no se persiste. |
| No se permite registrar dos veces un libro con el mismo `isbn`. | La solicitud se rechaza y el sistema no crea un segundo registro. |
| La consulta de libros debe devolver el catalogo registrado en el sistema en el momento de la peticion. | Si no puede recuperarse el catalogo, la consulta falla y el sistema informa error. |
| El alta satisfactoria debe devolver el libro registrado. | Si no puede confirmarse el alta, la operacion se considera fallida y el libro no debe darse por registrado. |

## Edge cases

- **Consulta sin libros cargados**: el sistema devuelve una coleccion vacia.
- **Alta con datos obligatorios incompletos**: el sistema rechaza la solicitud y no registra el libro.
- **Alta duplicada del mismo libro**: el sistema rechaza la solicitud y mantiene el registro previo sin crear uno nuevo.
- **Alta sin `isbn`**: el sistema rechaza la solicitud porque no puede identificar univocamente el libro.

## Como se prueba (BDD)

```gherkin
Scenario: alta y consulta de un libro registrado
  Given que existe un servicio de biblioteca operativo
  And que el cliente dispone de una peticion valida de alta de libro
  When el cliente registra un libro y despues consulta el catalogo
  Then el sistema devuelve el libro recien registrado en la consulta

Scenario: rechazo de alta por datos obligatorios incompletos
  Given que el cliente envia una peticion de alta sin la informacion minima obligatoria
  When el sistema valida la peticion
  Then el sistema rechaza el alta y el libro no queda registrado

Scenario: rechazo de alta duplicada por isbn
  Given que ya existe un libro registrado con un `isbn`
  When el cliente intenta registrar otro libro con ese mismo `isbn`
  Then el sistema rechaza el alta duplicada y mantiene un unico registro para ese `isbn`
```

## Dudas abiertas

- [ ] Que informacion de error concreta debe recibir el cliente en los rechazos por validacion y por duplicidad.
- [ ] Que informacion minima debe devolver el alta satisfactoria ademas de confirmar el libro registrado.
- [ ] Si la consulta de libros debe mantener algun orden concreto o basta con devolver el catalogo registrado.

---

## Notas para implementacion

> El plan tecnico de esta spec debe guardarse en el archivo hermano `plan-tecnico.md` dentro de la misma carpeta de la spec.
> Esta spec esta intencionadamente acotada para servir como primera prueba del flujo SDD completo.