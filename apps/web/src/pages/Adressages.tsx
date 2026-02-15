import React from 'react';
import { Card } from '../components/ui/Card';
import { Layout } from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';

export const Adressages: React.FC = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Adressages</h1>
          <p className="text-gray-600">Gérez vos adressages de patients</p>
        </div>

        <Card>
          <div className="text-gray-600 text-center py-8">
            Liste des adressages - En cours de développement
          </div>
        </Card>
      </div>
    </Layout>
  );
};
