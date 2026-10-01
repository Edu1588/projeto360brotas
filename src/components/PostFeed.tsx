import React, { useState } from 'react';
import { Post, SecretariatId } from '../types';
import { Instagram, FileText, Star, User, MoreHorizontal, LayoutGrid, List } from 'lucide-react';
import { SECRETARIATS } from '../data';

interface PostFeedProps {
  posts: Post[];
  title: string;
  description: string;
}

type LayoutView = 'grid' | 'list';

export function PostFeed({ posts, title, description }: PostFeedProps) {
  const [layoutView, setLayoutView] = useState<LayoutView>('grid');
  const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="space-y-6">
      <div className="bg-transparent mb-6 border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">{title}</h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">{description}</p>
        </div>
        
        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 shadow-sm self-start sm:self-auto">
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

      <div className={layoutView === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
        {sortedPosts.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-500 font-medium">Nenhuma publicação encontrada para esta visão.</p>
          </div>
        ) : (
          sortedPosts.map(post => (
            <PostCard key={post.id} post={post} view={layoutView} />
          ))
        )}
      </div>
    </div>
  );
}

function PostCard({ post, view }: { post: Post, view: LayoutView }) {
  const secretariat = SECRETARIATS.find(s => s.id === post.secretariatId);
  const formattedDate = new Date(post.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const isList = view === 'list';

  return (
    <article className={`bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all group cursor-pointer ${isList ? 'flex flex-col sm:flex-row' : 'flex flex-col'}`}>
      {post.imageUrl ? (
        <div className={`overflow-hidden relative flex-shrink-0 ${isList ? 'sm:w-64 h-48 sm:h-auto' : 'h-48'}`}>
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0" />
          <div className="absolute top-3 right-3">
             <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur shadow-sm text-slate-800">
                {secretariat?.name}
             </span>
          </div>
        </div>
      ) : (
        <div className={`bg-gradient-to-r from-[#006eb8] to-[#009e49] flex-shrink-0 ${isList ? 'h-3 sm:w-3 sm:h-auto sm:bg-gradient-to-b' : 'h-3 w-full'}`}></div>
      )}
      
      <div className={`p-5 flex flex-col flex-1 ${isList ? 'justify-between' : ''}`}>
        <div className="flex items-start justify-between mb-3 gap-4">
          <h3 className={`font-bold text-slate-800 leading-tight group-hover:text-[#006eb8] transition-colors ${isList ? 'text-xl' : 'text-lg line-clamp-2'}`}>
            {post.title}
          </h3>
          <button className="text-slate-400 hover:text-slate-800 p-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
            <MoreHorizontal size={18} />
          </button>
        </div>

        <p className={`text-sm text-slate-600 mb-5 whitespace-pre-wrap flex-1 ${isList ? 'line-clamp-2' : 'line-clamp-3'}`}>
          {post.content}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto pt-4 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            {post.isImportant && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
                <Star size={10} /> Destaque
              </span>
            )}
            {post.isForInstagram && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-pink-100 text-pink-800">
                <Instagram size={10} /> Instagram
              </span>
            )}
            {post.isForBlog && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-[#006eb8]">
                <FileText size={10} /> Blog
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shadow-sm flex-shrink-0">
              <User size={14} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-800 leading-none">{post.author}</p>
              <p className="text-[10px] text-slate-500 mt-1 font-medium">{formattedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
