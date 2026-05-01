import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, ChevronDown, ArrowRight } from 'lucide-react';
import { mockKeys } from '../../data/mock-data';
import ReservationStepper from './ReservationStepper';

const REASONS = ['案内', '内覧', '修繕対応', '緊急対応', 'その他'];
const LEND_TO = ['社員', '入居者', '内見者', '業者', '管理者', 'その他'];

const inputClass =
  'w-full border border-[#e5e8ed] rounded-[8px] px-3 py-[10px] text-[13px] text-[#17171c] placeholder:text-[#8c949e] focus:outline-none focus:border-[#2663eb] bg-white';

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1 text-[12px]">
        <span className="text-[#8c949e]">{label}</span>
        {required && <span className="text-[#db2626]">*</span>}
      </div>
      {children}
    </div>
  );
}

function SelectField({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full border border-[#e5e8ed] rounded-[8px] px-3 pr-8 py-[10px] text-[13px] text-[#17171c] focus:outline-none focus:border-[#2663eb] cursor-pointer bg-white"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6b7380] pointer-events-none"
      />
    </div>
  );
}

export default function Step2LoanInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedIds: string[] = location.state?.selectedIds ?? [];
  const selectedKeys = mockKeys.filter((k) => selectedIds.includes(k.id));

  const [form, setForm] = useState({
    reason: '案内',
    lendTo: '社員',
    company: '',
    person: '',
    phone: '',
    startDate: '2026-02-12',
    startTime: '10:00',
    endDate: '2026-02-12',
    endTime: '14:00',
    notes: '',
  });

  const update = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="bg-[#fafafc] p-5 flex flex-col gap-4 min-h-full">

      {/* タイトル */}
      <div className="flex items-center gap-3">
        <Calendar size={22} className="text-[#17171c]" />
        <h1 className="text-[22px] font-bold text-[#17171c]">鍵予約</h1>
      </div>

      {/* ステッパー */}
      <ReservationStepper currentStep={2} />

      {/* 貸出情報入力フォーム */}
      <div className="bg-white border border-[#e5e8ed] rounded-[10px] p-4 flex flex-col gap-4">
        <p className="font-bold text-[#17171c] text-[18px]">貸出情報入力</p>

        {/* 申請者名 */}
        <FormField label="申請者名" required>
          <div className="border border-[#e5e8ed] rounded-[8px] px-3 py-[10px] text-[13px] text-[#17171c] bg-white">
            管理者・田中
          </div>
        </FormField>

        {/* 貸出理由 / 貸出先 */}
        <div className="grid grid-cols-2 gap-4">
          <FormField label="貸出理由" required>
            <SelectField
              value={form.reason}
              onChange={(v) => update('reason', v)}
              options={REASONS}
            />
          </FormField>
          <FormField label="貸出先" required>
            <SelectField
              value={form.lendTo}
              onChange={(v) => update('lendTo', v)}
              options={LEND_TO}
            />
          </FormField>
        </div>

        {/* 貸出先情報（社員以外） */}
        {form.lendTo !== '社員' && (
          <div className="bg-[#f9fafb] rounded-[4px] p-4 flex flex-col gap-4">
            <p className="font-bold text-[#17171c] text-[18px]">貸出先情報</p>
            <div className="grid grid-cols-3 gap-4">
              <FormField label="会社名" required>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => update('company', e.target.value)}
                  className={inputClass}
                />
              </FormField>
              <FormField label="担当者名" required>
                <input
                  type="text"
                  value={form.person}
                  onChange={(e) => update('person', e.target.value)}
                  className={inputClass}
                />
              </FormField>
              <FormField label="連絡先" required>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  placeholder="090-XXXX-XXXX"
                  className={inputClass}
                />
              </FormField>
            </div>
          </div>
        )}

        {/* 貸出予定日 / 返却予定日 */}
        <div className="grid grid-cols-2 gap-4">
          <FormField label="貸出予定日" required>
            <div className="flex gap-2">
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => update('startDate', e.target.value)}
                className={inputClass}
              />
              <input
                type="time"
                value={form.startTime}
                onChange={(e) => update('startTime', e.target.value)}
                className="w-[100px] shrink-0 border border-[#e5e8ed] rounded-[8px] px-3 py-[10px] text-[13px] text-[#17171c] focus:outline-none focus:border-[#2663eb] bg-white"
              />
            </div>
          </FormField>
          <FormField label="返却予定日" required>
            <div className="flex gap-2">
              <input
                type="date"
                value={form.endDate}
                onChange={(e) => update('endDate', e.target.value)}
                className={inputClass}
              />
              <input
                type="time"
                value={form.endTime}
                onChange={(e) => update('endTime', e.target.value)}
                className="w-[100px] shrink-0 border border-[#e5e8ed] rounded-[8px] px-3 py-[10px] text-[13px] text-[#17171c] focus:outline-none focus:border-[#2663eb] bg-white"
              />
            </div>
          </FormField>
        </div>

        {/* 備考 */}
        <FormField label="備考">
          <textarea
            value={form.notes}
            onChange={(e) => update('notes', e.target.value)}
            placeholder="特記事項があれば入力してください"
            className="w-full h-[80px] border border-[#e5e8ed] rounded-[8px] px-3 py-[10px] text-[13px] text-[#17171c] placeholder:text-[#8c949e] focus:outline-none focus:border-[#2663eb] resize-none"
          />
        </FormField>
      </div>

      {/* 選択中の鍵 */}
      <div className="bg-white border border-[#e5e8ed] rounded-[10px] p-4 flex flex-col gap-3">
        <p className="font-bold text-[#17171c] text-[18px]">選択中の鍵</p>
        {selectedKeys.length === 0 ? (
          <p className="text-[#8c949e] text-[13px]">選択された鍵がありません</p>
        ) : (
          selectedKeys.map((key) => (
            <div
              key={key.id}
              className="bg-[#f7f7fa] rounded-[8px] px-4 py-3 flex items-center gap-3 text-[13px]"
            >
              <span className="font-bold text-[#17171c] text-[14px]">{key.id}</span>
              <span className="text-[#8c949e]">•</span>
              <span className="text-[#17171c]">{key.buildingName} {key.roomNumber}号室</span>
              <span className="text-[#8c949e]">•</span>
              <span className="text-[#6b7380]">{key.storeBranch}</span>
            </div>
          ))
        )}
      </div>

      {/* ナビゲーション */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="border border-[#e5e8ed] text-[#17171c] text-[13px] font-medium px-[14px] py-[10px] rounded-[8px] hover:bg-[#f2f5f5] transition-colors"
        >
          戻る
        </button>
        <button
          onClick={() => navigate('/reservation/step3', { state: { selectedIds, form } })}
          className="flex items-center gap-1.5 bg-[#2663eb] text-white text-[13px] font-medium px-[14px] py-[10px] rounded-[8px] hover:bg-[#1d54d4] transition-colors"
        >
          次へ（内容確認）
          <ArrowRight size={14} />
        </button>
      </div>

    </div>
  );
}
