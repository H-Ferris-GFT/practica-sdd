# SPEC-002 — Buscador con mínimo de tres letras

> Estado: DRAFT
> Owner: Formacion SDD
> Ticket origen: Requisito funcional del buscador: validacion de longitud minima antes de ejecutar una busqueda

## Que hace

Esta funcionalidad garantiza que el buscador no ejecute ninguna consulta cuando el texto introducido tiene menos de tres letras.
La validacion se realiza antes de lanzar la busqueda para evitar solicitudes innecesarias y ofrecer una respuesta clara al usuario.
La funcionalidad afecta a la experiencia de busqueda en la interfaz y a la logica de control del evento de busqueda.

## Fuera de alcance

- Busqueda avanzada con filtros por categoria, fecha o autor.
- Autocompletado o sugerencias en tiempo real.
- Validacion de contenido semantico o relevancia de resultados.
- Cambios en la API de backend distintos de la validacion previa de la entrada del usuario.

## Quien lo usa

| Actor | Rol |
|---|---|
| Usuario del buscador | Introduce una cadena de texto para buscar informacion |
| Sistema de busqueda | Evalua la entrada y decide si permite o bloquea la consulta |

**Precondiciones**:

- La interfaz de busqueda debe estar disponible y el usuario debe poder introducir texto: si no se cumple → la accion de busqueda no puede iniciarse.
- La entrada del buscador debe estar definida como una cadena de texto: si no se cumple → la validacion no puede evaluarse y la busqueda debe rechazarse.
- La longitud de busqueda debe evaluarse sobre el valor introducido tras normalizar espacios extremos: si no se cumple → la regla de negocio no puede validarse de forma consistente.

## Flujo normal / happy path

1. El usuario accede al buscador y escribe un criterio de busqueda.
2. El sistema compara la longitud del texto introducido con el umbral minimo establecido.
3. Si la cadena tiene al menos tres letras, el sistema permite ejecutar la busqueda.
4. El sistema envia la consulta con el texto validado.
5. El sistema presenta los resultados correspondientes al criterio solicitado.

## Reglas de negocio

| Regla | Consecuencia si no se cumple |
|---|---|
| La busqueda solo debe ejecutarse cuando la cadena introducida tiene 3 o mas letras. | El sistema bloquea la busqueda y no envia la consulta. |
| La validacion se debe realizar antes de lanzar la peticion de busqueda. | Se puede producir una busqueda innecesaria o una consulta con entrada invalida. |
| El texto se debe evaluar tras eliminar espacios en los extremos. | Una entrada con espacios puede quedar mal validada y se puede permitir o bloquear la busqueda de forma inconsistente. |
| Si la entrada tiene menos de 3 letras, el sistema debe informar al usuario que la busqueda requiere al menos 3 letras. | El usuario no recibe feedback claro y puede interpretar que la busqueda ha fallado sin motivo. |

## Estados

| Estado | Que significa |
|---|---|
| Esperando texto | El usuario aun no ha introducido un criterio valido para buscar. |
| Entrada valida | La cadena tiene 3 o mas letras y puede ejecutarse la busqueda. |
| Entrada invalida | La cadena tiene menos de 3 letras y se bloquea la busqueda. |

Transiciones principales:

- `Esperando texto` → `Entrada invalida` cuando el usuario introduce menos de 3 letras.
- `Esperando texto` → `Entrada valida` cuando el usuario introduce 3 o mas letras.
- `Entrada invalida` → `Esperando texto` cuando el usuario modifica la busqueda y la entrada deja de ser invalida.
- `Entrada valida` → `Esperando texto` cuando la busqueda finaliza o el usuario limpia el campo.

## Edge cases

- **Entrada vacia o solo espacios**: el sistema no ejecuta la busqueda y muestra un aviso de validacion.
- **Entrada con 2 letras**: el sistema rechaza la busqueda y no envia la consulta al backend.
- **Entrada con 3 letras exactas**: la busqueda se permite y se ejecuta normalmente.

## Como se prueba (BDD)

```gherkin
Scenario: busqueda permitida con texto valido
  Given que el usuario ha introducido la cadena "lib"
  When el sistema valida la entrada antes de buscar
  Then el sistema permite ejecutar la busqueda y devuelve resultados relevantes

Scenario: rechazo por longitud insuficiente
  Given que el usuario ha introducido la cadena "li"
  When el sistema valida la entrada antes de buscar
  Then el sistema bloquea la busqueda y no envia la consulta

Scenario: entrada vacia no dispara busqueda
  Given que el usuario ha dejado el campo de busqueda vacio o con solo espacios
  When el sistema valida la entrada antes de buscar
  Then el sistema no ejecuta la busqueda y muestra un mensaje de validacion
```

## Dudas abiertas

- [ ] Si el criterio de 3 letras debe evaluarse sobre caracteres visibles o sobre letras solamente.
- [ ] Si el sistema debe mostrar un mensaje de error textual fijo o un mensaje localizado por idioma.
- [ ] Si la validacion debe aplicarse tanto al click del boton como al evento de teclado o solo a la accion final de busqueda.

---

## Notas para implementacion

> El plan tecnico de esta spec debe guardarse en el archivo hermano `plan-tecnico.md` dentro de la misma carpeta de la spec.
> Esta seccion puede mantenerse vacia o eliminarse si el equipo no la necesita.
