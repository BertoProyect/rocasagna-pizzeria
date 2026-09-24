import { SplitText } from './SplitText'

interface Props {
  title: string
  id?: string
  intro?: string
  className?: string
}

export function SectionHeading({ title, id, intro, className = '' }: Props) {
  return (
    <div className={className}>
      <h2 id={id} className="t-h2" data-split>
        <SplitText text={title} />
      </h2>
      {intro ? (
        <p className="t-lead mt-5 max-w-[46ch]" data-reveal="up" data-delay="0.15">
          {intro}
        </p>
      ) : null}
    </div>
  )
}
