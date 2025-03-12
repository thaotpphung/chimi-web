'use client';

import { Calendar, Plus, Search, ShoppingCart, Tag, X } from 'lucide-react';
import { useState } from 'react';

import { AddToMealPlan } from '@/components/containers/add-to-meal-plan';
import { AddToShoppingList } from '@/components/containers/add-to-shopping-list';
import { RecipeCard } from '@/components/containers/recipe-card';
import { RecipeForm } from '@/components/containers/recipe-form';
import { TagInput } from '@/components/containers/tag-input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toaster, toast } from '@/components/ui/toast';

const CATEGORIES = [
  'All',
  'Breakfast',
  'Lunch',
  'Dinner',
  'Dessert',
  'Snacks',
  'Favorites',
];

// Sample recipes data with tags
const INITIAL_RECIPES = [
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
    tags: ['Italian', 'Pasta', 'Beef', 'Family Favorite'],
    description: 'A classic Italian pasta dish with a meaty sauce.',
    source: 'Family Recipe',
    sourceUrl: '',
    ingredients: [
      {
        id: 'ing-1',
        name: 'ground beef',
        quantity: '1',
        unit: 'pound',
        note: 'lean',
      },
      {
        id: 'ing-2',
        name: 'onion',
        quantity: '1',
        unit: 'whole',
        note: 'diced',
      },
      {
        id: 'ing-3',
        name: 'garlic',
        quantity: '2',
        unit: 'clove',
        note: 'minced',
      },
      {
        id: 'ing-4',
        name: 'tomato sauce',
        quantity: '2',
        unit: 'cup',
        note: '',
      },
      {
        id: 'ing-5',
        name: 'spaghetti',
        quantity: '1',
        unit: 'pound',
        note: '',
      },
    ],
    steps: [
      {
        id: 'step-1',
        description:
          'Brown the ground beef in a large skillet over medium heat.',
      },
      {
        id: 'step-2',
        description: 'Add onions and garlic, cook until softened.',
      },
      {
        id: 'step-3',
        description: 'Add tomato sauce and simmer for 20 minutes.',
      },
      {
        id: 'step-4',
        description: 'Cook spaghetti according to package directions.',
      },
      { id: 'step-5', description: 'Serve sauce over spaghetti.' },
    ],
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
    tags: ['Quick', 'Healthy', 'Vegetarian'],
    description: 'Simple and nutritious breakfast toast topped with avocado.',
    source: '',
    sourceUrl: '',
    ingredients: [
      {
        id: 'ing-1',
        name: 'bread',
        quantity: '2',
        unit: 'slice',
        note: 'whole grain',
      },
      {
        id: 'ing-2',
        name: 'avocado',
        quantity: '1',
        unit: 'whole',
        note: 'ripe',
      },
      {
        id: 'ing-3',
        name: 'lemon juice',
        quantity: '1',
        unit: 'teaspoon',
        note: '',
      },
      { id: 'ing-4', name: 'salt', quantity: '1', unit: 'pinch', note: '' },
      {
        id: 'ing-5',
        name: 'red pepper flakes',
        quantity: '1',
        unit: 'pinch',
        note: 'optional',
      },
    ],
    steps: [
      { id: 'step-1', description: 'Toast the bread until golden and crisp.' },
      {
        id: 'step-2',
        description: 'Mash the avocado with lemon juice and salt.',
      },
      { id: 'step-3', description: 'Spread the avocado mixture on the toast.' },
      {
        id: 'step-4',
        description: 'Sprinkle with red pepper flakes if desired.',
      },
    ],
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
    tags: ['Salad', 'Chicken', 'Healthy', 'Quick'],
    description: 'A classic Caesar salad with grilled chicken.',
    source: '',
    sourceUrl: '',
    ingredients: [
      {
        id: 'ing-1',
        name: 'chicken breast',
        quantity: '2',
        unit: 'whole',
        note: 'boneless, skinless',
      },
      {
        id: 'ing-2',
        name: 'romaine lettuce',
        quantity: '1',
        unit: 'head',
        note: 'chopped',
      },
      {
        id: 'ing-3',
        name: 'Caesar dressing',
        quantity: '1/4',
        unit: 'cup',
        note: '',
      },
      { id: 'ing-4', name: 'croutons', quantity: '1', unit: 'cup', note: '' },
      {
        id: 'ing-5',
        name: 'Parmesan cheese',
        quantity: '1/4',
        unit: 'cup',
        note: 'grated',
      },
    ],
    steps: [
      {
        id: 'step-1',
        description: 'Season chicken breasts with salt and pepper.',
      },
      {
        id: 'step-2',
        description:
          'Grill chicken for 5-6 minutes per side until cooked through.',
      },
      { id: 'step-3', description: 'Slice chicken and set aside.' },
      {
        id: 'step-4',
        description: 'In a large bowl, toss lettuce with Caesar dressing.',
      },
      {
        id: 'step-5',
        description: 'Top with sliced chicken, croutons, and Parmesan cheese.',
      },
    ],
  },
];

