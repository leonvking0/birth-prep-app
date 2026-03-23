import { Children } from 'react'
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

export default function LessonMarkdown({ language = 'zh', lesson }) {
  const markdown = language === 'en' ? lesson.markdownEn ?? lesson.markdown : lesson.markdown
  let sectionHeadingIndex = -1

  return (
    <div className="lesson-markdown">
      <ReactMarkdown
        components={{
          h1({ children }) {
            return <h1>{children}</h1>
          },
          h2({ children }) {
            sectionHeadingIndex += 1
            const headingText = flattenText(children).trim()
            const fallbackId = slugify(headingText)
            const sectionId = lesson.sections[sectionHeadingIndex]?.id ?? fallbackId

            return <h2 id={sectionId}>{children}</h2>
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
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
