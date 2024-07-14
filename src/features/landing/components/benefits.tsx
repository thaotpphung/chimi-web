import React from 'react';

import { cn } from '@/utils/cn';

import { BENEFITS, Benefit } from '../constants';

const Benefits = () => {
  return (
    <section id="#benefits" className=" border-t border-gray-200 bg-gray-50">
      <div className="max-container py-20">
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
          {BENEFITS.map((benefit: Benefit, index: number) => (
            <div
              key={benefit.id}
              className={cn(
                'text-center md:flex md:items-start md:text-left lg:block lg:text-center',
                {
                  'lg:mt-6': index > 2,
                },
              )}
            >
              <div className="flex justify-center md:shrink-0">
                <div className="flex size-16 items-center justify-center rounded-full bg-background text-primary">
                  {<benefit.icon className="size-1/3" />}
                </div>
              </div>
              <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                <h3 className="text-base font-medium text-gray-900">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {benefit.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
