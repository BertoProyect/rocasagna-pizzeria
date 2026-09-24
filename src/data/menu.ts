/**
 * CARTA
 * ---------------------------------------------------------------
 * Fuente: carta impresa de Rocasagna (5 páginas, en catalán).
 * Nombres de producto tal cual aparecen en la carta; ingredientes
 * traducidos al español.
 *
 * Para editar: cambia nombre, descripción o precio aquí y la web
 * se actualiza sola. Precio en euros como número (12.8 = 12,80 €).
 *
 * ALÉRGENOS: `allergens: null` significa "sin confirmar" y no se
 * muestra nada. Cuando el cliente los pase, pon la lista, ej:
 *   allergens: ['gluten', 'lacteos']
 */

export type Allergen =
  | 'gluten' | 'crustaceos' | 'huevo' | 'pescado' | 'cacahuetes' | 'soja' | 'lacteos'
  | 'frutos-cascara' | 'apio' | 'mostaza' | 'sesamo' | 'sulfitos' | 'altramuces' | 'moluscos'

export const allergenLabels: Record<Allergen, string> = {
  gluten: 'Gluten',
  crustaceos: 'Crustáceos',
  huevo: 'Huevo',
  pescado: 'Pescado',
  cacahuetes: 'Cacahuetes',
  soja: 'Soja',
  lacteos: 'Lácteos',
  'frutos-cascara': 'Frutos de cáscara',
  apio: 'Apio',
  mostaza: 'Mostaza',
  sesamo: 'Sésamo',
  sulfitos: 'Sulfitos',
  altramuces: 'Altramuces',
  moluscos: 'Moluscos',
}

export interface MenuOption { label: string; price: number }

export interface MenuItem {
  id: string
  name: string
  description?: string
  price: number | null
  options?: MenuOption[]
  /** null = PLACEHOLDER, sin confirmar */
  allergens: Allergen[] | null
  /** 1 = picante, 2 = muy picante (en la carta: una o dos guindillas) */
  spicy?: 1 | 2
  highlight?: 'mas-valorada'
}

export interface MenuGroup { title?: string; note?: string; items: MenuItem[] }

export interface MenuCategory {
  id: string
  name: string
  tabLabel: string
  groups: MenuGroup[]
}

// PLACEHOLDER: añadir alérgenos (Reglamento UE 1169/2011). Obligatorio antes de publicar la web definitiva.
const A = null

