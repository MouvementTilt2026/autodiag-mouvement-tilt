import React from 'react';
import { 
    Download, Share2, BookOpen, ExternalLink, ArrowRightCircle, ArrowRight,
    CheckCircle2, Mail, Globe, MessageSquareHeart, FileText, PlusCircle, Users, Linkedin, MessageSquare, Wrench
} from 'lucide-react';
import KanbanActionPlan from './KanbanActionPlan';
import RiskMatrix from './RiskMatrix';
import { RiskAssessment, ActionLeverAssessment } from '@/types';
import loraineImg from '@/assets/loraine.png';
import alizeImg from '@/assets/alize.png';
import heloiseImg from '@/assets/heloise.png';

interface NextStepsProps {
    riskAssessments?: Record<string, RiskAssessment>;
    actionLeverAssessments?: Record<string, ActionLeverAssessment>;
}

const NextSteps: React.FC<NextStepsProps> = ({ riskAssessments = {}, actionLeverAssessments = {} }) => {
    return (
        <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <div className="bg-white p-6 md:p-12 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#C3FD97]/10 rounded-full -mr-48 -mt-48 blur-3xl no-print"></div>
                
                <div className="relative z-10 text-center mb-16 no-print">
                    <div className="w-20 h-20 bg-[#C3FD97] rounded-full flex items-center justify-center mx-auto mb-6 text-[#1A2F2F]">
                        <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1A2F2F] mb-4 tracking-tight">Diagnostic terminé !</h2>
                    <p className="text-base md:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
                        Félicitations, vous avez complété votre auto-diagnostic Robust'Asso. Voici les prochaines étapes pour valoriser votre travail.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 no-print">
                    <div className="flex flex-col items-center text-center p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-lg transition-all group">
                        <div className="w-14 h-14 bg-[#1A2F2F] text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Download size={24} />
                        </div>
                         <h3 className="font-bold text-[#1A2F2F] mb-3">Téléchargez vos résultats</h3>
                        <p className="text-xs text-slate-500 mb-6 flex-1">Exportez vos tableaux de bord et matrices des leviers d'actions en PDF.</p>
                        <button onClick={() => window.print()} className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold text-xs hover:opacity-90 transition-all">
                            Exporter en PDF
                        </button>
                        <p className="text-[10px] text-slate-400 mt-2">Inclut les matrices d'évaluation des risques et les matrices des leviers d'action.</p>
                    </div>

                    <div className="flex flex-col items-center text-center p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-lg transition-all group">
                        <div className="w-14 h-14 bg-[#9DB280] text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Share2 size={24} />
                        </div>
                        <h3 className="font-bold text-[#1A2F2F] mb-3">Échangez avec vos financeurs et vos instances</h3>
                        <p className="text-xs text-slate-500 mb-6 flex-1">Utilisez ce diagnostic comme base de dialogue sur votre robustesse et vos besoins.</p>
                        <a 
                            href={`mailto:?subject=${encodeURIComponent("Rapport Robust'Asso - Auto-diagnostic")}&body=${encodeURIComponent("Bonjour,\n\nVeuillez trouver ci-joint notre rapport d'auto-diagnostic Robust'Asso.\n\nCe rapport contient :\n- Les tableaux de bord des risques\n- Les matrices des leviers d'action\n\nPour télécharger le PDF, ouvrez l'outil et cliquez sur « Exporter en PDF ».\n\nCordialement")}`}
                            className="w-full py-3 bg-secondary text-white rounded-xl font-bold text-xs hover:opacity-90 transition-all flex items-center justify-center gap-2"
                        >
                            <Mail size={14} /> Partager le rapport
                        </a>
                    </div>

                    <div className="flex flex-col items-center text-center p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-lg transition-all group">
                        <div className="w-14 h-14 bg-[#C3FD97] text-[#1A2F2F] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <BookOpen size={24} />
                        </div>
                        <h3 className="font-bold text-[#1A2F2F] mb-3">Creusez les ressources et les accompagnements</h3>
                        <p className="text-xs text-slate-500 mb-6 flex-1">Accédez à notre bibliothèque de ressources et accompagnements disponibles.</p>
                        <a 
                            href="https://mouvement-tilt.notion.site/1ebd73de1d148080bbb4cb98c2916ca5?v=1ecd73de1d1480d8a635000cf803dd3e" 
                            target="_blank" 
                            rel="noreferrer"
                            className="w-full py-3 bg-[#C3FD97] text-[#1A2F2F] rounded-xl font-bold text-xs hover:bg-[#B2DFB6] transition-all flex items-center justify-center gap-2"
                        >
                            Voir nos ressources <ExternalLink size={12} />
                        </a>
                    </div>
                </div>

                <div className="space-y-6 no-print">
                    <div className="bg-[#1A2F2F] text-white p-6 md:p-10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-[#E18392] flex items-center justify-center shrink-0">
                                <MessageSquareHeart className="text-white" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-bold text-xl">Votre avis nous intéresse</h4>
                                <p className="text-sm text-slate-400">Aidez-nous à améliorer cet outil en répondant à notre court questionnaire.</p>
                            </div>
                        </div>
                        <a href="https://tally.so/r/n0X0X0" target="_blank" rel="noreferrer"
                            className="px-8 py-4 bg-white text-[#1A2F2F] rounded-xl font-bold hover:bg-slate-100 transition-all flex items-center gap-2 shrink-0">
                            Donner mon avis <ArrowRightCircle size={18} />
                        </a>
                    </div>

                    <div className="bg-white text-[#1A2F2F] p-6 md:p-10 rounded-3xl border-2 border-[#C3FD97] flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-[#C3FD97] flex items-center justify-center shrink-0">
                                <Wrench className="text-[#1A2F2F]" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-bold text-xl">Concevoir votre outil sur-mesure</h4>
                                <p className="text-sm text-slate-500">Vous souhaitez également concevoir votre outil d'auto-diagnostic personnalisé ? Pour en savoir plus, contactez-nous.</p>
                            </div>
                        </div>
                        <a href="mailto:info@mouvement-tilt.com"
                            className="px-8 py-4 bg-[#C3FD97] text-[#1A2F2F] rounded-xl font-bold hover:bg-[#B2DFB6] transition-all flex items-center gap-2 shrink-0">
                            <Mail size={18} /> Contactez-nous
                        </a>
                    </div>
                </div>

                {/* Équipe Tilt avec photos */}
                <div className="mt-24 pt-16 border-t border-slate-100 space-y-12 no-print">
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
                                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                                            className="w-full py-3 bg-[#C3FD97] text-[#1A2F2F] rounded-xl font-bold flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <Linkedin size={18} /> Profil LinkedIn
                                        </a>
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col space-y-3">
                                    <div>
                                        <h3 className="text-lg font-bold text-[#1A2F2F] mb-1">{member.name}</h3>
                                        <p className="text-[#9DB280] font-bold text-[10px] uppercase tracking-widest">{member.role}</p>
                                    </div>
                                    <p className="text-[10px] text-slate-400 italic">Crédit photo : Marylou Mauricio</p>
                                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mt-auto">
                                        <div className="flex gap-3 items-start">
                                            <ArrowRight size={16} className="text-[#BC5B2E] shrink-0 mt-1" />
                                            <p className="text-xs text-slate-600 leading-relaxed font-medium">{member.contactReason}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="hidden print:block mt-20 space-y-20">
                    <div className="page-break-before">
                        <RiskMatrix assessments={riskAssessments} />
                    </div>
                    <div className="page-break-before">
                        <KanbanActionPlan assessments={actionLeverAssessments} onUpdate={() => {}} />
                    </div>
                </div>
            </div>

            <style>{`
                @media print {
                    .page-break-before { page-break-before: always; }
                }
            `}</style>
        </div>
    );
};

export default NextSteps;
