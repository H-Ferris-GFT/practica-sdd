---
name: nueva-spec
description: 'Crea o completa una spec SDD para la app React del proyecto, siguiendo el flujo de trabajo de la repo y evitando duplicar requisitos ya definidos.'
argument-hint: 'Describe la funcionalidad, el objetivo del usuario, el alcance y cualquier regla funcional que deba quedar documentada en la spec'
---

# Nueva Spec

## Cuándo usar esta skill

- Cuando una funcionalidad nueva aún no tiene spec en `sdd/specs/`.
- Cuando un cambio funcional necesita documentarse antes de implementarse.
- Cuando una petición del usuario requiere convertir un requisito en una historia verificable.
- Cuando una historia ya existe y necesita completarse o revisarse antes de pasar a implementación.

## Fuentes canónicas

- `README.md`
- `.github/copilot_instructions.md`
- `sdd/specs/` para revisar el estilo y los IDs ya usados.
- `.github/skills/nueva-spec/assets/SPEC_TEMPLATE.md` para la base de formato.

## Procedimiento

1. Revisar si ya existe una spec equivalente en `sdd/specs/` antes de crear una nueva.
2. Elegir el siguiente identificador disponible con formato `SPEC-<NNN>-<slug>`.
3. Generar el slug en kebab-case a partir del verbo y del objeto funcional.
4. Crear la carpeta `sdd/specs/SPEC-<NNN>-<slug>/` si no existe.
5. Crear el archivo principal `sdd/specs/SPEC-<NNN>-<slug>/SPEC-<NNN>-<slug>.md`.
6. Usar una estructura clara con: descripción, alcance, actores, precondiciones, flujo principal, reglas de negocio, edge cases y Gherkin mínimo.
7. Documentar cualquier ambigüedad abierta en `## Dudas abiertas`.
8. Mantener la especificación centrada en la funcionalidad de la app React y en la experiencia del usuario.
9. Si la historia pertenece a una iteración posterior (por ejemplo, validación mínima de 3 letras), dejar la regla claramente fuera del alcance de la spec actual y señalar la siguiente spec que la cubre.
10. Si la petición ya tiene una spec cercana, preferir actualizarla antes que duplicarla.

## Criterios de calidad

- No dejes huecos silenciosos.
- No inventes reglas de negocio ni resultados no definidos.
- Incluye al menos un happy path y al menos un caso de rechazo o error.
- Define claramente qué queda dentro y fuera del alcance.
- Usa lenguaje funcional, verificable y orientado a la UI del proyecto.

## Resultado esperado

- Carpeta creada o reutilizada en `sdd/specs/SPEC-<NNN>-<slug>/`.
- Archivo principal con el nombre correcto y estructura consistente.
- Reglas claras de negocio, precondiciones y casos de prueba mínimos.
- Resumen final con la ruta creada y las dudas o pendientes que queden abiertos.

## Convenciones del proyecto

- Este repositorio trabaja en React y todas las specs deben orientarse a la experiencia del usuario final de la aplicación.
- El flujo recomendado sigue la secuencia de la repo: spec → revisión → plan técnico → implementación → revisión.
- Si la funcionalidad afecta a la UI, documenta el comportamiento visible, las validaciones y los mensajes al usuario, no solo la lógica interna.
- No se asumen requisitos de backend ni de Java en esta repo; la especificación debe describir lo que hace la app React.
