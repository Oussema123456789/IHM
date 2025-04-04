export interface Publication {
  id?: string;
  titre: string;
  description: string;
  prix: number;
  date_pub: string;
  sousCategorieId: string;
  prestataireId: string;
  statut: string;
}