import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, PencilLine, Info, Check, ChevronDown } from 'lucide-react';
import { mockKeys } from '../data/mock-data';
import StatusBadge from '../components/StatusBadge';

const BRANCHES = ['渋谷店', '新宿店', '目黒店', '品川店', '池袋店'];

export default function KeyBulkUpdate() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedIds: string[] = location.state?.selectedIds ?? mockKeys.slice(0, 5).map((k) => k.id);
  const selectedKeys = mockKeys.filter((k) => selectedIds.includes(k.id));

  const [updateBranch, setUpdateBranch] = useState(true);
  const [branchValue, setBranchValue] = useState('渋谷店');
  const [updateMemo, setUpdateMemo] = useState(false);
  const [memoValue, setMemoValue] = useState('');

  const activeFields = [updateBranch, updateMemo].filter(Boolean).length;

  return (
    <div className="p-8 flex flex-col gap-5">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#4a5463] text-[13px] hover:text-[#2663eb] w-fit">
        <ArrowLeft size={16} />
        検索結果に戻る
      </button>

      <div className="flex items-center gap-3">
        <PencilLine size={28} className="text-[#2663eb]" />
        <h1 className="text-[28px] font-bold text-[#17171c]">鍵情報更新</h1>
      </div>
      <p className="text-[13px] text-[#4a5463] -mt-3">選択した鍵の情報をまとめて更新できます</p>

      <div className="bg-white border border-[#e5e8ed] rounded-xl p-6 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-[16px] font-semibold text-[#17171c]">選択された鍵</h2>
          <span className="bg-[#dbe8ff] text-[#1c4fd9] text-[12px] font-medium px-2.5 py-0.5 rounded-full">
            {selectedKeys.length}件
          </span>
        </div>

        <div className="border border-[#e5e8ed] rounded-lg overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[#fafafa] border-b border-[#e5e8ed]">
                <th className="text-left px-4 py-2.5 text-[#4a5463] font-medium w-[120px]">鍵番号</th>
                <th className="text-left px-4 py-2.5 text-[#4a5463] font-medium w-[220px]">建物名</th>
                <th className="text-left px-4 py-2.5 text-[#4a5463] font-medium w-[100px]">部屋番号</th>
                <th className="text-left px-4 py-2.5 text-[#4a5463] font-medium w-[140px]">現在ステータス</th>
                <th className="text-left px-4 py-2.5 text-[#4a5463] font-medium">現在の保管店舗</th>
              </tr>
            </thead>
            <tbody>
              {selectedKeys.map((key) => (
                <tr key={key.id} className="border-b border-[#f2f5f5] last:border-0">
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
      </div>

      <div className="bg-white border border-[#e5e8ed] rounded-xl p-6 flex flex-col gap-5">
        <div>
          <h2 className="text-[16px] font-semibold text-[#17171c]">更新する項目</h2>
          <p className="text-[12px] text-[#6b7380] mt-1">チェックを入れた項目のみが一括更新されます</p>
        </div>

        <div className="bg-[#f0f5ff] border border-[#dbe8ff] rounded-lg p-3 flex gap-2.5">
          <Info size={18} className="text-[#1c4fd9] shrink-0 mt-0.5" />
          <div>
            <p className="text-[13px] font-medium text-[#1c4fd9]">操作はログに記録されます</p>
            <p className="text-[12px] text-[#1c4fd9] mt-0.5">
              一括更新を実行すると、選択した{selectedKeys.length}件すべての鍵情報が更新され、変更履歴がログに残ります。
            </p>
          </div>
        </div>

        <UpdateFieldRow
          checked={updateBranch}
          onCheck={setUpdateBranch}
          label="保管店舗"
        >
          <SelectField value={branchValue} onChange={setBranchValue} options={BRANCHES} disabled={!updateBranch} />
        </UpdateFieldRow>

        <UpdateFieldRow
          checked={updateMemo}
          onCheck={setUpdateMemo}
          label="メモ"
        >
          <textarea
            value={memoValue}
            onChange={(e) => setMemoValue(e.target.value)}
            disabled={!updateMemo}
            placeholder="鍵に関するメモを入力（例：スペアキー保管あり）"
            rows={3}
            className="w-full border border-[#d1d6db] rounded-lg px-3 py-2.5 text-[13px] text-[#17171c] placeholder:text-[#8c949e] focus:outline-none focus:border-[#2663eb] resize-none disabled:bg-[#fafafa] disabled:text-[#8c949e]"
          />
        </UpdateFieldRow>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button onClick={() => navigate(-1)}
          className="w-[100px] h-[40px] rounded-lg border border-[#d1d6db] text-[14px] font-medium text-[#38404f] hover:bg-[#f2f5f5] transition-colors">
          キャンセル
        </button>
        <button
          disabled={activeFields === 0}
          className="flex items-center gap-2 px-4 h-[40px] rounded-lg bg-[#2663eb] text-white text-[14px] font-medium hover:bg-[#1d54d4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Check size={16} />
          {activeFields}項目を{selectedKeys.length}件に適用
        </button>
      </div>
    </div>
  );
}

function UpdateFieldRow({ checked, onCheck, label, children }: {
  checked: boolean; onCheck: (v: boolean) => void; label: string; children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 items-start">
      <div className="pt-8 shrink-0">
        <button
          onClick={() => onCheck(!checked)}
          className={`flex items-center justify-center size-[18px] rounded border-[1.5px] transition-colors ${
            checked ? 'bg-[#2663eb] border-[#2663eb]' : 'bg-white border-[#d1d6db]'
          }`}
        >
          {checked && <Check size={12} className="text-white" strokeWidth={3} />}
        </button>
      </div>
      <div className="flex flex-col gap-1.5 flex-1">
        <label className="text-[13px] font-medium text-[#38404f]">{label}</label>
        {children}
      </div>
    </div>
  );
}

function SelectField({ value, onChange, options, disabled }: {
  value: string; onChange: (v: string) => void; options: string[]; disabled?: boolean;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="appearance-none w-full h-[40px] border border-[#d1d6db] rounded-lg px-3 pr-8 text-[13px] text-[#17171c] focus:outline-none focus:border-[#2663eb] cursor-pointer bg-white disabled:bg-[#fafafa] disabled:text-[#8c949e]"
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6b7380] pointer-events-none" />
    </div>
  );
}
