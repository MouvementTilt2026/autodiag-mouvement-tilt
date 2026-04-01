import * as XLSX from 'xlsx';
import { RISK_CATALOG, ACTION_LEVERS_CATALOG } from '@/constants';
import { RiskAssessment, ActionLeverAssessment } from '@/types';

const getCriticalityLabel = (score: number) => {
    if (score > 10) return 'Critique';
    if (score > 6) return 'Élevé';
    if (score > 2) return 'Modéré';
    return 'Faible';
};

const getMaturityLabel = (val: number) => {
    const labels: Record<number, string> = {
        1: 'Critique',
        2: 'Vulnérable',
        3: 'Sous Contrôle',
        4: 'Sécurisé'
    };
    return labels[val] || '';
};

export const exportRisksToExcel = (assessments: Record<string, RiskAssessment>) => {
    const data = RISK_CATALOG.map((risk, index) => {
        const a = assessments[risk.id] || { probability: 1, impact: 1, maturity: 1 };
        const score = Math.round((a.probability * a.impact / a.maturity) * 10) / 10;
        return {
            'N°': index + 1,
            'Catégorie': risk.category,
            'Thématique': risk.theme,
            'Risque': risk.name,
            'Description': risk.description,
            'Fréquence (F)': a.probability,
            'Gravité (G)': a.impact,
            'Maturité (M)': a.maturity,
            'Niveau de maturité': getMaturityLabel(a.maturity),
            'Score de criticité': score,
            'Niveau de risque': getCriticalityLabel(score),
        };
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    
    // Set column widths
    ws['!cols'] = [
        { wch: 5 }, { wch: 25 }, { wch: 20 }, { wch: 40 }, { wch: 50 },
        { wch: 14 }, { wch: 12 }, { wch: 12 }, { wch: 18 }, { wch: 18 }, { wch: 16 }
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Évaluation des risques');
    XLSX.writeFile(wb, 'RobustAsso_Evaluation_Risques.xlsx');
};

export const exportDashboardToExcel = (assessments: Record<string, RiskAssessment>) => {
    const wb = XLSX.utils.book_new();

    // Sheet 1: All risks with scores
    const risksData = RISK_CATALOG.map((risk, index) => {
        const a = assessments[risk.id] || { probability: 1, impact: 1, maturity: 1 };
        const score = Math.round((a.probability * a.impact / a.maturity) * 10) / 10;
        return {
            'N°': index + 1,
            'Catégorie': risk.category,
            'Risque': risk.name,
            'Fréquence': a.probability,
            'Gravité': a.impact,
            'Maturité': a.maturity,
            'Score': score,
            'Niveau': getCriticalityLabel(score),
        };
    });
    const ws1 = XLSX.utils.json_to_sheet(risksData);
    ws1['!cols'] = [{ wch: 5 }, { wch: 25 }, { wch: 40 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 8 }, { wch: 12 }];
    XLSX.utils.book_append_sheet(wb, ws1, 'Tous les risques');

    // Sheet 2: Top 10
    const sorted = [...risksData].sort((a, b) => b.Score - a.Score).slice(0, 10);
    const ws2 = XLSX.utils.json_to_sheet(sorted.map((r, i) => ({ 'Priorité': i + 1, ...r })));
    XLSX.utils.book_append_sheet(wb, ws2, 'Top 10 priorités');

    // Sheet 3: Summary by theme
    const themes = Array.from(new Set(RISK_CATALOG.map(r => r.theme)));
    const themeSummary = themes.map(theme => {
        const themeRisks = RISK_CATALOG.filter(r => r.theme === theme);
        const scores = themeRisks.map(r => {
            const a = assessments[r.id] || { probability: 1, impact: 1, maturity: 1 };
            return (a.probability * a.impact) / a.maturity;
        });
        const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
        return {
            'Thématique': theme,
            'Nombre de risques': themeRisks.length,
            'Score moyen': Math.round(avg * 10) / 10,
            'Niveau moyen': getCriticalityLabel(avg),
        };
    });
    const ws3 = XLSX.utils.json_to_sheet(themeSummary);
    ws3['!cols'] = [{ wch: 30 }, { wch: 18 }, { wch: 14 }, { wch: 14 }];
    XLSX.utils.book_append_sheet(wb, ws3, 'Synthèse par thématique');

    XLSX.writeFile(wb, 'RobustAsso_Tableau_de_Bord.xlsx');
};

export const exportLeversToExcel = (assessments: Record<string, ActionLeverAssessment>) => {
    const statusLabels: Record<string, string> = {
        'keep': 'Action réalisée et fonctionnelle',
        'stop': 'Action réalisée mais non fonctionnelle',
        'start': 'Action à faire',
        'na': 'Non concerné',
        'none': 'Non évalué'
    };

    const data = ACTION_LEVERS_CATALOG.map((lever, index) => {
        const a = assessments[lever.id] || { status: 'none', importance: 1, urgency: 1 };
        return {
            'N°': index + 1,
            'Catégorie': lever.category,
            'Thématique': lever.theme,
            'Levier': lever.name,
            'Détails': lever.details,
            'État des lieux': statusLabels[a.status] || 'Non évalué',
            'Importance': a.importance,
            'Urgence': a.urgency,
            'Score (I × U)': a.importance * a.urgency,
            'Action collective': lever.isCollective ? 'Oui' : 'Non',
        };
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    ws['!cols'] = [
        { wch: 5 }, { wch: 30 }, { wch: 20 }, { wch: 40 }, { wch: 60 },
        { wch: 35 }, { wch: 12 }, { wch: 10 }, { wch: 14 }, { wch: 16 }
    ];
    XLSX.utils.book_append_sheet(wb, ws, 'Leviers d\'action');

    XLSX.writeFile(wb, 'RobustAsso_Leviers_Action.xlsx');
};
