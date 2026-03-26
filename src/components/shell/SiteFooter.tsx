const footerLinks = ['Footer link', 'Footer link', 'Footer link', 'Footer link', 'Footer link', 'Footer link', 'Footer link'];

/** Footer du site SharePoint — 48px, bg-sp-primary */
export function SiteFooter() {
  return (
    <footer className="h-12 bg-sp-primary flex items-center px-lg gap-lg shrink-0">
      {/* Logo + nom */}
      <div className="flex items-center gap-sm shrink-0">
        <div className="border border-white px-xs py-2xs">
          <span className="text-white text-caption font-bold uppercase tracking-wide">Footer Logo</span>
        </div>
        <span className="text-white text-body">Footer display name</span>
      </div>

      {/* Liens */}
      <div className="flex items-center gap-lg ml-auto">
        {footerLinks.map((link, i) => (
          <button key={i} className="text-white text-body hover:underline whitespace-nowrap">
            {link}
          </button>
        ))}
      </div>
    </footer>
  );
}
