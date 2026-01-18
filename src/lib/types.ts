export type Game = {
  id: string;
  name: string;
  logoUrl: string;
  bannerUrl: string;
  description: string;
  category: string;
  stats: {
    players: number;
    likes: number;
  };
};

export type ItemRarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
export const rarities: ItemRarity[] = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];

export const rarityColors: Record<ItemRarity, string> = {
  Common: 'bg-gray-500',
  Uncommon: 'bg-green-500',
  Rare: 'bg-blue-500',
  Epic: 'bg-purple-500',
  Legendary: 'bg-yellow-500',
};


export type ItemCategory = 'Item' | 'Gamepass';
export const itemCategories: ItemCategory[] = ['Item', 'Gamepass'];

export type Item = {
  id: string;
  name: string;
  imageUrl: string;
  gameId: string;
  category: ItemCategory;
  rarity: ItemRarity;
  price: number; // in Robux
  robloxUrl: string;
};

export type GameCategory = {
  id: string;
  name: string;
};

export type Order = {
  id: string;
  itemId: string;
  buyer: string;
  date: string; // ISO date string
  price: number;
};
