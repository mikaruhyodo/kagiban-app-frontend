import { useNavigate } from 'react-router-dom';
import { AlertTriangle, RotateCcw, Clock, Calendar } from 'lucide-react';
import { mockKeys } from '../data/mock-data';
import type { KeyStatus } from '../types';

interface CardConfig {
  status: KeyStatus;
  displayTitle: string;
  to: string;
  icon: React.ElementType;
  titleColor: string;
  itemBg: string;
  itemBorder: string;
}

const cards: CardConfig[] = [
  {
    status: '未返却',
    displayTitle: '未返却',
    to: '/keys/unreturned',
    icon: AlertTriangle,
    titleColor: 'text-[#db2626]',
    itemBg: 'bg-[#fcf2f2]',
    itemBorder: 'border-[#facccc]',
  },
  {
    status: '返却確認中',
    displayTitle: '返却確認中',
    to: '/keys/returning',
    icon: RotateCcw,
    titleColor: 'text-[#2663eb]',
    itemBg: 'bg-[#f0f5ff]',
    itemBorder: 'border-[#bad6f7]',
  },
  {
    status: '利用中',
    displayTitle: '利用中',
    to: '/keys/in-use',
    icon: Clock,
    titleColor: 'text-[#218a40]',
    itemBg: 'bg-[#f0fcf2]',
    itemBorder: 'border-[#bae5c2]',
  },
  {
    status: '予約確定',
    displayTitle: '予約中',
    to: '/keys/reserved',
    icon: Calendar,
    titleColor: 'text-[#8c4ad9]',
    itemBg: 'bg-[#f7f2ff]',
    itemBorder: 'border-[#d9c9f2]',
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fafafc] p-4 flex flex-col gap-3 h-full min-h-0">
      <p className="font-bold text-[#17171c] text-[20px] leading-normal shrink-0">ダッシュボード</p>

      <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
        {cards.map(({ status, displayTitle, to, icon: Icon, titleColor, itemBg, itemBorder }) => {
          const keys = mockKeys.filter((k) => k.status === status);
          return (
            <div
              key={status}
              className="bg-white border border-[#e5e8ed] rounded-[10px] p-4 flex flex-col gap-3 min-h-0"
            >
              {/* ヘッダー部 */}
              <div className="flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <Icon size={15} className={titleColor} />
                  <p className={`font-bold text-[14px] leading-normal ${titleColor}`}>{displayTitle}</p>
                </div>
                <div className="flex items-baseline gap-0.5">
                  <p className="font-bold text-[#17171c] text-[20px] leading-none">{keys.length}</p>
                  <p className="text-[#8c949e] text-[11px]">件</p>
                </div>
              </div>

              {/* 鍵一覧（最大3件） */}
              <div className="flex flex-col gap-2 flex-1 min-h-0 overflow-hidden">
                {keys.length === 0 ? (
                  <p className="text-[#8c949e] text-[12px] py-1">該当する鍵はありません</p>
                ) : (
                  keys.slice(0, 3).map((key) => (
                    <div
                      key={key.id}
                      className={`${itemBg} border ${itemBorder} rounded-[6px] px-3 py-2 flex flex-col gap-0.5`}
                    >
                      <p className="font-bold text-[#17171c] text-[12px]">{key.id}</p>
                      <p className="text-[#6b7380] text-[11px] truncate">{key.buildingName} {key.roomNumber}号室</p>
                      {key.reservedBy && (
                        <p className="text-[#8c949e] text-[11px] truncate">{key.reservedBy}</p>
                      )}
                    </div>
                  ))
                )}
                {keys.length > 3 && (
                  <p className="text-[#8c949e] text-[11px] pl-1">他 {keys.length - 3} 件</p>
                )}
              </div>

              {/* 一覧ボタン */}
              <button
                onClick={() => navigate(to)}
                className="border border-[#e5e8ed] rounded-[8px] px-3 py-2 w-full text-[12px] font-medium text-[#17171c] hover:bg-[#f2f5f5] transition-colors shrink-0"
              >
                一覧を見る
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
