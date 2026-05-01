import { CheckCircle, X, Check } from 'lucide-react';
import type { Key } from '../types';

interface ReturnConfirmModalProps {
  keyItem: Key;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ReturnConfirmModal({ keyItem, onClose, onConfirm }: ReturnConfirmModalProps) {
  return (
    <div
      className="fixed inset-0 bg-[rgba(18,23,38,0.5)] flex items-center justify-center z-50"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-[12px] shadow-[0px_10px_30px_0px_rgba(0,0,0,0.2)] w-[480px] flex flex-col overflow-hidden">

        {/* ヘッダー */}
        <div className="flex items-center gap-3 p-6 border-b border-[#e5e8eb]">
          <div className="bg-[#f0fcf2] rounded-full size-[40px] flex items-center justify-center shrink-0">
            <CheckCircle size={20} className="text-[#17a34a]" />
          </div>
          <p className="font-semibold text-[#121726] text-[18px] flex-1">返却を確定</p>
          <button
            onClick={onClose}
            className="size-[32px] flex items-center justify-center rounded-[6px] hover:bg-[#f2f5f5] transition-colors"
          >
            <X size={18} className="text-[#6b7380]" />
          </button>
        </div>

        {/* ボディ */}
        <div className="flex flex-col gap-4 p-6">
          <p className="text-[#38404f] text-[14px]">以下の鍵の返却を確定します。</p>

          <div className="bg-[#fafafa] border border-[#e5e8eb] rounded-[8px] p-4 flex flex-col gap-2">
            <div className="flex gap-3 text-[13px]">
              <span className="text-[#6b7380] shrink-0">鍵番号:</span>
              <span className="font-semibold text-[#121726]">{keyItem.id}</span>
            </div>
            <div className="flex gap-3 text-[13px]">
              <span className="text-[#6b7380] shrink-0">建物名:</span>
              <span className="text-[#121726]">{keyItem.buildingName} {keyItem.roomNumber}</span>
            </div>
            <div className="flex gap-3 text-[13px]">
              <span className="text-[#6b7380] shrink-0">返却者:</span>
              <span className="font-medium text-[#121726]">{keyItem.reservedBy ?? '—'}</span>
            </div>
            <div className="flex items-center gap-3 text-[13px]">
              <span className="text-[#6b7380] shrink-0">現在ステータス:</span>
              <span className="bg-[#fffaeb] text-[#cc910a] text-[12px] font-medium px-2 py-0.5 rounded-full">
                返却確認中
              </span>
            </div>
          </div>

          <div className="bg-[#f0f5ff] border border-[#dbe8ff] rounded-[6px] p-3 flex items-start gap-2.5">
            <Check size={16} className="text-[#1c4fd9] shrink-0 mt-0.5" />
            <p className="text-[#1c4fd9] text-[12px]">
              確定すると鍵ステータスは「貸出可」に変わり、ログに記録されます。
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
            onClick={onConfirm}
            className="w-[120px] h-[40px] bg-[#2663eb] rounded-[6px] flex items-center justify-center gap-2 text-[14px] font-medium text-white hover:bg-[#1d54d4] transition-colors"
          >
            <Check size={16} />
            返却を確定
          </button>
        </div>

      </div>
    </div>
  );
}
