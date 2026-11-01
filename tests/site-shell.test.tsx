import { createElement } from "react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SiteShell from "../components/site-shell";

const navigationState = vi.hoisted(() => ({ pathname: "/about" }));

vi.mock("next/navigation", () => ({
  usePathname: () => navigationState.pathname,
}));

vi.mock("next/link", () => ({
  default: (props: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children?: ReactNode }) => {
    const { href, children, ...rest } = props;
    return createElement("a", { ...rest, href }, children);
  },
}));

describe("SiteShell navigation", () => {
  beforeEach(() => {
    navigationState.pathname = "/about";
  });

  it("marks the current route in the primary navigation", () => {
    render(<SiteShell><div>Page content</div></SiteShell>);

    const primaryNavigation = screen.getByRole("navigation", { name: "Main navigation" });
    expect(primaryNavigation.querySelector('a[href="/about"]')).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("main")).toHaveTextContent("Page content");
  });

  it("opens the mobile menu and closes it with Escape while restoring focus", async () => {
    const user = userEvent.setup();
    render(<SiteShell><div>Page content</div></SiteShell>);

    const toggle = screen.getByRole("button", { name: "Open navigation" });
    const mobileNavigation = screen.getByRole("navigation", { name: "Mobile navigation" });

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(mobileNavigation).toHaveAttribute("aria-hidden", "false");

    await user.keyboard("{Escape}");

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(mobileNavigation).toHaveAttribute("aria-hidden", "true");
    expect(toggle).toHaveFocus();
  });

  it("exposes the menu relationship and hides closed menu links from tab order", () => {
    render(<SiteShell><div>Page content</div></SiteShell>);

    const toggle = screen.getByRole("button", { name: "Open navigation" });
    const mobileNavigation = document.getElementById("mobile-navigation");

    expect(toggle).toHaveAttribute("aria-controls", "mobile-navigation");
    expect(mobileNavigation?.querySelectorAll('a[tabindex="-1"]')).toHaveLength(5);
  });
});
