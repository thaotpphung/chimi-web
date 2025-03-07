'use client';

import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  Search,
  X,
} from 'lucide-react';
import { useState } from 'react';

import { CalendarView } from './calandar-view';

import { RecipeCard } from '@/components/shared/recipe-card';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Image } from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Recipe } from '@/types/api';

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

// Sample recipes data
const RECIPES = [
  {
    id: 1,
    title: 'Spaghetti Bolognese',
    image: '/placeholder.svg?height=200&width=300',
    prepTime: '15 min',
    cookTime: '30 min',
    servings: 4,
    rating: 4.5,
    category: 'Dinner',
    favorite: true,
  },
  {
    id: 2,
    title: 'Avocado Toast',
    image: '/placeholder.svg?height=200&width=300',
    prepTime: '5 min',
    cookTime: '5 min',
    servings: 2,
    rating: 4.0,
    category: 'Breakfast',
    favorite: false,
  },
  {
    id: 3,
    title: 'Chicken Caesar Salad',
    image: '/placeholder.svg?height=200&width=300',
    prepTime: '15 min',
    cookTime: '10 min',
    servings: 2,
    rating: 4.2,
    category: 'Lunch',
    favorite: true,
  },
  {
    id: 4,
    title: 'Chocolate Chip Cookies',
    image: '/placeholder.svg?height=200&width=300',
    prepTime: '15 min',
    cookTime: '12 min',
    servings: 24,
    rating: 4.8,
    category: 'Snack',
    favorite: true,
  },
  {
    id: 5,
    title: 'Vegetable Stir Fry',
    image: '/placeholder.svg?height=200&width=300',
    prepTime: '10 min',
    cookTime: '15 min',
    servings: 4,
    rating: 4.3,
    category: 'Dinner',
    favorite: false,
  },
  {
    id: 6,
    title: 'Pancakes',
    image: '/placeholder.svg?height=200&width=300',
    prepTime: '10 min',
    cookTime: '15 min',
    servings: 4,
    rating: 4.7,
    category: 'Breakfast',
    favorite: true,
  },
];

type MealPlan = Record<string, Recipe>;

