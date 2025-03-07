'use client';

import { Clock, Heart, Plus, Search, Star, Users } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Recipe } from '@/types/api';

const CATEGORIES = [
  'All',
  'Breakfast',
  'Lunch',
  'Dinner',
  'Dessert',
  'Snacks',
  'Favorites',
];

const RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Spaghetti Bolognese',
    image: '/placeholder.svg?height=200&width=300',
    prepTime: '15 min',
    cookTime: '30 min',
    servings: 4,
    rating: 4.5,
    category: 'Dinner',
    favorite: true,
    createdAt: Date.now(),
  },
  {
    id: '2',
    title: 'Avocado Toast',
    image: '/placeholder.svg?height=200&width=300',
    prepTime: '5 min',
    cookTime: '5 min',
    servings: 2,
    rating: 4.0,
    category: 'Breakfast',
    favorite: false,
    createdAt: Date.now(),
  },
  {
    id: '3',
    title: 'Chicken Caesar Salad',
    image: '/placeholder.svg?height=200&width=300',
    prepTime: '15 min',
    cookTime: '10 min',
    servings: 2,
    rating: 4.2,
    category: 'Lunch',
    favorite: true,
    createdAt: Date.now(),
  },
  {
    id: '4',
    title: 'Chocolate Chip Cookies',
    image: '/placeholder.svg?height=200&width=300',
    prepTime: '15 min',
    cookTime: '12 min',
    servings: 24,
    rating: 4.8,
    category: 'Dessert',
    favorite: true,
    createdAt: Date.now(),
  },
];

export default function Recipes() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecipes = RECIPES.filter((recipe) => {
    if (activeCategory !== 'All' && activeCategory !== 'Favorites') {
      return recipe.category === activeCategory;
    }
    if (activeCategory === 'Favorites') {
      return recipe.favorite;
    }
    return true;
  }).filter((recipe) => {
    if (searchQuery) {
      return recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Recipes</h1>
          <p className="text-muted-foreground">
            Browse and manage your family's favorite recipes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="text-muted-foreground absolute left-2.5 top-2.5 size-4" />
            <Input
              type="search"
              placeholder="Search recipes..."
              className="w-full pl-8 sm:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button>
            <Plus className="mr-2 size-4" />
            Add Recipe
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="All"
        className="space-y-4"
        onValueChange={setActiveCategory}
        value={activeCategory}
      >
        <TabsList className="flex overflow-auto pb-1">
          {CATEGORIES.map((category) => (
            <TabsTrigger key={category} value={category} className="shrink-0">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory} className="space-y-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image
          src={recipe.image || '/placeholder.svg'}
          alt={recipe.title}
          className="object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="bg-background/80 hover:bg-background/90 absolute right-2 top-2 backdrop-blur-sm"
        >
          <Heart
            className={`size-5 ${recipe.favorite ? 'fill-red-500 text-red-500' : ''}`}
          />
        </Button>
      </div>
      <CardHeader className="p-4">
        <CardTitle className="line-clamp-1">{recipe.title}</CardTitle>
        <CardDescription>
          <Badge variant="outline">{recipe.category}</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <Clock className="mr-1 size-4" />
            <span>
              {recipe.prepTime} + {recipe.cookTime}
            </span>
          </div>
          <div className="flex items-center">
            <Users className="mr-1 size-4" />
            <span>{recipe.servings}</span>
          </div>
          <div className="flex items-center">
            <Star className="mr-1 size-4 fill-yellow-400 text-yellow-400" />
            <span>{recipe.rating}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="w-full">
          View Recipe
        </Button>
      </CardFooter>
    </Card>
  );
}
