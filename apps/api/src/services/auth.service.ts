import prisma from '../config/database';
import { hashPassword, comparePassword } from '../utils/encryption';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { AuthTokens, JwtPayload } from '@ophta-connect/shared';

export class AuthService {
  async register(data: {
    username: string;
    email: string;
    password: string;
    nom: string;
    prenom: string;
    rpps?: string;
    specialites: string[];
    telephone?: string;
    doctolibUrl?: string;
    role?: 'MEDECIN' | 'SECRETARIAT' | 'ADMIN';
  }): Promise<{ medecin: any; tokens: AuthTokens }> {
    const existingUser = await prisma.medecin.findFirst({
      where: {
        OR: [{ username: data.username }, { email: data.email }],
      },
    });

    if (existingUser) {
      throw new Error('Nom d\'utilisateur ou email déjà utilisé');
    }

    const passwordHash = await hashPassword(data.password);

    const medecin = await prisma.medecin.create({
      data: {
        username: data.username,
        email: data.email,
        passwordHash,
        nom: data.nom,
        prenom: data.prenom,
        rpps: data.rpps,
        specialites: data.specialites,
        telephone: data.telephone,
        doctolibUrl: data.doctolibUrl,
        role: data.role || 'MEDECIN',
      },
    });

    const payload: JwtPayload = {
      userId: medecin.id,
      username: medecin.username,
      role: medecin.role,
    };

    const tokens: AuthTokens = {
      accessToken: generateAccessToken(payload),
      refreshToken: generateRefreshToken(payload),
    };

    return { medecin, tokens };
  }

  async login(username: string, password: string): Promise<{ medecin: any; tokens: AuthTokens }> {
    const medecin = await prisma.medecin.findUnique({
      where: { username },
    });

    if (!medecin || !medecin.actif) {
      throw new Error('Identifiants invalides');
    }

    const isPasswordValid = await comparePassword(password, medecin.passwordHash);

    if (!isPasswordValid) {
      throw new Error('Identifiants invalides');
    }

    const payload: JwtPayload = {
      userId: medecin.id,
      username: medecin.username,
      role: medecin.role,
    };

    const tokens: AuthTokens = {
      accessToken: generateAccessToken(payload),
      refreshToken: generateRefreshToken(payload),
    };

    return { medecin, tokens };
  }

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    try {
      const payload = verifyRefreshToken(refreshToken);

      const medecin = await prisma.medecin.findUnique({
        where: { id: payload.userId },
      });

      if (!medecin || !medecin.actif) {
        throw new Error('Utilisateur invalide');
      }

      const newPayload: JwtPayload = {
        userId: medecin.id,
        username: medecin.username,
        role: medecin.role,
      };

      return {
        accessToken: generateAccessToken(newPayload),
        refreshToken: generateRefreshToken(newPayload),
      };
    } catch (error) {
      throw new Error('Token de rafraîchissement invalide');
    }
  }
}

export const authService = new AuthService();
