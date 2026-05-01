import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, ChevronDown } from 'lucide-react';
import { mockKeys } from '../data/mock-data';
import type { KeyStatus } from '../types';
import ReportOutputModal from '../components/ReportOutputModal';

type SortKey = '部屋番号順' | '鍵番号順' | '建物名順';

const SORT_OPTIONS: SortKey[] = ['部屋番号順', '鍵番号順', '建物名順'];

const STATUS_FILTERS: { value: KeyStatus; label: string; badge: string }[] = [
  { value: '貸出可',    label: '貸出可',    badge: 'border border-[#e5e8ed] text-[#17171c]' },
  { value: '利用中',    label: '利用中',    badge: 'bg-[#f0f5ff] text-[#2663eb]' },
  { value: '返却確認中', label: '返却確認中', badge: 'border border-[#e5e8ed] text-[#17171c]' },
  { value: '未返却',    label: '未返却',    badge: 'bg-[#fcf2f2] text-[#db2626]' },
];

const statusBadge: Record<KeyStatus, string> = {
  '貸出可':    'border border-[#e5e8ed] text-[#17171c]',
  '利用中':    'bg-[#f0f5ff] text-[#2663eb]',
  '予約確定':  'bg-[#f7f2ff] text-[#8c4ad9]',
  '未返却':    'bg-[#fcf2f2] text-[#db2626]',
  '返却確認中':'border border-[#e5e8ed] text-[#17171c]',
  '返却完了':  'border border-[#e5e8ed] text-[#17171c]',
  '管理中':    'border border-[#e5e8ed] text-[#17171c]',
  '予約不可':  'bg-[#fdf2f8] text-[#9d174d]',
};

function Checkbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <div
      onClick={onChange}
      className={`size-4 rounded-[4px] border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
        checked ? 'bg-[#2663eb] border-[#2663eb]' : 'bg-white border-[#d4d6db]'
      }`}
    >
      {checked && (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

export default function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [statusFilters, setStatusFilters] = useState<Set<KeyStatus>>(new Set());
  const [sortKey, setSortKey] = useState<SortKey>('部屋番号順');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showReportModal, setShowReportModal] = useState(false);

  const toggleStatus = (s: KeyStatus) =>
    setStatusFilters((prev) => {
      const next = new Set(prev);
      next.has(s) ? next.delete(s) : next.add(s);
      return next;
    });

  const filtered = mockKeys
    .filter((k) => {
      const matchQuery =
        activeQuery === '' ||
        k.id.includes(activeQuery) ||
        k.buildingName.includes(activeQuery) ||
        k.roomNumber.includes(activeQuery);
      const matchStatus = statusFilters.size === 0 || statusFilters.has(k.status);
      return matchQuery && matchStatus;
    })
    .sort((a, b) => {
      if (sortKey === '部屋番号順') return a.roomNumber.localeCompare(b.roomNumber);
      if (sortKey === '鍵番号順')  return a.id.localeCompare(b.id);
      return a.buildingName.localeCompare(b.buildingName);
    });

  const toggleKey = (id: string) =>
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const allChecked = filtered.length > 0 && filtered.every((k) => selectedIds.has(k.id));
  const toggleAll = () => {
    if (allChecked) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        filtered.forEach((k) => next.delete(k.id));
        return next;
      });
    } else {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        filtered.forEach((k) => next.add(k.id));
        return next;
      });
    }
  };

  return (
    <div className="bg-[#fafafc] flex flex-col min-h-full">
      {showReportModal && (
        <ReportOutputModal
          count={selectedIds.size > 0 ? selectedIds.size : filtered.length}
          onClose={() => setShowReportModal(false)}
        />
      )}
      <div className="p-5 flex flex-col gap-4 flex-1 pb-20">

        {/* タイトル */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <SearchIcon size={22} className="text-[#17171c]" />
            <h1 className="font-bold text-[#17171c] text-[22px]">検索</h1>
          </div>
          <p className="text-[#6b7380] text-[13px]">鍵番号、建物名、部屋番号で検索できます</p>
        </div>

        {/* 検索フィルターカード */}
        <div className="bg-white border border-[#e5e8ed] rounded-[10px] p-4 flex flex-col gap-3">

          {/* 検索バー */}
          <div className="flex gap-3">
            <div className="flex-1 flex items-center gap-2 border border-[#e5e8ed] rounded-[8px] px-3 py-[10px]">
              <SearchIcon size={16} className="text-[#8c949e] shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') setActiveQuery(query); }}
                placeholder="鍵番号、建物名、部屋番号を入力"
                className="flex-1 text-[13px] text-[#17171c] placeholder:text-[#8c949e] focus:outline-none bg-transparent"
              />
            </div>
            <button
              onClick={() => setActiveQuery(query)}
              className="flex items-center gap-1.5 bg-[#2663eb] text-white text-[12px] font-medium px-[14px] py-2 rounded-[8px] hover:bg-[#1d54d4] transition-colors shrink-0"
            >
              <SearchIcon size={14} />
              検索
            </button>
          </div>

          <div className="h-px bg-[#e5e8ed]" />

          {/* ステータスフィルター */}
          <div className="flex flex-col gap-2">
            <p className="text-[#17171c] text-[13px] font-medium">ステータス（複数選択可）</p>
            <div className="flex items-center gap-3 flex-wrap">
              {STATUS_FILTERS.map(({ value, label, badge }) => (
                <label key={value} className="flex items-center gap-1.5 cursor-pointer">
                  <Checkbox
                    checked={statusFilters.has(value)}
                    onChange={() => toggleStatus(value)}
                  />
                  <span className={`text-[11px] font-medium px-[10px] py-1 rounded-[6px] ${badge}`}>
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* 並び替え */}
          <div className="flex flex-col gap-2">
            <p className="text-[#17171c] text-[13px] font-medium">並び替え</p>
            <div className="relative w-[240px]">
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
                className="appearance-none w-full bg-white border border-[#e5e8ed] rounded-[8px] px-3 pr-8 py-[10px] text-[13px] text-[#17171c] focus:outline-none focus:border-[#2663eb] cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6b7380] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 結果テーブル */}
        <div className="bg-white border border-[#e5e8ed] rounded-[10px] overflow-hidden">

          {/* ヘッダー */}
          <div className="bg-[#f5f7fa] border-b border-[#e5e8ed] flex items-center px-4 py-3">
            <div className="w-[40px] shrink-0">
              <Checkbox checked={allChecked} onChange={toggleAll} />
            </div>
            <div className="w-[110px] shrink-0">
              <p className="text-[#6b7380] text-[12px] font-semibold">鍵番号</p>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#6b7380] text-[12px] font-semibold">建物名 / 部屋番号</p>
            </div>
            <div className="w-[130px] shrink-0">
              <p className="text-[#6b7380] text-[12px] font-semibold">保管店舗</p>
            </div>
            <div className="w-[130px] shrink-0">
              <p className="text-[#6b7380] text-[12px] font-semibold">ステータス</p>
            </div>
            <div className="w-[90px] shrink-0 flex justify-end">
              <p className="text-[#6b7380] text-[12px] font-semibold">アクション</p>
            </div>
          </div>

          {/* データ行 */}
          {filtered.length === 0 ? (
            <div className="px-4 py-12 text-center text-[#8c949e] text-[13px]">
              条件に一致する鍵が見つかりません
            </div>
          ) : (
            filtered.map((key) => (
              <div
                key={key.id}
                className="bg-white border-b border-[#e5e8ed] last:border-0 flex items-center px-4 py-[9px] hover:bg-[#fafafa] transition-colors"
              >
                <div className="w-[40px] shrink-0">
                  <Checkbox checked={selectedIds.has(key.id)} onChange={() => toggleKey(key.id)} />
                </div>
                <div className="w-[110px] shrink-0">
                  <p className="text-[#17171c] text-[13px] font-bold">{key.id}</p>
                </div>
                <div className="flex-1 min-w-0 flex flex-col gap-0.5 pr-3">
                  <p className="text-[#17171c] text-[13px] truncate">{key.buildingName}</p>
                  <p className="text-[#8c949e] text-[11px]">{key.roomNumber}号室</p>
                </div>
                <div className="w-[130px] shrink-0">
                  <p className="text-[#17171c] text-[13px]">{key.storeBranch}</p>
                </div>
                <div className="w-[130px] shrink-0">
                  <span className={`text-[11px] font-medium px-[10px] py-1 rounded-[6px] ${statusBadge[key.status]}`}>
                    {key.status}
                  </span>
                </div>
                <div className="w-[90px] shrink-0 flex justify-end">
                  <button
                    onClick={() => navigate(`/keys/detail/${key.id}`)}
                    className="bg-[#2663eb] text-white text-[12px] font-medium px-[14px] py-2 rounded-[8px] hover:bg-[#1d54d4] transition-colors"
                  >
                    詳細
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 件数テキスト */}
        <div className="flex items-center gap-2 text-[13px]">
          <span className="text-[#6b7380]">{filtered.length} 件の検索結果が見つかりました</span>
          {selectedIds.size > 0 && (
            <span className="font-bold text-[#17171c]">（{selectedIds.size}件選択中）</span>
          )}
        </div>

      </div>

      {/* 固定フッターバー（常時表示） */}
      <div className="sticky bottom-0 bg-white border border-[#e5e8ed] flex items-center justify-end gap-3 px-6 py-4">
        <button
          onClick={() => navigate('/keys/bulk-update', { state: { selectedIds: Array.from(selectedIds) } })}
          className="border border-[#e5e8ed] text-[#17171c] text-[12px] font-medium px-[14px] py-2 rounded-[8px] hover:bg-[#f2f5f5] transition-colors"
        >
          鍵情報更新
        </button>
        <button
          onClick={() => setShowReportModal(true)}
          className="bg-[#2663eb] text-white text-[12px] font-medium px-[14px] py-2 rounded-[8px] hover:bg-[#1d54d4] transition-colors"
        >
          帳票出力
        </button>
      </div>
    </div>
  );
}
