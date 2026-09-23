# Instrucciones de Copilot para este workspace

## Principio base: SDD siempre

Este repositorio sigue un flujo de desarrollo guiado por specs. Todo cambio funcional debe empezar por una especificación antes de proponer o escribir implementación.

- Cada spec vive en su propia carpeta bajo `sdd/specs/`, con formato `sdd/specs/SPEC-XXX-slug/`.
- El archivo principal debe llamarse igual que la carpeta: `sdd/specs/SPEC-XXX-slug/SPEC-XXX-slug.md`.
- El plan técnico asociado debe guardarse en la misma carpeta como `plan-tecnico.md`.
- La base del formato es `.github/skills/nueva-spec/assets/SPEC_TEMPLATE.md`.
- Si falta información relevante, debe documentarse en una sección `Dudas abiertas`; no se deben asumir reglas de negocio ni comportamientos sin evidencia.
- Si llega una petición funcional sin spec, el primer paso es crear o completar la spec antes de implementar cualquier cambio.
- No inventes estados, edge cases, consecuencias ni criterios de prueba que no estén definidos explícitamente en la spec.

## Flujo de trabajo esperado

Respetar este orden como secuencia por defecto:

1. Crear o completar la spec.
2. Auditar la spec para detectar ambigüedades, huecos o contradicciones.
3. Convertir la spec en plan técnico.
4. Implementar la funcionalidad en la app React.
5. Revisar la implementación contra la spec.

Si la funcionalidad no está suficientemente definida, hay que volver a la spec antes de seguir implementando.

## Estructura del proyecto

- Aplicación principal: la raíz del repositorio, una aplicación React con `package.json` y `src/`.
- Specs funcionales: `sdd/specs/`.
- Documentación principal: [README.md](../README.md)

## Comandos relevantes

- `npm start`
- `npm test -- --watch=false`
- `npm run build`

## Reglas para trabajar en este repositorio

- Mantén el trabajo alineado con la spec y con la secuencia de SDD.
- Si la petición es ambigua, pide aclaraciones o deja la ambigüedad documentada antes de implementar.
- Haz cambios mínimos y enfocados; no introduzcas patrones distintos de los ya usados en el proyecto.
- Revisa primero la documentación relevante y enlázala en lugar de duplicarla.
- Antes de planificar o implementar, inspecciona la estructura real del workspace y usa los nombres, carpetas y límites que existan en verdad.
- Si la spec y el código entran en conflicto, la implementación debe reconciliarse contra la spec o la spec debe actualizarse explícitamente.

## Customizaciones disponibles

- Skill `/nueva-spec`: crea o completa la especificación funcional del cambio para la app React del proyecto.
- Agentes de SDD del repositorio deben seguir el mismo principio: documentar primero y luego implementar desde la spec, siempre dentro del alcance real de la aplicación React.