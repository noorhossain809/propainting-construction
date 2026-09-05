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
