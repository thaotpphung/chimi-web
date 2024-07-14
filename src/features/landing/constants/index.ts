import {
  Utensils,
  CookingPot,
  HeartPulse,
  ShoppingCart,
  CalendarDays,
  ListChecks,
} from 'lucide-react';

export type Navigation = (typeof NAVIGATIONS)[number];
export const NAVIGATIONS = [
  {
    id: '0',
    title: 'Overview',
    url: '#overview',
  },
  {
    id: '1',
    title: 'Pricing',
    url: '#pricing',
  },
];

export type Benefit = (typeof BENEFITS)[number];
export const BENEFITS = [
  {
    id: '0',
    title: 'Meal Planning & Customization',
    text: 'Plan and customize meals tailored to your family’s dietary preferences.',
    icon: Utensils,
  },
  {
    id: '1',
    title: 'Recipe Management',
    text: 'Discover, save, and organize recipes to simplify your meal preparation.',
    icon: CookingPot,
  },
  {
    id: '2',
    title: 'Health and Fitness Tracking',
    text: 'Track and achieve your family’s health and fitness goals effortlessly.',
    icon: HeartPulse,
  },
  {
    id: '3',
    title: 'Shopping List Collaboration',
    text: 'Create and share grocery lists to streamline your family’s shopping.',
    icon: ShoppingCart,
  },
  {
    id: '4',
    title: 'Task and To-Do Lists',
    text: 'Stay organized with easy-to-manage tasks and to-do lists for the whole family.',
    icon: ListChecks,
  },
  {
    id: '5',
    title: 'Family Calendar and Scheduling',
    text: 'Synchronize your family’s schedules and never miss an important event.',
    icon: CalendarDays,
  },
];
