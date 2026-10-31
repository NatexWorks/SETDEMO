"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type FormState = "idle" | "draft-requested" | "error";

type ProjectEnquiryFormProps = {
  initialProjectType?: string;
};

export default function ProjectEnquiryForm({ initialProjectType = "" }: ProjectEnquiryFormProps) {
  const [state, setState] = useState<FormState>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const businessName = String(data.get("businessName") || "").trim() || "Not provided";
    const projectType = String(data.get("projectType") || "Not specified");
    const budget = String(data.get("budget") || "Not specified");
    const goal = String(data.get("goal") || "").trim();
    const details = String(data.get("details") || "").trim();

    try {
      const subject = encodeURIComponent(`Project enquiry — ${projectType} — ${name}`);
      const body = encodeURIComponent(
        [
          `Name: ${name}`,
          `Email: ${email}`,
          `Business / project: ${businessName}`,
          `Project type: ${projectType}`,
          `Estimated budget: ${budget}`,
          "",
          "What I want to build:",
          goal,
          "",
          "Additional details:",
          details || "Not provided"
        ].join("\n")
      );

      window.location.href = `mailto:natexworks@gmail.com?subject=${subject}&body=${body}`;
      setState("draft-requested");
    } catch {
      setState("error");
    }
  }

  return (
    <form className="contact-form project-enquiry-form" onSubmit={handleSubmit}>
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
        <span>Business or project name <small>(optional)</small></span>
        <input name="businessName" autoComplete="organization" maxLength={120} placeholder="What should I call the project?" />
      </label>
      <div className="form-pair">
        <label>
          <span>Type of project</span>
          <select name="projectType" defaultValue={initialProjectType} required>
            <option value="" disabled>Select a project type</option>
            <option value="Business website">Business website</option>
            <option value="Café / business website">Café / business website</option>
            <option value="Custom web application">Custom web application</option>
            <option value="Inventory / business application">Inventory / business application</option>
            <option value="Interface refinement">Interface refinement</option>
            <option value="Local SEO foundations">Local SEO foundations</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </label>
        <label>
          <span>Estimated budget <small>(optional)</small></span>
          <select name="budget" defaultValue="">
            <option value="">Not decided yet</option>
            <option>Under ₹25,000</option>
            <option>₹25,000–₹50,000</option>
            <option>₹50,000–₹1,00,000</option>
            <option>₹1,00,000+</option>
            <option>Prefer to discuss</option>
          </select>
        </label>
      </div>
      <label>
        <span>What do you want to build?</span>
        <textarea name="goal" required minLength={12} maxLength={2000} rows={4} placeholder="What is the problem, who is it for, and what should become easier?" />
      </label>
      <label>
        <span>Additional details <small>(optional)</small></span>
        <textarea name="details" maxLength={3000} rows={4} placeholder="Share any useful context, timeline, or existing links." />
      </label>
      <div className="form-submit-row">
        <button className="button button-dark" type="submit">Prepare project email <span aria-hidden="true">↗</span></button>
        <p role="status" aria-live="polite">
          {state === "draft-requested"
            ? "Your email app should open with the enquiry details. Review the draft and send it to complete the enquiry."
            : state === "error"
              ? "The draft could not be prepared. Please email natexworks@gmail.com directly."
              : "This prepares an email draft. It does not send, store, or submit your enquiry to a server."}
        </p>
      </div>
    </form>
  );
}
