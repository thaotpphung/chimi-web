'use client';

import { Plus, ShoppingCart, Trash } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CATEGORIES = ['All', 'Groceries', 'Household', 'Personal', 'Other'];

const INITIAL_ITEMS = [
  { id: 1, name: 'Milk', category: 'Groceries', completed: false },
  { id: 2, name: 'Bread', category: 'Groceries', completed: false },
  { id: 3, name: 'Eggs', category: 'Groceries', completed: true },
  { id: 4, name: 'Paper Towels', category: 'Household', completed: false },
  { id: 5, name: 'Shampoo', category: 'Personal', completed: false },
];

export default function Shopping() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [newItem, setNewItem] = useState('');
  const [newCategory, setNewCategory] = useState('Groceries');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = items.filter((item) => {
    if (activeCategory === 'All') {
      return true;
    }
    return item.category === activeCategory;
  });

  const addItem = () => {
    if (newItem.trim() === '') return;

    const newId =
      items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;

    setItems([
      ...items,
      {
        id: newId,
        name: newItem,
        category: newCategory,
        completed: false,
      },
    ]);

    setNewItem('');
  };

  const toggleItem = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const deleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Shopping List</h1>
        <p className="text-muted-foreground">
          Keep track of groceries and other items to buy.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShoppingCart className="mr-2 size-5" />
            Add Item
          </CardTitle>
          <CardDescription>
            Add a new item to your shopping list.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <Label htmlFor="item-name" className="sr-only">
                Item Name
              </Label>
              <Input
                id="item-name"
                placeholder="Enter item name"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addItem();
                  }
                }}
              />
            </div>
            <div>
              <Label htmlFor="category" className="sr-only">
                Category
              </Label>
              <select
                id="category"
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              >
                {CATEGORIES.filter((cat) => cat !== 'All').map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <Button onClick={addItem}>
              <Plus className="mr-2 size-4" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs
        defaultValue="All"
        className="space-y-4"
        onValueChange={setActiveCategory}
        value={activeCategory}
      >
        <TabsList>
          {CATEGORIES.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shopping List</CardTitle>
              <CardDescription>
                {filteredItems.length} items in your list
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredItems.length === 0 ? (
                  <div className="flex h-20 items-center justify-center rounded-md border">
                    <p className="text-muted-foreground">
                      No items in this category
                    </p>
                  </div>
                ) : (
                  filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-md border p-3"
                    >
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id={`item-${item.id}`}
                          checked={item.completed}
                          onCheckedChange={() => toggleItem(item.id)}
                        />
                        <div className="grid gap-0.5">
                          <Label
                            htmlFor={`item-${item.id}`}
                            className={
                              item.completed
                                ? 'text-muted-foreground line-through'
                                : ''
                            }
                          >
                            {item.name}
                          </Label>
                          <span className="text-muted-foreground text-xs">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteItem(item.id)}
                      >
                        <Trash className="size-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
