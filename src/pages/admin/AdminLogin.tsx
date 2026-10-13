import React, { useState } from 'react';
import { PageRoute, CompanySettings } from '../../types';
import { storage } from '../../services/storage';
import { BrandLogo } from '../../components/common/BrandLogo';
import { ArrowLeft, ArrowRight, ShieldAlert, Lock, Mail, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onNavigate: (page: PageRoute) => void;
  onLoginSuccess: () => void;
  settings: CompanySettings;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onNavigate,
  onLoginSuccess,
  settings,
}) => {
  // Strictly enforce development mode via Vite's import.meta.env.DEV
  const isDevelopment = Boolean(import.meta.env.DEV);

  // Production authentication state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEnterDashboardDev = () => {
    if (!isDevelopment) return;
    storage.setAdminAuthenticated(true);
    onLoginSuccess();
    onNavigate('admin');
  };

  const handleProductionLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    // In production without Supabase connected yet, securely notify administrator
    setTimeout(() => {
      setIsLoading(false);
      setErrorMessage(
        'Supabase backend authentication is not yet connected. Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable production RBAC login.'
      );
    }, 600);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 bg-[#FAF7F2]">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 sm:p-10 border border-[#E6D1A0]/60 shadow-xl space-y-6">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <BrandLogo customLogoUrl={settings.logoUrl} size="admin" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#2F211B]">
              Admin Control Center
            </h2>
            <p className="text-xs text-[#6E5A4E] mt-1 font-medium">
              {isDevelopment ? 'Development Access Mode' : 'Secure Administrator Sign In'} · IFYTEX Interior Design
            </p>
          </div>
        </div>

        {isDevelopment ? (
          /* Development Access Section */
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold">
                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Development Mode — Supabase Not Connected</span>
              </div>
              <p className="text-[11px] leading-relaxed text-amber-800">
                Temporary passwordless access is active solely in local development while Supabase is being provisioned. This bypass is completely disabled in production.
              </p>
            </div>

            <button
              type="button"
              onClick={handleEnterDashboardDev}
              className="w-full py-4 text-xs font-bold uppercase tracking-wider text-white bg-[#4A3023] hover:bg-[#2F211B] transition-all rounded-lg shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <span>Enter Admin Dashboard</span>
              <ArrowRight className="w-4 h-4 text-[#E6D1A0]" />
            </button>
          </div>
        ) : (
          /* Production Protected Authentication Form */
          <form onSubmit={handleProductionLogin} className="space-y-4">
            {errorMessage && (
              <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#2F211B] mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#6E5A4E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ifytex.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#E6D1A0]/60 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#C49A43]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2F211B] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#6E5A4E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#E6D1A0]/60 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#C49A43]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#4A3023] hover:bg-[#2F211B] transition-colors rounded-lg shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 text-[#E6D1A0]" />
                </>
              )}
            </button>
          </form>
        )}

        <div className="pt-2 text-center">
          <button
            onClick={() => onNavigate('home')}
            className="text-xs text-[#6E5A4E] hover:text-[#2F211B] font-medium flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Website
          </button>
        </div>
      </div>
    </div>
  );
};

