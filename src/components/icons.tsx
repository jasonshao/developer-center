import type { ReactNode, SVGProps } from "react";

export type IconProps = {
  size?: number;
  stroke?: number;
  fill?: string;
  className?: string;
} & Omit<SVGProps<SVGSVGElement>, "fill" | "stroke">;

type BaseProps = IconProps & { children?: ReactNode };

const Icon = ({ size = 16, stroke = 1.5, fill = "none", children, ...rest }: BaseProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={fill}
    stroke="currentColor"
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...rest}
  >
    {children}
  </svg>
);

export const Icons = {
  Search: (p: IconProps) => (
    <Icon {...p}>
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5 13.5 13.5" />
    </Icon>
  ),
  ArrowRight: (p: IconProps) => (
    <Icon {...p}>
      <path d="M3.5 8h9M9 4.5 12.5 8 9 11.5" />
    </Icon>
  ),
  ArrowUpRight: (p: IconProps) => (
    <Icon {...p}>
      <path d="M5 11 11 5M6 5h5v5" />
    </Icon>
  ),
  Chevron: (p: IconProps) => (
    <Icon {...p}>
      <path d="M6 4l4 4-4 4" />
    </Icon>
  ),
  ChevronDown: (p: IconProps) => (
    <Icon {...p}>
      <path d="M4 6l4 4 4-4" />
    </Icon>
  ),
  Check: (p: IconProps) => (
    <Icon {...p}>
      <path d="M3 8.5 6 11.5 13 4.5" />
    </Icon>
  ),
  Copy: (p: IconProps) => (
    <Icon {...p}>
      <rect x="4.5" y="4.5" width="8" height="8" rx="1.5" />
      <path d="M4.5 9.5H3.5a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v1" />
    </Icon>
  ),
  Info: (p: IconProps) => (
    <Icon {...p}>
      <circle cx="8" cy="8" r="6" />
      <path d="M8 7.5v3.5M8 5.3v.2" />
    </Icon>
  ),
  Warn: (p: IconProps) => (
    <Icon {...p}>
      <path d="M8 2.5 14 13H2z" />
      <path d="M8 6.5v3M8 11.3v.2" />
    </Icon>
  ),
  Menu: (p: IconProps) => (
    <Icon {...p}>
      <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" />
    </Icon>
  ),
  Github: (p: IconProps) => (
    <Icon {...p} fill="currentColor" stroke="none">
      <path d="M8 1.3a6.7 6.7 0 0 0-2.1 13.06c.33.06.45-.15.45-.32l-.01-1.14c-1.86.4-2.25-.9-2.25-.9-.3-.77-.74-.98-.74-.98-.6-.41.05-.4.05-.4.67.05 1.03.69 1.03.69.6 1.02 1.56.73 1.94.56.06-.44.23-.73.42-.9-1.48-.17-3.04-.74-3.04-3.3 0-.73.26-1.33.69-1.8-.07-.17-.3-.85.06-1.77 0 0 .56-.18 1.84.69a6.4 6.4 0 0 1 3.34 0c1.28-.87 1.84-.69 1.84-.69.36.92.14 1.6.07 1.77.43.47.69 1.07.69 1.8 0 2.57-1.57 3.13-3.06 3.3.24.2.45.61.45 1.23l-.01 1.82c0 .17.12.39.45.32A6.7 6.7 0 0 0 8 1.3" />
    </Icon>
  ),
  Play: (p: IconProps) => (
    <Icon {...p}>
      <polygon points="5,3.5 12,8 5,12.5" fill="currentColor" stroke="none" />
    </Icon>
  ),
  Book: (p: IconProps) => (
    <Icon {...p}>
      <path d="M3 3h6a2 2 0 0 1 2 2v8H5a2 2 0 0 1-2-2V3zM13 3h-1a2 2 0 0 0-2 2v8h1a2 2 0 0 0 2-2V3z" fill="none" />
    </Icon>
  ),
  Code: (p: IconProps) => (
    <Icon {...p}>
      <path d="M5.5 5 3 8l2.5 3M10.5 5 13 8l-2.5 3" />
    </Icon>
  ),
  Bolt: (p: IconProps) => (
    <Icon {...p}>
      <path d="M9 1.5 3.5 9h4L7 14.5 12.5 7h-4z" />
    </Icon>
  ),
  Shield: (p: IconProps) => (
    <Icon {...p}>
      <path d="M8 1.5 3 3.5v4c0 3 2.5 5.5 5 7 2.5-1.5 5-4 5-7v-4z" />
    </Icon>
  ),
  Grid: (p: IconProps) => (
    <Icon {...p}>
      <rect x="2.5" y="2.5" width="4.5" height="4.5" rx="0.8" />
      <rect x="9" y="2.5" width="4.5" height="4.5" rx="0.8" />
      <rect x="2.5" y="9" width="4.5" height="4.5" rx="0.8" />
      <rect x="9" y="9" width="4.5" height="4.5" rx="0.8" />
    </Icon>
  ),
  Phone: (p: IconProps) => (
    <Icon {...p}>
      <rect x="4.5" y="1.5" width="7" height="13" rx="1.5" />
      <path d="M7 12.5h2" />
    </Icon>
  ),
  Link: (p: IconProps) => (
    <Icon {...p}>
      <path d="M6.5 9.5 9.5 6.5M7 4.5l1-1a2.5 2.5 0 0 1 3.5 3.5l-1 1M9 11.5l-1 1A2.5 2.5 0 0 1 4.5 9l1-1" />
    </Icon>
  ),
  Bell: (p: IconProps) => (
    <Icon {...p}>
      <path d="M8 1.5v1.2M4 11.5c-.6 0-1-.5-.6-1 .6-.8.6-2 .6-3.5 0-2 1.8-4 4-4s4 2 4 4c0 1.5 0 2.7.6 3.5.4.5 0 1-.6 1zM6.5 13a1.5 1.5 0 0 0 3 0" />
    </Icon>
  ),
  Wallet: (p: IconProps) => (
    <Icon {...p}>
      <rect x="2" y="3.5" width="12" height="9" rx="1.5" />
      <path d="M11 8.5h2M2 6h12" />
    </Icon>
  ),
  Flame: (p: IconProps) => (
    <Icon {...p}>
      <path d="M8 1.5c0 2.5-3 3.5-3 6.5a3 3 0 0 0 6 0c0-1.5-1-2-1-3.5 0 1-1 1.5-2 3z" />
    </Icon>
  ),
  Dot: (p: IconProps) => (
    <Icon {...p}>
      <circle cx="8" cy="8" r="1.5" fill="currentColor" stroke="none" />
    </Icon>
  ),
  FAQ: (p: IconProps) => (
    <Icon {...p}>
      <circle cx="8" cy="8" r="6" />
      <path d="M6.5 6.5a1.5 1.5 0 1 1 2.3 1.3c-.5.3-.8.7-.8 1.2v.2M8 11.5v.2" />
    </Icon>
  ),
  External: (p: IconProps) => (
    <Icon {...p}>
      <path d="M9 2h5v5M14 2 7.5 8.5M12 9v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4" />
    </Icon>
  ),
  Clock: (p: IconProps) => (
    <Icon {...p}>
      <circle cx="8" cy="8" r="6" />
      <path d="M8 4.5V8l2.5 1.5" />
    </Icon>
  ),
  Bug: (p: IconProps) => (
    <Icon {...p}>
      <rect x="5" y="5" width="6" height="7" rx="2" />
      <path d="M3 7.5h2M11 7.5h2M3 11h2M11 11h2M8 5V3.5M6.5 3.5 8 5l1.5-1.5" />
    </Icon>
  ),
} as const;

export type IconName = keyof typeof Icons;
