import { getCategories } from '@/lib/api';
import CategorySection from '@/components/CategorySection';

export default async function HomePage() {
  let categories;
  let error: string | null = null;

  try {
    categories = await getCategories();
  } catch {
    error = 'No se pudo conectar con la API. Asegurate de que el backend esté corriendo en http://localhost:3000.';
  }

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-stone-800 text-stone-100 py-12 text-center">
        <p className="text-sm uppercase tracking-widest text-stone-400 mb-2">Bienvenidos a</p>
        <h1 className="text-5xl font-bold tracking-wide">La Pizzería</h1>
        <p className="text-stone-400 mt-3 italic text-lg">Nuestra carta</p>
        <div className="mt-4 flex justify-center gap-2">
          <span className="block w-12 h-px bg-stone-500" />
          <span className="text-stone-500">✦</span>
          <span className="block w-12 h-px bg-stone-500" />
        </div>
      </header>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        {error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-6 text-center text-sm">
            {error}
          </div>
        ) : !categories || categories.length === 0 ? (
          <p className="text-center text-stone-400 italic">No hay categorías disponibles.</p>
        ) : (
          categories.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))
        )}
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-stone-400 text-xs tracking-widest uppercase border-t border-stone-200">
        La Pizzería — Desde 2024
      </footer>
    </main>
  );
}
