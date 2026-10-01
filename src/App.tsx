/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SecretariatId, Post } from './types';
import { INITIAL_POSTS, SECRETARIATS } from './data';
import { AppLayout } from './components/AppLayout';
import { PostFeed } from './components/PostFeed';
import { CreatePostForm } from './components/CreatePostForm';
import { Login } from './components/Login';
import { SharePointHome } from './components/SharePointHome';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [currentSecretariat, setCurrentSecretariat] = useState<SecretariatId>('principal');
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);

  const handleCreatePost = (newPostData: Omit<Post, 'id' | 'createdAt'>) => {
    const newPost: Post = {
      ...newPostData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const filteredPosts = currentSecretariat === 'principal' 
    ? posts 
    : posts.filter(post => post.secretariatId === currentSecretariat);

  const secretariatInfo = SECRETARIATS.find(s => s.id === currentSecretariat);

  if (showLogin && !isAuthenticated) {
    return (
      <Login 
        onLogin={() => { 
          setIsAuthenticated(true); 
          setShowLogin(false); 
        }} 
        onCancel={() => setShowLogin(false)}
      />
    );
  }

  return (
    <AppLayout 
      currentSecretariat={currentSecretariat} 
      onSecretariatChange={setCurrentSecretariat}
      isAuthenticated={isAuthenticated}
      onLoginClick={() => setShowLogin(true)}
      onLogoutClick={() => {
        setIsAuthenticated(false);
        setCurrentSecretariat('principal');
      }}
    >
      {!isAuthenticated ? (
        currentSecretariat === 'principal' ? (
          <SharePointHome posts={posts} onSecretariatChange={setCurrentSecretariat} />
        ) : (
          <div className="p-4 md:p-8 max-w-6xl mx-auto w-full">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <PostFeed 
                posts={filteredPosts} 
                title={`Destaques e Atualizações`}
                description={`Últimas publicações da secretaria de ${secretariatInfo?.name}.`}
              />
            </div>
          </div>
        )
      ) : (
        currentSecretariat === 'principal' ? (
          <div className="p-4 md:p-8 max-w-6xl mx-auto w-full">
            <AdminDashboard onSecretariatChange={setCurrentSecretariat} />
          </div>
        ) : (
          <div className="p-4 md:p-8 max-w-6xl mx-auto w-full">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CreatePostForm 
                currentSecretariat={currentSecretariat} 
                onSubmit={handleCreatePost} 
              />
              
              <PostFeed 
                posts={filteredPosts} 
                title={`Destaques e Atualizações`}
                description={`Últimas publicações da secretaria de ${secretariatInfo?.name}.`}
              />
            </div>
          </div>
        )
      )}
    </AppLayout>
  );
}

