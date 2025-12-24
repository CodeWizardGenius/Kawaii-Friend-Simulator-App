import { Heart, Sparkles, Cookie, Music } from 'lucide-react';

interface HomeScreenProps {
  companionName: string;
  mood: string;
  level: number;
  onActionClick: (action: string) => void;
}

export function HomeScreen({ companionName, mood, level, onActionClick }: HomeScreenProps) {
  const actions = [
    { id: 'feed', icon: Cookie, label: 'Feed', color: 'bg-pink-100' },
    { id: 'play', icon: Sparkles, label: 'Play', color: 'bg-purple-100' },
    { id: 'music', icon: Music, label: 'Music', color: 'bg-blue-100' },
    { id: 'love', icon: Heart, label: 'Love', color: 'bg-rose-100' },
  ];

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Character Card */}
      <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 rounded-3xl p-8 shadow-lg">
        <div className="flex flex-col items-center gap-4">
          {/* Character Avatar */}
          <div className="w-40 h-40 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-md">
            <div className="text-8xl">🐰</div>
          </div>
          
          {/* Character Info */}
          <div className="text-center">
            <h2 className="text-purple-900">{companionName}</h2>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="text-purple-700">Level {level}</span>
              <span className="text-purple-400">•</span>
              <span className="text-purple-700">{mood}</span>
            </div>
          </div>
          
          {/* Stats Bar */}
          <div className="w-full space-y-2 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-purple-700">Happiness</span>
              <span className="text-purple-600">85%</span>
            </div>
            <div className="w-full h-3 bg-white/60 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-pink-400 to-pink-500 rounded-full transition-all"
                style={{ width: '85%' }}
              />
            </div>
            
            <div className="flex justify-between items-center mt-3">
              <span className="text-purple-700">Energy</span>
              <span className="text-purple-600">70%</span>
            </div>
            <div className="w-full h-3 bg-white/60 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all"
                style={{ width: '70%' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => onActionClick(action.id)}
              className={`${action.color} rounded-2xl p-6 shadow-md hover:shadow-lg transition-all active:scale-95`}
            >
              <div className="flex flex-col items-center gap-2">
                <Icon className="w-8 h-8 text-purple-600" />
                <span className="text-purple-900">{action.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Daily Tasks Card */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h3 className="text-purple-900 mb-4">Daily Tasks</h3>
        <div className="space-y-3">
          {[
            { task: 'Feed your companion', done: true },
            { task: 'Play together', done: true },
            { task: 'Evening cuddles', done: false },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                item.done ? 'bg-pink-400 border-pink-400' : 'border-purple-300'
              }`}>
                {item.done && <span className="text-white">✓</span>}
              </div>
              <span className={item.done ? 'text-purple-400 line-through' : 'text-purple-700'}>
                {item.task}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
