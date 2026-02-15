export enum Role {
  MEDECIN = 'MEDECIN',
  SECRETARIAT = 'SECRETARIAT',
  ADMIN = 'ADMIN'
}

export interface Medecin {
  id: string;
  username: string;
  email: string;
  nom: string;
  prenom: string;
  rpps?: string;
  specialites: string[];
  telephone?: string;
  doctolibUrl?: string;
  role: Role;
  actif: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MedecinCreateInput {
  username: string;
  email: string;
  password: string;
  nom: string;
  prenom: string;
  rpps?: string;
  specialites: string[];
  telephone?: string;
  doctolibUrl?: string;
  role?: Role;
}

export interface MedecinUpdateInput {
  nom?: string;
  prenom?: string;
  rpps?: string;
  specialites?: string[];
  telephone?: string;
  doctolibUrl?: string;
  actif?: boolean;
}
