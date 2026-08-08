"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { siReact, siFlutter, siNextdotjs, siJavascript, siTypescript, siNodedotjs, siExpress, siFastify, siMongodb, siPostgresql, siMysql, siFirebase, siSupabase, siGit, siGithubactions, siDocker, siNginx, siLetsencrypt, siPrometheus } from "simple-icons/icons";

const Arrow = () => <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M4 9h10M10 5l4 4-4 4" /></svg>;
const Check = () => <svg viewBox="0 0 18 18" aria-hidden="true"><path d="m4 9 3 3 7-7" /></svg>;

function TechIcon({ name }: { name: string }) {
  const icons = { "React Native": siReact, React: siReact, Flutter: siFlutter, "Next.js": siNextdotjs, JavaScript: siJavascript, TypeScript: siTypescript, "Node.js": siNodedotjs, "Express.js": siExpress, Fastify: siFastify, MongoDB: siMongodb, PostgreSQL: siPostgresql, MySQL: siMysql, Firebase: siFirebase, Supabase: siSupabase, Git: siGit, "CI/CD": siGithubactions, Docker: siDocker, Nginx: siNginx, SSL: siLetsencrypt, Monitoring: siPrometheus } as const;
  const icon = icons[name as keyof typeof icons];
  return <span className={`tech-icon tech-${name.toLowerCase().replace(/[^a-z]/g, "")}`} aria-hidden="true">{icon ? <svg viewBox="0 0 24 24" role="img"><path d={icon.path}/></svg> : null}</span>;
}

function ProcessIcon({ index }: { index: number }) {
  const paths = ["M5 5h14v14H5zM9 9h6M9 13h4", "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3", "M4 18l4-1 10-10-3-3L5 14l-1 4zM13 6l3 3", "M8 7 3 12l5 5M16 7l5 5-5 5M14 4l-4 16", "M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3zM9 12l2 2 4-4", "M4 17h16M6 17V8l6-4 6 4v9M9 17v-5h6v5", "M5 12a7 7 0 0 1 12-5l2-2v6h-6l2-2a4 4 0 1 0 1 6"];
  return <span className="process-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d={paths[index]} /></svg></span>;
}

const chapters = [
  { key: "mobile", eyebrow: "01 / MOBILE DEVELOPMENT", title: "Mobile apps for every device.", copy: "We build reliable apps for iPhone, Android, and desktop with a consistent look and feel.", tags: ["React Native", "Flutter", "iOS", "Android"] },
  { key: "web", eyebrow: "02 / WEB DEVELOPMENT", title: "Fast websites and web apps.", copy: "We build responsive websites, dashboards, portals, and online stores that are simple to use.", tags: ["React", "Next.js", "TypeScript", "Responsive UI"] },
  { key: "backend", eyebrow: "03 / BACKEND DEVELOPMENT", title: "The systems that power your app.", copy: "We build secure APIs, user accounts, payments, notifications, and connections to other services.", tags: ["Node.js", "Express", "Fastify", "REST APIs"] },
  { key: "database", eyebrow: "04 / DATABASES", title: "Your data, organized and secure.", copy: "We design databases that keep your business data safe, easy to manage, and ready to grow.", tags: ["PostgreSQL", "MongoDB", "MySQL", "Supabase"] },
  { key: "deploy", eyebrow: "05 / DEPLOYMENT", title: "From finished code to a live product.", copy: "We set up your server, publish your app, protect it with SSL, and monitor it after launch.", tags: ["CI/CD", "Nginx", "SSL", "Monitoring"] },
];

const services = [
  ["01", "Mobile Applications", "Apps for iPhone, Android, and desktop that are fast, stable, and easy to use.", "RN / FLUTTER"],
  ["02", "Web Development", "Business websites, dashboards, online stores, and customer portals.", "NEXT.JS / REACT"],
  ["03", "Backend & APIs", "User accounts, payments, business rules, notifications, and third-party connections.", "NODE / FASTIFY"],
  ["04", "Database Development", "Well-organized data, fast searches, secure backups, and safe updates.", "SQL / NOSQL"],
  ["05", "Servers & Deployment", "Server setup, domains, SSL, automatic updates, monitoring, and ongoing support.", "BUILD / SHIP / RUN"],
];

