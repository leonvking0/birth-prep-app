import { Children, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'

function flattenText(children) {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string') {
        return child
      }

      if (child?.props?.children) {
        return flattenText(child.props.children)
      }

      return ''
    })
    .join('')
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function LessonMarkdown({ lesson }) {
  const headingIdMap = useMemo(
    () =>
      Object.fromEntries(
        lesson.sections.map((section) => [section.titleZh.trim(), section.id]),
      ),
    [lesson.sections],
  )

  return (
    <div className="lesson-markdown">
      <ReactMarkdown
        components={{
          h1({ children }) {
            return <h1>{children}</h1>
          },
          h2({ children }) {
            const headingText = flattenText(children).trim()
            const fallbackId = slugify(headingText)

            return <h2 id={headingIdMap[headingText] ?? fallbackId}>{children}</h2>
          },
          h3({ children }) {
            return <h3 id={slugify(flattenText(children))}>{children}</h3>
          },
          blockquote({ children }) {
            return <blockquote>{children}</blockquote>
          },
          ul({ children }) {
            return <ul>{children}</ul>
          },
          ol({ children }) {
            return <ol>{children}</ol>
          },
          p({ children }) {
            return <p>{children}</p>
          },
        }}
      >
        {lesson.markdown}
      </ReactMarkdown>
    </div>
  )
}
