import { Home, Settings } from 'lucide-react';

interface BottomNavProps {
  activeScreen: 'home' | 'settings';
  onNavigate: (screen: 'home' | 'settings') => void;
}

export function BottomNav({ activeScreen, onNavigate }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-purple-100 shadow-lg">
      <div className="max-w-md mx-auto flex justify-around items-center px-6 py-4">
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeScreen === 'home' ? 'text-purple-600' : 'text-purple-400'
          }`}
        >
          <div className={`p-3 rounded-2xl transition-all ${
            activeScreen === 'home' ? 'bg-purple-100' : 'bg-transparent'
          }`}>
            <Home className="w-6 h-6" />
          </div>
          <span className="text-xs">Home</span>
        </button>
        
        <button
          onClick={() => onNavigate('settings')}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeScreen === 'settings' ? 'text-purple-600' : 'text-purple-400'
          }`}
        >
          <div className={`p-3 rounded-2xl transition-all ${
            activeScreen === 'settings' ? 'bg-purple-100' : 'bg-transparent'
          }`}>
            <Settings className="w-6 h-6" />
          </div>
          <span className="text-xs">Settings</span>
        </button>
      </div>
    </div>
  );
}
