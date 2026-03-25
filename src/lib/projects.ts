export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  coverImage: string;
  images: string[];
  aspectRatio: "portrait" | "landscape" | "square";
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "urban-silence",
    title: "Urban Silence",
    category: "Architecture",
    year: "2024",
    description:
      "A meditative series exploring the geometry of empty cities at dawn, where concrete and light conspire to create fleeting moments of stillness.",
    coverImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=85",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600&q=85",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&q=85",
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1600&q=85",
    ],
    aspectRatio: "portrait",
  },
  {
    id: "2",
    slug: "light-and-form",
    title: "Light & Form",
    category: "Abstract",
    year: "2024",
    description:
      "Shadow becomes subject. Form dissolves into gradient. A study of natural light as it sculpts the ordinary into the extraordinary.",
    coverImage: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=1600&q=85",
      "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=1600&q=85",
      "https://images.unsplash.com/photo-1494059980473-813e73ee784b?w=1600&q=85",
    ],
    aspectRatio: "landscape",
  },
  {
    id: "3",
    slug: "portraits-of-solitude",
    title: "Portraits of Solitude",
    category: "Portraiture",
    year: "2023",
    description:
      "Intimate encounters with strangers who opened their solitude to the camera. Each face a universe of unspoken stories.",
    coverImage: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1600&q=85",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1600&q=85",
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=1600&q=85",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=85",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1600&q=85",
    ],
    aspectRatio: "portrait",
  },
  {
    id: "4",
    slug: "the-sea-at-dusk",
    title: "The Sea at Dusk",
    category: "Landscape",
    year: "2023",
    description:
      "Long exposures transform the Atlantic into silk. Time collapses into a single frame. The horizon breathes.",
    coverImage: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1600&q=85",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=85",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=85",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1600&q=85",
    ],
    aspectRatio: "landscape",
  },
  {
    id: "5",
    slug: "still-life-studies",
    title: "Still Life Studies",
    category: "Still Life",
    year: "2023",
    description:
      "Objects stripped of context. A glass, a petal, a shadow. The quiet profundity of things at rest.",
    coverImage: "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?w=1600&q=85",
      "https://images.unsplash.com/photo-1530023367847-a683933f4172?w=1600&q=85",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1600&q=85",
    ],
    aspectRatio: "square",
  },
  {
    id: "6",
    slug: "neon-rain",
    title: "Neon Rain",
    category: "Street",
    year: "2022",
    description:
      "Tokyo after midnight in the rain. Reflections multiply the city into infinite versions of itself. Every puddle a portal.",
    coverImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1600&q=85",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1600&q=85",
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=1600&q=85",
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1600&q=85",
    ],
    aspectRatio: "portrait",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
