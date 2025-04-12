export interface Utilisateur {
    id?: number;
    email: string;
    mdp: string;
    role: string;
    nom?: string;
    bloque?: boolean;

    avatarUrl?: string;
    

  }