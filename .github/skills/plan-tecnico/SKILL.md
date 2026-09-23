---
name: plan-tecnico
description: 'Genera o actualiza el plan técnico de una spec SDD del proyecto, adaptado a la aplicación React y a la estructura real del repositorio.'
argument-hint: 'Indica la ruta de la spec o la funcionalidad para la que quieres preparar el plan técnico'
---

# Plan Técnico

## Cuándo usar esta skill

- Cuando una spec ya ha sido revisada y está lista para implementación.
- Cuando quieres convertir una historia de usuario en un plan ejecutable para la app React.
- Cuando necesitas documentar el alcance, componentes afectados y pruebas mínimas antes de programar.

## Fuentes canónicas

- `README.md`
- `.github/copilot_instructions.md`
- `sdd/specs/` para revisar el formato y el estilo de los planes existentes.
- La spec objetivo en su carpeta correspondiente.

## Procedimiento

1. Identificar la spec objetivo y su archivo principal.
2. Leer la funcionalidad, el alcance, las reglas y los casos de error definidos en la spec.
3. Determinar qué parte de la app React está implicada: componente, pantalla, flujo de usuario o estado.
4. Describir el alcance exacto y los elementos que se van a tocar.
5. Definir la estrategia de implementación en términos de UI, validación, mensajes y comportamiento visible.
6. Especificar los tests mínimos necesarios para cubrir el happy path y los casos de rechazo.
7. Guardar el resultado en `plan-tecnico.md` dentro de la misma carpeta de la spec.
8. Si ya existe el archivo, actualizarlo en lugar de duplicarlo.

## Estructura recomendada

```md
## Alcance

- ...

## Superficie objetivo

- Componente principal: ...
- Componentes impactados: ...
- Flujo de usuario: ...

## UI y estado

- ...

## Validación y mensajes

- ...

## Tests

- ...

## Riesgos o bloqueos

- ...

## Orden recomendado

1. ...
2. ...
3. ...
```

## Criterios de calidad

- El plan debe ser verificable y ejecutable.
- Debe ser específico para la app React del proyecto.
- Debe evitar suposiciones de backend o Java si no forman parte del alcance.
- Debe dejar claro qué probar antes de cerrar la tarea.

## Resultado esperado

- Archivo `plan-tecnico.md` creado o actualizado en la carpeta de la spec.
- Resumen claro del alcance, los componentes implicados y el orden de implementación.
- Bloqueos o riesgos explícitos cuando haya información incompleta.

## Convenciones del proyecto

- El plan debe estar orientado a la experiencia del usuario y al comportamiento de la interfaz.
- Se priorizan cambios mínimos, consistentes con la estructura actual del proyecto React.
- Si una regla no está definida en la spec, no debe asumirse en el plan.