import { Head } from '@/components/seo';
import Landing from '@/features/landing/components/root';

export const LandingRoute = () => {
  return (
    <>
      <Head description="Welcome to KocoKeeper" />
      <Landing />
    </>
  );
};
