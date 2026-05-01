import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, KeyRound, Save, ChevronDown, CheckCircle, X, Check } from 'lucide-react';

const BRANCHES = ['渋谷店', '新宿店', '目黒店', '品川店', '池袋店'];
const GROUPS = ['通常管理対象', '共用部', '延滞', '紛失', '管理非対象'];

const inputClass =
  'w-full border border-[#e5e8ed] rounded-[8px] px-3 py-[10px] text-[13px] text-[#17171c] placeholder:text-[#8c949e] focus:outline-none focus:border-[#2663eb] bg-white';

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

function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer w-fit">
      <div
        onClick={onChange}
        className={`size-4 rounded-[4px] border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
          checked ? 'bg-[#2663eb] border-[#2663eb]' : 'bg-white border-[#d4d6db]'
        }`}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span className="text-[#17171c] text-[13px]">{label}</span>
    </label>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#e5e8ed] rounded-[10px] p-4 flex flex-col gap-3">
      <p className="font-bold text-[#17171c] text-[18px]">{title}</p>
      {children}
    </div>
  );
}

export default function KeyRegister() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const initialForm = {
    keyId: '',
    branchNumber: '',
    propertyCode: '',
    buildingName: '',
    roomNumber: '',
    location: '',
    maker: '',
    keyType: '',
    hasSpare: false,
    storeBranch: '',
    safeNumber: '',
    groups: [] as string[],
    storageNumber: '',
    groupNumber: '',
    trustDate: '',
    managementCategory: '',
    ownerReturned: false,
    returnDate: '',
    disposalDate: '',
    keyMemo: '',
    propertyMemo: '',
  };

  const [form, setForm] = useState(initialForm);

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
          className="flex items-center justify-center size-6 text-[#17171c] hover:text-[#2663eb] transition-colors shrink-0"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <KeyRound size={22} className="text-[#17171c]" />
            <h1 className="font-bold text-[#17171c] text-[22px]">鍵登録</h1>
          </div>
          <p className="text-[#6b7380] text-[13px] mt-0.5">
            新しい鍵を登録します。保存後は「貸出可」ステータスで登録されます。
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 bg-[#2663eb] text-white text-[13px] font-medium px-[14px] py-[10px] rounded-[8px] hover:bg-[#1d54d4] transition-colors"
        >
          <Save size={14} />
          登録
        </button>
      </div>

      {/* 基本情報 */}
      <SectionCard title="基本情報">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="鍵番号" required>
            <div className="flex gap-2">
              <input
                value={form.keyId}
                onChange={(e) => update('keyId', e.target.value)}
                placeholder="例：K-1001"
                className={inputClass}
              />
              <button className="shrink-0 border border-[#e5e8ed] rounded-[8px] px-[14px] py-[10px] text-[13px] font-medium text-[#17171c] hover:bg-[#f2f5f5] transition-colors whitespace-nowrap">
                仮番取得
              </button>
            </div>
          </FormField>
          <FormField label="枝番">
            <div className="flex gap-2">
              <input
                value={form.branchNumber}
                onChange={(e) => update('branchNumber', e.target.value)}
                placeholder="例：01"
                className={inputClass}
              />
              <button className="shrink-0 border border-[#e5e8ed] rounded-[8px] px-[14px] py-[10px] text-[13px] font-medium text-[#17171c] hover:bg-[#f2f5f5] transition-colors whitespace-nowrap">
                末番取得
              </button>
            </div>
          </FormField>
        </div>
      </SectionCard>

      {/* 物件情報 */}
      <SectionCard title="物件情報">
        <FormField label="物件CD" required>
          <input
            value={form.propertyCode}
            onChange={(e) => update('propertyCode', e.target.value)}
            placeholder="例：P-2024-001"
            className={inputClass}
          />
        </FormField>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="物件名">
            <input
              value={form.buildingName}
              onChange={(e) => update('buildingName', e.target.value)}
              placeholder="例：サンライズマンション"
              className={inputClass}
            />
          </FormField>
          <FormField label="部屋番号">
            <input
              value={form.roomNumber}
              onChange={(e) => update('roomNumber', e.target.value)}
              placeholder="例：302号室"
              className={inputClass}
            />
          </FormField>
        </div>
        <FormField label="場所（屋上など）">
          <input
            value={form.location}
            onChange={(e) => update('location', e.target.value)}
            placeholder="例：屋上、駐輪場"
            className={inputClass}
          />
        </FormField>
      </SectionCard>

      {/* 鍵仕様 */}
      <SectionCard title="鍵仕様">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="メーカー名">
            <input
              value={form.maker}
              onChange={(e) => update('maker', e.target.value)}
              placeholder="例：MIWA、GOAL"
              className={inputClass}
            />
          </FormField>
          <FormField label="鍵タイプ">
            <input
              value={form.keyType}
              onChange={(e) => update('keyType', e.target.value)}
              placeholder="例：ディンプルキー"
              className={inputClass}
            />
          </FormField>
        </div>
        <Checkbox
          checked={form.hasSpare}
          onChange={() => update('hasSpare', !form.hasSpare)}
          label="スペアキー"
        />
      </SectionCard>

      {/* 保管情報 */}
      <SectionCard title="保管情報">
        <div className="grid grid-cols-2 gap-4">
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
          <div className="flex flex-wrap gap-x-6 gap-y-3 mt-1">
            {GROUPS.map((g) => (
              <Checkbox
                key={g}
                checked={form.groups.includes(g)}
                onChange={() => toggleGroup(g)}
                label={g}
              />
            ))}
          </div>
        </FormField>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="保管番号">
            <input
              value={form.storageNumber}
              onChange={(e) => update('storageNumber', e.target.value)}
              placeholder="例：001"
              className={inputClass}
            />
          </FormField>
          <FormField label="グループ番号">
            <input
              value={form.groupNumber}
              onChange={(e) => update('groupNumber', e.target.value)}
              placeholder="例：G-001"
              className={inputClass}
            />
          </FormField>
        </div>
      </SectionCard>

      {/* 受託・返却情報 */}
      <SectionCard title="受託・返却情報">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
          <FormField label="受託日">
            <input
              type="date"
              value={form.trustDate}
              onChange={(e) => update('trustDate', e.target.value)}
              className={inputClass}
            />
          </FormField>
          <FormField label="廃棄処理日">
            <input
              type="date"
              value={form.disposalDate}
              onChange={(e) => update('disposalDate', e.target.value)}
              className={inputClass}
            />
          </FormField>
        </div>
        <Checkbox
          checked={form.ownerReturned}
          onChange={() => update('ownerReturned', !form.ownerReturned)}
          label="家主返却済み"
        />
        {form.ownerReturned && (
          <FormField label="返却日">
            <input
              type="date"
              value={form.returnDate}
              onChange={(e) => update('returnDate', e.target.value)}
              className="w-full max-w-[220px] border border-[#e5e8ed] rounded-[8px] px-3 py-[10px] text-[13px] text-[#17171c] focus:outline-none focus:border-[#2663eb] bg-white"
            />
          </FormField>
        )}
      </SectionCard>

      {/* 備考 */}
      <SectionCard title="備考">
        <FormField label="鍵に対する備考">
          <textarea
            value={form.keyMemo}
            onChange={(e) => update('keyMemo', e.target.value)}
            placeholder="鍵に関する備考を入力"
            className="w-full h-[80px] border border-[#e5e8ed] rounded-[8px] px-3 py-[10px] text-[13px] text-[#17171c] placeholder:text-[#8c949e] focus:outline-none focus:border-[#2663eb] resize-none"
          />
        </FormField>
        <FormField label="物件・その他に対する備考">
          <textarea
            value={form.propertyMemo}
            onChange={(e) => update('propertyMemo', e.target.value)}
            placeholder="物件や他の情報に関する備考を入力"
            className="w-full h-[80px] border border-[#e5e8ed] rounded-[8px] px-3 py-[10px] text-[13px] text-[#17171c] placeholder:text-[#8c949e] focus:outline-none focus:border-[#2663eb] resize-none"
          />
        </FormField>
      </SectionCard>

      {/* フッター */}
      <div className="flex justify-end gap-4 pt-2 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="border border-[#e5e8ed] text-[#17171c] text-[13px] font-medium px-[14px] py-[10px] rounded-[8px] hover:bg-[#f2f5f5] transition-colors"
        >
          キャンセル
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 bg-[#2663eb] text-white text-[13px] font-medium px-[14px] py-[10px] rounded-[8px] hover:bg-[#1d54d4] transition-colors"
        >
          <Save size={14} />
          登録
        </button>
      </div>

      {/* 登録完了モーダル */}
      {showModal && (
        <div className="fixed inset-0 bg-[rgba(18,23,38,0.5)] flex items-center justify-center z-50">
          <div className="bg-white rounded-[12px] shadow-[0px_10px_30px_0px_rgba(0,0,0,0.2)] w-[480px] flex flex-col overflow-hidden">

            {/* ヘッダー */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-[#e5e8eb]">
              <div className="flex items-center justify-center size-10 rounded-full bg-[#f0fcf2] shrink-0">
                <CheckCircle size={20} className="text-[#17a34a]" />
              </div>
              <p className="font-semibold text-[#121726] text-[18px] flex-1">鍵を登録しました</p>
              <button
                onClick={() => setShowModal(false)}
                className="flex items-center justify-center size-8 rounded-[6px] hover:bg-[#f2f5f5] transition-colors"
              >
                <X size={18} className="text-[#6b7380]" />
              </button>
            </div>

            {/* ボディ */}
            <div className="flex flex-col gap-4 px-6 py-5">
              <p className="text-[#38404f] text-[14px]">
                新しい鍵が登録されました。以下の情報で登録されています。
              </p>
              <div className="bg-[#f0fcf2] border border-[#b2e5bf] rounded-[8px] p-4 flex flex-col gap-2 text-[13px]">
                <div className="flex gap-3">
                  <span className="text-[#4a5463]">鍵番号:</span>
                  <span className="font-semibold text-[#14803b]">{form.keyId || '—'}</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#4a5463]">建物名:</span>
                  <span className="font-medium text-[#121726]">{form.buildingName || '—'}</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#4a5463]">部屋番号:</span>
                  <span className="text-[#121726]">{form.roomNumber || '—'}</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#4a5463]">保管店舗:</span>
                  <span className="text-[#121726]">{form.storeBranch || '—'}</span>
                </div>
              </div>
              <p className="text-[#6b7380] text-[12px]">
                続けて別の鍵を登録する場合は「続けて登録」を、検索画面に戻る場合は「完了」をクリックしてください。
              </p>
            </div>

            {/* フッター */}
            <div className="flex items-center justify-end gap-3 px-6 py-5 border-t border-[#e5e8eb]">
              <button
                onClick={() => { setForm(initialForm); setShowModal(false); }}
                className="w-[100px] h-10 border border-[#d1d6db] rounded-[6px] text-[14px] font-medium text-[#38404f] hover:bg-[#f2f5f5] transition-colors"
              >
                続けて登録
              </button>
              <button
                onClick={() => navigate('/search')}
                className="w-[100px] h-10 flex items-center justify-center gap-2 bg-[#17a34a] rounded-[6px] text-[14px] font-medium text-white hover:bg-[#15913f] transition-colors"
              >
                <Check size={16} />
                完了
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
