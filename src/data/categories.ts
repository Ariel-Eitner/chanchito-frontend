export const paymentCategories = [
  {
    id: "01",
    name: "Verduras y Frutas",
    subcategories: [
      {
        name: "Verduras",
        subSubcategories: [
          "Hojas Verdes (lechuga, espinaca, acelga)",
          "Raíces (zanahoria, remolacha, rábano)",
          "Tubérculos (papa, batata, ñame)",
          "Crucíferas (brócoli, coliflor, repollo)",
          "Calabazas (zapallo, calabacín, zapallito)",
          "Bulbos (cebolla, ajo, puerro)",
          "Legumbres Frescas (arvejas, habas, ejotes)",
        ],
      },
      {
        name: "Frutas",
        subSubcategories: [
          "Cítricos (naranja, limón, mandarina)",
          "Tropicales (mango, piña, papaya)",
          "Bayas (fresa, frambuesa, arándano)",
          "Frutas de Hueso (durazno, ciruela, cereza)",
          "Frutas de Pepita (manzana, pera, membrillo)",
          "Melones (sandía, melón, cantalupo)",
          "Uvas (uvas verdes, uvas rojas, uvas negras)",
          "Frutas Secas (higo, ciruela pasa, dátil)",
        ],
      },
      {
        name: "Hongos y Setas",
        subSubcategories: [
          "Setas Comunes (champiñón, portobello)",
          "Setas Silvestres (boletus, trompeta de la muerte)",
          "Hongos Exóticos (shiitake, maitake, enoki)",
        ],
      },
      {
        name: "Hierbas Aromáticas",
        subSubcategories: [
          "Frescas (perejil, cilantro, albahaca)",
          "Secas (orégano, tomillo, romero)",
        ],
      },
    ],
  },
  {
    id: "02",
    name: "Carnes y Fiambres",
    subcategories: [
      {
        name: "Carnes Rojas",
        subSubcategories: [
          "Res (bife, asado, costilla)",
          "Cordero (pierna, costillar, paleta)",
          "Cerdo (lomo, panceta, costillas)",
          "Ternera (filete, solomillo, chuleta)",
          "Cabra (chuleta, pierna, costilla)",
        ],
      },
      {
        name: "Aves",
        subSubcategories: [
          "Pollo (pechuga, muslo, alitas)",
          "Pavo (pechuga, pierna, muslo)",
          "Pato (pechuga, confit, magret)",
          "Codorniz (entera, pechuga, muslo)",
          "Gallina (pechuga, muslo, caldo)",
        ],
      },
      {
        name: "Fiambres y Embutidos",
        subSubcategories: [
          "Jamón (serrano, ibérico, york)",
          "Salami (italiano, húngaro, genovés)",
          "Chorizo (español, argentino, mexicano)",
          "Mortadela (con pistacho, sin pistacho)",
          "Tocino (ahumado, sin ahumar)",
        ],
      },
      {
        name: "Carnes de Caza",
        subSubcategories: [
          "Ciervo (lomo, pierna, costilla)",
          "Jabalí (costilla, pierna, lomo)",
          "Conejo (entero, muslo, paletilla)",
          "Faisán (pechuga, muslo, entero)",
        ],
      },
      {
        name: "Carnes Exóticas",
        subSubcategories: [
          "Búfalo (lomo, costilla, estofado)",
          "Canguro (lomo, pierna, estofado)",
          "Avestruz (lomo, costilla, filete)",
        ],
      },
    ],
  },
  {
    id: "03",
    name: "Panadería",
    subcategories: [
      {
        name: "Pan",
        subSubcategories: [
          "Blanco (baguette, ciabatta, pan de molde)",
          "Integral (pan de trigo, pan de avena)",
          "De Centeno (pan negro, pan alemán)",
          "Multigrano (pan de semillas, pan de linaza)",
          "De Masa Madre (sourdough)",
        ],
      },
      {
        name: "Dulces",
        subSubcategories: [
          "Galletas (galletas de mantequilla, galletas de chocolate)",
          "Pasteles (tarta de manzana, pastel de chocolate)",
          "Bollos (croissants, pain au chocolat)",
          "Donuts (donuts glaseados, donuts rellenos)",
          "Magdalenas (muffins de arándanos, muffins de chocolate)",
        ],
      },
      {
        name: "Pasteles",
        subSubcategories: [
          "Tartas (tarta de queso, tarta de frutas)",
          "Pasteles de Celebración (pastel de cumpleaños, pastel de boda)",
          "Pasteles Individuales (cupcakes, tartaletas)",
        ],
      },
      {
        name: "Pan de Especialidades",
        subSubcategories: [
          "Pan Sin Gluten (pan de arroz, pan de almendra)",
          "Pan Vegano (pan de quinoa, pan de chía)",
          "Pan Internacional (naan, focaccia, pita)",
        ],
      },
    ],
  },
  {
    id: "04",
    name: "Dietética",
    subcategories: [
      {
        name: "Suplementos",
        subSubcategories: [
          "Proteínas (proteína de suero, proteína vegetal, proteína de soja)",
          "Vitaminas (vitamina C, vitamina D, complejo B)",
          "Minerales (calcio, magnesio, zinc)",
          "Aminoácidos (BCAA, glutamina, creatina)",
          "Ácidos Grasos (omega-3, omega-6, aceite de pescado)",
        ],
      },
      {
        name: "Alimentos Naturales",
        subSubcategories: [
          "Semillas (semillas de chía, semillas de lino, semillas de sésamo)",
          "Frutos Secos (nueces, almendras, avellanas)",
          "Productos Orgánicos (frutas y verduras orgánicas, granos orgánicos)",
          "Endulzantes Naturales (miel, jarabe de arce, stevia)",
          "Snacks Saludables (barras de granola, chips de kale, fruta deshidratada)",
        ],
      },
      {
        name: "Productos para Dietas Especiales",
        subSubcategories: [
          "Sin Gluten (harina sin gluten, pasta sin gluten)",
          "Bajo en Carbohidratos (pan keto, pasta de konjac)",
          "Veganos (tofu, tempeh, quesos veganos)",
          "Sin Lactosa (leche de almendra, yogurt de coco)",
        ],
      },
      {
        name: "Bebidas Saludables",
        subSubcategories: [
          "Batidos de Proteína (batido de chocolate, batido de vainilla)",
          "Jugos Verdes (jugo de espinaca, jugo de apio)",
          "Infusiones (té verde, té de jengibre, té de cúrcuma)",
        ],
      },
    ],
  },
  {
    id: "05",
    name: "Almacén",
    subcategories: [
      {
        name: "Conservas",
        subSubcategories: [
          "Vegetales (maíz enlatado, guisantes enlatados, espárragos enlatados)",
          "Frutas (melocotones en almíbar, piña enlatada, cerezas en almíbar)",
          "Pescados (atún enlatado, sardinas enlatadas, salmón enlatado)",
          "Legumbres (garbanzos enlatados, frijoles enlatados, lentejas enlatadas)",
        ],
      },
      {
        name: "Granos y Legumbres",
        subSubcategories: [
          "Arroz (arroz blanco, arroz integral, arroz basmati)",
          "Frijoles (frijoles negros, frijoles pintos, frijoles blancos)",
          "Lentejas (lentejas verdes, lentejas rojas, lentejas marrones)",
          "Cereales (avena, quinoa, cebada)",
          "Pasta (espaguetis, macarrones, fusilli)",
        ],
      },
      {
        name: "Aceites y Vinagres",
        subSubcategories: [
          "Aceites (aceite de oliva, aceite de girasol, aceite de coco)",
          "Vinagres (vinagre de manzana, vinagre balsámico, vinagre de vino)",
        ],
      },
      {
        name: "Especias y Condimentos",
        subSubcategories: [
          "Especias (pimienta, cúrcuma, comino)",
          "Salsas (salsa de tomate, mayonesa, mostaza)",
          "Aderezos (aderezo ranch, aderezo italiano, aderezo césar)",
        ],
      },
    ],
  },
  {
    id: "06",
    name: "Comidas y Delivery",
    subcategories: [
      {
        name: "Restaurantes",
        subSubcategories: ["Comida Rápida", "Gourmet", "Étnica"],
      },
      {
        name: "Delivery",
        subSubcategories: ["Pizza", "Sushi", "Hamburguesas"],
      },
    ],
  },
  {
    id: "07",
    name: "Postres",
    subcategories: [
      {
        name: "Helados",
        subSubcategories: ["Crema", "Agua"],
      },
      {
        name: "Tortas y Pasteles",
        subSubcategories: ["Cumpleaños", "Bodas"],
      },
    ],
  },
  {
    id: "08",
    name: "Farmacia y Salud",
    subcategories: [
      {
        name: "Medicamentos",
        subSubcategories: ["Recetados", "Sin Receta"],
      },
      {
        name: "Cuidado Personal",
        subSubcategories: ["Higiene", "Cosméticos"],
      },
    ],
  },
  {
    id: "09",
    name: "Ferretería",
    subcategories: [
      {
        name: "Herramientas",
        subSubcategories: ["Manuales", "Eléctricas"],
      },
      {
        name: "Materiales de Construcción",
        subSubcategories: ["Cemento", "Arena", "Ladrillos"],
      },
    ],
  },
  {
    id: "10",
    name: "Perfumería",
    subcategories: [
      {
        name: "Fragancias",
        subSubcategories: ["Femeninas", "Masculinas", "Unisex"],
      },
      {
        name: "Cuidado Corporal",
        subSubcategories: ["Jabones", "Lociones"],
      },
    ],
  },
  {
    id: "11",
    name: "Bebés",
    subcategories: [
      {
        name: "Pañales y Cuidado",
        subSubcategories: ["Pañales", "Toallitas", "Cremas"],
      },
      {
        name: "Alimentación",
        subSubcategories: ["Leche Materna", "Fórmula", "Alimentos Sólidos"],
      },
    ],
  },
  {
    id: "12",
    name: "Salida",
    subcategories: [
      {
        name: "Restaurantes",
        subSubcategories: ["Comida Rápida", "Gourmet", "Étnica"],
      },
      {
        name: "Entretenimiento",
        subSubcategories: ["Cine", "Teatro", "Conciertos"],
      },
    ],
  },
  {
    id: "13",
    name: "Vicio",
    subcategories: [
      {
        name: "Tabaco",
        subSubcategories: ["Cigarrillos", "Puros"],
      },
      {
        name: "Alcohol",
        subSubcategories: ["Cerveza", "Vino", "Licores"],
      },
    ],
  },
  {
    id: "14",
    name: "Ropa",
    subcategories: [
      {
        name: "Hombres",
        subSubcategories: ["Camisas", "Pantalones", "Chaquetas"],
      },
      {
        name: "Mujeres",
        subSubcategories: ["Vestidos", "Faldas", "Blusas"],
      },
    ],
  },
  {
    id: "15",
    name: "Otros",
    subcategories: [
      {
        name: "Misceláneos",
        subSubcategories: [],
      },
    ],
  },
  {
    id: "16",
    name: "Libros y Papelería",
    subcategories: [
      {
        name: "Libros",
        subSubcategories: ["Ficción", "No Ficción", "Infantiles"],
      },
      {
        name: "Artículos de Papelería",
        subSubcategories: ["Cuadernos", "Lápices", "Agendas"],
      },
    ],
  },
  {
    id: "17",
    name: "Mascotas",
    subcategories: [
      {
        name: "Alimentación",
        subSubcategories: ["Comida Seca", "Comida Húmeda"],
      },
      {
        name: "Accesorios",
        subSubcategories: ["Juguetes", "Camas", "Collares"],
      },
    ],
  },
  {
    id: "18",
    name: "Transporte",
    subcategories: [
      {
        name: "Combustible",
        subSubcategories: ["Gasolina", "Diésel"],
      },
      {
        name: "Transporte Público",
        subSubcategories: ["Autobús", "Metro", "Taxi"],
      },
    ],
  },
  {
    id: "19",
    name: "Educación",
    subcategories: [
      {
        name: "Cursos",
        subSubcategories: ["Online", "Presenciales"],
      },
      {
        name: "Material Educativo",
        subSubcategories: ["Libros", "Cuadernos"],
      },
    ],
  },
  {
    id: "20",
    name: "Entretenimiento",
    subcategories: [
      {
        name: "Cine",
        subSubcategories: ["Boletos", "Palomitas", "Refrescos"],
      },
      {
        name: "Videojuegos",
        subSubcategories: ["Consolas", "Juegos"],
      },
    ],
  },
  {
    id: "21",
    name: "Viajes",
    subcategories: [
      {
        name: "Alojamiento",
        subSubcategories: ["Hotel", "Airbnb"],
      },
      {
        name: "Transporte",
        subSubcategories: ["Vuelos", "Trenes", "Autobuses"],
      },
    ],
  },
  {
    id: "22",
    name: "Tecnología",
    subcategories: [
      {
        name: "Hardware",
        subSubcategories: ["Computadoras", "Periféricos"],
      },
      {
        name: "Software",
        subSubcategories: ["Aplicaciones", "Sistemas Operativos"],
      },
    ],
  },
  {
    id: "23",
    name: "Belleza y Cuidado Personal",
    subcategories: [
      {
        name: "Cuidado de la Piel",
        subSubcategories: ["Limpiadores", "Hidratantes"],
      },
      {
        name: "Maquillaje",
        subSubcategories: ["Labios", "Ojos", "Rostro"],
      },
    ],
  },
  {
    id: "24",
    name: "Artes y Manualidades",
    subcategories: [
      {
        name: "Pintura",
        subSubcategories: ["Acrílica", "Óleo", "Acuarela"],
      },
      {
        name: "Manualidades",
        subSubcategories: ["Costura", "Tejido", "Origami"],
      },
    ],
  },
  {
    id: "25",
    name: "Videojuegos",
    subcategories: [
      {
        name: "Consolas",
        subSubcategories: ["PlayStation", "Xbox", "Nintendo"],
      },
      {
        name: "Juegos",
        subSubcategories: ["Acción", "Aventura", "Estrategia"],
      },
    ],
  },
  {
    id: "26",
    name: "Herramientas",
    subcategories: [
      {
        name: "Manuales",
        subSubcategories: ["Destornilladores", "Llaves", "Martillos"],
      },
      {
        name: "Eléctricas",
        subSubcategories: ["Taladros", "Sierras", "Amoladoras"],
      },
    ],
  },
  {
    id: "27",
    name: "Software y Aplicaciones",
    subcategories: [
      {
        name: "Aplicaciones Móviles",
        subSubcategories: ["Productividad", "Juegos", "Redes Sociales"],
      },
      {
        name: "Software de Escritorio",
        subSubcategories: ["Ofimática", "Diseño", "Edición de Video"],
      },
    ],
  },
  {
    id: "28",
    name: "Mantenimiento del hogar",
    subcategories: [
      {
        name: "Limpieza",
        subSubcategories: ["Detergentes", "Desinfectantes"],
      },
      {
        name: "Reparaciones",
        subSubcategories: ["Plomería", "Electricidad"],
      },
    ],
  },
];

