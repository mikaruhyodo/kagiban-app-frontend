import { Bell, X } from 'lucide-react';
import type { Key } from '../types';

interface ReminderModalProps {
  keyItem: Key;
  overdueDays: number;
  onClose: () => void;
  onSend: () => void;
}

export default function ReminderModal({ keyItem, overdueDays, onClose, onSend }: ReminderModalProps) {
  return (
    <div
      className="fixed inset-0 bg-[rgba(18,23,38,0.5)] flex items-center justify-center z-50"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-[12px] shadow-[0px_10px_30px_0px_rgba(0,0,0,0.2)] w-[480px] flex flex-col overflow-hidden">

        {/* ヘッダー */}
        <div className="flex items-center gap-3 p-6 border-b border-[#e5e8eb]">
          <div className="bg-[#fffaeb] rounded-full size-[40px] flex items-center justify-center shrink-0">
            <Bell size={20} className="text-[#d97706]" />
          </div>
          <p className="font-semibold text-[#121726] text-[18px] flex-1">催促通知を送信</p>
          <button
            onClick={onClose}
            className="size-[32px] flex items-center justify-center rounded-[6px] hover:bg-[#f2f5f5] transition-colors"
          >
            <X size={18} className="text-[#6b7380]" />
          </button>
        </div>

        {/* ボディ */}
        <div className="flex flex-col gap-4 p-6">
          <p className="text-[#38404f] text-[14px]">
            以下の利用者に返却催促通知を送信します。よろしいですか？
          </p>

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
              <span className="text-[#6b7380] shrink-0">利用者:</span>
              <span className="font-medium text-[#121726]">{keyItem.reservedBy ?? '—'}</span>
            </div>
            <div className="flex items-center gap-3 text-[13px]">
              <span className="text-[#6b7380] shrink-0">超過時間:</span>
              <span className="bg-[#fff2f2] text-[#db2626] text-[12px] font-medium px-2 py-0.5 rounded-full">
                {overdueDays}分超過
              </span>
            </div>
          </div>

          <p className="text-[#6b7380] text-[12px]">
            通知はメールおよびアプリ内通知で送信され、ログに記録されます。
          </p>
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
            onClick={onSend}
            className="w-[120px] h-[40px] bg-[#2663eb] rounded-[6px] flex items-center justify-center gap-2 text-[14px] font-medium text-white hover:bg-[#1d54d4] transition-colors"
          >
            <Bell size={16} />
            催促を送信
          </button>
        </div>

      </div>
    </div>
  );
}
