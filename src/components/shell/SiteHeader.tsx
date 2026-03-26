const navItems = [
  { label: 'Home', active: true },
  { label: 'Documents', active: false },
  { label: 'Pages', active: false },
  { label: 'Site contents', active: false },
];

/** Header du site SharePoint — logo badge + titre + nav locale */
export function SiteHeader() {
  return (
    <div className="bg-white border-b border-[#edebe9] shrink-0">
      <div>
        {/* Logo + titre + actions */}
        <div className="flex items-center justify-between px-lg pt-lg pb-sm">
          <div className="flex items-center gap-md">
            {/* Logo badge */}
            <div className="w-12 h-12 bg-sp-primary flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-heading-sm">CS</span>
            </div>
            {/* Titre + labels */}
            <div className="flex flex-col gap-2xs">
              <div className="flex items-center gap-sm">
                <span className="text-heading-sm font-semibold text-[#323130]">SharePoint site title</span>
                <span className="text-caption text-[#605e5c]">Confidential</span>
                <span className="text-caption text-[#605e5c]">|</span>
                <span className="text-caption text-[#605e5c]">Corporate Advisory +2</span>
              </div>
            </div>
          </div>
          {/* Actions */}
          <div className="flex items-center gap-md">
            <button className="flex items-center gap-xs text-[#323130] hover:text-sp-primary text-body">
              {/* Star/Follow — I4045:5825;1850:35218;1850:34874 */}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.67969 8.57227L11.375 14L7 10.6367L2.625 14L4.32031 8.57227L0 5.25H5.35938L7 0L8.64062 5.25H14L9.67969 8.57227ZM9.71387 11.6211C9.54069 11.056 9.36751 10.4954 9.19434 9.93945C9.02116 9.37891 8.84342 8.81608 8.66113 8.25098C9.13053 7.90007 9.5931 7.54688 10.0488 7.19141C10.5046 6.83594 10.9648 6.48047 11.4297 6.125H7.99805L7 2.93262L6.00195 6.125H2.57031C3.03516 6.48047 3.49544 6.83594 3.95117 7.19141C4.4069 7.54688 4.86947 7.90007 5.33887 8.25098C5.15658 8.81608 4.97884 9.37891 4.80566 9.93945C4.63249 10.4954 4.45931 11.056 4.28613 11.6211L7 9.5293L9.71387 11.6211Z" fill="currentColor"/>
              </svg>
              <span>Not following</span>
            </button>
            <button className="flex items-center gap-xs text-[#323130] hover:text-sp-primary text-body">
              {/* Share — I4045:5825;1850:35219;1850:34869 */}
              <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.625 10.5L10.5 9.625V12.25H0V3.5H0.875V11.375H9.625V10.5ZM8.75 7C8.16667 7 7.59473 7.05924 7.03418 7.17773C6.47819 7.29167 5.94043 7.46257 5.4209 7.69043C4.90137 7.91374 4.40462 8.18945 3.93066 8.51758C3.46126 8.84115 3.02604 9.21029 2.625 9.625V8.75C2.625 8.1849 2.69792 7.64258 2.84375 7.12305C2.98958 6.59896 3.19466 6.11133 3.45898 5.66016C3.72786 5.20443 4.04688 4.79199 4.41602 4.42285C4.78971 4.04915 5.20215 3.73014 5.65332 3.46582C6.10905 3.19694 6.59668 2.98958 7.11621 2.84375C7.6403 2.69792 8.1849 2.625 8.75 2.625V0L13.5625 4.8125L8.75 9.625V7ZM9.44043 3.5C9.18522 3.5 8.94596 3.50228 8.72266 3.50684C8.49935 3.51139 8.27832 3.52734 8.05957 3.55469C7.84082 3.57747 7.62207 3.61849 7.40332 3.67773C7.18457 3.73242 6.95215 3.8099 6.70605 3.91016C6.30957 4.07422 5.94043 4.28385 5.59863 4.53906C5.26139 4.79427 4.95833 5.08594 4.68945 5.41406C4.42513 5.73763 4.19954 6.09082 4.0127 6.47363C3.8304 6.85189 3.69596 7.25065 3.60938 7.66992C4.375 7.15951 5.19303 6.77441 6.06348 6.51465C6.93392 6.25488 7.82943 6.125 8.75 6.125H9.625V7.5127L12.3252 4.8125L9.625 2.1123V3.5H9.44043Z" fill="currentColor"/>
              </svg>
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Navigation locale */}
        <nav className="flex items-end px-lg gap-lg" style={{ marginLeft: '60px' }}>
          {navItems.map(({ label, active }) => (
            <button
              key={label}
              className={[
                'pb-sm text-body whitespace-nowrap border-b-2 transition-colors',
                active
                  ? 'border-sp-primary text-sp-primary font-semibold'
                  : 'border-transparent text-[#323130] hover:text-sp-primary',
              ].join(' ')}
            >
              {label}
            </button>
          ))}
          <button className="pb-sm text-body text-sp-primary border-b-2 border-transparent hover:border-sp-primary">
            Edit
          </button>
        </nav>
      </div>
    </div>
  );
}
