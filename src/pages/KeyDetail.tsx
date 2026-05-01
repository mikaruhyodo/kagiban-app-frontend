import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Pencil, Info, User, Calendar, Check, AlertTriangle, TriangleAlert } from 'lucide-react';
import { mockKeys, mockLogs } from '../data/mock-data';
import type { KeyStatus } from '../types';
import ReturnConfirmModal from '../components/ReturnConfirmModal';
import StatusCorrectionModal from '../components/StatusCorrectionModal';

const statusBadge: Record<KeyStatus, { bg: string; text: string }> = {
  '利用中':    { bg: 'bg-[#f0fcf2]', text: 'text-[#218a40]' },
  '予約確定':  { bg: 'bg-[#f7f2ff]', text: 'text-[#8c4ad9]' },
  '未返却':    { bg: 'bg-[#fcf2f2]', text: 'text-[#db2626]' },
  '返却確認中':{ bg: 'bg-[#f0f5ff]', text: 'text-[#2663eb]' },
  '貸出可':   { bg: 'bg-[#f2f5f5]', text: 'text-[#4d5466]' },
  '返却完了':  { bg: 'bg-[#f2f5f5]', text: 'text-[#4d5466]' },
  '管理中':   { bg: 'bg-[#f2f5f5]', text: 'text-[#4d5466]' },
  '予約不可': { bg: 'bg-[#f2f5f5]', text: 'text-[#4d5466]' },
};

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[#8c949e] text-[12px]">{label}</p>
      <p className="text-[#17171c] text-[16px]">{value || '—'}</p>
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#e5e8ed] rounded-[10px] p-6 flex flex-col gap-4">
      <p className="font-bold text-[#17171c] text-[18px]">{title}</p>
      {children}
    </div>
  );
}

