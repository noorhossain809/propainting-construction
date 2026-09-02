// Define the structure for a single blog post
export type BlogPost = {
  image: string;
  category: string;
  date: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  alt: string;
  headings: string[];
};

export interface Project {
  id: string;
  title: string;
  type: string;
  category: string;
  description: string;
  location: string;
  duration: string;
  completedDate: string;
  image: string;
  alt: string;
  challenge: string;
  solution: string;
  results: string[];
  gallery: string[];
  testimonial?: {
    text: string;
    author: string;
    rating: number;
  };
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  slug?: string; // e.g. "residential-exterior-waterproofing-painting-nyc"
}

export type Service = {
  title: string;
  image: string; // public path
  id?: string;
  featured?: boolean; // shows description + link if true
  description?: string;
  alt: string;
  details: {
    heading: string;
    p1: string;
    p2: string;
  };
};

export const PROJECTS: Project[] = [
  {
    id: "luxury-interior-painting-dome-ceiling-nyc",
    title: "Luxury Interior Painting with Dome Ceiling Finish",
    type: "Interior Painting",
    category: "interior",
    description:
      "A high-end interior painting project featuring a dome ceiling, accent molding, and premium wall finishes. This work exemplifies precision detailing, refined color coordination, and expert paint craftsmanship for a truly luxurious residential interior.",
    location: "Manhattan, New York, USA",
    duration: "2 Weeks",
    completedDate: "September 2025",
    image: "/assets/luxury-interior-painting-dome-ceiling-nyc.jpeg",
    alt: "Elegant dome ceiling with luxury interior paint finish and soft recessed lighting in Manhattan, NY",
    challenge:
      "The existing dome ceiling and interior walls had uneven textures, discoloration, and outdated finishes that dulled the space’s architectural beauty. The client wanted a refined, luxury look that would emphasize the dome’s depth and lighting symmetry.",
    solution:
      "Our painters meticulously prepped and sanded all surfaces, applied a smooth primer base, and used a multi-layer coating technique with satin and matte blends for contrast. The dome ceiling received a custom metallic glaze to highlight its curvature and complement the ambient lighting design.",
    results: [
      "Delivered a flawless luxury finish that enhanced the visual depth of the dome ceiling.",
      "Created a harmonious interior color palette that elevated the room’s ambience.",
      "Achieved a mirror-smooth surface with zero texture inconsistencies.",
      "Transformed an ordinary ceiling into a centerpiece of architectural artistry.",
    ],
    gallery: [
      "/assets/luxury-interior-painting-dome-ceiling-nyc-1.jpeg",
      "/assets/luxury-interior-painting-dome-ceiling-nyc-2.jpeg",
      "/assets/luxury-interior-painting-dome-ceiling-nyc.jpeg",
    ],
    testimonial: {
      text: "The finish is immaculate — the dome looks like a piece of art. Their attention to detail was unmatched.",
      author: "Jonathan Reeves, Manhattan Resident",
      rating: 5,
    },
    metaTitle:
      "Luxury Interior Painting & Dome Ceiling Finishes | Manhattan, NY Painters",
    metaDescription:
      "Discover luxury interior painting with dome ceiling finishes in Manhattan, NY. Premium paintwork, metallic glazes, and architectural detailing for timeless elegance.",
    keywords: [
      "luxury interior painting NYC",
      "dome ceiling painters Manhattan",
      "high-end residential painting New York",
      "custom paint finishes NYC",
      "architectural ceiling painting",
    ],
    slug: "luxury-interior-painting-dome-ceiling-nyc",
  },
  {
    id: "residential-interior-painting-nyc",
    title: "Residential Interior Painting and Finishing",
    type: "Interior",
    category: "interior",
    description:
      "A premium interior painting project focused on enhancing the home’s warmth, depth, and modern appeal. Our expert team refreshed every room with smooth, high-quality paint finishes that improved both aesthetics and comfort. Using low-VOC, washable paints ensured a clean, healthy, and long-lasting result ideal for family living spaces.",
    location: "Brooklyn, New York, USA",
    duration: "10 Days",
    completedDate: "September 2025",
    image: "/assets/painting/interior-residential-house-nyc-service.jpeg",
    alt: "Modern living room in Brooklyn with freshly painted white walls and warm ambient lighting",
    challenge:
      "The client’s interior walls suffered from discoloration, uneven textures, and outdated tones that made the space look dull and closed in. The challenge was to create a brighter, more open, and cohesive environment while ensuring minimal disruption during daily life.",
    solution:
      "We began by repairing and smoothing wall imperfections, then applied multiple coats of premium low-VOC paint. Our team coordinated color palettes to match the home’s existing decor while optimizing light reflection and room flow. The use of professional-grade tools and fine-finish rollers ensured a flawless, streak-free application.",
    results: [
      "Transformed the space into a brighter, more welcoming environment.",
      "Achieved a smooth, durable finish resistant to marks and stains.",
      "Improved indoor air quality through the use of eco-friendly paints.",
      "Significantly increased the home’s aesthetic and market value.",
    ],
    gallery: [
      "/assets/painting/interior-residential-house-nyc.jpeg",
      "/assets/painting/interior-residential-house-nyc-2.jpeg",
      "/assets/painting/interior-residential-house-nyc-3.jpeg",
      "/assets/painting/interior-residential-house-nyc-service.jpeg",
    ],
    testimonial: {
      text: "The finish is absolutely flawless. Our home feels completely renewed — bright, elegant, and calm. They handled every detail with care.",
      author: "Sophia Bennett",
      rating: 5,
    },
    metaTitle:
      "Residential Interior Painting Services in Brooklyn, NY | Professional Home Painters",
    metaDescription:
      "Revitalize your home with expert interior painting services in Brooklyn, NY. We deliver smooth finishes, eco-friendly materials, and a lasting aesthetic upgrade.",
    keywords: [
      "interior painting Brooklyn",
      "home painters NYC",
      "eco friendly painting",
      "residential painting services",
      "wall finishing New York",
    ],
    slug: "residential-interior-painting-brooklyn-ny",
  },

  {
    id: "school-gym-court-bronx",
    slug: "high-school-gym-court-refinishing-bronx",
    title: "High School Gym & Court Refinishing — The Bronx, NY",
    type: "Education",
    category: "education",
    description:
      "Complete resurfacing of a high school gym floor and outdoor basketball court in The Bronx, NY. Modern shock-absorbing maple flooring and UV-resistant acrylic outdoor surfacing to meet safety and competition standards.",
    location: "The Bronx, NY",
    duration: "4 weeks",
    completedDate: "May 2024",
    image: "/assets/school.jpeg",
    alt: "Refinished high school gym floor and outdoor basketball court in The Bronx, NY",
    challenge:
      "Aging gym floor with cracks and faded outdoor court lines causing safety issues for students and athletes.",
    solution:
      "Installed shock-absorbing maple flooring in the gym and resurfaced the outdoor court with durable, UV-resistant acrylic coatings and refreshed court markings.",
    results: [
      "Improved student and athlete safety",
      "Modernized court aesthetics and school pride",
      "FIBA-standard non-slip finish for better grip",
    ],
    gallery: [
      "/assets/school(2).jpeg",
      "/assets/school(3).jpeg",
      "/assets/school(4).jpeg",
      "/assets/school(5).jpeg",
    ],
    testimonial: {
      text: "The students and staff are thrilled with the new gym—it feels like a professional arena!",
      author: "Principal Johnson, Bronx High School",
      rating: 5,
    },
    metaTitle:
      "High School Gym & Court Refinishing — Bronx NY | Court Resurfacing",
    metaDescription:
      "Court resurfacing and gym floor refinishing in The Bronx. Shock-absorbing maple gym floors, UV-resistant outdoor court coatings, and FIBA-standard finishes. Get a free site inspection.",
    keywords: [
      "gym floor refinishing Bronx",
      "basketball court resurfacing Bronx NY",
      "school gym contractors NYC",
      "FIBA court finish Bronx",
    ],
  },

  {
    id: "residential-exterior-waterproofing-painting-nyc",
    slug: "residential-exterior-waterproofing-painting-nyc",
    title: "Residential Exterior Wall Waterproofing & Painting | NYC",
    type: "Waterproofing & Painting Services",
    category: "residential",
    description:
      "Exterior wall waterproofing and painting in New York. We convert porous concrete-block walls into fully sealed, weather-resistant exteriors using multi-layer stucco systems and premium exterior paint for long-term protection.",
    location: "New York, NY",
    duration: "1 Week",
    completedDate: "October 2025",
    image: "/assets/waterproofing-painting-before-services.jpeg",
    alt: "New York residential exterior wall with waterproof stucco finish and fresh paint",
    challenge:
      "Recurring moisture seepage through aged concrete exterior walls due to heavy rainfall and humidity in NYC.",
    solution:
      "Surface prep, metal lath, multi-coat stucco waterproofing system, and premium UV-resistant exterior paint to ensure total water resistance and a smooth paintable finish.",
    results: [
      "Fully waterproofed exterior wall eliminating moisture problems",
      "Vibrant uniform paint finish improving curb appeal",
      "Enhanced structural protection from water damage",
      "Increased property value with low-maintenance finish",
    ],
    gallery: [
      "/assets/waterproofing-painting-before-services.jpeg",
      "/assets/waterproofing-painting-nyc.jpeg",
      "/assets/waterproofing-painting-service-nyc.jpeg",
      "/assets/waterproofing-painting-service-nyc.jpeg",
    ],
    testimonial: {
      text: "They solved our water leak issues for good — the property looks brand new and we have zero dampness now.",
      author: "Homeowner, Manhattan",
      rating: 5,
    },
    metaTitle:
      "NYC Exterior Waterproofing & Painting | Residential Stucco Services",
    metaDescription:
      "Professional exterior wall waterproofing and painting in New York. Multi-layer stucco waterproofing and premium weatherproof paint to protect homes from rain and humidity.",
    keywords: [
      "NYC waterproofing contractors",
      "residential stucco waterproofing New York",
      "exterior painting NYC",
      "waterproof exterior wall New York",
    ],
  },
  {
    id: "nyc-wallpaper-hanging-service",
    slug: "nyc-wallpaper-hanging-service",
    title: "Residential Wallpaper Hanging & Interior Finishing | New York",
    type: "Interior Finishing",
    category: "residential",
    description:
      "Premium wallpaper hanging service for a luxury apartment in New York. Our expert team installed designer wall coverings with precision alignment, ensuring a seamless and elegant finish that completely transformed the room’s atmosphere.",
    location: "New York, USA",
    duration: "3 Days",
    completedDate: "September 2025",
    image: "/assets/nyc-wallpaper-hanging-after.jpeg",
    alt: "Luxury wallpaper installation in a New York apartment bedroom with seamless designer pattern finish.",
    challenge:
      "The client wanted a high-end, patterned wallpaper applied on uneven drywall surfaces without visible seams or bubbles.",
    solution:
      "We prepared the walls with a smooth skim coat and primer, then meticulously applied imported designer wallpaper using laser alignment for perfect pattern matching and edge precision.",
    results: [
      "Delivered flawless wall alignment and invisible seams.",
      "Enhanced the luxury ambiance of the living space.",
      "Used durable, washable wallpaper material for longevity.",
      "Elevated the overall interior appeal and resale value.",
    ],
    gallery: [
      "/assets/nyc-wallpaper-hanging-process.jpeg",
      "/assets/nyc-wallpaper-hanging-after.jpeg",
    ],
    metaTitle:
      "Luxury Wallpaper Hanging Service in New York | Interior Finishing Experts",
    metaDescription:
      "Professional wallpaper hanging and interior finishing services in New York. Seamless designer wallpaper installation with precision alignment and luxury-grade materials.",
    keywords: [
      "wallpaper installation NYC",
      "wallpaper hanging New York",
      "luxury interior finishing NY",
      "residential wallpaper contractor NYC",
    ],
  },
  {
    id: "roofing-services-bronx-ny",
    title: "Roofing and Weatherproofing Upgrade",
    type: "Commercial",
    category: "Construction",
    description:
      "A complete roofing overhaul for a commercial facility, designed for long-term durability and weather protection.",
    location: "Bronx, NY",
    duration: "4 weeks",
    completedDate: "2025-09-15",
    image: "/assets/roofing.jpeg",
    alt: "Commercial building roof installation with waterproof coating",
    challenge:
      "Old roofing materials caused leaks and poor insulation, risking energy inefficiency and property damage.",
    solution:
      "Installed high-performance shingles, applied weather-seal membranes, and improved drainage systems for sustainability.",
    results: [
      "Leak-free roofing system",
      "Improved energy efficiency",
      "Extended roof lifespan by 20+ years",
    ],
    gallery: [
      "/assets/roofing-repair.jpeg",
      "/assets/roofing-repair-service.jpeg",
      "/assets/roofing.jpeg",
    ],
    testimonial: {
      text: "Flawless from start to finish. They handled the project professionally and met every deadline.",
      author: "Robert King, Building Manager",
      rating: 5,
    },
    metaTitle:
      "Commercial Roofing Services in Bronx, NY | Durable & Leak-Free Roofs",
    metaDescription:
      "Expert roofing and waterproofing services for commercial and industrial buildings in Bronx, NY. Quality materials, precision work.",
    keywords: [
      "roofing services",
      "commercial roofing Bronx",
      "roof repair",
      "weatherproofing",
    ],
    slug: "roofing-services-bronx-ny",
  },
  {
    id: "handrail-installation-brooklyn-ny",
    title: "Custom Metal Handrail Installation and Finishing",
    type: "Carpentry & Metalwork",
    category: "residential",
    description:
      "A precision handrail installation project for a modern duplex home in Brooklyn, combining safety, style, and craftsmanship. This project featured a sleek steel-and-wood hybrid handrail designed to complement the client’s interior aesthetic while meeting strict building code standards.",
    location: "Brooklyn, New York, USA",
    duration: "5 Days",
    completedDate: "August 2025",
    image: "/assets/handrail-installation-brooklyn-ny.jpg",
    alt: "Modern staircase in Brooklyn apartment with custom wood and metal handrail",
    challenge:
      "The staircase lacked proper safety rails, and the client requested a design that would enhance safety without compromising the home's modern minimalistic aesthetic. Space constraints and existing wall structures also required precise measurement and alignment.",
    solution:
      "Our team designed and installed a custom handrail system using a powder-coated metal frame and natural oak top rail. The installation involved precision wall anchoring, seamless weld joints, and a hand-finished wood top to achieve both durability and elegance. Every component was fabricated on-site for a perfect fit.",
    results: [
      "Improved stair safety and stability to meet local code requirements.",
      "Achieved a clean, modern aesthetic that complements the home’s design.",
      "Delivered a durable, low-maintenance handrail with premium finishes.",
      "Enhanced property value and overall interior refinement.",
    ],
    gallery: [
      "/assets/handrail-installation-brooklyn-ny-1.jpg",
      "/assets/handrail-installation-brooklyn-ny-2.jpg",
      "/assets/handrail-installation-brooklyn-ny-3.jpg",
      "/assets/handrail-installation-brooklyn-ny.jpg",
    ],
    testimonial: {
      text: "They built and installed our custom handrail exactly as envisioned — solid, beautiful, and perfectly aligned. Couldn’t ask for better craftsmanship.",
      author: "Daniel Parker",
      rating: 5,
    },
    metaTitle:
      "Custom Handrail Installation in Brooklyn, NY | Modern Stair Railing Experts",
    metaDescription:
      "Professional handrail installation services in Brooklyn, NY. We design and install durable, stylish wood and metal railings that enhance safety and interior appeal.",
    keywords: [
      "handrail installation Brooklyn",
      "stair railing NYC",
      "custom metal handrail",
      "interior carpentry Brooklyn",
      "modern staircase design",
    ],
    slug: "handrail-installation-brooklyn-ny",
  },
  {
    id: "staircase-ceramic-tile-transformation-nyc",
    title: "Staircase Transformation with Ceramic Tile Finish",
    type: "Tiling & Masonry",
    category: "residential",
    description:
      "A complete staircase renovation that turned a worn-out wooden stairway into a sleek, durable, and low-maintenance ceramic-tiled masterpiece. The project combined functional safety with contemporary design, creating a visually striking centerpiece for the home’s interior.",
    location: "Queens, New York, USA",
    duration: "7 Days",
    completedDate: "July 2025",
    image: "/assets/staircase-ceramic-tile-transformation-nyc.jpeg",
    alt: "Modern staircase with ceramic tile steps and white risers in a Queens home",
    challenge:
      "The existing staircase had chipped wood, uneven risers, and years of wear that made it unsafe and unattractive. The client wanted a modern tiled finish that would resist daily wear and blend seamlessly with the home’s flooring aesthetic.",
    solution:
      "Our team began by reinforcing the stair structure, leveling each tread, and applying moisture-resistant underlayment. We then installed high-quality ceramic tiles with anti-slip edges and seamless grout lines. The risers were finished in a complementary white tone to enhance depth and contrast.",
    results: [
      "Delivered a completely revitalized staircase with a modern, polished tile finish.",
      "Improved safety and durability through non-slip ceramic materials.",
      "Enhanced interior design cohesion between the staircase and main flooring.",
      "Provided a low-maintenance, easy-to-clean surface built to last for years.",
    ],
    gallery: [
      "/assets/staircase-ceramic-tile-transformation-nyc-before.jpeg",
      "/assets/staircase-ceramic-tile-transformation-nyc-worke.jpeg",
      "/assets/staircase-ceramic-tile-transformation-nyc-work-2.jpeg",
      "/assets/staircase-ceramic-tile-transformation-nyc-work-3.jpeg",
      "/assets/staircase-ceramic-tile-transformation-nyc-after.jpeg",
      "/assets/staircase-ceramic-tile-transformation-nyc-complete.jpeg",
      "/assets/staircase-ceramic-tile-transformation-nyc.jpeg",
    ],
    testimonial: {
      text: "The staircase looks absolutely stunning! It’s safe, solid, and the finish is flawless — exactly what we hoped for.",
      author: "Melissa Cohen",
      rating: 5,
    },
    metaTitle:
      "Staircase Ceramic Tile Renovation in Queens, NY | Interior Tile Specialists",
    metaDescription:
      "Transform your staircase with elegant ceramic tile finishes. Serving Queens, NY — expert installation, modern design, and durable craftsmanship.",
    keywords: [
      "staircase renovation Queens",
      "ceramic tile installation NYC",
      "interior tile staircase",
      "flooring contractors New York",
      "modern stair design",
    ],
    slug: "staircase-ceramic-tile-transformation-nyc",
  },
  {
    id: "modern-interior-painting-geometric-stripes-nyc",
    title: "Modern Interior Painting with Geometric Stripes",
    type: "Interior Painting",
    category: "interior",
    description:
      "A stylish modern interior painting project featuring precise geometric stripe patterns and bold color contrasts. This project blends technical precision with creative design, transforming plain interior walls into dynamic visual statements fit for modern New York homes.",
    location: "Brooklyn, New York, USA",
    duration: "1 Week",
    completedDate: "September 2025",
    image: "/assets/modern-interior-painting-geometric-stripes-nyc.jpeg",
    alt: "Modern interior wall painted with geometric stripe design in contrasting gray and white tones, Brooklyn, NY",
    challenge:
      "The client’s living space lacked visual interest and definition. They wanted a modern and stylish design that could add dimension and personality to their home without overwhelming the space.",
    solution:
      "We designed a custom geometric stripe layout using high-precision laser alignment for perfect symmetry. Each stripe was hand-painted using premium low-VOC paints, ensuring clean edges and durable finishes. The color scheme was selected to complement natural lighting and contemporary furniture.",
    results: [
      "Created a striking, modern geometric stripe design with perfect symmetry.",
      "Enhanced room depth and visual flow through color and pattern balance.",
      "Delivered a flawless finish using eco-friendly, durable paints.",
      "Transformed a plain wall into a sophisticated design centerpiece.",
    ],
    gallery: [
      "/assets/modern-interior-painting-geometric-stripes-nyc-1.jpeg",
      "/assets/modern-interior-painting-geometric-stripes-nyc-2.jpeg",
      "/assets/modern-interior-painting-geometric-stripes-nyc-3.jpeg",
      "/assets/modern-interior-painting-geometric-stripes-nyc.jpeg",
      "/assets/modern-interior-painting-geometric-stripes-nyc-4.jpeg",
      "/assets/modern-interior-painting-geometric-stripes-nyc-5.jpeg",
      "/assets/modern-interior-painting-geometric-stripes-nyc-6.jpeg",
    ],
    testimonial: {
      text: "Absolutely stunning work — the precision of the lines and the color harmony are next level. It feels like a boutique art studio now.",
      author: "Elena Rodriguez, Brooklyn Homeowner",
      rating: 5,
    },
    metaTitle:
      "Modern Interior Painting with Geometric Stripes | Brooklyn, NY Painters",
    metaDescription:
      "Modern geometric stripe wall painting in Brooklyn, NY. Expert painters specializing in precision stripe designs, bold interiors, and contemporary home aesthetics.",
    keywords: [
      "modern interior painting NYC",
      "geometric stripe wall design",
      "custom wall painting Brooklyn",
      "modern wall painters New York",
      "decorative interior paint NYC",
    ],
    slug: "modern-interior-painting-geometric-stripes-nyc",
  },

  {
    id: "brooklyn-townhouse-expansion",
    slug: "brooklyn-townhouse-expansion",
    title: "Brooklyn Townhouse Expansion & Modernization",
    type: "Residential",
    category: "residential",
    description:
      "Major expansion and modernization of a historic Brooklyn townhouse — two-story rear extension and restored facade to preserve character while adding modern living space.",
    location: "Brooklyn, NY",
    duration: "10 weeks",
    completedDate: "May 2024",
    image:
      "/assets/suburban-house-sunny-sky-symbolizing-american-dream-challenges-rising-mortga_871349-9972.jpg",
    alt: "Expanded Brooklyn townhouse with restored brick facade and modern rear extension",
    challenge:
      "Add living space while preserving a historic facade and neighborhood character.",
    solution:
      "Two-story rear extension with open-plan interior and careful restoration of original brickwork and architectural details.",
    results: [
      "Added two new bedrooms and a bathroom",
      "Increased property value by 30%",
      "Seamless blend of modern and historic design",
    ],
    gallery: [
      "/assets/suburban-house-sunny-sky-symbolizing-american-dream-challenges-rising-mortga_871349-9972.jpg",
    ],
    testimonial: {
      text: "They respected our home's history while giving us the modern space we needed. Flawless execution.",
      author: "The Miller Family",
      rating: 5,
    },
    metaTitle:
      "Brooklyn Townhouse Expansion & Historic Restoration | Residential Contractor",
    metaDescription:
      "Townhouse expansion and historic facade restoration in Brooklyn. Custom rear extension, modern interiors, and brick restoration to preserve architectural character.",
    keywords: [
      "townhouse expansion Brooklyn",
      "historic restoration Brooklyn NY",
      "residential contractor Brooklyn",
    ],
  },

  {
    id: "manhattan-office-renovation",
    slug: "manhattan-corporate-office-renovation",
    title: "Manhattan Corporate Office Renovation — Sustainable Design",
    type: "Office",
    category: "office",
    description:
      "Renovation of a 5-story corporate headquarters in Manhattan using reclaimed materials and green wall features to meet sustainability and brand goals.",
    location: "Manhattan, NY",
    duration: "10 weeks",
    completedDate: "Feb 2024",
    image: "/assets/corporate-office/view-modern-office.jpg",
    alt: "Modern open-plan corporate office in a Manhattan high-rise after renovation",
    challenge:
      "Outdated 1990s design that didn’t reflect the company brand or sustainability goals.",
    solution:
      "Open-plan redesign, reclaimed wood, sustainable materials, and green walls to improve employee experience and energy efficiency.",
    results: [
      "Achieved LEED Gold certification",
      "40% reduction in building energy consumption",
      "Reported employee satisfaction up by 30%",
    ],
    gallery: ["/assets/corporate-office/view-modern-office.jpg"],
    testimonial: {
      text: "The new space is vibrant and inspiring for our team. It truly reflects our company culture.",
      author: "HR Director, Manhattan HQ",
      rating: 4,
    },
    metaTitle:
      "Manhattan Corporate Office Renovation | Sustainable Office Design NYC",
    metaDescription:
      "Sustainable corporate office renovation in Manhattan. LEED Gold strategies, reclaimed materials, and green wall installations to reduce energy use and boost employee satisfaction.",
    keywords: [
      "office renovation Manhattan",
      "sustainable office design NYC",
      "corporate renovation NYC",
    ],
  },

  {
    id: "brooklyn-navy-yard-mezzanine",
    slug: "brooklyn-navy-yard-mezzanine-build",
    title: "Warehouse Mezzanine — Brooklyn Navy Yard",
    type: "Industrial",
    category: "industrial",
    description:
      "Custom mezzanine installation inside an existing warehouse at the Brooklyn Navy Yard to increase operational capacity with minimal downtime.",
    location: "Brooklyn Navy Yard, NY",
    duration: "8 weeks",
    completedDate: "Nov 2023",
    image: "/assets/brooklyn-navy-yard-mezzanine-after.jpg",
    alt: "New steel mezzanine level installed inside a Brooklyn Navy Yard warehouse",
    challenge: "Need more operational capacity without buying new property.",
    solution:
      "Freestanding steel mezzanine with fire-rated access and a freight lift to expand usable storage space.",
    results: [
      "Usable storage space increased by 35%",
      "Minimal construction downtime",
      "Improved overall operational efficiency",
    ],
    gallery: [
      "/assets/brooklyn-mezzanine-before.jpg",
      "/assets/brooklyn-mezzanine-after.jpg",
    ],
    testimonial: {
      text: "A smart, cost-effective solution for our growing needs. The team was fast and professional.",
      author: "Warehouse Manager",
      rating: 4,
    },
    metaTitle: "Warehouse Mezzanine Installation — Brooklyn Navy Yard",
    metaDescription:
      "Mezzanine installation at Brooklyn Navy Yard to increase storage capacity with fire-rated access and minimal downtime for active warehouses.",
    keywords: [
      "mezzanine installation Brooklyn",
      "warehouse expansion Brooklyn Navy Yard",
      "industrial mezzanine NYC",
    ],
  },

  {
    id: "ues-kitchen-renovation",
    slug: "ues-modern-kitchen-renovation",
    title: "Modern Kitchen Renovation — Upper East Side, Manhattan",
    type: "Residential",
    category: "residential",
    description:
      "Complete kitchen remodel in an Upper East Side apartment with custom cabinetry, quartz countertops, and energy-efficient LED lighting for modern urban living.",
    location: "Upper East Side, Manhattan, NY",
    duration: "6 weeks",
    completedDate: "Aug 2023",
    image:
      "/assets/modern-kitchen-renovation-cabinets-countertops-installed_857340-10731.jpg",
    alt: "Sleek modern kitchen with custom cabinets and quartz countertops in Upper East Side apartment",
    challenge:
      "Cramped, dark 1980s kitchen layout that didn’t suit modern family needs.",
    solution:
      "Open layout design, custom cabinetry, quartz countertops, and LED lighting to maximize usability and brighten the space.",
    results: [
      "Estimated 25% increase in home value",
      "40% more usable storage space",
      "Bright, energy-efficient LED fixtures",
    ],
    gallery: [
      "/assets/modern-kitchen-renovation-cabinets-countertops-installed_857340-11254.jpg",
      "/assets/modern-kitchen-renovation-cabinets-countertops-installed_857340-10731.jpg",
    ],
    testimonial: {
      text: "This renovation completely changed how we live in and use our home. We couldn't be happier.",
      author: "Sarah & Mike Johnson",
      rating: 5,
    },
    metaTitle: "Upper East Side Kitchen Renovation | Custom Cabinets & Quartz",
    metaDescription:
      "Modern kitchen renovation on the Upper East Side with custom cabinetry, quartz countertops, and LED lighting to maximize space and resale value.",
    keywords: [
      "kitchen renovation Upper East Side",
      "custom kitchen Manhattan",
      "apartment kitchen remodel NYC",
    ],
  },
];

