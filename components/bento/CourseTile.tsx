
'use client'

import { motion } from 'framer-motion'
import {
  Code,
  Palette,
  Server,
  FileCode,
  BookOpen,
  Cpu,
  Globe,
  Layers,
  LucideIcon,
} from 'lucide-react'
import ProgressBar from '@/components/ui/ProgressBar'
import type { Course } from '@/types'


interface CourseTileProps {
  course: Course
  index:  number
}


const ICON_MAP: Record<string, LucideIcon> = {
  Code,
  Palette,
  Server,
  FileCode,
  BookOpen,
  Cpu,
  Globe,
  Layers,
}

// --- Color config per card index ---
const CARD_COLORS = [
  {
    progress: 'violet' as const,
    iconBg:   'bg-violet-500/10',
    iconText: 'text-violet-400',
    border:   'border-violet-500/20',
    glow:     'hover:shadow-violet-500/10',
    gradient: 'from-violet-900/10 via-transparent',
  },
  {
    progress: 'emerald' as const,
    iconBg:   'bg-emerald-500/10',
    iconText: 'text-emerald-400',
    border:   'border-emerald-500/20',
    glow:     'hover:shadow-emerald-500/10',
    gradient: 'from-emerald-900/10 via-transparent',
  },
  {
    progress: 'amber' as const,
    iconBg:   'bg-amber-500/10',
    iconText: 'text-amber-400',
    border:   'border-amber-500/20',
    glow:     'hover:shadow-amber-500/10',
    gradient: 'from-amber-900/10 via-transparent',
  },
  {
    progress: 'sky' as const,
    iconBg:   'bg-sky-500/10',
    iconText: 'text-sky-400',
    border:   'border-sky-500/20',
    glow:     'hover:shadow-sky-500/10',
    gradient: 'from-sky-900/10 via-transparent',
  },
]

export default function CourseTile({ course, index }: CourseTileProps) {
  const colors  = CARD_COLORS[index % CARD_COLORS.length]
  const Icon    = ICON_MAP[course.icon_name] ?? BookOpen

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type:      'spring',
        stiffness: 280,
        damping:   26,
        delay:     0.1 + index * 0.1,  
      }}
      whileHover={{
        scale: 1.02,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      className={`
        relative overflow-hidden rounded-2xl
        border ${colors.border}
        bg-[#0d0d14]
        shadow-lg ${colors.glow} hover:shadow-xl
        transition-shadow duration-300
        p-5 flex flex-col gap-4
        cursor-pointer
      `}
    >

      <div
        className={`
          pointer-events-none absolute inset-0
          bg-linear-to-br ${colors.gradient} to-transparent
          opacity-60
        `}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
        }}
      />


      <div className="relative z-10 flex items-start justify-between">
        <div className={`
          w-10 h-10 rounded-xl flex items-center justify-center
          ${colors.iconBg}
        `}>
          <Icon size={20} className={colors.iconText} />
        </div>

        <span className={`
          text-xs font-semibold tabular-nums
          px-2 py-1 rounded-lg
          bg-white/5 border border-white/10
          text-zinc-300
        `}>
          {course.progress}%
        </span>
      </div>


      <div className="relative z-10">
        <h2 className="text-sm font-semibold text-white leading-snug">
          {course.title}
        </h2>
        <p className="text-xs text-zinc-500 mt-0.5">
          {getStatusLabel(course.progress)}
        </p>
      </div>


      <div className="relative z-10 mt-auto">
        <ProgressBar
          value={course.progress}
          color={colors.progress}
          showLabel={false}
        />
      </div>

    </motion.article>
  )
}

function getStatusLabel(progress: number): string {
  if (progress === 0)   return 'Not started'
  if (progress < 30)    return 'Just getting started'
  if (progress < 60)    return 'In progress'
  if (progress < 90)    return 'Almost there'
  if (progress < 100)   return 'Final stretch'
  return 'Completed 🎉'
}