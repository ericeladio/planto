import { ALL_PLANTS } from '../data/plants'

const PLANT_ID_MAP = new Map<string, number>()
ALL_PLANTS.forEach((p, i) => {
  if (p.slug) PLANT_ID_MAP.set(p.slug, i + 1)
})

export function getPlantId(slug?: string): number {
  if (slug && PLANT_ID_MAP.has(slug)) return PLANT_ID_MAP.get(slug)!
  return 0
}
