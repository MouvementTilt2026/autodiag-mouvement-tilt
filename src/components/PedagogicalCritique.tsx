import React, { useState } from 'react';
import { 
    Users, 
    Clock, 
    Database, 
    ShieldCheck, 
    Brain, 
    AlertTriangle, 
    CheckCircle2, 
    XCircle,
    ArrowRight,
    Zap,
    Target,
    ChevronDown,
    ChevronUp,
    Lightbulb,
    Search,
    Globe
} from 'lucide-react';

interface PedagogicalCritiqueProps {
    onNext?: () => void;
}

const PedagogicalCritique: React.FC<PedagogicalCritiqueProps> = ({ onNext }) => {
    const [expandedBias, setExpandedBias] = useState<number | null>(null);
    const [biaisOpen, setBiaisOpen] = useState(false);
    const [limitesOpen, setLimitesOpen] = useState(false);
    const [perimetreOpen, setPerimetreOpen] = useState(false);
    const [perimetreOrga, setPerimetreOrga] = useState<string>('');
    const [perimetreGeo, setPerimetreGeo] = useState<string>('');
    const [perimetreEval, setPerimetreEval] = useState<string>('');

    const biases = [
        { 
            title: "Biais d'optimisme", 
            desc: "Tendance à sous-estimer les risques et surestimer les capacités de réussite.", 
            icon: <Zap size={18} className="text-[#D09639]" />,
            advice: "Conseil : Sollicitez un regard extérieur neutre ou jouez délibérément l'avocat du diable pour identifier les obstacles potentiels."
        },
        { 
            title: "Biais de statu quo", 
            desc: "Tendance à préférer que les choses restent telles qu'elles sont, freinant ainsi l'évolution de l'organisation.", 
            icon: <ShieldCheck size={18} className="text-[#335353]" />,
            advice: "Conseil : Demandez-vous : 'Si nous devions créer cette structure aujourd'hui, ferions-nous les choses de cette manière ?'"
        },
        { 
            title: "Biais de confirmation", 
            desc: "Chercher uniquement les informations qui confirment nos croyances actuelles.", 
            icon: <CheckCircle2 size={18} className="text-[#BC5B2E]" />,
            advice: "Conseil : Recherchez activement des preuves contradictoires et interrogez ceux qui ont un avis divergent au sein de l'équipe."
        },
        { 
            title: "Biais de disponibilité", 
            desc: "Donner plus d'importance aux informations récentes ou marquantes.", 
            icon: <Clock size={18} className="text-[#5A7878]" />,
            advice: "Conseil : Appuyez-vous sur des données factuelles et historiques (rapports, bilans) plutôt que sur vos seuls souvenirs récents."
        },
        { 
            title: "Biais d'ancrage", 
            desc: "Se fier trop lourdement à la première information reçue pour décider.", 
            icon: <Target size={18} className="text-[#E18392]" />,
            advice: "Conseil : Prenez le temps de collecter plusieurs sources d'information avant de fixer votre jugement définitif."
        },
        { 
            title: "Biais de groupe", 
            desc: "Tendance à privilégier l'harmonie du groupe au détriment d'une évaluation critique et objective.", 
            icon: <AlertTriangle size={18} className="text-[#D09639]" />,
            advice: "Conseil : Encouragez la contradiction constructive et assurez-vous que les voix minoritaires sont entendues lors de l'évaluation."
        }
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1A2F2F] mb-8 flex items-center gap-3">
                    <Brain className="text-[#335353]" /> Avant de commencer
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="p-6 bg-[#B2DFB6]/10 rounded-2xl border border-[#B2DFB6]/30 space-y-4">
                        <Users className="text-[#335353]" size={28} />
                        <h3 className="font-bold text-base text-[#1A2F2F]">Intelligence collective</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Nous recommandons vivement de réaliser ce diagnostic en équipe (salariés, bénévoles, CA) pour croiser les regards.
                        </p>
                    </div>
                    <div className="p-6 bg-[#B2DFB6]/10 rounded-2xl border border-[#B2DFB6]/30 space-y-4">
                        <Clock className="text-[#335353]" size={28} />
                        <h3 className="font-bold text-base text-[#1A2F2F]">Temps dédié</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Prévoyez environ 45 à 60 minutes de réflexion posée pour obtenir des résultats pertinents et exploitables.
                        </p>
                    </div>
                    <div className="p-6 bg-[#B2DFB6]/10 rounded-2xl border border-[#B2DFB6]/30 space-y-4">
                        <Database className="text-[#335353]" size={28} />
                        <h3 className="font-bold text-base text-[#1A2F2F]">Accès à l'information</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Munissez-vous de vos documents stratégiques, financiers et RH pour étayer vos réponses.
                        </p>
                    </div>
                </div>

                {/* Périmètre d'évaluation - bloc déroulant */}
                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden mb-6">
                    <button 
                        onClick={() => setPerimetreOpen(!perimetreOpen)}
                        className="w-full p-5 md:p-6 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <Globe className="text-[#9DB280]" size={24} />
                            <h3 className="text-lg md:text-xl font-bold text-[#1A2F2F]">Définir le périmètre de votre évaluation</h3>
                        </div>
                        {perimetreOpen ? <ChevronUp size={24} className="text-slate-400" /> : <ChevronDown size={24} className="text-slate-400" />}
                    </button>
                    {perimetreOpen && (
                        <div className="px-5 md:px-6 pb-6 space-y-6 animate-in slide-in-from-top-2 duration-200">
                            <div className="space-y-3">
                                <h4 className="font-bold text-base text-[#BC5B2E] flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-[#BC5B2E]/10 flex items-center justify-center text-xs">1</span>
                                    Périmètre organisationnel
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {[
                                        { value: 'global', label: 'Global / Institutionnel', desc: "L'association dans son ensemble." },
                                        { value: 'poles', label: 'Pôle spécifique pérenne', desc: "Un de vos départements spécifique." },
                                        { value: 'unites', label: 'Projet ou activité spécifique', desc: "Lié à une équipe projet." },
                                    ].map(item => (
                                        <button
                                            key={item.value}
                                            onClick={() => setPerimetreOrga(perimetreOrga === item.value ? '' : item.value)}
                                            className={`p-4 rounded-2xl border-2 text-left transition-all ${
                                                perimetreOrga === item.value
                                                    ? 'border-[#BC5B2E] bg-[#BC5B2E]/5 shadow-sm'
                                                    : 'border-slate-100 hover:border-slate-200'
                                            }`}
                                        >
                                            <span className="text-sm font-bold text-[#1A2F2F] block mb-1">{item.label}</span>
                                            <p className="text-xs text-slate-500 leading-tight">{item.desc}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-3">
                                <h4 className="font-bold text-base text-[#D09639] flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-[#D09639]/10 flex items-center justify-center text-xs">2</span>
                                    Périmètre géographique
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {[
                                        { value: 'local', label: 'Local & Régional', desc: "Une de vos antennes ou une implantation spécifique." },
                                        { value: 'national', label: 'National', desc: "Le siège et ses différentes antennes." },
                                        { value: 'international', label: 'Européen & International', desc: "Évaluation plus difficile à réaliser, nous vous conseillons de faire plusieurs évaluations par échelle nationale." },
                                    ].map(item => (
                                        <button
                                            key={item.value}
                                            onClick={() => setPerimetreGeo(perimetreGeo === item.value ? '' : item.value)}
                                            className={`p-4 rounded-2xl border-2 text-left transition-all ${
                                                perimetreGeo === item.value
                                                    ? 'border-[#D09639] bg-[#D09639]/5 shadow-sm'
                                                    : 'border-slate-100 hover:border-slate-200'
                                            }`}
                                        >
                                            <span className="text-sm font-bold text-[#1A2F2F] block mb-1">{item.label}</span>
                                            <p className="text-xs text-slate-500 leading-tight">{item.desc}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-3">
                                <h4 className="font-bold text-base text-[#9DB280] flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-[#9DB280]/10 flex items-center justify-center text-xs">3</span>
                                    Périmètre de concertation
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {[
                                        { value: 'individuelle', label: 'Évaluation individuelle', desc: "\"J'ai fait l'évaluation seul(e)\" — Vision d'expert ou de terrain, rapide mais potentiellement subjective." },
                                        { value: 'collaborative', label: 'Évaluation collaborative', desc: "\"J'ai fait l'évaluation avec des collègues\" — Regards croisés entre pairs pour limiter les angles morts." },
                                        { value: 'elargie', label: 'Évaluation élargie', desc: "\"J'ai fait l'évaluation avec mon équipe, ma gouvernance, etc.\" — Consensus stratégique impliquant décideurs et parties prenantes." },
                                    ].map(item => (
                                        <button
                                            key={item.value}
                                            onClick={() => setPerimetreEval(perimetreEval === item.value ? '' : item.value)}
                                            className={`p-4 rounded-2xl border-2 text-left transition-all ${
                                                perimetreEval === item.value
                                                    ? 'border-[#9DB280] bg-[#9DB280]/5 shadow-sm'
                                                    : 'border-slate-100 hover:border-slate-200'
                                            }`}
                                        >
                                            <span className="text-sm font-bold text-[#1A2F2F] block mb-1">{item.label}</span>
                                            <p className="text-xs text-slate-500 leading-tight">{item.desc}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Biais cognitifs - bloc déroulant */}
                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden mb-6">
                    <button 
                        onClick={() => setBiaisOpen(!biaisOpen)}
                        className="w-full p-5 md:p-6 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <Lightbulb className="text-[#D09639]" size={24} />
                            <h3 className="text-lg md:text-xl font-bold text-[#1A2F2F]">Comment prendre en compte nos biais cognitifs ?</h3>
                        </div>
                        {biaisOpen ? <ChevronUp size={24} className="text-slate-400" /> : <ChevronDown size={24} className="text-slate-400" />}
                    </button>
                    {biaisOpen && (
                        <div className="px-5 md:px-6 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
                            {biases.map((bias, i) => (
                                <div key={i} className="bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
                                    <button 
                                        onClick={() => setExpandedBias(expandedBias === i ? null : i)}
                                        className="w-full p-4 flex items-start gap-3 text-left hover:bg-slate-100/50 transition-colors"
                                    >
                                        <div className="mt-0.5">{bias.icon}</div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-[#1A2F2F] text-sm md:text-base mb-1">{bias.title}</h4>
                                            <p className="text-xs md:text-sm text-slate-500">{bias.desc}</p>
                                        </div>
                                        <div className="text-slate-400 mt-1">
                                            {expandedBias === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                        </div>
                                    </button>
                                    {expandedBias === i && (
                                        <div className="px-11 pb-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                            <p className="text-xs md:text-sm font-medium text-[#335353] bg-[#9DB280]/10 p-3 rounded-lg border border-[#9DB280]/20">
                                                {bias.advice}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Limites et avantages - bloc déroulant */}
                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden mb-6">
                    <button 
                        onClick={() => setLimitesOpen(!limitesOpen)}
                        className="w-full p-5 md:p-6 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <Search className="text-[#5A7878]" size={24} />
                            <h3 className="text-lg md:text-xl font-bold text-[#1A2F2F]">Connaître les avantages et limites de cet outil</h3>
                        </div>
                        {limitesOpen ? <ChevronUp size={24} className="text-slate-400" /> : <ChevronDown size={24} className="text-slate-400" />}
                    </button>
                    {limitesOpen && (
                        <div className="px-5 md:px-6 pb-6 animate-in slide-in-from-top-2 duration-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h4 className="font-bold text-base text-[#335353] flex items-center gap-2">
                                        <CheckCircle2 size={20} /> Avantages
                                    </h4>
                                    <ul className="space-y-3 text-sm text-slate-600">
                                        <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#9DB280] shrink-0 mt-0.5" /> Accessibilité et fluidité d'utilisation de l'outil</li>
                                        <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#9DB280] shrink-0 mt-0.5" /> Vision transversale et systémique, alliant risques et solutions d'actions</li>
                                        <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-[#9DB280] shrink-0 mt-0.5" /> Support de discussion pour vos instances et avec vos partenaires</li>
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="font-bold text-base text-[#BC5B2E] flex items-center gap-2">
                                        <AlertTriangle size={20} /> Limites
                                    </h4>
                                    <ul className="space-y-3 text-sm text-slate-600">
                                        <li className="flex items-start gap-2"><AlertTriangle size={16} className="text-[#BC5B2E] shrink-0 mt-0.5" /> Subjectivité inhérente à l'auto-évaluation et vision à un instant t, d'où la présence de la date sur les PDF</li>
                                        <li className="flex items-start gap-2"><AlertTriangle size={16} className="text-[#BC5B2E] shrink-0 mt-0.5" /> Ne remplace pas un audit expert approfondi et un accompagnement spécifique</li>
                                        <li className="flex items-start gap-2"><AlertTriangle size={16} className="text-[#BC5B2E] shrink-0 mt-0.5" /> Nécessite une connaissance et/ou une transparence interne</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="bg-[#B2DFB6]/20 p-6 md:p-8 rounded-2xl border border-[#B2DFB6]/40 space-y-4">
                        <h3 className="text-lg md:text-xl font-bold text-[#1A2F2F] flex items-center gap-2">
                            <ShieldCheck className="text-[#335353]" /> Démarche éthique et RGPD
                        </h3>
                        <p className="text-sm md:text-base text-[#1A2F2F]">
                            Robust'Asso est conçu pour être <span className="text-[#335353] font-bold">100% anonyme</span>.
                        </p>
                        <ul className="space-y-3 text-sm text-[#1A2F2F]">
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="text-[#335353] shrink-0" size={16} />
                                <span>Aucune donnée n'est sauvegardée sur nos serveurs.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="text-[#335353] shrink-0" size={16} />
                                <span>L'accès est libre et sans restriction de compte.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="text-[#335353] shrink-0" size={16} />
                                <span>Vos résultats sont uniquement disponibles via le PDF que vous téléchargez.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {onNext && (
                    <div className="mt-12 flex justify-end">
                        <button 
                            onClick={onNext}
                            className="px-8 py-4 bg-[#1A2F2F] text-white rounded-xl font-bold hover:bg-[#2A4F4F] transition-all flex items-center gap-2 text-base"
                        >
                            J'ai compris, passer à l'étape 1 <ArrowRight size={18} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PedagogicalCritique;