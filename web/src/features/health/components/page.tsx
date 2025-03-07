'use client';

import { Activity, Plus, Weight } from 'lucide-react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const FAMILY_MEMBERS = ['All', 'John', 'Sarah', 'Emma', 'Michael'];

const HEALTH_DATA = {
  weight: [
    { date: 'Jan 1', John: 185, Sarah: 135, Emma: 85, Michael: 95 },
    { date: 'Feb 1', John: 183, Sarah: 134, Emma: 86, Michael: 96 },
    { date: 'Mar 1', John: 182, Sarah: 133, Emma: 87, Michael: 97 },
    { date: 'Apr 1', John: 180, Sarah: 132, Emma: 88, Michael: 98 },
    { date: 'May 1', John: 178, Sarah: 131, Emma: 89, Michael: 99 },
    { date: 'Jun 1', John: 177, Sarah: 130, Emma: 90, Michael: 100 },
  ],
  activity: [
    { date: 'Jan 1', John: 5000, Sarah: 7500, Emma: 4000, Michael: 6000 },
    { date: 'Feb 1', John: 6000, Sarah: 8000, Emma: 4500, Michael: 6500 },
    { date: 'Mar 1', John: 7000, Sarah: 8500, Emma: 5000, Michael: 7000 },
    { date: 'Apr 1', John: 8000, Sarah: 9000, Emma: 5500, Michael: 7500 },
    { date: 'May 1', John: 9000, Sarah: 9500, Emma: 6000, Michael: 8000 },
    { date: 'Jun 1', John: 10000, Sarah: 10000, Emma: 6500, Michael: 8500 },
  ],
};

export default function Health() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Health & Fitness
          </h1>
          <p className="text-muted-foreground">
            Track health metrics and fitness goals for your family.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="All">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select family member" />
            </SelectTrigger>
            <SelectContent>
              {FAMILY_MEMBERS.map((member) => (
                <SelectItem key={member} value={member}>
                  {member}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button>
            <Plus className="mr-2 size-4" />
            Add Entry
          </Button>
        </div>
      </div>

      <Tabs defaultValue="weight" className="space-y-4">
        <TabsList>
          <TabsTrigger value="weight">Weight</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="sleep">Sleep</TabsTrigger>
        </TabsList>

        <TabsContent value="weight" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-1">
                <CardTitle>Weight Tracking</CardTitle>
                <CardDescription>
                  Monitor weight changes over time.
                </CardDescription>
              </div>
              <Weight className="text-primary ml-auto size-5" />
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={HEALTH_DATA.weight}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="John" stroke="#8884d8" />
                    <Line type="monotone" dataKey="Sarah" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="Emma" stroke="#ffc658" />
                    <Line type="monotone" dataKey="Michael" stroke="#ff8042" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-1">
                <CardTitle>Activity Tracking</CardTitle>
                <CardDescription>
                  Monitor daily steps and activity levels.
                </CardDescription>
              </div>
              <Activity className="text-primary ml-auto size-5" />
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={HEALTH_DATA.activity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="John" stroke="#8884d8" />
                    <Line type="monotone" dataKey="Sarah" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="Emma" stroke="#ffc658" />
                    <Line type="monotone" dataKey="Michael" stroke="#ff8042" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nutrition" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Nutrition Tracking</CardTitle>
              <CardDescription>
                Track calories and nutritional intake.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[200px] items-center justify-center rounded-md border">
                <p className="text-muted-foreground">
                  No nutrition data available yet.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sleep" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sleep Tracking</CardTitle>
              <CardDescription>
                Monitor sleep duration and quality.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[200px] items-center justify-center rounded-md border">
                <p className="text-muted-foreground">
                  No sleep data available yet.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
