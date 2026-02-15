import { z } from 'zod';

export const createAdressageSchema = z.object({
  medecinReferentId: z.string().uuid(),
  medecinDestinataireId: z.string().uuid().optional(),
  patientId: z.string().uuid(),
  motifId: z.string().uuid(),
  notes: z.string().optional(),
  urgence: z.enum(['URGENT', 'NORMAL', 'NON_URGENT']).optional(),
  priseRdvPar: z.enum(['MEDECIN', 'SECRETARIAT']).optional(),
  dateRdv: z.string().datetime().optional(),
});

export const updateAdressageSchema = z.object({
  medecinDestinataireId: z.string().uuid().optional(),
  notes: z.string().optional(),
  urgence: z.enum(['URGENT', 'NORMAL', 'NON_URGENT']).optional(),
  statut: z.enum(['EN_ATTENTE', 'CONTACTE', 'RDV_PRIS', 'RAPPELER', 'ANNULE', 'TERMINE']).optional(),
  dateRdv: z.string().datetime().optional(),
  traitePar: z.string().optional(),
});

export const updateStatutSchema = z.object({
  statut: z.enum(['EN_ATTENTE', 'CONTACTE', 'RDV_PRIS', 'RAPPELER', 'ANNULE', 'TERMINE']),
  traitePar: z.string().optional(),
});
