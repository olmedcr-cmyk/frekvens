// Apps de ejemplo montadas solo con componentes de Frekvens. Cada una es una vista previa en /preview.
export type Example = { slug: string; file: string; name: string; description: string; uses: string[] }

export const examples: Example[] = [
  { slug: "lectura", file: "AppLectura", name: "Lectura", description: "Diario de lectura: el libro en curso, la racha y las páginas de cada día.", uses: ["tile", "level-bars", "heatmap", "list-row", "key-button", "tab-bar", "text"] },
  { slug: "musica", file: "AppMusica", name: "Música", description: "Reproductor: una pila de pistas, la onda de la que suena y el volumen en una pista grande.", uses: ["card-stack", "audio-track", "tile", "slider", "tab-bar", "text"] },
  { slug: "fitness", file: "AppFitness", name: "Fitness", description: "El día de entrenamiento en azulejos: energía, proteína, plan y minutos de la semana.", uses: ["tile", "progress-ring", "bar-meter", "icon", "tab-bar", "text"] },
  { slug: "cosas", file: "AppCosas", name: "Cosas", description: "Lista de tareas: lo de hoy, lo de la semana y una tecla para añadir.", uses: ["segmented", "tile", "checkbox", "key-button", "tab-bar", "text"] },
  { slug: "cafes", file: "AppCafes", name: "Cafés", description: "Pedir café: el local cercano, la carta en azulejos y el pedido en una tecla.", uses: ["tile", "bar-meter", "segmented", "stepper", "key-button", "tab-bar", "text"] },
  { slug: "finanzas", file: "AppFinanzas", name: "Finanzas", description: "Cartera: el saldo, tres acciones en azulejos de color y los últimos movimientos.", uses: ["tile", "list-row", "avatar", "tab-bar", "text"] },
  { slug: "nutricion", file: "AppNutricion", name: "Nutrición", description: "Calorías y proteína del día, registro por voz y un mensaje del entrenador.", uses: ["tile", "chip", "avatar", "tab-bar", "text"] },
  { slug: "hogar", file: "AppHogar", name: "Hogar", description: "Cada aparato en una fila de color con su lectura, y el mando del aire.", uses: ["strip", "chip", "dial", "segmented", "top-bar", "tab-bar"] },
  { slug: "podcasts", file: "AppPodcasts", name: "Podcasts", description: "Titular a dos tonos, portadas de formas geométricas y una regla para moverse por los días.", uses: ["ruler", "shape", "tile", "tab-bar", "text"] },
  { slug: "bienvenida", file: "AppBienvenida", name: "Bienvenida", description: "Cuatro pasos con arte, mensaje y una sola tecla para avanzar.", uses: ["onboarding", "shape", "chip", "text"] },
  { slug: "estudio", file: "AppEstudio", name: "Estudio", description: "Portada de producto: apertura y cierre en cápsula, ventajas numeradas y artículos partidos.", uses: ["capsule", "article", "shape", "tile", "ticker", "key-button"] },
]
