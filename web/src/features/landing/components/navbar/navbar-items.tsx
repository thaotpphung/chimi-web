import { useEffect, useRef, useState } from 'react';

import { NAVIGATIONS, Navigation } from '../../constants';

import NavbarItem from './navbar-item';

import { useOnClickOutside } from '@/hooks/use-on-click-outside';

const NavbarItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(navRef, () => setActiveIndex(null));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveIndex(null);
      }
    };

    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, []);

  return (
    <div className="flex h-full gap-4" ref={navRef}>
      {NAVIGATIONS.map((nav: Navigation, i: number) => {
        const handleOpen = () => {
          if (activeIndex === i) {
            setActiveIndex(null);
          } else {
            setActiveIndex(i);
          }
        };
        const isOpen = i === activeIndex;
        return (
          <NavbarItem
            key={nav.id}
            item={nav}
            handleOpen={handleOpen}
            isOpen={isOpen}
          />
        );
      })}
    </div>
  );
};

export default NavbarItems;
