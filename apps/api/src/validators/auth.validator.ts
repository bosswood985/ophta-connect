import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères'),
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  nom: z.string().min(1, 'Le nom est requis'),
  prenom: z.string().min(1, 'Le prénom est requis'),
  rpps: z.string().optional(),
  specialites: z.array(z.string()),
  telephone: z.string().optional(),
  doctolibUrl: z.string().url().optional().or(z.literal('')),
  role: z.enum(['MEDECIN', 'SECRETARIAT', 'ADMIN']).optional(),
});

export const loginSchema = z.object({
  username: z.string().min(1, 'Le nom d\'utilisateur est requis'),
  password: z.string().min(1, 'Le mot de passe est requis'),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Le token de rafraîchissement est requis'),
});
