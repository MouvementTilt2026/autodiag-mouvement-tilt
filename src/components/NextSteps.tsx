import React from 'react';
import { 
    Share2, BookOpen, ExternalLink, ArrowRightCircle, ArrowRight,
    CheckCircle2, Mail, Globe, MessageSquareHeart, FileText
} from 'lucide-react';
import KanbanActionPlan from './KanbanActionPlan';
import RiskMatrix from './RiskMatrix';
import { RiskAssessment, ActionLeverAssessment } from '@/types';

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
                        Félicitations, vous avez complété votre auto-diagnostic Robust'Asso. Voici les prochaines étapes pour conserver, valoriser et approfondir votre analyse.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 no-print">
                    <div className="flex flex-col items-center text-center p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-lg transition-all group">
                        <div className="w-14 h-14 bg-[#335353] text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Share2 size={24} />
                        </div>
                        <h3 className="font-bold text-[#1A2F2F] mb-3 text-base">Échangez avec vos financeurs et vos instances</h3>
                        <p className="text-sm text-slate-500 mb-6 flex-1">Pensez à télécharger en PDF vos tableaux de bord et matrices d'actions afin de pouvoir les partager et dialoguer sur vos besoins prioritaires.</p>
                        <a 
                            href={`mailto:?subject=${encodeURIComponent("Rapport Robust'Asso - Auto-diagnostic")}&body=${encodeURIComponent("Bonjour,\n\nNous avons effectué un auto-diagnostique des risques et leviers d'action socio-environnementale de notre organisation.\n\nAfin d'échanger ensemble de vive voix à ce propos, vous trouverez en pièce jointe les PDF suivant :\n- Evaluation des risques\n- Tableaux de bord des risques\n- Evaluation et matrices des leviers d'action\n\nCes PDF sont confidentiels et ont été réalisés grâce à l'outil \"Autodiag Robust'Asso\" du Mouvement Tilt.\n\nCordialement")}`}
                            className="w-full py-3 bg-secondary text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2"
                        >
                            <Mail size={14} /> Partager le rapport
                        </a>
                    </div>

                    <div className="flex flex-col items-center text-center p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-lg transition-all group">
                        <div className="w-14 h-14 bg-[#9DB280] text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <BookOpen size={24} />
                        </div>
                        <h3 className="font-bold text-[#1A2F2F] mb-3 text-base">Approfondissez votre diagnostic avec les accompagnements et ressources Tilt.</h3>
                        <p className="text-sm text-slate-500 mb-6 flex-1">Accéder à nos ressources ouvertes à tous et découvrez les accompagnements existants.</p>
                        <a 
                            href="https://mouvement-tilt.notion.site/1ebd73de1d148080bbb4cb98c2916ca5?v=1ecd73de1d1480d8a635000cf803dd3e" 
                            target="_blank" 
                            rel="noreferrer"
                            className="w-full py-3 bg-[#C3FD97] text-[#1A2F2F] rounded-xl font-bold text-sm hover:bg-[#B2DFB6] transition-all flex items-center justify-center gap-2"
                        >
                            Voir nos ressources <ExternalLink size={12} />
                        </a>
                    </div>
                </div>

                <div className="space-y-6 no-print">
                    {/* Votre avis - même format que les blocs précédents */}
                    <div className="flex flex-col items-center text-center p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-lg transition-all group">
                        <div className="w-14 h-14 bg-[#E18392] text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <MessageSquareHeart size={24} />
                        </div>
                        <h3 className="font-bold text-[#1A2F2F] mb-3 text-base">Votre avis nous intéresse</h3>
                        <p className="text-sm text-slate-500 mb-6">Aidez-nous à améliorer cet outil en répondant à notre court questionnaire.</p>
                        <a href="https://tally.so/r/n0X0X0" target="_blank" rel="noreferrer"
                            className="w-full py-3 bg-[#1A2F2F] text-white rounded-xl font-bold text-sm hover:bg-[#335353] transition-all flex items-center justify-center gap-2">
                            Donner mon avis <ArrowRightCircle size={16} />
                        </a>
                    </div>

                    {/* Bouton contact */}
                    <div className="flex justify-center pt-4">
                        <a 
                            href="mailto:info@mouvement-tilt.com"
                            className="px-8 py-4 bg-[#1A2F2F] text-white rounded-2xl font-bold text-base hover:bg-[#335353] transition-all flex items-center gap-3 shadow-lg"
                        >
                            <Mail size={20} /> Pour échanger sur vos besoins, contactez-nous
                        </a>
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