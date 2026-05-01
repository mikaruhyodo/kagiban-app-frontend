import { useState } from 'react';
import { TriangleAlert, X, Check, ChevronDown } from 'lucide-react';
import type { Key, KeyStatus } from '../types';

const SELECTABLE_STATUSES: KeyStatus[] = [
  '貸出可', '利用中', '返却確認中', '未返却', '予約不可',
];

const statusBadge: Record<KeyStatus, { bg: string; text: string }> = {
  '利用中':    { bg: 'bg-[#f0fcf2]', text: 'text-[#218a40]' },
  '予約確定':  { bg: 'bg-[#f7f2ff]', text: 'text-[#8c4ad9]' },
  '未返却':    { bg: 'bg-[#fcf2f2]', text: 'text-[#db2626]' },
  '返却確認中':{ bg: 'bg-[#f0f5ff]', text: 'text-[#2663eb]' },
  '貸出可':   { bg: 'bg-[#f2f5f5]', text: 'text-[#4d5466]' },
  '返却完了':  { bg: 'bg-[#f2f5f5]', text: 'text-[#4d5466]' },
  '管理中':   { bg: 'bg-[#f2f5f5]', text: 'text-[#4d5466]' },
  '予約不可':  { bg: 'bg-[#fdf2f8]', text: 'text-[#9d174d]' },
};

interface StatusCorrectionModalProps {
  keyItem: Key;
  onClose: () => void;
  onConfirm: (newStatus: KeyStatus) => void;
}

export default function StatusCorrectionModal({ keyItem, onClose, onConfirm }: StatusCorrectionModalProps) {
  const [selected, setSelected] = useState<KeyStatus>(
    SELECTABLE_STATUSES.find((s) => s !== keyItem.status) ?? '貸出可'
  );

  const currentBadge = statusBadge[keyItem.status];

  return (
    <div
      className="fixed inset-0 bg-[rgba(18,23,38,0.5)] flex items-center justify-center z-50"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-[12px] shadow-[0px_10px_30px_0px_rgba(0,0,0,0.2)] w-[480px] flex flex-col overflow-hidden">

        {/* ヘッダー */}
        <div className="flex items-center gap-3 p-6 border-b border-[#e5e8eb]">
          <div className="bg-[#fffae0] rounded-full size-[40px] flex items-center justify-center shrink-0">
            <TriangleAlert size={20} className="text-[#cc910a]" />
          </div>
          <p className="font-semibold text-[#121726] text-[18px] flex-1">ステータス手動是正</p>
          <button
            onClick={onClose}
            className="size-[32px] flex items-center justify-center rounded-[6px] hover:bg-[#f2f5f5] transition-colors"
          >
            <X size={18} className="text-[#6b7380]" />
          </button>
        </div>

        {/* ボディ */}
        <div className="flex flex-col gap-4 p-6">
          <p className="text-[#38404f] text-[14px]">以下の鍵のステータスを手動で変更します。</p>

          {/* 鍵情報 */}
          <div className="bg-[#fafafa] border border-[#e5e8eb] rounded-[8px] p-4 flex flex-col gap-2">
            <div className="flex gap-3 text-[13px]">
              <span className="text-[#6b7380] shrink-0">鍵番号:</span>
              <span className="font-semibold text-[#121726]">{keyItem.id}</span>
            </div>
            <div className="flex gap-3 text-[13px]">
              <span className="text-[#6b7380] shrink-0">建物名:</span>
              <span className="text-[#121726]">{keyItem.buildingName} {keyItem.roomNumber}</span>
            </div>
            <div className="flex items-center gap-3 text-[13px]">
              <span className="text-[#6b7380] shrink-0">現在のステータス:</span>
              <span className={`${currentBadge.bg} ${currentBadge.text} text-[12px] font-medium px-3 py-0.5 rounded-[6px]`}>
                {keyItem.status}
              </span>
            </div>
          </div>

          {/* 変更先ステータス選択 */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#38404f]">
              変更後のステータス <span className="text-[#db2626]">*</span>
            </label>
            <div className="relative">
              <select
                value={selected}
                onChange={(e) => setSelected(e.target.value as KeyStatus)}
                className="appearance-none w-full border border-[#d1d6db] rounded-[8px] px-3 pr-9 py-2.5 text-[13px] text-[#17171c] bg-white focus:outline-none focus:border-[#2663eb] cursor-pointer"
              >
                {SELECTABLE_STATUSES.filter((s) => s !== keyItem.status).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7380] pointer-events-none" />
            </div>
          </div>

          {/* 注意バナー */}
          <div className="bg-[#fffae0] border border-[#fce58c] rounded-[6px] p-3 flex items-start gap-2.5">
            <TriangleAlert size={15} className="text-[#cc910a] shrink-0 mt-0.5" />
            <p className="text-[#80590d] text-[12px]">
              この操作はログに記録されます。変更後のステータスに応じて関係者へ自動通知が送信されます。
            </p>
          </div>
        </div>

        {/* フッター */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-[#e5e8eb]">
          <button
            onClick={onClose}
            className="w-[100px] h-[40px] border border-[#d1d6db] rounded-[6px] text-[14px] font-medium text-[#38404f] hover:bg-[#f2f5f5] transition-colors"
          >
            キャンセル
          </button>
          <button
            onClick={() => onConfirm(selected)}
            className="w-[120px] h-[40px] bg-[#2663eb] rounded-[6px] flex items-center justify-center gap-2 text-[14px] font-medium text-white hover:bg-[#1d54d4] transition-colors"
          >
            <Check size={16} />
            更新する
          </button>
        </div>

      </div>
    </div>
  );
}
