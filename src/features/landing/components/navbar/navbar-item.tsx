import React from 'react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/utils/cn';

import { Navigation } from '../../constants';

interface NavbarItemProps {
  item: Navigation;
  handleOpen: () => void;
  isOpen: boolean;
}

const NavbarItem = ({ isOpen, item, handleOpen }: NavbarItemProps) => {
  return (
    <div className="flex">
      <div className="relative flex items-center">
        <a
          onClick={handleOpen}
          href={item.url}
          className={cn(
            'gap-1.5',
            buttonVariants({
              variant: isOpen ? 'secondary' : 'ghost',
            }),
          )}
        >
          {item.title}
        </a>
      </div>
    </div>
  );
};

export default NavbarItem;
