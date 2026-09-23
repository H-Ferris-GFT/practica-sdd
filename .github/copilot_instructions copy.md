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

En este workspace existen estas customizaciones para ejecutar el flujo SDD:

- Skill `/new-spec`: crea una spec nueva en su propia carpeta dentro de `sdd/specs/`.
- Skill `/create-java-entity`: crea una entity Java con la forma exacta pedida por el usuario.
- Skill `/create-contract-dto`: crea un DTO o contrato con una estructura fija.
- Skill `/add-mapper-method`: añade un metodo concreto a un mapper existente siguiendo el patron local.
- Agente `@spec-auditor`: revisa la calidad funcional de la spec.
- Agente `@spec-to-tech-plan`: convierte la spec en plan tecnico.
- Agente `@backend-implementer`: implementa la parte backend.
- Agente `@angular-implementer`: implementa la parte frontend.
- Agente `@spec-test-implementer`: crea y valida los tests del alcance tocado.
- Agente `@spec-implementation-reviewer`: compara implementacion y spec.
- Agente `@sdd-orchestrator`: coordina el flujo SDD completo delegando en los agentes anteriores en orden.

Estas tres skills adicionales son ejemplos didacticos para formacion: sirven para ensenar tareas pequenas, repetibles y muy concretas, y contrastarlas con agentes de responsabilidad amplia.

## Vision general del proyecto

Este repo se usa como ejemplo de trabajo con SDD y puede evolucionar con estructuras distintas segun la formacion o la practica guiada.

- `sdd/`: documentacion de trabajo para SDD. Aqui viven las specs funcionales y la documentacion de contexto del proyecto.
- `library-api/`: proyecto Java de ejemplo con `src/`, `target/`, `pom.xml` y su README propio.
- Ficheros de build como `library-api/pom.xml`, `package.json` u otros: definen stack, comandos y herramientas disponibles.

No presupongas que el repo siempre tendra backend, frontend, BFFs, monorepo o multiples aplicaciones. Antes de planificar o implementar, inspecciona la estructura real del workspace y usa los nombres, carpetas y limites que existan de verdad.

## Criterios de lectura del repositorio

- Identifica primero el punto de entrada real del cambio: spec, modulo, paquete, servicio, componente o test existente.
- Si el repo tiene una sola aplicacion, trabaja dentro de esa aplicacion sin inventar divisiones artificiales.
- Si el repo tiene varias apps o modulos, explicita cual es el propietario del cambio y cuales son solo impactados.
- Si la estructura del codigo contradice una instruccion heredada, prevalece la estructura real del repo.
- Si no existe frontend o backend en el workspace actual, no fuerces ese flujo: adapta el trabajo al alcance real.

## Criterios de trabajo para futuras tareas

- Para funcionalidades nuevas, empieza por la spec en su carpeta correspondiente dentro de `sdd/specs/`.
- Para cambios funcionales sobre algo existente, revisa primero si ya existe spec; si no existe y el comportamiento cambia, hay que crearla.
- Manten los cambios dentro del modulo, paquete o capa correctos segun la estructura real del repositorio.
- Si cambias contratos o comportamientos, evalua el impacto en los consumidores reales de ese contrato dentro del workspace.
- Si la spec y el codigo entran en conflicto, la implementacion debe reconciliarse contra la spec o la spec debe actualizarse explicitamente.

## Objetivo de estas instrucciones

Copilot debe usar estas reglas para evitar dos errores frecuentes en formacion y en repos de ejemplo:

- implementar comportamiento nuevo sin definicion funcional suficiente;
- asumir arquitecturas, modulos o responsabilidades que no existen en el repo real.