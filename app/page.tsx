// import {supabase} from '../lib/supabase'
// export default async function Home() {
//   const {data: courses, error} = await supabase.from('courses').select('*');
//   if (error) {
//     return <div>Error fetching courses: {error.message}</div>
//   };

//   return (
//     <main>
//       <h1>Courses</h1>
//       {courses?.map((course, key) => (
//         <div>
//           <h2>{course.title}</h2>
//           <p>Progress: {course.progress}%</p>
//           <p>Icon: {course.icon_name}</p>
//         </div>
//       ))}
//     </main>
//   )
// }


// app/page.tsx

import { Suspense } from 'react'
import { supabase } from '@/lib/supabase'
import Sidebar from '@/components/Sidebar'
import HeroTile from '@/components/bento/HeroTile'
import CourseTile from '@/components/bento/CourseTile'
import ActivityTile from '@/components/bento/ActivityTile'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import type { Course } from '@/types'

async function getCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Supabase fetch error:', error.message)
    return []
  }

  return data ?? []
}

async function DashboardContent() {
  const courses = await getCourses()

  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <div className="grid grid-cols-1 gap-4 max-w-6xl mx-auto">

        <HeroTile name="Nikita" streak={7} />

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.length === 0 ? (
            <p className="text-zinc-500 col-span-3 text-sm">
              No courses found. Add some rows in Supabase.
            </p>
          ) : (
            courses.map((course, index) => (
              <CourseTile key={course.id} course={course} index={index} />
            ))
          )}
        </section>

        <ActivityTile />

      </div>
    </main>
  )
}

export default function Page() {
  return (
    <div className="flex h-screen bg-[#0a0a0f] overflow-hidden">
      <Sidebar />
      <Suspense fallback={<SkeletonLoader />}>
        <DashboardContent />
      </Suspense>
    </div>
  )
}