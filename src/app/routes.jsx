import { Navigate, useRoutes } from 'react-router-dom'
import AppShell from '../components/layout/AppShell.jsx'
import HomePage from '../pages/HomePage.jsx'
import LessonDetailPage from '../pages/LessonDetailPage.jsx'
import LessonsPage from '../pages/LessonsPage.jsx'
import QuickReferencePage from '../pages/QuickReferencePage.jsx'
import StudyPage from '../pages/StudyPage.jsx'

const appRoutes = [
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'lessons', element: <LessonsPage /> },
      { path: 'lessons/:lessonId', element: <LessonDetailPage /> },
      { path: 'study', element: <StudyPage /> },
      { path: 'quick-reference', element: <QuickReferencePage /> },
    ],
  },
  { path: '*', element: <Navigate replace to="/" /> },
]

export function AppRoutes() {
  return useRoutes(appRoutes)
}
