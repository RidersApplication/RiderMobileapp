import React, { createContext, useContext, useState } from 'react';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: any;
  tripsTaken: number;
  rating: number;
}

export interface TransactionItem {
  id: string;
  type: 'Delivery Payment' | 'Wallet Top-up' | 'Ride Payment' | string;
  date: string;
  amount: number; // positive for topup, negative for payment
  iconType: 'truck' | 'bank' | 'car';
}

export interface SavedLocationItem {
  id: string;
  category: 'Home' | 'Work' | 'Others';
  title: string;
  address: string;
  isPrimary?: boolean;
  iconName: string;
}

export interface SavedCardItem {
  id: string;
  last4: string;
  brand: string;
  expiry: string;
  cardholder: string;
}

interface UserContextType {
  user: UserProfile;
  updateUser: (updatedFields: Partial<UserProfile>) => void;
  walletBalance: number;
  transactions: TransactionItem[];
  topUpWallet: (amount: number, methodLabel: string) => void;
  savedLocations: SavedLocationItem[];
  addSavedLocation: (location: Omit<SavedLocationItem, 'id'>) => void;
  deleteSavedLocation: (id: string) => void;
  updateSavedLocation: (id: string, updated: Partial<SavedLocationItem>) => void;
  savedCards: SavedCardItem[];
  addSavedCard: (card: Omit<SavedCardItem, 'id'>) => void;
  deleteSavedCard: (id: string) => void;
}

const defaultUser: UserProfile = {
  name: 'Oge',
  email: 'Oge@email.com',
  phone: '+234 800 000 0000',
  avatar: require('../../assets/user_avatar.png'),
  tripsTaken: 124,
  rating: 4.9,
};

const initialTransactions: TransactionItem[] = [
  {
    id: 'tx-1',
    type: 'Delivery Payment',
    date: 'Oct 24, 2023 • 2:45 PM',
    amount: -12400,
    iconType: 'truck',
  },
  {
    id: 'tx-2',
    type: 'Wallet Top-up',
    date: 'Oct 23, 2023 • 10:15 AM',
    amount: 50000,
    iconType: 'bank',
  },
  {
    id: 'tx-3',
    type: 'Ride Payment',
    date: 'Oct 22, 2023 • 6:30 PM',
    amount: -4500,
    iconType: 'car',
  },
];

const initialSavedLocations: SavedLocationItem[] = [
  {
    id: 'loc-1',
    category: 'Home',
    title: 'The Nest',
    address: 'DBI Bridge Institute (Former Nitel Training School) Garki',
    isPrimary: true,
    iconName: 'home-outline',
  },
  {
    id: 'loc-2',
    category: 'Work',
    title: 'HQ Logistics Center',
    address: '3-5 NUJ Light House, Adeyemo Alakija Street',
    iconName: 'briefcase-outline',
  },
  {
    id: 'loc-3',
    category: 'Others',
    title: 'Iron Haven Gym',
    address: 'Area 11, P.M.B 183, Jubril Martin St. Garki',
    iconName: 'fitness-outline',
  },
  {
    id: 'loc-4',
    category: 'Others',
    title: 'Morning Brew Hub',
    address: 'Samuel Ladoke Akintola Boulevard, II, Garki',
    iconName: 'cafe-outline',
  },
];

const initialSavedCards: SavedCardItem[] = [
  {
    id: 'card-1',
    last4: '5824',
    brand: 'VISA',
    expiry: '09/27',
    cardholder: 'Oge',
  },
];

const UserContext = createContext<UserContextType>({
  user: defaultUser,
  updateUser: () => {},
  walletBalance: 42500,
  transactions: initialTransactions,
  topUpWallet: () => {},
  savedLocations: initialSavedLocations,
  addSavedLocation: () => {},
  deleteSavedLocation: () => {},
  updateSavedLocation: () => {},
  savedCards: initialSavedCards,
  addSavedCard: () => {},
  deleteSavedCard: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [walletBalance, setWalletBalance] = useState<number>(42500);
  const [transactions, setTransactions] = useState<TransactionItem[]>(initialTransactions);
  const [savedLocations, setSavedLocations] = useState<SavedLocationItem[]>(initialSavedLocations);
  const [savedCards, setSavedCards] = useState<SavedCardItem[]>(initialSavedCards);

  const updateUser = (updatedFields: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updatedFields }));
  };

  const topUpWallet = (amount: number, methodLabel: string) => {
    setWalletBalance((prev) => prev + amount);
    const newTx: TransactionItem = {
      id: `tx-${Date.now()}`,
      type: 'Wallet Top-up',
      date: `${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`,
      amount: amount,
      iconType: 'bank',
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const addSavedLocation = (location: Omit<SavedLocationItem, 'id'>) => {
    const newLoc: SavedLocationItem = {
      ...location,
      id: `loc-${Date.now()}`,
    };
    setSavedLocations((prev) => [...prev, newLoc]);
  };

  const deleteSavedLocation = (id: string) => {
    setSavedLocations((prev) => prev.filter((loc) => loc.id !== id));
  };

  const updateSavedLocation = (id: string, updated: Partial<SavedLocationItem>) => {
    setSavedLocations((prev) =>
      prev.map((loc) => (loc.id === id ? { ...loc, ...updated } : loc))
    );
  };

  const addSavedCard = (card: Omit<SavedCardItem, 'id'>) => {
    const newCard: SavedCardItem = {
      ...card,
      id: `card-${Date.now()}`,
    };
    setSavedCards((prev) => [...prev, newCard]);
  };

  const deleteSavedCard = (id: string) => {
    setSavedCards((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        walletBalance,
        transactions,
        topUpWallet,
        savedLocations,
        addSavedLocation,
        deleteSavedLocation,
        updateSavedLocation,
        savedCards,
        addSavedCard,
        deleteSavedCard,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
