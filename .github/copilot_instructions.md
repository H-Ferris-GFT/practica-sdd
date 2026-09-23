# Instrucciones de Copilot para este workspace

## Regla principal: trabajamos con SDD

En este workspace, toda funcionalidad nueva o cambio funcional se trabaja primero como una spec. Siempre.

- Cada spec debe vivir en su propia carpeta dentro de `sdd/specs/`, con formato `sdd/specs/SPEC-XXX-slug/`.
- El archivo principal de la spec debe llamarse igual que su carpeta: `sdd/specs/SPEC-XXX-slug/SPEC-XXX-slug.md`.
- El plan tecnico de esa spec debe guardarse en la misma carpeta, en `plan-tecnico.md`.
- La base de cada spec es `.github/skills/new-spec/assets/SPEC_TEMPLATE.md`.
- Si falta informacion, se documenta en `Dudas abiertas`. No se dejan huecos en silencio.
- Si una peticion funcional llega sin spec, el primer paso es crearla o completar la existente antes de proponer implementacion.
- No inventes reglas de negocio, estados, consecuencias, edge cases ni criterios de prueba que no esten definidos. Si faltan, hay que pedirlos o dejarlos explicitamente abiertos en la spec.

## Flujo de trabajo esperado

El flujo de referencia esta en `README.md` y debe respetarse como secuencia por defecto:

1. Crear o completar la spec.
2. Auditar la spec para detectar ambiguedades y huecos.
3. Convertir la spec en plan tecnico.
4. Implementar backend.
5. Implementar frontend.
6. Revisar la implementacion contra la spec.

Si backend o frontend no estan suficientemente definidos en la spec, hay que volver a la spec antes de seguir implementando.

## Customizaciones disponibles

- Skill `/nuestra-spec`: crea una spec nueva en su propia carpeta dentro de `sdd/specs/`.