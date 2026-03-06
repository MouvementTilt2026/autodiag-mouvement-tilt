import React, { useState, useEffect } from 'react';
import AppSidebar from '@/components/AppSidebar';
import AssessmentForm from '@/components/AssessmentForm';
import RiskMatrix from '@/components/RiskMatrix';
import PedagogicalCritique from '@/components/PedagogicalCritique';
import KanbanActionPlan from '@/components/KanbanActionPlan';
import NextSteps from '@/components/NextSteps';
import { AppState, RiskAssessment, ActionLeverAssessment } from '@/types';
import { RISK_CATALOG, ACTION_LEVERS_CATALOG, COLORS } from '@/constants';
import { Download, Mail, Globe, ArrowRight, CheckCircle2, ShieldCheck, Info, TrendingUp, Users } from 'lucide-react';

const Intro = ({ onStart }: { onStart: (step?: any) => void }) => (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C3FD97]/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold text-[#1A2F2F] mb-6 tracking-tight">Robust'Asso</h1>
                <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
                    Bienvenue dans l'outil d'auto-diagnostic du <span className="font-semibold text-[#1A2F2F]">Mouvement Tilt</span>. 
                    Cet outil est conçu pour aider les associations et fondations à diagnostiquer leur robustesse via un outil facile et accessible.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold text-[#1A2F2F] flex items-center gap-2">
                            <Info className="text-[#9DB280]" /> Le Mouvement Tilt
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            Le Mouvement Tilt accompagne les acteurs de l'intérêt général dans leur transformation pour un impact durable et une résilience accrue. Nous croyons en une ingénierie socio-environnementale au service du bien commun.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-bold text-[#1A2F2F] flex items-center gap-2">
                            <ShieldCheck className="text-[#9DB280]" /> Pourquoi ce diagnostic ?
                        </h2>
                        <ul className="space-y-2 text-slate-600">
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="text-[#C3FD97] mt-1 shrink-0" size={18} />
                                <span>Diagnostiquer la robustesse de votre structure.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="text-[#C3FD97] mt-1 shrink-0" size={18} />
                                <span>Identifier les besoins prioritaires.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-[#B2DFB6]/10 p-6 md:p-8 rounded-2xl border border-[#B2DFB6]/30">
                        <h2 className="text-xl md:text-2xl font-bold text-[#1A2F2F] mb-6">Les étapes du parcours</h2>
                        <div className="grid grid-cols-1 gap-3">
                            {[
                                { step: "1", bold: "Pré-requis à l'analyse", rest: " via l'onglet auto-critique", id: 'critique' },
                                { step: "2", bold: "Evaluation des risques", rest: " socio-environnementaux et de la maturité de votre organisation", id: 'risks' },
                                { step: "3", bold: "Tableaux de bord", rest: " d'analyse de vos risques et de votre maturité", id: 'risk_dashboard' },
                                { step: "4", bold: "Evaluation des leviers", rest: " d'action et matrice de priorisation", id: 'kanban' },
                                { step: "5", bold: "Rapport final", rest: " et suite", id: 'next_steps' }
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <h3 className="text-lg font-bold text-[#1A2F2F] mb-3 flex items-center gap-2">
                                <TrendingUp className="text-[#9DB280]" size={20} /> Parcours progressif
                            </h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Ce diagnostic a été pensé comme un parcours progressif pour vous guider de l'analyse des risques à l'action. 
                                Vous pouvez toutefois accéder directement à une étape spécifique ci-dessus pour approfondir une évaluation particulière.
                            </p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <h3 className="text-lg font-bold text-[#1A2F2F] mb-3 flex items-center gap-2">
                                <ShieldCheck className="text-[#9DB280]" size={20} /> Éthique & RGPD
                            </h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Dans une démarche éthique et de conformité RGPD, vos données ne sont pas stockées sur nos serveurs. 
                                Pensez à <strong>télécharger vos résultats en PDF</strong> à la fin de chaque étape et à la fin du parcours pour conserver votre analyse.
                            </p>
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

                <div className="mt-24 pt-16 border-t border-slate-100 space-y-12">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#1A2F2F] rounded-2xl flex items-center justify-center text-[#C3FD97]">
                            <Users size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-[#1A2F2F]">L'équipe Tilt</h2>
                            <p className="text-slate-500 font-medium">Les visages derrière Robust'Asso</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Loraine Derville",
                                role: "Fondatrice du Mouvement Tilt",
                                linkedin: "https://www.linkedin.com/in/loraine-derville/?originalSubdomain=fr",
                                contactReason: "la contacter si vous avez des questions en tant que fondation",
                                image: "https://picsum.photos/seed/loraine/400/400"
                            },
                            {
                                name: "Alizé Danchaud",
                                role: "Responsable du programme",
                                linkedin: "https://www.linkedin.com/in/aliz%C3%A9-danchaud-282509115/",
                                contactReason: "la contacter si vous avez des questions en tant qu'association et sur les contenus de cet outil d'autodiag",
                                image: "https://picsum.photos/seed/alize/400/400"
                            },
                            {
                                name: "Héloïse Martin",
                                role: "Consultante et formatrice",
                                linkedin: "https://www.linkedin.com/in/heloise-martin/",
                                contactReason: "la contacter si vous avez des questions sur l'ingénierie et la conception d'outil d'autodiag personnalisé",
                                image: "https://picsum.photos/seed/heloise/400/400"
                            }
                        ].map((member, index) => (
                            <div key={index} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col">
                                <div className="aspect-square relative overflow-hidden">
                                    <img 
                                        src={member.image} 
                                        alt={member.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                                        referrerPolicy="no-referrer"
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
                                        <h3 className="text-lg font-bold text-[#1A2F2F] mb-1">{member.name}</h3>
                                        <p className="text-[#9DB280] font-bold text-[10px] uppercase tracking-widest">{member.role}</p>
                                    </div>
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

        setState(prev => ({ 
            ...prev, 
            assessments: initialAssessments,
            actionLeverAssessments: initialActionLevers
        }));
    }, []);

    const handleUpdateAssessment = (id: string, data: RiskAssessment) => {
        setState(prev => ({
            ...prev,
            assessments: { ...prev.assessments, [id]: data }
        }));
    };

    const handleUpdateActionLever = (id: string, field: 'status' | 'importance' | 'urgency', value: any) => {
        setState(prev => ({
            ...prev,
            actionLeverAssessments: {
                ...prev.actionLeverAssessments,
                [id]: {
                    ...prev.actionLeverAssessments[id] || { leverId: id, status: 'none', importance: 1, urgency: 1 },
                    [field]: value
                }
            }
        }));
    };

    const handleNavigate = (step: AppState['step']) => {
        setState(prev => ({ ...prev, step }));
        window.scrollTo(0, 0);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <AppSidebar currentStep={state.step} setStep={handleNavigate} />
            
            <main className="flex-1 md:ml-64 p-4 md:p-8 pb-32 relative min-h-screen pt-16 md:pt-8">
                <div className="max-w-6xl mx-auto">
                    {state.step === 'intro' && <Intro onStart={(step) => handleNavigate(step || 'critique')} />}
                    {state.step === 'critique' && <PedagogicalCritique onNext={() => handleNavigate('risks')} />}
                    {state.step === 'risks' && (
                        <div className="space-y-8">
                            <AssessmentForm 
                                assessments={state.assessments} 
                                onUpdate={handleUpdateAssessment} 
                            />
                            <div className="flex justify-end max-w-5xl mx-auto">
                                <button 
                                    onClick={() => handleNavigate('risk_dashboard')}
                                    className="px-8 py-4 bg-[#1A2F2F] text-white rounded-xl font-bold hover:bg-[#2A4F4F] transition-all flex items-center gap-2"
                                >
                                    Voir les tableaux de bord <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
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

                <footer className="fixed bottom-0 right-0 left-0 md:left-64 bg-white/80 backdrop-blur-md border-t border-slate-100 p-4 md:p-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 no-print z-40 gap-2">
                    <div className="flex items-center gap-4 md:gap-8 flex-wrap justify-center">
                        <a href="mailto:info@mouvement-tilt.com" className="flex items-center gap-2 hover:text-[#1A2F2F] transition-colors font-medium text-xs md:text-sm">
                            <Mail size={16} className="text-[#9DB280]" /> info@mouvement-tilt.com
                        </a>
                        <a href="https://mouvement-tilt.com/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#1A2F2F] transition-colors font-medium text-xs md:text-sm">
                            <Globe size={16} className="text-[#9DB280]" /> mouvement-tilt.com
                        </a>
                        <span className="text-slate-400 text-xs">Date : {new Date().toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => window.print()}
                            className="flex items-center gap-2 px-4 py-2 bg-[#9DB280] text-white rounded-lg font-bold hover:bg-[#8DA270] transition-all shadow-sm text-xs md:text-sm"
                        >
                            <Download size={16} /> Télécharger en PDF
                        </button>
                        <div className="font-bold text-[#1A2F2F] tracking-tight hidden md:block">
                            Robust'Asso <span className="font-normal text-slate-400 mx-2">|</span> Mouvement Tilt
                        </div>
                    </div>
                </footer>

                <div className="hidden print:block fixed bottom-0 left-0 right-0 p-8 border-t border-slate-200 text-xs text-slate-500">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-bold text-[#1A2F2F]">Robust'Asso | Mouvement Tilt</p>
                            <p>info@mouvement-tilt.com | mouvement-tilt.com</p>
                        </div>
                        <div className="text-right">
                            <p>Document généré le : {new Date().toLocaleDateString('fr-FR')}</p>
                            <p>Auto-diagnostic de robustesse associative</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Index;
