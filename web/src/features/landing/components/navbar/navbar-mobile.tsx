'use client';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { NAVIGATIONS } from '../../constants';

import { Link } from '@/components/ui/link';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const location = useLocation();
  const pathname = location.pathname;

  // whenever we click an item in the menu and navigate away, we want to close the menu
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // when we click the path we are currently on, we still want the mobile menu to close,
  // however we cant rely on the pathname for it because that won't change (we're already there)
  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      setIsOpen(false);
    }
  };

  // remove second scrollbar when mobile menu is open
  useEffect(() => {
    if (isOpen) document.body.classList.add('overflow-hidden');
    else document.body.classList.remove('overflow-hidden');
  }, [isOpen]);

  if (!isOpen)
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 lg:hidden"
      >
        <Menu className="size-6" aria-hidden="true" />
      </button>
    );

  return (
    <div>
      <div className="relative z-40 lg:hidden">
        <div className="fixed inset-0 bg-black" />
      </div>
      <div className="fixed inset-0 z-40 flex overflow-y-scroll overscroll-y-none">
        <div className="w-4/5">
          <div className="relative flex w-full max-w-sm flex-col overflow-y-auto bg-white pb-12 shadow-xl">
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <X className="size-6" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-2">
              <ul>
                {NAVIGATIONS.map((item) => (
                  <li key={item.title} className="space-y-10 px-4 pb-8 pt-10">
                    <div className="border-b border-gray-200">
                      <div className="-mb-px flex">
                        <p className="flex-1 whitespace-nowrap border-b-2 border-transparent py-4 text-base font-medium text-gray-900">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <Link
                  onClick={() => closeOnCurrent('/auth/login')}
                  to="/auth/login"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Sign in
                </Link>
              </div>
              <div className="flow-root">
                <Link
                  onClick={() => closeOnCurrent('//auth/register')}
                  to="//auth/register"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
