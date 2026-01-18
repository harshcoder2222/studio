"use client";

import Image from "next/image";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Order, Item } from "@/lib/types";
import { RobuxIcon } from "@/components/icons";
import { useOrders } from "@/context/OrderContext";

interface OrdersTableProps {
  items: Item[];
}

export function OrdersTable({ items }: OrdersTableProps) {
  const { orders } = useOrders();

  const itemsMap = items.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {} as Record<string, Item>);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Buyer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((order) => {
              const item = itemsMap[order.itemId];
              return (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs">{order.id}</TableCell>
                  <TableCell className="font-medium">
                    {item ? (
                      <div className="flex items-center gap-3">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="rounded-md object-cover"
                        />
                        <span>{item.name}</span>
                      </div>
                    ) : (
                      "Unknown Item"
                    )}
                  </TableCell>
                  <TableCell>{order.buyer}</TableCell>
                  <TableCell>{format(new Date(order.date), "PPP")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <RobuxIcon />
                      {order.price.toLocaleString()}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
