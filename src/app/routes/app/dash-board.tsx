import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircleIcon } from 'lucide-react';

export const DashboardRoute = () => {
  return (
    <div className="flex h-screen w-full">
      <div className="flex flex-col w-full">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex items-center"></div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Today's Plan</CardTitle>
                <CardDescription>
                  Your meals for today. Tap to add or remove.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center gap-4">
                  <h2 className="font-semibold">Breakfast</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    8:00 AM - 9:00 AM
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <h2 className="font-semibold">Lunch</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    12:00 PM - 1:00 PM
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <h2 className="font-semibold">Dinner</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    6:00 PM - 7:00 PM
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Shopping List</CardTitle>
                <CardDescription>
                  Items you need to buy for today's meals.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 mr-2.5" />
                    Milk
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 mr-2.5" />
                    Eggs
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 mr-2.5" />
                    Bread
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 mr-2.5" />
                    Chicken
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};
