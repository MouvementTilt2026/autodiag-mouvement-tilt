import React, { useState } from 'react';
import { RISK_CATALOG, COLORS } from '@/constants';
import { RiskAssessment, RiskTheme, RiskCategory, AppState } from '@/types';
import { AlertTriangle, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Globe, Info, MessageSquare, ShieldCheck, TrendingUp, Zap, ArrowRight } from 'lucide-react';

interface AssessmentFormProps {
    assessments: Record<string, RiskAssessment>;
    onUpdate: (id: string, data: RiskAssessment) => void;
    onNavigate?: (step: AppState['step']) => void;
}

const AssessmentForm: React.FC<AssessmentFormProps> = ({ assessments, onUpdate, onNavigate }) => {
    const [activeCategory, setActiveCategory] = useState<RiskCategory>(Object.values(RiskCategory)[0]);
    const [lexiqueOpen, setLexiqueOpen] = useState(false);

    const categories = Object.values(RiskCategory);
    const currentCatIndex = categories.indexOf(activeCategory);
    const isLastCategory = currentCatIndex === categories.length - 1;

    const handleChange = (id: string, field: keyof RiskAssessment, value: any) => {
        const current = assessments[id] || {
            riskId: id,
            probability: 1,
            impact: 1,
            maturity: 1,
            notes: ''
        };
        onUpdate(id, { ...current, [field]: value });
    };

    const getThemeColor = (theme: RiskTheme) => {
        switch (theme) {
            case RiskTheme.ENVIRONNEMENTAL: return COLORS.vertAcide;
            case RiskTheme.FINANCEMENT: return COLORS.ocre;
            case RiskTheme.REGLEMENTAIRE: return COLORS.terracotta;
            case RiskTheme.POLITIQUE: return COLORS.kaki;
            case RiskTheme.RH: return COLORS.amande;
            case RiskTheme.RP: return COLORS.quartz;
            case RiskTheme.TECHNOLOGIQUE: return COLORS.foret;
            case RiskTheme.BENEFICIAIRES: return COLORS.coquilleOeuf;
            default: return '#cbd5e1';
        }
    };

    const LEVEL_DETAILS = {
        gravity: {
            1: { label: 'Mineur', desc: "Impact négligeable sans conséquence sur la mission." },
            2: { label: 'Moyen', desc: "Gêne le fonctionnement, mais ne bloque pas la mission." },
            3: { label: 'Sérieux', desc: "Met en péril une activité clé." },
            4: { label: 'Critique', desc: "Menace la pérennité, la légalité ou la crédibilité." }
        },
        frequency: {
            1: { label: 'Très improbable', desc: "Jamais survenu, difficile à imaginer." },
            2: { label: 'Peu probable', desc: "Théoriquement possible, déjà réfléchi." },
            3: { label: 'Probable', desc: "Déjà survenu ou observé ailleurs." },
            4: { label: 'Très fréquent', desc: "Quasi-systématique ou récurrent." }
        },
        vulnerability: {
            1: { label: 'Sécurisé', desc: "Actions proactives, contrôle total, amélioration continue." },
            2: { label: 'Sous Contrôle', desc: "Processus stables et documentés. Risque maîtrisé." },
            3: { label: 'Vulnérable', desc: "Actions informelles, dépendance humaine. Risque latent." },
            4: { label: 'Critique', desc: "Aucune action. Risque maximal ou subi." }
        }
    };

    const getProbabilityLabel = (val: number) => {
        return `${val} (${LEVEL_DETAILS.frequency[val as keyof typeof LEVEL_DETAILS.frequency].label})`;
    };

    const getImpactLabel = (val: number) => {
        return `${val} (${LEVEL_DETAILS.gravity[val as keyof typeof LEVEL_DETAILS.gravity].label})`;
    };

    const getVulnerabilityLabel = (val: number) => {
        return `${val} (${LEVEL_DETAILS.vulnerability[val as keyof typeof LEVEL_DETAILS.vulnerability].label})`;
    };

    const filteredRisks = RISK_CATALOG.filter(r => r.category === activeCategory);

    const goToNextCategory = () => {
        if (isLastCategory) {
            onNavigate?.('risk_dashboard');
        } else {
            setActiveCategory(categories[currentCatIndex + 1]);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1A2F2F] mb-2">Étape 1 : évaluation des risques</h2>
                    <p className="text-slate-500 text-sm md:text-base">Évaluez chaque risque selon sa fréquence, sa gravité et votre niveau de vulnérabilité.</p>
                </div>

                <div className="relative group">
                    <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`whitespace-nowrap px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-bold transition-all border-2 ${
                                    activeCategory === cat
                                    ? 'bg-[#BC5B2E] text-white border-[#BC5B2E] shadow-lg shadow-orange-100'
                                    : 'bg-white text-slate-500 border-slate-100 hover:border-slate-200'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Lexique dépliable */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <button 
                    onClick={() => setLexiqueOpen(!lexiqueOpen)}
                    className="w-full p-6 md:p-8 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <Info className="text-[#BC5B2E]" size={24} />
                        <h3 className="text-xl font-bold text-[#1A2F2F]">Lexique d'évaluation</h3>
                    </div>
                    {lexiqueOpen ? <ChevronUp size={24} className="text-slate-400" /> : <ChevronDown size={24} className="text-slate-400" />}
                </button>
                
                {lexiqueOpen && (
                    <div className="px-6 md:px-8 pb-6 md:pb-8 space-y-8 animate-in slide-in-from-top-2 duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-4">
                                <h4 className="font-bold text-base text-[#BC5B2E] flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-[#BC5B2E]/10 flex items-center justify-center text-xs">1</span>
                                    Gravité (G)
                                </h4>
                                <p className="text-sm text-slate-500 italic">Quel est l'impact potentiel du risque sur l'organisation ?</p>
                                <div className="space-y-2">
                                    {[
                                        { n: 1, l: 'Mineur', d: "L'impact est négligeable et sans conséquence sur la mission.", e: "Ajustement minime et local." },
                                        { n: 2, l: 'Moyen', d: "L'impact gêne le bon fonctionnement, mais ne bloque pas la mission.", e: "Retard ou insatisfaction mineure. Coûts faibles." },
                                        { n: 3, l: 'Sérieux', d: "L'impact met en péril une activité clé.", e: "Perte d'un financeur moyen. Baisse de participation." },
                                        { n: 4, l: 'Critique', d: "L'impact menace la pérennité, la légalité ou la crédibilité.", e: "" },
                                    ].map(item => (
                                        <div key={item.n} className="p-3 rounded-xl bg-white border border-slate-100">
                                            <span className="text-sm font-bold text-[#1A2F2F]">{item.n} ({item.l})</span>
                                            <p className="text-sm text-slate-600 leading-tight">{item.d}</p>
                                            {item.e && <p className="text-xs text-slate-400 mt-1 italic">Ex: {item.e}</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-bold text-base text-[#D09639] flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-[#D09639]/10 flex items-center justify-center text-xs">2</span>
                                    Fréquence (F)
                                </h4>
                                <p className="text-sm text-slate-500 italic">Quelle est la probabilité que le risque se produise ?</p>
                                <div className="space-y-2">
                                    {[
                                        { n: 1, l: 'Très improbable', d: "Risque qui n'est jamais survenu et difficile à imaginer.", e: "Moins d'une fois tous les 5 ans." },
                                        { n: 2, l: 'Peu probable', d: "Risque théoriquement possible, déjà réfléchi.", e: "Moins d'une fois tous les 2-3 ans." },
                                        { n: 3, l: 'Probable', d: "Risque déjà survenu ou observé chez des structures similaires.", e: "Peut survenir 1 fois par an." },
                                        { n: 4, l: 'Très fréquent', d: "Risque quasi-systématique (récurrent non résolu).", e: "Survient plusieurs fois par an." },
                                    ].map(item => (
                                        <div key={item.n} className="p-3 rounded-xl bg-white border border-slate-100">
                                            <span className="text-xs font-bold text-[#1A2F2F]">{item.n} ({item.l})</span>
                                            <p className="text-xs text-slate-600 leading-tight">{item.d}</p>
                                            {item.e && <p className="text-[10px] text-slate-400 mt-1 italic">Ex: {item.e}</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-bold text-[#9DB280] flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-[#9DB280]/10 flex items-center justify-center text-xs">3</span>
                                    Vulnérabilité (V)
                                </h4>
                                <p className="text-xs text-slate-500 italic">Quel est votre niveau de vulnérabilité face à ce risque ?</p>
                                <div className="space-y-2">
                                    {[
                                        { n: 1, l: 'Sécurisé', d: "Actions proactives, contrôle total, amélioration continue.", e: "Tableaux de bord, rapports d'audit, plans mis à jour." },
                                        { n: 2, l: 'Sous Contrôle', d: "Processus stables et documentés. Risque maîtrisé.", e: "Procédures écrites, fiches de postes, etc." },
                                        { n: 3, l: 'Vulnérable', d: "Actions informelles, dépendance humaine. Risque latent.", e: "Mémos internes, tableurs non mis à jour." },
                                        { n: 4, l: 'Critique', d: "Aucune action. Risque maximal ou subi.", e: "Absence de process, de budget ou de responsable." },
                                    ].map(item => (
                                        <div key={item.n} className="p-3 rounded-xl bg-white border border-slate-100">
                                            <span className="text-xs font-bold text-[#1A2F2F]">{item.n} ({item.l})</span>
                                            <p className="text-xs text-slate-600 leading-tight">{item.d}</p>
                                            {item.e && <p className="text-[10px] text-slate-400 mt-1 italic">Ex: {item.e}</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-100">
                            <div className="bg-[#E1E4D1]/30 p-4 md:p-6 rounded-2xl border border-[#9DB280]/20">
                                <h4 className="font-bold text-[#1A2F2F] mb-4">Calcul de la criticité : C = G x F x V</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="p-4 rounded-xl bg-white border border-green-100 shadow-sm">
                                        <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">C &lt; 10</span>
                                        <span className="block font-bold text-green-600 mb-1">Bas</span>
                                        <p className="text-[10px] text-slate-500">Risque accepté. Suivi ponctuel.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white border border-orange-100 shadow-sm">
                                        <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">10 &lt; C &lt; 18</span>
                                        <span className="block font-bold text-[#D09639] mb-1">Moyen</span>
                                        <p className="text-[10px] text-slate-500">Action à intégrer dans le plan annuel.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-white border border-red-100 shadow-sm">
                                        <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">C &gt; 18</span>
                                        <span className="block font-bold text-[#BC5B2E] mb-1">Élevé / critique</span>
                                        <p className="text-[10px] text-slate-500">Besoin prioritaire. Action immédiate.</p>
                                    </div>
                                </div>
                                <p className="text-[10px] text-slate-400 mt-4 italic">Plage de criticité : le score se situe entre 1 (risque minimal) et 64 (risque maximal).</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="space-y-6 max-w-3xl mx-auto">
                {filteredRisks.map((risk) => {
                    const assessment = assessments[risk.id] || { probability: 1, impact: 1, maturity: 1, notes: '' };
                    const riskScore = assessment.probability * assessment.impact * assessment.maturity;
                    const globalIndex = RISK_CATALOG.findIndex(r => r.id === risk.id) + 1;
                    
                    return (
                        <div key={risk.id} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-4 md:p-8">
                                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                                    <div className="space-y-3">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="w-8 h-8 rounded-full bg-[#1A2F2F] text-white flex items-center justify-center text-xs font-bold shrink-0">
                                                {globalIndex}
                                            </span>
                                            <span 
                                                className="flex items-center gap-1.5 text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider"
                                                style={{ backgroundColor: `${getThemeColor(risk.theme)}30`, color: '#1A2F2F', border: `1px solid ${getThemeColor(risk.theme)}50` }}
                                            >
                                                <Globe size={12} /> {risk.theme}
                                            </span>
                                        </div>
                                        <h3 className="text-lg md:text-2xl font-bold text-[#1A2F2F]">{risk.name}</h3>
                                        {risk.description && <p className="text-slate-500 text-sm leading-relaxed">{risk.description}</p>}
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        {risk.odds && risk.odds.length > 0 && (
                                            <span className="text-[10px] font-bold text-slate-400 mr-1">ODD :</span>
                                        )}
                                        {risk.odds?.map(odd => (
                                            <div key={odd} className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px] font-bold">
                                                {odd}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                <div className="space-y-10">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
                                        <div className="space-y-3 md:space-y-4">
                                            <div className="flex justify-between items-end gap-2">
                                                <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">FRÉQUENCE (F)</label>
                                                <span className="text-xs md:text-sm font-bold text-[#1A2F2F] text-right">{getProbabilityLabel(assessment.probability)}</span>
                                            </div>
                                            <div className="relative pt-2">
                                                <input
                                                    type="range"
                                                    min="1"
                                                    max="4"
                                                    step="1"
                                                    value={assessment.probability}
                                                    onChange={(e) => handleChange(risk.id, 'probability', parseInt(e.target.value))}
                                                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#D09639]"
                                                />
                                                <div className="flex justify-between mt-2 px-1">
                                                    {[1, 2, 3, 4].map(v => (
                                                        <span key={v} className="text-[10px] font-bold text-slate-300">{v}</span>
                                                    ))}
                                                </div>
                                                <p className="mt-3 text-xs text-slate-600 italic leading-relaxed min-h-[3rem]">
                                                    {LEVEL_DETAILS.frequency[assessment.probability as keyof typeof LEVEL_DETAILS.frequency].desc}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-3 md:space-y-4">
                                            <div className="flex justify-between items-end gap-2">
                                                <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">GRAVITÉ (G)</label>
                                                <span className="text-xs md:text-sm font-bold text-[#1A2F2F] text-right">{getImpactLabel(assessment.impact)}</span>
                                            </div>
                                            <div className="relative pt-2">
                                                <input
                                                    type="range"
                                                    min="1"
                                                    max="4"
                                                    step="1"
                                                    value={assessment.impact}
                                                    onChange={(e) => handleChange(risk.id, 'impact', parseInt(e.target.value))}
                                                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#BC5B2E]"
                                                />
                                                <div className="flex justify-between mt-2 px-1">
                                                    {[1, 2, 3, 4].map(v => (
                                                        <span key={v} className="text-[10px] font-bold text-slate-300">{v}</span>
                                                    ))}
                                                </div>
                                                <p className="mt-3 text-xs text-slate-600 italic leading-relaxed min-h-[3rem]">
                                                    {LEVEL_DETAILS.gravity[assessment.impact as keyof typeof LEVEL_DETAILS.gravity].desc}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-3 md:space-y-4">
                                            <div className="flex justify-between items-end gap-2">
                                                <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">VULNÉRABILITÉ (V)</label>
                                                <span className="text-xs md:text-sm font-bold text-[#1A2F2F] text-right">{getVulnerabilityLabel(assessment.maturity)}</span>
                                            </div>
                                            <div className="relative pt-2">
                                                <input
                                                    type="range"
                                                    min="1"
                                                    max="4"
                                                    step="1"
                                                    value={assessment.maturity}
                                                    onChange={(e) => handleChange(risk.id, 'maturity', parseInt(e.target.value))}
                                                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#9DB280]"
                                                />
                                                <div className="flex justify-between mt-2 px-1">
                                                    {[1, 2, 3, 4].map(v => (
                                                        <span key={v} className="text-[10px] font-bold text-slate-300">{v}</span>
                                                    ))}
                                                </div>
                                                <p className="mt-3 text-xs text-slate-600 italic leading-relaxed min-h-[3rem]">
                                                    {LEVEL_DETAILS.vulnerability[assessment.maturity as keyof typeof LEVEL_DETAILS.vulnerability].desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center pt-6 border-t border-slate-50">
                                        <div className="bg-[#E1E4D1]/50 p-4 md:p-6 rounded-2xl border border-[#9DB280]/20 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-inner w-full">
                                            <div className="flex flex-col items-center sm:items-start">
                                                <span className="text-[10px] font-bold text-[#1A2F2F]/40 uppercase tracking-widest mb-1">Score de criticité (G x F x V)</span>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-[#1A2F2F] font-black text-3xl">{riskScore}</span>
                                                    <span className="text-xs text-slate-400 font-bold">/ 64</span>
                                                </div>
                                            </div>
                                            <div className="px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm" style={{ 
                                                backgroundColor: riskScore > 18 ? '#BC5B2E' : riskScore > 10 ? '#D09639' : '#9DB280',
                                                color: '#fff'
                                            }}>
                                                Priorité : {riskScore > 18 ? 'élevée' : riskScore > 10 ? 'moyenne' : 'basse'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Bouton Continuer */}
            <div className="flex justify-end max-w-3xl mx-auto pt-4 pb-8">
                <button 
                    onClick={goToNextCategory}
                    className="px-8 py-4 bg-[#1A2F2F] text-white rounded-xl font-bold hover:bg-[#2A4F4F] transition-all flex items-center gap-2"
                >
                    {isLastCategory ? "Voir les tableaux de bord" : `Continuer : ${categories[currentCatIndex + 1]}`}
                    <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default AssessmentForm;
