'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/utils/cn';

interface AddToMealPlanProps {
  recipe: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToMealPlan: (recipe: any, date: Date, mealType: string) => void;
}

const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

export function AddToMealPlan({
  recipe,
  open,
  onOpenChange,
  onAddToMealPlan,
}: AddToMealPlanProps) {
  const [date, setDate] = useState<Date>(new Date());
  const [mealType, setMealType] = useState(MEAL_TYPES[0]);

  // Handle adding to meal plan
  const handleAddToMealPlan = () => {
    onAddToMealPlan(recipe, date, mealType);
    onOpenChange(false);
  };

  if (!recipe) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add to Meal Plan</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Recipe</Label>
            <div className="bg-muted/50 rounded-md border p-2">
              {recipe.title}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !date && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className="mr-2 size-4" />
                  {date ? format(date, 'PPP') : 'Select date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Meal Type</Label>
            <Select value={mealType} onValueChange={setMealType}>
              <SelectTrigger>
                <SelectValue placeholder="Select meal type" />
              </SelectTrigger>
              <SelectContent>
                {MEAL_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="button" onClick={handleAddToMealPlan}>
            Add to Meal Plan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
