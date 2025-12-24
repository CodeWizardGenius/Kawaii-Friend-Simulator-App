import { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { BottomNav } from './components/BottomNav';
import { Bell, Volume2, Moon, Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<'home' | 'settings'>('home');
  const [settings, setSettings] = useState([
    {
      id: 'notifications',
      label: 'Notifications',
      description: 'Get reminders to check in',
      icon: Bell,
      enabled: true,
    },
    {
      id: 'sound',
      label: 'Sound Effects',
      description: 'Cute sounds & music',
      icon: Volume2,
      enabled: true,
    },
    {
      id: 'nightMode',
      label: 'Night Mode',
      description: 'Darker theme for evenings',
      icon: Moon,
      enabled: false,
    },
    {
      id: 'animations',
      label: 'Animations',
      description: 'Fun animated effects',
      icon: Sparkles,
      enabled: true,
    },
    {
      id: 'autoLove',
      label: 'Auto Love',
      description: 'Send love automatically',
      icon: Heart,
      enabled: false,
    },
  ]);

  const handleToggle = (id: string) => {
    setSettings(settings.map(setting => 
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ));
  };

  const handleActionClick = (action: string) => {
    console.log(`Action clicked: ${action}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Mobile Container */}
      <div className="max-w-md mx-auto min-h-screen bg-gradient-to-br from-pink-50/50 via-purple-50/50 to-blue-50/50 pb-24 relative">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-purple-100 shadow-sm">
          <div className="px-6 py-4">
            <h1 className="text-purple-900 text-center">
              {activeScreen === 'home' ? '✨ My Companion ✨' : '⚙️ Settings'}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto">
          {activeScreen === 'home' ? (
            <HomeScreen
              companionName="Bunny"
              mood="Happy"
              level={12}
              onActionClick={handleActionClick}
            />
          ) : (
            <SettingsScreen
              settings={settings}
              onToggle={handleToggle}
            />
          )}
        </div>

        {/* Bottom Navigation */}
        <BottomNav
          activeScreen={activeScreen}
          onNavigate={setActiveScreen}
        />
      </div>
    </div>
  );
}
