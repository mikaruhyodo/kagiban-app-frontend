import { LogOut, Bell } from 'lucide-react';

interface HeaderProps {
  variant?: 'default' | 'detail';
  title?: string;
}

export default function Header({ variant = 'default', title }: HeaderProps) {
  if (variant === 'detail') {
    return (
      <header className="bg-white border-b border-[#e5e8ed] flex items-center h-[60px] px-8">
        <span className="font-semibold text-[#17171c] text-[16px]">{title}</span>
        <div className="flex-1" />
        <div className="flex items-center gap-4">
          <Bell size={20} className="text-[#4d5466]" />
          <div className="bg-[#dbe8ff] flex items-center justify-center rounded-full size-8">
            <span className="text-[#1c4fd9] text-[13px] font-medium">管</span>
          </div>
          <span className="text-[#38404f] text-[14px]">管理者</span>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white border-b border-[#e5e8ed] flex items-center justify-between h-[60px] px-8">
      <span className="text-[#6b7380] text-[14px] font-medium">株式会社サンプル不動産</span>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-[13px]">
          <span className="text-[#6b7380]">ログイン中: </span>
          <span className="text-[#17171c] font-medium">管理者・田中</span>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-[8px] text-[13px] text-[#4d5466] hover:bg-[#f2f5f5] transition-colors">
          <LogOut size={16} />
          ログアウト
        </button>
      </div>
    </header>
  );
}
