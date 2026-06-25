export default function Panel({ title, subtitle, action, className = "", children }) {
  return (
    <section className={`panel ${className}`}>
      <div className="panelHeader">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
