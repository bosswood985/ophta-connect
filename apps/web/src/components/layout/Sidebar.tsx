import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  MessageSquare,
  Star,
  LogOut 
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Adressages', href: '/adressages', icon: FileText },
    { name: 'Annuaire', href: '/annuaire', icon: Users },
    { name: 'Messagerie', href: '/messagerie', icon: MessageSquare },
    { name: 'Gestion', href: '/gestion', icon: Star },
    { name: 'Profil', href: '/profil', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 bg-primary-800 h-screen flex flex-col">
      <div className="p-6 border-b border-primary-700">
        <h1 className="text-xl font-bold text-white">OphtaConnect</h1>
        <p className="text-primary-300 text-xs mt-1">Plateforme d'adressage</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? 'bg-primary-700 text-white'
                  : 'text-primary-200 hover:bg-primary-700/50 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-primary-700">
        <div className="mb-3 px-3">
          <p className="text-sm font-medium text-white">
            {user?.prenom} {user?.nom}
          </p>
          <p className="text-xs text-primary-300">{user?.role}</p>
        </div>
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-primary-200 hover:bg-primary-700/50 hover:text-white w-full transition-colors"
        >
          <LogOut size={20} />
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );
};
