import { Item } from 'database';
import { FC } from 'react';

import MenuCard from './MenuCard';

type MenuProps = {
  menu: Item[];
};

const Menu: FC<MenuProps> = ({ menu }) => {
  return (
    <main className="mt-5 bg-white">
      <div>
        <div className="mt-4 mb-1 pb-1">
          <h1 className="text-4xl font-bold">Menu</h1>
        </div>
        {menu.length ? (
          <div className="flex flex-wrap justify-between">
            {menu.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-between">
            <p>This Restaurant does not have a menu</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Menu;
