import { SVGProps } from 'react';

export function CrossIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M4.1665 4.16663L15.8332 15.8333M4.16653 15.8333L9.99986 9.99996L15.8332 4.16663"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
