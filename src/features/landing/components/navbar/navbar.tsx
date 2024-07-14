import { Link } from 'react-router-dom';

import kocokeeper from '@/assets/kocokeeper.png';

import { buttonVariants } from '../../../../components/ui/button';

import NavbarItems from './navbar-items';
import MobileNav from './navbar-mobile';

const Navbar = () => {
  const data = null;
  return (
    <div className="sticky inset-x-0 top-0 z-50 h-16 bg-card ">
      <header className="relative">
        <div className="max-container ">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <img
                    className="h-20 w-auto"
                    src={kocokeeper}
                    alt="Workflow"
                  />
                </Link>
              </div>

              <div className="z-50 hidden lg:ml-8 lg:block lg:self-stretch">
                <NavbarItems />
              </div>

              <div className="ml-auto flex items-center">
                <MobileNav />
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link
                    to={'/auth/login'}
                    className={buttonVariants({
                      variant: 'ghost',
                    })}
                  >
                    Sign In
                  </Link>
                  {data ? null : (
                    <span
                      className="h-6 w-px bg-gray-200"
                      aria-hidden="true"
                    ></span>
                  )}
                  {data ? null : (
                    <Link
                      to="/auth/register"
                      className={buttonVariants({
                        variant: 'ghost',
                      })}
                    >
                      Sign Up
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
