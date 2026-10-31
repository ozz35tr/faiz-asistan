// Uygulama Ayarları
export const APP_TITLE = 'FaizAsistan-Ver1.0.2';

// Ortam kontrolü: Localhost mu yoksa sunucu mu?
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// API Endpoint (Vercel Serverless & API)
export const API_ENDPOINT = '/api/save'; 

// Varsayılan Finansal Değerler
export const DEFAULT_ANAPARA = 100000;
export const DEFAULT_FAIZ = 33.5;
export const DEFAULT_VADE = 32;
export const DEFAULT_STOPAJ = 17.5;

// Grafik Renkleri
export const COLORS = {
  primary: '#3b82f6', // blue-500
  secondary: '#10b981', // emerald-500
  accent: '#f59e0b', // amber-500
  slate: '#64748b' // slate-500
};
