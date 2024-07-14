import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const Pricing = () => {
  return (
    <section id="pricing" className="max-container py-20">
      <div className="container grid gap-8 px-4 md:px-6">
        <div className="grid gap-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Affordable Family Planning
          </h2>
          <p className="text-center text-lg text-muted-foreground">
            Choose the plan that fits your family&apos;s needs and budget.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="grid gap-4">
            <CardHeader>
              <CardTitle>Basic</CardTitle>
              <CardDescription>
                Essential family planning tools.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">$9</div>
              <p className="text-muted-foreground">per month</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Get Started
              </Button>
            </CardFooter>
          </Card>
          <Card className="grid gap-4">
            <CardHeader>
              <CardTitle>Standard</CardTitle>
              <CardDescription>
                Advanced family planning features.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">$19</div>
              <p className="text-muted-foreground">per month</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Get Started
              </Button>
            </CardFooter>
          </Card>
          <Card className="grid gap-4">
            <CardHeader>
              <CardTitle>Premium</CardTitle>
              <CardDescription>
                Comprehensive family planning solutions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">$29</div>
              <p className="text-muted-foreground">per month</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Get Started
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
