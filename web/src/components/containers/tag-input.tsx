'use client';

import { X } from 'lucide-react';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/utils/cn';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
  maxTags?: number;
  disabled?: boolean;
  searchable?: boolean;
  allTags?: string[];
  onSearch?: (query: string) => void;
}

export function TagInput({
  tags = [],
  onChange,
  placeholder = 'Add tag...',
  className,
  maxTags = 10,
  disabled = false,
  searchable = false,
  allTags = [],
  onSearch,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [filteredTags, setFilteredTags] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Filter tags based on input
  useEffect(() => {
    if (searchable && inputValue) {
      const filtered = allTags.filter(
        (tag) =>
          tag.toLowerCase().includes(inputValue.toLowerCase()) &&
          !tags.includes(tag),
      );
      setFilteredTags(filtered);
      setShowSuggestions(filtered.length > 0);

      if (onSearch) {
        onSearch(inputValue);
      }
    } else {
      setFilteredTags([]);
      setShowSuggestions(false);
    }
  }, [inputValue, allTags, tags, searchable, onSearch]);

  // Close suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (ev: globalThis.MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(ev.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const value = inputValue.trim();

    // Add tag on Enter or comma
    if ((e.key === 'Enter' || e.key === ',') && value) {
      e.preventDefault();

      // Don't add if tag already exists or we've reached max tags
      if (!tags.includes(value) && tags.length < maxTags) {
        const newTags = [...tags, value];
        onChange(newTags);
        setInputValue('');
      }
    }

    // Remove last tag on Backspace if input is empty
    if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      const newTags = tags.slice(0, -1);
      onChange(newTags);
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    onChange(newTags);
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const addTag = (tag: string) => {
    if (!tags.includes(tag) && tags.length < maxTags) {
      onChange([...tags, tag]);
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative">
      <div
        className={cn(
          'flex flex-wrap items-center gap-2 border rounded-md p-1.5 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
          className,
        )}
        onClick={handleContainerClick}
      >
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="flex items-center gap-1 px-2 py-1 text-xs"
          >
            {tag}
            {!disabled && (
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:bg-muted rounded-full p-0.5"
              >
                <X className="size-3" />
                <span className="sr-only">Remove {tag}</span>
              </button>
            )}
          </Badge>
        ))}

        {!disabled && tags.length < maxTags && (
          <Input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={tags.length === 0 ? placeholder : ''}
            className="h-7 min-w-[120px] flex-1 border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        )}
      </div>

      {/* Tag suggestions dropdown */}
      {searchable && showSuggestions && (
        <div
          ref={suggestionsRef}
          className="bg-popover absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md p-1 shadow-md"
        >
          {filteredTags.length > 0 ? (
            filteredTags.map((tag) => (
              <div
                key={tag}
                className="hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm"
                onClick={() => addTag(tag)}
              >
                {tag}
              </div>
            ))
          ) : (
            <div className="text-muted-foreground px-2 py-1.5 text-sm">
              No matching tags
            </div>
          )}
        </div>
      )}
    </div>
  );
}
