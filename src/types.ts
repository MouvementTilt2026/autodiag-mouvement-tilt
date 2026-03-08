export enum RiskTheme {
    ENVIRONNEMENTAL = "Environnemental",
    FINANCEMENT = "Financement et approvisionnement",
    REGLEMENTAIRE = "Réglementaire",
    POLITIQUE = "Politique",
    RH = "RH",
    RP = "RP",
    TECHNOLOGIQUE = "Technologique",
    BENEFICIAIRES = "Pour les bénéficiaires"
}

export enum RiskCategory {
    ENVIRONNEMENTAL = "Environnemental",
    FINANCEMENT = "Financement et approvisionnement",
    REGLEMENTAIRE = "Réglementaire",
    RH = "RH",
    POLITIQUE = "Politique",
    RP = "RP",
    TECHNOLOGIQUE = "Technologique",
    BENEFICIAIRES = "Pour les bénéficiaires"
}

export interface RiskItem {
    id: string;
    category: RiskCategory;
    theme: RiskTheme;
    name: string;
    description: string;
    odds?: number[];
}

export interface RiskAssessment {
    riskId: string;
    probability: number;
    impact: number;
    maturity: number;
    notes: string;
}

export interface ActionLever {
    id: string;
    theme: string;
    category: string;
    name: string;
    details: string;
    isCollective: boolean;
}

export interface ActionLeverAssessment {
    leverId: string;
    status: 'keep' | 'stop' | 'start' | 'none' | 'na';
    importance: number;
    urgency: number;
}

export interface AppState {
    step: 'intro' | 'critique' | 'risks' | 'risk_dashboard' | 'kanban' | 'next_steps';
    assessments: Record<string, RiskAssessment>;
    actionLeverAssessments: Record<string, ActionLeverAssessment>;
}
