import { useState, useEffect, useCallback } from "react";
import { useToast } from "../context/ToastContext";
import api from "../utils/api";

function DeleteConfirm({ open, onClose, onConfirm, name }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content p-6 max-w-sm text-center" onClick={(e) => e.stopPropagation()}>
        <div className="text-5xl mb-4">⚠️</div>
        <h3 className="font-heading text-xl text-gradient-steel mb-2">DELETE USER?</h3>
        <p className="text-steel text-sm font-body mb-6">"{name}" will be permanently removed.</p>
        <div className="flex gap-3">
          <button onClick={onConfirm} className="btn-danger flex-1 py-3 text-sm font-medium">Delete</button>
          <button onClick={onClose} className="btn-ghost flex-1 py-3 text-sm">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default function Users() {
  const toast = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/api/users?page=${page}&limit=10&search=${search}`);
      setUsers(data.users || []);
      setTotalPages(data.total || 1);
    } catch { toast.error("Failed to load users."); }
    finally { setLoading(false); }
  }, [page, search]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const toggleRole = async (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    try {
      await api.patch(`/api/users/${user._id}`, { role: newRole });
      toast.success(`${user.name}'s role updated to ${newRole}`);
      fetchUsers();
    } catch { toast.error("Failed to update role."); }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/users/${deleteTarget._id}`);
      toast.success("User deleted.");
      setDeleteTarget(null); fetchUsers();
    } catch { toast.error("Delete failed."); }
  };

  const fmtDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "2-digit" });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-4xl text-gradient-steel mb-1">USERS</h1>
        <p className="text-steel text-xs font-body">Manage registered accounts</p>
      </div>

      <div className="relative max-w-sm">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-steel" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search by name or email…" className="metal-input pl-9 pr-4 py-2.5 text-sm w-full" />
      </div>

      <div className="metal-card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-steel border-t-copper rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="metal-table">
              <thead><tr>
                <th>User</th><th>Email</th><th>Role</th><th>Joined</th><th>Actions</th>
              </tr></thead>
              <tbody>
                {users.length === 0 && (
                  <tr><td colSpan={5} className="text-center py-12 text-steel">No users found</td></tr>
                )}
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 text-obsidian"
                          style={{ background: "linear-gradient(135deg, #B87333, #D4AF37)" }}>
                          {(u.name || u.email || "?")[0].toUpperCase()}
                        </div>
                        <span className="font-medium text-sm max-w-[120px] truncate">{u.name}</span>
                      </div>
                    </td>
                    <td className="text-xs text-steel truncate max-w-[160px]">{u.email}</td>
                    <td>
                      <button onClick={() => toggleRole(u)}
                        className={`badge cursor-pointer hover:opacity-80 transition-opacity ${u.role === "admin" ? "badge-admin" : "badge-user"}`}>
                        {u.role}
                      </button>
                    </td>
                    <td className="text-xs text-steel">{fmtDate(u.createdAt)}</td>
                    <td>
                      <button onClick={() => setDeleteTarget(u)} className="btn-danger px-3 py-1.5 text-xs">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="btn-ghost px-4 py-2 text-sm" style={{ opacity: page === 1 ? 0.4 : 1 }}>← Prev</button>
          <span className="text-steel font-body text-sm">Page {page} / {totalPages}</span>
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="btn-ghost px-4 py-2 text-sm" style={{ opacity: page === totalPages ? 0.4 : 1 }}>Next →</button>
        </div>
      )}

      <DeleteConfirm open={!!deleteTarget} onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete} name={deleteTarget?.name} />
    </div>
  );
}