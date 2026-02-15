import { Urgence } from '../types/adressage';

export const URGENCE_LABELS: Record<Urgence, string> = {
  [Urgence.URGENT]: 'Urgent',
  [Urgence.NORMAL]: 'Normal',
  [Urgence.NON_URGENT]: 'Non urgent'
};

export const URGENCE_COLORS: Record<Urgence, string> = {
  [Urgence.URGENT]: 'red',
  [Urgence.NORMAL]: 'blue',
  [Urgence.NON_URGENT]: 'gray'
};