export const services: Service[] = [
  {
    title: "Residential & Commercial Painting",
    image: "/assets/painting/residential-commercial-painting.jpg",
    id: "residential-commercial-painting",
    alt: "A team of professional painters applying fresh white paint to the exterior of a modern commercial building in New York.",
    featured: true,
    description:
      "Professional interior and exterior painting for homes and businesses across New York City, enhancing beauty and providing long-lasting protection.",
    details: {
      heading: "Our Approach to Professional Painting in NYC",
      p1: "Every painting project at Pro Painting Construction, whether a cozy Brooklyn apartment or a large Manhattan office, starts with meticulous preparation. We believe a flawless finish is built on a perfect foundation. Our process includes detailed surface cleaning, sanding, and priming to ensure maximum paint adhesion and a long-lasting, durable result that withstands the demands of New York's environment.",
      p2: "We utilize premium, low-VOC paints from leading brands to ensure a safe and healthy environment for your family or employees. Our skilled painters are experts in a range of techniques, from classic brush and roll applications for a traditional finish to advanced spraying methods for a perfectly uniform coat on complex surfaces. Your satisfaction is our priority, and we conclude every project with a thorough walkthrough to ensure every detail meets your expectations.",
    },
  },
  {
    title: "Interior Design & Decorative Painting",
    image: "/assets/painting/interior-design-decorative-Bh2vMzn8.jpg",
    id: "interior-decorative-painting",
    alt: "A beautifully designed living room in a Manhattan apartment featuring a stylish decorative accent wall.",
    featured: true,
    description:
      "Transform your living or office spaces in Manhattan and Brooklyn with custom wall textures, accent walls, and decorative finishes that reflect your unique style.",
    details: {
      heading: "Crafting Unique Interiors Across New York",
      p1: "Our interior design and decorative painting services are for those looking to make a statement. We collaborate closely with clients in Manhattan and Brooklyn to create spaces that are both beautiful and functional. From selecting the perfect color palette to designing custom murals or applying sophisticated faux finishes, our team brings a creative and artistic touch to every project.",
      p2: "We specialize in a variety of decorative techniques, including Venetian plaster, textured finishes, and intricate stencil work. Whether you're aiming for a modern, minimalist look or a rich, classic aesthetic, we use high-quality materials and artistic expertise to turn your vision into a stunning reality that elevates your New York home or office.",
    },
  },
  {
    title: "General Construction & Remodeling",
    image: "/assets/painting/building-construction.jpg",
    id: "general-construction-remodeling",
    alt: "Construction workers in hard hats collaborating on a new building remodeling project in NYC.",
    featured: true,
    description:
      "Full-scale renovation projects for apartments and commercial spaces throughout the NYC area, transforming them with modern design and quality construction.",
    details: {
      heading: "Full-Scale Construction and Remodeling in NYC",
      p1: "Our general construction service is the cornerstone of our offerings, covering everything from ground-up new builds to extensive remodeling. We navigate the complexities of New York City's building codes and regulations to ensure your project is compliant and completed efficiently. The process begins with in-depth planning and architectural design to create a solid blueprint for success.",
      p2: "Execution is where our skilled tradespeople shine. We manage every aspect of the construction process, including structural work, electrical, plumbing, and finishing. Our commitment to superior project management means we deliver high-quality results on time and within budget, making us a trusted construction partner in the competitive NYC market.",
    },
  },
  {
    title: "Building Maintenance & Repairs",
    image: "/assets/painting/building-maintenance-repairs-C547MHdJ.jpg",
    id: "building-maintenance-repairs",
    alt: "A maintenance professional repairing a wall crack before painting in a New York building.",
    featured: true,
    description:
      "Ongoing building maintenance for properties in New York, including painting touch-ups, minor construction, and preventive repairs for lasting value.",
    details: {
      heading: "Proactive Building Maintenance for NYC Properties",
      p1: "Protecting the value and integrity of your property in New York requires consistent, proactive maintenance. We offer comprehensive maintenance plans tailored to your building's specific needs, covering everything from scheduled inspections and seasonal preparations to prompt and reliable emergency repairs.",
      p2: "Our services include routine painting touch-ups, plumbing and electrical checks, HVAC servicing, and minor structural repairs. By identifying and addressing potential issues before they become major problems, we help NYC property owners save money and ensure their buildings remain safe, functional, and aesthetically pleasing year-round.",
    },
  },
  {
    title: "Industrial Painting & Coatings",
    image: "/assets/painting/industrial-painting-coatings-xhJznG8F.jpg",
    id: "industrial-painting-coatings",
    alt: "A specialist applying protective industrial coating to a large metal structure in a New York factory.",
    featured: true,
    description:
      "Heavy-duty painting and coating services for factories, warehouses, and industrial structures in the greater New York area that meet safety and durability standards.",
    details: {
      heading: "Durable Industrial Coatings for NY Facilities",
      p1: "Industrial environments demand robust protection against corrosion, chemicals, and abrasion. Our industrial painting services for New York facilities begin with extensive surface preparation, utilizing methods like sandblasting and high-pressure washing to create the ideal substrate for coating adhesion.",
      p2: "We apply a range of specialized, high-performance coatings, including epoxy, polyurethane, and anti-static solutions, designed to meet the rigorous safety and durability standards of your industry. Our certified team ensures every application is performed safely and efficiently, minimizing downtime for your operations.",
    },
  },
  {
    title: "Exterior Painting & Waterproofing",
    image: "/assets/painting/exterior-painting-waterproofing-BhwDUGxh.jpg",
    id: "exterior-painting-waterproofing",
    alt: "Waterproof sealant being applied to the exterior brick wall of a New York residential building.",
    featured: true,
    description:
      "Protect your NYC property from harsh weather with our expert exterior painting and waterproof coating services, built to last against the elements.",
    details: {
      heading: "Protecting New York Buildings with Expert Waterproofing",
      p1: "New York's weather can be unforgiving on building exteriors. Our exterior painting and waterproofing services are designed to create an impenetrable barrier against moisture intrusion. We begin by thoroughly inspecting the facade to identify and repair cracks, gaps, and other vulnerabilities that could lead to water damage.",
      p2: "Using advanced elastomeric coatings and high-quality sealants, we provide a flexible, breathable, and completely waterproof finish. This not only protects your building's structural integrity but also enhances its curb appeal and can improve thermal efficiency, making it a wise investment for any NYC property.",
    },
  },
  {
    title: "Drywall Installation & Repair",
    image: "/assets/painting/drywall-installation-repair-DbMNHWHJ.jpg",
    id: "drywall-installation-repair",
    alt: "A worker installing a new sheet of drywall in a home under construction in Queens, New York.",
    featured: true,
    description:
      "Seamless drywall installation, patching, and finishing for flawless walls and ceilings in residential and commercial projects across the five boroughs.",
    details: {
      heading: "Flawless Drywall Services for NY Interiors",
      p1: "A perfect paint job requires a perfect surface, and that starts with expert drywall services. Whether you're undertaking a full renovation in Queens or need to repair a small hole in a downtown office, our team provides seamless drywall installation and repair services. We ensure every panel is hung securely and precisely.",
      p2: "Our finishing process is second to none. We meticulously tape, mud, and sand all seams and joints to achieve a Level 5 finish—the smoothest surface possible, ready for any primer, paint, or wallpaper. We work cleanly and efficiently to minimize dust and disruption in your New York home or business.",
    },
  },
  {
    title: "Flooring Installation & Renovation",
    image: "/assets/painting/flooring-installation-renovation.jpg",
    id: "flooring-installation-renovation",
    alt: "Newly installed sleek hardwood flooring in a modern New York City apartment.",
    featured: true,
    description:
      "Upgrade your interiors with premium flooring solutions, including tiles, hardwood, and epoxy finishes, expertly installed in New York homes and offices.",
    details: {
      heading: "Premium Flooring Solutions for New York Spaces",
      p1: "The right flooring can completely transform the look and feel of any room. We offer comprehensive flooring installation and renovation services for our New York clients, working with a wide range of materials including classic hardwood, durable laminate, luxury vinyl tile (LVT), and modern epoxy coatings.",
      p2: "Our process begins with helping you select the perfect material for your needs and style. Our expert installers then handle everything from subfloor preparation to the final finishing touches, ensuring your new floor is not only beautiful but also installed to last for years to come.",
    },
  },
  {
    title: "Building Renovation & Remodeling",
    image: "/assets/painting/building-renovation-remodeling-BKVZko9u.jpg",
    id: "building-renovation-remodeling",
    alt: "A side-by-side comparison of a kitchen before and after a complete renovation in a Brooklyn home.",
    featured: true,
    description:
      "Complete renovation services to modernize your NYC property, from kitchen and bathroom upgrades in Brooklyn to full-scale remodeling in Manhattan.",
    details: {
      heading: "Transformative Renovations Across NYC",
      p1: "We specialize in building renovations that breathe new life into outdated spaces. From modernizing a kitchen in a Brooklyn brownstone to a complete gut renovation of a Manhattan apartment, our team manages the entire process. We work to maximize space, improve functionality, and create a design that aligns with your modern lifestyle.",
      p2: "Our integrated approach combines design and construction under one roof, ensuring a seamless workflow and clear communication from start to finish. We handle all permits, materials sourcing, and coordination of tradespeople, delivering a stress-free remodeling experience and a final product that exceeds your expectations.",
    },
  },
  {
    title: "Plastering & Wall Finishing",
    image: "/assets/painting/plastering-wall-finishing.jpg",
    id: "plastering-wall-finishing",
    alt: "A craftsman applying smooth plaster to a wall for a perfect finish in a New York property.",
    featured: true,
    description:
      "High-quality plastering, skimming, and wall finishing services that create a smooth, perfect foundation for paint or wallpaper in any New York property.",
    details: {
      heading: "Expert Plastering for Perfectly Smooth Walls",
      p1: "For a truly high-end and durable finish, nothing beats traditional plastering. It provides a seamless, hard-wearing surface that is superior to standard drywall. Our plastering services are perfect for restoring historic New York properties or for creating a luxurious feel in new custom homes and commercial spaces.",
      p2: "Our skilled artisans are masters of both traditional plastering techniques and modern skimming methods. We meticulously apply and smooth the plaster to create flawless, perfectly flat walls and ceilings, providing the ultimate canvas for any high-end paint, decorative finish, or wallpaper.",
    },
  },
  {
    title: "Roof Painting & Waterproof Coating",
    image: "/assets/painting/roof-painting-waterproof-W-tuBKxd.jpg",
    id: "roof-painting-waterproofing",
    alt: "A worker applying a white waterproof and reflective coating to the roof of a building in New York.",
    featured: true,
    description:
      "Extend the life of your roof with protective painting and waterproofing solutions, specifically designed for the weather conditions in the New York area.",
    details: {
      heading: "Extend Your Roof's Life with Protective Coatings",
      p1: "Your roof is your property's first line of defense. Our roof painting and coating service is a cost-effective solution to extend its lifespan and prevent leaks. We apply a monolithic, seamless membrane that seals existing cracks and prevents new ones from forming, providing robust protection for your New York building.",
      p2: "We use high-quality elastomeric and silicone coatings that are not only 100% waterproof but also highly reflective. These 'cool roof' coatings reflect solar radiation, significantly reducing the surface temperature of your roof. This can lead to lower energy consumption for cooling during hot NYC summers, saving you money on utility bills.",
    },
  },
];

