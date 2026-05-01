import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, AlertTriangle, Calendar, Bell, ArrowLeft, CheckCircle, Check } from 'lucide-react';
import { mockKeys } from '../data/mock-data';
import type { Key, KeyStatus } from '../types';
import ReminderModal from '../components/ReminderModal';
import ReturnConfirmModal from '../components/ReturnConfirmModal';

type StatusFilter = 'in-use' | 'reserved' | 'unreturned' | 'returning';

const statusMap: Record<StatusFilter, KeyStatus> = {
  'in-use':    '利用中',
  'reserved':  '予約確定',
  'unreturned':'未返却',
  'returning': '返却確認中',
};

const pageMeta: Record<StatusFilter, { title: string; icon: React.ElementType; iconClass: string }> = {
  'in-use':    { title: '利用中',     icon: Clock,         iconClass: 'text-[#218a40]' },
  'reserved':  { title: '予約中',     icon: Calendar,      iconClass: 'text-[#8c4ad9]' },
  'unreturned':{ title: '未返却',     icon: AlertTriangle, iconClass: 'text-[#db2626]' },
  'returning': { title: '返却確認中', icon: CheckCircle,   iconClass: 'text-[#2663eb]' },
};

function calcOverdueMinutes(dueDate: string): number {
  const due = new Date(dueDate);
  const today = new Date('2026-04-16');
  const diff = Math.floor((today.getTime() - due.getTime()) / (1000 * 60));
  return diff > 0 ? diff : 0;
}

interface KeyListProps {
  filter: StatusFilter;
}

