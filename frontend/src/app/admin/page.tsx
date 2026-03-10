'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, removeToken } from '@/lib/auth';
import CategoryManager from '@/components/admin/CategoryManager';
import ItemManager from '@/components/admin/ItemManager';

type Tab = 'categories' | 'items';

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('categories');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/login');
    } else {
      setReady(true);
    }
  }, [router]);

  function logout() {
    removeToken();
    router.push('/');
  }

  if (!ready) return null;

  return (
    <main className="min-h-screen bg-stone-100">
      {/* Header */}
      <header className="bg-stone-800 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold tracking-wide">La Pizzería</span>
          <span className="text-stone-400 text-sm">/ Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" className="text-stone-400 hover:text-white text-sm transition-colors">Ver carta</a>
          <button
            onClick={logout}
            className="bg-stone-700 hover:bg-stone-600 text-sm px-4 py-1.5 rounded-lg transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-stone-200 px-6">
        <div className="flex gap-1 max-w-5xl mx-auto">
          {(['categories', 'items'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-3.5 text-sm font-semibold border-b-2 transition-colors ${
                tab === t
                  ? 'border-stone-800 text-stone-800'
                  : 'border-transparent text-stone-400 hover:text-stone-600'
              }`}
            >
              {t === 'categories' ? 'Categorías' : 'Items del menú'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {tab === 'categories' ? <CategoryManager /> : <ItemManager />}
      </div>
    </main>
  );
}
