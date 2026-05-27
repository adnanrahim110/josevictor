"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import { CONTACT } from "@/constants";
import { useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

function InputField({
  id,
  label,
  type = "text",
  value,
  onChange,
  required = false,
  isTextarea = false,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  required?: boolean;
  isTextarea?: boolean;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;

  return (
    <div className="relative group/field">
      <div
        className={cn(
          "absolute inset-0 rounded-xl transition-all duration-500 ease-out z-0",
          isFocused
            ? "bg-primary-100/50 scale-[1.02]"
            : "bg-transparent group-hover/field:bg-primary-50/50",
        )}
      />

      <div className="relative z-10 flex flex-col">
        <label
          htmlFor={id}
          className={cn(
            "absolute left-4 transition-all duration-300 ease-out pointer-events-none text-primary-500",
            isActive
              ? "text-xs top-2 translate-y-0"
              : "text-base top-1/2 -translate-y-1/2",
          )}
          style={isTextarea && !isActive ? { top: "24px" } : {}}
        >
          {label} {required && <span className="text-secondary-500">*</span>}
        </label>

        {isTextarea ? (
          <textarea
            id={id}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            required={required}
            className={cn(
              "w-full bg-transparent border-2 border-primary-200 rounded-xl px-4 pb-3 pt-6 text-primary-950 transition-all duration-300 outline-none resize-none min-h-35",
              isFocused
                ? "border-primary-500 shadow-[0_0_15px_rgba(126,149,125,0.15)]"
                : "group-hover/field:border-primary-300",
            )}
          />
        ) : (
          <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            required={required}
            className={cn(
              "w-full bg-transparent border-2 border-primary-200 rounded-xl px-4 pb-2 pt-6 h-14 text-primary-950 transition-all duration-300 outline-none",
              isFocused
                ? "border-primary-500 shadow-[0_0_15px_rgba(126,149,125,0.15)]"
                : "group-hover/field:border-primary-300",
            )}
          />
        )}
      </div>
    </div>
  );
}

type GlobalContactVariant = "legacy" | "pdf";

export function GlobalContact({
  variant = "legacy",
}: {
  variant?: GlobalContactVariant;
}) {
  const { t } = useLocale();
  const isPdf = variant === "pdf";
  const copy = isPdf
    ? {
        aria: t("contact.global.aria.section"),
        eyebrow: t("contact.global.eyebrow"),
        prompt: t("contact.global.prompt"),
        heading: t("contact.global.heading"),
        subheading: t("contact.global.subheading"),
        body: [
          t("contact.global.body1"),
          t("contact.global.body2"),
          t("contact.global.body3"),
        ],
        signature: t("contact.global.signature"),
        closing: t("contact.global.closing"),
        phone: t("contact.detail.phone"),
        email: t("contact.detail.email"),
        entity: t("contact.detail.entity"),
        labels: {
          name: t("contact.form.name"),
          email: t("contact.form.email"),
          subject: t("contact.form.subject"),
          message: t("contact.form.message"),
          submit: t("contact.form.submit"),
          success: t("contact.form.success"),
          privacy: t("contact.form.privacy"),
        },
      }
    : {
        aria: "Get in touch",
        eyebrow: "Let's Connect",
        prompt: "",
        heading: "Ready to strategize, grow, or heal?",
        subheading: "",
        body: [
          "Whether you're looking for strategic business consulting or holistic mental health services, we're here to partner with you. Drop us a message and we'll get back to you shortly.",
        ],
        signature: "",
        closing: "",
        phone: "Phone",
        email: "Email",
        entity: "Entity Details",
        labels: {
          name: "Full Name",
          email: "Email Address",
          subject: "Subject",
          message: "How can we help you?",
          submit: "Send Message",
          success: "Message Sent!",
          privacy:
            "This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.",
        },
      };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <Section
      aria-label={copy.aria}
      className="relative bg-white overflow-hidden py-24 border-t border-primary-100"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 size-150 bg-secondary-50/50 rounded-full blur-[100px] -translate-y-1/2 opacity-70" />
        <div className="absolute bottom-0 left-1/4 size-125 bg-primary-50/80 rounded-full blur-[100px] translate-y-1/2 opacity-60" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="lg:col-span-6 flex flex-col h-full justify-between"
          >
            <div>
              <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary-200 bg-primary-50">
                <span className="text-xs font-semibold tracking-widest text-primary-600 uppercase">
                  {copy.eyebrow}
                </span>
              </div>
              <Title className="mb-6 text-4xl lg:text-5xl">
                {copy.heading}
                {copy.subheading && (
                  <span className="block text-secondary-600 italic">
                    {copy.subheading}
                  </span>
                )}
              </Title>
              <div className="text-lg text-primary-700 leading-relaxed mb-10 space-y-4">
                {copy.prompt && <p>{copy.prompt}</p>}
                {copy.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {copy.signature && (
                  <p className="font-heading text-2xl text-primary-950">
                    {copy.signature}
                  </p>
                )}
                {copy.closing && (
                  <p className="text-base text-primary-600">{copy.closing}</p>
                )}
              </div>

              <div className="space-y-6">
                <a
                  href={`tel:${CONTACT.phoneRaw}`}
                  className="group flex items-center gap-4 text-primary-700 hover:text-primary-950 transition-colors"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 border border-primary-100 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-100 group-hover:border-primary-300">
                    <Phone className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-primary-500 uppercase tracking-wider mb-0.5">
                      {copy.phone}
                    </span>
                    <span className="text-lg font-semibold relative overflow-hidden">
                      <span className="block">{CONTACT.phone}</span>
                      <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-primary-950 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:origin-left group-hover:scale-x-100" />
                    </span>
                  </div>
                </a>

                <a
                  href={`mailto:${CONTACT.email}`}
                  className="group flex items-center gap-4 text-primary-700 hover:text-primary-950 transition-colors"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 border border-primary-100 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-100 group-hover:border-primary-300">
                    <Mail className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-primary-500 uppercase tracking-wider mb-0.5">
                      {copy.email}
                    </span>
                    <span className="text-lg font-semibold relative overflow-hidden">
                      <span className="block flex-1">{CONTACT.email}</span>
                      <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-primary-950 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:origin-left group-hover:scale-x-100" />
                    </span>
                  </div>
                </a>

                <div className="flex items-start gap-4 text-primary-700 mt-8 pt-6 border-t border-primary-100">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-950">
                    <MapPin className="h-5 w-5 text-secondary-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-primary-500 uppercase tracking-wider mb-1">
                      {copy.entity}
                    </span>
                    <span className="text-sm font-medium leading-relaxed text-primary-950">
                      JVJ Consulting, LLC
                      <br />
                      Unique Entity ID: VX64CYX89JG5 PR OGPE
                      2024-607685-PU-374659
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            className="lg:col-span-6 lg:pl-12"
          >
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-primary-100/50">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5">
                  <InputField
                    id="name"
                    label={copy.labels.name}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <InputField
                    id="email"
                    label={copy.labels.email}
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <InputField
                  id="subject"
                  label={copy.labels.subject}
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
                <InputField
                  id="message"
                  label={copy.labels.message}
                  value={formData.message}
                  onChange={handleChange}
                  isTextarea
                  required
                />

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-primary-400 max-w-62.5">
                    {copy.labels.privacy}
                  </p>
                  <Button
                    type="submit"
                    icon={<Send className="w-4 h-4" />}
                    loading={isSubmitting}
                    disabled={isSuccess}
                    className="min-w-40"
                  >
                    {isSuccess ? copy.labels.success : copy.labels.submit}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
