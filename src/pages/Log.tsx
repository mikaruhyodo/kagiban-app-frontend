import { useState } from 'react';
import { FileText, Search, Filter, ChevronDown, X, Download } from 'lucide-react';
import { mockLogs } from '../data/mock-data';

const ACTIONS = ['全てのアクション', '返却確定', '返却催促', '利用開始', '予約を作成', '予約をキャンセル', 'ステータス手動是正'];

type SearchTab = '鍵番号' | '営業ID / ユーザー名' | '建物名';

// アクションバッジの色定義
function ActionBadge({ action }: { action: string }) {
  let bg = '#f0f5ff';
  let color = '#2663eb';
  if (action === '予約をキャンセル') { bg = '#fcf2f2'; color = '#db2626'; }
  else if (action === '返却催促' || action === 'ステータス手動是正') { bg = '#f2f2f7'; color = '#6b7380'; }
  return (
    <span
      className="inline-flex items-center px-[10px] py-[4px] rounded-[6px] text-[11px] font-medium whitespace-nowrap"
      style={{ backgroundColor: bg, color }}
    >
      {action}
    </span>
  );
}

// CSVエクスポート完了モーダル
function CsvModal({ onClose }: { onClose: () => void }) {
  const today = '20260415';
  return (
    <div className="fixed inset-0 bg-[rgba(18,23,38,0.5)] flex items-center justify-center z-50">
      <div className="bg-white rounded-[12px] shadow-[0px_10px_30px_0px_rgba(0,0,0,0.2)] w-[480px] flex flex-col overflow-hidden">

        {/* ヘッダー */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-[#e5e8eb]">
          <div className="flex items-center justify-center size-10 rounded-full bg-[#f0fcf2] shrink-0">
            <Download size={20} className="text-[#17a34a]" />
          </div>
          <p className="font-semibold text-[#121726] text-[18px] flex-1">CSVエクスポート完了</p>
          <button
            onClick={onClose}
            className="flex items-center justify-center size-8 rounded-[6px] hover:bg-[#f2f5f5] transition-colors"
          >
            <X size={18} className="text-[#6b7380]" />
          </button>
        </div>

        {/* ボディ */}
        <div className="flex flex-col gap-4 px-6 py-5">
          <p className="text-[#38404f] text-[14px]">ログデータをCSV形式でエクスポートしました。</p>
          <div className="bg-[#fafafa] border border-[#e5e8eb] rounded-[8px] p-4 flex flex-col gap-2.5 text-[13px]">
            <div className="flex gap-3">
              <span className="text-[#6b7380]">ファイル名:</span>
              <span className="font-medium text-[#121726]">log_export_{today}.csv</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[#6b7380]">期間:</span>
              <span className="text-[#121726]">2026/01/01 - 2026/04/15</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[#6b7380]">レコード数:</span>
              <span className="font-semibold text-[#121726]">{mockLogs.length}件</span>
            </div>
          </div>
        </div>

        {/* フッター */}
        <div className="flex items-center justify-end gap-3 px-6 py-5 border-t border-[#e5e8eb]">
          <button
            onClick={onClose}
            className="w-[100px] h-10 border border-[#d1d6db] rounded-[6px] text-[14px] font-medium text-[#38404f] hover:bg-[#f2f5f5] transition-colors"
          >
            閉じる
          </button>
          <button
            onClick={onClose}
            className="w-[120px] h-10 flex items-center justify-center gap-2 bg-[#17a34a] rounded-[6px] text-[14px] font-medium text-white hover:bg-[#15913f] transition-colors"
          >
            <Download size={16} />
            ダウンロード
          </button>
        </div>

      </div>
    </div>
  );
}

export default function Log() {
  const [searchTab, setSearchTab] = useState<SearchTab>('鍵番号');
  const [query, setQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('全てのアクション');
  const [showCsvModal, setShowCsvModal] = useState(false);

  const tabs: SearchTab[] = ['鍵番号', '営業ID / ユーザー名', '建物名'];

  const filtered = mockLogs.filter((log) => {
    const q = query.trim().toLowerCase();
    const matchAction = actionFilter === '全てのアクション' || log.action === actionFilter;
    if (!matchAction) return false;
    if (!q) return true;
    if (searchTab === '鍵番号') return log.keyId.toLowerCase().includes(q);
    if (searchTab === '営業ID / ユーザー名') return log.employeeCode.toLowerCase().includes(q) || log.user.includes(q);
    if (searchTab === '建物名') return log.buildingName.includes(q);
    return true;
  });

  const placeholder =
    searchTab === '鍵番号' ? '鍵番号を入力（例: K-1001）' :
    searchTab === '営業ID / ユーザー名' ? '営業IDまたはユーザー名を入力' :
    '建物名を入力';

  return (
    <div className="bg-[#fafafc] p-5 flex flex-col gap-4 min-h-full">

      {/* タイトル */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <FileText size={22} className="text-[#17171c]" />
          <h1 className="font-bold text-[#17171c] text-[22px]">ログ</h1>
        </div>
        <p className="text-[#6b7380] text-[13px]">全ての操作履歴を確認できます</p>
      </div>

      {/* フィルターバー */}
      <div className="bg-white border border-[#e5e8ed] rounded-[10px] p-4">
        <div className="flex items-center gap-4">
          {/* タブ */}
          <div className="flex items-center gap-2 shrink-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => { setSearchTab(tab); setQuery(''); }}
                className={`px-[14px] py-[8px] rounded-[8px] text-[12px] font-medium transition-colors ${
                  searchTab === tab
                    ? 'bg-[#2663eb] text-white'
                    : 'border border-[#e5e8ed] text-[#17171c] hover:bg-[#f2f5f5]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 検索 */}
          <div className="flex-1 flex items-center gap-2 border border-[#e5e8ed] rounded-[8px] px-3 py-[10px] bg-white">
            <Search size={16} className="text-[#8c949e] shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="flex-1 text-[13px] text-[#17171c] placeholder:text-[#8c949e] focus:outline-none bg-transparent"
            />
          </div>

          {/* アクションフィルター */}
          <div className="flex items-center gap-2 shrink-0">
            <Filter size={20} className="text-[#6b7380]" />
            <div className="relative">
              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
                className="appearance-none w-[200px] border border-[#e5e8ed] rounded-[8px] px-3 pr-8 py-[10px] text-[13px] text-[#17171c] focus:outline-none focus:border-[#2663eb] cursor-pointer bg-white"
              >
                {ACTIONS.map((a) => <option key={a}>{a}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6b7380] pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* テーブル */}
      <div className="bg-white border border-[#e5e8ed] rounded-[10px] overflow-hidden">
        {/* ヘッダー */}
        <div className="bg-[#f5f7fa] border-b border-[#e5e8ed] flex items-center px-4 py-3">
          <div className="w-[180px] shrink-0">
            <span className="font-semibold text-[#6b7380] text-[12px]">日時</span>
          </div>
          <div className="w-[150px] shrink-0">
            <span className="font-semibold text-[#6b7380] text-[12px]">アクション</span>
          </div>
          <div className="w-[170px] shrink-0">
            <span className="font-semibold text-[#6b7380] text-[12px]">ユーザー</span>
          </div>
          <div className="w-[110px] shrink-0">
            <span className="font-semibold text-[#6b7380] text-[12px]">鍵番号</span>
          </div>
          <div className="w-[190px] shrink-0">
            <span className="font-semibold text-[#6b7380] text-[12px]">建物名</span>
          </div>
          <div className="flex-1">
            <span className="font-semibold text-[#6b7380] text-[12px]">詳細</span>
          </div>
        </div>

        {/* 行 */}
        {filtered.map((log) => (
          <div
            key={log.id}
            className="bg-white border-b border-[#e5e8ed] flex items-center px-4 py-[9px] hover:bg-[#fafafc] transition-colors"
          >
            <div className="w-[180px] shrink-0">
              <span className="text-[#17171c] text-[12px]">{log.date}</span>
            </div>
            <div className="w-[150px] shrink-0">
              <ActionBadge action={log.action} />
            </div>
            <div className="w-[170px] shrink-0 flex flex-col gap-0.5">
              <span className="text-[#17171c] text-[13px]">{log.user}</span>
              <span className="text-[#8c949e] text-[11px]">{log.employeeCode}</span>
            </div>
            <div className="w-[110px] shrink-0">
              <span className="font-bold text-[#17171c] text-[13px]">{log.keyId}</span>
            </div>
            <div className="w-[190px] shrink-0">
              <span className="text-[#17171c] text-[12px]">{log.buildingName}</span>
            </div>
            <div className="flex-1">
              <span className="text-[#6b7380] text-[12px]">{log.detail}</span>
            </div>
          </div>
        ))}
      </div>

      {/* フッター */}
      <div className="flex items-center justify-between">
        <p className="text-[#6b7380] text-[13px]">{filtered.length} 件のログを表示中</p>
        <button
          onClick={() => setShowCsvModal(true)}
          className="border border-[#e5e8ed] text-[#17171c] text-[12px] font-medium px-[14px] py-[8px] rounded-[8px] hover:bg-[#f2f5f5] transition-colors"
        >
          CSVエクスポート
        </button>
      </div>

      {/* CSVモーダル */}
      {showCsvModal && <CsvModal onClose={() => setShowCsvModal(false)} />}

    </div>
  );
}
