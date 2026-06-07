
'use client'

import { motion } from 'framer-motion'


function Shimmer({
  className = '',
}: {
  className?: string
}) {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-white/5 ${className}`}>
      <motion.div
        className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/5 to-transparent"
        animate={{ translateX: ['−100%', '100%'] }}
        transition={{
          duration:   1.4,
          repeat:     Infinity,
          ease:       'linear',
        }}
      />
    </div>
  )
}


function CourseCardSkeleton({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type:      'spring',
        stiffness: 280,
        damping:   26,
        delay,
      }}
      className="rounded-2xl border border-white/5 bg-[#0d0d14] p-5 flex flex-col gap-4"
    >
     
      <div className="flex items-start justify-between">
        <Shimmer className="w-10 h-10 rounded-xl" />
        <Shimmer className="w-10 h-6 rounded-lg" />
      </div>

      <div className="flex flex-col gap-2">
        <Shimmer className="w-3/4 h-3.5" />
        <Shimmer className="w-1/2 h-3" />
      </div>

      
      <div className="mt-auto flex flex-col gap-1.5">
        <Shimmer className="w-full h-1.5 rounded-full" />
      </div>
    </motion.div>
  )
}


function HeroSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 26, delay: 0 }}
      className="rounded-2xl border border-white/5 bg-[#0d0d14] p-6 min-h-40 flex flex-col justify-between"
    >
  
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <Shimmer className="w-28 h-3" />
          <Shimmer className="w-56 h-6" />
        </div>
        <Shimmer className="w-24 h-7 rounded-lg" />
      </div>

     
      <div className="flex items-center gap-3 mt-6">
        <Shimmer className="w-32 h-8 rounded-xl" />
        <div className="flex items-center gap-1.5">
          {Array.from({ length: 7 }).map((_, i) => (
            <Shimmer key={i} className="w-2.5 h-2.5 rounded-full" />
          ))}
        </div>
      </div>
    </motion.div>
  )
}


function ActivitySkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 26, delay: 0.3 }}
      className="rounded-2xl border border-white/5 bg-[#0d0d14] p-6"
    >
 
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Shimmer className="w-8 h-8 rounded-lg" />
          <div className="flex flex-col gap-1.5">
            <Shimmer className="w-28 h-3.5" />
            <Shimmer className="w-20 h-3" />
          </div>
        </div>
        <div className="flex gap-2">
          <Shimmer className="w-24 h-7 rounded-lg" />
          <Shimmer className="w-24 h-7 rounded-lg" />
        </div>
      </div>

     
      <div className="flex gap-0.75 ml-8">
        {Array.from({ length: 26 }).map((_, wIndex) => (
          <div key={wIndex} className="flex flex-col gap-0.75">
            {Array.from({ length: 7 }).map((_, dIndex) => (
              <Shimmer
                key={dIndex}
                className="w-2.75 h-2.75 rounded-xs"
              />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/5">
        <Shimmer className="w-52 h-3" />
      </div>
    </motion.div>
  )
}


export default function SkeletonLoader() {
  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <div className="grid grid-cols-1 gap-4 max-w-6xl mx-auto">

   
        <HeroSkeleton />

       
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <CourseCardSkeleton key={i} delay={0.1 + i * 0.08} />
          ))}
        </section>

       
        <ActivitySkeleton />

      </div>
    </main>
  )
}
