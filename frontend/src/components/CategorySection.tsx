import { Category } from '@/lib/types';
import MenuItemCard from './MenuItemCard';

export default function CategorySection({ category }: { category: Category }) {
  const availableItems = category.menuItems.filter((i) => i.available);
  const unavailableItems = category.menuItems.filter((i) => !i.available);
  const items = [...availableItems, ...unavailableItems];

  return (
    <section className="mb-12">
      <div className="mb-4">
        <h2 className="text-2xl font-bold tracking-wide uppercase text-stone-700 border-b-2 border-stone-300 pb-2">
          {category.name}
        </h2>
        {category.description && (
          <p className="text-sm text-stone-400 italic mt-1">{category.description}</p>
        )}
      </div>
      {items.length === 0 ? (
        <p className="text-stone-400 italic text-sm">Sin items en esta categoría.</p>
      ) : (
        <div>
          {items.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
