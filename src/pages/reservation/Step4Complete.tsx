import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

export default function Step4Complete() {
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <div className="bg-white border border-[#e5e8ed] rounded-xl p-12 flex flex-col items-center gap-6">
        <div className="bg-[#dcfce7] flex items-center justify-center rounded-full size-20">
          <Check size={48} className="text-[#17a34a]" strokeWidth={2.5} />
        </div>
        <h2 className="text-[26px] font-bold text-[#17171c]">予約が完了しました</h2>
        <p className="text-[14px] text-[#4d5466] text-center max-w-[500px]">
          鍵の予約が正常に完了しました。ステータスが「予約確定」に変更されました。
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="px-5 py-2.5 rounded-lg border border-[#d1d6db] text-[14px] font-medium text-[#17171c] hover:bg-[#f2f5f5] transition-colors"
          >
            ダッシュボードへ
          </button>
          <button
            onClick={() => navigate('/reservation')}
            className="px-5 py-2.5 rounded-lg bg-[#2663eb] text-white text-[14px] font-medium hover:bg-[#1d54d4] transition-colors"
          >
            新しい予約を作成
          </button>
        </div>
      </div>
    </div>
  );
}
