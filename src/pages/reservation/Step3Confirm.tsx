import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Check } from 'lucide-react';
import { mockKeys } from '../../data/mock-data';
import ReservationStepper from './ReservationStepper';

export default function Step3Confirm() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedIds: string[] = location.state?.selectedIds ?? ['K-1002', 'K-1003'];
  const form = location.state?.form ?? {
    reason: '案内',
    lendTo: '入居者',
    company: 'サンプル不動産株式会社',
    person: '山田太郎',
    phone: '090-1234-5678',
    startDate: '2026-02-11',
    startTime: '08:00',
    endDate: '2026-02-11',
    endTime: '10:00',
    notes: '特になし',
  };

  const selectedKeys = mockKeys.filter((k) => selectedIds.includes(k.id));

  return (
    <div className="p-8 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Calendar size={32} className="text-[#2663eb]" />
        <h1 className="text-[30px] font-bold text-[#17171c]">鍵予約</h1>
      </div>

      <ReservationStepper currentStep={3} />

      <div className="bg-white border border-[#e5e8ed] rounded-xl p-6 flex flex-col gap-5">
        <h2 className="text-[20px] font-bold text-[#17171c]">予約内容確認</h2>

        <div>
          <p className="text-[15px] font-bold text-[#17171c] mb-2">選択した鍵</p>
          <div className="bg-[#f9fafb] rounded-lg p-4 flex flex-col gap-2 text-[14px] text-[#38404f]">
            {selectedKeys.length > 0 ? (
              selectedKeys.map((k) => (
                <p key={k.id}>{k.id} - {k.buildingName} {k.roomNumber}号室</p>
              ))
            ) : (
              <p className="text-[#8c949e]">選択なし</p>
            )}
          </div>
        </div>

        <div>
          <p className="text-[15px] font-bold text-[#17171c] mb-2">申請者情報</p>
          <div className="bg-[#f9fafb] rounded-lg p-4 text-[14px] text-[#38404f]">
            <p>申請者名: 管理者・田中</p>
          </div>
        </div>

        <div>
          <p className="text-[15px] font-bold text-[#17171c] mb-2">貸出情報</p>
          <div className="bg-[#f9fafb] rounded-lg p-4 flex flex-col gap-2 text-[14px] text-[#38404f]">
            <p>貸出理由: {form.reason || '—'}</p>
            <p>貸出先: {form.lendTo || '—'}</p>
            {form.company && <p>会社名: {form.company}</p>}
            <p>担当者名: {form.person || '—'}</p>
            {form.phone && <p>連絡先: {form.phone}</p>}
            <p>貸出予定: {form.startDate} {form.startTime}</p>
            <p>返却予定: {form.endDate} {form.endTime}</p>
            <p>備考: {form.notes || '特になし'}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)}
          className="px-5 py-2.5 rounded-lg border border-[#d1d6db] text-[14px] font-medium text-[#17171c] hover:bg-[#f2f5f5] transition-colors">
          戻る
        </button>
        <button
          onClick={() => navigate('/reservation/step4')}
          className="flex items-center gap-2 bg-[#2663eb] text-white px-6 py-2.5 rounded-lg text-[14px] font-medium hover:bg-[#1d54d4] transition-colors"
        >
          予約を確定
          <Check size={16} />
        </button>
      </div>
    </div>
  );
}
