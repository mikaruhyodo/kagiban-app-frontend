import { useState } from 'react';
import { Users, UserPlus, Pencil, Trash2, X, Check, AlertTriangle } from 'lucide-react';
import { mockUsers } from '../data/mock-data';
import type { User } from '../types';

const BRANCHES = ['渋谷店', '新宿店', '目黒店', '品川店', '池袋店'];
const ROLES = ['営業', '管理者'] as const;

const inputClass =
  'w-full border border-[#d1d6db] rounded-[6px] h-10 px-3 text-[13px] text-[#121726] focus:outline-none focus:border-[#2663eb] bg-white';

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <div className="flex items-center gap-1 text-[13px] font-medium text-[#38404f]">
      {children}
      {required && <span className="text-[#f04545]">*</span>}
    </div>
  );
}

// ── 編集モーダル ──────────────────────────────────────────
function EditModal({ user, onClose }: { user: User; onClose: () => void }) {
  const [form, setForm] = useState({
    employeeCode: user.employeeCode,
    name: user.name,
    email: user.email,
    phone: user.phone,
    branch: user.branch,
    role: user.role,
  });

  const update = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="fixed inset-0 bg-[rgba(18,23,38,0.5)] flex items-center justify-center z-50">
      <div className="bg-white rounded-[12px] shadow-[0px_10px_30px_0px_rgba(0,0,0,0.2)] w-[640px] flex flex-col overflow-hidden">

        {/* ヘッダー */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-[#e5e8eb]">
          <div className="flex items-center justify-center size-10 rounded-full bg-[#f0f5ff] shrink-0">
            <UserPlus size={20} className="text-[#2663eb]" />
          </div>
          <p className="font-semibold text-[#121726] text-[18px] flex-1">ユーザー情報編集</p>
          <button
            onClick={onClose}
            className="flex items-center justify-center size-8 rounded-[6px] hover:bg-[#f2f5f5] transition-colors"
          >
            <X size={18} className="text-[#6b7380]" />
          </button>
        </div>

        {/* ボディ */}
        <div className="flex flex-col gap-4 px-6 py-5">
          <div className="flex flex-col gap-3">
            {/* 社員コード / 氏名 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label required>社員コード</Label>
                <input
                  value={form.employeeCode}
                  onChange={(e) => update('employeeCode', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label required>氏名</Label>
                <input
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {/* メールアドレス / 電話番号 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label required>メールアドレス</Label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>電話番号</Label>
                <input
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {/* 所属店舗 / 権限 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label>所属店舗</Label>
                <div className="relative">
                  <select
                    value={form.branch}
                    onChange={(e) => update('branch', e.target.value)}
                    className="appearance-none w-full border border-[#d1d6db] rounded-[6px] h-10 px-3 pr-8 text-[13px] text-[#121726] focus:outline-none focus:border-[#2663eb] cursor-pointer bg-white"
                  >
                    {BRANCHES.map((b) => <option key={b}>{b}</option>)}
                  </select>
                  <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7380" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>権限</Label>
                <div className="relative">
                  <select
                    value={form.role}
                    onChange={(e) => update('role', e.target.value)}
                    className="appearance-none w-full border border-[#d1d6db] rounded-[6px] h-10 px-3 pr-8 text-[13px] text-[#121726] focus:outline-none focus:border-[#2663eb] cursor-pointer bg-white"
                  >
                    {ROLES.map((r) => <option key={r}>{r}</option>)}
                  </select>
                  <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7380" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>
          </div>

          {/* 権限について */}
          <div className="bg-[#f0f5ff] border border-[#dbe8ff] rounded-[6px] p-3 flex flex-col gap-1.5 text-[#1c4fd9]">
            <p className="font-semibold text-[12px]">権限について</p>
            <p className="text-[11px]">• 営業：鍵の予約、利用、返却操作が可能</p>
            <p className="text-[11px]">• 管理者：全ての操作と、ステータス手動是正が可能</p>
          </div>
        </div>

        {/* フッター */}
        <div className="flex items-center justify-end gap-3 px-6 py-5 border-t border-[#e5e8eb]">
          <button
            onClick={onClose}
            className="w-[100px] h-10 border border-[#d1d6db] rounded-[6px] text-[14px] font-medium text-[#38404f] hover:bg-[#f2f5f5] transition-colors"
          >
            キャンセル
          </button>
          <button
            onClick={onClose}
            className="w-[100px] h-10 flex items-center justify-center gap-2 bg-[#2663eb] rounded-[6px] text-[14px] font-medium text-white hover:bg-[#1d54d4] transition-colors"
          >
            <Check size={16} />
            更新
          </button>
        </div>

      </div>
    </div>
  );
}

// ── 削除確認モーダル ──────────────────────────────────────
function DeleteModal({ user, onClose }: { user: User; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-[rgba(18,23,38,0.5)] flex items-center justify-center z-50">
      <div className="bg-white rounded-[12px] shadow-[0px_10px_30px_0px_rgba(0,0,0,0.2)] w-[480px] flex flex-col overflow-hidden">

        {/* ヘッダー */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-[#e5e8eb]">
          <div className="flex items-center justify-center size-10 rounded-full bg-[#fff2f2] shrink-0">
            <AlertTriangle size={20} className="text-[#db2626]" />
          </div>
          <p className="font-semibold text-[#121726] text-[18px] flex-1">ユーザーを削除</p>
          <button
            onClick={onClose}
            className="flex items-center justify-center size-8 rounded-[6px] hover:bg-[#f2f5f5] transition-colors"
          >
            <X size={18} className="text-[#6b7380]" />
          </button>
        </div>

        {/* ボディ */}
        <div className="flex flex-col gap-4 px-6 py-5">
          <p className="text-[#38404f] text-[14px]">以下のユーザーを削除します。この操作は取り消せません。</p>

          {/* ユーザー情報 */}
          <div className="bg-[#fff2f2] border border-[#f7cccc] rounded-[8px] p-4 flex flex-col gap-2 text-[13px]">
            <div className="flex gap-3">
              <span className="text-[#4a5463]">社員コード:</span>
              <span className="font-semibold text-[#121726]">{user.employeeCode}</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[#4a5463]">氏名:</span>
              <span className="font-semibold text-[#121726]">{user.name}</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[#4a5463]">所属:</span>
              <span className="text-[#121726]">{user.branch} / {user.role}</span>
            </div>
          </div>

          {/* 注意 */}
          <div className="bg-[#fffaeb] border border-[#fae58c] rounded-[6px] p-3 flex gap-2.5 items-start">
            <AlertTriangle size={16} className="text-[#cc910a] shrink-0 mt-px" />
            <div className="flex flex-col gap-0.5 text-[#cc910a]">
              <p className="font-semibold text-[12px]">注意</p>
              <p className="text-[11px]">削除後はユーザーの利用履歴は保持されますが、ログインはできなくなります。</p>
            </div>
          </div>
        </div>

        {/* フッター */}
        <div className="flex items-center justify-end gap-3 px-6 py-5 border-t border-[#e5e8eb]">
          <button
            onClick={onClose}
            className="w-[100px] h-10 border border-[#d1d6db] rounded-[6px] text-[14px] font-medium text-[#38404f] hover:bg-[#f2f5f5] transition-colors"
          >
            キャンセル
          </button>
          <button
            onClick={onClose}
            className="w-[100px] h-10 flex items-center justify-center gap-2 bg-[#db2626] rounded-[6px] text-[14px] font-medium text-white hover:bg-[#c01f1f] transition-colors"
          >
            <Trash2 size={16} />
            削除する
          </button>
        </div>

      </div>
    </div>
  );
}

// ── メイン ────────────────────────────────────────────────
export default function UserManagement() {
  const [query, setQuery] = useState('');
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  const filtered = mockUsers.filter((u) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      u.name.includes(q) ||
      u.employeeCode.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.branch.includes(q)
    );
  });

  return (
    <div className="bg-[#fafafc] p-5 flex flex-col gap-4 min-h-full">

      {/* タイトル */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Users size={22} className="text-[#17171c]" />
          <h1 className="font-bold text-[#17171c] text-[22px]">ユーザー管理</h1>
        </div>
        <p className="text-[#6b7380] text-[13px]">営業担当者と管理者のアカウントを管理します</p>
      </div>

      {/* 検索 + 新規登録 */}
      <div className="bg-white border border-[#e5e8ed] rounded-[10px] p-4">
        <div className="flex gap-4 items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="氏名、社員コード、メールアドレス、店舗で検索"
            className="flex-1 border border-[#e5e8ed] rounded-[8px] px-3 py-[10px] text-[13px] text-[#17171c] placeholder:text-[#8c949e] focus:outline-none focus:border-[#2663eb] bg-white"
          />
          <button className="flex items-center gap-1.5 bg-[#2663eb] text-white text-[12px] font-medium px-[14px] py-[8px] rounded-[8px] hover:bg-[#1d54d4] transition-colors shrink-0">
            <UserPlus size={14} />
            新規ユーザー登録
          </button>
        </div>
      </div>

      {/* テーブル */}
      <div className="bg-white border border-[#e5e8ed] rounded-[10px] overflow-hidden">
        {/* ヘッダー */}
        <div className="bg-[#f5f7fa] border-b border-[#e5e8ed] flex items-center px-4 py-3">
          <div className="w-[120px] shrink-0">
            <span className="font-semibold text-[#6b7380] text-[12px]">社員コード</span>
          </div>
          <div className="w-[140px] shrink-0">
            <span className="font-semibold text-[#6b7380] text-[12px]">氏名</span>
          </div>
          <div className="w-[220px] shrink-0">
            <span className="font-semibold text-[#6b7380] text-[12px]">メールアドレス</span>
          </div>
          <div className="w-[150px] shrink-0">
            <span className="font-semibold text-[#6b7380] text-[12px]">電話番号</span>
          </div>
          <div className="w-[120px] shrink-0">
            <span className="font-semibold text-[#6b7380] text-[12px]">所属店舗</span>
          </div>
          <div className="w-[100px] shrink-0">
            <span className="font-semibold text-[#6b7380] text-[12px]">権限</span>
          </div>
          <div className="flex-1 flex justify-end">
            <span className="font-semibold text-[#6b7380] text-[12px]">アクション</span>
          </div>
        </div>

        {/* 行 */}
        {filtered.map((user) => (
          <div
            key={user.id}
            className="bg-white border-b border-[#e5e8ed] flex items-center px-4 py-[9px] hover:bg-[#fafafc] transition-colors"
          >
            <div className="w-[120px] shrink-0">
              <span className="font-bold text-[#17171c] text-[13px]">{user.employeeCode}</span>
            </div>
            <div className="w-[140px] shrink-0">
              <span className="text-[#17171c] text-[13px]">{user.name}</span>
            </div>
            <div className="w-[220px] shrink-0">
              <span className="text-[#6b7380] text-[12px]">{user.email}</span>
            </div>
            <div className="w-[150px] shrink-0">
              <span className="text-[#6b7380] text-[12px]">{user.phone}</span>
            </div>
            <div className="w-[120px] shrink-0">
              <span className="text-[#17171c] text-[13px]">{user.branch}</span>
            </div>
            <div className="w-[100px] shrink-0">
              {user.role === '管理者' ? (
                <span className="inline-flex items-center bg-[#2663eb] text-white text-[11px] font-medium px-[10px] py-1 rounded-[6px]">
                  管理者
                </span>
              ) : (
                <span className="inline-flex items-center bg-[#f2f2f7] text-[#17171c] text-[11px] font-medium px-[10px] py-1 rounded-[6px]">
                  営業
                </span>
              )}
            </div>
            <div className="flex-1 flex items-center justify-end gap-2">
              <button
                onClick={() => setEditUser(user)}
                className="border border-[#e5e8ed] flex items-center justify-center p-[8px] rounded-[8px] hover:bg-[#f2f5f5] transition-colors"
              >
                <Pencil size={14} className="text-[#17171c]" />
              </button>
              <button
                onClick={() => setDeleteUser(user)}
                className="border border-[#e5e8ed] flex items-center justify-center p-[8px] rounded-[8px] hover:bg-[#fff0f0] transition-colors"
              >
                <Trash2 size={14} className="text-[#db2626]" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[#6b7380] text-[13px]">{mockUsers.length} 名のユーザーが登録されています</p>

      {/* 編集モーダル */}
      {editUser && <EditModal user={editUser} onClose={() => setEditUser(null)} />}

      {/* 削除確認モーダル */}
      {deleteUser && <DeleteModal user={deleteUser} onClose={() => setDeleteUser(null)} />}

    </div>
  );
}
