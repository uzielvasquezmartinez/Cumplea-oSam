export const birthdayContent = {
  profile: {
    name: "Para Ti",
    age: 21,
    editionTag: "EDICIÓN XXI — PINK + WHITE",
    subtitle: "No cabe en una sola facción. Edición especial para tus 21 años.",
  },

  brotherSection: {
    badge: "MENSAJE PRINCIPAL // 21 AÑOS",
    title: "De parte de alguien que te quiere muchísimo",
    signature: "— Con todo el cariño, tu hermanito",
    paragraphs: [
      "Hoy cumples 21 años y quería que esta primera parte de tu sorpresa fuera muy especial.",
      "[ESPACIO RESERVADO PARA EL TEXTO DE SU HERMANITO: Reemplaza este párrafo cuando tengas el mensaje listo.]",
      "¡Feliz cumpleaños! Que siempre sigas brillando como lo haces."
    ],
  },

  secretTrigger: {
    promptText: "Espera... alguien dejó una nota fuera del archivo oficial.",
    buttonText: "Oye...",
    stickerUrl: "/assets/sticker-oye.webp",
    stickerCaption: "Oye... hay un rincón oculto en esta página que no pertenece a ninguna facción. Escribe la clave para entrar.",
    inputPlaceholder: "Escribe la contraseña...",
    acceptedPasswords: ["divirgente", "divergente"],
    hintText: "Pista: Tu libro favorito (aquel donde elegir ser tú misma y no encajar en un solo molde lo cambia todo).",
  },

  secretGarden: {
    headerTag: "ARCHIVO DESBLOQUEADO // PINK + WHITE — GODSPEED",
    title: "Elige tu Carta",
    subtitle: "Cada carta guarda un recordatorio pensado para tus 21 años, tus días en la universidad y el camino que estás construyendo.",
    letters: [
      {
        id: "carta-eleccion",
        number: "01",
        factionTag: "IDENTIDAD // 21 AÑOS",
        title: "La Ceremonia de Elección",
        whenToRead: "Para celebrar quién eres hoy",
        quotes: [
          "Hoy no celebras solo un año más. Celebras que sigues eligiendo ser tú, aunque el mundo te pida que encajes en una sola facción.",
          "Feliz cumpleaños a la persona más Divergente que conozco: la que no cabe en una sola caja.",
          "Veintiún años y una sola certeza: si hoy tuvieras que pasar por la Ceremonia de Elección, volverías a elegir tu propio camino."
        ]
      },
      {
        id: "carta-fortaleza",
        number: "02",
        factionTag: "OSADÍA & ERUDICIÓN // UNIVERSIDAD",
        title: "El Paisaje de Fortaleza",
        whenToRead: "Para cuando la universidad pese o alguien dude de ti",
        quotes: [
          "Tris no dejó de tener miedo, aprendió a actuar a pesar del miedo. Tú estás haciendo lo mismo, aunque no lo veas.",
          "El miedo no te hace débil. En Osadía, el miedo es la prueba de que eres valiente. Y tú eres la persona más valiente que conozco.",
          "No tienes que ser Abnegación todo el tiempo, ayudando a todos y olvidándote de ti. Hoy te toca elegirte a ti.",
          "Ser Divergente significa que tu mente no se deja controlar por nadie. Ni por el miedo, ni por lo que pasó, ni por lo que dicen los demás. Ni siquiera en Erudición podrían medir todo lo que eres capaz de lograr.",
          "Cuatro le dijo a Tris: 'No tienes que ser perfecta'. Y hoy te lo recuerdo yo: se vale cansarse, se vale dudar, y no tienes que poder con todo ni ser perfecta para brillar como lo haces."
        ]
      },
      {
        id: "carta-distancia",
        number: "03",
        factionTag: "LEALTAD // SIEMPRE DE TU LADO",
        title: "Desde Otra Facción",
        whenToRead: "Para recordar que sigues contando conmigo",
        quotes: [
          "No importa si ahora estamos en facciones diferentes. Yo sigo aquí, del otro lado de la pantalla, siempre de tu lado.",
          "No te escribo para que todo vuelva a ser como antes. Te escribo para que sepas que, pase el tiempo que pase, sigues contando conmigo."
        ]
      }
    ]
  },

  finale: {
    step1: "No eres Abnegación.",
    step2: "No eres Osadía.",
    mainHighlight: "Eres Divergente.",
    subHighlight: "Y eso es lo que te hace imparable.",
    closingWish: "Feliz cumpleaños, 21."
  }
};
