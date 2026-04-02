import React, { useState, useEffect } from 'react';
import AppSidebar from '@/components/AppSidebar';
import AssessmentForm from '@/components/AssessmentForm';
import RiskMatrix from '@/components/RiskMatrix';
import PedagogicalCritique from '@/components/PedagogicalCritique';
import KanbanActionPlan from '@/components/KanbanActionPlan';
import NextSteps from '@/components/NextSteps';
import { AppState, RiskAssessment, ActionLeverAssessment } from '@/types';
import { RISK_CATALOG, ACTION_LEVERS_CATALOG, COLORS } from '@/constants';
import { Download, Mail, Globe, ArrowRight, CheckCircle2, ShieldCheck, Info, TrendingUp, Users, Rocket, RefreshCw, Target, Compass, Heart, BookOpen, ExternalLink, Leaf, DollarSign, Brain, ChevronDown, ChevronUp } from 'lucide-react';
import loraineImg from '@/assets/loraine.png';
import logoTiltImg from '@/assets/logo-tilt.png';
import alizeImg from '@/assets/alize.png';
import heloiseImg from '@/assets/heloise.png';

const CollapsibleAboutSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-5 md:p-6 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
            >
                <h3 className="text-lg md:text-xl font-bold text-[#1A2F2F]">{title}</h3>
                {isOpen ? <ChevronUp size={24} className="text-slate-400" /> : <ChevronDown size={24} className="text-slate-400" />}
            </button>
            {isOpen && (
                <div className="px-5 md:px-6 pb-6 animate-in slide-in-from-top-2 duration-200">
                    {children}
                </div>
            )}
        </div>
    );
};

const CollapsibleAboutAll = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-5 md:p-6 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
            >
                <h3 className="text-lg md:text-xl font-bold text-[#1A2F2F]">À propos du Mouvement Tilt</h3>
                {isOpen ? <ChevronUp size={24} className="text-slate-400" /> : <ChevronDown size={24} className="text-slate-400" />}
            </button>
            {isOpen && (
                <div className="px-5 md:px-6 pb-6 space-y-8 animate-in slide-in-from-top-2 duration-200">
                    {children}
                </div>
            )}
        </div>
    );
};