interface MonthlySubsubCategory {
  id: number;
  name: string;
}

interface MonthlySubcategory {
  id: number;
  name: string;
  subsubcategories: MonthlySubsubCategory[];
}

interface MonthlyCategory {
  id: number;
  name: string;
  subcategories: MonthlySubcategory[];
}

export const monthlyCategories: MonthlyCategory[] = [
  {
    id: 1,
    name: "Alquiler",
    subcategories: [
      { id: 1, name: "Alquiler de vivienda", subsubcategories: [] },
      { id: 2, name: "Alquiler de oficina", subsubcategories: [] },
    ],
  },
  {
    id: 2,
    name: "Hipoteca",
    subcategories: [
      { id: 1, name: "Cuota mensual", subsubcategories: [] },
      { id: 2, name: "Intereses", subsubcategories: [] },
    ],
  },
  {
    id: 3,
    name: "Servicios (Agua, Luz, Gas)",
    subcategories: [
      { id: 1, name: "Agua", subsubcategories: [] },
      { id: 2, name: "Electricidad", subsubcategories: [] },
      { id: 3, name: "Gas", subsubcategories: [] },
    ],
  },
  {
    id: 4,
    name: "Internet y Teléfono",
    subcategories: [
      { id: 1, name: "Internet", subsubcategories: [] },
      { id: 2, name: "Teléfono fijo", subsubcategories: [] },
      { id: 3, name: "Teléfono móvil", subsubcategories: [] },
    ],
  },
  {
    id: 5,
    name: "Seguro de Vivienda",
    subcategories: [
      { id: 1, name: "Seguro de hogar", subsubcategories: [] },
      { id: 2, name: "Seguro contra incendios", subsubcategories: [] },
    ],
  },
  {
    id: 6,
    name: "Seguro de Vehículo",
    subcategories: [
      { id: 1, name: "Seguro de automóvil", subsubcategories: [] },
      { id: 2, name: "Seguro de motocicleta", subsubcategories: [] },
    ],
  },
  {
    id: 7,
    name: "Impuestos",
    subcategories: [
      { id: 1, name: "Impuesto sobre la renta", subsubcategories: [] },
      { id: 2, name: "Impuesto a la propiedad", subsubcategories: [] },
    ],
  },
  // Puedes agregar más categorías, subcategorías y subsubcategorías según sea necesario
];

export const incomeCategories = [
  {
    id: "01",
    name: "Sueldos",
    subcategories: [
      {
        name: "Empleado",
      },
      {
        name: "Autónomo",
      },
      {
        name: "Freelance",
      },
    ],
  },
  {
    id: "02",
    name: "Trabajos",
    subcategories: [
      {
        name: "Trabajo a Tiempo Completo",
      },
      {
        name: "Trabajo a Medio Tiempo",
      },
      {
        name: "Trabajo Temporal",
      },
    ],
  },
  {
    id: "03",
    name: "Facturaciones",
    subcategories: [
      {
        name: "Servicios",
      },
      {
        name: "Productos",
      },
      {
        name: "Consultorías",
      },
    ],
  },
  {
    id: "04",
    name: "Ingresos Pasivos",
    subcategories: [
      {
        name: "Dividendos",
      },
      {
        name: "Intereses",
      },
      {
        name: "Alquileres",
      },
    ],
  },
  {
    id: "05",
    name: "Ventas",
    subcategories: [
      {
        name: "Ventas de Productos",
      },
      {
        name: "Ventas de Servicios",
      },
    ],
  },
  {
    id: "06",
    name: "Regalos y Herencias",
    subcategories: [
      {
        name: "Regalos",
      },
      {
        name: "Herencias",
      },
    ],
  },
  {
    id: "07",
    name: "Premios y Ganancias",
    subcategories: [
      {
        name: "Premios",
      },
      {
        name: "Ganancias de Juegos",
      },
    ],
  },
];
