---
name: revisar-spec
description: 'Revisa una spec SDD del proyecto para detectar ambigüedades, huecos, reglas incompletas y problemas antes de pasar a la implementación o al plan técnico.'
argument-hint: 'Indica la ruta de la spec o describe la funcionalidad que quieres revisar'
---

# Revisar Spec

## Cuándo usar esta skill

- Cuando una spec ya existe y necesita una validación funcional.
- Antes de convertir una historia en plan técnico.
- Antes de implementar una funcionalidad nueva en la app React.
- Cuando se quiere confirmar que la spec es clara, verificable y accionable.

## Fuentes canónicas

- `README.md`
- `.github/copilot_instructions.md`
- `sdd/specs/` para comparar estilo y estructura.
- `.github/skills/nueva-spec/assets/SPEC_TEMPLATE.md`

## Procedimiento

1. Localizar la spec objetivo y abrir el archivo principal.
2. Revisar que incluya: objetivo, alcance, actores, precondiciones, flujo normal, reglas de negocio y casos de error.
3. Comprobar si hay ambigüedades, contradicciones, estados no definidos o requisitos implícitos que no estén escritos.
4. Identificar si el comportamiento es verificable desde la interfaz del usuario.
5. Decidir si la spec está lista para pasar a plan técnico o si debe volver a la fase de especificación.
6. Dejar una respuesta con veredicto, hallazgos y siguiente paso recomendado.

## Criterios de calidad

- La spec debe ser clara y ejecutable.
- No debe depender de suposiciones ocultas.
- Debe definirse qué ocurre en casos de éxito y en casos de error.
- Debe dejarse explícito qué queda dentro y fuera del alcance.
- Si faltan detalles, deben documentarse como dudas abiertas.

## Resultado esperado

- Veredicto: `READY` o `NOT READY`.
- Lista de hallazgos por prioridad.
- Preguntas abiertas si faltan datos.
- Recomendación de qué hacer a continuación.

## Convenciones del proyecto

- El foco debe estar en la experiencia del usuario y la app React.
- No se deben asumir requisitos de backend o Java si la spec no los establece.
- La revisión debe ser concreta, objetiva y basada en lo que aparece en la propia spec.
