"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "ready";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const projectType = String(data.get("projectType") || "Not specified");
    const message = String(data.get("message") || "").trim();
    const subject = encodeURIComponent(`Project enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject type: ${projectType}\n\nProject details:\n${message}`
    );

    window.location.href = `mailto:natexworks@gmail.com?subject=${subject}&body=${body}`;
    setState("ready");
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-pair">
        <label>
          <span>Your name</span>
          <input name="name" autoComplete="name" required maxLength={90} placeholder="How should I address you?" />
        </label>
        <label>
          <span>Email address</span>
          <input name="email" type="email" autoComplete="email" required maxLength={140} placeholder="you@company.com" />
        </label>
      </div>
      <label>
        <span>What are you looking to build?</span>
        <select name="projectType" defaultValue="">
          <option value="" disabled>Select a project type</option>
          <option>Business website</option>
          <option>Custom web application</option>
          <option>Interface refinement</option>
          <option>Local SEO foundations</option>
          <option>Something else</option>
        </select>
      </label>
      <label>
        <span>A little about the project</span>
        <textarea name="message" required minLength={12} maxLength={4000} rows={6} placeholder="What is the problem, who is it for, and what would a useful result look like?" />
      </label>
      <div className="form-submit-row">
        <button className="button button-dark" type="submit">Prepare email <span aria-hidden="true">↗</span></button>
        <p role="status" aria-live="polite">
          {state === "ready"
            ? "Your email app should open with the enquiry drafted. Send it there to complete the message."
            : "This form opens your email app; it does not send or store your message."}
        </p>
      </div>
    </form>
  );
}
