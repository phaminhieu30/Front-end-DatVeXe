import React from "react";

export default function SeatBooked() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={44}
      viewBox="0 0 28 44"
      style={{ width: 22, height: 37 }}
    >
      <g fill="#fff" stroke="#000" strokeWidth=".5" className="gheDaChon">
        <g>
          <rect width={28} height={44} rx={4} stroke="none" />
          <rect
            x=".25"
            y=".25"
            width="27.5"
            height="43.5"
            rx="3.75"
            fill="none"
          />
        </g>
        <g transform="translate(2)">
          <rect width={24} height={34} rx={2} stroke="none" />
          <rect
            x=".25"
            y=".25"
            width="23.5"
            height="33.5"
            rx="1.75"
            fill="none"
          />
        </g>
        <g transform="translate(6 36)">
          <rect width={16} height={8} rx={2} stroke="none" />
          <rect
            x=".25"
            y=".25"
            width="15.5"
            height="7.5"
            rx="1.75"
            fill="none"
          />
        </g>
      </g>
    </svg>
  );
}
