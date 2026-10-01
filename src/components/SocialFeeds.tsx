import React from 'react';
import { Post } from '../types';
import { Heart, MessageCircle, Send, Bookmark, ThumbsUp, Share2, MoreHorizontal, Globe, Instagram, Linkedin } from 'lucide-react';

export function SocialFeeds({ posts }: { posts: Post[] }) {
  // Get latest posts flagged for social media
  const igPosts = posts.filter(p => p.isForInstagram && p.imageUrl).slice(0, 1);
  const liPosts = posts.filter(p => p.isForBlog && p.imageUrl).slice(0, 1);

  if (igPosts.length === 0 && liPosts.length === 0) return null;

  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <h2 className="text-xl font-semibold text-slate-800">Extração para Redes Sociais</h2>
        <span className="text-sm text-slate-500 hidden sm:block">Simulação de como os posts aparecerão</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {igPosts.map(post => <InstagramMock key={`ig-${post.id}`} post={post} />)}
        {liPosts.map(post => <LinkedinMock key={`li-${post.id}`} post={post} />)}
      </div>
    </div>
  );
}

function InstagramMock({ post }: { post: Post }) {
  return (
    <div className="bg-white border border-slate-200 rounded-sm overflow-hidden font-sans w-full shadow-sm hover:shadow-md transition-shadow">
      {/* Platform Badge */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-3 py-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
        <Instagram size={14} /> Instagram Preview
      </div>
      
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px]">
            <div className="w-full h-full bg-white rounded-full border border-white flex items-center justify-center overflow-hidden">
              <img src="https://ui-avatars.com/api/?name=PB&background=006eb8&color=fff" className="w-full h-full object-cover" alt="avatar" />
            </div>
          </div>
          <div>
            <span className="text-sm font-semibold text-slate-900 leading-none block">prefeituradebrotas</span>
            <span className="text-[10px] text-slate-500">Brotas, São Paulo</span>
          </div>
        </div>
        <MoreHorizontal size={20} className="text-slate-500" />
      </div>
      
      {/* Image */}
      <div className="aspect-square bg-slate-100 relative">
        <img src={post.imageUrl} alt="post" className="w-full h-full object-cover" />
      </div>
      
      {/* Actions */}
      <div className="p-3">
        <div className="flex justify-between items-center mb-3">
          <div className="flex gap-4 text-slate-800">
            <Heart size={24} className="hover:text-red-500 cursor-pointer transition-colors" />
            <MessageCircle size={24} className="hover:text-slate-500 cursor-pointer transition-colors" />
            <Send size={24} className="hover:text-slate-500 cursor-pointer transition-colors" />
          </div>
          <Bookmark size={24} className="text-slate-800 hover:text-slate-500 cursor-pointer transition-colors" />
        </div>
        
        <p className="text-sm font-semibold text-slate-900 mb-1">Curtido por milhares de pessoas</p>
        <p className="text-sm text-slate-900 line-clamp-3">
          <span className="font-semibold mr-2">prefeituradebrotas</span>
          {post.content}
        </p>
      </div>
    </div>
  );
}

function LinkedinMock({ post }: { post: Post }) {
  return (
    <div className="bg-white border border-slate-200 rounded-sm overflow-hidden font-sans w-full shadow-sm hover:shadow-md transition-shadow flex flex-col">
      {/* Platform Badge */}
      <div className="bg-[#0a66c2] text-white px-3 py-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
        <Linkedin size={14} /> LinkedIn Preview
      </div>

      {/* Header */}
      <div className="flex items-start gap-3 p-4">
        <img src="https://ui-avatars.com/api/?name=PB&background=006eb8&color=fff" className="w-12 h-12 rounded-sm" alt="avatar" />
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-slate-900 leading-tight hover:text-[#0a66c2] cursor-pointer">
            Prefeitura Municipal de Brotas
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">Instituição Governamental</p>
          <div className="flex items-center gap-1 mt-0.5 text-xs text-slate-500">
            <span>Agora mesmo</span>
            <span>•</span>
            <Globe size={12} />
          </div>
        </div>
        <MoreHorizontal size={20} className="text-slate-500 cursor-pointer" />
      </div>
      
      {/* Content */}
      <div className="px-4 pb-3 text-sm text-slate-800 whitespace-pre-wrap line-clamp-4">
        {post.content}
      </div>
      
      {/* Image */}
      <div className="aspect-video bg-slate-100 mt-auto">
        <img src={post.imageUrl} alt="post" className="w-full h-full object-cover" />
      </div>
      
      {/* Stats & Actions */}
      <div className="p-3 bg-slate-50/50">
        <div className="flex items-center gap-1 border-b border-slate-200 pb-2 mb-2 px-1">
          <div className="w-4 h-4 rounded-full bg-[#0a66c2] flex items-center justify-center">
            <ThumbsUp size={8} className="text-white fill-white" />
          </div>
          <span className="text-xs text-slate-500 hover:text-[#0a66c2] cursor-pointer">Seja o primeiro a curtir</span>
        </div>
        
        <div className="flex justify-between items-center text-slate-500">
          <button className="flex items-center justify-center gap-1.5 text-xs font-semibold hover:bg-slate-100 hover:text-slate-700 py-2 rounded-sm flex-1 transition-colors">
            <ThumbsUp size={18} /> Curtir
          </button>
          <button className="flex items-center justify-center gap-1.5 text-xs font-semibold hover:bg-slate-100 hover:text-slate-700 py-2 rounded-sm flex-1 transition-colors">
            <MessageCircle size={18} /> Comentar
          </button>
          <button className="flex items-center justify-center gap-1.5 text-xs font-semibold hover:bg-slate-100 hover:text-slate-700 py-2 rounded-sm flex-1 transition-colors hidden sm:flex">
            <Share2 size={18} /> Compartilhar
          </button>
        </div>
      </div>
    </div>
  );
}
