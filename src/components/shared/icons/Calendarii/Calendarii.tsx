// src/icons/Calendarii/Calendarii.tsx
import { SVGProps } from "react";

export default function Calendarii(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 16 16'
      width='1em'
      height='1em'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      aria-label='calendar'
      {...props}
    >
      <path d='M6 0H3v2H1v3h14V2h-2V0h-3v2H6V0Z' />
      <path d='M15 7H1v8h14V7Z' />
    </svg>
  );
}
