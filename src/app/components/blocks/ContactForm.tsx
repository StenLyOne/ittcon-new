"use client";

import { useState } from "react";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      message: form.get("message"),
    };
    setState("sending");
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });
    setState(res.ok ? "ok" : "err");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-lg">
      <div className="relative">
        <input
          type="text"
          name="name"
          id="name"
          placeholder=" "
          required
          className="peer w-full border border-black bg-white px-3 pt-5 pb-2 text-sm outline-none focus:border-black"
        />
        <label
          htmlFor="name"
          className="absolute left-3 top-2.5 text-gray-500 text-xs transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2.5 peer-focus:text-xs peer-focus:text-black"
        >
          Имя
        </label>
      </div>

      <div className="relative">
        <input
          type="email"
          name="email"
          id="email"
          placeholder=" "
          required
          className="peer w-full border border-black bg-white px-3 pt-5 pb-2 text-sm outline-none focus:border-black"
        />
        <label
          htmlFor="email"
          className="absolute left-3 top-2.5 text-gray-500 text-xs transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2.5 peer-focus:text-xs peer-focus:text-black"
        >
          Email
        </label>
      </div>

      <div className="relative">
        <input
          name="phone"
          id="phone"
          placeholder=" "
          required
          className="peer w-full border border-black bg-white px-3 pt-5 pb-2 text-sm outline-none focus:border-black resize-none"
        />
        <label
          htmlFor="phone"
          className="absolute left-3 top-2.5 text-gray-500 text-xs transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2.5 peer-focus:text-xs peer-focus:text-black"
        >
          Phone number
        </label>
      </div>

      <div className="relative">
        <textarea
          name="message"
          id="message"
          placeholder=" "
          rows={4}
          className="peer w-full border border-black bg-white px-3 pt-5 pb-2 text-sm outline-none focus:border-black resize-none"
        />
        <label
          htmlFor="message"
          className="absolute left-3 top-2.5 text-gray-500 text-xs transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2.5 peer-focus:text-xs peer-focus:text-black"
        >
          Сообщение
        </label>
      </div>

      <button
        className="w-full border border-black bg-white py-2 text-sm font-medium transition-colors hover:bg-black hover:text-white disabled:opacity-50"
        disabled={state === "sending"}
      >
        {state === "sending" ? "Отправляем…" : "Отправить"}
      </button>

      {state === "ok" && (
        <p className="text-green-600 text-sm">Сообщение отправлено.</p>
      )}
      {state === "err" && (
        <p className="text-red-600 text-sm">Ошибка. Попробуйте позже.</p>
      )}
    </form>
  );
}
