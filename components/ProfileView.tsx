'use client';
import { useState } from 'react';
import { User, Mail, Shield, Bell, LogOut, ChevronRight, HelpCircle, Brain, Globe, Settings as SettingsIcon, Link as LinkIcon, Database, CreditCard, Trash2, ChevronLeft, Check, AlertTriangle, Play, CheckCircle, Search, Loader2, Sparkles } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { INDIAN_LANGUAGES, WORLDWIDE_LANGUAGES, ALL_LANGUAGES } from '../lib/languages';

export default function ProfileView() {
  const { user, userProfile, signOut } = useAuth();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = [
    { id: 'profile', title: 'Profile Management', icon: <User className="w-5 h-5" /> },
    { id: 'ai', title: 'AI Preferences', icon: <Brain className="w-5 h-5" /> },
    { id: 'language', title: 'Language & Region', icon: <Globe className="w-5 h-5" /> },
    { id: 'transcription', title: 'Transcription Quality', icon: <SettingsIcon className="w-5 h-5" /> },
    { id: 'notifications', title: 'Notifications', icon: <Bell className="w-5 h-5" /> },
    { id: 'integrations', title: 'Integrations', icon: <LinkIcon className="w-5 h-5" /> },
    { id: 'privacy', title: 'Privacy Controls', icon: <Shield className="w-5 h-5" /> },
    { id: 'storage', title: 'Storage Usage', icon: <Database className="w-5 h-5" /> },
    { id: 'subscription', title: 'Subscription', icon: <CreditCard className="w-5 h-5" /> },
  ];

  if (activeSection) {
    return (
      <div className="flex-1 bg-slate-50 flex flex-col overflow-hidden">
        <div className="pt-[max(env(safe-area-inset-top),1rem)] px-4 pb-4 bg-white sticky top-0 z-10 border-b border-slate-100 flex items-center gap-3">
          <button onClick={() => setActiveSection(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ChevronLeft className="w-5 h-5 text-slate-700" />
          </button>
          <h2 className="font-semibold text-lg text-slate-900">
            {sections.find(s => s.id === activeSection)?.title || 'Settings'}
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 md:p-6 no-scrollbar">
          {activeSection === 'profile' && <ProfileManagement key={user?.uid + (user?.displayName || '')} user={user} />}
          {activeSection === 'ai' && <AIPreferences key={userProfile?.updatedAt || 'ai'} />}
          {activeSection === 'language' && <LanguageSelection key={userProfile?.updatedAt || 'lang'} />}
          {activeSection === 'transcription' && <TranscriptionQuality key={userProfile?.updatedAt || 'trans'} />}
          {activeSection === 'notifications' && <NotificationPreferences key={userProfile?.updatedAt || 'notif'} />}
          {activeSection === 'integrations' && <Integrations />}
          {activeSection === 'privacy' && <PrivacyControls key={userProfile?.updatedAt || 'priv'} />}
          {activeSection === 'storage' && <StorageUsage />}
          {activeSection === 'subscription' && <SubscriptionPage />}
        </div>
      </div>
    );
  }

    return (
      <div className="flex-1 bg-slate-50 overflow-y-auto no-scrollbar pb-safe-bottom pb-24">
        <div className="pt-[max(env(safe-area-inset-top),3rem)] px-6 pb-6 bg-slate-50/80 backdrop-blur-xl sticky top-0 z-10">
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Settings</h1>
        </div>
  
        <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-6">
          {/* User Info Card */}
          <div className="bg-white p-6 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-5">
            <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center text-xl font-bold uppercase">
              {user?.displayName ? user.displayName.substring(0, 2) : (user?.email ? user.email.substring(0, 2) : 'U')}
            </div>
            <div className="flex-1 overflow-hidden">
              <h2 className="text-lg font-semibold text-slate-900 truncate">{user?.displayName || 'User'}</h2>
              <p className="text-sm text-slate-500 truncate">{user?.email}</p>
            </div>
            <button onClick={() => setActiveSection('profile')} className="px-4 py-2 bg-slate-100 text-slate-700 font-medium text-sm rounded-xl hover:bg-slate-200 transition-colors active:scale-95">
              Edit
            </button>
          </div>
  
          {/* Settings Sections */}
          <div className="space-y-6">
            <section>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Account & Preferences</h3>
              <div className="bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                {sections.slice(0, 5).map((section, idx) => (
                  <div key={section.id}>
                    <SettingsRow 
                      icon={section.icon} 
                      label={section.title} 
                      onClick={() => setActiveSection(section.id)}
                    />
                    {idx < 4 && <div className="h-px bg-slate-50 ml-12" />}
                  </div>
                ))}
              </div>
            </section>
  
            <section>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Data & Privacy</h3>
              <div className="bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                {sections.slice(5, 8).map((section, idx) => (
                  <div key={section.id}>
                    <SettingsRow 
                      icon={section.icon} 
                      label={section.title} 
                      onClick={() => setActiveSection(section.id)}
                    />
                    {idx < 2 && <div className="h-px bg-slate-50 ml-12" />}
                  </div>
                ))}
              </div>
            </section>
            
            <section>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Billing</h3>
              <div className="bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                <SettingsRow 
                  icon={sections[8].icon} 
                  label={sections[8].title} 
                  onClick={() => setActiveSection(sections[8].id)}
                />
              </div>
            </section>
  
            <section className="pt-2">
              <div className="bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                 <button onClick={signOut} className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-colors active:bg-red-100">
                    <div className="flex items-center gap-3 text-red-500">
                      <LogOut className="w-5 h-5" strokeWidth={2} />
                      <span className="text-sm font-medium">Log Out</span>
                    </div>
                 </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
}

