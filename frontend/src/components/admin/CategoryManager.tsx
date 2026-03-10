'use client';
import { useEffect, useState } from 'react';
import { Category } from '@/lib/types';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '@/lib/adminApi';
import Modal from './Modal';

interface FormData { name: string; description: string; }
const emptyForm: FormData = { name: '', description: '' };

export default function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<'create' | 'edit' | null>(null);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function load() {
    setLoading(true);
    setCategories(await fetchCategories());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openCreate() { setForm(emptyForm); setModal('create'); setError(''); }

  function openEdit(cat: Category) {
    setEditing(cat);
    setForm({ name: cat.name, description: cat.description ?? '' });
    setModal('edit');
    setError('');
  }

  function closeModal() { setModal(null); setEditing(null); }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (modal === 'create') {
        await createCategory({ name: form.name, description: form.description || undefined });
      } else if (editing) {
        await updateCategory(editing.id, { name: form.name, description: form.description || undefined });
      }
      await load();
      closeModal();
    } catch (err: any) { setError(err.message); }
    finally { setSaving(false); }
  }

  async function handleDelete(cat: Category) {
    if (!confirm(`¿Eliminar la categoría "${cat.name}"? También se eliminarán sus items.`)) return;
    try { await deleteCategory(cat.id); await load(); }
    catch (err: any) { alert(err.message); }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-stone-800">Categorías</h2>
        <button onClick={openCreate} className="bg-stone-800 text-white text-sm px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors">
          + Nueva categoría
        </button>
      </div>

      {loading ? (
        <p className="text-stone-400 text-sm">Cargando...</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-stone-100">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">Nombre</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">Descripción</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">Items</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {categories.map(cat => (
                <tr key={cat.id} className="border-b border-stone-50 hover:bg-stone-50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-stone-800">{cat.name}</td>
                  <td className="px-5 py-3.5 text-stone-500 italic">{cat.description ?? '—'}</td>
                  <td className="px-5 py-3.5 text-stone-500">{cat.menuItems.length}</td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => openEdit(cat)} className="text-xs px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-md transition-colors">
                        Editar
                      </button>
                      <button onClick={() => handleDelete(cat)} className="text-xs px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-md transition-colors">
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {categories.length === 0 && (
            <p className="text-center text-stone-400 py-10 text-sm italic">Sin categorías</p>
          )}
        </div>
      )}

      {modal && (
        <Modal title={modal === 'create' ? 'Nueva categoría' : 'Editar categoría'} onClose={closeModal}>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-widest mb-1.5">Nombre *</label>
              <input
                value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                required autoFocus
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-widest mb-1.5">Descripción</label>
              <input
                value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={closeModal} className="flex-1 border border-stone-200 text-stone-600 text-sm py-2.5 rounded-lg hover:bg-stone-50 transition-colors">
                Cancelar
              </button>
              <button type="submit" disabled={saving} className="flex-1 bg-stone-800 text-white text-sm py-2.5 rounded-lg hover:bg-stone-700 transition-colors disabled:opacity-50">
                {saving ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
