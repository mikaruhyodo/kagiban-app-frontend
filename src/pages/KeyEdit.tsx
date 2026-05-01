import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, ChevronDown } from 'lucide-react';
import { mockKeys } from '../data/mock-data';

const KEY_TYPES = ['シリンダー錠', 'カードキー', 'ディンプルキー', 'スマートロック'];
const BRANCHES = ['渋谷店', '新宿店', '目黒店', '品川店', '池袋店'];
const MANAGEMENT_CATEGORIES = ['通常管理', '共用部管理', '自主管理'];
const GROUPS = ['通常管理対象', '共用部', '延滞', '紛失', '家主返却済', '管理非対象'];

const inputClass =
  'w-full border border-[#d1d6db] rounded-[8px] px-3 py-2.5 text-[13px] text-[#17171c] placeholder:text-[#8c949e] focus:outline-none focus:border-[#2663eb] bg-white';

function FormField({
  label,
  required,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className ?? ''}`}>
      <label className="text-[13px] font-medium text-[#38404f]">
        {label}
        {required && <span className="text-[#db2626] ml-1">*</span>}
      </label>
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
        className="appearance-none w-full border border-[#d1d6db] rounded-[8px] px-3 pr-8 py-2.5 text-[13px] text-[#17171c] focus:outline-none focus:border-[#2663eb] cursor-pointer bg-white"
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

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#e5e8ed] rounded-[10px] p-4 flex flex-col gap-4">
      <p className="font-bold text-[#17171c] text-[16px] border-b border-[#f2f5f5] pb-3">{title}</p>
      {children}
    </div>
  );
}

export default function KeyEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const key = mockKeys.find((k) => k.id === id);

  const [form, setForm] = useState({
    keyId: key?.id ?? '',
    branchNumber: '01',
    propertyCode: 'P-2024-001',
    buildingName: key?.buildingName ?? '',
    roomNumber: key?.roomNumber ?? '',
    location: '',
    maker: 'MIWA',
    keyType: key?.keyType ?? '',
    hasSpare: false,
    storeBranch: key?.storeBranch ?? '',
    safeNumber: 'S-01',
    groups: ['通常管理対象', '延滞'] as string[],
    storageNumber: '001',
    trustDate: '2024-04-01',
    managementCategory: '通常管理',
    ownerReturned: false,
    disposalDate: '',
    keyMemo: key?.memo ?? 'スペアなし。紛失注意。',
    propertyMemo: '',
  });

  if (!key) {
    return (
      <div className="p-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#38404f] text-[13px] mb-6 hover:text-[#2663eb]"
        >
          <ArrowLeft size={16} /> 戻る
        </button>
        <p className="text-[#6b7380]">鍵が見つかりません</p>
      </div>
    );
  }

  const update = (field: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }));

  const toggleGroup = (g: string) =>
    setForm((f) => ({
      ...f,
      groups: f.groups.includes(g) ? f.groups.filter((x) => x !== g) : [...f.groups, g],
    }));

  return (
    <div className="bg-[#fafafc] p-5 flex flex-col gap-4 min-h-full">

      {/* タイトル行 */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 px-2 py-1.5 rounded-[6px] text-[#38404f] text-[14px] font-medium hover:bg-[#f2f5f5] transition-colors shrink-0"
        >
          <ArrowLeft size={18} />
          戻る
        </button>
        <div className="flex-1">
          <h1 className="font-bold text-[#17171c] text-[22px]">鍵編集</h1>
          <p className="text-[#6b7380] text-[13px] mt-0.5">鍵の登録情報を編集します</p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 bg-[#2663eb] text-white text-[13px] font-medium px-4 py-2.5 rounded-[8px] hover:bg-[#1d54d4] transition-colors"
        >
          <Save size={14} />
          更新する
        </button>
      </div>

      {/* 基本情報 */}
      <SectionCard title="基本情報">
        <div className="grid grid-cols-2 gap-5">
          <FormField label="鍵番号" required>
            <div className="flex gap-2">
              <input
                value={form.keyId}
                onChange={(e) => update('keyId', e.target.value)}
                placeholder="例：K-1001"
                className={inputClass}
              />
              <button className="shrink-0 border border-[#d1d6db] rounded-[8px] px-3 py-2 text-[12px] font-medium text-[#38404f] hover:bg-[#f2f5f5] transition-colors whitespace-nowrap">
                仮番取得
              </button>
            </div>
          </FormField>
          <FormField label="枝番" required>
            <div className="flex gap-2">
              <input
                value={form.branchNumber}
                onChange={(e) => update('branchNumber', e.target.value)}
                placeholder="01"
                className={inputClass}
              />
              <button className="shrink-0 border border-[#d1d6db] rounded-[8px] px-3 py-2 text-[12px] font-medium text-[#38404f] hover:bg-[#f2f5f5] transition-colors whitespace-nowrap">
                末番取得
              </button>
            </div>
          </FormField>
        </div>
      </SectionCard>

      {/* 物件情報 */}
      <SectionCard title="物件情報">
        <div className="grid grid-cols-2 gap-5">
          <FormField label="物件CD" required>
            <input
              value={form.propertyCode}
              onChange={(e) => update('propertyCode', e.target.value)}
              placeholder="例：P-2024-001"
              className={inputClass}
            />
          </FormField>
          <div />
          <FormField label="物件名">
            <input
              value={form.buildingName}
              onChange={(e) => update('buildingName', e.target.value)}
              placeholder="例：スカイハイツ渋谷"
              className={inputClass}
            />
          </FormField>
          <FormField label="部屋番号">
            <input
              value={form.roomNumber}
              onChange={(e) => update('roomNumber', e.target.value)}
              placeholder="例：302"
              className={inputClass}
            />
          </FormField>
          <FormField label="場所（屋上など）" className="col-span-2">
            <input
              value={form.location}
              onChange={(e) => update('location', e.target.value)}
              placeholder="例：エントランス"
              className={inputClass}
            />
          </FormField>
        </div>
      </SectionCard>

      {/* 鍵仕様 */}
      <SectionCard title="鍵仕様">
        <div className="grid grid-cols-2 gap-5">
          <FormField label="メーカー名">
            <input
              value={form.maker}
              onChange={(e) => update('maker', e.target.value)}
              placeholder="例：MIWA"
              className={inputClass}
            />
          </FormField>
          <FormField label="鍵タイプ">
            <SelectField
              value={form.keyType}
              onChange={(v) => update('keyType', v)}
              options={KEY_TYPES}
              placeholder="選択してください"
            />
          </FormField>
        </div>
        <label className="flex items-center gap-2 cursor-pointer w-fit">
          <div
            onClick={() => update('hasSpare', !form.hasSpare)}
            className={`size-4 rounded-[4px] border flex items-center justify-center transition-colors cursor-pointer ${
              form.hasSpare
                ? 'bg-[#2663eb] border-[#2663eb]'
                : 'bg-white border-[#d4d6db]'
            }`}
          >
            {form.hasSpare && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <span className="text-[#17171c] text-[14px]">スペアキー</span>
        </label>
      </SectionCard>

      {/* 保管情報 */}
      <SectionCard title="保管情報">
        <div className="grid grid-cols-2 gap-5">
          <FormField label="保管店舗">
            <SelectField
              value={form.storeBranch}
              onChange={(v) => update('storeBranch', v)}
              options={BRANCHES}
              placeholder="選択してください"
            />
          </FormField>
          <FormField label="金庫番号">
            <input
              value={form.safeNumber}
              onChange={(e) => update('safeNumber', e.target.value)}
              placeholder="例：S-01"
              className={inputClass}
            />
          </FormField>
        </div>
        <FormField label="グループ（複数選択可）">
          <div className="flex flex-wrap gap-x-6 gap-y-2.5 mt-1">
            {GROUPS.map((g) => (
              <label key={g} className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => toggleGroup(g)}
                  className={`size-4 rounded-[4px] border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                    form.groups.includes(g)
                      ? 'bg-[#2663eb] border-[#2663eb]'
                      : 'bg-white border-[#d4d6db]'
                  }`}
                >
                  {form.groups.includes(g) && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-[#17171c] text-[13px]">{g}</span>
              </label>
            ))}
          </div>
        </FormField>
        <FormField label="保管番号">
          <input
            value={form.storageNumber}
            onChange={(e) => update('storageNumber', e.target.value)}
            placeholder="例：001"
            className={`w-[200px] border border-[#d1d6db] rounded-[8px] px-3 py-2.5 text-[13px] text-[#17171c] placeholder:text-[#8c949e] focus:outline-none focus:border-[#2663eb] bg-white`}
          />
        </FormField>
      </SectionCard>

      {/* 受託・返却情報 */}
      <SectionCard title="受託・返却情報">
        <div className="grid grid-cols-2 gap-5">
          <FormField label="受託日">
            <input
              type="date"
              value={form.trustDate}
              onChange={(e) => update('trustDate', e.target.value)}
              className={inputClass}
            />
          </FormField>
          <FormField label="管理区分">
            <SelectField
              value={form.managementCategory}
              onChange={(v) => update('managementCategory', v)}
              options={MANAGEMENT_CATEGORIES}
            />
          </FormField>
        </div>
        <label className="flex items-center gap-2 cursor-pointer w-fit">
          <div
            onClick={() => update('ownerReturned', !form.ownerReturned)}
            className={`size-4 rounded-[4px] border flex items-center justify-center transition-colors cursor-pointer ${
              form.ownerReturned
                ? 'bg-[#2663eb] border-[#2663eb]'
                : 'bg-white border-[#d4d6db]'
            }`}
          >
            {form.ownerReturned && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <span className="text-[#17171c] text-[14px]">家主返却済み</span>
        </label>
        <FormField label="廃棄処理日">
          <input
            type="date"
            value={form.disposalDate}
            onChange={(e) => update('disposalDate', e.target.value)}
            className={`w-[200px] border border-[#d1d6db] rounded-[8px] px-3 py-2.5 text-[13px] text-[#17171c] focus:outline-none focus:border-[#2663eb] bg-white`}
          />
        </FormField>
      </SectionCard>

      {/* 備考 */}
      <SectionCard title="備考">
        <FormField label="鍵に対する備考">
          <textarea
            value={form.keyMemo}
            onChange={(e) => update('keyMemo', e.target.value)}
            placeholder="鍵に関する備考を入力してください"
            rows={3}
            className="w-full border border-[#d1d6db] rounded-[8px] px-3 py-2.5 text-[13px] text-[#17171c] placeholder:text-[#8c949e] focus:outline-none focus:border-[#2663eb] resize-none"
          />
        </FormField>
        <FormField label="物件・その他に対する備考">
          <textarea
            value={form.propertyMemo}
            onChange={(e) => update('propertyMemo', e.target.value)}
            placeholder="物件に関する備考を入力してください"
            rows={3}
            className="w-full border border-[#d1d6db] rounded-[8px] px-3 py-2.5 text-[13px] text-[#17171c] placeholder:text-[#8c949e] focus:outline-none focus:border-[#2663eb] resize-none"
          />
        </FormField>
      </SectionCard>

      {/* フッター */}
      <div className="flex justify-end gap-3 pt-2 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="w-[100px] h-[40px] border border-[#d1d6db] rounded-[6px] text-[14px] font-medium text-[#38404f] hover:bg-[#f2f5f5] transition-colors"
        >
          キャンセル
        </button>
        <button
          onClick={() => navigate(-1)}
          className="h-[40px] px-5 bg-[#2663eb] rounded-[6px] flex items-center justify-center gap-2 text-[14px] font-medium text-white hover:bg-[#1d54d4] transition-colors"
        >
          <Save size={14} />
          更新する
        </button>
      </div>

    </div>
  );
}
