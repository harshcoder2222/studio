"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import type { Item, Order } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";

interface OrderContextType {
  orders: Order[];
  addOrder: (item: Item, buyer: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const { toast } = useToast();

  const addOrder = useCallback((item: Item, buyer: string) => {
    setOrders((prevOrders) => {
      const newOrder: Order = {
        id: `order-${Date.now()}`,
        itemId: item.id,
        buyer,
        date: new Date().toISOString(),
        price: item.price,
      };
      toast({
        title: "Order Logged",
        description: `Please complete the purchase of ${item.name} for ${buyer} on Roblox.`,
      });
      return [...prevOrders, newOrder];
    });
  }, [toast]);

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within a OrderProvider');
  }
  return context;
}