function SettingsRow({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left active:bg-slate-100">
      <div className="flex items-center gap-3">
        <div className="text-slate-400">{icon}</div>
        <span className="text-sm font-medium text-slate-700">{label}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-slate-300" strokeWidth={2} />
    </button>
  );
}

// Sub-components

function ProfileManagement({ user }: { user: any }) {
  const { updateDisplayName, userProfile, deleteAccount } = useAuth();
  const [name, setName] = useState(user?.displayName || userProfile?.displayName || '');
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!name.trim()) {
      setStatus({ type: 'error', message: 'Display name cannot be empty.' });
      return;
    }
    setSaving(true);
    setStatus(null);
    try {
      await updateDisplayName(name.trim());
      setStatus({ type: 'success', message: 'Profile changes saved successfully!' });
      setTimeout(() => setStatus(null), 4000);
    } catch (err: any) {
      console.error("Failed to update display name:", err);
      setStatus({ type: 'error', message: err.message || 'Failed to save changes. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setDeleting(true);
    try {
      await deleteAccount();
    } catch (err: any) {
      alert("Failed to delete account: " + err.message);
      setDeleting(false);
      setConfirmDelete(false);
    }
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <form onSubmit={handleSave} className="bg-white p-6 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-4">
        {status && (
          <div className={`p-4 rounded-xl text-sm font-medium flex items-center gap-3 transition-all ${
            status.type === 'success' 
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {status.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
            )}
            <span>{status.message}</span>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Display Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={e => {
              setName(e.target.value);
              if (status) setStatus(null);
            }} 
            placeholder="Enter your name"
            className="w-full shadow-[0_2px_8px_rgb(0,0,0,0.04)] rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-shadow bg-slate-50/50 border border-slate-100 text-slate-900 font-medium" 
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
          <input 
            type="email" 
            value={user?.email || userProfile?.email || ''} 
            disabled 
            className="w-full rounded-xl px-4 py-3.5 bg-slate-100/80 text-slate-500 border border-slate-200 font-medium cursor-not-allowed" 
          />
          <span className="text-xs text-slate-400 mt-1 block">Email address is managed via your sign-in provider.</span>
        </div>

        <button 
          type="submit"
          disabled={saving}
          className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white rounded-xl font-semibold shadow-[0_8px_25px_rgba(79,70,229,0.3)] active:scale-95 transition-all mt-4 flex items-center justify-center gap-2"
        >
          {saving ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <Check className="w-5 h-5" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </form>

      <div className="bg-red-50 p-6 rounded-[20px] border border-red-100 space-y-4">
        <h3 className="text-red-800 font-semibold flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-600" strokeWidth={2} /> Danger Zone
        </h3>
        <p className="text-sm text-red-600/80">
          Permanently delete your account and all associated recordings, transcripts, and workspaces. This action cannot be undone.
        </p>

        {confirmDelete ? (
          <div className="space-y-3 pt-2">
            <p className="text-xs font-bold uppercase tracking-wider text-red-700">Are you absolutely sure?</p>
            <div className="flex gap-3">
              <button 
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold text-sm shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                Yes, Delete Account
              </button>
              <button 
                type="button"
                onClick={() => setConfirmDelete(false)}
                disabled={deleting}
                className="px-4 py-3 bg-white text-slate-700 border border-slate-200 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button 
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="px-4 py-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl font-semibold active:scale-95 transition-all flex items-center justify-center w-full gap-2 text-sm"
          >
            <Trash2 className="w-4 h-4" strokeWidth={2} /> Delete Account
          </button>
        )}
      </div>
    </div>
  );
}

function AIPreferences() {
  const { userProfile, updatePreferences } = useAuth();
  const [style, setStyle] = useState(userProfile?.aiPreferences?.summaryStyle || 'Bullet Points');
  const [extractTasks, setExtractTasks] = useState(userProfile?.aiPreferences?.autoExtractActionItems ?? true);
  const [sentiment, setSentiment] = useState(userProfile?.aiPreferences?.sentimentAnalysis ?? true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const saveSettings = async (nextStyle = style, nextTasks = extractTasks, nextSentiment = sentiment) => {
    setSaving(true);
    setSaved(false);
    try {
      await updatePreferences({
        aiPreferences: {
          summaryStyle: nextStyle,
          autoExtractActionItems: nextTasks,
          sentimentAnalysis: nextSentiment,
        }
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      console.error("Failed to save AI preferences:", e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="bg-white p-6 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6">
        {saved && (
          <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            AI preferences saved!
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-1">Default Summary Style</label>
          <p className="text-xs text-slate-500 mb-3">Choose how AI generates meeting summaries by default.</p>
          <select 
            value={style}
            onChange={e => {
              setStyle(e.target.value);
              saveSettings(e.target.value, extractTasks, sentiment);
            }}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-500 bg-white text-slate-800 font-medium text-sm"
          >
            <option value="Bullet Points">Bullet Points (Action-focused & concise)</option>
            <option value="Detailed Paragraphs">Detailed Paragraphs (In-depth review)</option>
            <option value="Executive Overview">Executive Overview (High-level briefing)</option>
          </select>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div>
            <div className="text-sm font-semibold text-slate-900">Auto-Extract Action Items</div>
            <div className="text-xs text-slate-500">Automatically identify tasks, assignees, and deadlines.</div>
          </div>
          <Toggle 
            checked={extractTasks} 
            onChange={val => {
              setExtractTasks(val);
              saveSettings(style, val, sentiment);
            }} 
          />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div>
            <div className="text-sm font-semibold text-slate-900">Sentiment Analysis</div>
            <div className="text-xs text-slate-500">Detect overall tone, consensus, and objections in conversations.</div>
          </div>
          <Toggle 
            checked={sentiment} 
            onChange={val => {
              setSentiment(val);
              saveSettings(style, extractTasks, val);
            }} 
          />
        </div>

        <button
          type="button"
          onClick={() => saveSettings(style, extractTasks, sentiment)}
          disabled={saving}
          className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 mt-4"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
          Save AI Preferences
        </button>
      </div>
    </div>
  );
}

function LanguageSelection() {
  const { userProfile, updatePreferences } = useAuth();
  const [uiLang, setUiLang] = useState(userProfile?.languageSettings?.uiLanguage || 'English (US)');
  const [spokenLang, setSpokenLang] = useState(userProfile?.languageSettings?.defaultSpokenLanguage || 'English');
  const [autoDetect, setAutoDetect] = useState(userProfile?.languageSettings?.autoDetect ?? true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const saveLanguageSettings = async (nextUi = uiLang, nextSpoken = spokenLang, nextAuto = autoDetect) => {
    setSaving(true);
    setStatus(null);
    try {
      await updatePreferences({
        languageSettings: {
          uiLanguage: nextUi,
          defaultSpokenLanguage: nextSpoken,
          autoDetect: nextAuto,
        }
      });
      setStatus({ type: 'success', message: 'Language & region preferences saved!' });
      setTimeout(() => setStatus(null), 4000);
    } catch (err: any) {
      console.error("Failed to save language settings:", err);
      setStatus({ type: 'error', message: 'Failed to save settings. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const popularIndianPills = [
    { name: 'Hindi', native: 'हिन्दी' },
    { name: 'English (India)', native: 'English (India)' },
    { name: 'Bengali', native: 'বাংলা' },
    { name: 'Telugu', native: 'తెలుగు' },
    { name: 'Marathi', native: 'मराठी' },
    { name: 'Tamil', native: 'தமிழ்' },
    { name: 'Urdu', native: 'اردو' },
    { name: 'Gujarati', native: 'ગુજરાતી' },
    { name: 'Kannada', native: 'ಕನ್ನಡ' },
    { name: 'Malayalam', native: 'മലയാളം' },
    { name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { name: 'Odia', native: 'ଓଡ଼ିଆ' },
  ];

  const filteredIndianLangs = INDIAN_LANGUAGES.filter(l => 
    !searchQuery || 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.nativeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredWorldwideLangs = WORLDWIDE_LANGUAGES.filter(l => 
    !searchQuery || 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.nativeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="bg-white p-6 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6">
        {status && (
          <div className={`p-4 rounded-xl text-sm font-medium flex items-center gap-3 transition-all ${
            status.type === 'success' 
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {status.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
            )}
            <span>{status.message}</span>
          </div>
        )}

        {/* Quick Filter Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search language (e.g. Hindi, Tamil, Telugu, Spanish)..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium placeholder:text-slate-400"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick select Indian Languages Pills */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <span>🇮🇳</span> Quick Pick Indian Spoken Languages
            </span>
            <span className="text-[11px] font-semibold text-brand-600">22+ Included</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularIndianPills.map(item => {
              const isSelected = spokenLang === item.name || (item.name === 'Hindi' && spokenLang === 'Hindi');
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    setSpokenLang(item.name);
                    saveLanguageSettings(uiLang, item.name, autoDetect);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 flex items-center gap-1.5 ${
                    isSelected 
                      ? 'bg-brand-600 text-white shadow-sm' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{item.name}</span>
                  <span className={`text-[10px] ${isSelected ? 'text-brand-200' : 'text-slate-400'}`}>
                    ({item.native})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Default Spoken Language */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-1">
            Default Spoken Language
          </label>
          <p className="text-xs text-slate-500 mb-3">
            The primary language for AI transcription, speaker diarization, and summary generation.
          </p>
          <select 
            value={spokenLang}
            onChange={e => {
              setSpokenLang(e.target.value);
              saveLanguageSettings(uiLang, e.target.value, autoDetect);
            }}
            className="w-full border border-slate-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white text-slate-800 font-semibold text-sm shadow-sm"
          >
            <option value="English">English (Global / Standard)</option>
            <optgroup label="🇮🇳 Indian Languages (All 22 Scheduled & Regional)">
              {filteredIndianLangs.map(lang => (
                <option key={lang.code} value={lang.name}>
                  {lang.name} — {lang.nativeName}
                </option>
              ))}
            </optgroup>
            <optgroup label="🌍 Worldwide Spoken Languages">
              {filteredWorldwideLangs.map(lang => (
                <option key={lang.code} value={lang.name}>
                  {lang.name} — {lang.nativeName}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* UI Language */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-1">UI Language</label>
          <p className="text-xs text-slate-500 mb-3">Language used across buttons, menus, and application screens.</p>
          <select 
            value={uiLang}
            onChange={e => {
              setUiLang(e.target.value);
              saveLanguageSettings(e.target.value, spokenLang, autoDetect);
            }}
            className="w-full border border-slate-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white text-slate-800 font-semibold text-sm shadow-sm"
          >
            <option value="English (US)">English (US)</option>
            <optgroup label="🇮🇳 Indian Languages">
              {filteredIndianLangs.map(lang => (
                <option key={lang.code} value={lang.name}>
                  {lang.name} — {lang.nativeName}
                </option>
              ))}
            </optgroup>
            <optgroup label="🌍 Worldwide Spoken Languages">
              {filteredWorldwideLangs.map(lang => (
                <option key={lang.code} value={lang.name}>
                  {lang.name} — {lang.nativeName}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Auto Detect Language */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="pr-4">
            <div className="text-sm font-semibold text-slate-900">Auto-Detect Language</div>
            <div className="text-xs text-slate-500 mt-0.5">
              Attempt to detect spoken Indian or worldwide languages automatically during live recording and media uploads.
            </div>
          </div>
          <Toggle 
            checked={autoDetect} 
            onChange={val => {
              setAutoDetect(val);
              saveLanguageSettings(uiLang, spokenLang, val);
            }} 
          />
        </div>

        {/* Save Changes Button */}
        <button
          type="button"
          onClick={() => saveLanguageSettings(uiLang, spokenLang, autoDetect)}
          disabled={saving}
          className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white rounded-xl font-semibold shadow-[0_8px_25px_rgba(79,70,229,0.3)] active:scale-95 transition-all mt-4 flex items-center justify-center gap-2"
        >
          {saving ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Saving Language Preferences...</span>
            </>
          ) : (
            <>
              <Check className="w-5 h-5" />
              <span>Save Language Preferences</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function TranscriptionQuality() {
  const { userProfile, updatePreferences } = useAuth();
  const [quality, setQuality] = useState<'high' | 'standard'>(userProfile?.transcriptionQuality || 'high');
  const [saved, setSaved] = useState(false);

  const selectQuality = async (val: 'high' | 'standard') => {
    setQuality(val);
    try {
      await updatePreferences({ transcriptionQuality: val });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="bg-white p-6 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-4">
        {saved && (
          <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            Transcription quality saved!
          </div>
        )}
        <div 
          onClick={() => selectQuality('high')}
          className={`p-5 rounded-2xl flex items-start gap-4 cursor-pointer transition-all ${
            quality === 'high' 
              ? 'border-2 border-brand-500 bg-brand-50/50 shadow-sm' 
              : 'border border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="mt-0.5 text-brand-600">
            {quality === 'high' ? (
              <CheckCircle className="w-5 h-5 text-brand-600" />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
            )}
          </div>
          <div>
            <div className="font-semibold text-slate-900 flex items-center gap-2">
              <span>High Accuracy (Gemini 2.5 Flash)</span>
              <span className="text-[10px] uppercase font-bold bg-brand-600 text-white px-2 py-0.5 rounded-full">Pro</span>
            </div>
            <div className="text-sm text-slate-600 mt-1 leading-relaxed">
              Uses advanced multilingual models for near-perfect transcription across all Indian languages and dialects. Recommended for meetings and accents.
            </div>
          </div>
        </div>

        <div 
          onClick={() => selectQuality('standard')}
          className={`p-5 rounded-2xl flex items-start gap-4 cursor-pointer transition-all ${
            quality === 'standard' 
              ? 'border-2 border-brand-500 bg-brand-50/50 shadow-sm' 
              : 'border border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="mt-0.5">
            {quality === 'standard' ? (
              <CheckCircle className="w-5 h-5 text-brand-600" />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
            )}
          </div>
          <div>
            <div className="font-semibold text-slate-900">Standard Speed</div>
            <div className="text-sm text-slate-500 mt-1 leading-relaxed">
              Faster processing times. Best for clear single-speaker recordings in quiet environments.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationPreferences() {
  const { userProfile, updatePreferences } = useAuth();
  const [prefs, setPrefs] = useState({
    recordingCompleted: userProfile?.notifications?.recordingCompleted ?? true,
    aiProcessingFinished: userProfile?.notifications?.aiProcessingFinished ?? true,
    newComments: userProfile?.notifications?.newComments ?? true,
    meetingReminders: userProfile?.notifications?.meetingReminders ?? true,
    weeklySummary: userProfile?.notifications?.weeklySummary ?? true,
    workspaceInvitations: userProfile?.notifications?.workspaceInvitations ?? true,
  });
  const [saved, setSaved] = useState(false);

  const togglePref = async (key: keyof typeof prefs) => {
    const updated = { ...prefs, [key]: !prefs[key] };
    setPrefs(updated);
    try {
      await updatePreferences({ notifications: updated });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="bg-white p-6 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6">
        {saved && (
          <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            Notification preferences saved!
          </div>
        )}

        <h3 className="text-sm font-semibold text-slate-900">Push Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-700 font-medium">Recording Completed</div>
            <Toggle checked={prefs.recordingCompleted} onChange={() => togglePref('recordingCompleted')} />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-700 font-medium">AI Processing Finished</div>
            <Toggle checked={prefs.aiProcessingFinished} onChange={() => togglePref('aiProcessingFinished')} />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-700 font-medium">New Comments & Mentions</div>
            <Toggle checked={prefs.newComments} onChange={() => togglePref('newComments')} />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-700 font-medium">Upcoming Meeting Reminders</div>
            <Toggle checked={prefs.meetingReminders} onChange={() => togglePref('meetingReminders')} />
          </div>
        </div>
        
        <div className="h-px bg-slate-100" />
        
        <h3 className="text-sm font-semibold text-slate-900">Email Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-700 font-medium">Weekly Summary</div>
            <Toggle checked={prefs.weeklySummary} onChange={() => togglePref('weeklySummary')} />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-700 font-medium">Workspace Invitations</div>
            <Toggle checked={prefs.workspaceInvitations} onChange={() => togglePref('workspaceInvitations')} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Integrations() {
  return (
    <div className="space-y-4 max-w-xl mx-auto">
      {[
        { name: 'Google Calendar', desc: 'Sync upcoming meetings and join links.', connected: true },
        { name: 'Microsoft Outlook', desc: 'Sync Outlook events and contacts.', connected: false },
        { name: 'Zoom', desc: 'Automatically import cloud recordings.', connected: false },
        { name: 'Slack', desc: 'Share meeting summaries to channels.', connected: false },
      ].map((int, i) => (
        <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <div className="font-medium text-slate-900">{int.name}</div>
            <div className="text-sm text-slate-500 mt-0.5">{int.desc}</div>
          </div>
          <button className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${int.connected ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-brand-50 text-brand-600 hover:bg-brand-100'}`}>
            {int.connected ? 'Disconnect' : 'Connect'}
          </button>
        </div>
      ))}
    </div>
  );
}

function PrivacyControls() {
  const { userProfile, updatePreferences } = useAuth();
  const [allowAi, setAllowAi] = useState(userProfile?.privacyControls?.allowAiTraining ?? false);
  const [analytics, setAnalytics] = useState(userProfile?.privacyControls?.shareAnalytics ?? true);
  const [saved, setSaved] = useState(false);

  const savePrivacy = async (nextAi: boolean, nextAnalytics: boolean) => {
    setAllowAi(nextAi);
    setAnalytics(nextAnalytics);
    try {
      await updatePreferences({
        privacyControls: {
          allowAiTraining: nextAi,
          shareAnalytics: nextAnalytics,
        }
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="bg-white p-6 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6">
        {saved && (
          <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            Privacy settings updated!
          </div>
        )}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-900">Allow AI Training</div>
            <div className="text-xs text-slate-500 mt-1 max-w-[250px]">Allow your anonymized data to be used to improve AI models.</div>
          </div>
          <Toggle checked={allowAi} onChange={val => savePrivacy(val, analytics)} />
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div>
            <div className="text-sm font-semibold text-slate-900">Share Analytics</div>
            <div className="text-xs text-slate-500 mt-1 max-w-[250px]">Send anonymous usage data to help us improve the app.</div>
          </div>
          <Toggle checked={analytics} onChange={val => savePrivacy(allowAi, val)} />
        </div>
      </div>
    </div>
  );
}

function StorageUsage() {
  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="bg-white p-6 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex items-end justify-between mb-2">
          <div>
            <div className="text-3xl font-display font-semibold text-slate-900">2.4 GB</div>
            <div className="text-sm text-slate-500">used of 5 GB</div>
          </div>
          <div className="text-sm font-medium text-brand-600">48% Full</div>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-6">
          <div className="h-full bg-brand-500 rounded-full" style={{ width: '48%' }} />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-brand-500" /> Audio Files</div>
            <div className="text-slate-600">1.8 GB</div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-indigo-500" /> Transcripts</div>
            <div className="text-slate-600">400 MB</div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500" /> Attachments</div>
            <div className="text-slate-600">200 MB</div>
          </div>
        </div>
        
        <button className="w-full mt-8 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors">
          Manage Storage
        </button>
      </div>
    </div>
  );
}

function SubscriptionPage() {
  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="bg-gradient-to-br from-brand-600 to-brand-800 p-6 rounded-[20px] shadow-md text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-brand-100 text-sm font-medium mb-1">Current Plan</div>
            <div className="text-2xl font-display font-semibold">Pro Tier</div>
          </div>
          <div className="text-right">
            <div className="text-xl font-semibold">$12.99</div>
            <div className="text-brand-200 text-xs">per month</div>
          </div>
        </div>
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-brand-50"><Check className="w-4 h-4 text-brand-300" /> Unlimited transcriptions</div>
          <div className="flex items-center gap-2 text-sm text-brand-50"><Check className="w-4 h-4 text-brand-300" /> High-accuracy multilingual AI models (22+ Indian languages)</div>
          <div className="flex items-center gap-2 text-sm text-brand-50"><Check className="w-4 h-4 text-brand-300" /> Workspace collaboration</div>
          <div className="flex items-center gap-2 text-sm text-brand-50"><Check className="w-4 h-4 text-brand-300" /> 50GB Cloud Storage</div>
        </div>
        <div className="flex gap-3">
           <button className="flex-1 py-3 bg-white text-brand-700 rounded-xl font-semibold hover:bg-brand-50 transition-colors">Manage Billing</button>
           <button className="px-4 py-3 bg-brand-700/50 text-white rounded-xl font-semibold hover:bg-brand-700/70 transition-colors">Cancel Plan</button>
        </div>
      </div>
    </div>
  );
}

function Toggle({ 
  checked, 
  defaultChecked = false, 
  onChange 
}: { 
  checked?: boolean; 
  defaultChecked?: boolean; 
  onChange?: (val: boolean) => void; 
}) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const currentChecked = isControlled ? checked : internalChecked;

  const handleToggle = () => {
    const nextVal = !currentChecked;
    if (!isControlled) {
      setInternalChecked(nextVal);
    }
    onChange?.(nextVal);
  };

  return (
    <button 
      type="button"
      onClick={handleToggle}
      className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-brand-500/20 ${currentChecked ? 'bg-brand-500' : 'bg-slate-200'}`}
    >
      <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${currentChecked ? 'left-[22px]' : 'left-0.5'}`} />
    </button>
  );
}


