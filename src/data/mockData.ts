import { CSABox, BoxAddOn, Product, PickupLocation } from '../types/store';

export const CSA_BOXES: CSABox[] = [
  {
    id: 'sprout-box',
    name: 'The Urban Sprout Box',
    subtitle: 'Crisp greens & living microgreens for individuals or couples',
    serves: '1 - 2 people',
    basePrice: 28,
    weightLbs: '3.5 - 4.5 lbs',
    popular: false,
    badge: 'Best for Singles & Couples',
    description: 'Freshly harvested living microgreens, sweet salad greens, and delicate culinary herbs delivered in an insulated compostable cooler bag.',
    harvestCycle: 'Harvested Tuesday & Friday mornings',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    defaultItems: [
      { name: 'Sunflower Shoots & Pea Microgreens', quantity: '2 x 4oz trays', category: 'Microgreens', iconName: 'Sprout' },
      { name: 'Butterhead Living Hydro-Lettuce', quantity: '2 full heads', category: 'Greens', iconName: 'Salad' },
      { name: 'Tuscan Baby Kale', quantity: '1 bunch (8oz)', category: 'Greens', iconName: 'Leaf' },
      { name: 'Genovese Sweet Basil', quantity: '1 living bunch', category: 'Herbs', iconName: 'Flower2' },
      { name: 'French Breakfast Radishes', quantity: '1 bunch', category: 'Roots', iconName: 'Apple' }
    ],
    swappableOptions: [
      {
        category: 'Microgreens',
        options: ['Sunflower Shoots & Pea Microgreens', 'Spicy Radish & Broccoli Microgreens', 'Wheatgrass Living Flat']
      },
      {
        category: 'Greens',
        options: ['Butterhead Living Hydro-Lettuce', 'Baby Spinach & Arugula Blend', 'Crisp Romaine Hearts']
      },
      {
        category: 'Herbs',
        options: ['Genovese Sweet Basil', 'Spearmint & Mojito Mint', 'Italian Flat Parsley', 'Fresh Rosemary & Thyme']
      }
    ]
  },
  {
    id: 'city-family-box',
    name: 'City Harvest Family Box',
    subtitle: 'Abundant seasonal harvest for cooking and daily fresh salads',
    serves: '3 - 4 people',
    basePrice: 48,
    weightLbs: '7 - 8.5 lbs',
    popular: true,
    badge: 'Most Popular',
    description: 'Our most comprehensive box: vibrant vertical lettuces, juicy hydroponic cherry tomatoes, gourmet culinary mushrooms, hearty greens, and dual microgreens.',
    harvestCycle: 'Harvested Tuesday & Friday mornings',
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=80',
    defaultItems: [
      { name: 'Assorted Gourmet Microgreens (Pea & Broccoli)', quantity: '3 x 4oz trays', category: 'Microgreens', iconName: 'Sprout' },
      { name: 'Hydroponic Artisan Salad Mix', quantity: '2 large bags (12oz ea)', category: 'Greens', iconName: 'Salad' },
      { name: 'Heirloom Vine Cherry Tomatoes', quantity: '1 pint (12oz)', category: 'Veggies', iconName: 'Apple' },
      { name: 'Blue Oyster Farm Mushrooms', quantity: '8 oz gourmet cluster', category: 'Specialty', iconName: 'Flower' },
      { name: 'Rainbow Swiss Chard', quantity: '1 large bunch', category: 'Greens', iconName: 'Leaf' },
      { name: 'Herb Bouquet (Basil, Cilantro, Thyme)', quantity: '3 bunches', category: 'Herbs', iconName: 'Flower2' },
      { name: 'Crisp Persian Mini Cucumbers', quantity: '1 lb (4-5 ct)', category: 'Veggies', iconName: 'Sparkles' }
    ],
    swappableOptions: [
      {
        category: 'Specialty',
        options: ['Blue Oyster Farm Mushrooms', "Lion's Mane Gourmet Cluster", 'Hydroponic Strawberries (seasonal)']
      },
      {
        category: 'Greens',
        options: ['Rainbow Swiss Chard', 'Baby Spinach', 'Crisp Romaine Hearts', 'Red Oakleaf Lettuce']
      },
      {
        category: 'Veggies',
        options: ['Heirloom Vine Cherry Tomatoes', 'Sweet Baby Bell Peppers', 'Japanese Long Eggplants']
      }
    ]
  },
  {
    id: 'botanical-chef-box',
    name: "Chef's Botanical & Herb Box",
    subtitle: 'Living herbs, specialty microgreens, and gourmet fungi for home culinary artists',
    serves: 'Gourmet cooking & cocktail crafting',
    basePrice: 39,
    weightLbs: '4 - 5 lbs',
    popular: false,
    badge: 'Gourmet Selection',
    description: 'Curated for passionate home cooks: high-aroma culinary herbs, edible violas & nasturtiums, intense microgreens, and delicate lion’s mane mushrooms.',
    harvestCycle: 'Harvested Tuesday & Friday mornings',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d69109853?auto=format&fit=crop&w=800&q=80',
    defaultItems: [
      { name: "Lion's Mane & King Oyster Mushroom Cluster", quantity: '10 oz', category: 'Fungi', iconName: 'Flower' },
      { name: 'Organic Edible Flowers (Nasturtiums & Violas)', quantity: '1 pack (30ct)', category: 'Flowers', iconName: 'Sparkles' },
      { name: 'Truffle-Scented Micro Arugula', quantity: '4 oz living container', category: 'Microgreens', iconName: 'Sprout' },
      { name: 'Culinary Herb Duo: Thai Basil & Rosemary', quantity: '2 potted living herbs', category: 'Herbs', iconName: 'Flower2' },
      { name: 'French Tarragon & Meyer Lemon Thyme', quantity: '2 fresh bunches', category: 'Herbs', iconName: 'Leaf' },
      { name: 'Spicy Wasabi Radish Microgreens', quantity: '4 oz tray', category: 'Microgreens', iconName: 'Sprout' }
    ],
    swappableOptions: [
      {
        category: 'Fungi',
        options: ["Lion's Mane & King Oyster Cluster", 'Golden Enoki & Shiitake', 'Pink Oyster Mushrooms']
      },
      {
        category: 'Herbs',
        options: ['Thai Basil & Rosemary', 'Spearmint & Sage', 'Cilantro & Dill']
      }
    ]
  },
  {
    id: 'vitality-greens-box',
    name: 'Vitality Juicing & Supergreens Box',
    subtitle: 'Packed with dense nutrient-rich brassicas, wheatgrass, and power greens',
    serves: 'Daily juicing & green smoothies',
    basePrice: 42,
    weightLbs: '6 - 7 lbs',
    popular: false,
    badge: 'High Nutrient Density',
    description: 'Designed specifically for morning cold-pressed juicing and smoothies. Clean aeroponic greens harvested zero hours before packaging, completely free of soil and grit.',
    harvestCycle: 'Harvested Tuesday & Friday mornings',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80',
    defaultItems: [
      { name: 'Fresh Living Wheatgrass Flat', quantity: '1 full flat (8oz yield)', category: 'Superfoods', iconName: 'Sprout' },
      { name: 'Dinosaur / Lacinato Dark Kale', quantity: '2 bunches (1 lb total)', category: 'Greens', iconName: 'Leaf' },
      { name: 'Hydroponic Celery & Mint Bundle', quantity: '1 bundle', category: 'Greens', iconName: 'Flower2' },
      { name: 'Baby Spinach Energy Pack', quantity: '1 lb clamshell', category: 'Greens', iconName: 'Salad' },
      { name: 'Broccoli Microgreens (Sulforaphane Rich)', quantity: '2 x 4oz trays', category: 'Microgreens', iconName: 'Sprout' },
      { name: 'Ginger Mint & Lemon Balm', quantity: '4 oz fresh herb', category: 'Herbs', iconName: 'Sparkles' }
    ],
    swappableOptions: [
      {
        category: 'Superfoods',
        options: ['Fresh Living Wheatgrass Flat', 'Red Amaranth Microgreens', 'Barley Grass Living Flat']
      },
      {
        category: 'Greens',
        options: ['Dinosaur / Lacinato Dark Kale', 'Swiss Chard & Beet Greens', 'Mustard Greens & Tatsoi']
      }
    ]
  }
];

