'use client';

import { ChevronLeft, ChevronRight, Clock, X } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Image } from '@/components/ui/image';

interface CalendarViewProps {
  mealPlan: Record<string, any>;
  onDrop: (e: React.DragEvent, date: string, mealType?: string) => void;
  onRemoveMeal: (date: string, mealId: number) => void;
}

export function CalendarView({
  mealPlan,
  onDrop,
  onRemoveMeal,
}: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  // Calendar navigation
  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  // Get calendar data
  const monthYear = currentDate.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getDay();

  // Create calendar days array
  const days = [];
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // Format date string (YYYY-MM-DD)
  const formatDateString = (day: number) => {
    return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  // Get meals for a specific day
  const getMealsForDay = (day: number) => {
    const dateStr = formatDateString(day);
    return Object.entries(mealPlan)
      .filter(([key]) => key.startsWith(dateStr))
      .map(([_, meal]) => meal);
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  // Check if date is today
  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{monthYear}</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="size-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="border-b py-2 text-sm font-medium">
            {day}
          </div>
        ))}

        {days.map((day, index) => {
          if (day === null) {
            return (
              <div
                key={`empty-${index}`}
                className="bg-muted/20 min-h-[100px] border border-l-0 border-t-0"
              />
            );
          }

          const dateStr = formatDateString(day);
          const meals = getMealsForDay(day);

          return (
            <div
              key={`day-${day}`}
              className={`relative min-h-[100px] border border-l-0 border-t-0 p-1 ${isToday(day) ? 'bg-primary/5' : ''}`}
              onDragOver={handleDragOver}
              onDrop={(e) => {
                try {
                  // Get the meal type from dataTransfer if available
                  const mealType = e.dataTransfer.getData('mealType');
                  onDrop(e, dateStr, mealType);
                } catch (error) {
                  console.error('Error in drop handler:', error);
                }
              }}
              onClick={() => setSelectedDay(dateStr)}
            >
              <div className="flex justify-end">
                <span
                  className={`text-sm ${isToday(day) ? 'bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-full font-bold' : ''}`}
                >
                  {day}
                </span>
              </div>
              <div className="mt-1 space-y-1">
                {meals.slice(0, 2).map((meal, idx) => (
                  <div
                    key={`meal-${day}-${idx}`}
                    className="bg-secondary/50 text-secondary-foreground cursor-pointer truncate rounded p-1 text-xs"
                    title={meal.title}
                  >
                    {meal.title}
                  </div>
                ))}
                {meals.length > 2 && (
                  <div className="text-muted-foreground text-center text-xs">
                    +{meals.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Day detail dialog */}
      <Dialog
        open={!!selectedDay}
        onOpenChange={(open) => !open && setSelectedDay(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedDay &&
                new Date(selectedDay).toLocaleDateString('default', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] space-y-3 overflow-auto py-2">
            {selectedDay &&
              Object.entries(mealPlan)
                .filter(([key]) => key.startsWith(selectedDay))
                .map(([key, meal]) => (
                  <Card key={key} className="overflow-hidden">
                    <CardContent className="p-3">
                      <div className="group relative flex items-center gap-3">
                        <div className="relative size-14 shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={meal.image || '/placeholder.svg'}
                            alt={meal.title}
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="truncate font-medium">
                              {meal.title}
                            </h4>
                            <Badge variant="outline">{key.split('-')[3]}</Badge>
                          </div>
                          <div className="text-muted-foreground mt-1 flex items-center text-xs">
                            <Clock className="mr-1 size-3" />
                            <span>
                              {meal.prepTime} + {meal.cookTime}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-destructive hover:text-destructive-foreground absolute -right-1 -top-1 size-6 opacity-0 group-hover:opacity-100"
                          onClick={() => {
                            onRemoveMeal(key, meal.id);
                            if (
                              Object.entries(mealPlan).filter(([k]) =>
                                k.startsWith(selectedDay),
                              ).length <= 1
                            ) {
                              setSelectedDay(null);
                            }
                          }}
                        >
                          <X className="size-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            {selectedDay &&
              Object.entries(mealPlan).filter(([key]) =>
                key.startsWith(selectedDay),
              ).length === 0 && (
                <div className="text-muted-foreground py-8 text-center">
                  <p>No meals planned for this day.</p>
                  <p className="mt-1 text-sm">
                    Drag and drop recipes to add meals.
                  </p>
                </div>
              )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
