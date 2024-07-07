export default function BeltIcon({
  strokeWidth = "4",
  strokeColour,
  transparent = false,
  ...props
}: {
  strokeWidth?: string;
  strokeColour?: string;
  transparent?: boolean;
} & React.SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="478.619"
      height="184.762"
      viewBox="0 0 478.619 184.762"
      overflow="visible"
      {...props}
    >
      <switch>
        <g>
          <g stroke={strokeColour ?? "currentColor"} strokeWidth={strokeWidth}>
            <path
              className={transparent ? "fill-background" : "fill-current"}
              d="M192.044 46.054s-1.475 4.952.21 7.375c1.686 2.423 24.86 1.791 24.86 1.791L205.845 45l-13.801 1.054z"
            />
            <path
              className={transparent ? "fill-background" : "fill-current"}
              d="M9.831 23.198S129.012 55.285 243.61 55.285 458.289 4.098 462.11 1.806c3.819-2.292 12.987 38.963.765 48.131-12.225 9.168-80.983 48.896-216.208 48.896-135.226 0-233.015-21.392-239.892-29.032-6.876-7.64-6.876-38.199 3.056-46.603z"
            />
            <path
              className={transparent ? "fill-background" : "fill-current"}
              d="M252.014 126.336s-22.156-6.112-28.268-21.392c-6.111-15.279 58.827-29.795 58.827-29.795l-6.112 31.324-24.447 19.863z"
            />
            <path
              className={transparent ? "fill-background" : "fill-current"}
              d="M195.479 102.652s30.56 21.392 35.143 19.1c4.584-2.292 58.827-36.671 58.827-36.671L243.61 51.465l-50.423 38.2 2.292 12.987z"
            />
            <path
              className={transparent ? "fill-background" : "fill-current"}
              d="M22.818 152.312S148.111 75.914 223.746 45.354c75.635-30.56 30.56 29.031 30.56 29.031s-78.69 38.199-110.778 57.299-81.746 50.424-87.858 51.188c-6.112.763-32.852-30.56-32.852-30.56z"
            />
            <path
              className={transparent ? "fill-background" : "fill-current"}
              d="M255.967 27.303s-5.29-1.851-14.146 8.46c-8.857 10.312 15.07 8.197 15.07 8.197l-.924-16.657z"
            />
            <path
              className={transparent ? "fill-background" : "fill-current"}
              d="M232.15 28.546s94.734 49.659 127.586 60.355c32.851 10.696 113.832 46.603 116.889 55.771s-27.503 30.559-27.503 30.559-23.685-21.391-54.243-34.379c-30.56-12.987-83.274-34.379-112.306-48.131-29.031-13.751-89.387-47.367-89.387-47.367l38.964-16.808z"
            />
            <path
              className={transparent ? "fill-background" : "fill-current"}
              d="M255.834 27.782s-2.292 92.442-4.584 97.026c-2.293 4.584 42.783-12.987 43.546-18.335.765-5.349 6.877-50.423 2.293-55.007s-36.672-25.976-41.255-23.684zM52.833 134.34s20.641 24.654 33.446 31.918c4.013-1.912 87.34-50.839 87.34-50.839s-25.801-22.933-29.623-32.107c-7.453 4.205-91.163 51.028-91.163 51.028z"
            />
            <path
              className={transparent ? "fill-background" : "fill-current"}
              d="M62.006 129.18s20.641 24.655 33.446 31.917c4.013-1.911 68.995-40.707 68.995-40.707s-25.801-22.933-29.624-32.108c-7.452 4.205-72.817 40.898-72.817 40.898z"
            />
          </g>
        </g>
      </switch>
    </svg>
  );
}