const Intro = ({ onStart }: { onStart: (step?: any) => void }) => (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C3FD97]/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold text-[#1A2F2F] mb-6 tracking-tight">Robust'Asso</h1>
                <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
                    Bienvenue dans l'outil d'auto-diagnostic du <span className="font-semibold text-[#1A2F2F]">Mouvement Tilt</span>. 
                    Cet outil est conçu pour aider les associations à diagnostiquer leur robustesse et les fondations à outiller les associations, de manière accessible et autonome.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold text-[#1A2F2F] flex items-center gap-2">
                            <Info className="text-[#335353]" /> Le Mouvement Tilt
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            Grâce au soutien de la communauté philanthrope, le Mouvement Tilt élabore et déploie des outils, des méthodes et des parcours d'accompagnement dédiés à la transformation écologique des associations, accessibles gratuitement à tous les acteurs de l'intérêt général.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold text-[#1A2F2F] flex items-center gap-2">
                            <ShieldCheck className="text-[#335353]" /> Pourquoi ce diagnostic ?
                        </h2>
                        <ul className="space-y-2 text-slate-600">
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="text-[#9DB280] mt-1 shrink-0" size={18} />
                                <span>Diagnostiquer la robustesse de votre structure.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="text-[#9DB280] mt-1 shrink-0" size={18} />
                                <span>Favoriser l'identification des besoins prioritaires.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="text-[#9DB280] mt-1 shrink-0" size={18} />
                                <span>Contribuer au pouvoir d'agir des acteurs de l'intérêt général.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-[#B2DFB6]/10 p-6 md:p-8 rounded-2xl border border-[#B2DFB6]/30">
                        <h2 className="text-xl md:text-2xl font-bold text-[#1A2F2F] mb-3">Les étapes du parcours</h2>
                        <p className="text-sm text-slate-600 leading-relaxed mb-6">
                            Ce diagnostic a été pensé comme un parcours progressif pour vous guider de l'analyse des risques à l'action. Vous pouvez toutefois <strong>accéder directement à une étape spécifique</strong> ci-dessus pour approfondir une évaluation particulière.
                        </p>
                        <div className="grid grid-cols-1 gap-3">
                            {[
                                { step: "1", bold: "Pré-requis à l'analyse", rest: ' via l\'onglet "Avant de commencer"', id: 'critique' },
                                { step: "2", bold: "Evaluation des risques", rest: " socio-environnementaux et de la maturité de votre organisation", id: 'risks' },
                                { step: "3", bold: "Tableau de bord", rest: " d'analyse de vos risques et de votre maturité", id: 'risk_dashboard' },
                                { step: "4", bold: "Evaluation des leviers", rest: " d'action et matrices de priorisation", id: 'kanban' },
                                { step: "5", bold: "Valorisation et suite", rest: " de votre analyse", id: 'next_steps' }
                            ].map((item, i) => (
                                <button 
                                    key={i} 
                                    onClick={() => onStart(item.id as any)}
                                    className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-[#9DB280] hover:shadow-md transition-all group text-left w-full"
                                >
                                    <div className="w-10 h-10 rounded-full bg-[#1A2F2F] text-white flex items-center justify-center font-bold shrink-0 group-hover:bg-[#9DB280] transition-colors">
                                        {item.step}
                                    </div>
                                    <span className="text-sm text-[#1A2F2F] leading-tight">
                                        <span className="font-bold">{item.bold}</span>{item.rest}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                </div>

                <div className="mt-12 flex justify-center">
                    <button 
                        onClick={() => onStart('critique')}
                        className="group px-8 md:px-10 py-4 md:py-5 bg-[#1A2F2F] text-white rounded-2xl font-bold text-lg hover:bg-[#2A4F4F] transition-all shadow-lg shadow-slate-200 flex items-center gap-3"
                    >
                        Commencer l'autodiagnostic <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

{/* À propos du Mouvement Tilt */}
                <div className="mt-24 pt-16 border-t border-slate-100 space-y-12">
                    <div className="flex items-center gap-4">
                        <img src={logoTiltImg} alt="Le Mouvement Tilt" className="h-14 w-auto object-contain" />
                    </div>

                    <CollapsibleAboutAll>
                        {/* Notre vision & notre mission */}
                        <div>
                            <h3 className="text-lg font-bold text-[#1A2F2F] mb-4">Notre vision & notre mission</h3>
                            <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 space-y-8">
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-[#1A2F2F] text-[#C3FD97] flex items-center justify-center shrink-0">
                                            <Rocket size={24} />
                                        </div>
                                        <p className="text-slate-600 leading-relaxed">
                                            Promouvoir un modèle d'engagement systémique, où la dimension environnementale devient l'affaire de tous les acteurs et de toutes les causes de l'intérêt général, <strong className="text-[#1A2F2F]">en alliant respect des limites planétaires et réponses aux défis sociaux</strong>.
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-[#1A2F2F] text-[#C3FD97] flex items-center justify-center shrink-0">
                                            <RefreshCw size={24} />
                                        </div>
                                        <p className="text-slate-600 leading-relaxed">
                                            Activer le pouvoir d'agir des associations pour répondre aux grands enjeux de notre temps et <strong className="text-[#1A2F2F]">favoriser la soutenabilité et la robustesse des acteurs de l'intérêt général</strong>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Nos valeurs */}
                        <div>
                            <h3 className="text-lg font-bold text-[#1A2F2F] mb-4">Nos valeurs qui constituent l'ADN du Mouvement Tilt</h3>
                            <div className="bg-[#E1E4D1]/30 p-6 md:p-8 rounded-3xl border border-[#9DB280]/20 space-y-6">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {[
                                        { label: 'Gratuité', icon: Heart },
                                        { label: 'Open Source', icon: BookOpen },
                                        { label: 'Recherche-Action', icon: Target },
                                        { label: 'Communauté apprenante', icon: Users },
                                    ].map((val, i) => (
                                        <div key={i} className="flex flex-col items-center text-center gap-3">
                                            <div className="w-14 h-14 rounded-2xl bg-[#1A2F2F] text-[#C3FD97] flex items-center justify-center">
                                                <val.icon size={28} />
                                            </div>
                                            <span className="text-sm font-bold text-[#1A2F2F]">{val.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Nos actions */}
                        <div>
                            <h3 className="text-lg font-bold text-[#1A2F2F] mb-4">Nos actions</h3>
                            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { title: 'Tilt Odyssée', desc: 'Parcours de formation et d\'accompagnement en hybride', icon: Compass },
                                        { title: 'Tilt\'Envol', desc: 'Parcours de formation et d\'accompagnement en ligne', icon: Rocket },
                                        { title: 'Journées Déclic', desc: 'Journées de sensibilisation aux enjeux socio-environnementaux', icon: Leaf },
                                        { title: 'La Tilt\'othèque', desc: 'Bibliothèque de ressources open source', icon: Target },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                            <div className="w-10 h-10 rounded-xl bg-[#335353] text-[#C3FD97] flex items-center justify-center shrink-0 mt-0.5">
                                                <item.icon size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[#1A2F2F] text-base mb-1">{item.title}</h4>
                                                <p className="text-sm text-slate-600">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* L'équipe Tilt */}
                        <div>
                            <h3 className="text-lg font-bold text-[#1A2F2F] mb-4">L'équipe Tilt</h3>
                            <div className="space-y-8">
                                <p className="text-slate-500 font-medium">Les visages derrière Robust'Asso</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {[
                                        {
                                            name: "Loraine Derville",
                                            role: "Fondatrice du Mouvement Tilt",
                                            linkedin: "https://www.linkedin.com/in/loraine-derville/?originalSubdomain=fr",
                                            contactReason: "la contacter si vous avez des questions en tant que fondation / fonds de dotation ou si vous souhaitez devenir partenaire (mécénat de compétences, relai médias, etc.)",
                                            image: loraineImg
                                        },
                                        {
                                            name: "Alizé Danchaud",
                                            role: "Responsable du programme",
                                            linkedin: "https://www.linkedin.com/in/aliz%C3%A9-danchaud-282509115/",
                                            contactReason: "la contacter si vous avez des questions en tant qu'association et sur les contenus de cet outil d'autodiag",
                                            image: alizeImg
                                        },
                                        {
                                            name: "Héloïse Martin",
                                            role: "Consultante et formatrice",
                                            linkedin: "https://www.linkedin.com/in/heloise-martin/",
                                            contactReason: "la contacter si vous avez des questions sur l'ingénierie et la conception d'outil d'autodiag personnalisé",
                                            image: heloiseImg
                                        }
                                    ].map((member, index) => (
                                        <div key={index} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col">
                                            <div className="aspect-square relative overflow-hidden">
                                                <img 
                                                    src={member.image} 
                                                    alt={member.name}
                                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2F2F]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                                    <a 
                                                        href={member.linkedin}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-full py-3 bg-[#C3FD97] text-[#1A2F2F] rounded-xl font-bold flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                                                    >
                                                        <ArrowRight size={18} /> Profil LinkedIn
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="p-6 flex-1 flex flex-col space-y-3">
                                                <div>
                                                    <h4 className="text-lg font-bold text-[#1A2F2F] mb-1">{member.name}</h4>
                                                    <p className="text-[#9DB280] font-bold text-[10px] uppercase tracking-widest">{member.role}</p>
                                                </div>
                                                <p className="text-[10px] text-slate-400 italic">Crédit photo : Marylou Mauricio</p>
                                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mt-auto">
                                                    <div className="flex gap-3 items-start">
                                                        <ArrowRight size={16} className="text-[#BC5B2E] shrink-0 mt-1" />
                                                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                                            {member.contactReason}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CollapsibleAboutAll>

                    {/* Bouton vers le site - outside collapsible */}
                    <div className="flex justify-center pt-4">
                        <a 
                            href="https://www.mouvement-tilt.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-[#1A2F2F] text-white rounded-2xl font-bold text-lg hover:bg-[#2A4F4F] transition-all flex items-center gap-3 shadow-lg"
                        >
                            Découvrir le Mouvement Tilt <ExternalLink size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const Index: React.FC = () => {
    const [state, setState] = useState<AppState>({
        step: 'intro',
        assessments: {},
        actionLeverAssessments: {},
    });

    useEffect(() => {
        const initialAssessments: Record<string, RiskAssessment> = {};
        RISK_CATALOG.forEach(risk => {
            initialAssessments[risk.id] = {
                riskId: risk.id,
                probability: 1,
                impact: 1,
                maturity: 1,
                notes: ''
            };
        });

        const initialActionLevers: Record<string, ActionLeverAssessment> = {};
        ACTION_LEVERS_CATALOG.forEach(lever => {
            initialActionLevers[lever.id] = {
                leverId: lever.id,
                status: 'none',
                importance: 1,
                urgency: 1
            };
        });

        // Load from localStorage if available
        const savedAssessments = localStorage.getItem('robustasso_assessments');
        const savedActionLevers = localStorage.getItem('robustasso_actionLevers');
        
        setState(prev => ({ 
            ...prev, 
            assessments: savedAssessments ? JSON.parse(savedAssessments) : initialAssessments,
            actionLeverAssessments: savedActionLevers ? JSON.parse(savedActionLevers) : initialActionLevers
        }));
    }, []);

    const handleUpdateAssessment = (id: string, data: RiskAssessment) => {
        setState(prev => {
            const newAssessments = { ...prev.assessments, [id]: data };
            localStorage.setItem('robustasso_assessments', JSON.stringify(newAssessments));
            return { ...prev, assessments: newAssessments };
        });
    };

    const handleUpdateActionLever = (id: string, field: 'status' | 'importance' | 'urgency', value: any) => {
        setState(prev => {
            const newActionLevers = {
                ...prev.actionLeverAssessments,
                [id]: {
                    ...prev.actionLeverAssessments[id] || { leverId: id, status: 'none', importance: 1, urgency: 1 },
                    [field]: value
                }
            };
            localStorage.setItem('robustasso_actionLevers', JSON.stringify(newActionLevers));
            return { ...prev, actionLeverAssessments: newActionLevers };
        });
    };

    const handleNavigate = (step: AppState['step']) => {
        setState(prev => ({ ...prev, step }));
        window.scrollTo(0, 0);
    };

    const [assessmentPrintFn, setAssessmentPrintFn] = useState<(() => void) | null>(null);

    const handleFooterPrint = () => {
        if (state.step === 'risks' && assessmentPrintFn) {
            assessmentPrintFn();
        } else {
            window.print();
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <AppSidebar currentStep={state.step} setStep={handleNavigate} />
            
            <main className="flex-1 md:ml-64 p-4 md:p-8 pb-8 relative min-h-screen pt-16 md:pt-8">
                <div className="max-w-6xl mx-auto">
                    {state.step === 'intro' && <Intro onStart={(step) => handleNavigate(step || 'critique')} />}
                    {state.step === 'critique' && <PedagogicalCritique onNext={() => handleNavigate('risks')} />}
                    {state.step === 'risks' && (
                        <AssessmentForm 
                            assessments={state.assessments} 
                            onUpdate={handleUpdateAssessment}
                            onNavigate={handleNavigate}
                            onRegisterPrint={(fn) => setAssessmentPrintFn(() => fn)}
                        />
                    )}
                    {state.step === 'risk_dashboard' && (
                        <RiskMatrix assessments={state.assessments} onNext={() => handleNavigate('kanban')} />
                    )}
                    {state.step === 'kanban' && (
                        <KanbanActionPlan 
                            assessments={state.actionLeverAssessments}
                            onUpdate={handleUpdateActionLever}
                            onNext={() => handleNavigate('next_steps')}
                        />
                    )}
                    {state.step === 'next_steps' && (
                        <NextSteps 
                            riskAssessments={state.assessments}
                            actionLeverAssessments={state.actionLeverAssessments}
                        />
                    )}
                </div>

                <footer className="mt-12 bg-white/80 backdrop-blur-md border-t border-slate-100 p-4 md:p-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 no-print gap-2">
                    <div className="flex items-center gap-4 md:gap-8 flex-wrap justify-center">
                        <button onClick={() => { window.location.href = 'mai' + 'lto:' + 'info' + '@' + 'mouvement-tilt.com'; }} className="flex items-center gap-2 hover:text-[#1A2F2F] transition-colors font-medium text-xs md:text-sm">
                            <Mail size={16} className="text-[#335353]" /> info(@)mouvement-tilt.com
                        </button>
                        <a href="https://mouvement-tilt.com/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#1A2F2F] transition-colors font-medium text-xs md:text-sm">
                            <Globe size={16} className="text-[#335353]" /> mouvement-tilt.com
                        </a>
                        <span className="text-slate-400 text-xs">Date : {new Date().toLocaleDateString('fr-FR')}</span>
                        <a href="https://autodiag-mouvement-tilt.lovable.app" target="_blank" rel="noreferrer" className="text-slate-400 text-xs hover:text-[#1A2F2F] transition-colors">
                            source : autodiag-mouvement-tilt.lovable.app
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="font-bold text-[#1A2F2F] tracking-tight hidden md:block">
                            Robust'Asso <span className="font-normal text-slate-400 mx-2">|</span> Mouvement Tilt
                        </div>
                    </div>
                </footer>

                <div className="hidden print:block fixed bottom-0 left-0 right-0 p-8 border-t border-slate-200 text-xs text-slate-500">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-bold text-[#1A2F2F]">Robust'Asso | Mouvement Tilt</p>
                            <p>info(@)mouvement-tilt.com | mouvement-tilt.com</p>
                        </div>
                        <div className="text-right">
                            <p>Document généré le : {new Date().toLocaleDateString('fr-FR')} | source : autodiag-mouvement-tilt.lovable.app</p>
                            <p>Auto-diagnostic de robustesse associative</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Index;
