import React, { useState } from 'react';
import { 
  Building2, 
  Menu, 
  Search, 
  Settings,
  HelpCircle,
  Grip,
  ChevronDown
} from 'lucide-react';
import { SecretariatId } from '../types';
import { SECRETARIATS } from '../data';

interface AppLayoutProps {
  currentSecretariat: SecretariatId;
  onSecretariatChange: (id: SecretariatId) => void;
  isAuthenticated: boolean;
  onLoginClick?: () => void;
  onLogoutClick?: () => void;
  children: React.ReactNode;
}

export function AppLayout({ 
  currentSecretariat, 
  onSecretariatChange, 
  isAuthenticated,
  onLoginClick,
  onLogoutClick,
  children 
}: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Header / Portal Header */}
      <header className="bg-[#006eb8] text-white flex flex-col z-30 sticky top-0 shadow-md">
        <div className="h-16 flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-black/10 rounded-lg transition-colors lg:hidden mr-2"
              >
                <Menu size={24} />
              </button>
            )}
            
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => onSecretariatChange('principal')}
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 shadow-inner">
                {/* Simulated Crest/Brasão */}
                <Building2 size={24} className="text-[#006eb8]" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg leading-tight tracking-tight">PREFEITURA DE</span>
                <span className="font-extrabold text-2xl leading-none tracking-tight text-[#fcb712]">BROTAS</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8 font-semibold text-sm">
             <button className="hover:text-[#fcb712] transition-colors" onClick={() => onSecretariatChange('principal')}>A Cidade</button>
             <button className="hover:text-[#fcb712] transition-colors">Governo</button>
             <button className="hover:text-[#fcb712] transition-colors">Serviços</button>
             <button className="hover:text-[#fcb712] transition-colors">Transparência</button>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {isAuthenticated ? (
              <>
                <button className="p-2 hover:bg-black/10 rounded-full transition-colors hidden sm:block">
                  <Settings size={20} />
                </button>
                <button 
                  onClick={onLogoutClick}
                  className="ml-2 text-sm font-bold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-colors border border-white/20"
                >
                  Sair
                </button>
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-900 border-2 border-white/20 ml-2 shadow-inner text-sm font-bold">
                  US
                </button>
              </>
            ) : (
              <button 
                onClick={onLoginClick}
                className="text-sm font-bold bg-white text-[#006eb8] hover:bg-slate-50 px-5 py-2.5 rounded-xl transition-colors shadow-sm uppercase tracking-wider"
              >
                Área Admin
              </button>
            )}
          </div>
        </div>
        
        {/* Brand Strip */}
        <div className="flex h-1.5 w-full">
          <div className="flex-1 bg-[#006eb8]"></div>
          <div className="flex-1 bg-[#fcb712]"></div>
          <div className="flex-1 bg-[#009e49]"></div>
          <div className="flex-1 bg-[#e3000f]"></div>
        </div>
      </header>

      {/* SharePoint Site Header (Command Bar area - Keep only if authenticated) */}
      {isAuthenticated && (
        <div className="bg-white border-b border-slate-200 px-4 h-14 flex items-center justify-between sticky top-[70px] z-20 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {currentSecretariat === 'principal' ? (
                <Building2 size={24} className="text-slate-700 hidden sm:block" />
              ) : (
                (() => {
                  const sec = SECRETARIATS.find(s => s.id === currentSecretariat);
                  const Icon = sec?.icon || Building2;
                  return <Icon size={24} className="text-[#006eb8] hidden sm:block" />;
                })()
              )}
              <h1 className="text-xl font-semibold text-slate-800">
                {currentSecretariat === 'principal' ? 'Painel Administrativo' : SECRETARIATS.find(s => s.id === currentSecretariat)?.name}
              </h1>
            </div>
          </div>
          
          {/* Command bar actions */}
          <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
            <button className="hidden sm:flex items-center gap-1.5 hover:text-[#006eb8]">
              Opções <ChevronDown size={14} />
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-1 w-full relative">
        {/* Left Navigation */}
        {isAuthenticated && (
          <aside 
            className={`
              absolute lg:static top-0 left-0 h-[calc(100vh-104px)] z-10
              w-64 bg-[#faf9f8] lg:bg-transparent
              transition-transform duration-300 ease-in-out
              ${isSidebarOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full lg:translate-x-0'}
              flex flex-col py-4
            `}
          >
            <nav className="space-y-0.5 px-2 overflow-y-auto">
              {SECRETARIATS.map((sec) => {
                const isActive = currentSecretariat === sec.id;
                
                return (
                  <button
                    key={sec.id}
                    onClick={() => {
                      onSecretariatChange(sec.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2 rounded-sm text-left transition-colors
                      ${isActive 
                        ? 'bg-white font-semibold text-slate-900 shadow-sm border border-slate-200' 
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }
                    `}
                  >
                    <span className={`text-sm ${isActive ? 'text-slate-900' : ''}`}>{sec.name}</span>
                  </button>
                );
              })}
            </nav>
          </aside>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden w-full relative pb-12">
          {/* Mobile Overlay */}
          {isSidebarOpen && isAuthenticated && (
            <div 
              className="absolute inset-0 bg-black/20 lg:hidden z-0 h-[calc(100vh-104px)]" 
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
          
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
