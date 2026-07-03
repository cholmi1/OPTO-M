import React from 'react'
import { Eye, Droplets, Activity, ClipboardList } from 'lucide-react'

export default function CoverScreen({ onNavigate }) {
  const menuItems = [
    {
      id: 'menu',
      title: '안압측정',
      desc: 'TONO-i 안압계 측정 및 관리',
      icon: Eye,
      gradient: 'from-purple-500 to-indigo-600',
      shadow: 'shadow-purple-500/20'
    },
    {
      id: 'idrop',
      title: '점안관리',
      desc: '스마트 점안 기기 및 준수 현황',
      icon: Droplets,
      gradient: 'from-teal-400 to-emerald-600',
      shadow: 'shadow-emerald-500/20'
    },
    {
      id: 'bio',
      title: '생체신호',
      desc: '혈압, 혈당, 수면 등 건강 지표',
      icon: Activity,
      gradient: 'from-pink-500 to-rose-600',
      shadow: 'shadow-rose-500/20'
    },
    {
      id: 'survey',
      title: '문진표',
      desc: '생활습관 정기 문진 및 피드백',
      icon: ClipboardList,
      gradient: 'from-amber-400 to-orange-600',
      shadow: 'shadow-orange-500/20'
    }
  ]

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white p-6 justify-between select-none">
      {/* 상단 로고 영역 */}
      <div className="text-center mt-6">
        <h1 className="text-3xl font-black tracking-wider bg-gradient-to-r from-blue-400 via-indigo-400 to-teal-400 bg-clip-text text-transparent drop-shadow-sm">
          OPTO-M
        </h1>
        <p className="text-xs font-semibold text-slate-400 mt-1">
          통합 녹내장 관리 솔루션
        </p>
      </div>

      {/* 중앙 메뉴 버튼 그리드 */}
      <div className="flex flex-col gap-4 my-6">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="w-full flex items-center p-4 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all duration-300 group cursor-pointer active:scale-[0.98] text-left hover:border-white/20"
            >
              {/* 그라데이션 아이콘 박스 */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg ${item.shadow} group-hover:scale-105 transition-transform duration-300`}>
                <Icon size={28} className="stroke-[2.5]" />
              </div>

              {/* 텍스트 내용 */}
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-bold text-white group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* 화살표 장식 */}
              <div className="text-slate-500 group-hover:text-slate-300 transition-colors mr-2">
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          )
        })}
      </div>

      {/* 하단 정보 영역 */}
      <div className="text-center mb-2">
        <p className="text-[10px] text-slate-600 font-medium">
          © CNV Biotech. All Rights Reserved.
        </p>
      </div>
    </div>
  )
}
