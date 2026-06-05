'use client';

import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, ArrowDownRight, type LucideIcon } from 'lucide-react';

/* Primitives UI du dashboard (charte Jint) — recréées sans dépendance externe. */

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'default' | 'sm' | 'icon';
};
export function Button({ children, variant = 'default', size = 'default', className = '', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-full text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC82C] disabled:pointer-events-none disabled:opacity-50';
  const variants = {
    default: 'bg-[#FFC82C] text-[#0A1F19] hover:bg-[#F2BD29] shadow-sm',
    secondary: 'bg-[#0A1F19] text-white hover:bg-[#16332A] shadow-sm',
    outline: 'border-2 border-[#E8E6DF] bg-white text-[#0A1F19] hover:border-[#0A1F19] hover:bg-[#F5F4F0]',
    ghost: 'hover:bg-[#E8E6DF] text-[#0A1F19]',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-sm',
  };
  const sizes = { default: 'h-11 px-5 py-2', sm: 'h-9 px-4', icon: 'h-11 w-11' };
  return <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{children}</button>;
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { icon?: LucideIcon };
export function Input({ className = '', icon: Icon, ...props }: InputProps) {
  return (
    <div className="relative">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4A5D58]" />}
      <input
        className={`flex h-11 w-full rounded-full border-2 border-[#E8E6DF] bg-white px-4 py-2 text-sm placeholder:text-[#4A5D58] focus-visible:outline-none focus-visible:border-[#0A1F19] disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${Icon ? 'pl-11' : ''} ${className}`}
        {...props}
      />
    </div>
  );
}

export function Badge({ children, variant = 'default', className = '' }: { children: ReactNode; variant?: 'default' | 'success' | 'warning'; className?: string }) {
  const variants = {
    default: 'bg-[#E8E6DF] text-[#0A1F19]',
    success: 'bg-[#8ED6FB]/20 text-[#064A6E] border border-[#8ED6FB]/40',
    warning: 'bg-[#FFC82C]/20 text-[#7A5C00] border border-[#FFC82C]/40',
  };
  return <div className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold border-transparent ${variants[variant]} ${className}`}>{children}</div>;
}

export const Skeleton = ({ className = '' }: { className?: string }) => <div className={`animate-pulse rounded-2xl bg-[#E8E6DF] ${className}`} />;

export function DropdownMenu({ trigger, children }: { trigger: ReactNode; children: ReactNode }) {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const MENU_W = 220;

  // Ferme au clic hors du trigger ET hors du menu (le menu est porté dans <body>).
  useEffect(() => {
    if (!pos) return;
    const maybe = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!ref.current?.contains(t) && !menuRef.current?.contains(t)) setPos(null);
    };
    document.addEventListener('mousedown', maybe);
    return () => document.removeEventListener('mousedown', maybe);
  }, [pos]);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (pos) { setPos(null); return; }
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setPos({ top: r.bottom + 8, left: Math.max(8, r.right - MENU_W) });
  };

  // Menu en position fixe (coords figées au clic) → on le ferme au scroll/resize
  // pour éviter qu'il se détache de la carte. (capture: true → capte tout conteneur scrollable.)
  useEffect(() => {
    if (!pos) return;
    const close = () => setPos(null);
    window.addEventListener('scroll', close, true);
    window.addEventListener('resize', close);
    return () => { window.removeEventListener('scroll', close, true); window.removeEventListener('resize', close); };
  }, [pos]);

  return (
    <div className="relative" ref={ref}>
      <div onClick={toggle}>{trigger}</div>
      {pos && typeof document !== 'undefined' && createPortal(
        // Portal sur <body> : échappe à tout ancêtre `transform`/`perspective`
        // (la carte 3D flip) qui ferait dériver un `position: fixed`.
        <div
          ref={menuRef}
          className="fixed z-[200] rounded-xl border border-[#E8E6DF] bg-white p-1.5 shadow-lg"
          style={{ top: pos.top, left: pos.left, width: MENU_W }}
          onClick={() => setPos(null)}
        >
          {children}
        </div>,
        document.body,
      )}
    </div>
  );
}

