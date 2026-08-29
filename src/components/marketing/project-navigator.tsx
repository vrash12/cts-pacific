"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { projectIntents } from "@/config/homepage";

type ProjectIntentId = (typeof projectIntents)[number]["id"];

export function ProjectNavigator() {
  const [selectedId, setSelectedId] = useState<ProjectIntentId>(projectIntents[0].id);
  const selectedIntent =
    projectIntents.find((intent) => intent.id === selectedId) ?? projectIntents[0];

  return (
    <section className="project-navigator" aria-labelledby="project-navigator-title">
      <div className="container">
        <div className="project-navigator__heading">
          <div>
            <p className="eyebrow">Project navigator</p>
            <h2 id="project-navigator-title">Find the capability that fits the work.</h2>
          </div>
          <p>
            Choose the closest project need. The navigator will point you to a relevant
            CTS Pacific capability without requiring technical terminology.
          </p>
        </div>

        <div className="project-navigator__workspace">
          <div className="project-navigator__choices" aria-label="Project needs">
            {projectIntents.map((intent) => (
              <button
                aria-controls="project-navigator-result"
                aria-pressed={intent.id === selectedIntent.id}
                key={intent.id}
                onClick={() => setSelectedId(intent.id)}
                type="button"
              >
                <span>{intent.number}</span>
                <strong>{intent.prompt}</strong>
                <span aria-hidden="true">→</span>
              </button>
            ))}
          </div>

          <div
            className="project-navigator__result"
            id="project-navigator-result"
            aria-live="polite"
          >
            <div className="project-navigator__result-inner" key={selectedIntent.id}>
              <p>{selectedIntent.number} / Recommended capability</p>
              <h3>{selectedIntent.title}</h3>
              <span>{selectedIntent.description}</span>
              <div className="project-navigator__tags" aria-label="Relevant capabilities">
                {selectedIntent.capabilities.map((capability) => (
                  <span key={capability}>{capability}</span>
                ))}
              </div>
              <div className="project-navigator__actions">
                <Link
                  className={buttonVariants({ variant: "inverse" })}
                  href={selectedIntent.href}
                >
                  {selectedIntent.linkLabel}
                  <ArrowRight aria-hidden="true" size={17} />
                </Link>
                {selectedIntent.href === "/quote" ? (
                  <Link className={buttonVariants({ variant: "ghost" })} href="/contact">
                    Contact CTS Pacific
                    <ArrowRight aria-hidden="true" size={17} />
                  </Link>
                ) : (
                  <Link className={buttonVariants({ variant: "ghost" })} href="/quote">
                    Request a quote
                    <ArrowRight aria-hidden="true" size={17} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
