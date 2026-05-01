import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Search, ChevronDown } from 'lucide-react';
import { mockKeys } from '../../data/mock-data';
import StatusBadge from '../../components/StatusBadge';
import ReservationStepper from './ReservationStepper';

const availableKeys = mockKeys.filter((k) => k.status === '貸出可' || k.status === '予約確定');

export default function Step1KeySelect() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [branchFilter, setBranchFilter] = useState('すべて');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const branches = ['すべて', ...Array.from(new Set(availableKeys.map((k) => k.storeBranch)))];

  const filtered = availableKeys.filter((k) => {
    const matchQuery = query === '' || k.id.includes(query) || k.buildingName.includes(query) || k.roomNumber.includes(query);
    const matchBranch = branchFilter === 'すべて' || k.storeBranch === branchFilter;
    return matchQuery && matchBranch;
  });

  const toggleKey = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="p-5 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Calendar size={32} className="text-[#2663eb]" />
        <h1 className="text-[22px] font-bold text-[#17171c]">鍵予約</h1>
      </div>

      <ReservationStepper currentStep={1} />

      <div className="bg-white border border-[#e5e8ed] rounded-xl p-5 flex flex-col gap-4">
        <h2 className="text-[16px] font-semibold text-[#17171c]">貸し出す鍵を選択</h2>

        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8c949e]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="鍵番号・建物名で検索"
              className="w-full pl-9 pr-3 py-2.5 border border-[#d1d6db] rounded-lg text-[13px] text-[#17171c] placeholder:text-[#8c949e] focus:outline-none focus:border-[#2663eb]"
            />
          </div>
          <div className="relative">
            <select value={branchFilter} onChange={(e) => setBranchFilter(e.target.value)}
              className="appearance-none bg-white border border-[#d1d6db] rounded-lg pl-3 pr-8 py-2.5 text-[13px] text-[#17171c] focus:outline-none focus:border-[#2663eb] cursor-pointer">
              {branches.map((b) => <option key={b}>{b}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6b7380] pointer-events-none" />
          </div>
        </div>

        <div className="border border-[#e5e8ed] rounded-lg overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[#fafafa] border-b border-[#e5e8ed]">
                <th className="px-4 py-3 w-10"></th>
                <th className="text-left px-4 py-3 text-[#4d5466] font-medium w-[120px]">鍵番号</th>
                <th className="text-left px-4 py-3 text-[#4d5466] font-medium">建物名</th>
                <th className="text-left px-4 py-3 text-[#4d5466] font-medium w-[100px]">部屋番号</th>
                <th className="text-left px-4 py-3 text-[#4d5466] font-medium w-[130px]">ステータス</th>
                <th className="text-left px-4 py-3 text-[#4d5466] font-medium w-[100px]">保管店舗</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((key) => (
                <tr key={key.id} className={`border-b border-[#f2f5f5] hover:bg-[#fafafa] cursor-pointer ${selectedIds.has(key.id) ? 'bg-[#f0f5ff]' : ''}`}
                  onClick={() => toggleKey(key.id)}>
                  <td className="px-4 py-3 text-center">
                    <input type="checkbox" checked={selectedIds.has(key.id)} onChange={() => toggleKey(key.id)}
                      className="accent-[#2663eb] size-4 cursor-pointer" onClick={(e) => e.stopPropagation()} />
                  </td>
                  <td className="px-4 py-3 font-semibold text-[#17171c]">{key.id}</td>
                  <td className="px-4 py-3 text-[#38404f]">{key.buildingName}</td>
                  <td className="px-4 py-3 text-[#38404f]">{key.roomNumber}</td>
                  <td className="px-4 py-3"><StatusBadge status={key.status} size="sm" /></td>
                  <td className="px-4 py-3 text-[#38404f]">{key.storeBranch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedIds.size > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-[13px] text-[#38404f]">
              <span className="font-semibold text-[#2663eb]">{selectedIds.size}件</span> 選択中
            </span>
            <button
              onClick={() => setSelectedIds(new Set())}
              className="text-[12px] font-medium text-[#6b7380] border border-[#d1d6db] px-3 py-1 rounded-[6px] hover:bg-[#f2f5f5] transition-colors"
            >
              クリア
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          disabled={selectedIds.size === 0}
          onClick={() => navigate('/reservation/step2', { state: { selectedIds: Array.from(selectedIds) } })}
          className="bg-[#2663eb] text-white px-6 py-2.5 rounded-lg text-[14px] font-medium hover:bg-[#1d54d4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          次へ: 貸出情報を入力
        </button>
      </div>
    </div>
  );
}
