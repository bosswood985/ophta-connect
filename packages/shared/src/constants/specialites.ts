export const SPECIALITES = [
  'Ophtalmologie générale',
  'Chirurgie de la cataracte',
  'Chirurgie réfractive',
  'Glaucome',
  'Rétine médicale',
  'Rétine chirurgicale',
  'Strabologie',
  'Ophtalmologie pédiatrique',
  'Neuro-ophtalmologie',
  'Oculoplastie',
  'Contactologie',
  'Basse vision'
] as const;

export type Specialite = typeof SPECIALITES[number];
