import React, { useState } from 'react';
import { SecretariatId, Post } from '../types';
import { Send, Image as ImageIcon, Link2, Plus, UploadCloud, Sparkles, FileText, Loader2, ArrowLeft } from 'lucide-react';

interface CreatePostFormProps {
  currentSecretariat: SecretariatId;
  onSubmit: (post: Omit<Post, 'id' | 'createdAt'>) => void;
}

type ViewState = 'idle' | 'write' | 'upload';

export function CreatePostForm({ currentSecretariat, onSubmit }: CreatePostFormProps) {
  const [viewState, setViewState] = useState<ViewState>('idle');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [isForInstagram, setIsForInstagram] = useState(false);
  const [isForBlog, setIsForBlog] = useState(false);
  const [showImageInput, setShowImageInput] = useState(false);
  
  // Simulated Upload State
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onSubmit({
      secretariatId: currentSecretariat,
      title,
      content,
      imageUrl: imageUrl.trim() || undefined,
      isImportant,
      isForInstagram,
      isForBlog,
      author: 'Usuário Padrão',
    });

    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setImageUrl('');
    setIsImportant(false);
    setIsForInstagram(false);
    setIsForBlog(false);
    setViewState('idle');
    setShowImageInput(false);
    setUploadedFile(null);
    setIsUploading(false);
    setIsGenerating(false);
  };

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      setTimeout(() => {
        setUploadedFile(e.target.files![0].name);
        setIsUploading(false);
      }, 1500);
    }
  };

  const handleSimulateAIGeneration = (type: 'article' | 'social') => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setViewState('write');
      if (type === 'article') {
        setTitle(`Resumo do Documento: ${uploadedFile?.replace('.pdf', '')}`);
        setContent(`Este é um artigo gerado automaticamente pela IA a partir do documento "${uploadedFile}".\n\nPrincipais pontos:\n1. Ação imediata necessária.\n2. Mudanças nos processos internos.\n3. Novos prazos definidos.\n\nEste texto foi estruturado para o portal de notícias.`);
        setIsForBlog(true);
      } else {
        setTitle(`Novidades sobre: ${uploadedFile?.replace('.pdf', '')}`);
        setContent(`🚨 Atenção Brotas! Acabamos de liberar uma atualização importante.\n\nConfira todos os detalhes do novo documento e fique por dentro das novidades. 📲 Compartilhe!\n\n#PrefeituraDeBrotas #Transparencia #Brotas360`);
        setIsForInstagram(true);
      }
      setShowImageInput(true);
      setImageUrl('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'); // generic tech/document image
    }, 2500);
  };

  if (currentSecretariat === 'principal') {
    return null;
  }

  if (viewState === 'idle') {
    return (
      <div className="mb-6 border-b border-slate-200 pb-4 flex items-center gap-4">
        <button 
          onClick={() => setViewState('write')}
          className="flex items-center gap-2 text-sm font-medium text-white bg-[#006eb8] hover:bg-[#005c9a] px-4 py-2.5 rounded-xl transition-colors shadow-sm"
        >
          <Plus size={18} /> Nova postagem / Notícia
        </button>
        <button 
          onClick={() => setViewState('upload')}
          className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 px-4 py-2.5 rounded-xl transition-colors shadow-sm"
        >
          <UploadCloud size={18} className="text-[#006eb8]" /> Subir Documento (IA)
        </button>
      </div>
    );
  }

  if (viewState === 'upload') {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 mb-8 animate-in fade-in slide-in-from-top-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setViewState('idle')} className="p-1.5 hover:bg-slate-100 rounded-full text-slate-500">
              <ArrowLeft size={20} />
            </button>
            <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
              <Sparkles size={20} className="text-[#006eb8]" /> Inteligência Artificial 360
            </h3>
          </div>
        </div>

        {!uploadedFile ? (
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center bg-slate-50 hover:bg-slate-100/50 transition-colors cursor-pointer relative">
            <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleSimulateUpload} accept=".pdf,.doc,.docx,.txt" disabled={isUploading} />
            {isUploading ? (
              <div className="flex flex-col items-center justify-center text-slate-500">
                <Loader2 size={40} className="animate-spin mb-4 text-[#006eb8]" />
                <p className="font-medium">Processando documento...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-500 pointer-events-none">
                <UploadCloud size={40} className="mb-4 text-slate-400" />
                <p className="font-medium text-slate-700 mb-1">Clique ou arraste um documento aqui</p>
                <p className="text-sm">PDF, DOCX, TXT até 10MB</p>
              </div>
            )}
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center gap-3 mb-6">
              <div className="bg-white p-2 rounded-lg text-[#006eb8] shadow-sm"><FileText size={24} /></div>
              <div className="flex-1">
                <p className="font-medium text-slate-800 line-clamp-1">{uploadedFile}</p>
                <p className="text-xs text-slate-500">Documento processado com sucesso</p>
              </div>
            </div>

            <h4 className="text-slate-700 font-medium mb-4">O que a IA deve fazer com este documento?</h4>
            
            {isGenerating ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <Sparkles size={32} className="text-[#006eb8] animate-pulse mb-4" />
                <p className="text-lg font-medium text-slate-700">A IA está lendo e transformando o documento...</p>
                <p className="text-sm text-slate-500 mt-2">Criando título, resumo e sugerindo formatação.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button 
                  onClick={() => handleSimulateAIGeneration('article')}
                  className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-slate-200 hover:border-[#006eb8] hover:shadow-md transition-all group text-center bg-white"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#006eb8] group-hover:scale-110 transition-transform">
                    <FileText size={24} />
                  </div>
                  <div>
                    <span className="block font-medium text-slate-800">Criar Artigo</span>
                    <span className="text-xs text-slate-500 mt-1 block">Gera uma notícia completa para o portal</span>
                  </div>
                </button>

                <button 
                  onClick={() => handleSimulateAIGeneration('social')}
                  className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-slate-200 hover:border-pink-500 hover:shadow-md transition-all group text-center bg-white"
                >
                  <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 group-hover:scale-110 transition-transform">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <span className="block font-medium text-slate-800">Criar Post Social</span>
                    <span className="text-xs text-slate-500 mt-1 block">Texto curto e engajador para Instagram</span>
                  </div>
                </button>

                <button 
                  onClick={() => {
                    setViewState('write');
                    setContent(`[Anexo: ${uploadedFile}]`);
                  }}
                  className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all group text-center bg-white"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:scale-110 transition-transform">
                    <Link2 size={24} />
                  </div>
                  <div>
                    <span className="block font-medium text-slate-800">Apenas Anexar</span>
                    <span className="text-xs text-slate-500 mt-1 block">Cria um post vazio com o arquivo para download</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 sm:p-8 mb-8 animate-in fade-in slide-in-from-top-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
          {uploadedFile ? <><Sparkles size={20} className="text-[#006eb8]" /> Revisar Publicação</> : 'Criar Nova Publicação'}
        </h3>
        <button 
          type="button" 
          onClick={resetForm}
          className="text-sm text-slate-500 hover:text-slate-800"
        >
          Cancelar
        </button>
      </div>
      
      <div className="space-y-5">
        <div>
          <input
            type="text"
            placeholder="Adicione um título impactante"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006eb8]/20 focus:border-[#006eb8] transition-all font-semibold text-lg placeholder:font-normal"
            required
          />
        </div>
        
        <div>
          <textarea
            placeholder="Comece a digitar o texto ou cole o conteúdo..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006eb8]/20 focus:border-[#006eb8] transition-all resize-y text-base"
            required
          />
        </div>

        {showImageInput && (
          <div className="animate-in fade-in zoom-in-95 duration-200">
             <input
              type="url"
              placeholder="URL da imagem de capa (ex: https://images.unsplash.com/...)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006eb8]/20 focus:border-[#006eb8] text-sm"
            />
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <button 
              type="button" 
              onClick={() => setShowImageInput(!showImageInput)}
              className={`flex items-center gap-2 text-sm font-medium ${showImageInput ? 'text-[#006eb8]' : 'text-slate-600 hover:text-[#006eb8]'} transition-colors`}
            >
              <ImageIcon size={18} /> Capa
            </button>
            
            <div className="hidden sm:block h-6 w-px bg-slate-200"></div>
            
            <label className="flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer hover:text-[#006eb8]">
              <input 
                type="checkbox" 
                checked={isImportant}
                onChange={(e) => setIsImportant(e.target.checked)}
                className="w-4 h-4 rounded text-[#006eb8] focus:ring-[#006eb8] border-slate-300" 
              />
              <span>Destaque Principal</span>
            </label>
            
            <label className="flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer hover:text-pink-600">
              <input 
                type="checkbox" 
                checked={isForInstagram}
                onChange={(e) => setIsForInstagram(e.target.checked)}
                className="w-4 h-4 rounded text-pink-600 focus:ring-pink-600 border-slate-300" 
              />
              <span>Instagram</span>
            </label>
            
            <label className="flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer hover:text-blue-700">
              <input 
                type="checkbox" 
                checked={isForBlog}
                onChange={(e) => setIsForBlog(e.target.checked)}
                className="w-4 h-4 rounded text-blue-700 focus:ring-blue-700 border-slate-300" 
              />
              <span>LinkedIn/Blog</span>
            </label>
          </div>

          <button 
            type="submit"
            disabled={!title.trim() || !content.trim()}
            className="flex items-center justify-center gap-2 bg-[#006eb8] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#005c9a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg w-full sm:w-auto"
          >
            <Send size={18} /> Publicar
          </button>
        </div>
      </div>
    </form>
  );
}
