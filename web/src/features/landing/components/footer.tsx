import { HeartIcon } from 'lucide-react';

import { Link } from '@/components/ui/link';

const Footer = () => {
  return (
    <footer className="bg-muted py-8 md:py-12">
      <div className="max-container container grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
        <div className="flex flex-col items-start gap-4">
          <Link to="/" className="flex items-center gap-2">
            <HeartIcon className="text-primary size-6" />
            <span className="text-xl font-bold">KocoKeeper</span>
          </Link>
          <p className="text-muted-foreground max-w-[300px]">
            Manage your family&apos;s health, tasks, schedules, shopping, meals,
            and recipes all in one app.
          </p>
        </div>
        <div className="grid gap-2">
          <h4 className="text-foreground text-sm font-semibold">Quick Links</h4>
          <Link to="/" className="text-sm hover:underline">
            About
          </Link>
          <Link to="/" className="text-sm hover:underline">
            Privacy Policy
          </Link>
          <Link to="/" className="text-sm hover:underline">
            Contact Us
          </Link>
        </div>
        <div className="grid gap-2">
          <h4 className="text-foreground text-sm font-semibold">Resources</h4>
          <Link to="/" className="text-sm hover:underline">
            Articles
          </Link>
          <Link to="/" className="text-sm hover:underline">
            Guides
          </Link>
          <Link to="/" className="text-sm hover:underline">
            FAQs
          </Link>
        </div>
      </div>
      <div className="container mt-8 flex max-w-7xl items-center justify-between">
        <p className="text-muted-foreground text-xs">
          &copy; 2024 KocoKeeper. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xs hover:underline">
            Terms of Service
          </Link>
          <Link to="/" className="text-xs hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
