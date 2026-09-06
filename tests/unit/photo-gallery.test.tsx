import { fireEvent, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { beforeAll, describe, expect, test, vi } from "vitest";

import { PhotoGallery } from "@/components/marketing/photo-gallery";

const photos = [
  {
    src: "/images/example.webp",
    alt: "Example field work",
    caption: "Example installation",
  },
] as const;

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn(function showModal(this: HTMLDialogElement) {
    this.setAttribute("open", "");
  });
  HTMLDialogElement.prototype.close = vi.fn(function close(this: HTMLDialogElement) {
    this.removeAttribute("open");
  });
});

describe("PhotoGallery", () => {
  test("waits for hydration before enabling the photo viewer", () => {
    const gallery = <PhotoGallery id="hydration" title="Field work" eyebrow="Photos" description="Gallery" photos={photos} />;
    const html = new DOMParser().parseFromString(renderToString(gallery), "text/html");
    expect(html.querySelector("button")?.disabled).toBe(true);
    render(gallery);
    expect(screen.getByRole("button", { name: "View full photo: Example installation" })).toBeEnabled();
  });

  test("keeps grouped collages intact and restores focus after Escape", () => {
    render(
      <PhotoGallery
        id="grouped-work"
        eyebrow="Field details"
        title="Camera installations"
        description="Equipment and connected systems"
        groups={[{
          id: "equipment",
          title: "Camera equipment",
          description: "Supplied equipment views",
          photos: [{ ...photos[0]!, preserveFrame: true }],
        }]}
      />,
    );
    expect(screen.getByRole("heading", { level: 3, name: "Camera equipment" })).toBeVisible();
    expect(screen.getByRole("img")).toHaveStyle({ objectFit: "contain" });
    const trigger = screen.getByRole("button", { name: "View full photo: Example installation" });
    fireEvent.click(trigger);
    fireEvent(screen.getByRole("dialog"), new Event("cancel", { cancelable: true }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    expect(document.body.style.overflow).toBe("");
  });

  test("opens gallery items in a modal and closes them without navigating", () => {
    render(
      <PhotoGallery
        description="Project photography"
        eyebrow="Field work"
        id="project-gallery"
        photos={photos}
        title="Infrastructure in action"
      />,
    );

    const trigger = screen.getByRole("button", { name: "View full photo: Example installation" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(trigger);

    expect(screen.getByRole("dialog", { name: "Example installation" })).toBeInTheDocument();
    expect(screen.getAllByRole("img", { name: "Example field work" })).toHaveLength(2);

    fireEvent.click(screen.getByRole("button", { name: "Close image viewer" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