export function DropdownItem({ children, onClick, disabled = false, className = '', danger = false }: { children: ReactNode; onClick?: (e: React.MouseEvent) => void; disabled?: boolean; className?: string; danger?: boolean }) {
  return (
    <button
      disabled={disabled}
      onClick={(e) => { e.stopPropagation(); if (!disabled) onClick?.(e); }}
      className={`relative flex w-full select-none items-center rounded-lg px-3 py-2 text-sm font-medium outline-none transition-colors hover:bg-[#F5F4F0] disabled:pointer-events-none disabled:opacity-60 ${danger ? 'text-red-600 hover:bg-red-50' : 'text-[#0A1F19]'} ${className}`}
    >
      {children}
    </button>
  );
}

export function Modal({ isOpen, onClose, title, description, children }: { isOpen: boolean; onClose: () => void; title: string; description?: string; children: ReactNode }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] bg-[#0A1F19]/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-xl p-8" style={{ width: 'min(28rem, calc(100vw - 2rem))' }} onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-[#0A1F19] mb-3">{title}</h2>
        {description && <p className="text-base text-[#4A5D58] mb-8">{description}</p>}
        {children}
      </div>
    </div>
  );
}

export function MetricCard({ title, value, icon: Icon, trend, isPositive }: { title: string; value: string | number; icon: LucideIcon; trend?: string; isPositive?: boolean | null }) {
  return (
    <div className="bg-white rounded-3xl border border-[#E8E6DF] p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-[#4A5D58]">{title}</h3>
        <div className="p-2.5 bg-[#F5F4F0] rounded-xl text-[#0A1F19]"><Icon className="h-5 w-5" /></div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-extrabold text-[#0A1F19]">{value}</span>
        {trend && (
          <span className={`text-sm font-bold flex items-center ${isPositive ? 'text-emerald-600' : isPositive === false ? 'text-red-600' : 'text-[#4A5D58]'}`}>
            {isPositive ? <ArrowUpRight className="h-4 w-4 mr-0.5" /> : isPositive === false ? <ArrowDownRight className="h-4 w-4 mr-0.5" /> : null}
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}

export function SidebarItem({ icon: Icon, label, active }: { icon: LucideIcon; label: string; active?: boolean }) {
  return (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${active ? 'bg-[#F5F4F0] text-[#0A1F19]' : 'text-[#4A5D58] hover:text-[#0A1F19] hover:bg-[#F5F4F0]/50'}`}>
      <Icon className="h-5 w-5" />
      {label}
    </button>
  );
}

export function JintLogo({ className = 'h-8 w-auto' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1190 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 410.097H94.2859C111.45 410.097 123.511 405.486 130.469 396.266C137.428 387.045 140.907 371.83 140.907 350.622V15.906H245.282V355.463C245.282 403.412 233.917 439.604 211.186 464.039C188.92 488.013 156.911 500 115.161 500H0V410.097Z" fill="#141817" />
      <path d="M376.926 255.878C376.926 248.041 374.838 242.047 370.663 237.898C366.488 233.748 360.458 231.674 352.572 231.674H288.555V151.452H381.101C409.862 151.452 432.361 159.751 448.597 176.349C465.297 192.485 473.647 214.846 473.647 243.43V500H376.926V255.878ZM477.126 0V101.66H374.143V0H477.126Z" fill="#141817" />
      <path d="M540.018 151.452H636.739V199.862C646.481 182.803 660.63 169.663 679.185 160.443C698.205 150.761 719.776 145.92 743.898 145.92C769.412 145.92 791.911 151.683 811.394 163.209C831.342 174.735 846.65 190.871 857.32 211.618C868.453 232.365 874.02 256.109 874.02 282.849V500H776.603V304.288C776.603 283.08 770.34 265.791 757.815 252.42C745.29 238.589 729.054 231.674 709.106 231.674C695.19 231.674 682.665 235.131 671.531 242.047C660.862 248.502 652.28 257.722 645.785 269.71C639.755 281.236 636.739 294.375 636.739 309.129V500H540.018V151.452Z" fill="#141817" />
      <path d="M1097.45 500C1070.55 500 1047.12 495.159 1027.17 485.477C1007.23 475.334 991.687 460.811 980.553 441.909C969.42 422.545 963.853 399.723 963.853 373.444V231.674H897.053V151.452H963.853V48.4094H1061.27V151.452H1155.21V231.674H1061.27V369.295C1061.27 385.892 1065.45 398.34 1073.8 406.639C1082.15 414.938 1094.21 419.087 1109.98 419.087H1190V500H1097.45Z" fill="#141817" />
    </svg>
  );
}
