export interface Publication {
  id?: string;
  titre: string;
  description: string;
  prix: number;
  date_pub: string;
  region: string;
  sousCategorieId: string;
  prestataireId: string;
  statut: string;
}