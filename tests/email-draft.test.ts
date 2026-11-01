import { describe, expect, it } from "vitest";
import { buildContactEmailDraft, buildProjectEmailDraft } from "../lib/email-draft";

function readMailto(draft: string) {
  const query = draft.split("?")[1] || "";
  return new URLSearchParams(query);
}

describe("email draft builders", () => {
  it("encodes contact details without losing punctuation or line breaks", () => {
    const draft = buildContactEmailDraft({
      name: "Asha & Co",
      email: "asha@example.com",
      type: "Custom web application",
      message: "Please improve stock tracking.\nThe current process is manual.",
    });
    const params = readMailto(draft);

    expect(draft.startsWith("mailto:natexworks@gmail.com?")).toBe(true);
    expect(params.get("subject")).toBe("Project enquiry — Asha & Co");
    expect(params.get("body")).toContain("Email: asha@example.com");
    expect(params.get("body")).toContain("Please improve stock tracking.\nThe current process is manual.");
  });

  it("includes project context and clear defaults for optional fields", () => {
    const draft = buildProjectEmailDraft({
      name: "Ravi",
      email: "ravi@example.com",
      business: "",
      type: "Local SEO foundations",
      budget: "",
      goal: "Make it easier for local customers to find the business.",
      details: "",
    });
    const params = readMailto(draft);
    const body = params.get("body") || "";

    expect(params.get("subject")).toBe("Project enquiry — Local SEO foundations — Ravi");
    expect(body).toContain("Business / project: Not provided");
    expect(body).toContain("Estimated budget: Not specified");
    expect(body).toContain("What I want to build:");
    expect(body).toContain("Additional details:\nNot provided");
  });
});
