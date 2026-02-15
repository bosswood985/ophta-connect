import React from 'react';
import { Card } from '../components/ui/Card';
import { Layout } from '../components/layout/Layout';

export const Annuaire: React.FC = () => {
  return (
    <Layout>
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Annuaire</h1>
          <p className="text-gray-600">Annuaire des praticiens</p>
        </div>

        <Card>
          <div className="text-gray-600 text-center py-8">
            Annuaire des praticiens - En cours de développement
          </div>
        </Card>
      </div>
    </Layout>
  );
};
