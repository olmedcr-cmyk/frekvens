// Apps de ejemplo montadas solo con componentes de Frekvens. Cada una es una vista previa en /preview.
export type Example = { slug: string; file: string; name: string; description: string; uses: string[] }

export const examples: Example[] = [
  { slug: "lectura", file: "AppLectura", name: "Lectura", description: "Diario de lectura: el libro en curso, la racha y las páginas de cada día.", uses: ["tile", "level-bars", "heatmap", "list-row", "key-button", "tab-bar", "text"] },
  { slug: "musica", file: "AppMusica", name: "Música", description: "Reproductor: una pila de pistas, la onda de la que suena y el volumen en una pista grande.", uses: ["card-stack", "audio-track", "tile", "slider", "tab-bar", "text"] },
  { slug: "fitness", file: "AppFitness", name: "Fitness", description: "El día de entrenamiento en azulejos: energía, proteína, plan y minutos de la semana.", uses: ["tile", "progress-ring", "bar-meter", "icon", "tab-bar", "text"] },
  { slug: "cosas", file: "AppCosas", name: "Cosas", description: "Lista de tareas: lo de hoy, lo de la semana y una tecla para añadir.", uses: ["segmented", "tile", "checkbox", "key-button", "tab-bar", "text"] },
  { slug: "cafes", file: "AppCafes", name: "Cafés", description: "Pedir café: el local cercano, la carta en azulejos y el pedido en una tecla.", uses: ["tile", "bar-meter", "segmented", "stepper", "key-button", "tab-bar", "text"] },
  { slug: "finanzas", file: "AppFinanzas", name: "Finanzas", description: "Cuentas del piso: quién debe a quién, quién ha pagado y los últimos gastos.", uses: ["stat", "split-bar", "tile", "list-row", "avatar", "tab-bar"] },
  { slug: "nutricion", file: "AppNutricion", name: "Nutrición", description: "Agua y comidas: el vaso del día, lo que llevas comido y la verdura de la semana.", uses: ["strip", "progress-ring", "timeline", "bar-meter", "key-button", "tab-bar"] },
  { slug: "hogar", file: "AppHogar", name: "Hogar", description: "La temperatura de cada estancia, las luces y el modo de la casa.", uses: ["strip", "sparkline", "switch", "dial", "segmented", "top-bar"] },
  { slug: "podcasts", file: "AppPodcasts", name: "Podcasts", description: "Radio de autor con portadas de formas geométricas y una regla para moverse por los días.", uses: ["ruler", "shape", "tile", "tab-bar", "text"] },
  { slug: "bienvenida", file: "AppBienvenida", name: "Bienvenida", description: "Cuatro pasos para una app de préstamo entre vecinos.", uses: ["onboarding", "shape", "chip", "text"] },
  { slug: "cine", file: "AppCine", name: "Cine de verano", description: "Programa, aforo y avisos de un ciclo al aire libre, con apertura y cierre en cápsula.", uses: ["capsule", "article", "tile", "strip", "shape", "key-button"] },
]
