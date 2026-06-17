/**
 * The BRAVE wordmark — five letterforms from brave.org, drawn in currentColor.
 * `height` sets the rendered size; color comes from the surrounding text color.
 */
export function BraveLogo({
  height = 20,
  className,
  title = "Brave Church",
}: {
  height?: number;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 727 91"
      role="img"
      aria-label={title}
      className={className}
      style={{ height, width: "auto", display: "block" }}
    >
      <g fill="currentColor">
        <path d="M51.02 54.22H108.47V67.25H51.02V54.22ZM51.02 23.59H108.47V36.62H51.02V23.59ZM0 0L14.03 14.66V90.84H133.41L145.45 78.26V58.15L145.49 58.13L133.3 45.4L145.46 32.69V12.71L133.29 0.02L133.31 0H0Z" />
        <path transform="translate(146,0)" d="M51.03 23.59H108.48V45.42H51.03V23.59ZM0 0L14.03 14.66V90.84H51.03V48.97L101.87 90.84H146.07L118.21 67.87L145.47 45.41V12.7L133.31 0.02L133.33 0H0Z" />
        <path transform="translate(293,0)" d="M49.89 58.14L63.53 23.59H80.56L94.2 58.17L49.89 58.15V58.14ZM19.69 0L31.13 11.95L0 90.84H36.99L49.23 59.82L86.9 90.84H144.08L108.24 0H19.69Z" />
        <path transform="translate(438,0)" d="M90.71 0L102.3 12.11L80.55 67.25H63.52L36.99 0H0L35.83 90.84H108.23L144.07 0H90.71Z" />
        <path transform="translate(581,0)" d="M0 0L14.03 14.66V90.84H145.46V54.22H108.47V67.25H51.02V54.22H97.33V36.62H51.02V23.59H108.47V36.62H145.46V0H0Z" />
      </g>
    </svg>
  );
}
