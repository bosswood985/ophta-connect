import { StatutAdressage } from '../types/adressage';

export const STATUT_LABELS: Record<StatutAdressage, string> = {
  [StatutAdressage.EN_ATTENTE]: 'En attente',
  [StatutAdressage.CONTACTE]: 'Contacté',
  [StatutAdressage.RDV_PRIS]: 'RDV pris',
  [StatutAdressage.RAPPELER]: 'À rappeler',
  [StatutAdressage.ANNULE]: 'Annulé',
  [StatutAdressage.TERMINE]: 'Terminé'
};

export const STATUT_COLORS: Record<StatutAdressage, string> = {
  [StatutAdressage.EN_ATTENTE]: 'yellow',
  [StatutAdressage.CONTACTE]: 'blue',
  [StatutAdressage.RDV_PRIS]: 'green',
  [StatutAdressage.RAPPELER]: 'orange',
  [StatutAdressage.ANNULE]: 'red',
  [StatutAdressage.TERMINE]: 'gray'
};
