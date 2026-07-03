import React from 'react'
import { Eye } from 'lucide-react'

export default function SplashScreen({ onNavigate }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-between p-8 bg-gradient-to-b from-white via-blue-50/50 to-indigo-50/70 cursor-pointer select-none"
      onClick={() => onNavigate('login')}
    >
      {/* 상단 장식 영역 */}
      <div className="w-full flex justify-between items-center text-blue-500/60 text-[10px] font-bold tracking-widest uppercase">
        <span>Clinical Standard</span>
        <span>v1.2.0</span>
      </div>

      {/* 중앙 메인 로고 및 의료 기기 엠블럼 */}
      <div className="flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-700">
        {/* 전문적인 의료 기기 아이콘 쉴드 */}
        <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20 mb-6 relative">
          <Eye size={40} className="stroke-[2]" />
          {/* 빛나는 펄스 원 효과 */}
          <div className="absolute -inset-1 rounded-3xl bg-blue-500/20 animate-ping -z-10"></div>
        </div>

        {/* 메인 타이틀 */}
        <h1 className="text-4xl font-black tracking-wider bg-gradient-to-b from-blue-600 to-indigo-800 bg-clip-text text-transparent">
          OPTO-M
        </h1>
        
        {/* 서브 타이틀 */}
        <p className="text-xs font-semibold text-slate-500 mt-2 tracking-wide uppercase">
          Smart Glaucoma Care System
        </p>
        <div className="w-12 h-1 bg-blue-500 rounded-full mx-auto mt-4"></div>
      </div>

      {/* 하단 터치 가이드 및 푸터 */}
      <div className="flex flex-col items-center gap-6">
        <p className="text-[11px] font-bold text-blue-600 animate-pulse bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
          화면을 터치하시면 시작합니다
        </p>
        <span className="text-[9px] text-slate-400 font-medium tracking-tight">
          Developed in compliance with medical device standards.
        </span>
      </div>
    </div>
  )
}
