import React, { useState } from 'react';
import { SecretariatId } from '../types';
import { SECRETARIATS } from '../data';
import { LayoutGrid, List, ChevronRight } from 'lucide-react';

interface AdminDashboardProps {
  onSecretariatChange: (id: SecretariatId) => void;
}

type LayoutView = 'grid' | 'list';

export function AdminDashboard({ onSecretariatChange }: AdminDashboardProps) {
  const [layoutView, setLayoutView] = useState<LayoutView>('grid');

  const getSecColor = (id: string) => {
    const brandColors = ['bg-[#006eb8]', 'bg-[#fcb712]', 'bg-[#009e49]', 'bg-[#e3000f]'];
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return brandColors[hash % brandColors.length];
  };

  const secretariatsList = SECRETARIATS.filter(s => s.id !== 'principal');

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-sans pb-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200 pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Painel Administrativo</h1>
          <p className="text-slate-500 mt-1 font-medium">Gerencie as publicações das secretarias.</p>
        </div>
        
        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
          <button 
            onClick={() => setLayoutView('grid')}
            className={`p-2 rounded-lg transition-colors flex items-center justify-center ${layoutView === 'grid' ? 'bg-slate-100 text-[#006eb8] shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
            title="Visualização em Grade"
          >
            <LayoutGrid size={18} />
          </button>
          <button 
            onClick={() => setLayoutView('list')}
            className={`p-2 rounded-lg transition-colors flex items-center justify-center ${layoutView === 'list' ? 'bg-slate-100 text-[#006eb8] shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
            title="Visualização em Lista"
          >
            <List size={18} />
          </button>
        </div>
      </div>

      <div className={layoutView === 'grid' ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" : "flex flex-col gap-3"}>
        {secretariatsList.map(sec => {
          const Icon = sec.icon;
          const headerColor = getSecColor(sec.id);
          
          if (layoutView === 'list') {
            return (
              <div
                key={sec.id}
                onClick={() => onSecretariatChange(sec.id)}
                className="bg-white border border-slate-100 shadow-sm rounded-2xl flex items-center p-4 cursor-pointer hover:shadow-md hover:border-slate-300 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl ${headerColor} text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform flex-shrink-0`}>
                  <Icon size={24} />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold text-slate-800 text-lg leading-tight group-hover:text-[#006eb8] transition-colors">
                    {sec.name}
                  </h3>
                  <p className="text-sm text-slate-500">Gerenciar publicações e conteúdo</p>
                </div>
                <ChevronRight size={20} className="text-slate-400 group-hover:text-[#006eb8] transition-colors" />
              </div>
            );
          }

          return (
            <div
              key={sec.id}
              onClick={() => onSecretariatChange(sec.id)}
              className="bg-white border border-slate-100 shadow-sm rounded-3xl flex flex-col p-6 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all group items-center text-center"
            >
              <div className={`w-16 h-16 rounded-2xl ${headerColor} text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                <Icon size={32} />
              </div>
              <h3 className="font-semibold text-slate-800 text-lg leading-tight group-hover:text-[#006eb8] transition-colors line-clamp-2">
                {sec.name}
              </h3>
              <p className="text-xs text-slate-500 mt-2">Clique para acessar</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
