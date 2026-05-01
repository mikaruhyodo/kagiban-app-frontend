import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1d4ed8] to-[#2563eb] flex items-center justify-center p-4">
      <div className="w-full max-w-[400px] flex flex-col gap-6">

        {/* ロゴ */}
        <div className="flex flex-col items-center gap-3">
          <div className="bg-white/20 rounded-2xl size-16 flex items-center justify-center">
            <KeyRound size={32} className="text-white" />
          </div>
          <div className="text-center">
            <p className="text-white font-bold text-[28px] leading-tight">カギバン</p>
            <p className="text-white/70 text-[13px] mt-1">鍵管理システム</p>
          </div>
        </div>

        {/* フォームカード */}
        <div className="bg-white rounded-2xl p-8 shadow-xl flex flex-col gap-5">
          <p className="font-bold text-[#111827] text-[18px]">ログイン</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* メールアドレス */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[#374151]">
                メールアドレス
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@company.com"
                autoComplete="email"
                className="w-full border border-[#d1d5db] rounded-[8px] px-3 py-[10px] text-[14px] text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]"
              />
            </div>

            {/* パスワード */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[#374151]">
                パスワード
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="パスワードを入力"
                  autoComplete="current-password"
                  className="w-full border border-[#d1d5db] rounded-[8px] px-3 pr-10 py-[10px] text-[14px] text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#6b7280]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* ログインボタン */}
            <button
              type="submit"
              className="w-full bg-[#2563eb] text-white rounded-[8px] py-[11px] text-[14px] font-semibold hover:bg-[#1d4ed8] transition-colors flex items-center justify-center mt-1"
            >
              ログイン
            </button>
          </form>
        </div>

        {/* 権限の説明 */}
        <div className="flex items-center justify-center gap-6 text-white/60 text-[12px]">
          <span>管理者 → PC管理画面</span>
          <span>|</span>
          <span>一般ユーザー → 営業用アプリ</span>
        </div>
      </div>
    </div>
  );
}
