// app/loading.tsx
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Sidebar from '@/components/Sidebar'

export default function Loading() {
  return (
    <div className="flex h-screen bg-[#0a0a0f] overflow-hidden">
      <Sidebar />
      <SkeletonLoader />
    </div>
  )
}