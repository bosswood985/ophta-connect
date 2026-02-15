import React from 'react';
import { Card } from '../components/ui/Card';
import { Layout } from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';

export const Profil: React.FC = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Profil</h1>
          <p className="text-gray-600">Gérez votre profil utilisateur</p>
        </div>

        <Card>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom
              </label>
              <div className="text-gray-900">{user?.nom}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prénom
              </label>
              <div className="text-gray-900">{user?.prenom}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="text-gray-900">{user?.email}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rôle
              </label>
              <div className="text-gray-900">{user?.role}</div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};
