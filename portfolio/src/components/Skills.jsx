import { useReveal } from './useReveal'
import './Skills.css'

export default function Skills({ skills }) {
  const ref = useReveal()

  return (
    <section className="skills section" id="skills">
      <div className="section-inner">
        <div className="section-header reveal" ref={ref}>
          <span className="section-label">Expertise</span>
          <h2 className="section-title">Skills & Technologies</h2>
        </div>
        <div className="skills-grid">
          {skills.map((s, i) => (
            <SkillCard key={s.cat} data={s} delay={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillCard({ data, delay }) {
  const ref = useReveal()
  return (
    <div className={`skill-card reveal reveal-delay-${(delay % 4) + 1}`} ref={ref}>
      <span className="skill-cat">{data.cat}</span>
      <ul className="skill-items">
        {data.items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
