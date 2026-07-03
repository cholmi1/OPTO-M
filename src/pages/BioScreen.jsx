import React, { useState, useEffect } from 'react'
import { ChevronLeft, RefreshCw, Edit3 } from 'lucide-react'

// 초기 기본 바이오 데이터
const DEFAULT_BIO_DATA = {
  bloodPressureMax: 120,
  bloodPressureMin: 80,
  bloodPressureTime: '26년 07월 03일 14시',
  bloodGlucose: 100,
  bloodGlucoseTime: '26년 07월 03일 12시',
  stepCount: 0,
  stepCountTime: '26년 07월 03일 10시',
  sleepHours: 0,
  sleepMinutes: 0,
  sleepTime: '26년 07월 03일 08시',
  foodCalories: 0,
  foodCaloriesTime: '26년 07월 03일 13시',
  heartRate: 0,
  heartRateTime: '26년 07월 03일 11시'
}

export default function BioScreen({ onNavigate }) {
  const [bioData, setBioData] = useState(() => {
    const saved = localStorage.getItem('tono_i_bio_data')
    return saved ? JSON.parse(saved) : DEFAULT_BIO_DATA
  })

  // 모달 상태
  const [activeModal, setActiveModal] = useState(null) // 'bloodPressure', 'bloodGlucose', 'stepCount', 'sleep', 'food', 'heartRate'
  const [tempValues, setTempValues] = useState({})

  useEffect(() => {
    localStorage.setItem('tono_i_bio_data', JSON.stringify(bioData))
  }, [bioData])

  // 현재 날짜/시간 포맷 생성 함수 (YY년 MM월 DD일 HH시)
  const getFormattedTime = () => {
    const now = new Date()
    const yy = String(now.getFullYear()).substring(2)
    const mm = String(now.getMonth() + 1).padStart(2, '0')
    const dd = String(now.getDate()).padStart(2, '0')
    const hh = String(now.getHours()).padStart(2, '0')
    return `${yy}년 ${mm}월 ${dd}일 ${hh}시`
  }

  // 모의 스마트워치 데이터 동기화
  const handleWatchSync = () => {
    const timeStr = getFormattedTime()
    setBioData(prev => ({
      ...prev,
      stepCount: 2731,
      stepCountTime: timeStr,
      sleepHours: 3,
      sleepMinutes: 30,
      sleepTime: timeStr,
      heartRate: 130,
      heartRateTime: timeStr
    }))
    alert('스마트워치 생체 신호가 성공적으로 연동되었습니다!\n- 걸음 수: 2,731걸음\n- 수면 시간: 3시간 30분\n- 심박수: 130 bpm')
  }

  // 모달 열기
  const openEditModal = (type) => {
    setActiveModal(type)
    if (type === 'bloodPressure') {
      setTempValues({
        max: bioData.bloodPressureMax,
        min: bioData.bloodPressureMin
      })
    } else if (type === 'sleep') {
      setTempValues({
        hours: bioData.sleepHours,
        minutes: bioData.sleepMinutes
      })
    } else {
      setTempValues({
        val: bioData[type]
      })
    }
  }

  // 저장 처리
  const handleSave = () => {
    const timeStr = getFormattedTime()
    setBioData(prev => {
      const updated = { ...prev }
      if (activeModal === 'bloodPressure') {
        updated.bloodPressureMax = Number(tempValues.max) || 0
        updated.bloodPressureMin = Number(tempValues.min) || 0
        updated.bloodPressureTime = timeStr
      } else if (activeModal === 'sleep') {
        updated.sleepHours = Number(tempValues.hours) || 0
        updated.sleepMinutes = Number(tempValues.minutes) || 0
        updated.sleepTime = timeStr
      } else {
        updated[activeModal] = Number(tempValues.val) || 0
        updated[`${activeModal}Time`] = timeStr
      }
      return updated
    })
    setActiveModal(null)
  }

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white select-none">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 h-12 bg-slate-900 border-b border-white/5 shrink-0">
        <button 
          onClick={() => onNavigate('cover')} 
          className="flex items-center text-slate-300 hover:text-white transition-colors cursor-pointer active:scale-95"
        >
          <ChevronLeft size={20} className="-ml-1" strokeWidth={2.5} />
          <span className="text-xs font-bold">홈으로</span>
        </button>
        <h2 className="text-sm font-bold text-slate-100">생체신호</h2>
        <button 
          onClick={handleWatchSync}
          className="flex items-center gap-1 bg-rose-600 hover:bg-rose-500 text-[10px] font-bold px-2.5 py-1 rounded-full transition-colors cursor-pointer active:scale-95 shadow-md shadow-rose-600/20"
        >
          <RefreshCw size={10} />
          워치연동
        </button>
      </div>

      {/* 스크롤 가능한 생체신호 리스트 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        
        {/* 설명 안내 */}
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-3 text-xs text-rose-300 leading-relaxed">
          * 스마트워치 연동 또는 각 카드를 클릭(수기 입력)하여 일상 건강 정보를 기록하고 안압과의 유기성을 추적하세요.
        </div>

        {/* 6개 그리드 카드 */}
        <div className="grid grid-cols-1 gap-3">
          
          {/* 혈압 */}
          <div 
            onClick={() => openEditModal('bloodPressure')}
            className="flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:border-rose-500/30 rounded-2xl transition-all cursor-pointer group active:scale-[0.99]"
          >
            <div>
              <span className="text-[11px] font-semibold text-rose-400">혈압 (mmHg)</span>
              <div className="flex items-baseline mt-1 gap-2">
                <span className="text-2xl font-extrabold text-white">{bioData.bloodPressureMax}</span>
                <span className="text-xs text-slate-500">최고</span>
                <span className="text-xl font-bold text-slate-400">/</span>
                <span className="text-2xl font-extrabold text-white">{bioData.bloodPressureMin}</span>
                <span className="text-xs text-slate-500">최저</span>
              </div>
              <p className="text-[9px] text-slate-500 mt-2">{bioData.bloodPressureTime}</p>
            </div>
            <Edit3 size={16} className="text-slate-600 group-hover:text-rose-400 transition-colors" />
          </div>

          {/* 혈당 */}
          <div 
            onClick={() => openEditModal('bloodGlucose')}
            className="flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:border-rose-500/30 rounded-2xl transition-all cursor-pointer group active:scale-[0.99]"
          >
            <div>
              <span className="text-[11px] font-semibold text-rose-400">혈당 (mg/dL)</span>
              <div className="flex items-baseline mt-1 gap-1">
                <span className="text-2xl font-extrabold text-white">{bioData.bloodGlucose}</span>
                <span className="text-[10px] text-slate-500 font-bold ml-0.5">mg/dL</span>
              </div>
              <p className="text-[9px] text-slate-500 mt-2">{bioData.bloodGlucoseTime}</p>
            </div>
            <Edit3 size={16} className="text-slate-600 group-hover:text-rose-400 transition-colors" />
          </div>

          {/* 걸음수 */}
          <div 
            onClick={() => openEditModal('stepCount')}
            className="flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:border-rose-500/30 rounded-2xl transition-all cursor-pointer group active:scale-[0.99]"
          >
            <div>
              <span className="text-[11px] font-semibold text-rose-400">걸음 수 (걸음)</span>
              <div className="flex items-baseline mt-1 gap-1">
                <span className="text-2xl font-extrabold text-white">
                  {bioData.stepCount.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500 font-bold ml-0.5">걸음</span>
              </div>
              <p className="text-[9px] text-slate-500 mt-2">{bioData.stepCountTime}</p>
            </div>
            <Edit3 size={16} className="text-slate-600 group-hover:text-rose-400 transition-colors" />
          </div>

          {/* 수면 */}
          <div 
            onClick={() => openEditModal('sleep')}
            className="flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:border-rose-500/30 rounded-2xl transition-all cursor-pointer group active:scale-[0.99]"
          >
            <div>
              <span className="text-[11px] font-semibold text-rose-400">수면 시간 (시간·분)</span>
              <div className="flex items-baseline mt-1 gap-2">
                <span className="text-2xl font-extrabold text-white">{bioData.sleepHours}</span>
                <span className="text-xs text-slate-500">시간</span>
                <span className="text-2xl font-extrabold text-white">{bioData.sleepMinutes}</span>
                <span className="text-xs text-slate-500">분</span>
              </div>
              <p className="text-[9px] text-slate-500 mt-2">{bioData.sleepTime}</p>
            </div>
            <Edit3 size={16} className="text-slate-600 group-hover:text-rose-400 transition-colors" />
          </div>

          {/* 음식 */}
          <div 
            onClick={() => openEditModal('foodCalories')}
            className="flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:border-rose-500/30 rounded-2xl transition-all cursor-pointer group active:scale-[0.99]"
          >
            <div>
              <span className="text-[11px] font-semibold text-rose-400">음식 섭취 (Kcal)</span>
              <div className="flex items-baseline mt-1 gap-1">
                <span className="text-2xl font-extrabold text-white">{bioData.foodCalories}</span>
                <span className="text-[10px] text-slate-500 font-bold ml-0.5">Kcal</span>
              </div>
              <p className="text-[9px] text-slate-500 mt-2">{bioData.foodCaloriesTime}</p>
            </div>
            <Edit3 size={16} className="text-slate-600 group-hover:text-rose-400 transition-colors" />
          </div>

          {/* 심박수 */}
          <div 
            onClick={() => openEditModal('heartRate')}
            className="flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:border-rose-500/30 rounded-2xl transition-all cursor-pointer group active:scale-[0.99]"
          >
            <div>
              <span className="text-[11px] font-semibold text-rose-400">심박수 (bpm)</span>
              <div className="flex items-baseline mt-1 gap-1">
                <span className="text-2xl font-extrabold text-white">{bioData.heartRate}</span>
                <span className="text-[10px] text-slate-500 font-bold ml-0.5">bpm</span>
              </div>
              <p className="text-[9px] text-slate-500 mt-2">{bioData.heartRateTime}</p>
            </div>
            <Edit3 size={16} className="text-slate-600 group-hover:text-rose-400 transition-colors" />
          </div>

        </div>
      </div>

      {/* 수기 입력 모달 팝업 */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-[280px] bg-slate-900 border-2 border-rose-500/50 rounded-3xl p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-base font-bold text-center text-white mb-4">
              {activeModal === 'bloodPressure' ? '혈압 입력' :
               activeModal === 'bloodGlucose' ? '혈당 입력' :
               activeModal === 'stepCount' ? '걸음 수 입력' :
               activeModal === 'sleep' ? '수면 시간 입력' :
               activeModal === 'foodCalories' ? '음식 칼로리 입력' :
               activeModal === 'heartRate' ? '심박수 입력' : '데이터 입력'}
            </h3>

            {/* 입력 폼 필드 */}
            <div className="space-y-3 mb-5">
              {activeModal === 'bloodPressure' ? (
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-[10px] text-slate-400 block mb-1">최고 (mmHg)</label>
                    <input 
                      type="number"
                      value={tempValues.max || ''}
                      onChange={e => setTempValues(prev => ({ ...prev, max: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-center text-lg font-bold text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] text-slate-400 block mb-1">최저 (mmHg)</label>
                    <input 
                      type="number"
                      value={tempValues.min || ''}
                      onChange={e => setTempValues(prev => ({ ...prev, min: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-center text-lg font-bold text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>
              ) : activeModal === 'sleep' ? (
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-[10px] text-slate-400 block mb-1">시간 (H)</label>
                    <input 
                      type="number"
                      value={tempValues.hours !== undefined ? tempValues.hours : ''}
                      onChange={e => setTempValues(prev => ({ ...prev, hours: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-center text-lg font-bold text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] text-slate-400 block mb-1">분 (M)</label>
                    <input 
                      type="number"
                      value={tempValues.minutes !== undefined ? tempValues.minutes : ''}
                      onChange={e => setTempValues(prev => ({ ...prev, minutes: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-center text-lg font-bold text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">값 입력</label>
                  <input 
                    type="number"
                    value={tempValues.val !== undefined ? tempValues.val : ''}
                    onChange={e => setTempValues(prev => ({ ...prev, val: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-center text-xl font-bold text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              )}
            </div>

            {/* 하단 액션 버튼 */}
            <div className="flex gap-2">
              <button 
                onClick={handleSave}
                className="flex-1 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold py-2.5 rounded-xl cursor-pointer transition-colors"
              >
                저장
              </button>
              <button 
                onClick={() => setActiveModal(null)}
                className="flex-1 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs font-bold py-2.5 rounded-xl border border-white/10 cursor-pointer transition-colors"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
