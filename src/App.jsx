import { useState, useEffect, useRef } from "react";
import './index.css'

const NAV_ITEMS = ["About", "Skills", "Projects", "Experience", "Contact"];

const SKILLS = {
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "GraphQL"],
  Backend: ["Node.js", "Python", "Java", "REST APIs", "PostgreSQL", "MongoDB"],
  DevOps: ["Docker", "AWS", "CI/CD", "Git", "Linux", "Kubernetes"],
};

const PROJECTS = [
  {
    title: "Project Alpha",
    tag: "Full Stack",
    desc: "A scalable web application with real-time data sync, authentication, and a responsive dashboard. Built with React and Node.js.",
    tech: ["React", "Node.js", "PostgreSQL", "Docker"],
    color: "#00f5c4",
  },
  {
    title: "Project Beta",
    tag: "Backend",
    desc: "High-performance REST API serving 100k+ requests/day. Features caching, rate limiting, and automated CI/CD pipeline.",
    tech: ["Python", "FastAPI", "Redis", "AWS"],
    color: "#ff6b6b",
  },
  {
    title: "Project Gamma",
    tag: "Frontend",
    desc: "Modern SPA with complex state management, code splitting, and accessibility-first design achieving 98+ Lighthouse score.",
    tech: ["Next.js", "TypeScript", "GraphQL", "Vercel"],
    color: "#a78bfa",
  },
];

