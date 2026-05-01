import { FileText, X, Download } from 'lucide-react';

interface ReportOutputModalProps {
  count: number;
  onClose: () => void;
}

export default function ReportOutputModal({ count, onClose }: ReportOutputModalProps) {
  const fileName = `key_report_20260416.pdf`;

  return (
    <div
      className="fixed inset-0 bg-[rgba(18,23,38,0.5)] flex items-center justify-center z-50"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-[12px] shadow-[0px_10px_30px_0px_rgba(0,0,0,0.2)] w-[480px] flex flex-col overflow-hidden">

        {/* ヘッダー */}
        <div className="flex items-center gap-3 p-6 border-b border-[#e5e8eb]">
          <div className="bg-[#f0f5ff] rounded-full size-[40px] flex items-center justify-center shrink-0">
            <FileText size={20} className="text-[#2663eb]" />
          </div>
          <p className="font-semibold text-[#121726] text-[18px] flex-1">帳票を出力しました</p>
          <button
            onClick={onClose}
            className="size-[32px] flex items-center justify-center rounded-[6px] hover:bg-[#f2f5f5] transition-colors"
          >
            <X size={18} className="text-[#6b7380]" />
          </button>
        </div>

        {/* ボディ */}
        <div className="flex flex-col gap-4 p-6">
          <p className="text-[#38404f] text-[14px]">選択した{count}件の鍵情報を帳票として出力しました。</p>

          <div className="bg-[#fafafa] border border-[#e5e8eb] rounded-[8px] p-4 flex flex-col gap-2.5 text-[13px]">
            <div className="flex gap-3">
              <span className="text-[#6b7380] shrink-0">ファイル名:</span>
              <span className="font-medium text-[#121726]">{fileName}</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[#6b7380] shrink-0">出力件数:</span>
              <span className="font-semibold text-[#121726]">{count}件</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[#6b7380] shrink-0">ファイルサイズ:</span>
              <span className="text-[#121726]">256 KB</span>
            </div>
          </div>

          <p className="text-[#6b7380] text-[12px]">
            ダウンロードが自動的に開始されない場合は下のボタンからダウンロードしてください。
          </p>
        </div>

        {/* フッター */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-[#e5e8eb]">
          <button
            onClick={onClose}
            className="w-[100px] h-[40px] border border-[#d1d6db] rounded-[6px] text-[14px] font-medium text-[#38404f] hover:bg-[#f2f5f5] transition-colors"
          >
            閉じる
          </button>
          <button
            onClick={onClose}
            className="h-[40px] px-5 bg-[#2663eb] rounded-[6px] flex items-center justify-center gap-2 text-[14px] font-medium text-white hover:bg-[#1d54d4] transition-colors whitespace-nowrap"
          >
            <Download size={16} />
            ダウンロード
          </button>
        </div>

      </div>
    </div>
  );
}
