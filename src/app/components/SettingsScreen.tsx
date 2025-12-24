import { Bell, Volume2, Moon, Sparkles, Heart, Palette } from 'lucide-react';
import { Switch } from './ui/switch';

interface Setting {
  id: string;
  label: string;
  description: string;
  icon: any;
  enabled: boolean;
}

interface SettingsScreenProps {
  settings: Setting[];
  onToggle: (id: string) => void;
}

export function SettingsScreen({ settings, onToggle }: SettingsScreenProps) {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Profile Card */}
      <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-6 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-md">
            <span className="text-5xl">🐰</span>
          </div>
          <div>
            <h3 className="text-purple-900">Your Companion</h3>
            <p className="text-purple-600">Customize your experience</p>
          </div>
        </div>
      </div>

      {/* Settings List */}
      <div className="space-y-3">
        {settings.map((setting) => {
          const Icon = setting.icon;
          return (
            <div
              key={setting.id}
              className="bg-white rounded-2xl p-5 shadow-md"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-purple-900">{setting.label}</div>
                    <p className="text-purple-500 text-sm mt-0.5">{setting.description}</p>
                  </div>
                </div>
                <Switch
                  checked={setting.enabled}
                  onCheckedChange={() => onToggle(setting.id)}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Theme Card */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <Palette className="w-6 h-6 text-purple-600" />
          <h3 className="text-purple-900">Color Theme</h3>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[
            { color: 'from-pink-200 to-pink-300', active: true },
            { color: 'from-purple-200 to-purple-300', active: false },
            { color: 'from-blue-200 to-blue-300', active: false },
            { color: 'from-green-200 to-green-300', active: false },
          ].map((theme, idx) => (
            <button
              key={idx}
              className={`h-14 rounded-xl bg-gradient-to-br ${theme.color} shadow-md hover:shadow-lg transition-all active:scale-95 ${
                theme.active ? 'ring-4 ring-purple-400' : ''
              }`}
            />
          ))}
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-6 shadow-md">
        <div className="text-center">
          <p className="text-purple-700">Version 1.0.0</p>
          <p className="text-purple-600 text-sm mt-1">Made with love 💕</p>
        </div>
      </div>
    </div>
  );
}
