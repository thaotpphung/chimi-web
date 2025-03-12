'use client';

import {
  Calendar,
  ChefHat,
  Clock,
  ImageIcon,
  Info,
  LinkIcon,
  ListChecks,
  Plus,
  ShoppingCart,
  TagIcon,
  Trash,
  Users,
  Utensils,
} from 'lucide-react';
import type React from 'react';
import { useRef, useState } from 'react';

import { TagInput } from '@/components/containers/tag-input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

// Types
interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  note?: string;
}

interface Step {
  id: string;
  description: string;
}

interface Recipe {
  id: number;
  title: string;
  description: string;
  category: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  source: string;
  sourceUrl: string;
  image: string;
  ingredients: Ingredient[];
  steps: Step[];
  tags: string[];
  favorite: boolean;
  rating: number;
}

interface RecipeFormProps {
  existingRecipe?: Partial<Recipe>;
  allTags?: string[];
  onSave: (recipe: Recipe) => void;
  onCancel: () => void;
  onAddToMealPlan?: (recipe: Recipe) => void;
  onAddToShoppingList?: (recipe: Recipe) => void;
}

// Common units for cooking
const UNITS: string[] = [
  'cup',
  'tablespoon',
  'teaspoon',
  'ounce',
  'pound',
  'gram',
  'kilogram',
  'milliliter',
  'liter',
  'pinch',
  'dash',
  'clove',
  'slice',
  'piece',
  'whole',
  'none',
];

// Recipe categories
const CATEGORIES: string[] = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Dessert',
  'Snack',
  'Appetizer',
  'Drink',
  'Side',
];

