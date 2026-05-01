import type { KeyStatus, UserRole } from '../types';

type BadgeStatus = KeyStatus | UserRole;

const statusStyles: Record<BadgeStatus, string> = {
  '利用中': 'bg-[#f0f5ff] text-[#2663eb]',
  '予約確定': 'bg-[#f7f2ff] text-[#8c4ad9]',
  '未返却': 'bg-[#fcf2f2] text-[#db2626]',
  '返却確認中': 'bg-[#fffaeb] text-[#cc910a]',
  '貸出可': 'bg-[#f0fcf2] text-[#17a34a]',
  '返却完了': 'bg-[#f0fcf2] text-[#17a34a]',
  '管理中': 'bg-[#f2f5f5] text-[#4d5466]',
  '予約不可': 'bg-[#f2f5f5] text-[#4d5466]',
  '管理者': 'bg-[#dbe8ff] text-[#1c4fd9]',
  '営業': 'bg-[#f2f2f7] text-[#17171c]',
};

interface StatusBadgeProps {
  status: BadgeStatus;
  size?: 'sm' | 'md';
}

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const style = statusStyles[status] ?? 'bg-gray-100 text-gray-600';
  const sizeClass = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-[12px] px-2.5 py-1';

  return (
    <span className={`inline-flex items-center rounded-full font-medium whitespace-nowrap ${style} ${sizeClass}`}>
      {status}
    </span>
  );
}
