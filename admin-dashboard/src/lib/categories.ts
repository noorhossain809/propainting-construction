// Predefined project categories. "Others" (handled in the form) lets an
// admin type a custom category that is stored as free text.
export const PROJECT_CATEGORIES = [
  { value: "interior", label: "Interior" },
  { value: "painting", label: "Painting" },
  { value: "water-proofing", label: "Water Proofing" },
  { value: "wall-paper-hanging", label: "Wall Paper Hanging" },
  { value: "roofing", label: "Roofing" },
  { value: "steam-cleaning", label: "Steam Cleaning" },
  { value: "exterior", label: "Exterior" },
  { value: "commercial", label: "Commercial" },
  { value: "office", label: "Office" },
  { value: "building", label: "Building" },
] as const;

export const PROJECT_CATEGORY_VALUES: string[] = PROJECT_CATEGORIES.map(
  (c) => c.value
);

// Predefined project types. "Others" lets an admin type a custom type.
export const PROJECT_TYPES = [
  { value: "Interior Painting", label: "Interior Painting" },
  { value: "Exterior Painting", label: "Exterior Painting" },
  { value: "Commercial Painting", label: "Commercial Painting" },
  { value: "Renovation", label: "Renovation" },
  { value: "Waterproofing", label: "Waterproofing" },
  { value: "Wallpaper Hanging", label: "Wallpaper Hanging" },
  { value: "Roofing", label: "Roofing" },
  { value: "Steam Cleaning", label: "Steam Cleaning" },
] as const;

export const PROJECT_TYPE_VALUES: string[] = PROJECT_TYPES.map((t) => t.value);
