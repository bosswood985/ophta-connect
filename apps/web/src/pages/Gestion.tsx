import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Star, FileText, Settings as SettingsIcon } from 'lucide-react';

type Tab = 'favoris' | 'templates' | 'parametres';

export const Gestion: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('favoris');

  const tabs = [
    { id: 'favoris' as Tab, name: 'Favoris', icon: Star },
    { id: 'templates' as Tab, name: 'Templates de Courrier', icon: FileText },
    { id: 'parametres' as Tab, name: 'Paramètres', icon: SettingsIcon },
  ];

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-primary-900">Gestion</h1>
          <p className="text-primary-700">Gérez vos favoris, templates et paramètres</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-primary-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm
                    ${
                      activeTab === tab.id
                        ? 'border-primary-600 text-primary-700'
                        : 'border-transparent text-primary-600 hover:text-primary-800 hover:border-primary-300'
                    }
                  `}
                >
                  <Icon size={18} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'favoris' && (
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-primary-900 mb-4">
                Mes Favoris
              </h2>
              <p className="text-primary-700">
                Gérez vos praticiens, motifs et templates favoris. Cette fonctionnalité vous permettra d'accéder rapidement aux éléments que vous utilisez fréquemment.
              </p>
              <div className="mt-4 p-4 bg-primary-50 rounded-lg">
                <p className="text-sm text-primary-800">
                  📌 Astuce : Vous pouvez marquer des éléments comme favoris directement depuis l'annuaire et les listes de motifs.
                </p>
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'templates' && (
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-primary-900">
                  Templates de Courrier
                </h2>
                <button className="btn btn-primary">
                  + Nouveau Template
                </button>
              </div>
              <p className="text-primary-700 mb-4">
                Créez et gérez vos templates de courrier d'adressage. Utilisez des variables dynamiques comme {'{{nom_patient}}'}, {'{{motif}}'}, {'{{date}}'} pour personnaliser vos courriers.
              </p>
              <div className="text-center py-8 text-primary-600">
                Aucun template de courrier pour le moment
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'parametres' && (
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-primary-900 mb-4">
                Paramètres
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary-900 mb-2">
                    Délai d'intervention
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Ex: 48h, 1 semaine, 2 jours"
                  />
                  <p className="text-sm text-primary-600 mt-1">
                    Indiquez votre délai moyen d'intervention pour informer vos confrères
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-900 mb-2">
                    Notifications
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span className="text-sm text-primary-800">
                        Recevoir des notifications pour les nouveaux adressages
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span className="text-sm text-primary-800">
                        Recevoir des notifications pour les nouveaux messages
                      </span>
                    </label>
                  </div>
                </div>

                <div className="pt-4">
                  <button className="btn btn-primary">
                    Enregistrer les paramètres
                  </button>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
};
