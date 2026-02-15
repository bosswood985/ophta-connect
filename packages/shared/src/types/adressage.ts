export enum Urgence {
  URGENT = 'URGENT',
  NORMAL = 'NORMAL',
  NON_URGENT = 'NON_URGENT'
}

export enum StatutAdressage {
  EN_ATTENTE = 'EN_ATTENTE',
  CONTACTE = 'CONTACTE',
  RDV_PRIS = 'RDV_PRIS',
  RAPPELER = 'RAPPELER',
  ANNULE = 'ANNULE',
  TERMINE = 'TERMINE'
}

export enum PriseRdvPar {
  MEDECIN = 'MEDECIN',
  SECRETARIAT = 'SECRETARIAT'
}

export interface Adressage {
  id: string;
  medecinReferentId: string;
  medecinDestinataireId?: string;
  patientId: string;
  motifId: string;
  notes?: string;
  urgence: Urgence;
  statut: StatutAdressage;
  priseRdvPar: PriseRdvPar;
  dateRdv?: Date;
  traitePar?: string;
  traiteA?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdressageCreateInput {
  medecinReferentId: string;
  medecinDestinataireId?: string;
  patientId: string;
  motifId: string;
  notes?: string;
  urgence?: Urgence;
  priseRdvPar?: PriseRdvPar;
  dateRdv?: Date;
}

export interface AdressageUpdateInput {
  medecinDestinataireId?: string;
  notes?: string;
  urgence?: Urgence;
  statut?: StatutAdressage;
  dateRdv?: Date;
  traitePar?: string;
  traiteA?: Date;
}
