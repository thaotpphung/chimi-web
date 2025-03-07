import { Clock, Heart, Star, Users } from 'lucide-react';
import type React from 'react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Image } from '@/components/ui/image';

export interface RecipeCardProps {
  id: number;
  title: string;
  image: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  rating: number;
  category: string;
  favorite: boolean;
  onDragStart?: (e: React.DragEvent, recipe: any) => void;
  draggable?: boolean;
  compact?: boolean;
}

export function RecipeCard({
  id,
  title,
  image,
  prepTime,
  cookTime,
  servings,
  rating,
  category,
  favorite,
  onDragStart,
  draggable = false,
  compact = false,
}: RecipeCardProps) {
  const handleDragStart = (e: React.DragEvent) => {
    if (onDragStart) {
      onDragStart(e, {
        id,
        title,
        image,
        prepTime,
        cookTime,
        servings,
        rating,
        category,
        favorite,
      });
    }
  };

  if (compact) {
    return (
      <Card
        className="cursor-grab overflow-hidden active:cursor-grabbing"
        draggable={draggable}
        onDragStart={handleDragStart}
      >
        <div className="flex items-center p-3">
          <div className="relative mr-3 size-12 shrink-0 overflow-hidden rounded-md">
            <Image
              src={image || '/placeholder.svg'}
              alt={title}
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="truncate text-sm font-medium">{title}</h4>
            <div className="text-muted-foreground mt-1 flex items-center text-xs">
              <Clock className="mr-1 size-3" />
              <span>
                {prepTime} + {cookTime}
              </span>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={`overflow-hidden ${draggable ? 'cursor-grab active:cursor-grabbing' : ''}`}
      draggable={draggable}
      onDragStart={handleDragStart}
    >
      <div className="relative h-48">
        <Image
          src={image || '/placeholder.svg'}
          alt={title}
          className="object-cover"
        />
        <Heart
          className={`absolute right-2 top-2 size-5 ${favorite ? 'fill-red-500 text-red-500' : 'text-white'}`}
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="line-clamp-1">{title}</CardTitle>
        <CardDescription>
          <Badge variant="outline">{category}</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <Clock className="mr-1 size-4" />
            <span>
              {prepTime} + {cookTime}
            </span>
          </div>
          <div className="flex items-center">
            <Users className="mr-1 size-4" />
            <span>{servings}</span>
          </div>
          <div className="flex items-center">
            <Star className="fill-warning text-warning mr-1 size-4" />
            <span>{rating}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
