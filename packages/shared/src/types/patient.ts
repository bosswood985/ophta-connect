export interface Patient {
  id: string;
  nom: string;
  prenom: string;
  dateNaissance?: Date;
  telephone?: string;
  email?: string;
  numeroSecu?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PatientCreateInput {
  nom: string;
  prenom: string;
  dateNaissance?: Date;
  telephone?: string;
  email?: string;
  numeroSecu?: string;
}

export interface PatientUpdateInput {
  nom?: string;
  prenom?: string;
  dateNaissance?: Date;
  telephone?: string;
  email?: string;
  numeroSecu?: string;
}
