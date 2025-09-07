import React from 'react';

export default function ResultCard({ data }) {
  if (!data) return null;

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: 16 }}>
      <h3 style={{ margin: '8px 0' }}>{title}</h3>
      <div>{children}</div>
    </div>
  );

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 12, padding: 16, marginTop: 16 }}>
      <h2 style={{ marginTop: 0 }}>{data.name || 'Unnamed Candidate'}</h2>
      <p>
        <strong>Email:</strong> {data.email || '—'} &nbsp; | &nbsp;
        <strong>Phone:</strong> {data.phone || '—'}
        <br />
        <strong>LinkedIn:</strong> {data.linkedin_url || '—'} &nbsp; | &nbsp;
        <strong>Portfolio:</strong> {data.portfolio_url || '—'}
      </p>

      <Section title="Summary">
        <p>{data.summary || '—'}</p>
      </Section>

      <Section title="Work Experience">
        {(data.work_experience || []).length ? (
          <ul>
            {data.work_experience.map((w, i) => (
              <li key={i}>
                <strong>{w.role}</strong> @ {w.company} ({w.duration})<br />
                <ul>
                  {(w.description || []).map((d, j) => <li key={j}>{d}</li>)}
                </ul>
              </li>
            ))}
          </ul>
        ) : '—'}
      </Section>

      <Section title="Education">
        {(data.education || []).length ? (
          <ul>
            {data.education.map((e, i) => (
              <li key={i}>
                {e.degree} — {e.institution} ({e.graduation_year})
              </li>
            ))}
          </ul>
        ) : '—'}
      </Section>

      <Section title="Technical Skills">
        {(data.technical_skills || []).length ? data.technical_skills.join(', ') : '—'}
      </Section>

      <Section title="Soft Skills">
        {(data.soft_skills || []).length ? data.soft_skills.join(', ') : '—'}
      </Section>

      <Section title="Projects">
        {(data.projects || []).length ? (
          <ul>{data.projects.map((p, i) => <li key={i}>{p}</li>)}</ul>
        ) : '—'}
      </Section>

      <Section title="Certifications">
        {(data.certifications || []).length ? (
          <ul>{data.certifications.map((c, i) => <li key={i}>{c}</li>)}</ul>
        ) : '—'}
      </Section>

      <Section title="AI Feedback">
        <p><strong>Rating:</strong> {data.resume_rating ?? '—'} / 10</p>
        <p><strong>Improvement Areas:</strong> {data.improvement_areas || '—'}</p>
        <p><strong>Upskill Suggestions:</strong> {(data.upskill_suggestions || []).join(', ') || '—'}</p>
      </Section>
    </div>
  );
}
