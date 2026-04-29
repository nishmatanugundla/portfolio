import { useState } from 'react'
import { useReveal } from './useReveal'
import './Experience.css'

export default function Experience({ experience }) {
  const [active, setActive] = useState(0)
  const ref = useReveal()

  return (
    <section className="experience section" id="experience">
      <div className="section-inner">
        <div className="section-header reveal" ref={ref}>
          <span className="section-label">Career</span>
          <h2 className="section-title">Experience</h2>
        </div>

        <div className="exp-layout">
          {/* Tab list */}
          <div className="exp-tabs">
            {experience.map((e, i) => (
              <button
                key={e.company}
                className={`exp-tab ${active === i ? 'active' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="exp-tab-company">{e.company}</span>
                <span className="exp-tab-period">{e.period}</span>
              </button>
            ))}
          </div>

          {/* Active panel */}
          <ExpPanel data={experience[active]} key={active} />
        </div>
      </div>
    </section>
  )
}

function ExpPanel({ data }) {
  const ref = useReveal()
  return (
    <div className="exp-panel reveal" ref={ref}>
      <div className="exp-panel-header">
        <div>
          <h3 className="exp-role">{data.role}</h3>
          <p className="exp-company-full">
            {data.company}
            {data.client && <span className="exp-client"> · {data.client}</span>}
          </p>
        </div>
        <span className="exp-period">{data.period}</span>
      </div>

      <div className="exp-skills">
        {data.skills.map(s => (
          <span key={s} className="exp-skill-chip">{s}</span>
        ))}
      </div>

      <ul className="exp-points">
        {data.points.map((pt, i) => (
          <li key={i}>
            <span className="exp-bullet">◆</span>
            {pt}
          </li>
        ))}
      </ul>
    </div>
  )
}
