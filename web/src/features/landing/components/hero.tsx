import { Button, buttonVariants } from '@/components/ui/button';
import { Link } from '@/components/ui/link';

const Hero = () => {
  return (
    <section id="overview" className="max-container ">
      <div className="mx-auto flex max-w-3xl flex-col items-center py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-5xl">
          Family Planning Made Easy with
          <span className="text-primary"> KocoKeeper</span>
        </h1>
        <p className="text-muted-foreground mt-6 max-w-prose text-lg">
          Welcome to Chimi. One-stop shop for all your family needs.
        </p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <Link to={'/auth/register'} className={buttonVariants()}>
            Join Now
          </Link>
          <Button variant="ghost"> Contact Sales &rarr;</Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
