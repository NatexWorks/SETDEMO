import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import ContactForm from "../components/contact-form";
import ProjectEnquiryForm from "../components/project-enquiry-form";

describe("Contact form", () => {
  it("provides labelled required fields and explains the email handoff", () => {
    render(<ContactForm />);

    const name = screen.getByRole("textbox", { name: "Your name" });
    const email = screen.getByRole("textbox", { name: "Email address" });
    const message = screen.getByRole("textbox", { name: "A little context" });

    expect(name).toBeRequired();
    expect(email).toBeRequired();
    expect(email).toHaveAttribute("type", "email");
    expect(message).toBeRequired();
    expect(screen.getByRole("button", { name: /Prepare enquiry/i })).toBeEnabled();
    expect(screen.getByText(/does not send or store your message/i)).toBeInTheDocument();
  });
});

describe("Project enquiry form", () => {
  it("prefills the selected project context and keeps required fields valid", () => {
    render(<ProjectEnquiryForm initialProjectType="Local SEO foundations" />);

    expect(screen.getByLabelText("Type of project")).toHaveValue("Local SEO foundations");
    expect(screen.getByLabelText("Your name")).toBeRequired();
    expect(screen.getByLabelText("Email address")).toHaveAttribute("type", "email");
    expect(screen.getByLabelText("What do you want to build?")).toBeRequired();
    expect(screen.getByLabelText("What do you want to build?")).toHaveAttribute("minlength", "12");
    expect(screen.getByText(/does not send, store, or submit your enquiry/i)).toBeInTheDocument();
  });

  it("lets a visitor change the project type without submitting the form", async () => {
    const user = userEvent.setup();
    render(<ProjectEnquiryForm />);

    const projectType = screen.getByLabelText("Type of project");
    await user.selectOptions(projectType, "Custom web application");

    expect(projectType).toHaveValue("Custom web application");
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
  });
});
