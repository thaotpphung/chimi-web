import * as React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { registerInputSchema } from '@/lib/auth';

type RegisterFormProps = {
  onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <div>
      <Form
        onSubmit={(values) => {
          console.log('click submit');
        }}
        schema={registerInputSchema}
        options={{
          shouldUnregister: true,
        }}
      >
        {({ register, formState }) => (
          <>
            <Input
              type="text"
              label="First Name"
              error={formState.errors['firstName']}
              registration={register('firstName')}
            />
            <Input
              type="text"
              label="Last Name"
              error={formState.errors['lastName']}
              registration={register('lastName')}
            />
            <Input
              type="email"
              label="Email Address"
              error={formState.errors['email']}
              registration={register('email')}
            />
            <Input
              type="password"
              label="Password"
              error={formState.errors['password']}
              registration={register('password')}
            />

            <div>
              <Button isLoading={false} type="submit" className="w-full">
                Register
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="mt-4 flex items-center justify-end">
        <div className="text-sm">
          <Link
            to={`/auth/login${
              redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''
            }`}
            className="font-medium text-theme-500 hover:text-theme-500"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};
