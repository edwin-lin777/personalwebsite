export type Photo = {
  id: string;
  src: string;
  caption: string;
  alt: string;
  collection: "Japan & China" | "Hikes with friends" | "With friends";
  crop: { x: number; y: number; width: number; height: number };
  sampleExposure?: { aperture: string; shutter: string; iso: number };
};

// Original supplied collage sheets, framed in CSS without changing the source files.
// Coordinates refer to the 2000 × 1600 sheets. Captions describe scenes, not inferred locations.
function frame(id: string, sheet: number, caption: string, alt: string, collection: Photo["collection"], x: number, y: number, width: number, height: number): Photo {
  return { id, src: `/photos/${sheet}.png`, caption, alt, collection, crop: { x, y, width, height } };
}

export const photos: Photo[] = [
  frame("train", 1, "Last train", "A brightly lit train passing through the city at night", "Japan & China", 161, 296, 760, 1143),
  frame("tower", 1, "Blue hour", "An illuminated tower against blue clouds and an orange sunset", "Japan & China", 1078, 296, 761, 1143),
  frame("street", 2, "Side streets", "Blue light spilling onto a quiet street lined with illuminated signs", "Japan & China", 161, 298, 760, 1141),
  frame("car", 3, "Night drive", "A white sports car on a dark road beneath a pedestrian bridge", "Japan & China", 161, 296, 760, 1143),
  frame("trails", 3, "Light trails", "White and red light trails following the curve of a road at night", "Japan & China", 1078, 296, 761, 1143),
  frame("overhead", 6, "From above", "An overhead view of streets and buildings lit at night", "Japan & China", 1204, 296, 694, 442),
  frame("building", 6, "Warm windows", "A tiled-roof building illuminated by warm lights at night", "Japan & China", 1204, 858, 694, 449),
  frame("shore", 6, "By the water", "Two figures along the shoreline as the sun sets over the water", "Hikes with friends", 116, 485, 993, 667),
  frame("railway", 2, "Around the bend", "Railway tracks curving past a signal and greenery", "Hikes with friends", 1089, 313, 749, 1126),
  frame("waterside", 5, "An unhurried afternoon", "A friend sitting by sunlit water framed by leaves", "Hikes with friends", 161, 225, 669, 1277),
  frame("viewpoint", 5, "A little further up", "Friends looking out over mountains and a lake from a rocky viewpoint", "Hikes with friends", 1142, 225, 736, 431),
  frame("forest", 5, "Taking the long way", "Friends walking along a sunlit forest trail", "Hikes with friends", 1142, 660, 736, 434),
  frame("table", 4, "Around the table", "Friends gathered around a wooden table playing cards", "With friends", 161, 161, 1003, 614),
  frame("mirror", 4, "Everyone in the frame", "A group of friends posing together for a mirror photograph", "With friends", 845, 777, 994, 662),
  frame("picnic", 5, "A break on the trail", "Friends resting around a picnic table in the forest", "With friends", 1142, 1099, 736, 434),
];

// Illustrative settings requested by Edwin; these are not extracted EXIF.
const sampleExposures: Record<string, NonNullable<Photo["sampleExposure"]>> = {
  train: { aperture: "f/2", shutter: "1/125 s", iso: 1600 },
  tower: { aperture: "f/4", shutter: "1/125 s", iso: 800 },
  car: { aperture: "f/2", shutter: "1/60 s", iso: 1600 },
  trails: { aperture: "f/8", shutter: "4 s", iso: 125 },
  railway: { aperture: "f/5.6", shutter: "1/250 s", iso: 400 },
  waterside: { aperture: "f/2.8", shutter: "1/500 s", iso: 125 },
};
for (const photo of photos) photo.sampleExposure = sampleExposures[photo.id];

export const photoCollections = ["Japan & China", "Hikes with friends", "With friends"] as const;
export const featuredPhoto = photos.find(photo => photo.id === "shore")!;
