import type { Cta } from "../../../lib/models/ui";

const buttonStyles: Record<
  NonNullable<Cta["variant"]>,
  Record<NonNullable<Cta["color"]>, string>
> = {
  arrow: {
    white: "bg-white text-green-dark hover:bg-white/90",
    blue: "bg-blue text-white hover:bg-blue-500",
  },
  border: {
    white:
      "bg-transparent border border-white text-white hover:bg-white hover:text-green-dark",
    blue: "bg-transparent border border-blue text-blue hover:bg-blue hover:text-white",
  },
  default: {
    white: "bg-white text-green-dark hover:bg-white/90 hover:text-green-dark/90",
    blue: "bg-blue text-white hover:bg-blue/90 text-white/90",
  },
};

export function Button({
  label,
  variant = "default",
  href,
  color = "blue",
}: Cta) {
  const arrow = variant === "arrow";

  return (
    <a
      href={href}
      className={`flex w-max gap-5 px-6 py-4 text-1xl font-bold uppercase leading-5 rounded-full transition-colors ${buttonStyles[variant][color]}`}
    >
      {label}
      {arrow && (
        <span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.7966 9.51485L11.874 16.7867C11.744 16.9233 11.5677 17 11.3839 17C11.2001 17 11.0238 16.9233 10.8938 16.7867C10.7638 16.6502 10.6908 16.465 10.6908 16.2719C10.6908 16.0788 10.7638 15.8936 10.8938 15.757L16.6354 9.72719H1.69226C1.50866 9.72719 1.33258 9.65058 1.20276 9.5142C1.07294 9.37783 1 9.19286 1 9C1 8.80714 1.07294 8.62217 1.20276 8.4858C1.33258 8.34942 1.50866 8.27281 1.69226 8.27281H16.6354L10.8938 2.24296C10.7638 2.10641 10.6908 1.92121 10.6908 1.72811C10.6908 1.535 10.7638 1.3498 10.8938 1.21326C11.0238 1.07671 11.2001 1 11.3839 1C11.5677 1 11.744 1.07671 11.874 1.21326L18.7966 8.48515C18.8611 8.5527 18.9122 8.63295 18.9471 8.72129C18.982 8.80964 19 8.90435 19 9C19 9.09565 18.982 9.19036 18.9471 9.27871C18.9122 9.36705 18.8611 9.4473 18.7966 9.51485Z"
              fill="currentColor"
            />
          </svg>
        </span>
      )}
    </a>
  );
}
