import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { mockKeys } from '../data/mock-data';
import type { Key, KeyStatus } from '../types';

const statusBadge: Record<KeyStatus, { bg: string; text: string }> = {
  '利用中':    { bg: 'bg-[#f0fcf2]', text: 'text-[#218a40]' },
  '未返却':    { bg: 'bg-[#fcf2f2]', text: 'text-[#db2626]' },
  '返却確認中':{ bg: 'bg-[#f0f5ff]', text: 'text-[#2663eb]' },
  '貸出可':   { bg: 'bg-[#f2f5f5]', text: 'text-[#4d5466]' },
  '予約確定':  { bg: 'bg-[#f7f2ff]', text: 'text-[#8c4ad9]' },
  '返却完了':  { bg: 'bg-[#f2f5f5]', text: 'text-[#4d5466]' },
  '管理中':    { bg: 'bg-[#f2f5f5]', text: 'text-[#4d5466]' },
  '予約不可':  { bg: 'bg-[#fdf2f8]', text: 'text-[#9d174d]' },
};

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[#8c949e] text-[11px]">{label}</p>
      <p className="text-[#17171c] text-[13px]">{value || '—'}</p>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <p className="font-semibold text-[#17171c] text-[13px] border-b border-[#e5e8ed] pb-2 mb-3">{title}</p>;
}

function KeyCard({ keyItem }: { keyItem: Key }) {
  const badge = statusBadge[keyItem.status];

  return (
    <div className="bg-white border border-[#e5e8ed] rounded-[10px] overflow-hidden">
      {/* ヘッダー */}
      <div className="flex items-center gap-4 px-5 py-4 border-b border-[#e5e8ed]">
        <p className="font-bold text-[#17171c] text-[15px] shrink-0">{keyItem.id}</p>
        <p className="text-[#6b7380] text-[13px] truncate">{keyItem.buildingName} {keyItem.roomNumber}号室</p>
        <span className={`${badge.bg} ${badge.text} text-[11px] font-medium px-[10px] py-1 rounded-[6px] shrink-0`}>
          {keyItem.status}
        </span>
        <p className="text-[#8c949e] text-[12px] shrink-0">{keyItem.storeBranch}</p>
      </div>

      {/* 詳細（常時表示） */}
      <div className="px-5 py-5 grid grid-cols-3 gap-6">

        {/* 基本情報 */}
        <div>
          <SectionTitle title="基本情報" />
          <div className="flex flex-col gap-3">
            <Field label="鍵番号" value={keyItem.id} />
            <Field label="現在のステータス" value={keyItem.status} />
          </div>
        </div>

        {/* 物件情報 */}
        <div>
          <SectionTitle title="物件情報" />
          <div className="flex flex-col gap-3">
            <Field label="物件名" value={keyItem.buildingName} />
            <Field label="部屋番号" value={keyItem.roomNumber ? `${keyItem.roomNumber}号室` : null} />
            <Field label="住所" value={keyItem.address} />
          </div>
        </div>

        {/* 鍵仕様 */}
        <div>
          <SectionTitle title="鍵仕様" />
          <div className="flex flex-col gap-3">
            <Field label="鍵タイプ" value={keyItem.keyType} />
            <Field label="総本数" value={keyItem.totalKeys != null ? `${keyItem.totalKeys}本` : null} />
            <Field label="スペアキー" value={keyItem.spareKeys != null ? `${keyItem.spareKeys}本` : null} />
          </div>
        </div>

        {/* 保管情報 */}
        <div>
          <SectionTitle title="保管情報" />
          <div className="flex flex-col gap-3">
            <Field label="保管店舗" value={keyItem.storeBranch} />
            <Field label="カテゴリ" value={keyItem.category} />
          </div>
        </div>

        {/* 受託・返却情報 */}
        <div>
          <SectionTitle title="受託・返却情報" />
          <div className="flex flex-col gap-3">
            <Field label="管理区分" value={keyItem.category} />
            <Field label="契約会社" value={keyItem.contractCompany} />
            <Field label="受託日" value="—" />
            <Field label="家主返却済み" value="—" />
          </div>
        </div>

        {/* 備考 */}
        <div>
          <SectionTitle title="備考" />
          <div className="flex flex-col gap-3">
            <Field label="鍵に対する備考" value={keyItem.memo} />
            <Field label="物件・その他に対する備考" value="—" />
          </div>
        </div>

      </div>
    </div>
  );
}

export default function AllKeysDetail() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fafafc] p-8 flex flex-col gap-5 min-h-full">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-[#4a5463] text-[13px] hover:text-[#2663eb] transition-colors w-fit"
      >
        <ArrowLeft size={16} />
        検索に戻る
      </button>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-[#17171c] text-[24px]">すべての鍵一覧</h1>
          <p className="text-[#6b7380] text-[13px] mt-1">全 {mockKeys.length} 件</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {mockKeys.map((key) => (
          <KeyCard key={key.id} keyItem={key} />
        ))}
      </div>
    </div>
  );
}