export default function KeyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const key = mockKeys.find((k) => k.id === id);

  if (!key) {
    return (
      <div className="p-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#38404f] text-[13px] mb-6 hover:text-[#2663eb]">
          <ArrowLeft size={16} /> 戻る
        </button>
        <p className="text-[#6b7380]">鍵が見つかりません</p>
      </div>
    );
  }

  const logs = mockLogs.filter((l) => l.keyId === key.id);
  const badge = statusBadge[key.status];
  const isUnreturned = key.status === '未返却';
  const isReturning = key.status === '返却確認中';

  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  return (
    <div className="bg-[#fafafc] p-8 flex flex-col gap-6 min-h-full">
      {showReturnModal && (
        <ReturnConfirmModal
          keyItem={key}
          onClose={() => setShowReturnModal(false)}
          onConfirm={() => setShowReturnModal(false)}
        />
      )}
      {showStatusModal && (
        <StatusCorrectionModal
          keyItem={key}
          onClose={() => setShowStatusModal(false)}
          onConfirm={() => setShowStatusModal(false)}
        />
      )}

      {/* タイトル行 */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 px-2 py-1.5 rounded-[6px] text-[#38404f] text-[14px] font-medium hover:bg-[#f2f5f5] transition-colors shrink-0"
        >
          <ArrowLeft size={18} />
          戻る
        </button>
        <h1 className="flex-1 font-bold text-[#17171c] text-[30px]">鍵詳細</h1>
        <button
          onClick={() => navigate(`/keys/detail/${key.id}/edit`)}
          className="flex items-center gap-1.5 bg-[#2663eb] text-white text-[12px] font-medium px-3.5 py-2 rounded-[8px] hover:bg-[#1d54d4] transition-colors"
        >
          <Pencil size={14} />
          編集
        </button>
      </div>

      {/* ナビゲーションヒント */}
      <div className="bg-[#f0f5ff] border border-[#dbe8ff] rounded-[6px] px-3 py-2 flex items-center gap-2">
        <Info size={14} className="text-[#1c4fd9] shrink-0" />
        <p className="text-[#1c4fd9] text-[12px]">
          「戻る」ボタンは遷移元の画面に戻ります（利用中 / 予約中 / 未返却 / 返却確認中 / 検索 / ダッシュボード）
        </p>
      </div>

      {/* 2カラム */}
      <div className="flex gap-6 items-start">

        {/* ── 左カラム ── */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">

          {/* 基本情報 */}
          <SectionCard title="基本情報">
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-1.5">
                <p className="text-[#8c949e] text-[12px]">鍵番号 <span className="text-[#db2626]">*</span></p>
                <p className="font-bold text-[#17171c] text-[18px]">{key.id}</p>
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <p className="text-[#8c949e] text-[12px]">枝番 <span className="text-[#db2626]">*</span></p>
                <p className="font-bold text-[#17171c] text-[18px]">01</p>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-[#8c949e] text-[12px]">現在のステータス</p>
              <span className={`${badge.bg} ${badge.text} text-[14px] font-medium px-4 py-1.5 rounded-[6px] w-fit`}>
                {key.status}
              </span>
            </div>
          </SectionCard>

          {/* 物件情報 */}
          <SectionCard title="物件情報">
            <Field label="物件CD *" value="P-2024-001" />
            <div className="flex gap-4">
              <div className="flex-1"><Field label="物件名" value={key.buildingName} /></div>
              <div className="flex-1"><Field label="部屋番号" value={`${key.roomNumber}号室`} /></div>
            </div>
            <Field label="場所（屋上など）" value={null} />
          </SectionCard>

          {/* 鍵仕様 */}
          <SectionCard title="鍵仕様">
            <div className="flex gap-4">
              <div className="flex-1"><Field label="メーカー名" value="MIWA" /></div>
              <div className="flex-1"><Field label="鍵タイプ" value={key.keyType} /></div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="size-4 rounded-[4px] border border-[#d4d6db] bg-white shrink-0" />
              <span className="text-[#17171c] text-[14px]">スペアキー</span>
            </label>
          </SectionCard>

          {/* 保管情報 */}
          <SectionCard title="保管情報">
            <div className="flex gap-4">
              <div className="flex-1"><Field label="保管店舗" value={key.storeBranch} /></div>
              <div className="flex-1"><Field label="金庫番号" value="S-01" /></div>
            </div>
            <Field label="グループ（複数選択可）" value="通常管理対象、延滞" />
            <Field label="保管番号" value="001" />
          </SectionCard>

          {/* 受託・返却情報 */}
          <SectionCard title="受託・返却情報">
            <div className="flex gap-4">
              <div className="flex-1"><Field label="受託日" value="2024-04-01" /></div>
              <div className="flex-1"><Field label="管理区分" value="通常管理" /></div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="size-4 rounded-[4px] border border-[#d4d6db] bg-white shrink-0" />
              <span className="text-[#17171c] text-[14px]">家主返却済み</span>
            </label>
            <Field label="廃棄処理日" value={null} />
          </SectionCard>

          {/* 備考 */}
          <SectionCard title="備考">
            <div className="flex flex-col gap-1.5">
              <p className="text-[#8c949e] text-[12px]">鍵に対する備考</p>
              <div className="bg-[#f7f7fa] rounded-[6px] p-3">
                <p className="text-[#17171c] text-[13px]">{key.memo || 'スペアなし。紛失注意。'}</p>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-[#8c949e] text-[12px]">物件・その他に対する備考</p>
              <div className="bg-[#f7f7fa] rounded-[6px] p-3">
                <p className="text-[#8c949e] text-[13px]">—</p>
              </div>
            </div>
          </SectionCard>

          {/* 現在の予約情報 */}
          {key.reservedBy && (
            <SectionCard title="現在の予約情報">
              <div className="flex items-start gap-3">
                <User size={18} className="text-[#6b7380] shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <p className="text-[#8c949e] text-[12px]">利用者</p>
                  <p className="text-[#17171c] text-[14px] font-medium">{key.reservedBy}</p>
                  <p className="text-[#8c949e] text-[11px]">U001</p>
                </div>
              </div>
              <div className="h-px bg-[#e5e8ed]" />
              <div className="flex items-start gap-3">
                <Calendar size={18} className="text-[#6b7380] shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <p className="text-[#8c949e] text-[12px]">予約日時</p>
                  <p className="text-[#17171c] text-[14px] font-medium">
                    {key.dueDate ? `${key.dueDate} 08:00〜10:00` : '—'}
                  </p>
                </div>
              </div>
            </SectionCard>
          )}

          {/* 利用履歴タイムライン */}
          <SectionCard title="利用履歴タイムライン">
            {logs.length === 0 ? (
              <p className="text-[#8c949e] text-[13px]">操作履歴がありません</p>
            ) : (
              <div className="flex flex-col gap-4 px-4">
                {logs.map((log, i) => (
                  <div key={log.id} className="flex gap-3">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="size-2.5 rounded-full bg-[#2663eb] mt-1" />
                      {i < logs.length - 1 && <div className="w-px flex-1 bg-[#e5e8ed] mt-1" />}
                    </div>
                    <div className="flex-1 bg-[#f7f7fa] rounded-[8px] p-3 flex flex-col gap-1 mb-1">
                      <div className="flex items-center justify-between">
                        <p className="text-[#17171c] text-[13px] font-medium">{log.action}</p>
                        <p className="text-[#8c949e] text-[11px]">{log.date}</p>
                      </div>
                      <p className="text-[#6b7380] text-[11px]">{log.user}</p>
                      {log.detail && (
                        <div className="bg-white rounded-[4px] p-2 mt-1">
                          <p className="text-[#6b7380] text-[11px]">{log.detail}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>

        </div>

        {/* ── 右カラム ── */}
        <div className="w-[320px] shrink-0 flex flex-col gap-4">

          {/* 管理者アクション */}
          <SectionCard title="管理者アクション">
            {(isUnreturned || isReturning) && (
              <button
                onClick={() => setShowReturnModal(true)}
                className="flex items-center justify-center gap-2 bg-[#2663eb] text-white text-[13px] font-medium px-3.5 py-2.5 rounded-[8px] w-full hover:bg-[#1d54d4] transition-colors"
              >
                <Check size={14} />
                返却確定
              </button>
            )}
            <button
              onClick={() => setShowStatusModal(true)}
              className="flex items-center justify-center gap-2 border border-[#e5e8ed] text-[#17171c] text-[13px] font-medium px-3.5 py-2.5 rounded-[8px] w-full hover:bg-[#f2f5f5] transition-colors"
            >
              <TriangleAlert size={14} className="text-[#cc910a]" />
              ステータス手動是正
            </button>
            <div className="h-px bg-[#e5e8ed]" />
            <div className="bg-[#fffae0] border border-[#fce58c] rounded-[8px] p-3 flex flex-col gap-1.5">
              <AlertTriangle size={16} className="text-[#80590d]" />
              <p className="text-[#80590d] text-[12px] font-medium">注意事項</p>
              <p className="text-[#80590d] text-[11px]">• 操作は全てログに記録されます</p>
              <p className="text-[#80590d] text-[11px]">• 対象者に自動で通知が送信されます</p>
            </div>
          </SectionCard>

          {/* 未返却警告（未返却のみ） */}
          {isUnreturned && (
            <div className="bg-[#fcf2f2] border border-[#facccc] rounded-[10px] p-6 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <AlertTriangle size={20} className="text-[#db2626]" />
                <p className="font-bold text-[#801a1a] text-[16px]">未返却警告</p>
              </div>
              <p className="text-[#993333] text-[12px]">
                返却期限を過ぎています。利用者に返却催促を送信してください。
              </p>
              <button className="bg-[#db2626] text-white text-[13px] font-medium px-3.5 py-2.5 rounded-[8px] w-full hover:bg-[#c01f1f] transition-colors">
                返却催促を送信
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
