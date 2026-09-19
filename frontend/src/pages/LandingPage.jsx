import { Link } from "react-router-dom";

const features = [
  ["01", "Sharper triage", "Classify category, severity, priority, and language in seconds."],
  ["02", "Useful context", "Get likely causes and practical fixes instead of generic advice."],
  ["03", "A living record", "Keep every successful analysis searchable and ready to share."],
];

export default function LandingPage() {
  return (
    <div className="landing-page">
      <nav className="landing-nav"><Link className="brand" to="/"><span className="brand-mark">B</span><span>BugWise <em>AI</em></span></Link><Link className="text-link" to="/app">Open workspace</Link></nav>
      <section className="landing-hero">
        <div className="hero-copy"><p className="eyebrow">AI-POWERED BUG INTELLIGENCE</p><h1>Turn bug reports into intelligent solutions.</h1><p className="hero-subtitle">A calm, structured workspace for developers who need to move from “something is broken” to “here is what to do next.”</p><div className="hero-actions"><Link className="button button-primary" to="/app/analyze">Analyze your bug</Link><a className="button button-secondary" href="#features">Explore features</a></div></div>
        <div className="preview-window"><div className="preview-top"><span>BugWise analysis</span><span className="preview-status">● Ready</span></div><div className="preview-body"><p className="preview-label">LATEST REPORT</p><h3>Checkout timeout on mobile</h3><div className="preview-tags"><span className="status-badge status-major">Major</span><span className="tag">Backend</span><span className="tag">JavaScript</span></div><div className="preview-line"><span>AI summary</span><strong>Request budget is exceeded during payment handoff.</strong></div><div className="preview-grid"><div><span>Likely cause</span><b>API timeout</b></div><div><span>Priority</span><b className="orange-text">High</b></div></div></div></div>
      </section>
      <section className="landing-section" id="features"><p className="eyebrow">WHY BUGWISE</p><h2>Less guessing. More useful momentum.</h2><div className="feature-grid">{features.map(([number, title, text]) => <article className="feature-item" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
      <section className="process-band"><div><p className="eyebrow">A SIMPLE LOOP</p><h2>Describe. Understand. Resolve.</h2></div><div className="process-list"><p><b>01</b><span><strong>Describe the signal</strong><br />Add the report details and reproduction context.</span></p><p><b>02</b><span><strong>Let AI connect the dots</strong><br />Gemini turns the report into structured engineering insight.</span></p><p><b>03</b><span><strong>Take the next step</strong><br />Keep the fix, test suggestions, and history close at hand.</span></p></div></section>
      <footer className="landing-footer"><span>BugWise AI</span><span>Independent tool for better debugging.</span></footer>
    </div>
  );
}