export const BOX_ADDONS: BoxAddOn[] = [
  {
    id: 'rooftop-honey',
    name: 'Rooftop Wildflower Raw Honey',
    price: 11.5,
    unit: '12 oz glass jar',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80',
    category: 'Artisan Pantry'
  },
  {
    id: 'artisan-pesto',
    name: 'Vertical Basil & Walnut Pesto',
    price: 8.5,
    unit: '8 oz fresh tub',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=80',
    category: 'Prepared Farm Kitchen'
  },
  {
    id: 'heritage-pasture-eggs',
    name: 'Local Pastured Heritage Hen Eggs',
    price: 7.75,
    unit: '1 dozen',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=400&q=80',
    category: 'Farm Fresh'
  },
  {
    id: 'living-sunflower-tray',
    name: 'Living Sunflower Shoots Desktop Tray',
    price: 6.0,
    unit: '5x5" living root mat',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80',
    category: 'Microgreens'
  },
  {
    id: 'edible-blossoms',
    name: 'Artisan Edible Flowers Garnish',
    price: 6.5,
    unit: '25 blossoms',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d69109853?auto=format&fit=crop&w=400&q=80',
    category: 'Specialty'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-pea-shoots',
    name: 'Speckled Pea Shoot Microgreens',
    tagline: 'Sweet, nutty, and harvested with roots intact for peak freshness',
    category: 'microgreens',
    price: 5.25,
    unit: '4 oz clamshell',
    growthMethod: 'Vertical Tower',
    harvestWindow: 'Harvested daily',
    inStock: true,
    stockCount: 24,
    badge: 'Customer Favorite',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    description: 'Crisp pea shoots packed with 7x the vitamin C of blueberries. Perfect for topping toasts, tossing into grain bowls, or eating straight from the box.',
    nutritionHighlights: ['High in Vitamin A, C, E', 'Packed with Plant Protein', 'Living Roots'],
    daysToHarvest: 10
  },
  {
    id: 'prod-spicy-radish',
    name: 'Rambo Radish Living Microgreens',
    tagline: 'Vibrant purple hues with a bold peppery wasabi punch',
    category: 'microgreens',
    price: 5.5,
    unit: '4 oz clamshell',
    growthMethod: 'Aeroponic',
    harvestWindow: 'Harvested daily',
    inStock: true,
    stockCount: 18,
    badge: 'Chef Pick',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d69109853?auto=format&fit=crop&w=600&q=80',
    description: 'Intense flavor that awakens any sandwich, sushi roll, or poached egg. High anthocyanin content gives it a gorgeous royal purple color.',
    nutritionHighlights: ['Rich in Anthocyanins', 'Natural Antioxidant', 'Zesty Pepper Flavor'],
    daysToHarvest: 8
  },
  {
    id: 'prod-butterhead-lettuce',
    name: 'Hydroponic Butterhead Boston Lettuce',
    tagline: 'Velvety tender leaves with living root ball attached',
    category: 'greens',
    price: 3.95,
    unit: '1 living head',
    growthMethod: 'Hydroponic',
    harvestWindow: 'Harvested morning of delivery',
    inStock: true,
    stockCount: 30,
    badge: 'Living Plant',
    image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=600&q=80',
    description: 'Kept alive in a water cup with its root cube intact, staying crisp and sweet in your fridge for up to 3 weeks. Zero dirt, zero pesticides.',
    nutritionHighlights: ['Stays crisp for 3 weeks', 'Zero pesticide wash needed', 'Zero grit'],
    daysToHarvest: 28
  },
  {
    id: 'prod-tuscan-kale',
    name: 'Dino Lacinato Kale',
    tagline: 'Deep emerald, tender embossed leaves with mild sweetness',
    category: 'greens',
    price: 3.75,
    unit: '8 oz bundle',
    growthMethod: 'Vertical Tower',
    harvestWindow: 'Harvested twice weekly',
    inStock: true,
    stockCount: 22,
    image: 'https://images.unsplash.com/photo-1524179091875-bf99a9a6fa57?auto=format&fit=crop&w=600&q=80',
    description: 'Grown with LED spectrum optimized to eliminate bitterness, making raw kale salads tender, sweet, and easy to digest without heavy massaging.',
    nutritionHighlights: ['High in Vitamin K & Calcium', 'Low Bitterness Profile', 'Dense Folate'],
    daysToHarvest: 24
  },
  {
    id: 'prod-genovese-basil',
    name: 'Aromatic Genovese Sweet Basil',
    tagline: 'Pungent, sweet, and aromatic Italian heirloom basil',
    category: 'herbs',
    price: 4.25,
    unit: '4 oz living container',
    growthMethod: 'Hydroponic',
    harvestWindow: 'Harvested daily',
    inStock: true,
    stockCount: 15,
    badge: 'Super Aromatic',
    image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=600&q=80',
    description: 'Infused with intense essential oils due to targeted UV light recipes. One leaf perfumes an entire pasta dish.',
    nutritionHighlights: ['Essential Oils Preserved', 'Living Roots', 'Pesticide Free'],
    daysToHarvest: 21
  },
  {
    id: 'prod-oyster-mushrooms',
    name: 'Pearl & Blue Oyster Mushrooms',
    tagline: 'Grown on upcycled organic coffee grounds and oak sawdust',
    category: 'specialty',
    price: 7.5,
    unit: '8 oz cluster',
    growthMethod: 'Vertical Tower',
    harvestWindow: 'Mushroom room harvest',
    inStock: true,
    stockCount: 12,
    badge: 'Circular Economy',
    image: 'https://images.unsplash.com/photo-1504472478235-9bc48ba4d60f?auto=format&fit=crop&w=600&q=80',
    description: 'Velvety texture that sears beautifully with garlic and butter. Grown on our closed-loop substrate made from local urban coffee grounds.',
    nutritionHighlights: ['Rich in Beta-Glucans', 'Plant-based Umami', 'Zero Food Waste Loop'],
    daysToHarvest: 14
  },
  {
    id: 'prod-cherry-tomatoes',
    name: 'Sugar Drop Heirloom Cherry Tomatoes',
    tagline: 'Vine-ripened bursts of intense sweetness and balanced acidity',
    category: 'greens',
    price: 5.75,
    unit: '1 dry pint (10 oz)',
    growthMethod: 'Hydroponic',
    harvestWindow: 'Harvested red on vine',
    inStock: true,
    stockCount: 16,
    badge: 'Vine-Ripened',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    description: 'Never gas-ripened. Picked at peak brix sugar level directly off vertical high-wire climbing vines.',
    nutritionHighlights: ['High Lycopene', 'Naturally Sweet', 'Sun-Spectrum Grown'],
    daysToHarvest: 45
  },
  {
    id: 'prod-rooftop-honey',
    name: 'Urban Rooftop Wildflower Honey',
    tagline: 'Single-origin, unheated, unfiltered raw honey from city apiaries',
    category: 'pantry',
    price: 11.5,
    unit: '12 oz jar',
    growthMethod: 'Rooftop Soil',
    harvestWindow: 'Seasonal extraction',
    inStock: true,
    stockCount: 20,
    badge: 'Hyper-Local Bees',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80',
    description: 'Harvested from our rooftop pollinator hives overlooking botanical parks. Rich floral notes with natural local pollen.',
    nutritionHighlights: ['Raw & Unpasteurized', 'Natural Enzymes', 'Local Pollen'],
    daysToHarvest: 90
  }
];

