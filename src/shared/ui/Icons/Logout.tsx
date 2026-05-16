import { SVGProps } from 'react';

export function LogoutIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M10 16.6666C6.3181 16.6666 3.33333 13.6818 3.33333 9.99992C3.33333 6.31802 6.3181 3.33325 10 3.33325"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8.33366 10H16.667M14.167 12.5L16.667 10L14.167 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
