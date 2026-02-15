import { z } from 'zod';

export const createPatientSchema = z.object({
  nom: z.string().min(1, 'Le nom est requis'),
  prenom: z.string().min(1, 'Le prénom est requis'),
  dateNaissance: z.string().datetime().optional(),
  telephone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  numeroSecu: z.string().optional(),
});

export const updatePatientSchema = z.object({
  nom: z.string().min(1).optional(),
  prenom: z.string().min(1).optional(),
  dateNaissance: z.string().datetime().optional(),
  telephone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  numeroSecu: z.string().optional(),
});