export default function KeyList({ filter }: KeyListProps) {
  const navigate = useNavigate();
  const status = statusMap[filter];
  const { title, icon: Icon, iconClass } = pageMeta[filter];
  const keys = mockKeys.filter((k) => k.status === status);
  const isUnreturned = filter === 'unreturned';
  const isReturning = filter === 'returning';

  const [reminderTarget, setReminderTarget] = useState<Key | null>(null);
  const [returnTarget, setReturnTarget] = useState<Key | null>(null);

  return (
    <div className="bg-[#fafafc] p-5 flex flex-col gap-4 h-full">
      {/* 戻るボタン */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1.5 text-[#4a5463] text-[13px] hover:text-[#2663eb] transition-colors w-fit"
      >
        <ArrowLeft size={16} />
        戻る
      </button>

      {/* ページタイトル */}
      <div className="flex items-center gap-3">
        <Icon size={22} className={iconClass} />
        <h1 className="text-[22px] font-bold text-[#17171c]">{title}</h1>
      </div>

      {/* テーブル */}
      <div className="bg-white border border-[#e5e8ed] rounded-[10px] overflow-hidden">

        {/* ── 返却確認中専用ヘッダー ── */}
        {isReturning && (
          <div className="bg-[#f5f7fa] border-b border-[#e5e8ed] flex items-center px-4 py-3">
            <div className="w-[88px] shrink-0">
              <p className="text-[#6b7380] text-[12px] font-semibold">鍵番号</p>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#6b7380] text-[12px] font-semibold">建物名</p>
            </div>
            <div className="w-[100px] shrink-0">
              <p className="text-[#6b7380] text-[12px] font-semibold">利用者</p>
            </div>
            <div className="w-[120px] shrink-0">
              <p className="text-[#6b7380] text-[12px] font-semibold">利用時間</p>
            </div>
            <div className="w-[130px] shrink-0">
              <p className="text-[#6b7380] text-[12px] font-semibold">返却申告時刻</p>
            </div>
            <div className="w-[90px] shrink-0">
              <p className="text-[#6b7380] text-[12px] font-semibold">ステータス</p>
            </div>
            <div className="w-[150px] shrink-0 flex justify-end">
              <p className="text-[#6b7380] text-[12px] font-semibold">アクション</p>
            </div>
          </div>
        )}

        {/* ── 未返却・その他 共通ヘッダー ── */}
        {!isReturning && (
          <div className="bg-[#f5f7fa] border-b border-[#e5e8ed] flex items-center px-4 py-3">
            <div className="w-[88px] shrink-0">
              <p className="text-[#6b7380] text-[12px] font-semibold">鍵番号</p>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#6b7380] text-[12px] font-semibold">建物名</p>
            </div>
            <div className="w-[100px] shrink-0">
              <p className="text-[#6b7380] text-[12px] font-semibold">利用者</p>
            </div>
            <div className="w-[120px] shrink-0">
              <p className="text-[#6b7380] text-[12px] font-semibold">返却期限</p>
            </div>
            {isUnreturned && (
              <div className="w-[80px] shrink-0">
                <p className="text-[#6b7380] text-[12px] font-semibold">超過時間</p>
              </div>
            )}
            <div className="w-[90px] shrink-0">
              <p className="text-[#6b7380] text-[12px] font-semibold">ステータス</p>
            </div>
            <div className="w-[140px] shrink-0 flex justify-end">
              <p className="text-[#6b7380] text-[12px] font-semibold">アクション</p>
            </div>
          </div>
        )}

        {/* データ行 */}
        {keys.length === 0 ? (
          <div className="px-4 py-12 text-center text-[#8c949e] text-[13px]">
            該当する鍵はありません
          </div>
        ) : isReturning ? (
          /* ── 返却確認中 専用行 ── */
          keys.map((key) => (
            <div
              key={key.id}
              className="bg-white border-b border-[#e5e8ed] flex items-center px-4 py-[9px] hover:bg-[#fafafa] transition-colors last:border-0"
            >
              <div className="w-[88px] shrink-0">
                <p className="text-[#17171c] text-[13px] font-bold">{key.id}</p>
              </div>
              <div className="flex-1 min-w-0 flex flex-col gap-0.5 pr-3">
                <p className="text-[#17171c] text-[13px] truncate">{key.buildingName}</p>
                <p className="text-[#8c949e] text-[11px]">{key.roomNumber}号室</p>
                <p className="text-[#8c949e] text-[11px]">{key.storeBranch}</p>
              </div>
              <div className="w-[100px] shrink-0">
                <p className="text-[#17171c] text-[13px]">{key.reservedBy ?? '—'}</p>
              </div>
              <div className="w-[120px] shrink-0">
                <p className="text-[#17171c] text-[13px]">—</p>
              </div>
              <div className="w-[130px] shrink-0">
                <p className="text-[#17171c] text-[13px]">{key.dueDate ?? '—'}</p>
              </div>
              <div className="w-[90px] shrink-0">
                <span className="bg-[#f0f5ff] text-[#2663eb] text-[11px] font-medium px-[10px] py-1 rounded-[6px] whitespace-nowrap">
                  返却確認中
                </span>
              </div>
              <div className="w-[150px] shrink-0 flex items-center justify-end gap-2">
                <button
                  onClick={() => setReturnTarget(key)}
                  className="flex items-center gap-1 shrink-0 bg-[#2663eb] text-white text-[12px] font-medium px-2.5 py-[7px] rounded-[8px] hover:bg-[#1d54d4] transition-colors whitespace-nowrap"
                >
                  <Check size={13} />
                  返却確定
                </button>
                <button
                  onClick={() => navigate(`/keys/detail/${key.id}`)}
                  className="shrink-0 border border-[#e5e8ed] text-[#17171c] text-[12px] font-medium px-2.5 py-[7px] rounded-[8px] hover:bg-[#f2f5f5] transition-colors whitespace-nowrap"
                >
                  詳細
                </button>
              </div>
            </div>
          ))
        ) : (
          /* ── 未返却・その他 共通行 ── */
          keys.map((key) => {
            const overdueDays = isUnreturned && key.dueDate ? calcOverdueMinutes(key.dueDate) : 0;
            return (
              <div
                key={key.id}
                className="bg-white border-b border-[#e5e8ed] flex items-center px-4 py-[9px] hover:bg-[#fafafa] transition-colors last:border-0"
              >
                <div className="w-[88px] shrink-0">
                  <p className="text-[#17171c] text-[13px] font-bold">{key.id}</p>
                </div>
                <div className="flex-1 min-w-0 flex flex-col gap-0.5 pr-3">
                  <p className="text-[#17171c] text-[13px] truncate">{key.buildingName}</p>
                  <p className="text-[#8c949e] text-[11px]">{key.roomNumber}号室</p>
                  <p className="text-[#8c949e] text-[11px]">{key.storeBranch}</p>
                </div>
                <div className="w-[100px] shrink-0">
                  <p className="text-[#17171c] text-[13px]">{key.reservedBy ?? '—'}</p>
                </div>
                <div className="w-[120px] shrink-0">
                  <p className="text-[#17171c] text-[13px]">{key.dueDate ?? '—'}</p>
                </div>
                {isUnreturned && (
                  <div className="w-[80px] shrink-0">
                    {overdueDays > 0 ? (
                      <span className="bg-[#db2626] text-white text-[11px] font-medium px-[10px] py-1 rounded-[6px]">
                        {overdueDays}分
                      </span>
                    ) : (
                      <span className="text-[#8c949e] text-[13px]">—</span>
                    )}
                  </div>
                )}
                <div className="w-[90px] shrink-0">
                  {isUnreturned ? (
                    <span className="bg-[#fcf2f2] text-[#db2626] text-[11px] font-medium px-[10px] py-1 rounded-[6px]">
                      未返却
                    </span>
                  ) : (
                    <span className="text-[#6b7380] text-[13px]">{key.status}</span>
                  )}
                </div>
                <div className="w-[140px] shrink-0 flex items-center justify-end gap-2">
                  {isUnreturned && (
                    <button
                      onClick={() => setReminderTarget(key)}
                      className="flex items-center gap-1 shrink-0 border border-[#e5e8ed] rounded-[8px] px-2.5 py-[7px] text-[12px] font-medium text-[#17171c] hover:bg-[#f2f5f5] transition-colors whitespace-nowrap"
                    >
                      <Bell size={13} />
                      催促
                    </button>
                  )}
                  <button
                    onClick={() => navigate(`/keys/detail/${key.id}`)}
                    className="shrink-0 bg-[#2663eb] text-white text-[12px] font-medium px-2.5 py-[7px] rounded-[8px] hover:bg-[#1d54d4] transition-colors whitespace-nowrap"
                  >
                    詳細
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 返却確定モーダル */}
      {returnTarget && (
        <ReturnConfirmModal
          keyItem={returnTarget}
          onClose={() => setReturnTarget(null)}
          onConfirm={() => setReturnTarget(null)}
        />
      )}

      {/* 催促モーダル */}
      {reminderTarget && (
        <ReminderModal
          keyItem={reminderTarget}
          overdueDays={calcOverdueMinutes(reminderTarget.dueDate ?? '')}
          onClose={() => setReminderTarget(null)}
          onSend={() => setReminderTarget(null)}
        />
      )}

      {/* 未返却アラートバナー */}
      {isUnreturned && keys.length > 0 && (
        <div className="bg-[#fcf2f2] border border-[#facccc] rounded-[8px] p-4 flex items-start gap-3">
          <AlertTriangle size={20} className="text-[#db2626] shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <p className="text-[#801a1a] text-[14px] font-bold">未返却の鍵があります</p>
            <p className="text-[#993333] text-[12px]">
              利用者に返却催促を送信するか、鍵詳細画面から手動でステータスを更新してください。
            </p>
          </div>
        </div>
      )}

      {/* 返却確認中バナー */}
      {isReturning && keys.length > 0 && (
        <div className="bg-[#f0f5ff] border border-[#bad6f7] rounded-[8px] p-4 flex items-start gap-3">
          <CheckCircle size={20} className="text-[#2663eb] shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <p className="text-[#1a3380] text-[14px] font-bold">返却確認が必要です</p>
            <p className="text-[#334d99] text-[12px]">
              各鍵を確認し、「返却確定」ボタンを押してください。確定後、自動で一覧から消え、ログに記録されます。
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
