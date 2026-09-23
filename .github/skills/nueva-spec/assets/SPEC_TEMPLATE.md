# SPEC-NNN — <Nombre de la funcionalidad>

> Estado: DRAFT
> Owner: <persona>
> Ticket origen: <enlace>

## Que hace

<!-- TODO: 3-5 lineas en lenguaje funcional. Que permite hacer, a quien afecta, que resultado produce, que queda fuera. -->

## Fuera de alcance

<!-- TODO: que NO entra en esta primera version. Si no se sabe, dejarlo explicito. -->

## Quien lo usa

| Actor | Rol |
|---|---|
| Principal | <!-- TODO --> |
| Sistema externo | <!-- TODO o eliminar fila si no aplica --> |

**Precondiciones**:

<!-- TODO: que tiene que ser verdad antes de poder ejecutar esto. Para cada una, la consecuencia si no se cumple. -->

- ...: si no se cumple → ...
- ...: si no se cumple → ...

## Flujo normal / Happy path

<!-- TODO: el happy path en pasos numerados, sin ramas ni errores -->

1. ...
2. ...
3. ...

## Reglas de negocio

<!-- TODO: cada regla con su consecuencia. Sin consecuencia, no es implementable. -->

| Regla | Consecuencia si no se cumple |
|---|---|
| ... | ... |
| ... | ... |

## Estados

<!-- TODO: si la funcionalidad tiene maquina de estados. Si no, eliminar esta seccion. -->

| Estado | Que significa |
|---|---|
| ... | ... |

Transiciones principales:

- `ESTADO_A` → `ESTADO_B` cuando ocurre X, si se cumple Y
- ...

## Edge cases

<!-- TODO: 1-3 situaciones no obvias con el comportamiento esperado. Pensar en concurrencia, fallo de integraciones, datos raros. -->

- **Concurrencia**: ...
- **Sistema externo caido**: ...
- **Limites o datos raros**: ...

## Como se prueba (BDD)

```gherkin
Scenario: <happy path>
  Given <!-- TODO -->
  When <!-- TODO -->
  Then <!-- TODO -->

Scenario: <rechazo por regla>
  Given <!-- TODO -->
  When <!-- TODO -->
  Then <!-- TODO -->
```

## Dudas abiertas

- [ ] <!-- TODO -->
- [ ] <!-- TODO -->
- [ ] <!-- TODO -->

---

## Notas para implementacion

> El plan tecnico de esta spec debe guardarse en el archivo hermano `plan-tecnico.md` dentro de la misma carpeta de la spec.
> Esta seccion puede mantenerse vacia o eliminarse si el equipo no la necesita.