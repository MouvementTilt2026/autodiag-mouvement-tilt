import React, { useMemo } from 'react';
import { RISK_CATALOG, COLORS } from '@/constants';
import { RiskAssessment, RiskTheme } from '@/types';
import { AlertTriangle, ArrowRight, Target, TrendingUp, Zap, ShieldCheck, Info, LayoutDashboard, BarChart3, PieChart as PieChartIcon, Activity } from 'lucide-react';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer, 
    PieChart, 
    Pie, 
    Cell,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar
} from 'recharts';

interface RiskMatrixProps {
    assessments: Record<string, RiskAssessment>;
    onNext?: () => void;
}

const RiskMatrix: React.FC<RiskMatrixProps> = ({ assessments, onNext }) => {
    const riskData = Object.values(assessments) as RiskAssessment[];

    const topRisks = useMemo(() => {
        return [...riskData]
            .sort((a, b) => {
                const scoreA = a.probability * a.impact * a.maturity;
                const scoreB = b.probability * b.impact * b.maturity;
                return scoreB - scoreA;
            })
            .slice(0, 10);
    }, [riskData]);

    const themeData = useMemo(() => {
        const themes = Object.values(RiskTheme);
        return themes.map(theme => {
            const themeRisks = RISK_CATALOG.filter(r => r.theme === theme);
            const themeAssessments = themeRisks.map(tr => assessments[tr.id]).filter(Boolean);
            
            if (themeAssessments.length === 0) return { name: theme, score: 0, count: 0 };
            
            const avgScore = themeAssessments.reduce((acc, curr) => 
                acc + (curr.probability * curr.impact * curr.maturity), 0) / themeAssessments.length;
            
            return {
                name: theme.replace('Choc ', ''),
                score: Math.round(avgScore * 10) / 10,
                count: themeAssessments.length
            };
        }).filter(t => t.count > 0);
    }, [assessments]);

    const criticalityDistribution = useMemo(() => {
        const dist = { low: 0, medium: 0, high: 0 };
        riskData.forEach(r => {
            const score = r.probability * r.impact * r.maturity;
            if (score > 18) dist.high++;
            else if (score > 10) dist.medium++;
            else dist.low++;
        });
        return [
            { name: 'Bas (<10)', value: dist.low, color: '#9DB280' },
            { name: 'Moyen (10-18)', value: dist.medium, color: '#D09639' },
            { name: 'Élevé (>18)', value: dist.high, color: '#BC5B2E' }
        ].filter(d => d.value > 0);
    }, [riskData]);

    const maturityData = useMemo(() => {
        const counts = { 1: 0, 2: 0, 3: 0, 4: 0 };
        riskData.forEach(r => {
            counts[r.maturity as keyof typeof counts]++;
        });
        return [
            { subject: 'Très engagée (1)', A: counts[1], fullMark: riskData.length },
            { subject: 'Moyennement (2)', A: counts[2], fullMark: riskData.length },
            { subject: 'Peu engagée (3)', A: counts[3], fullMark: riskData.length },
            { subject: 'Pas engagée (4)', A: counts[4], fullMark: riskData.length },
        ];
    }, [riskData]);

    const MatrixGrid = ({ risks }: { risks: any[] }) => {
        return (
            <div className="w-full max-w-lg mx-auto">
                <div className="grid grid-cols-[40px_1fr] grid-rows-[1fr_40px] gap-2 aspect-square relative">
                    <div className="absolute -left-16 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap hidden md:block">
                        Gravité des effets
                    </div>

                    <div className="flex flex-col justify-around items-end pr-3 text-xs font-bold text-slate-500">
                        <span>4</span>
                        <span>3</span>
                        <span>2</span>
                        <span>1</span>
                    </div>

                    <div className="border-l-2 border-b-2 border-[#1A2F2F] grid grid-cols-4 grid-rows-4 overflow-hidden rounded-tr-xl">
                        {[4, 3, 2, 1].map((row) => (
                            [1, 2, 3, 4].map((col) => {
                                const risksInCell = risks.filter(r => r.assessment.impact === row && r.assessment.probability === col);
                                const bgColor = row * col >= 12 ? 'bg-[#BC5B2E]/20' : row * col >= 6 ? 'bg-[#D09639]/20' : 'bg-[#C3FD97]/20';
                                
                                return (
                                    <div key={`${row}-${col}`} className={`border border-white/40 flex flex-wrap items-center justify-center p-1 ${bgColor} transition-colors`}>
                                        {risksInCell.map((r: any, i: number) => {
                                            const criticality = r.assessment.probability * r.assessment.impact * r.assessment.maturity;
                                            const dotSize = 20 + (r.assessment.maturity * 6);
                                            
                                            return (
                                                <div 
                                                    key={i} 
                                                    className="rounded-full shadow-md m-0.5 cursor-help group relative transition-all hover:scale-125 hover:z-50 flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                                                    style={{ 
                                                        width: `${dotSize}px`, 
                                                        height: `${dotSize}px`,
                                                        backgroundColor: criticality >= 18 ? '#BC5B2E' : criticality >= 10 ? '#D09639' : '#9DB280',
                                                        border: '2px solid rgba(255,255,255,0.9)'
                                                    }}
                                                >
                                                    {r.number}
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:block z-[100] w-56 p-3 bg-[#1A2F2F] text-white text-[11px] rounded-xl shadow-2xl ring-1 ring-white/20">
                                                        <div className="font-bold border-b border-white/10 pb-2 mb-2 leading-tight">
                                                            {r.name}
                                                        </div>
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

                    <div className="flex justify-around items-start pt-3 text-xs font-bold text-slate-500">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                    </div>

                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                        Fréquence d'occurrence
                    </div>
                </div>
            </div>
        );
    };

    const riskWithNumbers = useMemo(() => RISK_CATALOG.map((risk, index) => ({
        ...risk,
        number: index + 1,
        assessment: assessments[risk.id]
    })).filter(r => r.assessment), [assessments]);

    const riskGroups = useMemo(() => {
        const group1 = riskWithNumbers.filter(r => 
            r.theme === RiskTheme.ENVIRONNEMENTAL || 
            r.theme === RiskTheme.FINANCEMENT
        );
        const group2 = riskWithNumbers.filter(r => 
            r.theme !== RiskTheme.ENVIRONNEMENTAL && 
            r.theme !== RiskTheme.FINANCEMENT
        );
        return [group1, group2];
    }, [riskWithNumbers]);

    return (
        <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1A2F2F] mb-10 flex items-center gap-3">
                    <LayoutDashboard className="text-[#9DB280]" /> Tableaux de bord des risques
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
                    <div className="space-y-12">
                        {riskGroups.map((group, idx) => (
                            <div key={idx} className="space-y-6">
                                <div className="text-center">
                                    <h3 className="text-lg md:text-xl font-bold text-[#1A2F2F] mb-2 leading-tight">
                                        Matrice de criticité <br />
                                        <span className="text-sm font-medium text-slate-500">
                                            {idx === 0 
                                                ? "(risques climatiques et financement/approvisionnement)" 
                                                : "(sur les autres risques)"}
                                        </span>
                                    </h3>
                                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold leading-relaxed">
                                        Score de gravité x score de fréquence x score de maturité
                                    </p>
                                </div>
                                <MatrixGrid risks={group} />
                            </div>
                        ))}
                        
                        <div className="flex flex-col items-center gap-3 pt-6">
                            <div className="flex flex-wrap items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100 w-full max-w-md">
                                <span className="text-[9px] font-bold text-slate-400 uppercase">Couleur = score de criticité :</span>
                                <div className="flex items-center gap-4 flex-wrap">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 bg-[#9DB280] rounded-full"></div>
                                        <span className="text-[9px] font-bold text-slate-600">Vert : bas (&lt;10)</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 bg-[#D09639] rounded-full"></div>
                                        <span className="text-[9px] font-bold text-slate-600">Orange : moyen (10-18)</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 bg-[#BC5B2E] rounded-full"></div>
                                        <span className="text-[9px] font-bold text-slate-600">Rouge : élevé (&gt;18)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100 w-full max-w-md">
                                <span className="text-[9px] font-bold text-slate-400 uppercase">Taille du point = niveau de maturité :</span>
                                <div className="flex items-center gap-3 flex-wrap">
                                    <div className="flex items-center gap-1"><div className="w-2 h-2 bg-slate-400 rounded-full"></div> <span className="text-[9px]">Engagée (1)</span></div>
                                    <div className="flex items-center gap-1"><div className="w-3.5 h-3.5 bg-slate-400 rounded-full"></div> <span className="text-[9px]">Moyenne (2)</span></div>
                                    <div className="flex items-center gap-1"><div className="w-5 h-5 bg-slate-400 rounded-full"></div> <span className="text-[9px]">Faible (3)</span></div>
                                    <div className="flex items-center gap-1"><div className="w-6 h-6 bg-slate-400 rounded-full"></div> <span className="text-[9px]">Nulle (4)</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-[#E1E4D1]/30 p-6 rounded-3xl border border-[#9DB280]/20">
                            <h3 className="text-lg font-bold text-[#1A2F2F] mb-4 flex items-center gap-2">
                                <Info size={18} className="text-[#9DB280]" /> Comprendre la matrice
                            </h3>
                            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                                <p>
                                    La matrice croise la <strong>Gravité</strong> (axe vertical) et la <strong>Fréquence</strong> (axe horizontal). 
                                    La couleur de fond des cellules indique la zone de risque brut.
                                </p>
                                <p>
                                    Chaque point représente un risque identifié. Sa <strong>couleur</strong> indique sa criticité finale (incluant votre maturité) :
                                </p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li><span className="font-bold text-[#9DB280]">Vert</span> : risque maîtrisé ou faible impact.</li>
                                    <li><span className="font-bold text-[#D09639]">Orange</span> : risque à surveiller, action annuelle.</li>
                                    <li><span className="font-bold text-[#BC5B2E]">Rouge</span> : risque critique, action prioritaire.</li>
                                </ul>
                                <p>
                                    La <strong>taille du point</strong> reflète votre manque de maturité : plus le point est gros, moins vous êtes préparé face à ce risque (Maturité 4 = Pas engagée).
                                </p>
                            </div>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                            <h5 className="text-sm font-bold text-[#1A2F2F] mb-4 uppercase tracking-wider">Lexique des risques positionnés</h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                                {riskWithNumbers.map(r => (
                                    <div key={r.id} className="flex items-start gap-2 text-[10px] leading-tight py-1 border-b border-slate-200/50 last:border-0">
                                        <span className="font-bold text-[#1A2F2F] shrink-0 w-4">{r.number}.</span>
                                        <span className="text-slate-600">{r.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                        <h3 className="text-lg font-bold text-[#1A2F2F] mb-6 flex items-center gap-2">
                            <BarChart3 size={20} className="text-[#BC5B2E]" /> Criticité moyenne par thématique
                        </h3>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={themeData} layout="vertical" margin={{ left: 20, right: 30 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                                    <XAxis type="number" hide />
                                    <YAxis 
                                        dataKey="name" 
                                        type="category" 
                                        width={100} 
                                        tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }} 
                                    />
                                    <Tooltip 
                                        cursor={{ fill: '#f1f5f9' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                                        {themeData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.score > 18 ? '#BC5B2E' : entry.score > 10 ? '#D09639' : '#9DB280'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                        <h3 className="text-lg font-bold text-[#1A2F2F] mb-6 flex items-center gap-2">
                            <PieChartIcon size={20} className="text-[#D09639]" /> Répartition de la criticité
                        </h3>
                        <div className="h-64 w-full flex items-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={criticalityDistribution}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {criticalityDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 600 }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                        <h3 className="text-lg font-bold text-[#1A2F2F] mb-6 flex items-center gap-2">
                            <Activity size={20} className="text-[#9DB280]" /> Radar des niveaux d'action déjà mis en place face aux risques
                        </h3>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={maturityData}>
                                    <PolarGrid stroke="#e2e8f0" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fontWeight: 600, fill: '#64748b' }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={false} axisLine={false} />
                                    <Radar
                                        name="Nombre de risques"
                                        dataKey="A"
                                        stroke="#9DB280"
                                        fill="#9DB280"
                                        fillOpacity={0.6}
                                    />
                                    <Tooltip 
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-[#1A2F2F] p-8 rounded-3xl text-white flex flex-col justify-center">
                        <h3 className="text-xl font-bold mb-6">Indicateurs clés</h3>
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div className="space-y-1">
                                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Score moyen</span>
                                <div className="text-3xl font-black text-[#C3FD97]">
                                    {Math.round(riskData.reduce((acc, r) => acc + (r.probability * r.impact * r.maturity), 0) / (riskData.length || 1) * 10) / 10}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Risques critiques</span>
                                <div className="text-3xl font-black text-[#E18392]">
                                    {riskData.filter(r => (r.probability * r.impact * r.maturity) > 18).length}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Maturité moyenne</span>
                                <div className="text-3xl font-black text-[#9DB280]">
                                    {Math.round(riskData.reduce((acc, r) => acc + r.maturity, 0) / (riskData.length || 1) * 10) / 10}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Risques évalués</span>
                                <div className="text-3xl font-black text-white">
                                    {riskData.length}
                                </div>
                            </div>
                        </div>
                        <div className="text-[10px] text-slate-400 space-y-1 border-t border-white/10 pt-4">
                            <p>• <strong>Score moyen</strong> : moyenne des scores de criticité (gravité x fréquence x maturité) de tous les risques évalués.</p>
                            <p>• <strong>Maturité moyenne</strong> : moyenne des niveaux d'engagement (1 à 4) sur l'ensemble des risques.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    <h3 className="text-2xl font-bold text-[#1A2F2F] mb-8 flex items-center gap-3">
                        <Target className="text-[#BC5B2E]" /> Top 10 des priorités (criticité)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {topRisks.map((risk, i) => {
                            const item = RISK_CATALOG.find(rc => rc.id === risk.riskId);
                            const criticality = risk.probability * risk.impact * risk.maturity;
                            const priority = criticality > 18 ? 'ÉLEVÉ' : criticality > 10 ? 'MOYEN' : 'BAS';
                            
                            return (
                                <div key={risk.riskId} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                                    <div className="w-8 h-8 rounded-full bg-[#1A2F2F] text-white flex items-center justify-center font-bold text-xs shrink-0">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-[#1A2F2F] leading-tight mb-1">{item?.name}</h4>
                                        <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            <span>{item?.theme}</span>
                                            <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                                            <span>Score c : {criticality}</span>
                                        </div>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-[10px] font-black ${priority === 'ÉLEVÉ' ? 'bg-[#E18392] text-white' : priority === 'MOYEN' ? 'bg-[#D09639] text-white' : 'bg-[#B2DFB6] text-[#1A2F2F]'}`}>
                                        {priority}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-12 p-8 bg-[#1A2F2F] text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold">Prêt pour l'étape suivante ?</h3>
                        <p className="text-slate-400">Évaluez maintenant votre maturité RSO globale pour compléter le diagnostic.</p>
                    </div>
                    {onNext && (
                        <button 
                            onClick={onNext}
                            className="px-8 py-4 bg-[#C3FD97] text-[#1A2F2F] rounded-xl font-bold hover:bg-[#B2DFB6] transition-all flex items-center gap-2 shrink-0"
                        >
                            Évaluer la Maturité RSO <ArrowRight size={18} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RiskMatrix;
