
'use client'

import { useRef, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { Activity, TrendingUp, Zap } from 'lucide-react'

// --- Types ---
interface DayCell {
  date:  string
  count: number
  level: 0 | 1 | 2 | 3 | 4   
}

interface WeekColumn {
  week:  number
  days:  DayCell[]
}


const WEEKS  = 26  
const DAYS   = 7    

const LEVEL_COLORS = [
  'bg-white/5',           
  'bg-violet-900/60',    
  'bg-violet-700/70',     
  'bg-violet-500/80',     
  'bg-violet-400',        
]

const DAY_LABELS  = ['Mon', '', 'Wed', '', 'Fri', '', 'Sun']
const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun',
                     'Jul','Aug','Sep','Oct','Nov','Dec']


function generateActivityData(): WeekColumn[] {
  const today  = new Date()
  const result: WeekColumn[] = []

  for (let w = WEEKS - 1; w >= 0; w--) {
    const days: DayCell[] = []

    for (let d = 0; d < DAYS; d++) {
      const date = new Date(today)
      date.setDate(today.getDate() - (w * 7 + (DAYS - 1 - d)))

     
      const isWeekend = d >= 5
      const rand      = Math.random()
      const raw       = isWeekend ? rand * 0.5 : rand

      const count =
        raw < 0.35 ? 0 :
        raw < 0.55 ? 1 :
        raw < 0.73 ? 2 :
        raw < 0.88 ? 3 : 4

      days.push({
        date:  date.toISOString().split('T')[0],
        count: count * 2,
        level: count as DayCell['level'],
      })
    }

    result.push({ week: WEEKS - 1 - w, days })
  }

  return result
}


function getMonthLabels(weeks: WeekColumn[]): { label: string; weekIndex: number }[] {
  const labels: { label: string; weekIndex: number }[] = []
  let lastMonth = -1

  weeks.forEach((col, i) => {
    const month = new Date(col.days[0].date).getMonth()
    if (month !== lastMonth) {
      labels.push({ label: MONTH_NAMES[month], weekIndex: i })
      lastMonth = month
    }
  })

  return labels
}

// --- Stats ---
function getStats(weeks: WeekColumn[]) {
  const allDays   = weeks.flatMap(w => w.days)
  const total     = allDays.reduce((sum, d) => sum + d.count, 0)
  const activeDays = allDays.filter(d => d.count > 0).length
  const thisWeek  = weeks[weeks.length - 1]?.days.reduce((s, d) => s + d.count, 0) ?? 0

  return { total, activeDays, thisWeek }
}

export default function ActivityTile() {
  const ref       = useRef<HTMLDivElement>(null)
  const isInView  = useInView(ref, { once: true })
  const weeks     = useMemo(() => generateActivityData(), [])
  const labels    = useMemo(() => getMonthLabels(weeks), [weeks])
  const stats     = useMemo(() => getStats(weeks), [weeks])

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type:      'spring',
        stiffness: 280,
        damping:   26,
        delay:     0.4,
      }}
      whileHover={{
        scale: 1.005,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#0d0d14] p-6"
    >
    
      <div className="pointer-events-none absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-violet-700/5 blur-3xl" />

 
      <div className="relative z-10 flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
            <Activity size={16} className="text-violet-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">
              Learning Activity
            </h2>
            <p className="text-xs text-zinc-500">
              Last 6 months
            </p>
          </div>
        </div>

  
        <div className="flex items-center gap-4">
          <StatBadge
            icon={<TrendingUp size={12} />}
            label="total sessions"
            value={stats.total}
          />
          <StatBadge
            icon={<Zap size={12} />}
            label="this week"
            value={stats.thisWeek}
          />
        </div>
      </div>

    
      <div ref={ref} className="relative z-10 overflow-x-auto">
        <div className="min-w-130">

    
          <div className="relative h-5 mb-1 ml-8">
            {labels.map(({ label, weekIndex }) => (
              <span
                key={label + weekIndex}
                className="absolute text-[10px] text-zinc-500"
                style={{ left: `${(weekIndex / WEEKS) * 100}%` }}
              >
                {label}
              </span>
            ))}
          </div>

          {/* Grid */}
          <div className="flex gap-0.75">

            {/* Day labels */}
            <div className="flex flex-col gap-0.75 mr-1">
              {DAY_LABELS.map((label, i) => (
                <div
                  key={i}
                  className="h-2.75 flex items-center text-[9px] text-zinc-600 w-6"
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Week columns */}
            {weeks.map((col, wIndex) => (
              <div key={col.week} className="flex flex-col gap-0.75">
                {col.days.map((day, dIndex) => (
                  <motion.div
                    key={day.date}
                    title={`${day.date} · ${day.count} sessions`}
                    className={`
                      w-2.75 h-2.75 rounded-xs
                      ${LEVEL_COLORS[day.level]}
                      cursor-pointer
                    `}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.5 }
                    }
                    transition={{
                      type:      'spring',
                      stiffness: 400,
                      damping:   20,
                      delay:     isInView
                        ? 0.02 * wIndex + 0.005 * dIndex
                        : 0,
                    }}
                    whileHover={{
                      scale: 1.6,
                      transition: { type: 'spring', stiffness: 500, damping: 15 },
                    }}
                  />
                ))}
              </div>
            ))}

          </div>


          <div className="flex items-center gap-1.5 mt-3 justify-end">
            <span className="text-[10px] text-zinc-600">Less</span>
            {LEVEL_COLORS.map((cls, i) => (
              <div key={i} className={`w-2.75 h-2.75 rounded-xs ${cls}`} />
            ))}
            <span className="text-[10px] text-zinc-600">More</span>
          </div>

        </div>
      </div>

      <div className="relative z-10 mt-4 pt-4 border-t border-white/5 flex items-center gap-1.5">
        <span className="text-xs text-zinc-500">
          <span className="text-white font-medium">{stats.activeDays}</span>
          {' '}active days in the last 6 months
        </span>
      </div>

    </motion.article>
  )
}


function StatBadge({
  icon,
  label,
  value,
}: {
  icon:  React.ReactNode
  label: string
  value: number
}) {
  return (
    <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5">
      <span className="text-violet-400">{icon}</span>
      <span className="text-xs font-semibold text-white tabular-nums">
        {value}
      </span>
      <span className="text-xs text-zinc-500 hidden sm:inline">
        {label}
      </span>
    </div>
  )
}