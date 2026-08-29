"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { type FieldPath, useForm, useWatch } from "react-hook-form";

import { Button, buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import {
  projectTypeOptions,
  type QuoteRequestInput,
  quoteRequestSchema,
  quoteServiceOptions,
  timelineOptions,
} from "@/schemas/quote-request";

const steps = [
  { number: "01", label: "Services" },
  { number: "02", label: "Project" },
  { number: "03", label: "Description" },
  { number: "04", label: "Contact" },
] as const;

const stepFields: readonly (readonly FieldPath<QuoteRequestInput>[])[] = [
  ["services"],
  ["projectLocation", "projectType", "targetTimeline"],
  ["description"],
  ["name", "company", "email", "phone"],
];

type SubmissionStatus =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "error"; message: string }
  | { state: "success"; referenceNumber: string };

type QuoteApiResponse = {
  ok: boolean;
  message?: string;
  referenceNumber?: string;
};

function FieldError({ message, id }: { message?: string; id: string }) {
  if (!message) {
    return null;
  }

  return (
    <p className="quote-field-error" id={id} role="alert">
      {message}
    </p>
  );
}

export function QuoteRequestForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>({
    state: "idle",
  });
  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors },
  } = useForm<QuoteRequestInput>({
    resolver: zodResolver(quoteRequestSchema),
    mode: "onTouched",
    defaultValues: {
      submissionId: crypto.randomUUID(),
      services: [],
      projectLocation: "",
      description: "",
      name: "",
      company: "",
      email: "",
      phone: "",
      website: "",
    },
  });

  const [selectedServices, selectedProjectType, selectedTimeline, projectLocation] =
    useWatch({
      control,
      name: ["services", "projectType", "targetTimeline", "projectLocation"],
    });

  async function moveToNextStep() {
    const valid = await trigger(stepFields[currentStep], { shouldFocus: true });

    if (valid) {
      setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
    }
  }

  function moveToPreviousStep() {
    setCurrentStep((step) => Math.max(step - 1, 0));
    setSubmissionStatus({ state: "idle" });
  }

  async function submitQuote(input: QuoteRequestInput) {
    setSubmissionStatus({ state: "submitting" });

    try {
      const response = await fetch("/api/quote-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const result = (await response.json()) as QuoteApiResponse;

      if (!response.ok || !result.ok || !result.referenceNumber) {
        setSubmissionStatus({
          state: "error",
          message:
            result.message ??
            "The request could not be submitted. Please email or call CTS Pacific.",
        });
        return;
      }

      setSubmissionStatus({
        state: "success",
        referenceNumber: result.referenceNumber,
      });
    } catch {
      setSubmissionStatus({
        state: "error",
        message: "The connection was interrupted. Please try again or contact CTS Pacific.",
      });
    }
  }

  if (submissionStatus.state === "success") {
    return (
      <section className="quote-workflow quote-workflow--success" aria-labelledby="quote-success-title">
        <div className="container quote-success">
          <div className="quote-success__mark" aria-hidden="true">
            <Check size={30} strokeWidth={2} />
          </div>
          <p className="eyebrow">Request received</p>
          <h2 id="quote-success-title">Your project request is in the system.</h2>
          <p>
            A confirmation has been sent to your email. Keep this reference for future
            communication:
          </p>
          <strong>{submissionStatus.referenceNumber}</strong>
          <div>
            <Link className={buttonVariants({ size: "large" })} href="/">
              Return home
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link className={buttonVariants({ variant: "secondary" })} href="/services">
              Review capabilities
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="quote-workflow" aria-labelledby="quote-form-title">
      <div className="container">
        <h2 className="visually-hidden" id="quote-form-title">
          CTS Pacific project request form
        </h2>
        <div className="quote-progress-block">
          <p className="eyebrow">Project intake</p>
          <ol className="quote-progress" aria-label="Quote request progress">
            {steps.map((step, index) => (
              <li aria-current={index === currentStep ? "step" : undefined} key={step.number}>
                <span>{step.number}</span>
                <p>{step.label}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="quote-workflow__grid">
          <form noValidate onSubmit={handleSubmit(submitQuote)}>
            <input
              aria-hidden="true"
              className="quote-honeypot"
              tabIndex={-1}
              type="text"
              autoComplete="off"
              {...register("website")}
            />

            {currentStep === 0 ? (
              <fieldset
                aria-describedby={errors.services ? "services-error" : undefined}
                className="quote-step"
              >
                <legend>
                  <span>Step 1</span>
                  <strong>What do you need?</strong>
                </legend>
                <p className="quote-step__intro">
                  Select every capability that may be part of the project. Choose “Not
                  Sure” if the scope still needs to be defined.
                </p>
                <div className="quote-choice-grid">
                  {quoteServiceOptions.map((option, index) => (
                    <label key={option.value}>
                      <input type="checkbox" value={option.value} {...register("services")} />
                      <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                      <strong>{option.label}</strong>
                      <Check aria-hidden="true" size={17} />
                    </label>
                  ))}
                </div>
                <FieldError id="services-error" message={errors.services?.message} />
              </fieldset>
            ) : null}

            {currentStep === 1 ? (
              <fieldset className="quote-step">
                <legend>
                  <span>Step 2</span>
                  <strong>Project information</strong>
                </legend>
                <p className="quote-step__intro">
                  Tell us where the work is planned and the environment it needs to
                  support.
                </p>
                <div className="quote-field-grid">
                  <div className="quote-field quote-field--wide">
                    <label htmlFor="project-location">Project location</label>
                    <input
                      aria-describedby={errors.projectLocation ? "project-location-error" : undefined}
                      aria-invalid={Boolean(errors.projectLocation)}
                      id="project-location"
                      placeholder="Village, facility, or project area"
                      {...register("projectLocation")}
                    />
                    <FieldError id="project-location-error" message={errors.projectLocation?.message} />
                  </div>
                  <div className="quote-field">
                    <label htmlFor="project-type">Project type</label>
                    <select
                      aria-describedby={errors.projectType ? "project-type-error" : undefined}
                      aria-invalid={Boolean(errors.projectType)}
                      id="project-type"
                      defaultValue=""
                      {...register("projectType")}
                    >
                      <option disabled value="">Select project type</option>
                      {projectTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    <FieldError id="project-type-error" message={errors.projectType?.message} />
                  </div>
                  <div className="quote-field">
                    <label htmlFor="target-timeline">Target timeline</label>
                    <select
                      aria-describedby={errors.targetTimeline ? "target-timeline-error" : undefined}
                      aria-invalid={Boolean(errors.targetTimeline)}
                      id="target-timeline"
                      defaultValue=""
                      {...register("targetTimeline")}
                    >
                      <option disabled value="">Select target timeline</option>
                      {timelineOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    <FieldError id="target-timeline-error" message={errors.targetTimeline?.message} />
                  </div>
                </div>
              </fieldset>
            ) : null}

            {currentStep === 2 ? (
              <fieldset className="quote-step">
                <legend>
                  <span>Step 3</span>
                  <strong>Project description</strong>
                </legend>
                <p className="quote-step__intro">
                  Describe the existing conditions, intended outcome, approximate scope,
                  and any known technical requirements.
                </p>
                <div className="quote-field">
                  <label htmlFor="project-description">Project details</label>
                  <textarea
                    aria-describedby={`project-description-help${errors.description ? " project-description-error" : ""}`}
                    aria-invalid={Boolean(errors.description)}
                    id="project-description"
                    placeholder="Tell us what you are planning, replacing, extending, or troubleshooting..."
                    rows={9}
                    {...register("description")}
                  />
                  <p className="quote-field-help" id="project-description-help">
                    Minimum 20 characters. Do not include passwords or sensitive security
                    information.
                  </p>
                  <FieldError id="project-description-error" message={errors.description?.message} />
                </div>
                <div className="quote-attachment-note">
                  <p>Future attachment support</p>
                  <span>
                    Plans, photographs, and scope documents can be coordinated during
                    follow-up. Upload handling will be enabled after the client approves
                    file types, size limits, and retention rules.
                  </span>
                </div>
              </fieldset>
            ) : null}

            {currentStep === 3 ? (
              <fieldset className="quote-step">
                <legend>
                  <span>Step 4</span>
                  <strong>Contact information</strong>
                </legend>
                <p className="quote-step__intro">
                  Provide the contact information CTS Pacific should use for this project
                  request.
                </p>
                <div className="quote-field-grid">
                  <div className="quote-field">
                    <label htmlFor="contact-name">Name</label>
                    <input
                      autoComplete="name"
                      id="contact-name"
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      aria-invalid={Boolean(errors.name)}
                      {...register("name")}
                    />
                    <FieldError id="contact-name-error" message={errors.name?.message} />
                  </div>
                  <div className="quote-field">
                    <label htmlFor="company">Company <span>(optional)</span></label>
                    <input
                      aria-describedby={errors.company ? "company-error" : undefined}
                      aria-invalid={Boolean(errors.company)}
                      autoComplete="organization"
                      id="company"
                      {...register("company")}
                    />
                    <FieldError id="company-error" message={errors.company?.message} />
                  </div>
                  <div className="quote-field">
                    <label htmlFor="contact-email">Email</label>
                    <input
                      autoComplete="email"
                      id="contact-email"
                      inputMode="email"
                      type="email"
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      aria-invalid={Boolean(errors.email)}
                      {...register("email")}
                    />
                    <FieldError id="contact-email-error" message={errors.email?.message} />
                  </div>
                  <div className="quote-field">
                    <label htmlFor="contact-phone">Phone</label>
                    <input
                      autoComplete="tel"
                      id="contact-phone"
                      inputMode="tel"
                      type="tel"
                      aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                      aria-invalid={Boolean(errors.phone)}
                      {...register("phone")}
                    />
                    <FieldError id="contact-phone-error" message={errors.phone?.message} />
                  </div>
                </div>
                <p className="quote-form-notice">
                  By submitting, you are asking CTS Pacific to contact you about this
                  project request. Do not include passwords, access credentials, or other
                  sensitive security information.
                </p>
              </fieldset>
            ) : null}

            {submissionStatus.state === "error" ? (
              <div className="quote-submit-error" role="alert">
                <strong>We could not complete the online submission.</strong>
                <p>{submissionStatus.message}</p>
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </div>
            ) : null}

            <div className="quote-form-actions">
              {currentStep > 0 ? (
                <Button onClick={moveToPreviousStep} type="button" variant="secondary">
                  <ArrowLeft aria-hidden="true" size={17} />
                  Previous
                </Button>
              ) : <span />}
              {currentStep < steps.length - 1 ? (
                <Button onClick={moveToNextStep} type="button">
                  Continue
                  <ArrowRight aria-hidden="true" size={17} />
                </Button>
              ) : (
                <Button disabled={submissionStatus.state === "submitting"} type="submit">
                  {submissionStatus.state === "submitting"
                    ? "Submitting request…"
                    : "Submit project request"}
                  <ArrowRight aria-hidden="true" size={17} />
                </Button>
              )}
            </div>
          </form>

          <aside className="quote-summary" aria-label="Project request summary">
            <p>Request summary</p>
            <div>
              <span>Services</span>
              <strong>
                {selectedServices.length > 0
                  ? selectedServices
                      .map(
                        (service) =>
                          quoteServiceOptions.find((option) => option.value === service)?.label,
                      )
                      .filter(Boolean)
                      .join(", ")
                  : "Not selected"}
              </strong>
            </div>
            <div>
              <span>Location</span>
              <strong>{projectLocation || "Not provided"}</strong>
            </div>
            <div>
              <span>Project type</span>
              <strong>
                {projectTypeOptions.find((option) => option.value === selectedProjectType)?.label ??
                  "Not selected"}
              </strong>
            </div>
            <div>
              <span>Timeline</span>
              <strong>
                {timelineOptions.find((option) => option.value === selectedTimeline)?.label ??
                  "Not selected"}
              </strong>
            </div>
            <p>
              Your request is validated before it is stored and emailed to CTS Pacific.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