export default function MealPlanning() {
  const [currentWeek, setCurrentWeek] = useState('This Week');
  const [searchQuery, setSearchQuery] = useState('');
  const [mealPlan, setMealPlan] = useState<MealPlan>({});
  const [activeFilter, setActiveFilter] = useState('All');
  const [showRecipes, setShowRecipes] = useState(true);
  const [activeMealType, setActiveMealType] = useState('Breakfast');

  // Filter recipes based on search query and active filter
  const filteredRecipes = RECIPES.filter((recipe) => {
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === 'All' ||
      activeFilter === recipe.category ||
      (activeFilter === 'Favorites' && recipe.favorite);

    return matchesSearch && matchesFilter;
  });

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, recipe: Recipe) => {
    try {
      const recipeData = JSON.stringify(recipe);
      e.dataTransfer.setData('recipe', recipeData);
      e.dataTransfer.setData('mealType', activeMealType);
      e.dataTransfer.effectAllowed = 'copy';
    } catch (error) {
      console.error('Error starting drag:', error);
    }
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  // Handle drop on week view
  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    day: string,
    mealType: string,
  ) => {
    e.preventDefault();
    const recipe = JSON.parse(e.dataTransfer.getData('recipe'));

    setMealPlan((prev) => ({
      ...prev,
      [`${day}-${mealType}`]: recipe,
    }));
  };

  // Handle drop on calendar view
  const handleCalendarDrop = (
    e: React.DragEvent,
    date: string,
    mealType?: string,
  ) => {
    e.preventDefault();

    try {
      // Get recipe data from dataTransfer
      const recipeData = e.dataTransfer.getData('recipe');

      // Check if we have valid recipe data
      if (!recipeData) {
        console.error('No recipe data found in drop event');
        return;
      }

      const recipe = JSON.parse(recipeData);
      // Use provided mealType or fall back to activeMealType
      const mealTypeToUse = mealType || activeMealType;

      setMealPlan((prev) => ({
        ...prev,
        [`${date}-${mealTypeToUse}`]: recipe,
      }));
    } catch (error) {
      console.error('Error processing drop:', error);
    }
  };

  // Get meal for a specific day and meal type
  const getMeal = (day: string, mealType: string) => {
    return mealPlan[`${day}-${mealType}`];
  };

  // Remove meal from plan
  const removeMeal = (key: string) => {
    setMealPlan((prev) => {
      const newPlan = { ...prev };
      delete newPlan[key];
      return newPlan;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meal Planning</h1>
          <p className="text-muted-foreground">
            Plan and organize your family meals for the week.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="size-4" />
          </Button>
          <span className="text-sm font-medium">{currentWeek}</span>
          <Button variant="outline" size="icon">
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Recipe Selection Panel */}
        <div
          className={`lg:col-span-1 ${showRecipes ? 'block' : 'hidden lg:block'}`}
        >
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Recipes</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setShowRecipes(false)}
                >
                  <X className="size-4" />
                </Button>
              </div>
              <CardDescription>
                Drag recipes to add to your meal plan
              </CardDescription>
              <div className="relative mt-2">
                <Search className="text-muted-foreground absolute left-2 top-2.5 size-4" />
                <Input
                  placeholder="Search recipes..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="px-3">
              <div className="mb-3 flex overflow-auto pb-2">
                {[
                  'All',
                  'Favorites',
                  'Breakfast',
                  'Lunch',
                  'Dinner',
                  'Snack',
                ].map((filter) => (
                  <Button
                    key={filter}
                    variant={activeFilter === filter ? 'secondary' : 'ghost'}
                    size="sm"
                    className="mr-1 whitespace-nowrap"
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </Button>
                ))}
              </div>

              <div className="mb-3">
                <Label className="text-muted-foreground mb-1 block text-xs">
                  Drag as meal type:
                </Label>
                <div className="flex overflow-auto">
                  {MEAL_TYPES.map((mealType) => (
                    <Button
                      key={mealType}
                      variant={
                        activeMealType === mealType ? 'default' : 'outline'
                      }
                      size="sm"
                      className="mr-1 whitespace-nowrap"
                      onClick={() => setActiveMealType(mealType)}
                    >
                      {mealType}
                    </Button>
                  ))}
                </div>
              </div>

              <ScrollArea className="h-[calc(100vh-400px)]">
                <div className="space-y-3 pr-3">
                  {filteredRecipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      {...recipe}
                      draggable
                      onDragStart={handleDragStart}
                      compact
                    />
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Meal Planning Views */}
        <div className="lg:col-span-3">
          {!showRecipes && (
            <Button
              variant="outline"
              className="mb-4 lg:hidden"
              onClick={() => setShowRecipes(true)}
            >
              Show Recipes
            </Button>
          )}

          <Tabs defaultValue="calendar" className="space-y-4">
            <TabsList>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              <TabsTrigger value="week">Week View</TabsTrigger>
              <TabsTrigger value="day">Day View</TabsTrigger>
            </TabsList>

            <TabsContent value="calendar" className="space-y-4">
              <CalendarView
                mealPlan={mealPlan}
                onDrop={handleCalendarDrop}
                onRemoveMeal={removeMeal}
              />
            </TabsContent>

            <TabsContent value="week" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-7">
                {DAYS.map((day) => (
                  <Card key={day} className="overflow-hidden">
                    <CardHeader className="bg-secondary/50 p-3">
                      <CardTitle className="text-sm font-medium">
                        {day}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 p-3">
                      {MEAL_TYPES.map((mealType) => {
                        const meal = getMeal(day, mealType);

                        return (
                          <div key={mealType} className="space-y-1">
                            <h4 className="text-muted-foreground text-xs font-medium">
                              {mealType}
                            </h4>
                            <div
                              className={`
                                min-h-[60px] rounded-md border-2 border-dashed p-2 
                                ${meal ? 'border-transparent' : 'border-border'}
                                hover:border-primary/50 transition-colors
                                duration-200
                              `}
                              onDragOver={handleDragOver}
                              onDrop={(e) => handleDrop(e, day, mealType)}
                            >
                              {meal ? (
                                <div className="group relative">
                                  <div className="flex items-center">
                                    <div className="relative mr-2 size-10 shrink-0 overflow-hidden rounded-md">
                                      <Image
                                        src={meal.image || '/placeholder.svg'}
                                        alt={meal.title}
                                        className="object-cover"
                                      />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <h4 className="truncate text-sm font-medium">
                                        {meal.title}
                                      </h4>
                                      <div className="text-muted-foreground flex items-center text-xs">
                                        <Clock className="mr-1 size-3" />
                                        <span>
                                          {meal.prepTime} + {meal.cookTime}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hover:bg-destructive hover:text-destructive-foreground absolute -right-1 -top-1 size-6 rounded-full opacity-0 group-hover:opacity-100"
                                    onClick={() =>
                                      removeMeal(`${day}-${mealType}`)
                                    }
                                  >
                                    <X className="size-3" />
                                  </Button>
                                </div>
                              ) : (
                                <AddMealButton />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="day" className="space-y-4">
              <div className="flex justify-center">
                <Select defaultValue="monday">
                  {DAYS.map((day) => (
                    <SelectItem
                      key={day.toLowerCase()}
                      value={day.toLowerCase()}
                    >
                      {day}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div className="space-y-4">
                {MEAL_TYPES.map((mealType) => (
                  <Card key={mealType}>
                    <CardHeader>
                      <CardTitle>{mealType}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div
                        className="min-h-[80px] rounded-md border-2 border-dashed p-4"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, 'Monday', mealType)}
                      >
                        {getMeal('Monday', mealType) ? (
                          <div className="group relative">
                            <div className="flex items-center">
                              <div className="relative mr-4 size-16 shrink-0 overflow-hidden rounded-md">
                                <Image
                                  src={
                                    getMeal('Monday', mealType).image ||
                                    '/placeholder.svg'
                                  }
                                  alt={getMeal('Monday', mealType).title}
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="text-base font-medium">
                                  {getMeal('Monday', mealType).title}
                                </h4>
                                <div className="text-muted-foreground mt-1 flex items-center text-sm">
                                  <Clock className="mr-1 size-4" />
                                  <span>
                                    {getMeal('Monday', mealType).prepTime} +{' '}
                                    {getMeal('Monday', mealType).cookTime}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="icon"
                              className="absolute right-0 top-0 opacity-0 group-hover:opacity-100"
                              onClick={() => removeMeal('Monday-' + mealType)}
                            >
                              <X className="size-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="text-muted-foreground flex h-full items-center justify-center">
                            <p>Drag a recipe here or</p>
                            <AddMealButton className="ml-2" />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function AddMealButton({ className = '' }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={`text-muted-foreground h-auto justify-start px-3 py-2 ${className}`}
        >
          <Plus className="mr-2 size-4" />
          Add meal
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Meal</DialogTitle>
          <DialogDescription>Add a meal to your meal plan.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="meal">Meal</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a meal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
                <SelectItem value="snack">Snack</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipe">Recipe</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a recipe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pasta">Pasta with Tomato Sauce</SelectItem>
                <SelectItem value="salad">Chicken Salad</SelectItem>
                <SelectItem value="soup">Vegetable Soup</SelectItem>
                <SelectItem value="custom">Custom Meal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Input id="notes" placeholder="Add any notes about this meal" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