const projects = [
  { no: "01", name: "TaskFlow", type: "Business operations platform", description: "A unified workspace that turns fragmented project data into clear priorities, automated workflows, and confident decisions.", tech: "REACT · NODE.JS · POSTGRESQL", color: "blue" },
  { no: "02", name: "FitTrack", type: "Cross-platform fitness application", description: "A personalized mobile experience for tracking habits, measuring progress, and turning daily activity into useful insight.", tech: "FLUTTER · NODE.JS · MONGODB", color: "green" },
  { no: "03", name: "GreenCart", type: "Full-stack commerce platform", description: "A fast storefront and operational back office designed to make discovery, checkout, and fulfillment feel effortless.", tech: "NEXT.JS · NODE.JS · POSTGRESQL", color: "sand" },
];

function Brand() {
  return <a className="brand" href="#home" aria-label="Eagle Nest Technologies home"><span className="mark"><i /><i /><b /></span><span>Eagle Nest <em>Technologies</em></span></a>;
}

function SystemVisual({ active }: { active: number }) {
  const phase = chapters[active]?.key || "mobile";
  return (
    <div className={`system-visual phase-${phase}`} aria-hidden="true">
      <div className="grid-plane" />
      <div className="system-topline"><span>ENT / SYSTEM_05</span><span className="live"><i /> SYSTEM LIVE</span></div>
      <div className="device phone-one"><div className="phone-bar" /><div className="metric-ring"><b>78</b><span>activity</span></div><div className="mini-bars"><i/><i/><i/><i/><i/></div></div>
      <div className="device phone-two"><div className="phone-bar"/><div className="tiny-copy"/><div className="tiny-copy short"/><div className="mobile-list"><i/><i/><i/></div></div>
      <div className="browser">
        <div className="browser-head"><i/><i/><i/><span>product.eaglenest.dev</span></div>
        <div className="dash-side"><i/><i/><i/><i/></div><div className="dash-main"><span>Overview</span><div className="dash-numbers"><b>84.2k</b><b>+18.4%</b></div><div className="chart"><i/><i/><i/><i/><i/><i/><i/></div></div>
      </div>
      <div className="api-layer">
        <span className="node front">FRONTEND</span><span className="node gateway">API GATEWAY</span><span className="node service">NODE.JS</span>
        <code><i>POST</i> /api/auth/login <b>200</b></code><code><i>GET</i> /api/projects <b>200</b></code>
      </div>
      <div className="data-layer"><span>USERS</span><span>PROJECTS</span><span>ORDERS</span><span>ANALYTICS</span><div className="data-core">DB</div></div>
      <div className="pipeline"><div><i>01</i><b>Commit</b><small>8f2c4a</small></div><div><i>02</i><b>Build</b><small>18.2s</small></div><div><i>03</i><b>Test</b><small>42 passed</small></div><div><i>04</i><b>Deploy</b><small>production</small></div><div className="production"><i><Check/></i><b>Live</b><small>99.99%</small></div></div>
      <div className="visual-caption"><span>IDEA</span><i/><span>PRODUCT</span><i/><span>PRODUCTION</span></div>
    </div>
  );
}

