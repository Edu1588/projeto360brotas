import React, { useState } from 'react';
import { Building2, KeyRound, ArrowLeft } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
  onCancel?: () => void;
}

export function Login({ onLogin, onCancel }: LoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1234') {
      onLogin();
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f8] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-sm overflow-hidden">
        <div className="flex h-2 w-full">
          <div className="flex-1 bg-[#006eb8]"></div>
          <div className="flex-1 bg-[#fcb712]"></div>
          <div className="flex-1 bg-[#009e49]"></div>
          <div className="flex-1 bg-[#e3000f]"></div>
        </div>
        <div className="p-8">
          {onCancel && (
            <button 
              onClick={onCancel}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 text-sm font-medium"
            >
              <ArrowLeft size={16} /> Voltar ao portal
            </button>
          )}

          <div className="flex items-center gap-3 mb-8 justify-center">
            <Building2 size={32} className="text-[#006eb8]" />
            <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">Brotas 360</h1>
          </div>
          
          <h2 className="text-xl font-medium text-slate-900 mb-6">Entrar no portal</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Senha de Acesso
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound size={18} className="text-slate-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  className={`block w-full pl-10 pr-3 py-2 border ${error ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'} rounded-sm focus:outline-none focus:ring-1 focus:ring-[#006eb8] focus:border-[#006eb8] sm:text-sm`}
                  placeholder="Digite a senha (1234)"
                />
              </div>
              {error && (
                <p className="mt-1.5 text-sm text-red-600">
                  Senha incorreta. Dica: use 1234
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-sm shadow-sm text-sm font-medium text-white bg-[#0078d4] hover:bg-[#106ebe] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0078d4] transition-colors"
            >
              Acessar
            </button>
          </form>

          <div className="mt-8 border-t border-slate-100 pt-6">
            <p className="text-xs text-center text-slate-500">
              Acesso restrito a servidores da Prefeitura Municipal de Brotas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
