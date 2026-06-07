
'use client'

import { motion } from 'framer-motion'
import { Flame, Calendar } from 'lucide-react'

interface HeroTileProps {
  name: string
  streak: number
}

export default function HeroTile({ name, streak }: HeroTileProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0 }}
      whileHover={{ scale: 1.01 }}
      className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#0d0d14] p-6 min-h-40 flex flex-col justify-between"
    >
     
      <div className="pointer-events-none absolute -top-10 -left-10 w-64 h-64 rounded-full bg-violet-700/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 right-0 w-48 h-48 rounded-full bg-indigo-700/10 blur-3xl" />


      <div className="relative z-10 flex items-start justify-between">

     
        <div>
          <p className="text-sm text-zinc-500 mb-1">
            {getGreeting()}
          </p>
          <h1 className="text-2xl font-semibold text-white">
            Welcome back, <span className="text-violet-400">{name}</span> 👋
          </h1>
        </div>

     
        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
          <Calendar size={13} className="text-zinc-400" />
          <span className="text-xs text-zinc-400 whitespace-nowrap">
            {getFormattedDate()}
          </span>
        </div>

      </div>

  
      <div className="relative z-10 flex items-center gap-4 mt-6">


        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.2 }}
          className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-xl px-4 py-2"
        >
          <Flame size={18} className="text-orange-400" />
          <span className="text-sm font-semibold text-orange-300">
            {streak} day streak
          </span>
        </motion.div>

   
        <div className="flex items-center gap-1.5">
          {Array.from({ length: 7 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 20,
                delay: 0.3 + i * 0.06,
              }}
              className={`w-2.5 h-2.5 rounded-full ${
                i < streak
                  ? 'bg-orange-400'
                  : 'bg-white/10'
              }`}
            />
          ))}
        </div>

        <p className="text-xs text-zinc-600 ml-1">
          Keep it going!
        </p>

      </div>
    </motion.article>
  )
}



function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning ☀️'
  if (hour < 17) return 'Good afternoon 🌤️'
  return 'Good evening 🌙'
}

function getFormattedDate(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month:   'short',
    day:     'numeric',
  })
}