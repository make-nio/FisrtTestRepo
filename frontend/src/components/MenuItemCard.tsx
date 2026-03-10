import { MenuItem } from '@/lib/types';

export default function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <div className="flex justify-between items-start py-4 border-b border-stone-200 last:border-0">
      <div className="flex-1 pr-4">
        <h3 className="font-semibold text-stone-800 text-base">{item.name}</h3>
        {item.description && (
          <p className="text-sm text-stone-500 mt-0.5 italic">{item.description}</p>
        )}
        {!item.available && (
          <span className="text-xs text-red-400 mt-1 inline-block">No disponible</span>
        )}
      </div>
      <span className="font-semibold text-stone-700 whitespace-nowrap text-base">
        ${Number(item.price).toFixed(2)}
      </span>
    </div>
  );
}
