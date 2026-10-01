export type SecretariatId = 
  | 'principal' 
  | 'administracao' 
  | 'educacao' 
  | 'saude' 
  | 'obras' 
  | 'fazenda' 
  | 'turismo' 
  | 'social' 
  | 'cultura' 
  | 'esportes' 
  | 'meio_ambiente' 
  | 'seguranca';

export interface SecretariatInfo {
  id: SecretariatId;
  name: string;
  icon: any; // React Component Type
}

export interface Post {
  id: string;
  secretariatId: SecretariatId;
  title: string;
  content: string;
  imageUrl?: string;
  isImportant: boolean;
  isForInstagram: boolean;
  isForBlog: boolean;
  createdAt: string;
  author: string;
}
