import React, { useState } from 'react';
import { MdMoreHoriz } from 'react-icons/md';

const DropdownMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const handleCloseMenu = () => setIsOpen(false);

  return (
    <div className="relative inline-block text-left">
      <button
        id="dropdownNavbarLink"
        onClick={toggleMenu}
        className="hover:opacity-80 active:opacity-70"
      >
        <MdMoreHoriz className="text-2xl leading-[0px]" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 w-32 bg-gray-800 rounded-[4px] shadow-lg z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="dropdownNavbarLink"
        >
          <button
            onClick={() => {
              handleCloseMenu();
            }}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-600"
            role="menuitem"
          >
            View
          </button>
          <button
            onClick={() => {
              handleCloseMenu();
            }}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-600"
            role="menuitem"
          >
            Edit
          </button>
          <button
            onClick={() => {
              handleCloseMenu();
            }}
            className="block w-full text-left px-4 py-2 text-sm text-red-600   hover:bg-gray-600"
            role="menuitem"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