export const PICKUP_LOCATIONS: PickupLocation[] = [
  {
    id: 'hub-downtown',
    name: 'Downtown Vertical Greenhouse Hub',
    address: '420 Green St, Suite 101',
    neighborhood: 'Downtown / Arts District',
    hours: '10:00 AM – 6:30 PM',
    availableDays: ['Tuesday', 'Friday']
  },
  {
    id: 'hub-eastside',
    name: 'East River Hydroponic Facility',
    address: '88 Waterway Blvd, Dock 3',
    neighborhood: 'Eastside Waterfront',
    hours: '9:00 AM – 5:00 PM',
    availableDays: ['Tuesday', 'Friday']
  },
  {
    id: 'hub-rooftop',
    name: 'Skyline Rooftop Farm & Community Garden',
    address: '710 Highline Terrace (Rooftop Level)',
    neighborhood: 'Midtown West',
    hours: '11:00 AM – 6:00 PM',
    availableDays: ['Tuesday', 'Friday']
  }
];

export const ELIGIBLE_ZIP_CODES = [
  '10001', '10002', '10003', '10009', '10010', '10011', '10012', '10013', '10014',
  '10016', '10018', '10019', '10022', '10023', '10024', '10025', '11201', '11211',
  '11217', '11222', '11231', '11238'
];

