import React, { useMemo, useState } from 'react';
import { RISK_CATALOG, COLORS } from '@/constants';
import { RiskAssessment, RiskTheme, RiskCategory } from '@/types';
import { AlertTriangle, ArrowRight, Target, TrendingUp, Zap, ShieldCheck, Info, LayoutDashboard, BarChart3, PieChart as PieChartIcon, Activity, Download, FileSpreadsheet, ChevronDown } from 'lucide-react';
import { exportDashboardToExcel } from '@/lib/excelExport';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
    PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

interface RiskMatrixProps {
    assessments: Record<string, RiskAssessment>;
    onNext?: () => void;
}

const RiskMatrix: React.FC<RiskMatrixProps> = ({ assessments, onNext }) => {
    const [showComprehension, setShowComprehension] = useState(false);
    const [showLexique, setShowLexique] = useState(false);

    const riskData = Object.values(assessments) as RiskAssessment[];

    const topRisks = useMemo(() => {
        return [...riskData]
            .filter(a => !(a.probability === 1 && a.impact === 1))
            .sort((a, b) => ((b.probability * b.impact) / b.maturity) - ((a.probability * a.impact) / a.maturity))
            .slice(0, 10);
    }, [riskData]);

    const themeData = useMemo(() => {
        return Object.values(RiskTheme).map(theme => {
            const themeRisks = RISK_CATALOG.filter(r => r.theme === theme);
            const themeAssessments = themeRisks.map(tr => assessments[tr.id]).filter(Boolean).filter(a => !(a.probability === 1 && a.impact === 1));
            if (themeAssessments.length === 0) return { name: theme, score: 0, gxf: 0, count: 0 };
            const avgScore = themeAssessments.reduce((acc, curr) => acc + ((curr.probability * curr.impact) / curr.maturity), 0) / themeAssessments.length;
            const avgGxF = themeAssessments.reduce((acc, curr) => acc + (curr.probability * curr.impact), 0) / themeAssessments.length;
            return { name: theme.replace('Choc ', ''), score: Math.round(avgScore * 10) / 10, gxf: Math.round(avgGxF * 10) / 10, count: themeAssessments.length };
        }).filter(t => t.count > 0);
    }, [assessments]);

    const maturityByTheme = useMemo(() => {
        return Object.values(RiskTheme).map(theme => {
            const themeRisks = RISK_CATALOG.filter(r => r.theme === theme);
            const themeAssessments = themeRisks.map(tr => assessments[tr.id]).filter(Boolean).filter(a => !(a.probability === 1 && a.impact === 1));
            if (themeAssessments.length === 0) return null;
            const avgMaturity = themeAssessments.reduce((acc, curr) => acc + curr.maturity, 0) / themeAssessments.length;
            return { name: theme.replace('Choc ', ''), maturity: Math.round(avgMaturity * 10) / 10, count: themeAssessments.length };
        }).filter(Boolean) as { name: string; maturity: number; count: number }[];
    }, [assessments]);

    const getMaturityLabel = (m: number) => {
        if (m >= 3.5) return { label: 'Sécurisé', color: '#9DB280' };
        if (m >= 2.5) return { label: 'Sous contrôle', color: '#D09639' };
        if (m >= 1.5) return { label: 'Vulnérable', color: '#E18392' };
        return { label: 'Critique', color: '#BC5B2E' };
    };

    const riskWithNumbers = useMemo(() => RISK_CATALOG.map((risk, index) => ({
        ...risk, number: index + 1, assessment: assessments[risk.id]
    })).filter(r => r.assessment), [assessments]);

    const filteredRiskWithNumbers = useMemo(() => riskWithNumbers.filter(r => !(r.assessment.probability === 1 && r.assessment.impact === 1)), [riskWithNumbers]);

    const envRisks = useMemo(() => filteredRiskWithNumbers.filter(r => r.theme === RiskTheme.ENVIRONNEMENTAL), [filteredRiskWithNumbers]);
    const systemicRisks = useMemo(() => filteredRiskWithNumbers.filter(r => r.theme !== RiskTheme.ENVIRONNEMENTAL), [filteredRiskWithNumbers]);

    const getRiskBrutLabel = (gxf: number) => {
        if (gxf >= 12) return { label: 'Critique', color: '#BC5B2E' };
        if (gxf >= 8) return { label: 'Élevé', color: '#E18392' };
        if (gxf >= 4) return { label: 'Modéré', color: '#D09639' };
        return { label: 'Faible', color: '#9DB280' };
    };

    const getCriticalityLabel = (score: number) => {
        if (score > 10) return { label: 'Critique', color: '#BC5B2E' };
        if (score > 6) return { label: 'Élevé', color: '#E18392' };
        if (score > 2) return { label: 'Modéré', color: '#D09639' };
        return { label: 'Faible', color: '#9DB280' };
    };

    const globalGxF = useMemo(() => {
        if (themeData.length === 0) return 0;
        return Math.round(themeData.reduce((acc, t) => acc + t.gxf, 0) / themeData.length * 10) / 10;
    }, [themeData]);

    const globalCriticality = useMemo(() => {
        if (themeData.length === 0) return 0;
        return Math.round(themeData.reduce((acc, t) => acc + t.score, 0) / themeData.length * 10) / 10;
    }, [themeData]);

    const MatrixGrid = ({ risks }: { risks: any[] }) => (
        <div className="w-full max-w-md mx-auto" style={{ overflow: 'visible' }}>
            <div className="grid grid-cols-[30px_1fr] grid-rows-[1fr_30px] gap-1 aspect-square relative" style={{ overflow: 'visible' }}>
                <div className="absolute -left-10 top-1/2 -translate-y-1/2 -rotate-90 text-[9px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap hidden md:block">
                    Gravité
                </div>
                <div className="flex flex-col justify-around items-end pr-2 text-[10px] font-bold text-slate-500">
                    <span>4</span><span>3</span><span>2</span><span>1</span>
                </div>
                <div className="border-l-2 border-b-2 border-[#1A2F2F] grid grid-cols-4 grid-rows-4 rounded-tr-xl" style={{ overflow: 'visible' }}>
                    {[4, 3, 2, 1].map((row) => (
                        [1, 2, 3, 4].map((col) => {
                            const risksInCell = risks.filter(r => r.assessment.impact === row && r.assessment.probability === col);
                            const bgColor = row * col >= 12 ? 'bg-[#BC5B2E]/20' : row * col >= 6 ? 'bg-[#D09639]/20' : 'bg-[#C3FD97]/20';
                            return (
                                <div key={`${row}-${col}`} className={`border border-white/40 flex flex-wrap items-center justify-center p-0.5 ${bgColor} transition-colors`} style={{ overflow: 'visible' }}>
                                    {risksInCell.map((r: any, i: number) => {
                                        const criticality = Math.round(((r.assessment.probability * r.assessment.impact) / r.assessment.maturity) * 10) / 10;
                                        const dotSize = 16 + ((5 - r.assessment.maturity) * 5);
                                        return (
                                            <div key={i} className="rounded-full shadow-md m-0.5 cursor-help group relative transition-all hover:scale-125 hover:z-50 flex items-center justify-center text-[8px] font-bold text-white shrink-0"
                                                style={{ width: `${dotSize}px`, height: `${dotSize}px`,
                                                    backgroundColor: criticality > 10 ? '#BC5B2E' : criticality > 6 ? '#E18392' : criticality > 2 ? '#D09639' : '#9DB280',
                                                    border: '2px solid rgba(255,255,255,0.9)', overflow: 'visible' }}>
                                                {r.number}
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:block w-48 p-3 bg-[#1A2F2F] text-white text-[10px] rounded-xl shadow-2xl ring-1 ring-white/20"
                                                    style={{ zIndex: 9999 }}>
                                                    <div className="font-bold border-b border-white/10 pb-2 mb-2 leading-tight">{r.name}</div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="opacity-70">G:{r.assessment.impact} F:{r.assessment.probability} M:{r.assessment.maturity}</span>
                                                        <span className="bg-white/10 px-2 py-0.5 rounded-md font-bold">Score: {criticality}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })
                    ))}
                </div>
                <div />
                <div className="flex justify-around items-start pt-2 text-[10px] font-bold text-slate-500">
                    <span>1</span><span>2</span><span>3</span><span>4</span>
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                    Fréquence
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1A2F2F] flex items-center gap-3">
                        <LayoutDashboard className="text-[#9DB280]" /> Tableau de bord des risques
                    </h2>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => {
                                setShowComprehension(true);
                                setShowLexique(true);
                                setTimeout(() => window.print(), 300);
                            }}
                            className="flex items-center gap-2 px-5 py-3 bg-[#1A2F2F] text-white rounded-xl font-bold hover:bg-[#335353] transition-all shadow-lg text-sm shrink-0 no-print"
                        >
                            <Download size={18} /> PDF
                        </button>
                        <button 
                            onClick={() => exportDashboardToExcel(assessments)}
                            className="flex items-center gap-2 px-5 py-3 bg-[#9DB280] text-white rounded-xl font-bold hover:bg-[#8DA270] transition-all shadow-lg text-sm shrink-0 no-print"
                        >
                            <FileSpreadsheet size={18} /> Excel
                        </button>
                    </div>
                </div>

                {/* Comprendre la matrice + Lexique - collapsible on screen, always visible in print */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    <div className="bg-[#E1E4D1]/30 rounded-3xl border border-[#9DB280]/20 overflow-hidden">
                        <button 
                            onClick={() => setShowComprehension(!showComprehension)}
                            className="w-full p-6 flex items-center justify-between text-left no-print"
                        >
                            <h3 className="text-lg font-bold text-[#1A2F2F] flex items-center gap-2">
                                <Info size={18} className="text-[#9DB280]" /> Comprendre la matrice
                            </h3>
                            <ChevronDown size={20} className={`text-slate-400 transition-transform ${showComprehension ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`${showComprehension ? 'block' : 'hidden'} print:!block px-6 pb-6`}>
                            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                                <p>La matrice croise la <strong>Gravité</strong> (axe vertical) et la <strong>Fréquence</strong> (axe horizontal).</p>
                                <p>Chaque point représente un risque identifié. Sa <strong>couleur</strong> indique sa criticité finale (G × F / M) :</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li><span className="font-bold text-[#9DB280]">Vert</span> : faible (≤ 2). Risque maîtrisé.</li>
                                    <li><span className="font-bold text-[#D09639]">Orange</span> : modéré (&gt; 2 à 6). Risque à surveiller.</li>
                                    <li><span className="font-bold text-[#E18392]">Rose</span> : élevé (&gt; 6 à 10). Action nécessaire.</li>
                                    <li><span className="font-bold text-[#BC5B2E]">Rouge</span> : critique (&gt; 10). Priorité absolue.</li>
                                </ul>
                                <p>La <strong>taille du point</strong> reflète votre maturité : plus le point est gros, moins vous êtes mature face à ce risque (1 = critique, 4 = sécurisé).</p>
                            </div>
                        </div>
                        {/* Print-only: always show title */}
                        <div className="hidden print:block p-6">
                            <h3 className="text-lg font-bold text-[#1A2F2F] flex items-center gap-2 mb-4">
                                <Info size={18} className="text-[#9DB280]" /> Comprendre la matrice
                            </h3>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden">
                        <button 
                            onClick={() => setShowLexique(!showLexique)}
                            className="w-full p-6 flex items-center justify-between text-left no-print"
                        >
                            <h5 className="text-sm font-bold text-[#1A2F2F] uppercase tracking-wider">Lexique des risques positionnés</h5>
                            <ChevronDown size={20} className={`text-slate-400 transition-transform ${showLexique ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`${showLexique ? 'block' : 'hidden'} print:!block px-6 pb-6`}>
                            <div className="space-y-6">
                                {[
                                    { title: "Risques environnementaux", risks: envRisks },
                                    { title: "Chocs systémiques", subtitle: "Financement, Réglementaires, RH, Image, Technologiques, Bénéficiaires", risks: systemicRisks },
                                ].map((group, idx) => (
                                    <div key={idx}>
                                        <h6 className="text-xs font-bold text-[#9DB280] uppercase tracking-widest mb-2">{group.title}</h6>
                                        {group.subtitle && <p className="text-[10px] text-slate-400 mb-2">{group.subtitle}</p>}
                                        <div className="space-y-1">
                                            {group.risks.map(r => (
                                                <div key={r.id} className="flex items-start gap-2 text-sm leading-tight py-1 border-b border-slate-200/50 last:border-0">
                                                    <span className="font-bold text-[#1A2F2F] shrink-0 w-5">{r.number}.</span>
                                                    <span className="text-slate-600">{r.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Print-only: always show title */}
                        <div className="hidden print:block p-6">
                            <h5 className="text-sm font-bold text-[#1A2F2F] uppercase tracking-wider mb-4">Lexique des risques positionnés</h5>
                        </div>
                    </div>
                </div>

                {/* 3 Matrices */}
                <div className="space-y-16 mb-16">
                    {[
                        { title: "Matrice 1 : Risques environnementaux", risks: envRisks },
                        { title: "Matrice 2 : Chocs systémiques", subtitle: "(Financement, Réglementaires, RH, Image & Controverses, Technologiques, Bénéficiaires)", risks: systemicRisks },
                    ].map((matrix, idx) => (
                        <div key={idx} className="space-y-6" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                            <div className="text-center">
                                <h3 className="text-lg md:text-xl font-bold text-[#1A2F2F] mb-1">{matrix.title}</h3>
                                {matrix.subtitle && <p className="text-sm text-slate-500">{matrix.subtitle}</p>}
                            </div>
                            <MatrixGrid risks={matrix.risks} />
                        </div>
                    ))}

                    {/* Légendes */}
                    <div className="flex flex-col items-center gap-3 pt-6">
                        <div className="flex flex-wrap items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100 w-full max-w-md">
                            <span className="text-[9px] font-bold text-slate-400 uppercase">Couleur = score de criticité :</span>
                            <div className="flex items-center gap-4 flex-wrap">
                                {[
                                    { color: '#9DB280', label: 'Vert : faible (≤2)' },
                                    { color: '#D09639', label: 'Orange : modéré (>2-6)' },
                                    { color: '#E18392', label: 'Rose : élevé (>6-10)' },
                                    { color: '#BC5B2E', label: 'Rouge : critique (>10)' },
                                ].map((l, i) => (
                                    <div key={i} className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }}></div>
                                        <span className="text-[9px] font-bold text-slate-600">{l.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100 w-full max-w-md">
                            <span className="text-[9px] font-bold text-slate-400 uppercase">Taille du point = niveau de maturité :</span>
                            <div className="flex items-center gap-3 flex-wrap">
                                <div className="flex items-center gap-1"><div className="w-6 h-6 bg-slate-400 rounded-full"></div> <span className="text-[9px]">Critique (1)</span></div>
                                <div className="flex items-center gap-1"><div className="w-5 h-5 bg-slate-400 rounded-full"></div> <span className="text-[9px]">Vulnérable (2)</span></div>
                                <div className="flex items-center gap-1"><div className="w-3.5 h-3.5 bg-slate-400 rounded-full"></div> <span className="text-[9px]">Sous Contrôle (3)</span></div>
                                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-slate-400 rounded-full"></div> <span className="text-[9px]">Sécurisé (4)</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Row 1: G×F (left) + Maturité (right) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Évaluation du risque brut (G × F) */}
                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                        <h3 className="text-lg font-bold text-[#1A2F2F] mb-6 flex items-center gap-2">
                            <Zap size={20} className="text-[#D09639]" /> Évaluation du risque brut (G × F)
                        </h3>
                        <p className="text-xs text-slate-500 mb-4">Score = Gravité × Fréquence (sans pondération maturité)</p>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={themeData} layout="vertical" margin={{ left: 20, right: 30 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }} />
                                    <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                    <Bar dataKey="gxf" name="Risque brut (G×F)" radius={[0, 4, 4, 0]}>
                                        {themeData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.gxf > 12 ? '#BC5B2E' : entry.gxf > 8 ? '#E18392' : entry.gxf > 4 ? '#D09639' : '#9DB280'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        {themeData.length > 0 && (() => {
                            const { label, color } = getRiskBrutLabel(globalGxF);
                            return (
                                <div className="mt-6 p-4 rounded-2xl border-2 flex items-center gap-4" style={{ borderColor: color, backgroundColor: `${color}10` }}>
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0" style={{ backgroundColor: color }}>
                                        {globalGxF}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#1A2F2F]">Risque brut global : <span style={{ color }}>{label}</span></p>
                                        <p className="text-xs text-slate-500">Moyenne du score G × F sur l'ensemble des thématiques évaluées.</p>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>

                    {/* Maturité moyenne par thématique */}
                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                        <h3 className="text-lg font-bold text-[#1A2F2F] mb-6 flex items-center gap-2">
                            <ShieldCheck size={20} className="text-[#9DB280]" /> Maturité moyenne par thématique
                        </h3>
                        <p className="text-xs text-slate-500 mb-4">Niveau moyen de maturité (1 = critique, 4 = sécurisé)</p>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={maturityByTheme} layout="vertical" margin={{ left: 20, right: 30 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                                    <XAxis type="number" domain={[0, 4]} ticks={[1, 2, 3, 4]} tick={{ fontSize: 10 }} />
                                    <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }} />
                                    <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                    <Bar dataKey="maturity" name="Maturité moyenne" radius={[0, 4, 4, 0]}>
                                        {maturityByTheme.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={getMaturityLabel(entry.maturity).color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        {maturityByTheme.length > 0 && (() => {
                            const globalMaturity = Math.round(maturityByTheme.reduce((acc, t) => acc + t.maturity, 0) / maturityByTheme.length * 10) / 10;
                            const { label, color } = getMaturityLabel(globalMaturity);
                            return (
                                <div className="mt-6 p-4 rounded-2xl border-2 flex items-center gap-4" style={{ borderColor: color, backgroundColor: `${color}10` }}>
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0" style={{ backgroundColor: color }}>
                                        {globalMaturity}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#1A2F2F]">Maturité globale : <span style={{ color }}>{label}</span></p>
                                        <p className="text-xs text-slate-500">
                                            {globalMaturity >= 3.5 ? "Processus solides et proactifs face aux risques identifiés." :
                                             globalMaturity >= 2.5 ? "Processus stables mais certains axes nécessitent un renforcement." :
                                             globalMaturity >= 1.5 ? "Fragilités significatives. Des actions correctives sont recommandées." :
                                             "Vulnérabilité critique. Une action immédiate est nécessaire."}
                                        </p>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </div>

                {/* Row 2: Criticité moyenne (full width) */}
                <div className="mb-16">
                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                        <h3 className="text-lg font-bold text-[#1A2F2F] mb-6 flex items-center gap-2">
                            <BarChart3 size={20} className="text-[#BC5B2E]" /> Criticité moyenne par thématique
                        </h3>
                        <p className="text-xs text-slate-500 mb-4">Score = (Gravité × Fréquence) / Maturité</p>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={themeData} layout="vertical" margin={{ left: 20, right: 30 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }} />
                                    <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                    <Bar dataKey="score" name="Criticité (G×F/M)" radius={[0, 4, 4, 0]}>
                                        {themeData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.score > 10 ? '#BC5B2E' : entry.score > 6 ? '#E18392' : entry.score > 2 ? '#D09639' : '#9DB280'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        {themeData.length > 0 && (() => {
                            const { label, color } = getCriticalityLabel(globalCriticality);
                            return (
                                <div className="mt-6 p-4 rounded-2xl border-2 flex items-center gap-4" style={{ borderColor: color, backgroundColor: `${color}10` }}>
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0" style={{ backgroundColor: color }}>
                                        {globalCriticality}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#1A2F2F]">Criticité globale : <span style={{ color }}>{label}</span></p>
                                        <p className="text-xs text-slate-500">Moyenne du score de criticité (G × F / M) sur l'ensemble des thématiques.</p>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </div>

                {/* Top 10 */}
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    <h3 className="text-2xl font-bold text-[#1A2F2F] mb-2 flex items-center gap-3">
                        <Target className="text-[#BC5B2E]" /> Top 10 des priorités (criticité)
                    </h3>
                    <p className="text-xs text-slate-500 mb-8">Criticité = (Gravité × Fréquence) / Maturité</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {topRisks.map((risk, i) => {
                            const item = RISK_CATALOG.find(rc => rc.id === risk.riskId);
                            const criticality = Math.round(((risk.probability * risk.impact) / risk.maturity) * 10) / 10;
                            const priority = criticality > 10 ? 'CRITIQUE' : criticality > 6 ? 'ÉLEVÉ' : criticality > 2 ? 'MODÉRÉ' : 'FAIBLE';
                            return (
                                <div key={risk.riskId} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                                    <div className="w-8 h-8 rounded-full bg-[#1A2F2F] text-white flex items-center justify-center font-bold text-xs shrink-0">{i + 1}</div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-bold text-[#1A2F2F] leading-tight mb-1 truncate">{item?.name}</h4>
                                        <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            <span className="truncate">{item?.theme}</span>
                                            <span className="w-1 h-1 bg-slate-200 rounded-full shrink-0"></span>
                                            <span className="shrink-0">Score: {criticality}</span>
                                        </div>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-[10px] font-black shrink-0 ${priority === 'CRITIQUE' ? 'bg-[#BC5B2E] text-white' : priority === 'ÉLEVÉ' ? 'bg-[#E18392] text-white' : priority === 'MODÉRÉ' ? 'bg-[#D09639] text-white' : 'bg-[#B2DFB6] text-[#1A2F2F]'}`}>
                                        {priority}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Link to action levers */}
                <div className="mt-12 p-8 bg-[#1A2F2F] text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold">Prêt pour l'étape suivante ?</h3>
                        <p className="text-slate-400">Passez maintenant à l'évaluation de vos leviers d'action pour construire votre plan de transition.</p>
                    </div>
                    {onNext && (
                        <button onClick={onNext} className="px-8 py-4 bg-[#C3FD97] text-[#1A2F2F] rounded-xl font-bold hover:bg-[#B2DFB6] transition-all flex items-center gap-2 shrink-0">
                            Voir les leviers d'action <ArrowRight size={18} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RiskMatrix;
