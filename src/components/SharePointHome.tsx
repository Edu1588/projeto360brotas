import React from 'react';
import { Post, SecretariatId } from '../types';
import { SECRETARIATS } from '../data';
import { 
  ChevronRight, 
  Calendar, 
  FileText, 
  Info, 
  Search,
  MessageSquare,
  FileSignature,
  FileSpreadsheet,
  Megaphone,
  Briefcase,
  UserCircle,
  Link as LinkIcon,
  CloudRain,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { SocialFeeds } from './SocialFeeds';

interface SharePointHomeProps {
  posts: Post[];
  onSecretariatChange: (id: SecretariatId) => void;
}

const getSecColor = (id: string) => {
  const brandColors = ['bg-[#006eb8]', 'bg-[#fcb712]', 'bg-[#009e49]', 'bg-[#e3000f]'];
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return brandColors[hash % brandColors.length];
};

const QUICK_SERVICES = [
  { id: '1', name: 'Serviços ao Cidadão', icon: UserCircle, color: 'border-b-[#006eb8]' },
  { id: '2', name: 'Nota Fiscal Eletrônica', icon: FileSpreadsheet, color: 'border-b-[#fcb712]' },
  { id: '3', name: 'Diário Oficial', icon: FileSignature, color: 'border-b-[#009e49]' },
  { id: '4', name: 'Portal da Transparência', icon: Search, color: 'border-b-[#e3000f]' },
  { id: '5', name: 'Vagas do PAT', icon: Briefcase, color: 'border-b-[#006eb8]' },
  { id: '6', name: 'Ouvidoria / Fale Conosco', icon: MessageSquare, color: 'border-b-[#fcb712]' },
  { id: '7', name: 'Holerite Online', icon: FileText, color: 'border-b-[#009e49]' },
  { id: '8', name: 'Licitações', icon: Megaphone, color: 'border-b-[#e3000f]' },
];

export function SharePointHome({ posts, onSecretariatChange }: SharePointHomeProps) {
  // Sort posts by date descending
  const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const heroPosts = sortedPosts.filter(p => p.imageUrl).slice(0, 3);
  const mainHero = heroPosts[0];
  
  const newsList = sortedPosts.filter(p => !heroPosts.includes(p)).slice(0, 4);

  return (
    <div className="animate-in fade-in duration-500 font-sans pb-12 w-full">
      
      {/* Mega Hero Section with Search */}
      <section className="relative bg-slate-900 h-[450px] md:h-[550px] flex flex-col justify-center items-center text-center px-4 w-full">
        <img 
          src={mainHero?.imageUrl || "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&q=80&w=2070"} 
          alt="Brotas" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/50 to-slate-900/80" />
        
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-widest uppercase mb-6 shadow-sm border border-white/10">
            Prefeitura Municipal de Brotas
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight drop-shadow-lg">
            O que você precisa?
          </h1>
          
          <div className="w-full max-w-3xl relative flex items-center">
            <div className="absolute left-4 md:left-6 text-slate-400">
              <Search size={24} />
            </div>
            <input 
              type="text" 
              placeholder="Pesquise aqui. Ex: IPTU, alvará, concurso..." 
              className="w-full h-16 md:h-20 pl-14 md:pl-16 pr-6 rounded-2xl md:rounded-[2rem] text-lg md:text-xl text-slate-700 bg-white shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#006eb8]/50 transition-shadow"
            />
            <button className="absolute right-3 md:right-4 h-10 md:h-12 px-6 bg-[#006eb8] hover:bg-[#005c9a] text-white font-bold rounded-xl md:rounded-full transition-colors shadow-md hidden sm:block">
              Buscar
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Quick Services Grid (Inspired by Araras layout) */}
        <section className="-mt-16 relative z-20 px-2 sm:px-0">
        <div className="bg-white/80 backdrop-blur-xl border border-white/40 p-4 md:p-8 rounded-[2rem] shadow-xl">
          <div className="flex items-center justify-between mb-6 px-2">
             <h2 className="text-xl font-bold text-slate-800 tracking-tight">* Principais serviços</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {QUICK_SERVICES.map((service) => (
              <button 
                key={service.id}
                className={`bg-slate-50 border-b-4 ${service.color} hover:bg-white rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all group`}
              >
                <div className="text-slate-600 group-hover:text-slate-900 transition-colors mb-4">
                  <service.icon size={36} strokeWidth={1.5} />
                </div>
                <span className="font-semibold text-slate-700 group-hover:text-slate-900 text-sm md:text-base leading-tight">
                  {service.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 pt-8">
        
        {/* Left Column: News & Highlights */}
        <div className="xl:col-span-2 space-y-12">
          
          {/* Highlight / Campaign Banner */}
          {mainHero && (
            <div 
              onClick={() => onSecretariatChange(mainHero.secretariatId)}
              className="relative rounded-[2rem] overflow-hidden shadow-lg bg-slate-900 group cursor-pointer h-[350px] flex items-end"
            >
              <img 
                src={mainHero.imageUrl} 
                alt={mainHero.title} 
                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
              
              <div className="relative z-10 p-8 w-full max-w-3xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#fcb712] text-slate-900">
                    Destaque
                  </span>
                  <span className="text-slate-300 text-sm font-medium">
                    {SECRETARIATS.find(s => s.id === mainHero.secretariatId)?.name}
                  </span>
                </div>
                <h2 className="text-3xl font-extrabold leading-tight text-white mb-3 group-hover:text-blue-100 transition-colors">
                  {mainHero.title}
                </h2>
                <p className="text-slate-300 line-clamp-2">
                  {mainHero.content}
                </p>
              </div>
            </div>
          )}
          
          {/* News List */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
                <span className="w-2 h-8 rounded-full bg-[#006eb8]"></span>
                Últimas Notícias
              </h2>
              <button className="text-sm font-bold text-[#006eb8] hover:text-[#005c9a] flex items-center gap-1 bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors">
                Ver todas <ArrowRight size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {newsList.map((post) => {
                const sec = SECRETARIATS.find(s => s.id === post.secretariatId);
                const date = new Date(post.createdAt).toLocaleDateString('pt-BR', { month: 'short', day: 'numeric', year: 'numeric' });
                return (
                  <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer flex flex-col">
                    <div className="h-56 w-full bg-slate-100 relative overflow-hidden">
                      {post.imageUrl ? (
                        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                          <FileText size={48} className="text-slate-300" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-[#009e49] shadow-sm">
                          {sec?.name}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-xs font-bold tracking-wider text-slate-400 mb-3 uppercase flex items-center gap-1.5">
                        <Calendar size={12} /> {date}
                      </p>
                      <h4 className="text-xl font-bold text-slate-800 leading-tight group-hover:text-[#006eb8] transition-colors line-clamp-2 mb-3">
                        {post.title}
                      </h4>
                      <p className="text-slate-500 line-clamp-2 mt-auto text-sm leading-relaxed">
                        {post.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Social Media Integration */}
          <section className="bg-slate-50 rounded-[2rem] p-6 sm:p-10 border border-slate-100">
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2 mb-8">
              <span className="w-2 h-8 rounded-full bg-[#fcb712]"></span>
              Redes Sociais
            </h2>
            <SocialFeeds posts={sortedPosts} />
          </section>
        </div>

        {/* Right Column: Widgets */}
        <div className="space-y-8">
          
          {/* Secretariats Links */}
          <section className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-slate-100">
             <h2 className="text-xl font-extrabold text-slate-800 tracking-tight mb-6">Acesso às Secretarias</h2>
             <div className="flex flex-col gap-2">
                {SECRETARIATS.filter(s => s.id !== 'principal').map((sec) => (
                   <button
                     key={sec.id}
                     onClick={() => onSecretariatChange(sec.id)}
                     className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-slate-50 text-left transition-colors group border border-transparent hover:border-slate-100"
                   >
                     <div className="flex items-center gap-3">
                       <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getSecColor(sec.id)} text-white shadow-sm`}>
                         <sec.icon size={16} />
                       </div>
                       <span className="font-semibold text-slate-700 group-hover:text-slate-900">{sec.name}</span>
                     </div>
                     <ChevronRight size={16} className="text-slate-400 group-hover:text-[#006eb8] transition-colors" />
                   </button>
                ))}
             </div>
          </section>

          {/* Events Widget */}
          <section className="bg-gradient-to-br from-[#009e49] to-[#007a38] rounded-[2rem] p-8 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none transform translate-x-4 -translate-y-4">
              <Calendar size={160} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-extrabold tracking-tight">Agenda Municipal</h2>
              </div>
              <div className="space-y-4">
                {[
                  { day: '24', month: 'NOV', title: 'Audiência Pública da Saúde', time: '14:00, Câmara Municipal' },
                  { day: '15', month: 'DEZ', title: 'Inauguração da Nova Creche', time: '09:00, Bairro Alvorada' },
                  { day: '20', month: 'DEZ', title: 'Feira do Produtor Rural', time: '18:00, Praça Central' },
                ].map((event, i) => (
                  <div key={i} className="flex gap-4 group cursor-pointer bg-black/10 p-3 rounded-2xl hover:bg-black/20 border border-white/5 transition-all">
                    <div className="w-14 flex-shrink-0 flex flex-col bg-white rounded-xl overflow-hidden text-center shadow-md">
                      <div className="bg-[#fcb712] text-slate-900 text-[10px] font-bold py-1 uppercase tracking-wider">{event.month}</div>
                      <div className="text-xl font-black text-slate-800 py-1">{event.day}</div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="font-bold text-sm leading-tight text-white mb-1.5">{event.title}</h4>
                      <p className="text-xs text-white/80 flex items-center gap-1.5 font-medium"><MapPin size={12} /> {event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Weather Widget */}
          <section className="bg-gradient-to-br from-blue-50 to-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-extrabold text-[#006eb8] uppercase tracking-wider mb-1">Clima em Brotas</h3>
              <p className="text-slate-700 font-medium">Parcialmente nublado</p>
            </div>
            <div className="flex items-center gap-3">
              <CloudRain size={40} className="text-[#006eb8] drop-shadow-sm" />
              <span className="text-5xl font-light text-slate-800 tracking-tighter">22°</span>
            </div>
          </section>

        </div>
      </div>
    </div>
    </div>
  );
}
