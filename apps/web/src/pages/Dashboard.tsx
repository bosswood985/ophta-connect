import React from 'react';
import { Card } from '../components/ui/Card';
import { Layout } from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Bienvenue, {user?.prenom}
          </h1>
          <p className="text-gray-600">Vue d'ensemble de vos adressages</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="text-sm font-medium text-gray-600 mb-1">En attente</div>
            <div className="text-3xl font-bold text-gray-900">12</div>
          </Card>
          
          <Card>
            <div className="text-sm font-medium text-gray-600 mb-1">En cours</div>
            <div className="text-3xl font-bold text-gray-900">8</div>
          </Card>
          
          <Card>
            <div className="text-sm font-medium text-gray-600 mb-1">Terminés</div>
            <div className="text-3xl font-bold text-gray-900">45</div>
          </Card>
        </div>

        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Derniers adressages</h2>
          <div className="text-gray-600 text-center py-8">
            Aucun adressage récent
          </div>
        </Card>
      </div>
    </Layout>
  );
};
