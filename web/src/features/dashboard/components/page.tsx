'use client';

import {
  Activity,
  CalendarIcon,
  ChefHat,
  Cloud,
  Droplets,
  ListChecks,
  ShoppingCart,
  Sun,
  TrendingUp,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { Progress } from '@/components/ui/progress';

// Sample data for visualizations
const ACTIVITY_DATA = [
  { name: 'Mon', steps: 5240 },
  { name: 'Tue', steps: 7800 },
  { name: 'Wed', steps: 4500 },
  { name: 'Thu', steps: 6700 },
  { name: 'Fri', steps: 8900 },
  { name: 'Sat', steps: 7300 },
  { name: 'Sun', steps: 4200 },
];

const MEAL_COMPLETION = [
  { name: 'Planned', value: 85 },
  { name: 'Unplanned', value: 15 },
];

const TASK_STATUS = [
  { name: 'Completed', value: 8 },
  { name: 'Pending', value: 5 },
  { name: 'Overdue', value: 2 },
];

// Unified color palette
const COLORS = {
  primary: '#f97316', // Primary orange
  secondary: '#38bdf8', // Secondary blue
  success: '#22c55e', // Success green
  warning: '#f59e0b', // Warning yellow
  error: '#ef4444', // Error red
  neutral: '#6b7280', // Neutral gray
};

// Chart colors
const CHART_COLORS = [
  COLORS.primary,
  COLORS.secondary,
  COLORS.warning,
  COLORS.error,
];

export default function Dashboard() {
  const [greeting, setGreeting] = useState('Good day');
  const [progress, setProgress] = useState(13);
  const [weatherTemp, setWeatherTemp] = useState(72);
  const [weatherCondition, setWeatherCondition] = useState('Sunny');

  // Set greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    // Simulate progress loading
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {greeting}, Family!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your family today.
          </p>
        </div>

        {/* Weather Widget */}
        <Card className="w-full md:w-auto">
          <CardContent className="flex items-center gap-3 p-3">
            {weatherCondition === 'Sunny' ? (
              <Sun className="text-warning size-8" />
            ) : (
              <Cloud className="text-info size-8" />
            )}
            <div>
              <p className="text-2xl font-bold">{weatherTemp}°F</p>
              <p className="text-muted-foreground text-xs">Seattle, WA</p>
            </div>
            <div className="ml-2 border-l pl-2">
              <div className="flex items-center gap-1 text-xs">
                <Droplets className="text-info size-3" />
                <span>20%</span>
              </div>
              <div className="mt-1 flex items-center gap-1 text-xs">
                <TrendingUp className="text-success size-3" />
                <span>75°F</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Overview */}
      <Card className="border-t-primary border-t-4">
        <CardHeader>
          <CardTitle>Today's Overview</CardTitle>
          <CardDescription>
            A quick summary of your family's day
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <h3 className="text-muted-foreground text-sm font-medium">
                Meal Plan Completion
              </h3>
              <div className="h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={MEAL_COMPLETION}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={50}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {MEAL_COMPLETION.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={CHART_COLORS[index % CHART_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-muted-foreground flex justify-between text-xs">
                <div className="flex items-center gap-1">
                  <div
                    className="size-2 rounded-full"
                    style={{ backgroundColor: CHART_COLORS[0] }}
                  ></div>
                  <span>Planned (85%)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div
                    className="size-2 rounded-full"
                    style={{ backgroundColor: CHART_COLORS[1] }}
                  ></div>
                  <span>Unplanned (15%)</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-muted-foreground text-sm font-medium">
                Task Status
              </h3>
              <div className="h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={TASK_STATUS}>
                    <XAxis dataKey="name" fontSize={10} />
                    <YAxis fontSize={10} />
                    <Tooltip />
                    <Bar dataKey="value" fill={COLORS.primary} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-muted-foreground text-sm font-medium">
                Weekly Activity
              </h3>
              <div className="h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ACTIVITY_DATA}>
                    <XAxis dataKey="name" fontSize={10} />
                    <YAxis fontSize={10} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="steps"
                      stroke={COLORS.secondary}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-4">
        <QuickActionCard
          icon={<ShoppingCart className="size-6" />}
          title="Shopping List"
          description="8 items needed"
          color="blue"
        />

        <QuickActionCard
          icon={<ChefHat className="size-6" />}
          title="Meal Planning"
          description="Dinner: Pasta Night"
          color="green"
        />

        <QuickActionCard
          icon={<ListChecks className="size-6" />}
          title="Tasks"
          description="5 tasks pending"
          color="purple"
        />

        <QuickActionCard
          icon={<CalendarIcon className="size-6" />}
          title="Calendar"
          description="3 events today"
          color="orange"
        />
      </div>

      {/* Family Activity & Upcoming */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Family Activity</CardTitle>
            <CardDescription>
              Recent activity from family members
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {[
                {
                  name: 'John',
                  action: 'completed a workout',
                  time: '10 minutes ago',
                  avatar: '/placeholder.svg?height=32&width=32',
                  initials: 'JD',
                },
                {
                  name: 'Sarah',
                  action: 'added 3 items to shopping list',
                  time: '25 minutes ago',
                  avatar: '/placeholder.svg?height=32&width=32',
                  initials: 'SJ',
                },
                {
                  name: 'Emma',
                  action: 'finished homework assignment',
                  time: '1 hour ago',
                  avatar: '/placeholder.svg?height=32&width=32',
                  initials: 'ED',
                },
                {
                  name: 'Michael',
                  action: 'logged soccer practice',
                  time: '2 hours ago',
                  avatar: '/placeholder.svg?height=32&width=32',
                  initials: 'MD',
                },
              ].map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 border-b p-4 last:border-0"
                >
                  <Avatar>
                    <AvatarImage src={activity.avatar} alt={activity.name} />
                    <AvatarFallback>{activity.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      <span className="font-semibold">{activity.name}</span>{' '}
                      {activity.action}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t p-4">
            <Button variant="ghost" size="sm" className="w-full">
              View All Activity
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming</CardTitle>
            <CardDescription>
              Events and tasks for the next 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <UpcomingItem
                icon={<CalendarIcon className="size-4" />}
                title="Doctor Appointment"
                time="10:00 AM"
                description="Emma's annual checkup"
              />

              <UpcomingItem
                icon={<ListChecks className="size-4" />}
                title="Pick up kids from school"
                time="3:30 PM"
                description="Assigned to Sarah"
              />

              <UpcomingItem
                icon={<ChefHat className="size-4" />}
                title="Prepare Dinner"
                time="6:00 PM"
                description="Pasta with vegetables"
              />

              <UpcomingItem
                icon={<Activity className="size-4" />}
                title="Evening Walk"
                time="7:30 PM"
                description="Family activity - 30 minutes"
              />
            </div>
          </CardContent>
          <CardFooter className="border-t p-4">
            <Button variant="ghost" size="sm" className="w-full">
              View Full Calendar
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Weekly Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Family Goals</CardTitle>
          <CardDescription>
            Track your family's progress toward weekly goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ProgressItem
              icon={<Activity className="size-4" />}
              title="Physical Activity"
              value={progress}
              description="Goal: 30 minutes of activity per day for each family member"
            />

            <ProgressItem
              icon={<ChefHat className="size-4" />}
              title="Home-cooked Meals"
              value={85}
              description="Goal: 6 home-cooked meals per week"
            />

            <ProgressItem
              icon={<ListChecks className="size-4" />}
              title="Chore Completion"
              value={42}
              description="Goal: All assigned chores completed on time"
            />
          </div>
        </CardContent>
      </Card>

      {/* Motivation Quote */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6 text-center">
          <blockquote className="text-lg font-medium italic">
            "The family is one of nature's masterpieces."
          </blockquote>
          <p className="text-muted-foreground mt-2 text-sm">
            — George Santayana
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// Reusable components for better consistency

function QuickActionCard({
  icon,
  title,
  description,
  color,
}: {
  icon: any;
  title: string;
  description: string;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800',
    green:
      'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800',
    purple:
      'bg-purple-50 border-purple-200 dark:bg-purple-950 dark:border-purple-800',
    orange:
      'bg-orange-50 border-orange-200 dark:bg-orange-950 dark:border-orange-800',
  };

  const iconColorMap: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300',
    green: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300',
    purple:
      'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300',
    orange:
      'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300',
  };

  return (
    <Card className={`${colorMap[color]}`}>
      <CardContent className="flex flex-col items-center p-4 text-center">
        <div className={`rounded-full ${iconColorMap[color]} mb-3 p-3`}>
          {icon}
        </div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-muted-foreground mb-3 text-xs">{description}</p>
        <Button variant="outline" size="sm" className="mt-auto w-full">
          View {title}
        </Button>
      </CardContent>
    </Card>
  );
}

function UpcomingItem({
  icon,
  title,
  time,
  description,
}: {
  icon: any;
  title: string;
  time: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="bg-primary/10 text-primary rounded-md p-2">{icon}</div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">{title}</h4>
          <Badge variant="outline">{time}</Badge>
        </div>
        <p className="text-muted-foreground mt-1 text-xs">{description}</p>
      </div>
    </div>
  );
}

function ProgressItem({
  icon,
  title,
  value,
  description,
}: {
  icon: any;
  title: string;
  value: number;
  description: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-primary">{icon}</span>
          <span className="text-sm font-medium">{title}</span>
        </div>
        <span className="text-sm font-medium">{value}%</span>
      </div>
      <Progress value={value} className="h-2" />
      <p className="text-muted-foreground text-xs">{description}</p>
    </div>
  );
}
