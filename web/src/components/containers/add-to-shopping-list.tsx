'use client';

import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AddToShoppingListProps {
  recipe: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToList: (ingredients: any[]) => void;
}

export function AddToShoppingList({
  recipe,
  open,
  onOpenChange,
  onAddToList,
}: AddToShoppingListProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  // Initialize selected ingredients when dialog opens
  useState(() => {
    if (open && recipe?.ingredients) {
      setSelectedIngredients(recipe.ingredients.map((ing) => ing.id));
    }
  }, [open, recipe]);

  // Toggle ingredient selection
  const toggleIngredient = (id: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  // Select or deselect all ingredients
  const toggleAll = (select: boolean) => {
    if (select) {
      setSelectedIngredients(recipe.ingredients.map((ing) => ing.id));
    } else {
      setSelectedIngredients([]);
    }
  };

  // Handle adding to shopping list
  const handleAddToList = () => {
    const ingredientsToAdd = recipe.ingredients.filter((ing) =>
      selectedIngredients.includes(ing.id),
    );
    onAddToList(ingredientsToAdd);
    onOpenChange(false);
  };

  if (!recipe) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Ingredients to Shopping List</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-muted-foreground text-sm">
              Select ingredients to add to your shopping list
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => toggleAll(true)}
              >
                Select All
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => toggleAll(false)}
              >
                Deselect All
              </Button>
            </div>
          </div>

          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-2">
              {recipe.ingredients.map((ingredient) => (
                <div key={ingredient.id} className="flex items-start space-x-2">
                  <Checkbox
                    id={ingredient.id}
                    checked={selectedIngredients.includes(ingredient.id)}
                    onCheckedChange={() => toggleIngredient(ingredient.id)}
                  />
                  <Label
                    htmlFor={ingredient.id}
                    className="cursor-pointer text-sm"
                  >
                    <span>
                      {ingredient.quantity} {ingredient.unit} {ingredient.name}
                      {ingredient.note && (
                        <span className="text-muted-foreground">
                          {' '}
                          ({ingredient.note})
                        </span>
                      )}
                    </span>
                  </Label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleAddToList}
            disabled={selectedIngredients.length === 0}
          >
            <ShoppingCart className="mr-2 size-4" />
            Add to Shopping List
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
