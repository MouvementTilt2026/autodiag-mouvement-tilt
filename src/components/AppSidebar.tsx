import React from 'react';
import { 
    Home, 
    AlertCircle, 
    ClipboardList, 
    LayoutDashboard, 
    Kanban, 
    ArrowRightCircle,
    Menu,
    X
} from 'lucide-react';

interface SidebarProps {
    currentStep: string;
    setStep: (step: any) => void;
}

const AppSidebar: React.FC<SidebarProps> = ({ currentStep, setStep }) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const navItems = [
        { id: 'intro', label: 'Intro', icon: Home },
        { id: 'critique', label: 'Auto-critique', icon: AlertCircle },
        { id: 'risks', label: 'Évaluation risques', icon: ClipboardList },
        { id: 'risk_dashboard', label: 'Tableaux de bord', icon: LayoutDashboard },
        { id: 'kanban', label: "Leviers d'action", icon: Kanban },
        { id: 'next_steps', label: 'Et après ?', icon: ArrowRightCircle },
    ];

    const handleNav = (id: string) => {
        setStep(id);
        setMobileOpen(false);
    };

    const sidebarContent = (
        <>
            <div className="p-8 border-b border-white/10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-[#C3FD97] rounded-xl flex items-center justify-center text-[#1A2F2F] font-black text-2xl">
                        *
                    </div>
                    <div>
                        <h1 className="text-lg font-bold leading-tight tracking-tight">
                            Robust'Asso
                        </h1>
                        <p className="text-[10px] text-[#9DB280] font-medium uppercase tracking-widest">
                            Mouvement Tilt
                        </p>
                    </div>
                </div>
            </div>
            
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleNav(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-left group ${
                            currentStep === item.id 
                            ? 'bg-[#C3FD97] text-[#1A2F2F] shadow-lg shadow-[#C3FD97]/10' 
                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                        }`}
                    >
                        <item.icon size={18} className={`shrink-0 transition-transform duration-200 ${currentStep === item.id ? 'scale-110' : 'group-hover:scale-110'}`} />
                        <span className="font-bold text-xs tracking-wide uppercase">{item.label}</span>
                    </button>
                ))}
            </nav>
            
            <div className="p-6 border-t border-white/10 bg-black/10">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#9DB280]/20 flex items-center justify-center">
                        <Menu size={14} className="text-[#9DB280]" />
                    </div>
                    <div>
                        <span className="text-[10px] text-white/40 block font-medium">Auto-diagnostic</span>
                        <span className="text-[10px] text-[#C3FD97] block font-bold">v2.0.0 Stable</span>
                    </div>
                 </div>
            </div>
        </>
    );

    return (
        <>
            {/* Mobile trigger */}
            <button 
                onClick={() => setMobileOpen(true)}
                className="md:hidden fixed top-4 left-4 z-[60] w-10 h-10 bg-[#1A2F2F] text-white rounded-xl flex items-center justify-center no-print"
            >
                <Menu size={20} />
            </button>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div 
                    className="md:hidden fixed inset-0 bg-black/50 z-[60]"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Mobile sidebar */}
            <div className={`md:hidden fixed inset-y-0 left-0 w-64 bg-[#1A2F2F] text-white flex flex-col z-[70] transform transition-transform duration-300 no-print ${
                mobileOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <button 
                    onClick={() => setMobileOpen(false)}
                    className="absolute top-4 right-4 text-white/60 hover:text-white"
                >
                    <X size={20} />
                </button>
                {sidebarContent}
            </div>

            {/* Desktop sidebar */}
            <div className="hidden md:flex w-64 bg-[#1A2F2F] text-white h-screen fixed left-0 top-0 flex-col no-print z-50">
                {sidebarContent}
            </div>
        </>
    );
};

export default AppSidebar;
