import { useReveal } from './useReveal'
import './Projects.css'

export default function Projects({ projects }) {
  const ref = useReveal()
  return (
    <section className="projects section" id="projects">
      <div className="section-inner">
        <div className="section-header reveal" ref={ref}>
          <span className="section-label">Work</span>
          <h2 className="section-title">Featured Projects</h2>
        </div>
        <div className="projects-list">
          {projects.map((p, i) => <ProjectCard key={p.name} project={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }) {
  const ref = useReveal()
  return (
    <div className={`project-card reveal reveal-delay-${index + 1}`} ref={ref}>
      <div className="project-accent" style={{ background: project.color }} />
      <div className="project-body">
        <div className="project-top">
          <div>
            <p className="project-subtitle">{project.subtitle}</p>
            <h3 className="project-name">{project.name}</h3>
          </div>
          <a href={project.projectUrl} target="_blank" rel="noreferrer" className="project-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View Project
          </a>
        </div>
        <p className="project-desc">{project.desc}</p>
        <div className="project-tech">
          {project.tech.map(t => (
            <span key={t} className="tech-chip">{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
