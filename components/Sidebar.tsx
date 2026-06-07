// components/sidebar/Sidebar.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from 'lucide-react'


interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'courses',   label: 'Courses',   icon: <BookOpen size={20} /> },
  { id: 'progress',  label: 'Progress',  icon: <BarChart2 size={20} /> },
  { id: 'settings',  label: 'Settings',  icon: <Settings size={20} /> },
]

export default function Sidebar() {
  const [activeId, setActiveId]     = useState('dashboard')
  const [collapsed, setCollapsed]   = useState(false)

  return (
    <motion.nav
      animate={{ width: collapsed ? 64 : 220 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="relative flex flex-col h-screen bg-[#0d0d14] border-r border-white/5 overflow-hidden shrink-0"
    >

      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
        <div className="shrink-0 w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
          <GraduationCap size={16} className="text-white" />
        </div>
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.span
              key="logo-text"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
              className="text-sm font-semibold text-white whitespace-nowrap"
            >
              LearnSpace
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      
      <nav className="flex flex-col gap-1 p-2 flex-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveId(item.id)}
            className="relative flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-left cursor-pointer"
          >
            
            {activeId === item.id && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 rounded-lg bg-violet-600/20 border border-violet-500/30"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}

         
            <span
              className={`relative z-10 shrink-0 transition-colors duration-200 ${
                activeId === item.id
                  ? 'text-violet-400'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {item.icon}
            </span>

  
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.span
                  key={`label-${item.id}`}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.15 }}
                  className={`relative z-10 text-sm whitespace-nowrap transition-colors duration-200 ${
                    activeId === item.id
                      ? 'text-white font-medium'
                      : 'text-zinc-400'
                  }`}
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}
      </nav>

      
      <div className="p-2 border-t border-white/5">
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="flex items-center justify-center w-full py-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-colors duration-200"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </motion.nav>
  )
}