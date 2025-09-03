"use client";
import { useState } from "react";

import { Button } from "../ui/Button";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className=" mx-auto flex items-center justify-between px-4 md:px-10 py-4">
        {/* Лого */}
        <div className="text-xl font-bold">MyLogo</div>

        {/* Навигация */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#hero" className="hover:text-blue-600">
            Home
          </a>
          <a href="#about" className="hover:text-blue-600">
            About us
          </a>
          <a href="#service" className="hover:text-blue-600">
            Services
          </a>
          <a href="#solutions" className="hover:text-blue-600">
            Solution
          </a>
          <a href="#faq" className="hover:text-blue-600">
            FAQ
          </a>
        </nav>

        {/* CTA кнопка */}
        <Button
          href="/contact"
          label="contact"
          color="blue"
          variant="default"
        />

        {/* Бургер для мобилы */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-controls="site-nav"
          aria-expanded={open}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
