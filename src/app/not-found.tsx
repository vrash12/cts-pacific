import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="container not-found__content">
        <p className="eyebrow">Route not found</p>
        <h1>This infrastructure path is not connected yet.</h1>
        <p>
          Return to the CTS Pacific homepage or start a project request.
        </p>
        <div className="not-found__actions">
          <Link className={buttonVariants()} href="/">Return home</Link>
          <Link className={buttonVariants({ variant: "secondary" })} href="/quote">
            Request a quote
          </Link>
        </div>
      </div>
    </main>
  );
}
