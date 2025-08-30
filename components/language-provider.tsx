"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ja' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      // localStorageから保存された言語を取得
      const savedLang = localStorage.getItem('preferredLanguage');
      if (savedLang && (savedLang === 'ja' || savedLang === 'en')) {
        return savedLang as Language;
      }
      
      // ブラウザの言語設定を検出
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('ja')) {
        return 'ja';
      }
      return 'en';
    }
    return 'en';
  });

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  // 言語変更時にlocalStorageに保存とhtml lang属性を更新
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLanguage', language);
      document.documentElement.lang = language;
    }
  }, [language]);

  // ブラウザの言語設定変更を監視
  useEffect(() => {
    const handleLanguageChange = () => {
      // 手動で設定された言語があれば優先
      const savedLang = localStorage.getItem('preferredLanguage');
      if (!savedLang) {
        const browserLang = navigator.language.toLowerCase();
        const newLang = browserLang.startsWith('ja') ? 'ja' : 'en';
        setLanguageState(newLang);
      }
    };

    window.addEventListener('languagechange', handleLanguageChange);
    return () => window.removeEventListener('languagechange', handleLanguageChange);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}