// Array of 10 blog post data objects

export const blogPosts: BlogPost[] = [
  {
    image: "/assets/painting/interior-residential-house.jpeg",
    category: "Exterior Painting",
    date: "September 22, 2025",
    title:
      "Best Exterior & Interior Painting for New York Homes – Weatherproof for All Four Seasons",
    slug: "best-exterior-interior-painting-new-york-homes",
    alt: "New York home with professional exterior and interior painting, durable finish for all seasons.",
    description:
      "Discover the best exterior & interior painting for New York homes. Weatherproof solutions that last through every season.",
    headings: [
      "Why Choosing the Right Paint Matters in New York",
      "Exterior Painting Tips for Harsh Winters & Hot Summers",
      "Best Interior Painting Colors & Finishes for NY Homes",
      "Weatherproof Paint Types: Acrylic Latex & More",
      "Professional Application vs. DIY: What’s Better for Longevity",
    ],
    content: `
## Why Choosing the Right Paint Matters in New York
A high-quality exterior paint job is your home's first line of defense against the demanding New York climate. The key to a lasting finish isn't just the paint itself, but the **preparation**. Our process begins with thorough power washing to remove dirt, mildew, and loose paint. We then scrape, sand, and prime any bare spots to create a perfect surface for adhesion.

## Exterior Painting Tips for Harsh Winters & Hot Summers
Choosing the right paint is crucial. We recommend a **100% acrylic latex paint** for flexibility, which allows it to expand and contract with temperature fluctuations, preventing cracking and peeling during harsh winters and hot summers. This paint is also breathable, letting moisture escape from walls to prevent blisters.

## Best Interior Painting Colors & Finishes for NY Homes
Proper professional application makes all the difference. Paint is applied under optimal weather conditions, avoiding direct sunlight and high humidity for proper curing. Two full coats guarantee a rich, even color and a durable shell to protect your investment and boost curb appeal for years.
`,
  },
  {
    image: "/assets/nyc-apartment-interior.jpeg",
    category: "Interior Painting",
    date: "September 18, 2025",
    title: "Top Interior Paint Ideas to Maximize Space in NYC Apartments",
    slug: "interior-paint-ideas-nyc-apartments",
    alt: "Modern NYC apartment interior with light-colored walls, maximizing space with smart paint ideas.",
    description:
      "Transform your NYC apartment with smart interior paint ideas. Learn colors & finishes to make small spaces feel bigger.",
    headings: [
      "How Paint Colors Can Make Small NYC Apartments Look Bigger",
      "Best Light & Neutral Colors for New York City Interiors",
      "The Role of Paint Finish: Satin, Eggshell, or Matte?",
      "Using Monochromatic Color Schemes to Expand Space",
      "Professional Painting Services for NYC Apartments",
    ],
    content: `
## How Paint Colors Can Make Small NYC Apartments Look Bigger
In New York City, space is a premium. While you can't add square footage with a paintbrush, you can create the illusion of a larger, open area. **Light and neutral colors** like off-white, light gray, and soft beige reflect natural light, making rooms feel airy and spacious.

## Best Light & Neutral Colors for New York City Interiors
The **finish** plays a crucial role. Eggshell or satin finishes reflect light more effectively than flat or matte finishes, especially in hallways or rooms with limited natural light.

## The Role of Paint Finish: Satin, Eggshell, or Matte?
Painting ceilings a shade lighter than walls creates a sense of height and openness, enhancing the illusion of space.

## Using Monochromatic Color Schemes to Expand Space
Painting walls, trim, and doors in shades of the same light color minimizes visual breaks, making rooms look larger and creating a clean, sophisticated appearance.
`,
  },
  {
    image: "/assets/brownstone-renovation.jpg",
    category: "Historic Restoration",
    date: "September 12, 2025",
    title: "Brooklyn Brownstone Facade Restoration – Complete Guide",
    slug: "brooklyn-brownstone-facade-restoration-guide",
    alt: "Historic Brooklyn brownstone facade restoration with expert brick repointing and repairs.",
    description:
      "Restore your Brooklyn brownstone facade with expert tips on repointing, lintel repair & historic paint colors.",
    headings: [
      "Why Brownstone Facades Require Special Care",
      "Brick Repointing: Preserving Historic Masonry",
      "Lintel & Sill Repairs for Long-Term Durability",
      "Choosing Historic Paint Colors for Authenticity",
      "Navigating Landmarks Preservation Commission (LPC) Approval",
    ],
    content: `
## Why Brownstone Facades Require Special Care
Owning a brownstone in Brooklyn is a dream, but maintaining its historic facade requires special attention. Proper understanding of materials and techniques is critical.

## Brick Repointing: Preserving Historic Masonry
Over time, mortar between bricks decays. Using a **lime-based mortar** matching the original composition preserves soft, historic bricks while preventing damage from modern cement.

## Lintel & Sill Repairs for Long-Term Durability
Stone lintels and sills above windows and doors can develop cracks or spalling, leading to water infiltration. Proper repair ensures long-term structural integrity.

## Choosing Historic Paint Colors for Authenticity
Select historically accurate paint colors to maintain the charm and authenticity of your brownstone.

## Navigating Landmarks Preservation Commission (LPC) Approval
All work on landmarked brownstones requires LPC approval. Experienced professionals ensure compliance while preserving historic character.
`,
  },
  {
    image:
      "/assets/modern-kitchen-renovation-cabinets-countertops-installed_857340-10731.jpg",
    category: "Home Renovation",
    date: "September 5, 2025",
    title: "Complete Guide to Kitchen & Bathroom Remodeling in New York",
    slug: "kitchen-bathroom-remodeling-new-york",
    alt: "Modern kitchen remodel in New York home with white cabinets and quartz countertops.",
    description:
      "Upgrade your New York home with expert kitchen & bath remodeling. Learn about costs, materials & co-op approvals.",
    headings: [
      "Why Kitchen & Bath Renovations Offer the Best ROI in NYC",
      "Smart Kitchen Design: Cabinets, Countertops & Layouts",
      "Bathroom Renovation Essentials: Waterproofing & Materials",
      "Budgeting Tips for Kitchen & Bath Remodeling in New York",
      "Navigating Co-op & Condo Board Approvals for Renovations",
    ],
    content: `
## Why Kitchen & Bath Renovations Offer the Best ROI in NYC
Kitchen and bathroom remodels provide the highest ROI for New York homeowners. They enhance functionality and resale value.

## Smart Kitchen Design: Cabinets, Countertops & Layouts
Prioritize smart storage, durable countertops like **quartz**, and efficient layouts. Custom cabinetry reaching the ceiling maximizes space in NYC homes.

## Bathroom Renovation Essentials: Waterproofing & Materials
Waterproofing is critical. Proper membranes prevent leaks and mold. Large-format tiles minimize grout lines, making bathrooms easier to clean.

## Budgeting Tips for Kitchen & Bath Remodeling in New York
Plan carefully for materials, labor, and potential co-op or condo board fees. Accurate budgeting prevents delays and surprises.

## Navigating Co-op & Condo Board Approvals for Renovations
Submission packages, detailed plans, and licensing are often required. Experienced teams ensure fast approvals without unnecessary hurdles.
`,
  },
  {
    image: "/assets/working-with-blueprint.jpg",
    category: "Commercial Services",
    date: "August 29, 2025",
    title: "High-Impact Commercial Painting for NYC Storefronts",
    slug: "commercial-painting-nyc-storefronts",
    alt: "NYC storefront renovation with professional commercial painting and design blueprint.",
    description:
      "Boost foot traffic & brand image with high-impact commercial painting for NYC storefronts. Professional & lasting results.",
    headings: [
      "Why Storefront Appearance Matters in New York City",
      "Choosing the Right Colors for Brand Recognition",
      "Durable Commercial-Grade Paints for High Traffic Areas",
      "How Professional Painting Boosts Foot Traffic & Sales",
      "Pro Painting Construction: Expert NYC Storefront Painters",
    ],
    content: `
## Why Storefront Appearance Matters in New York City
A storefront is more than an entrance—it's a key marketing tool. Faded or chipped paint sends the wrong message to potential customers.

## Choosing the Right Colors for Brand Recognition
Align exterior colors with your brand identity to create a cohesive and memorable look.

## Durable Commercial-Grade Paints for High Traffic Areas
Use high-quality, commercial-grade paints designed for NYC's harsh weather and heavy foot traffic.

## How Professional Painting Boosts Foot Traffic & Sales
A clean, professional paint job increases customer trust and engagement while enhancing curb appeal.

## Pro Painting Construction: Expert NYC Storefront Painters
From meticulous prep to flawless application, professionals ensure your storefront looks its best year-round.
`,
  },
  {
    image: "/assets/waterproofing-painting-before-services.jpeg",
    category: "Waterproofing",
    date: "August 22, 2025",
    title: "Basement Waterproofing for New York Homes – Essential Guide",
    slug: "basement-waterproofing-new-york-homes",
    alt: "Dry, waterproofed basement in a New York home, protected from water damage and mold.",
    description:
      "Protect your New York home with professional basement waterproofing. Learn solutions to prevent leaks & water damage.",
    headings: [
      "Why Waterproofing is Crucial for New York Homes",
      "Common Basement Water Damage Problems in NYC",
      "Interior Waterproofing Solutions: Coatings, French Drains & Sump Pumps",
      "Exterior Waterproofing Solutions: Membranes & Drainage Systems",
      "Professional Basement Waterproofing vs. DIY – Which is Best?",
    ],
    content: `
## Why Waterproofing is Crucial for New York Homes
Wet basements can lead to mold, mildew, and structural damage. Proper waterproofing safeguards your home and health.

## Common Basement Water Damage Problems in NYC
Water can enter through foundation cracks, porous concrete, or poorly sealed joints, especially during heavy rains or snowmelt.

## Interior Waterproofing Solutions: Coatings, French Drains & Sump Pumps
Interior approaches include sealing walls with waterproof coatings, installing French drains, and sump pumps to actively remove water.

## Exterior Waterproofing Solutions: Membranes & Drainage Systems
Exterior waterproofing involves excavating around the foundation, applying waterproof membranes, and installing new drainage systems to stop water at the source.

## Professional Basement Waterproofing vs. DIY – Which is Best?
For serious water intrusion, professional solutions ensure long-term protection and prevent costly repairs in New York homes.
`,
  },
];
