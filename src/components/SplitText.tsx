import { Fragment, type CSSProperties } from 'react'

/**
 * Parte un texto en palabras enmascaradas para animarlas subiendo.
 * El texto completo va aparte para lectores de pantalla.
 */
export function SplitText({ text, offset = 0 }: { text: string; offset?: number }) {
  const words = text.split(' ')
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={i}>
            <span className="w">
              <span style={{ '--i': i + offset } as CSSProperties}>{word}</span>
            </span>
            {i < words.length - 1 ? ' ' : null}
          </Fragment>
        ))}
      </span>
    </>
  )
}
