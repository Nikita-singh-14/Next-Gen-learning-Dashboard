// components/ui/ProgressBar.tsx
'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'

interface ProgressBarProps {
  value: number       
  showLabel?: boolean
  color?: 'violet' | 'emerald' | 'amber' | 'sky'
}

const COLOR_MAP = {
  violet:  { bar: 'bg-violet-500',  glow: 'shadow-violet-500/50',  text: 'text-violet-400'  },
  emerald: { bar: 'bg-emerald-500', glow: 'shadow-emerald-500/50', text: 'text-emerald-400' },
  amber:   { bar: 'bg-amber-500',   glow: 'shadow-amber-500/50',   text: 'text-amber-400'   },
  sky:     { bar: 'bg-sky-500',     glow: 'shadow-sky-500/50',     text: 'text-sky-400'     },
}

export default function ProgressBar({
  value,
  showLabel = true,
  color = 'violet',
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value))
  const colors = COLOR_MAP[color]


  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    stiffness: 80,
    damping: 18,
    restDelta: 0.001,
  })


  const displayRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!isInView) return

   
    motionValue.set(clampedValue)

    
    const unsubscribe = springValue.on('change', (latest) => {
      if (displayRef.current) {
        displayRef.current.textContent = `${Math.round(latest)}%`
      }
    })

    return () => unsubscribe()
  }, [isInView, clampedValue, motionValue, springValue])

  return (
    <div ref={ref} className="w-full flex flex-col gap-1.5">

     
      {showLabel && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-500">Progress</span>
          <span
            ref={displayRef}
            className={`text-xs font-medium tabular-nums ${colors.text}`}
          >
            0%
          </span>
        </div>
      )}

    
      <div className="relative w-full h-1.5 rounded-full bg-white/5 overflow-hidden">

       
        <motion.div
          className={`absolute left-0 top-0 h-full rounded-full ${colors.bar} ${colors.glow} shadow-sm`}
          style={{ width: '0%' }}
          animate={isInView ? { width: `${clampedValue}%` } : { width: '0%' }}
          transition={{
            type: 'spring',
            stiffness: 80,
            damping: 18,
            restDelta: 0.001,
          }}
        />

       
        {isInView && (
          <motion.div
            className="absolute top-0 left-0 h-full w-8 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12"
            initial={{ x: -32 }}
            animate={{ x: '100vw' }}
            transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
          />
        )}

      </div>
    </div>
  )
}