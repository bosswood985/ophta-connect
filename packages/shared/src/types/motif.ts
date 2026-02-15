export interface MotifAdressage {
  id: string;
  libelle: string;
  categorie?: string;
  textePrerempli?: string;
  actif: boolean;
  ordre: number;
  createdAt: Date;
}

export interface MotifAdressageCreateInput {
  libelle: string;
  categorie?: string;
  textePrerempli?: string;
  ordre?: number;
}
