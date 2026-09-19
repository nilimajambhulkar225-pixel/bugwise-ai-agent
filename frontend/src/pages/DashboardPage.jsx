import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { listAnalyses } from "../services/api";
import StatusBadge from "../components/StatusBadge";

export default function DashboardPage() {
  const [analyses, setAnalyses] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => { listAnalyses().then(({ data }) => setAnalyses(data.analyses)).catch((err) => setError(err.response?.data?.message || "Connect MongoDB to load workspace data.")); }, []);
  const critical = analyses.filter((item) => item.severity === "Critical").length;
  const high = analyses.filter((item) => item.priority === "High").length;
  return <div><div className="page-heading"><div><p className="eyebrow">OVERVIEW</p><h1>Good morning, developer.</h1><p className="muted">Here is the signal across your recent bug analyses.</p></div><Link className="button button-primary" to="/app/analyze">+ Analyze bug</Link></div>{error && <div className="notice">{error}</div>}<div className="stats-grid"><div className="stat-card"><span>Total analyzed</span><strong>{analyses.length}</strong><small>All-time workspace</small></div><div className="stat-card"><span>Critical issues</span><strong>{critical}</strong><small>Needs immediate attention</small></div><div className="stat-card"><span>High priority</span><strong>{high}</strong><small>Ready for triage</small></div></div><section className="panel"><div className="panel-heading"><div><p className="eyebrow">ACTIVITY</p><h2>Recent analyses</h2></div><Link className="text-link" to="/app/history">View all</Link></div>{analyses.length ? <div className="analysis-list">{analyses.slice(0, 5).map((item) => <Link className="analysis-row" to={`/app/history?id=${item._id}`} key={item._id}><div><strong>{item.title}</strong><span>{item.category} · {new Date(item.createdAt).toLocaleDateString()}</span></div><StatusBadge value={item.priority} /></Link>)}</div> : <div className="empty-state"><h3>No analyses yet</h3><p>Start with a bug report and build your first useful signal.</p><Link className="text-link" to="/app/analyze">Create analysis</Link></div>}</section></div>;
}
