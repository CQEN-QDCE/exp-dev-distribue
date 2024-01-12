export interface Service {
    orgId: string;
    nom: string;
    customElementName: string;
    description: string;
    chemin: string;
    version?: string;
    signature?: string;
    url?: string;
    status?: "actif" | "inactif";
    public: boolean;
    healthcheck: string;
    endpointsRelationAffaire?: string;
    endpointDemandeEnCours?: string;
}