const EXPERIENCE = [
  {
    role: "Senior Software Developer",
    company: "Tech Company Inc.",
    period: "2022 – Present",
    points: [
      "Led development of microservices architecture serving 500k+ users",
      "Mentored a team of 4 junior developers and conducted code reviews",
      "Reduced API response time by 40% through performance optimization",
    ],
  },
  {
    role: "Software Developer",
    company: "Digital Agency Ltd.",
    period: "2019 – 2022",
    points: [
      "Built and maintained 10+ client-facing web applications",
      "Introduced automated testing, increasing code coverage to 85%",
      "Collaborated with design team to implement pixel-perfect UIs",
    ],
  },
  {
    role: "Junior Developer",
    company: "Startup Hub",
    period: "2017 – 2019",
    points: [
      "Developed features for a SaaS product with 10k+ active users",
      "Worked in Agile/Scrum environment with 2-week sprint cycles",
      "Integrated third-party APIs including Stripe and Twilio",
    ],
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("About");
  const [_menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const move = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map(n => document.getElementById(n.toLowerCase()));
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1)); });
    }, { threshold: 0.4 });
    sections.forEach(s => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("merin.josej@email.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      {/* Custom cursor */}
      <div className="cursor-dot" style={{ left: cursorPos.x, top: cursorPos.y }} />

      {/* Navbar */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(10,10,15,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid #1a1a2e" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#00f5c4", letterSpacing: "0.15em" }}>MJ<span style={{ color: "#444" }}>.dev</span></span>
        <div style={{ display: "flex", gap: 32 }}>
          {NAV_ITEMS.map(n => (
            <span key={n} className={`nav-link ${active === n ? "active" : ""}`} onClick={() => scrollTo(n)}>{n}</span>
          ))}
        </div>
        <button className="btn btn-primary" style={{ padding: "8px 20px", fontSize: 12 }} onClick={() => scrollTo("Contact")}>Hire Me</button>
      </nav>

      {/* Hero */}
      <section id="about" className="grid-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 100, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "20%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,245,196,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "15%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", width: "100%" }}>
          <div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#00f5c4", letterSpacing: "0.2em", marginBottom: 20 }}>// FULL STACK DEVELOPER</p>
            <h1 className="hero-title" style={{ marginBottom: 8 }}>Merin</h1>
            <h1 className="hero-title glow-text" style={{ marginBottom: 32 }}>Jose.</h1>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 15, lineHeight: 1.8, color: "#999", maxWidth: 520, marginBottom: 48 }}>
              I build performant, scalable web applications from database to deployment. Passionate about clean architecture, great UX, and code that lasts.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button className="btn btn-primary" onClick={() => scrollTo("Projects")}>View Projects</button>
              <button className="btn btn-ghost" onClick={() => scrollTo("Experience")}>My Experience</button>
            </div>
            <div style={{ marginTop: 60, display: "flex", gap: 40 }}>
              {[["5+", "Years Exp."], ["20+", "Projects"], ["∞", "Coffee Cups"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 32, fontWeight: 400, color: "#00f5c4" }}>{n}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#666", letterSpacing: "0.1em", marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" style={{ background: "#0d0d14" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
          <FadeIn>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#00f5c4", letterSpacing: "0.2em", marginBottom: 12 }}>02. SKILLS</p>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, marginBottom: 56 }}>Tech I work with</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 40 }}>
            {Object.entries(SKILLS).map(([cat, items], i) => (
              <FadeIn key={cat} delay={i * 0.1}>
                <div style={{ borderTop: "1px solid #1e1e2e", paddingTop: 24 }}>
                  <h3 style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#666", letterSpacing: "0.15em", marginBottom: 20 }}>{cat.toUpperCase()}</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {items.map(s => <span key={s} className="skill-pill">{s}</span>)}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
          <FadeIn>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#00f5c4", letterSpacing: "0.2em", marginBottom: 12 }}>03. PROJECTS</p>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, marginBottom: 56 }}>Selected work</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {PROJECTS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.12}>
                <div className="project-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                    <span className="tag" style={{ color: p.color, borderColor: p.color + "44" }}>{p.tag}</span>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#444" }}>0{i + 1}</span>
                  </div>
                  <h3 style={{ fontSize: 22, fontWeight: 400, marginBottom: 12 }}>{p.title}</h3>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#888", lineHeight: 1.7, marginBottom: 24 }}>{p.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {p.tech.map(t => (
                      <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#555", background: "#1a1a24", padding: "4px 10px", borderRadius: 4 }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
                    <button className="btn btn-ghost" style={{ padding: "8px 16px", fontSize: 11 }}>GitHub →</button>
                    <button className="btn btn-ghost" style={{ padding: "8px 16px", fontSize: 11 }}>Live Demo →</button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" style={{ background: "#0d0d14" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
          <FadeIn>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#00f5c4", letterSpacing: "0.2em", marginBottom: 12 }}>04. EXPERIENCE</p>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, marginBottom: 56 }}>Where I've worked</h2>
          </FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {EXPERIENCE.map((e, i) => (
              <FadeIn key={e.role} delay={i * 0.1}>
                <div className="exp-item">
                  <div className="exp-dot" />
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                    <h3 style={{ fontSize: 22, fontWeight: 400 }}>{e.role}</h3>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#555" }}>{e.period}</span>
                  </div>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#00f5c4", marginBottom: 16 }}>{e.company}</p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                    {e.points.map(pt => (
                      <li key={pt} style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#888", paddingLeft: 16, position: "relative" }}>
                        <span style={{ position: "absolute", left: 0, color: "#00f5c4" }}>›</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <FadeIn>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#00f5c4", letterSpacing: "0.2em", marginBottom: 12 }}>05. CONTACT</p>
            <h2 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 400, marginBottom: 16 }}>Let's build something</h2>
            <h2 className="glow-text" style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 400, marginBottom: 32 }}>great together.</h2>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, color: "#888", maxWidth: 480, margin: "0 auto 48px" }}>
              Open to full-time roles, freelance projects, and interesting collaborations. Let's talk!
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn btn-primary" onClick={copyEmail}>
                {copied ? "✓ Copied!" : "mjm.merin17@gmail.com"}
              </button>
              <a href="https://www.linkedin.com/in/merin-josej/" target="_blank" rel="noopener noreferrer">
                <button className="btn btn-ghost">LinkedIn →</button>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #1a1a2e", padding: "28px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#444" }}>© 2026 Merin Jose J.</span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#333" }}>Built with React · Designed with ♥</span>
      </footer>
    </div>
  );
}