import React from 'react';
import { ACTION_LEVERS_CATALOG, COLORS } from '@/constants';
import { ActionLeverAssessment } from '@/types';
import { 
    Kanban as KanbanIcon, 
    ArrowRight, 
    Info, 
    Download, 
    CheckCircle2, 
    XCircle, 
    PlayCircle, 
    AlertCircle, 
    Zap, 
    Clock, 
    Target, 
    ShieldAlert,
    Printer,
    Trash2
} from 'lucide-react';
import { 
    ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, ReferenceLine, Label, Cell
} from 'recharts';

interface KanbanActionPlanProps {
    assessments: Record<string, ActionLeverAssessment>;
    onUpdate: (id: string, field: 'status' | 'importance' | 'urgency', value: any) => void;
    onNext?: () => void;
}

const KanbanActionPlan: React.FC<KanbanActionPlanProps> = ({ assessments, onUpdate, onNext }) => {
    const [filterCategory, setFilterCategory] = React.useState<string>('all');
    
    const handleDownloadPDF = () => {
        window.print();
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'keep': return 'Ce que je fais et qui fonctionne';
            case 'stop': return 'Ce que je fais et qui ne fonctionne pas';
            case 'start': return 'Ce que je vais faire';
            default: return 'Non évalué';
        }
    };

    const categories = Array.from(new Set(ACTION_LEVERS_CATALOG.map(l => l.category)));

    const filteredLevers = ACTION_LEVERS_CATALOG.filter(lever => 
        filterCategory === 'all' || lever.category === filterCategory
    );

    const eisenhowerQuadrants = [
        { id: 'q1', label: 'Urgent & Important', desc: 'À faire immédiatement', icon: Zap, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
        { id: 'q2', label: 'Important, non Urgent', desc: 'À planifier', icon: Target, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
        { id: 'q3', label: 'Urgent, non Important', desc: 'À déléguer ou automatiser', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
        { id: 'q4', label: 'Ni Urgent, ni Important', desc: 'À éliminer ou archiver', icon: Trash2, color: 'text-slate-400', bg: 'bg-slate-50', border: 'border-slate-200' },
    ];

    const getQuadrant = (importance: number, urgency: number) => {
        if (importance >= 3 && urgency >= 3) return 'q1';
        if (importance >= 3 && urgency < 3) return 'q2';
        if (importance < 3 && urgency >= 3) return 'q3';
        return 'q4';
    };

    const assessedLevers = ACTION_LEVERS_CATALOG
        .map((lever, index) => ({
            ...lever,
            number: index + 1,
            assessment: assessments[lever.id]
        }))
        .filter(l => l.assessment && (l.assessment.importance > 1 || l.assessment.urgency > 1));

    const CustomDot = (props: any) => {
        const { cx, cy, payload } = props;
        const quad = getQuadrant(payload.importance, payload.urgency);
        const color = quad === 'q1' ? '#ef4444' : quad === 'q2' ? '#3b82f6' : quad === 'q3' ? '#f97316' : '#94a3b8';
        
        return (
            <g transform={`translate(${cx},${cy})`}>
                <circle r="10" fill={color} stroke="#fff" strokeWidth="2" />
                <text
                    x="0"
                    y="0"
                    dy=".3em"
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="10px"
                    fontWeight="bold"
                >
                    {payload.number}
                </text>
            </g>
        );
    };

    return (
        <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 no-print">
                <div>
                    <h2 className="text-3xl md:text-4xl font-black text-[#1A2F2F] mb-2 flex items-center gap-3">
                        <KanbanIcon className="text-[#9DB280]" size={40} /> Leviers d'action
                    </h2>
                    <p className="text-slate-500 text-base md:text-lg">Évaluez et priorisez vos actions pour une transition robuste.</p>
                </div>
                <button 
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-2 px-6 py-3 bg-[#1A2F2F] text-white rounded-xl font-bold hover:bg-[#2A4F4F] transition-all shadow-lg"
                >
                    <Printer size={20} /> Télécharger en PDF
                </button>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="text-xl font-bold text-[#1A2F2F] flex items-center gap-2">
                        <ShieldAlert className="text-[#BC5B2E]" /> Évaluation des leviers
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                <th className="px-6 py-4">Levier</th>
                                <th className="px-6 py-4 w-48">
                                    <div className="flex flex-col gap-2">
                                        <span>Catégorie</span>
                                        <select 
                                            value={filterCategory}
                                            onChange={(e) => setFilterCategory(e.target.value)}
                                            className="text-[9px] p-1 border border-slate-200 rounded bg-white text-slate-600 font-bold normal-case w-full"
                                        >
                                            <option value="all">Toutes les catégories</option>
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                </th>
                                <th className="px-6 py-4 w-64">État des lieux</th>
                                <th className="px-6 py-4 text-center">Importance</th>
                                <th className="px-6 py-4 text-center">Urgence</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredLevers.map((lever) => {
                                const index = ACTION_LEVERS_CATALOG.findIndex(l => l.id === lever.id);
                                const assessment = assessments[lever.id] || { leverId: lever.id, status: 'none', importance: 1, urgency: 1 };
                                return (
                                    <tr key={lever.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex gap-3">
                                                <span className="font-bold text-slate-300 text-xs shrink-0 mt-1">{index + 1}.</span>
                                                <div>
                                                    <div className="font-bold text-[#1A2F2F] text-sm mb-0.5">{lever.name}</div>
                                                    <div className="text-[10px] text-slate-400 font-medium line-clamp-1 group-hover:line-clamp-none transition-all">
                                                        {lever.details}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded-md uppercase">
                                                {lever.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select 
                                                value={assessment.status}
                                                onChange={(e) => onUpdate(lever.id, 'status', e.target.value)}
                                                className="text-[10px] font-bold p-2 border border-slate-200 rounded-lg bg-white text-[#1A2F2F] w-full"
                                            >
                                                <option value="none">Choisir un état...</option>
                                                <option value="keep">Ce que je fais et qui fonctionne</option>
                                                <option value="stop">Ce que je fais et qui ne fonctionne pas</option>
                                                <option value="start">Ce que je vais faire</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-1">
                                                {[1, 2, 3, 4].map(val => (
                                                    <button 
                                                        key={val}
                                                        onClick={() => onUpdate(lever.id, 'importance', val)}
                                                        className={`w-7 h-7 rounded-md text-[10px] font-bold transition-all ${
                                                            assessment.importance === val 
                                                            ? 'bg-[#1A2F2F] text-white' 
                                                            : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                                                        }`}
                                                    >
                                                        {val}
                                                    </button>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-1">
                                                {[1, 2, 3, 4].map(val => (
                                                    <button 
                                                        key={val}
                                                        onClick={() => onUpdate(lever.id, 'urgency', val)}
                                                        className={`w-7 h-7 rounded-md text-[10px] font-bold transition-all ${
                                                            assessment.urgency === val 
                                                            ? 'bg-[#BC5B2E] text-white' 
                                                            : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                                                        }`}
                                                    >
                                                        {val}
                                                    </button>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="space-y-16 pt-8">
                <div className="text-center no-print">
                    <h3 className="text-2xl md:text-3xl font-black text-[#1A2F2F] mb-2 uppercase tracking-tight">Analyse visuelle</h3>
                    <p className="text-slate-500">Visualisez votre stratégie d'action à travers deux matrices complémentaires.</p>
                </div>

                <div className="space-y-8">
                    <div className="flex items-center gap-3 px-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                            <KanbanIcon size={24} />
                        </div>
                        <h4 className="text-2xl font-bold text-[#1A2F2F]">État des lieux</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { id: 'keep', label: 'Ce que je fais et qui fonctionne', color: 'border-emerald-200', bg: 'bg-emerald-50/30', icon: CheckCircle2, iconColor: 'text-emerald-500' },
                            { id: 'stop', label: 'Ce que je fais et qui ne fonctionne pas', color: 'border-red-200', bg: 'bg-red-50/30', icon: XCircle, iconColor: 'text-red-500' },
                            { id: 'start', label: 'Ce que je vais faire', color: 'border-blue-200', bg: 'bg-blue-50/30', icon: PlayCircle, iconColor: 'text-blue-500' }
                        ].map(col => {
                            const items = ACTION_LEVERS_CATALOG
                                .map((l, i) => ({ ...l, number: i + 1, assessment: assessments[l.id] }))
                                .filter(l => l.assessment?.status === col.id);

                            return (
                                <div key={col.id} className={`flex flex-col rounded-3xl border ${col.color} ${col.bg} overflow-hidden min-h-[300px]`}>
                                    <div className="p-5 border-b border-inherit flex items-center gap-3">
                                        <col.icon className={col.iconColor} size={20} />
                                        <h5 className="font-bold text-sm text-[#1A2F2F] leading-tight">{col.label}</h5>
                                    </div>
                                    <div className="p-4 space-y-3 flex-1 overflow-y-auto custom-scrollbar">
                                        {items.length > 0 ? (
                                            items.map(item => (
                                                <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                                                    <div className="flex gap-2 mb-1">
                                                        <span className="text-[10px] font-bold text-slate-300">{item.number}.</span>
                                                        <div className="text-xs font-bold text-[#1A2F2F]">{item.name}</div>
                                                    </div>
                                                    <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{item.category}</div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="h-full flex items-center justify-center text-[10px] text-slate-400 italic text-center p-4">
                                                Aucun levier dans cette catégorie
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="flex flex-col gap-2 px-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                                <CheckCircle2 size={24} />
                            </div>
                            <h4 className="text-2xl font-bold text-[#1A2F2F]">Mon plan d'action</h4>
                        </div>
                        <p className="text-sm text-slate-500 italic ml-13">
                            Affichage des leviers prioritaires ayant un score de criticité (Importance × Urgence) supérieur à 6.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {assessedLevers.filter(l => (l.assessment.importance * l.assessment.urgency) > 6).length > 0 ? (
                            assessedLevers
                                .filter(l => (l.assessment.importance * l.assessment.urgency) > 6)
                                .map(lever => (
                                    <div key={lever.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 animate-in zoom-in-95 duration-200 flex flex-col gap-4">
                                        <div className="flex justify-between items-start">
                                            <span className="font-bold text-slate-300 text-xs">{lever.number}.</span>
                                            <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded-md uppercase">
                                                {lever.category}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-bold text-[#1A2F2F] text-sm mb-2">{lever.name}</div>
                                            <p className="text-[10px] text-slate-500 leading-relaxed">{lever.details}</p>
                                        </div>
                                        <div className="flex gap-4 pt-4 border-t border-slate-50">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] text-slate-400 uppercase font-black">Importance</span>
                                                <span className="font-bold text-xs">{lever.assessment.importance}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] text-slate-400 uppercase font-black">Urgence</span>
                                                <span className="font-bold text-xs text-[#BC5B2E]">{lever.assessment.urgency}</span>
                                            </div>
                                            <div className="flex flex-col ml-auto">
                                                <span className="text-[9px] text-slate-400 uppercase font-black">Score</span>
                                                <span className="font-bold text-xs text-[#1A2F2F]">{lever.assessment.importance * lever.assessment.urgency}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <div className="col-span-full h-40 border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center text-slate-300 text-sm font-bold italic">
                                Aucun levier n'atteint un score de criticité supérieur à 6 pour le moment.
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="flex items-center gap-3 px-4">
                        <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
                            <Zap size={24} />
                        </div>
                        <h4 className="text-2xl font-bold text-[#1A2F2F]">Matrice de priorisation (Eisenhower)</h4>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-white p-4 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
                            <div className="h-[400px] md:h-[500px] w-full relative">
                                <div className="absolute top-4 right-4 text-[10px] font-black text-red-500 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100 z-10 hidden md:block">Urgent & Important</div>
                                <div className="absolute top-4 left-4 text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100 z-10 hidden md:block">Important, non Urgent</div>
                                <div className="absolute bottom-4 right-4 text-[10px] font-black text-orange-500 uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full border border-orange-100 z-10 hidden md:block">Urgent, non Important</div>
                                <div className="absolute bottom-4 left-4 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full border border-slate-100 z-10 hidden md:block">Ni Urgent, ni Important</div>

                                <ResponsiveContainer width="100%" height="100%">
                                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                        <XAxis 
                                            type="number" 
                                            dataKey="urgency" 
                                            name="Urgence" 
                                            domain={[0.5, 4.5]} 
                                            ticks={[1, 2, 3, 4]}
                                            hide
                                        />
                                        <YAxis 
                                            type="number" 
                                            dataKey="importance" 
                                            name="Importance" 
                                            domain={[0.5, 4.5]} 
                                            ticks={[1, 2, 3, 4]}
                                            hide
                                        />
                                        <ZAxis type="number" range={[100, 400]} />
                                        <Tooltip 
                                            cursor={{ strokeDasharray: '3 3' }}
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    const data = payload[0].payload;
                                                    return (
                                                        <div className="bg-white p-4 rounded-xl shadow-xl border border-slate-100 max-w-xs">
                                                            <p className="font-bold text-[#1A2F2F] text-sm mb-1">{data.name}</p>
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">{data.category}</p>
                                                            <div className="flex gap-4">
                                                                <div className="flex flex-col">
                                                                    <span className="text-[9px] text-slate-400 uppercase">Importance</span>
                                                                    <span className="font-bold text-sm">{data.importance}</span>
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <span className="text-[9px] text-slate-400 uppercase">Urgence</span>
                                                                    <span className="font-bold text-sm text-[#BC5B2E]">{data.urgency}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
                                        <ReferenceLine x={2.5} stroke="#e2e8f0" strokeWidth={2} />
                                        <ReferenceLine y={2.5} stroke="#e2e8f0" strokeWidth={2} />
                                        <Scatter 
                                            name="Leviers" 
                                            data={assessedLevers.map(l => ({
                                                ...l,
                                                importance: l.assessment.importance,
                                                urgency: l.assessment.urgency
                                            }))}
                                            shape={<CustomDot />}
                                        />
                                    </ScatterChart>
                                </ResponsiveContainer>
                                
                                <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Urgence →</div>
                                <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-black text-slate-400 uppercase tracking-widest hidden md:block">Importance →</div>
                            </div>

                            <div className="mt-12 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <h5 className="text-sm font-bold text-[#1A2F2F] mb-4 uppercase tracking-wider">Lexique des leviers positionnés</h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                    {assessedLevers.map(l => (
                                        <div key={l.id} className="flex items-start gap-3 text-[11px] leading-tight">
                                            <span className="font-bold text-[#1A2F2F] w-4 shrink-0">{l.number}.</span>
                                            <span className="text-slate-600">{l.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-[#1A2F2F] p-8 rounded-3xl text-white">
                                <h5 className="font-bold text-xl mb-4">Légende de priorisation</h5>
                                <div className="space-y-4">
                                    {eisenhowerQuadrants.map(quad => (
                                        <div key={quad.id} className="flex items-start gap-3">
                                            <div className="w-3 h-3 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: quad.id === 'q1' ? '#ef4444' : quad.id === 'q2' ? '#3b82f6' : quad.id === 'q3' ? '#f97316' : '#94a3b8' }}></div>
                                            <div>
                                                <div className="font-bold text-sm">{quad.label}</div>
                                                <div className="text-[10px] text-slate-400">{quad.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                <h5 className="font-bold text-[#1A2F2F] mb-3 flex items-center gap-2">
                                    <Info size={18} className="text-[#9DB280]" /> Conseil de lecture
                                </h5>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    La matrice d'Eisenhower vous aide à arbitrer entre ce qui contribue à votre mission de long terme (Importance) et ce qui nécessite une réaction immédiate (Urgence).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-12 no-print">
                <div className="p-8 bg-[#1A2F2F] text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#C3FD97] flex items-center justify-center shrink-0">
                            <Info className="text-[#1A2F2F]" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="font-bold text-xl">Diagnostic terminé</h4>
                            <p className="text-sm text-slate-400">Vous avez complété l'ensemble des étapes. Découvrez vos résultats finaux.</p>
                        </div>
                    </div>
                    {onNext && (
                        <button 
                            onClick={onNext}
                            className="px-8 py-4 bg-[#C3FD97] text-[#1A2F2F] rounded-xl font-bold hover:bg-[#B2DFB6] transition-all flex items-center gap-2 shrink-0"
                        >
                            Voir les prochaines étapes <ArrowRight size={18} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default KanbanActionPlan;
