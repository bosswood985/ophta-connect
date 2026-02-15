import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2563EB',
        },
        headerTintColor: '#fff',
        tabBarActiveTintColor: '#2563EB',
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Tableau de bord',
          headerTitle: 'OphtaConnect',
        }}
      />
      <Tabs.Screen
        name="adressages"
        options={{
          title: 'Adressages',
        }}
      />
      <Tabs.Screen
        name="annuaire"
        options={{
          title: 'Annuaire',
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: 'Profil',
        }}
      />
    </Tabs>
  );
}
