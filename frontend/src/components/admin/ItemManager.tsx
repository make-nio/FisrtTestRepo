'use client';
import { useEffect, useState } from 'react';
import { Category, MenuItem } from '@/lib/types';
import { fetchCategories, fetchItems, createItem, updateItem, deleteItem } from '@/lib/adminApi';
import Modal from './Modal';

interface FormData {
  name: string; description: string; price: string; categoryId: string; available: boolean;
}
const emptyForm: FormData = { name: '', description: '', price: '', categoryId: '', available: true };

export default function ItemManager() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<'create' | 'edit' | null>(null);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function load() {
    setLoading(true);
    const [i, c] = await Promise.all([fetchItems(), fetchCategories()]);
    setItems(i);
    setCategories(c);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openCreate() {
    setForm({ ...emptyForm, categoryId: categories[0]?.id.toString() ?? '' });
    setModal('create'); setError('');
  }

  function openEdit(item: MenuItem) {
    setEditing(item);
    setForm({
      name: item.name,
      description: item.description ?? '',
      price: Number(item.price).toString(),
      categoryId: item.categoryId.toString(),
      available: item.available,
    });
    setModal('edit'); setError('');
  }

  function closeModal() { setModal(null); setEditing(null); }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        description: form.description || undefined,
        price: parseFloat(form.price),
        categoryId: parseInt(form.categoryId),
        available: form.available,
      };
      if (modal === 'create') {
        await createItem(payload);
      } else if (editing) {
        await updateItem(editing.id, payload);
      }
      await load(); closeModal();
    } catch (err: any) { setError(err.message); }
    finally { setSaving(false); }
  }

  async function handleDelete(item: MenuItem) {
    if (!confirm(`¿Eliminar "${item.name}"?`)) return;
    try { await deleteItem(item.id); await load(); }
    catch (err: any) { alert(err.message); }
  }

  async function toggleAvailable(item: MenuItem) {
    try { await updateItem(item.id, { available: !item.available }); await load(); }
    catch (err: any) { alert(err.message); }
  }

  const categoryName = (id: number) => categories.find(c => c.id === id)?.name ?? '—';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-stone-800">Items del menú</h2>
        <button onClick={openCreate} className="bg-stone-800 text-white text-sm px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors">
          + Nuevo item
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
                <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">Categoría</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">Precio</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-stone-500 uppercase tracking-wider">Disponible</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="border-b border-stone-50 hover:bg-stone-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-stone-800">{item.name}</div>
                    {item.description && <div className="text-xs text-stone-400 italic">{item.description}</div>}
                  </td>
                  <td className="px-5 py-3.5 text-stone-500">{categoryName(item.categoryId)}</td>
                  <td className="px-5 py-3.5 font-semibold text-stone-700">${Number(item.price).toFixed(2)}</td>
                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => toggleAvailable(item)}
                      className={`text-xs px-3 py-1 rounded-full font-semibold transition-colors ${
                        item.available
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-red-100 text-red-600 hover:bg-red-200'
                      }`}
                    >
                      {item.available ? 'Sí' : 'No'}
                    </button>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => openEdit(item)} className="text-xs px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-md transition-colors">
                        Editar
                      </button>
                      <button onClick={() => handleDelete(item)} className="text-xs px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-md transition-colors">
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && (
            <p className="text-center text-stone-400 py-10 text-sm italic">Sin items</p>
          )}
        </div>
      )}

      {modal && (
        <Modal title={modal === 'create' ? 'Nuevo item' : 'Editar item'} onClose={closeModal}>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-widest mb-1.5">Nombre *</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                required autoFocus />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-500 uppercase tracking-widest mb-1.5">Descripción</label>
              <input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-500 uppercase tracking-widest mb-1.5">Precio *</label>
                <input type="number" step="0.01" min="0" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                  className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                  required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-500 uppercase tracking-widest mb-1.5">Categoría *</label>
                <select value={form.categoryId} onChange={e => setForm(f => ({ ...f, categoryId: e.target.value }))}
                  className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                  required>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="available" checked={form.available}
                onChange={e => setForm(f => ({ ...f, available: e.target.checked }))}
                className="w-4 h-4 rounded" />
              <label htmlFor="available" className="text-sm text-stone-700">Disponible</label>
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
