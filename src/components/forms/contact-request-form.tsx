"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button, buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import {
  contactInquiryOptions,
  type ContactSubmissionInput,
  contactSubmissionSchema,
} from "@/schemas/contact-submission";

type SubmissionStatus =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "error"; message: string }
  | { state: "success"; referenceNumber: string };

type ContactApiResponse = {
  ok: boolean;
  message?: string;
  referenceNumber?: string;
};

const subscribeToHydrationState = () => () => undefined;

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p className="quote-field-error" id={id} role="alert">
      {message}
    </p>
  );
}

export function ContactRequestForm() {
  const isHydrated = useSyncExternalStore(
    subscribeToHydrationState,
    () => true,
    () => false,
  );
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>({
    state: "idle",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactSubmissionInput>({
    resolver: zodResolver(contactSubmissionSchema),
    mode: "onTouched",
    defaultValues: {
      submissionId: crypto.randomUUID(),
      name: "",
      company: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      website: "",
    },
  });

  async function submitContactRequest(input: ContactSubmissionInput) {
    setSubmissionStatus({ state: "submitting" });

    try {
      const response = await fetch("/api/contact-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const result = (await response.json()) as ContactApiResponse;

      if (!response.ok || !result.ok || !result.referenceNumber) {
        setSubmissionStatus({
          state: "error",
          message:
            result.message ??
            "The inquiry could not be submitted. Please email or call CTS Pacific.",
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
        message:
          "The connection was interrupted. Please try again or contact CTS Pacific directly.",
      });
    }
  }

  if (submissionStatus.state === "success") {
    return (
      <section
        className="contact-form-section contact-form-section--success"
        id="contact-form"
        aria-labelledby="contact-success-title"
      >
        <div className="container contact-form-success">
          <div aria-hidden="true" className="quote-success__mark">
            <Check size={30} strokeWidth={2} />
          </div>
          <p className="eyebrow">Inquiry received</p>
          <h2 id="contact-success-title">Your message is in the system.</h2>
          <p>
            A confirmation has been sent to your email. Keep this reference for
            future communication:
          </p>
          <strong>{submissionStatus.referenceNumber}</strong>
          <div>
            <Link className={buttonVariants({ size: "large" })} href="/">
              Return home
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link className={buttonVariants({ variant: "secondary" })} href="/services">
              Review services
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="contact-form-section"
      id="contact-form"
      aria-labelledby="contact-form-title"
    >
      <div className="container contact-form-layout">
        <div className="contact-form-intro">
          <p className="eyebrow">General inquiries</p>
          <h2 id="contact-form-title">Send a message to CTS Pacific.</h2>
          <p>
            Use this form for company, service, and coordination questions. For a
            defined location, timeline, or technical scope, use the project quote
            pathway.
          </p>
          <Link href="/quote">
            Start a project request
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>

        <form method="post" noValidate onSubmit={handleSubmit(submitContactRequest)}>
          <input
            aria-hidden="true"
            autoComplete="off"
            className="quote-honeypot"
            tabIndex={-1}
            type="text"
            {...register("website")}
          />

          <div className="quote-field-grid">
            <div className="quote-field">
              <label htmlFor="inquiry-name">Name</label>
              <input
                aria-describedby={errors.name ? "inquiry-name-error" : undefined}
                aria-invalid={Boolean(errors.name)}
                autoComplete="name"
                id="inquiry-name"
                {...register("name")}
              />
              <FieldError id="inquiry-name-error" message={errors.name?.message} />
            </div>

            <div className="quote-field">
              <label htmlFor="inquiry-company">
                Company <span>(optional)</span>
              </label>
              <input
                aria-describedby={errors.company ? "inquiry-company-error" : undefined}
                aria-invalid={Boolean(errors.company)}
                autoComplete="organization"
                id="inquiry-company"
                {...register("company")}
              />
              <FieldError id="inquiry-company-error" message={errors.company?.message} />
            </div>

            <div className="quote-field">
              <label htmlFor="inquiry-email">Email</label>
              <input
                aria-describedby={errors.email ? "inquiry-email-error" : undefined}
                aria-invalid={Boolean(errors.email)}
                autoComplete="email"
                id="inquiry-email"
                inputMode="email"
                type="email"
                {...register("email")}
              />
              <FieldError id="inquiry-email-error" message={errors.email?.message} />
            </div>

            <div className="quote-field">
              <label htmlFor="inquiry-phone">
                Phone <span>(optional)</span>
              </label>
              <input
                aria-describedby={errors.phone ? "inquiry-phone-error" : undefined}
                aria-invalid={Boolean(errors.phone)}
                autoComplete="tel"
                id="inquiry-phone"
                inputMode="tel"
                type="tel"
                {...register("phone")}
              />
              <FieldError id="inquiry-phone-error" message={errors.phone?.message} />
            </div>

            <div className="quote-field">
              <label htmlFor="inquiry-type">Inquiry type</label>
              <select
                aria-describedby={errors.inquiryType ? "inquiry-type-error" : undefined}
                aria-invalid={Boolean(errors.inquiryType)}
                defaultValue=""
                id="inquiry-type"
                {...register("inquiryType")}
              >
                <option disabled value="">
                  Select inquiry type
                </option>
                {contactInquiryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <FieldError id="inquiry-type-error" message={errors.inquiryType?.message} />
            </div>

            <div className="quote-field">
              <label htmlFor="inquiry-subject">Subject</label>
              <input
                aria-describedby={errors.subject ? "inquiry-subject-error" : undefined}
                aria-invalid={Boolean(errors.subject)}
                id="inquiry-subject"
                {...register("subject")}
              />
              <FieldError id="inquiry-subject-error" message={errors.subject?.message} />
            </div>

            <div className="quote-field quote-field--wide">
              <label htmlFor="inquiry-message">Message</label>
              <textarea
                aria-describedby={`inquiry-message-help${errors.message ? " inquiry-message-error" : ""}`}
                aria-invalid={Boolean(errors.message)}
                id="inquiry-message"
                rows={7}
                {...register("message")}
              />
              <p className="quote-field-help" id="inquiry-message-help">
                Minimum 20 characters. Do not include passwords, access credentials,
                or sensitive security information.
              </p>
              <FieldError id="inquiry-message-error" message={errors.message?.message} />
            </div>
          </div>

          <p className="quote-form-notice">
            By submitting, you are asking CTS Pacific to contact you about this
            inquiry.
          </p>

          {submissionStatus.state === "error" ? (
            <div className="quote-submit-error" role="alert">
              <strong>We could not complete the online submission.</strong>
              <p>{submissionStatus.message}</p>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </div>
          ) : null}

          <div className="contact-form-actions">
            <Button
              disabled={!isHydrated || submissionStatus.state === "submitting"}
              type="submit"
            >
              {submissionStatus.state === "submitting"
                ? "Sending inquiry…"
                : "Send inquiry"}
              <ArrowRight aria-hidden="true" size={17} />
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
