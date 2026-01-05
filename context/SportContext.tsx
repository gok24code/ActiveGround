import React, { createContext, useState, useContext } from 'react';

type SportContextType = {
  selectedSport: string | null;
  setSelectedSport: (sport: string | null) => void;
};

const SportContext = createContext<SportContextType | undefined>(undefined);

export const SportProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);

  return (
    <SportContext.Provider value={{ selectedSport, setSelectedSport }}>
      {children}
    </SportContext.Provider>
  );
};

export const useSport = () => {
  const context = useContext(SportContext);
  if (!context) {
    throw new Error('useSport must be used within a SportProvider');
  }
  return context;
};
