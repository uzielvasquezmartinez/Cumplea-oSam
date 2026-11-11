# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Sam (Samantha):** Cumple 21 años. Estudiante universitaria, valiente, multifacética. Persona con gusto por la saga *Divergente* (identificada con el valor de Tris Prior y el no encajar en moldes rígidos) y por la música de Frank Ocean (*Pink + White*, *Godspeed*).
- **Hermanito (Remitente principal):** Hermano menor y cómplice afectivo que regala una experiencia que no se desvanece en 10 segundos, sino que atesora palabras de aliento y reconocimiento.

## Product Purpose

Transformar una felicitación de cumpleaños convencional en una **experiencia digital inmersiva y memorable**. Busca empoderar a Sam en el umbral de sus 21 años, validar el esfuerzo que realiza en su vida universitaria y recordarle que no tiene que encajar en una sola facción para ser extraordinaria.

## Positioning

Una experiencia web cinematográfica en dos dimensiones desacopladas:
1. **La Superficie Pública:** Constelación orbital interactiva en Three.js con morphing al número 21 y la felicitación fraternal sobre cristal ahumado.
2. **El Santuario Secreto:** Portal protegido por contraseña (*"divergente"*) que transporta a Sam a un santuario inmersivo sin navbars distractores, protagonizado por un carrusel 3D de 10 cartas con volteo a 180°, frases animadas palabra por palabra y un cierre cinematográfico de afirmación de identidad.

## Operating Context

- Consumo personal e íntimo, principalmente desde teléfono móvil (en posición vertical) o laptop/pantalla grande.
- Carga instantánea, sin recargar página ni requerir login de terceros.

## Capabilities and Constraints

- **Renderizado 3D y Partículas:** Three.js (`@react-three/fiber` y `@react-three/drei`) para el morphing orbital de partículas en la portada.
- **Microinteracciones y Gestos:** Framer Motion con soporte de drag horizontal táctil, teclas de flecha y física de inclinación (*tilt 3D*).
- **Persistencia Local:** Estado de desbloqueo memorizado en `localStorage` (`divergent_garden_unlocked`).
- **Tolerancia a Fallos:** Normalización automática de acentos y mayúsculas en la contraseña (`"Divergente"`, `"divirgente"`), y fallback de avatar perrito 🐶 si el sticker externo no se encuentra.

## Brand Commitments

- **Paleta Botánica de Hortensias:** Negro obsidiana (`#0A0A0D`), rosa flor de hortensia (`#FADADD`), rosa polvo (`#E2A9B2`), y acentos follaje salvia (`#3A443E`).
- **Universo Narrativo:** Facciones de *Divergente* (Abnegación, Osadía, Erudición, Cordialidad, Verdad) fusionadas con la estética musical *Pink + White / Godspeed*.
- **Tipografía:** *Cormorant Garamond* (Serif editorial cálida) + *Plus Jakarta Sans* (Sans moderna limpia) + *Space Mono* (código y metadatos).

## Evidence on Hand

- Archivo de datos centralizado y verificado: `src/data/birthdayContent.js` con las 3 cartas categorizadas (*La Ceremonia de Elección*, *El Paisaje de Fortaleza*, *Desde Otra Facción*) sumando 10 citas individuales y el poema de cierre.

## Product Principles

1. **El Asombro Abre el Corazón:** La tecnología (Three.js y 3D) sirve a la emoción, nunca es mero artificio técnico.
2. **Intimidad en Dos Capas:** Lo público celebra; el portal secreto acoge y protege los recordatorios de mayor vulnerabilidad y fortaleza.
3. **Respeto al Ritmo:** No apabullar con un muro de texto; permitir que Sam elija y voltee cada carta una a una, a su propio paso.
4. **Fidelidad Botánica & Artesanal:** Los racimos de hortensias y las partículas flotantes aportan delicadeza orgánica que suaviza el fondo oscuro obsidiana.