export function RecipeForm({
  existingRecipe,
  allTags = [],
  onSave,
  onCancel,
  onAddToMealPlan,
  onAddToShoppingList,
}: RecipeFormProps): React.ReactElement {
  // Initialize form state with existing recipe or defaults
  const [recipe, setRecipe] = useState<Recipe>({
    id: existingRecipe?.id || Date.now(),
    title: existingRecipe?.title || '',
    description: existingRecipe?.description || '',
    category: existingRecipe?.category || 'Dinner',
    prepTime: existingRecipe?.prepTime || '',
    cookTime: existingRecipe?.cookTime || '',
    servings: existingRecipe?.servings || 4,
    source: existingRecipe?.source || '',
    sourceUrl: existingRecipe?.sourceUrl || '',
    image: existingRecipe?.image || '/placeholder.svg?height=300&width=400',
    ingredients: existingRecipe?.ingredients || [
      { id: 'ing-1', name: '', quantity: '', unit: '', note: '' },
    ],
    steps: existingRecipe?.steps || [{ id: 'step-1', description: '' }],
    tags: existingRecipe?.tags || [],
    favorite: existingRecipe?.favorite || false,
    rating: existingRecipe?.rating || 0,
  });

  const [scaleFactor, setScaleFactor] = useState<number>(1);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<string>('details');

  // Handle basic input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;
    setRecipe((prev) => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string): void => {
    setRecipe((prev) => ({ ...prev, [name]: value }));
  };

  // Handle ingredient changes
  const handleIngredientChange = (
    id: string,
    field: keyof Ingredient,
    value: string,
  ): void => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ing) =>
        ing.id === id ? { ...ing, [field]: value } : ing,
      ),
    }));
  };

  // Add new ingredient
  const addIngredient = (): void => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: [
        ...prev.ingredients,
        { id: `ing-${Date.now()}`, name: '', quantity: '', unit: '', note: '' },
      ],
    }));
  };

  // Remove ingredient
  const removeIngredient = (id: string): void => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((ing) => ing.id !== id),
    }));
  };

  // Handle step changes
  const handleStepChange = (id: string, value: string): void => {
    setRecipe((prev) => ({
      ...prev,
      steps: prev.steps.map((step) =>
        step.id === id ? { ...step, description: value } : step,
      ),
    }));
  };

  // Add new step
  const addStep = (): void => {
    setRecipe((prev) => ({
      ...prev,
      steps: [...prev.steps, { id: `step-${Date.now()}`, description: '' }],
    }));
  };

  // Remove step
  const removeStep = (id: string): void => {
    setRecipe((prev) => ({
      ...prev,
      steps: prev.steps.filter((step) => step.id !== id),
    }));
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const imageUrl = event.target?.result as string;
        setPreviewImage(imageUrl);
        setRecipe((prev) => ({ ...prev, image: imageUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const triggerFileInput = (): void => {
    fileInputRef.current?.click();
  };

  // Handle tag changes
  const handleTagsChange = (newTags: string[]): void => {
    setRecipe((prev) => ({ ...prev, tags: newTags }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    // Validate required fields
    if (!recipe.title) {
      alert('Recipe title is required');
      return;
    }

    // Filter out empty ingredients and steps
    const filteredIngredients = recipe.ingredients.filter(
      (ing) => ing.name.trim() !== '',
    );
    const filteredSteps = recipe.steps.filter(
      (step) => step.description.trim() !== '',
    );

    if (filteredIngredients.length === 0) {
      alert('At least one ingredient is required');
      return;
    }

    if (filteredSteps.length === 0) {
      alert('At least one step is required');
      return;
    }

    // Create final recipe object
    const finalRecipe: Recipe = {
      ...recipe,
      ingredients: filteredIngredients,
      steps: filteredSteps,
    };

    onSave(finalRecipe);
  };

  // Scale ingredient quantity
  const scaleQuantity = (quantity: string, factor: number): string => {
    if (!quantity) return '';

    // Handle fractions like "1/2"
    if (quantity.includes('/')) {
      const [numerator, denominator] = quantity
        .split('/')
        .map((part) => Number.parseFloat(part.trim()));
      if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
        const decimal = (numerator / denominator) * factor;
        // Convert back to fraction if needed
        return decimal.toString();
      }
    }

    // Handle mixed numbers like "1 1/2"
    if (quantity.includes(' ') && quantity.includes('/')) {
      const parts = quantity.split(' ');
      const whole = Number.parseFloat(parts[0]);
      const [numerator, denominator] = parts[1]
        .split('/')
        .map((part) => Number.parseFloat(part.trim()));

      if (
        !isNaN(whole) &&
        !isNaN(numerator) &&
        !isNaN(denominator) &&
        denominator !== 0
      ) {
        const decimal = (whole + numerator / denominator) * factor;
        return decimal.toString();
      }
    }

    // Handle simple numbers
    const num = Number.parseFloat(quantity);
    if (!isNaN(num)) {
      return (num * factor).toString();
    }

    return quantity;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="w-full md:w-2/3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">
                <Info className="mr-2 size-4" />
                Details
              </TabsTrigger>
              <TabsTrigger value="ingredients">
                <Utensils className="mr-2 size-4" />
                Ingredients
              </TabsTrigger>
              <TabsTrigger value="steps">
                <ListChecks className="mr-2 size-4" />
                Steps
              </TabsTrigger>
              <TabsTrigger value="tags">
                <TagIcon className="mr-2 size-4" />
                Tags
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Recipe Title*</Label>
                  <Input
                    id="title"
                    name="title"
                    value={recipe.title}
                    onChange={handleChange}
                    placeholder="Enter recipe title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={recipe.description}
                    onChange={handleChange}
                    placeholder="Brief description of the recipe"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={recipe.category}
                      onValueChange={(value) =>
                        handleSelectChange('category', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="servings">Servings</Label>
                    <Input
                      id="servings"
                      name="servings"
                      type="number"
                      min="1"
                      value={recipe.servings.toString()}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="prepTime">Prep Time</Label>
                    <Input
                      id="prepTime"
                      name="prepTime"
                      value={recipe.prepTime}
                      onChange={handleChange}
                      placeholder="e.g. 15 min"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cookTime">Cook Time</Label>
                    <Input
                      id="cookTime"
                      name="cookTime"
                      value={recipe.cookTime}
                      onChange={handleChange}
                      placeholder="e.g. 30 min"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="source">Source</Label>
                  <Input
                    id="source"
                    name="source"
                    value={recipe.source}
                    onChange={handleChange}
                    placeholder="e.g. Grandma's Cookbook"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sourceUrl">Source URL</Label>
                  <div className="flex">
                    <div className="bg-muted flex items-center rounded-l-md border border-r-0 px-3">
                      <LinkIcon className="text-muted-foreground size-4" />
                    </div>
                    <Input
                      id="sourceUrl"
                      name="sourceUrl"
                      value={recipe.sourceUrl}
                      onChange={handleChange}
                      placeholder="https://example.com/recipe"
                      className="rounded-l-none"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ingredients" className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Ingredients</h3>

                <div className="flex items-center gap-2">
                  <Label htmlFor="scale" className="text-sm">
                    Scale:
                  </Label>
                  <Select
                    value={scaleFactor.toString()}
                    onValueChange={(value) =>
                      setScaleFactor(Number.parseFloat(value))
                    }
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Scale" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.5">½×</SelectItem>
                      <SelectItem value="1">1×</SelectItem>
                      <SelectItem value="2">2×</SelectItem>
                      <SelectItem value="3">3×</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div key={ingredient.id} className="flex items-start gap-2">
                      <div className="grid flex-1 grid-cols-12 gap-2">
                        <Input
                          className="col-span-2"
                          value={scaleQuantity(
                            ingredient.quantity,
                            scaleFactor,
                          )}
                          onChange={(e) =>
                            handleIngredientChange(
                              ingredient.id,
                              'quantity',
                              e.target.value,
                            )
                          }
                          placeholder="Qty"
                        />

                        <Select
                          value={ingredient.unit}
                          onValueChange={(value) =>
                            handleIngredientChange(ingredient.id, 'unit', value)
                          }
                        >
                          <SelectTrigger className="col-span-2">
                            <SelectValue placeholder="Unit" />
                          </SelectTrigger>
                          <SelectContent>
                            {UNITS.map((unit) => (
                              <SelectItem key={unit} value={unit}>
                                {unit === 'none' ? '—' : unit}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Input
                          className="col-span-5"
                          value={ingredient.name}
                          onChange={(e) =>
                            handleIngredientChange(
                              ingredient.id,
                              'name',
                              e.target.value,
                            )
                          }
                          placeholder="Ingredient name"
                        />

                        <Input
                          className="col-span-3"
                          value={ingredient.note || ''}
                          onChange={(e) =>
                            handleIngredientChange(
                              ingredient.id,
                              'note',
                              e.target.value,
                            )
                          }
                          placeholder="Note (optional)"
                        />
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeIngredient(ingredient.id)}
                        disabled={recipe.ingredients.length <= 1}
                      >
                        <Trash className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <Button
                type="button"
                variant="outline"
                onClick={addIngredient}
                className="w-full"
              >
                <Plus className="mr-2 size-4" />
                Add Ingredient
              </Button>
            </TabsContent>

            <TabsContent value="steps" className="space-y-4 pt-4">
              <h3 className="text-lg font-medium">Instructions</h3>

              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {recipe.steps.map((step, index) => (
                    <div key={step.id} className="flex items-start gap-2">
                      <div className="bg-primary text-primary-foreground flex size-6 shrink-0 items-center justify-center rounded-full text-sm font-medium">
                        {index + 1}
                      </div>

                      <Textarea
                        value={step.description}
                        onChange={(e) =>
                          handleStepChange(step.id, e.target.value)
                        }
                        placeholder={`Step ${index + 1}`}
                        className="min-h-[80px] flex-1"
                      />

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeStep(step.id)}
                        disabled={recipe.steps.length <= 1}
                      >
                        <Trash className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <Button
                type="button"
                variant="outline"
                onClick={addStep}
                className="w-full"
              >
                <Plus className="mr-2 size-4" />
                Add Step
              </Button>
            </TabsContent>

            <TabsContent value="tags" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <TagInput
                  tags={recipe.tags}
                  onChange={handleTagsChange}
                  placeholder="Add tags..."
                  searchable
                  allTags={allTags}
                />
                <p className="text-muted-foreground text-xs">
                  Press Enter or comma to add a tag. Press Backspace to remove
                  the last tag.
                </p>
              </div>

              {allTags.length > 0 && (
                <div className="mt-4 space-y-2">
                  <Label>Suggested Tags</Label>
                  <div className="flex flex-wrap gap-1">
                    {allTags
                      .filter((tag) => !recipe.tags.includes(tag))
                      .slice(0, 15)
                      .map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="hover:bg-secondary cursor-pointer"
                          onClick={() =>
                            handleTagsChange([...recipe.tags, tag])
                          }
                        >
                          {tag}
                        </Badge>
                      ))}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="w-full space-y-4 md:w-1/3">
          <Card>
            <CardContent className="space-y-4 p-4">
              <div className="relative aspect-video overflow-hidden rounded-md border">
                <Image
                  src={previewImage || recipe.image}
                  alt={recipe.title || 'Recipe preview'}
                  className="object-cover"
                />

                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="absolute bottom-2 right-2"
                  onClick={triggerFileInput}
                >
                  <ImageIcon className="mr-2 size-4" />
                  Change Image
                </Button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <ChefHat className="text-muted-foreground mr-2 size-4" />
                  <span className="text-sm">Category: {recipe.category}</span>
                </div>

                <div className="flex items-center">
                  <Clock className="text-muted-foreground mr-2 size-4" />
                  <span className="text-sm">
                    Prep: {recipe.prepTime || '—'} | Cook:{' '}
                    {recipe.cookTime || '—'}
                  </span>
                </div>

                <div className="flex items-center">
                  <Users className="text-muted-foreground mr-2 size-4" />
                  <span className="text-sm">Servings: {recipe.servings}</span>
                </div>
              </div>

              <Separator />

              {onAddToMealPlan && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => onAddToMealPlan(recipe)}
                >
                  <Calendar className="mr-2 size-4" />
                  Add to Meal Plan
                </Button>
              )}

              {onAddToShoppingList && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => onAddToShoppingList(recipe)}
                >
                  <ShoppingCart className="mr-2 size-4" />
                  Add Ingredients to Shopping List
                </Button>
              )}
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Save Recipe
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
