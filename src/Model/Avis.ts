export interface Avis {
  id?: string; // auto-incrémenté par json-server
  id_user: string;
  id_publication: string;
  commentaire: string;
  note: number; // entre 1 et 5
}