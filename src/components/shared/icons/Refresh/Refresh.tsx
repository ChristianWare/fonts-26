// src/icons/Refresh/Refresh.tsx
import { SVGProps } from "react";

export default function Refresh(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 24 24'
      width='1em'
      height='1em'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-label='refresh icon'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8' />
      <path d='M3 3v5h5' />
      <path d='M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16' />
      <path d='M16 16h5v5' />
    </svg>
  );
}
