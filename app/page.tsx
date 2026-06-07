import {supabase} from '../lib/supabase'
export default async function Home() {
  const {data: courses, error} = await supabase.from('courses').select('*');
  if (error) {
    return <div>Error fetching courses: {error.message}</div>
  };

  return (
    <main>
      <h1>Courses</h1>
      {courses?.map((course, key) => (
        <div>
          <h2>{course.title}</h2>
          <p>Progress: {course.progress}%</p>
          <p>Icon: {course.icon_name}</p>
        </div>
      ))}
    </main>
  )
}