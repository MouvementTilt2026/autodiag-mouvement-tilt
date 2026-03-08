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
    ChevronUp
} from 'lucide-react';

interface PedagogicalCritiqueProps {
    onNext?: () => void;
}

const PedagogicalCritique: React.FC<PedagogicalCritiqueProps> = ({ onNext }) => {
    const [expandedBias, setExpandedBias] = useState<number | null>(null);

    const biases = [
        { 
            title: "Biais d'optimisme", 
            desc: "Tendance à sous-estimer les risques et surestimer les capacités de réussite.", 
            icon: <Zap size={16} className="text-blue-500" />,
            advice: "Conseil : Sollicitez un regard extérieur neutre ou jouez délibérément l'avocat du diable pour identifier les obstacles potentiels."
        },
        { 
            title: "Biais de statu quo", 
            desc: "Tendance à préférer que les choses restent telles qu'elles sont, freinant ainsi l'évolution de l'organisation.", 
            icon: <ShieldCheck size={16} className="text-emerald-500" />,
            advice: "Conseil : Demandez-vous : 'Si nous devions créer cette structure aujourd'hui, ferions-nous les choses de cette manière ?'"
        },
        { 
            title: "Biais de confirmation", 
            desc: "Chercher uniquement les informations qui confirment nos croyances actuelles.", 
            icon: <CheckCircle2 size={16} className="text-orange-500" />,
            advice: "Conseil : Recherchez activement des preuves contradictoires et interrogez ceux qui ont un avis divergent au sein de l'équipe."
        },
        { 
            title: "Biais de disponibilité", 
            desc: "Donner plus d'importance aux informations récentes ou marquantes.", 
            icon: <Clock size={16} className="text-purple-500" />,
            advice: "Conseil : Appuyez-vous sur des données factuelles et historiques (rapports, bilans) plutôt que sur vos seuls souvenirs récents."
        },
        { 
            title: "Biais d'ancrage", 
            desc: "Se fier trop lourdement à la première information reçue pour décider.", 
            icon: <Target size={16} className="text-red-500" />,
            advice: "Conseil : Prenez le temps de collecter plusieurs sources d'information avant de fixer votre jugement définitif."
        },
        { 
            title: "Biais de groupe", 
            desc: "Tendance à privilégier l'harmonie du groupe au détriment d'une évaluation critique et objective.", 
            icon: <AlertTriangle size={16} className="text-yellow-500" />,
            advice: "Conseil : Encouragez la contradiction constructive et assurez-vous que les voix minoritaires sont entendues lors de l'évaluation."
        }
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1A2F2F] mb-8 flex items-center gap-3">
                    <Brain className="text-[#9DB280]" /> Auto-critique et démarche
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="p-6 bg-[#B2DFB6]/10 rounded-2xl border border-[#B2DFB6]/30 space-y-4">
                        <Users className="text-[#1A2F2F]" />
                        <h3 className="font-bold text-[#1A2F2F]">Intelligence collective</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Nous recommandons vivement de réaliser ce diagnostic en équipe (salariés, bénévoles, CA) pour croiser les regards.
                        </p>
                    </div>
                    <div className="p-6 bg-[#B2DFB6]/10 rounded-2xl border border-[#B2DFB6]/30 space-y-4">
                        <Clock className="text-[#1A2F2F]" />
                        <h3 className="font-bold text-[#1A2F2F]">Temps dédié</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Prévoyez environ 45 à 60 minutes de réflexion posée pour obtenir des résultats pertinents et exploitables.
                        </p>
                    </div>
                    <div className="p-6 bg-[#B2DFB6]/10 rounded-2xl border border-[#B2DFB6]/30 space-y-4">
                        <Database className="text-[#1A2F2F]" />
                        <h3 className="font-bold text-[#1A2F2F]">Accès à l'information</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Munissez-vous de vos documents stratégiques, financiers et RH pour étayer vos réponses.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-12 mb-12">
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-[#1A2F2F] flex items-center gap-2">
                            <AlertTriangle className="text-[#D09639]" /> Attention aux biais cognitifs
                        </h3>
                        <div className="space-y-4">
                            {biases.map((bias, i) => (
                                <div key={i} className="bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
                                    <button 
                                        onClick={() => setExpandedBias(expandedBias === i ? null : i)}
                                        className="w-full p-4 flex items-start gap-3 text-left hover:bg-slate-100/50 transition-colors"
                                    >
                                        <div className="mt-0.5">{bias.icon}</div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-[#1A2F2F] text-sm mb-1">{bias.title}</h4>
                                            <p className="text-xs text-slate-500">{bias.desc}</p>
                                        </div>
                                        <div className="text-slate-400 mt-1">
                                            {expandedBias === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                        </div>
                                    </button>
                                    {expandedBias === i && (
                                        <div className="px-11 pb-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                            <p className="text-xs font-medium text-[#9DB280] bg-[#9DB280]/10 p-3 rounded-lg border border-[#9DB280]/20">
                                                {bias.advice}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-100 pt-12">
                    <h3 className="text-xl font-bold text-[#1A2F2F] mb-6">Limites et avantages de l'outil</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h4 className="font-bold text-[#9DB280] flex items-center gap-2">
                                <CheckCircle2 size={18} /> Avantages
                            </h4>
                            <ul className="space-y-2 text-sm text-slate-600">
                                <li>• Accessibilité et analyse complète</li>
                                <li>• Vision transverse</li>
                                <li>• Support de discussion pour vos instances et avec vos partenaires</li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-bold text-[#E18392] flex items-center gap-2">
                                <XCircle size={18} /> Limites
                            </h4>
                            <ul className="space-y-2 text-sm text-slate-600">
                                <li>• Subjectivité inhérente à l'auto-évaluation</li>
                                <li>• Ne remplace pas un audit expert approfondi</li>
                                <li>• Nécessite une réelle volonté de transparence interne</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-12 space-y-6">
                    <h3 className="text-xl font-bold text-[#1A2F2F] flex items-center gap-2">
                        <ShieldCheck className="text-[#9DB280]" /> Démarche éthique et RGPD
                    </h3>
                    <div className="bg-[#1A2F2F] text-white p-6 rounded-2xl space-y-4">
                        <p className="text-sm text-slate-300">
                            Robust'Asso est conçu pour être <span className="text-[#C3FD97] font-bold">100% anonyme</span>.
                        </p>
                        <ul className="space-y-3 text-xs">
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="text-[#C3FD97] shrink-0" size={14} />
                                <span>Aucune donnée n'est sauvegardée sur nos serveurs.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="text-[#C3FD97] shrink-0" size={14} />
                                <span>L'accès est libre et sans restriction de compte.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="text-[#C3FD97] shrink-0" size={14} />
                                <span>Vos résultats sont uniquement disponibles via le PDF que vous téléchargez.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {onNext && (
                    <div className="mt-12 flex justify-end">
                        <button 
                            onClick={onNext}
                            className="px-8 py-4 bg-[#1A2F2F] text-white rounded-xl font-bold hover:bg-[#2A4F4F] transition-all flex items-center gap-2"
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