export const menuCategories: MenuCategory[] = [
  {
    id: 'clasicas',
    name: 'Pizzas clásicas',
    tabLabel: 'Clásicas',
    groups: [
      {
        items: [
          {
            id: 'margarita',
            name: 'Margarita',
            description: 'Tomate, mozzarella fior di latte y albahaca fresca.',
            price: 10,
            allergens: A,
            highlight: 'mas-valorada',
          },
          { id: '4-formatges', name: '4 Formatges', description: 'Mozzarella fior di latte, taleggio, parmesano y gorgonzola.', price: 13.5, allergens: A },
          { id: 'prosciutto', name: 'Prosciutto', description: 'Tomate, mozzarella fior di latte, jamón cocido y albahaca fresca.', price: 12, allergens: A },
          { id: '4-estacions', name: '4 Estacions', description: 'Tomate, mozzarella fior di latte, jamón cocido, champiñones, alcachofas, aceitunas negras y orégano.', price: 13, allergens: A },
          { id: 'carbonara', name: 'Carbonara', description: 'Mozzarella fior di latte, guanciale, crema de huevo, pecorino y pimienta.', price: 13, allergens: A },
          { id: 'diable', name: 'Diable', description: 'Tomate, mozzarella fior di latte y spianata picante (chorizo italiano picante).', price: 12, allergens: A, spicy: 1 },
          { id: 'tonno', name: 'Tonno', description: 'Tomate, mozzarella fior di latte, atún y cebolla morada.', price: 12.3, allergens: A },
          { id: 'blanca', name: 'Blanca', description: 'Mozzarella fior di latte, queso de cabra, nueces y miel.', price: 12.5, allergens: A },
        ],
      },
    ],
  },
  {
    id: 'especiales',
    name: 'Pizzas especiales',
    tabLabel: 'Especiales',
    groups: [
      {
        items: [
          { id: 'vegetal', name: 'Vegetal', description: 'Tomate, mozzarella fior di latte, berenjena, calabacín, pimiento rojo, cebolla morada y virutas de parmesano.', price: 12.8, allergens: A },
          { id: 'frankfurt', name: 'Frankfurt', description: 'Tomate, mozzarella fior di latte y frankfurt.', price: 11, allergens: A },
          { id: 'serrana', name: 'Serrana', description: 'Tomate, mozzarella fior di latte, jamón ibérico y brie.', price: 13.5, allergens: A },
          { id: 'salmo', name: 'Salmó', description: 'Mozzarella fior di latte, nata, salmón ahumado y alcaparras.', price: 15.5, allergens: A },
          // En la carta: "xerris" = tomates cherry.
          { id: 'adela', name: 'Adela', description: 'Tomate, mozzarella fior di latte, tomates cherry, anchoas, rúcula y virutas de parmesano.', price: 13.4, allergens: A },
          { id: 'pagesa', name: 'Pagesa', description: 'Tomate, mozzarella fior di latte, butifarra, rúcula y virutas de parmesano.', price: 14, allergens: A },
          // En la carta aparece como "FUNI" (no lleva setas, así que no es "Fungi").
          { id: 'funi', name: 'Funi', description: 'Tomate, mozzarella fior di latte, espinacas, guanciale y piñones.', price: 14.5, allergens: A },
          {
            id: 'rocasagna',
            name: 'Rocasagna',
            description: 'Mozzarella fior di latte, panceta y virutas de parmesano.',
            price: 12.4,
            options: [{ label: 'Con rúcula y crema de vinagre balsámico', price: 13.5 }],
            allergens: A,
          },
          { id: 'calabresa', name: 'Calabresa', description: "Tomate, mozzarella fior di latte, pimiento, salchicha, spianata picante, 'nduja (sobrasada calabresa picante) y cebolla morada.", price: 15.5, allergens: A, spicy: 2 },
          { id: 'illes', name: 'Illes', description: 'Tomate, mozzarella fior di latte, sobrasada, nueces y miel.', price: 12.7, allergens: A },
          { id: 'gondola', name: 'Gòndola', description: 'Mozzarella fior di latte, taleggio, pera, nueces y miel.', price: 14, allergens: A },
          { id: 'la-terra', name: 'La Terra', description: 'Tomate, mozzarella fior di latte, alcachofa con tallo y jamón ibérico.', price: 13.5, allergens: A },
          { id: 'burratina', name: 'Burratina', description: 'Mozzarella fior di latte, mortadela de Bolonia, burrata y granillo de pistacho con pesto de pistacho.', price: 15.5, allergens: A },
          { id: 'diamant-negre', name: 'Diamant Negre', description: 'Mozzarella fior di latte, setas variadas salteadas (ajo y perejil) y virutas de trufa.', price: 16.5, allergens: A },
          { id: 'calzone-puig', name: 'Calzone Puig', description: 'Tomate, mozzarella fior di latte, jamón cocido, champiñones, alcachofas y aceitunas.', price: 13.5, allergens: A },
          { id: 'calzone-valenciana', name: 'Calzone Valenciana', description: 'Tomate, mozzarella fior di latte, jamón cocido, champiñones y spianata picante.', price: 13.5, allergens: A, spicy: 2 },
        ],
      },
    ],
  },
  {
    id: 'postres',
    name: 'Postres',
    tabLabel: 'Postres',
    groups: [
      {
        title: 'Postres',
        items: [
          { id: 'divertit', name: 'Divertit', description: 'Calzone de Nutella.', price: 11, allergens: A },
          { id: 'divertida', name: 'Divertida', description: 'Pizza de Nutella.', price: 10, allergens: A },
          { id: 'disbauxa', name: 'Disbauxa', description: 'Pizza de chocolate de Dubái con pistachos.', price: 15, allergens: A },
        ],
      },
      {
        title: 'Helados',
        items: [
          { id: 'terrina-petita', name: 'Terrina pequeña 140 ml', description: 'Limón, mango, cheesecake o chocolate 70 %.', price: 3.1, allergens: A },
          {
            id: 'terrina-gran',
            name: 'Terrina grande 520 ml',
            description: 'Chocolate con avellanas, idiazábal, yogur con arándanos, Oreo, limón, mango o cheesecake.',
            price: 9,
            // En la carta: "Pantxineta (10,00 €)" dentro de la lista de sabores. Confirmar con el cliente.
            options: [{ label: 'De pantxineta', price: 10 }],
            allergens: A,
          },
        ],
      },
    ],
  },
  {
    id: 'bebidas',
    name: 'Bebidas',
    tabLabel: 'Bebidas',
    groups: [
      {
        title: 'Refrescos',
        // En la carta estos dos aparecen duplicados; aquí solo una vez.
        items: [
          { id: 'coca-cola', name: 'Coca-Cola / Coca-Cola Zero', price: 1.8, allergens: A },
          { id: 'fanta', name: 'Fanta naranja / limón', price: 1.8, allergens: A },
        ],
      },
      {
        title: 'Cervezas',
        items: [
          { id: 'estrella', name: 'Estrella', price: 1.8, allergens: A },
          { id: 'free-damm', name: 'Free Damm', price: 1.85, allergens: A },
          { id: 'lemon-damm', name: 'Lemon Damm', price: 1.85, allergens: A },
          { id: 'voll-damm', name: 'Voll Damm', price: 1.9, allergens: A },
        ],
      },
      {
        title: 'Vinos y otros',
        items: [
          { id: 'ox-oxigen', name: 'OX Oxigen', description: 'Xarel·lo.', price: 9.5, allergens: A },
          { id: 'mostatxo-ros', name: 'Mostatxo Ros', description: 'Mosto.', price: 6.75, allergens: A },
          { id: 'fiorello', name: 'Rosato amable Fiorello', description: 'Lambrusco.', price: 10, allergens: A },
          { id: 'rosato-emilia', name: "Rosato Dell'Emilia IGT Reunite Frizzante", price: 10, allergens: A },
        ],
      },
    ],
  },
]

const priceFormat = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 })

export function formatPrice(price: number | null): string {
  return price === null ? '' : priceFormat.format(price)
}

export function findMenuItem(id: string): MenuItem | undefined {
  for (const c of menuCategories) for (const g of c.groups) for (const i of g.items) if (i.id === id) return i
  return undefined
}