function ProjectMockup({ project }: { project: typeof projects[0] }) {
  return <div className={`project-mock ${project.color}`}>
    <div className="mock-browser"><div className="mock-top"><i/><i/><i/><span>{project.name.toLowerCase()}.app</span></div><div className="mock-nav"><b>{project.name.slice(0,1)}</b><i/><i/><i/><i/></div><div className="mock-content"><small>OVERVIEW</small><h4>Good morning, Alex.</h4><div className="mock-stats"><span><small>Active</small><b>24</b></span><span><small>Progress</small><b>84%</b></span><span><small>Team</small><b>12</b></span></div><div className="mock-chart"><i/><i/><i/><i/><i/><i/><i/><i/><i/></div><div className="mock-bottom"><span/><span/></div></div></div>
  </div>;
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [activeProject, setActiveProject] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [siteProgress, setSiteProgress] = useState(0);
  const journeyRef = useRef<HTMLElement | null>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const pageMax = document.documentElement.scrollHeight - window.innerHeight;
      setSiteProgress(pageMax > 0 ? window.scrollY / pageMax : 0);
      const journey = journeyRef.current;
      if (journey) {
        const start = journey.offsetTop;
        const distance = journey.offsetHeight - window.innerHeight;
        const progress = Math.max(0, Math.min(.999, (window.scrollY - start) / Math.max(distance, 1)));
        setActiveChapter(Math.min(chapters.length - 1, Math.floor(progress * chapters.length)));
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setMenu(false); };
    document.body.style.overflow = menu ? "hidden" : "";
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKeyDown); };
  }, [menu]);

  function submit(e: FormEvent) { e.preventDefault(); setSubmitted(true); }

  return <main>
    <nav className="nav"><div className="site-progress" style={{ transform: `scaleX(${siteProgress})` }}/><Brand/><div id="primary-navigation" className={`nav-links ${menu ? "open" : ""}`}><a href="#services" onClick={()=>setMenu(false)}>Services</a><a href="#work" onClick={()=>setMenu(false)}>Projects</a><a href="#stack" onClick={()=>setMenu(false)}>Technologies</a><a href="#process" onClick={()=>setMenu(false)}>Process</a><a href="#about" onClick={()=>setMenu(false)}>About</a><a href="#contact" onClick={()=>setMenu(false)}>Contact</a></div><a href="#contact" className="nav-cta">Start a project <Arrow/></a><button className="menu-btn" onClick={()=>setMenu(!menu)} aria-label="Toggle menu" aria-expanded={menu} aria-controls="primary-navigation"><i/><i/></button></nav>

    <section className="hero" id="home"><div className="hero-noise"/><div className="hero-copy"><p className="eyebrow"><i/> SOFTWARE PRODUCTS · BUILT END TO END</p><h1>Your product.<br/><span>One team.</span><br/><em>Ready to launch.</em></h1><p className="lede">We help startups and growing businesses turn ideas into reliable mobile apps and web platforms—from the first plan to launch and ongoing support.</p><div className="hero-actions"><a className="button primary" href="#contact">Tell us about your project <Arrow/></a><a className="button text" href="#services">See what we build <Arrow/></a></div></div><div className="hero-system"><SystemVisual active={4}/></div><div className="hero-foot"><span>END-TO-END PRODUCT ENGINEERING</span><div>Mobile <i/> Web <i/> Backend <i/> Database <i/> Infrastructure</div><a href="#journey">SCROLL TO EXPLORE <b>↓</b></a></div></section>

    <section className="trust-rail" aria-label="How we work"><div><span>01</span><b>ONE TEAM</b><small>One accountable partner from plan to launch</small></div><div><span>02</span><b>EVERY LAYER</b><small>Mobile, web, backend, data, and cloud</small></div><div><span>03</span><b>BUILT TO LAUNCH</b><small>Deployment and support included</small></div></section>

    <section className="journey" id="journey" ref={journeyRef}><div className="journey-sticky"><div className="journey-copy"><p className="eyebrow dark"><i/> THE COMPLETE SYSTEM</p><p className="chapter-count">0{activeChapter+1} <span>/ 05</span></p><h2>{chapters[activeChapter].title}</h2><p>{chapters[activeChapter].copy}</p><div className="tags">{chapters[activeChapter].tags.map(t=><span key={t}>{t}</span>)}</div><div className="chapter-progress">{chapters.map((c,i)=><button key={c.key} className={i===activeChapter ? "active":""} onClick={()=>chapterRefs.current[i]?.scrollIntoView({behavior:"smooth", block:"center"})} aria-label={c.title}><i/></button>)}</div></div><SystemVisual active={activeChapter}/></div><div className="chapter-triggers">{chapters.map((c,i)=><div key={c.key} data-index={i} ref={el=>{chapterRefs.current[i]=el}}><span>{c.eyebrow}</span></div>)}</div></section>

    <section className="services section" id="services"><div className="section-head"><div className="services-label"><p className="eyebrow dark"><i/> WHAT WE BUILD</p><span>FULL-SERVICE SOFTWARE DEVELOPMENT</span></div><h2>One team for every<br/><em>part of your product.</em></h2><div className="services-intro"><p>From the first screen to the production server, we plan, build, launch, and support your complete software product.</p><div><span><b>01</b> DESIGN & BUILD</span><i/><span><b>02</b> LAUNCH</span><i/><span><b>03</b> SUPPORT</span></div></div></div><div className="service-list">{services.map(s=><a href="#contact" className="service-row" key={s[0]} data-service={s[1]}><span>{s[0]}</span><h3>{s[1]}</h3><p>{s[2]}</p><small>{s[3]}</small><b><Arrow/></b></a>)}</div></section>

    <section className="work section" id="work"><div className="work-intro"><p className="eyebrow"><i/> PRODUCT CONCEPTS</p><h2>Products shaped around<br/>real business needs.</h2><p>Representative concepts showing how we approach product design, engineering, and delivery. Ask us about relevant client work.</p></div><div className="project-layout"><div className="project-sticky"><ProjectMockup project={projects[activeProject]}/></div><div className="project-list">{projects.map((p,i)=><article key={p.name} tabIndex={0} role="button" aria-pressed={activeProject===i} onMouseEnter={()=>setActiveProject(i)} onFocus={()=>setActiveProject(i)} onClick={()=>setActiveProject(i)} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();setActiveProject(i)}}} className={activeProject===i?"active":""}><span>{p.no} / 03</span><p>{p.type}</p><h3>{p.name}</h3><p className="project-description">{p.description}</p><div className="case-meta"><span>CHALLENGE <b>Turn complexity into clarity.</b></span><span>SOLUTION <b>One focused product system.</b></span></div><small>{p.tech}</small><a href="#contact">Discuss a similar project <Arrow/></a></article>)}</div></div></section>

    <section className="stack section" id="stack"><div className="stack-title"><p className="eyebrow dark"><i/> OUR TECH STACK</p><h2>Technologies<br/>we use.</h2><p>These are the tools we use to build mobile apps, websites, backend systems, databases, and production servers.</p></div><div className="stack-layers">{[["01","MOBILE","React Native","Flutter"],["02","FRONTEND","React","Next.js","JavaScript","TypeScript"],["03","BACKEND","Node.js","Express.js","Fastify"],["04","DATABASE","MongoDB","PostgreSQL","MySQL","Firebase","Supabase"],["05","DEPLOYMENT","Git","CI/CD","Docker","Nginx","SSL","Monitoring"]].map((l,i)=><div key={l[1]}><span>{l[0]}</span><b>{l[1]}</b><p>{l.slice(2).map(x=><em key={x}><TechIcon name={x}/>{x}</em>)}</p><i style={{width:`${100-i*8}%`}}/></div>)}</div></section>

    <section className="process section" id="process"><div className="process-head"><p className="eyebrow"><i/> OUR PROCESS</p><h2>A clear process.<br/>No mystery.</h2></div><div className="process-line">{[["01","Discovery","Goals, users, constraints"],["02","Architecture","Systems, data, infrastructure"],["03","Design","Interfaces, flows, prototypes"],["04","Development","Product, API, integration"],["05","Testing","Quality, security, performance"],["06","Deployment","Ship, observe, stabilize"],["07","Support","Maintain, improve, scale"]].map((s,i)=><div key={s[0]} className={i===5?"lit":""}><span>{s[0]}</span><i/><ProcessIcon index={i}/><h3>{s[1]}</h3><p>{s[2]}</p></div>)}</div><div className="process-note"><span>OUR PRINCIPLE</span><p>Deployment isn’t the end of development. It’s where software starts proving itself.</p></div></section>

    <section className="about section" id="about"><div className="about-copy"><p className="eyebrow dark"><i/> WHY EAGLE NEST</p><h2>Built as one product.<br/><em>Delivered by one team.</em></h2><p>Instead of coordinating several vendors, you work with one team that understands your complete product—from the screens customers use to the server running behind them.</p><div className="about-points"><span><Check/><b>One accountable team</b><small>Clear ownership from planning through launch.</small></span><span><Check/><b>Every layer connected</b><small>Frontend, backend, data, and deployment work together.</small></span></div><a className="button dark-button" href="#contact">Build with Eagle Nest <Arrow/></a></div><div className="about-panel delivery-panel"><div className="delivery-head"><span>YOUR PRODUCT</span><b><i/> READY FOR PRODUCTION</b></div><div className="delivery-map"><div className="delivery-core"><span className="mark"><i/><i/><b/></span><strong>EAGLE NEST</strong><small>ONE ENGINEERING TEAM</small></div>{[["01","PRODUCT UI","Web · Mobile"],["02","APP LOGIC","APIs · Services"],["03","DATA","SQL · NoSQL"],["04","CLOUD","Deploy · Monitor"]].map((item,i)=><div className={`delivery-node node-${i+1}`} key={item[0]}><span>{item[0]}</span><b>{item[1]}</b><small>{item[2]}</small></div>)}</div><div className="delivery-results"><span><Check/> Simple communication</span><span><Check/> Fewer handoff problems</span><span><Check/> Faster path to launch</span></div></div></section>

    <section className="team-promise section"><p className="eyebrow dark"><i/> HOW WE WORK WITH YOU</p><blockquote>“You’ll always know what’s being built, why it matters, and what happens next.”</blockquote><div className="promise-steps"><span><b>01</b> Weekly progress updates</span><span><b>02</b> Working product demos</span><span><b>03</b> Clear ownership</span><span><b>04</b> Support after launch</span></div></section>

    <section className="contact section" id="contact"><div className="contact-copy"><p className="eyebrow"><i/> START A CONVERSATION</p><h2>Have a product<br/>to build?</h2><p>Tell us what you’re building. We’ll help you turn the idea into a reliable, production-ready product.</p><a href="mailto:hello@eaglenesttechnologies.com">hello@eaglenesttechnologies.com <Arrow/></a><div className="availability"><i/> Now booking new software projects</div></div><form onSubmit={submit}>{submitted ? <div className="success"><Check/><h3>Message received.</h3><p>Thanks for reaching out. We’ll reply within 1–2 business days.</p><button type="button" onClick={()=>setSubmitted(false)}>Send another</button></div> : <><div className="field-row"><label>Name<input required placeholder="Your name"/></label><label>Email<input required type="email" placeholder="you@company.com"/></label></div><label>Company<input placeholder="Company name"/></label><label>Project type<select required defaultValue=""><option value="" disabled>Select a service</option><option>Mobile App</option><option>Web Application</option><option>Backend / API</option><option>Full Stack Product</option><option>Infrastructure / Deployment</option><option>Other</option></select></label><label>Estimated budget<select defaultValue=""><option value="" disabled>Select a range</option><option>$5k – $15k</option><option>$15k – $30k</option><option>$30k – $75k</option><option>$75k+</option></select></label><label>Project description<textarea required placeholder="A little about the product, timeline, and what success looks like..." rows={4}/></label><button className="button primary" type="submit">Send project inquiry <Arrow/></button></>}</form></section>

    <footer><div className="footer-top"><div><Brand/><p>We design, build, deploy, and scale modern software.</p></div>{[["Services","Mobile Apps","Web Development","Backend & APIs","Database Development","Servers & Deployment"],["Company","About","Projects","Process","Contact"],["Technologies","React Native","Flutter","Next.js","Node.js","PostgreSQL"]].map(c=><div className="footer-col" key={c[0]}><b>{c[0]}</b>{c.slice(1).map(x=><a href="#services" key={x}>{x}</a>)}</div>)}</div><div className="footer-bottom"><span>© 2026 Eagle Nest Technologies. All rights reserved.</span><div><a href="#">LinkedIn ↗</a><a href="#">GitHub ↗</a><a href="#">Instagram ↗</a></div><a href="#home">Back to top ↑</a></div></footer>
  </main>;
}
