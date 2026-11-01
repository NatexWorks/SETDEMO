export type ContactEmailDraftInput = {
  name: string;
  email: string;
  type: string;
  message: string;
};

export function buildContactEmailDraft({ name, email, type, message }: ContactEmailDraftInput) {
  const subject = encodeURIComponent("Project enquiry — " + name);
  const body = encodeURIComponent(
    "Name: " + name +
    "\nEmail: " + email +
    "\nProject type: " + type +
    "\n\n" + message,
  );

  return "mailto:natexworks@gmail.com?subject=" + subject + "&body=" + body;
}

export type ProjectEmailDraftInput = {
  name: string;
  email: string;
  business: string;
  type: string;
  budget: string;
  goal: string;
  details: string;
};

export function buildProjectEmailDraft({
  name,
  email,
  business,
  type,
  budget,
  goal,
  details,
}: ProjectEmailDraftInput) {
  const subject = encodeURIComponent(`Project enquiry — ${type} — ${name}`);
  const body = encodeURIComponent([
    `Name: ${name}`,
    `Email: ${email}`,
    `Business / project: ${business || "Not provided"}`,
    `Project type: ${type}`,
    `Estimated budget: ${budget || "Not specified"}`,
    "",
    "What I want to build:",
    goal,
    "",
    "Additional details:",
    details || "Not provided",
  ].join("\n"));

  return `mailto:natexworks@gmail.com?subject=${subject}&body=${body}`;
}