export default function Recipes() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState(INITIAL_RECIPES);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [tagSearchQuery, setTagSearchQuery] = useState('');
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [isCreateRecipeOpen, setIsCreateRecipeOpen] = useState(false);
  const [isEditRecipeOpen, setIsEditRecipeOpen] = useState(false);
  const [isShoppingListOpen, setIsShoppingListOpen] = useState(false);
  const [isMealPlanOpen, setIsMealPlanOpen] = useState(false);

  // Get all unique tags from recipes
  const allTags = Array.from(
    new Set(recipes.flatMap((recipe) => recipe.tags || [])),
  ).sort();

  // Filter tags based on search query
  const filteredTags = tagSearchQuery
    ? allTags.filter((tag) =>
        tag.toLowerCase().includes(tagSearchQuery.toLowerCase()),
      )
    : allTags;

  // Filter recipes based on search query, active category, and active tag
  const filteredRecipes = recipes.filter((recipe) => {
    // Search filter
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory =
      activeCategory === 'All' ||
      activeCategory === recipe.category ||
      (activeCategory === 'Favorites' && recipe.favorite);

    // Tag filter
    const matchesTag =
      !activeTag || (recipe.tags && recipe.tags.includes(activeTag));

    return matchesSearch && matchesCategory && matchesTag;
  });

  // Update recipe tags
  const updateRecipeTags = (recipeId: number, newTags: string[]) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === recipeId ? { ...recipe, tags: newTags } : recipe,
      ),
    );
  };

  // Open tag management dialog
  const openTagDialog = (recipe: any) => {
    setSelectedRecipe(recipe);
    setIsTagDialogOpen(true);
  };

  // Save new or edited recipe
  const handleSaveRecipe = (recipe: any) => {
    if (recipes.some((r) => r.id === recipe.id)) {
      // Update existing recipe
      setRecipes(recipes.map((r) => (r.id === recipe.id ? recipe : r)));
      toast({
        title: 'Recipe updated',
        description: `${recipe.title} has been updated.`,
      });
    } else {
      // Add new recipe
      setRecipes([...recipes, recipe]);
      toast({
        title: 'Recipe created',
        description: `${recipe.title} has been added to your recipes.`,
      });
    }

    setIsCreateRecipeOpen(false);
    setIsEditRecipeOpen(false);
  };

  // Edit recipe
  const handleEditRecipe = (recipe: any) => {
    setSelectedRecipe(recipe);
    setIsEditRecipeOpen(true);
  };

  // Delete recipe
  const handleDeleteRecipe = (recipeId: number) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== recipeId));
    toast({
      title: 'Recipe deleted',
      description: 'The recipe has been removed from your collection.',
      variant: 'destructive',
    });
  };

  // Add recipe ingredients to shopping list
  const handleAddToShoppingList = (recipe: any) => {
    setSelectedRecipe(recipe);
    setIsShoppingListOpen(true);
  };

  // Process adding ingredients to shopping list
  const processAddToShoppingList = (ingredients: any[]) => {
    // In a real app, this would add to a shopping list in state/database
    toast({
      title: 'Added to shopping list',
      description: `${ingredients.length} ingredients from ${selectedRecipe.title} added to your shopping list.`,
    });
  };

  // Add recipe to meal plan
  const handleAddToMealPlan = (recipe: any) => {
    setSelectedRecipe(recipe);
    setIsMealPlanOpen(true);
  };

  // Process adding to meal plan
  const processAddToMealPlan = (recipe: any, date: Date, mealType: string) => {
    // In a real app, this would add to a meal plan in state/database
    toast({
      title: 'Added to meal plan',
      description: `${recipe.title} added to your meal plan for ${date.toLocaleDateString()} (${mealType}).`,
    });
  };

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
          <Button onClick={() => setIsCreateRecipeOpen(true)}>
            <Plus className="mr-2 size-4" />
            Add Recipe
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        {/* Sidebar with tags */}
        <div className="w-full shrink-0 md:w-64">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Tag className="mr-2 size-4" />
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="mb-3">
                <div className="relative">
                  <Search className="text-muted-foreground absolute left-2.5 top-2.5 size-4" />
                  <Input
                    type="search"
                    placeholder="Search tags..."
                    className="w-full pl-8"
                    value={tagSearchQuery}
                    onChange={(e) => setTagSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <ScrollArea className="h-[300px] pr-3">
                <div className="space-y-1">
                  <Button
                    variant={activeTag === null ? 'secondary' : 'ghost'}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setActiveTag(null)}
                  >
                    All Recipes
                  </Button>

                  {filteredTags.map((tag) => (
                    <Button
                      key={tag}
                      variant={activeTag === tag ? 'secondary' : 'ghost'}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setActiveTag(tag)}
                    >
                      <span className="truncate">{tag}</span>
                      <Badge className="ml-auto">
                        {recipes.filter((r) => r.tags?.includes(tag)).length}
                      </Badge>
                    </Button>
                  ))}

                  {filteredTags.length === 0 && tagSearchQuery && (
                    <div className="text-muted-foreground py-4 text-center text-sm">
                      No tags found matching "{tagSearchQuery}"
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <Tabs
            defaultValue="All"
            className="space-y-4"
            onValueChange={setActiveCategory}
            value={activeCategory}
          >
            <TabsList className="flex overflow-auto pb-1">
              {CATEGORIES.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="shrink-0"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeCategory} className="space-y-4">
              {activeTag && (
                <div className="mb-4 flex items-center">
                  <p className="text-muted-foreground mr-2 text-sm">
                    Filtered by tag:
                  </p>
                  <Badge className="mr-2">{activeTag}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTag(null)}
                  >
                    <X className="mr-1 size-3" />
                    Clear
                  </Button>
                </div>
              )}

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredRecipes.map((recipe) => (
                  <div key={recipe.id} className="group relative">
                    <RecipeCard {...recipe} />
                    <div className="absolute left-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-background/80 backdrop-blur-sm"
                        onClick={() => openTagDialog(recipe)}
                      >
                        <Tag className="mr-1 size-3" />
                        Tags
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-background/80 backdrop-blur-sm"
                        onClick={() => handleAddToShoppingList(recipe)}
                      >
                        <ShoppingCart className="mr-1 size-3" />
                        Shop
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-background/80 backdrop-blur-sm"
                        onClick={() => handleAddToMealPlan(recipe)}
                      >
                        <Calendar className="mr-1 size-3" />
                        Plan
                      </Button>
                    </div>

                    <div className="absolute bottom-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-background/80 mr-1 backdrop-blur-sm"
                        onClick={() => handleEditRecipe(recipe)}
                      >
                        Edit
                      </Button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="bg-destructive/80 backdrop-blur-sm"
                          >
                            Delete
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <div className="space-y-4 p-6">
                            <h3 className="text-lg font-medium">
                              Delete Recipe
                            </h3>
                            <p>
                              Are you sure you want to delete "{recipe.title}"?
                              This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline">Cancel</Button>
                              <Button
                                variant="destructive"
                                onClick={() => handleDeleteRecipe(recipe.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>

              {filteredRecipes.length === 0 && (
                <div className="rounded-lg border py-12 text-center">
                  <p className="text-muted-foreground">
                    No recipes found matching your criteria.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Tag Management Dialog */}
      <Dialog open={isTagDialogOpen} onOpenChange={setIsTagDialogOpen}>
        <DialogContent>
          <div className="space-y-4 p-6">
            <h3 className="text-lg font-medium">Manage Tags</h3>
            <p className="text-muted-foreground text-sm">
              {selectedRecipe?.title}
            </p>

            <div className="space-y-2">
              <Label>Tags</Label>
              <TagInput
                tags={selectedRecipe?.tags || []}
                onChange={(newTags) => {
                  setSelectedRecipe({ ...selectedRecipe, tags: newTags });
                }}
                placeholder="Add tag and press Enter..."
                searchable
                allTags={allTags}
              />
              <p className="text-muted-foreground mt-1 text-xs">
                Press Enter or comma to add a tag. Press Backspace to remove the
                last tag.
              </p>
            </div>

            {allTags.length > 0 && (
              <div className="mt-4 space-y-2">
                <Label>Suggested Tags</Label>
                <div className="flex flex-wrap gap-1">
                  {allTags
                    .filter((tag) => !selectedRecipe?.tags?.includes(tag))
                    .slice(0, 10)
                    .map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="hover:bg-secondary cursor-pointer"
                        onClick={() => {
                          const newTags = [
                            ...(selectedRecipe?.tags || []),
                            tag,
                          ];
                          setSelectedRecipe({
                            ...selectedRecipe,
                            tags: newTags,
                          });
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsTagDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (selectedRecipe) {
                    updateRecipeTags(
                      selectedRecipe.id,
                      selectedRecipe.tags || [],
                    );
                    setIsTagDialogOpen(false);
                    toast({
                      title: 'Tags updated',
                      description:
                        'Recipe tags have been updated successfully.',
                    });
                  }
                }}
              >
                Save Tags
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Recipe Dialog */}
      <Dialog open={isCreateRecipeOpen} onOpenChange={setIsCreateRecipeOpen}>
        <DialogContent className="max-h-[90vh] max-w-5xl overflow-auto">
          <RecipeForm
            allTags={allTags}
            onSave={handleSaveRecipe}
            onCancel={() => setIsCreateRecipeOpen(false)}
            onAddToMealPlan={handleAddToMealPlan}
            onAddToShoppingList={handleAddToShoppingList}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Recipe Dialog */}
      <Dialog open={isEditRecipeOpen} onOpenChange={setIsEditRecipeOpen}>
        <DialogContent className="max-h-[90vh] max-w-5xl overflow-auto">
          <RecipeForm
            existingRecipe={selectedRecipe}
            allTags={allTags}
            onSave={handleSaveRecipe}
            onCancel={() => setIsEditRecipeOpen(false)}
            onAddToMealPlan={handleAddToMealPlan}
            onAddToShoppingList={handleAddToShoppingList}
          />
        </DialogContent>
      </Dialog>

      {/* Add to Shopping List Dialog */}
      <AddToShoppingList
        recipe={selectedRecipe}
        open={isShoppingListOpen}
        onOpenChange={setIsShoppingListOpen}
        onAddToList={processAddToShoppingList}
      />

      {/* Add to Meal Plan Dialog */}
      <AddToMealPlan
        recipe={selectedRecipe}
        open={isMealPlanOpen}
        onOpenChange={setIsMealPlanOpen}
        onAddToMealPlan={processAddToMealPlan}
      />

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
}
