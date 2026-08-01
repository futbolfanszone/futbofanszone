"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

type FormState = {
  type: "quiz" | "job" | "general";
  name: string;
  email: string;
  phone: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  message: string;
  availability: string;
  videoLink: string;
};

const initial: FormState = {
  type: "quiz",
  name: "",
  email: "",
  phone: "",
  instagram: "",
  tiktok: "",
  youtube: "",
  message: "",
  availability: "",
  videoLink: "",
};

export function ApplyForm() {
  const searchParams = useSearchParams();
  const preset = searchParams.get("type");

  const [form, setForm] = useState<FormState>(() => ({
    ...initial,
    type:
      preset === "job" || preset === "general" || preset === "quiz"
        ? preset
        : "quiz",
  }));
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  const typeOptions = useMemo(
    () => [
      { value: "quiz", label: "Quiz show contestant" },
      { value: "job", label: "Job / crew role" },
      { value: "general", label: "General / appear on a show" },
    ],
    [],
  );

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrors({});
    setMessage("");

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website: "" }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.fieldErrors) setErrors(data.fieldErrors);
        throw new Error(data.error || "Unable to submit application");
      }
      setStatus("ok");
      setMessage("Application received. We'll be in touch if you're selected.");
      setForm({ ...initial, type: form.type });
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "ok") {
    return (
      <div className="border border-green-bright/40 bg-green/10 p-8">
        <h2 className="font-display text-3xl text-green-bright">You&apos;re in the mix</h2>
        <p className="mt-3 text-ice/75">{message}</p>
        <Button className="mt-6" onClick={() => setStatus("idle")}>
          Submit another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <Select
        label="Application type"
        name="type"
        value={form.type}
        onChange={(e) =>
          update("type", e.target.value as FormState["type"])
        }
        options={typeOptions}
        error={errors.type}
      />
      <div className="grid gap-5 md:grid-cols-2">
        <Input
          label="Full name"
          name="name"
          required
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          error={errors.name}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          error={errors.email}
        />
      </div>
      <Input
        label="Phone"
        name="phone"
        type="tel"
        value={form.phone}
        onChange={(e) => update("phone", e.target.value)}
        error={errors.phone}
      />
      <div className="grid gap-5 md:grid-cols-3">
        <Input
          label="Instagram"
          name="instagram"
          placeholder="@handle"
          value={form.instagram}
          onChange={(e) => update("instagram", e.target.value)}
        />
        <Input
          label="TikTok"
          name="tiktok"
          placeholder="@handle"
          value={form.tiktok}
          onChange={(e) => update("tiktok", e.target.value)}
        />
        <Input
          label="YouTube"
          name="youtube"
          placeholder="Channel or URL"
          value={form.youtube}
          onChange={(e) => update("youtube", e.target.value)}
        />
      </div>
      <Textarea
        label="Why you? Tell us your story"
        name="message"
        required
        value={form.message}
        onChange={(e) => update("message", e.target.value)}
        error={errors.message}
      />
      <div className="grid gap-5 md:grid-cols-2">
        <Input
          label="Availability"
          name="availability"
          placeholder="Evenings, weekends…"
          value={form.availability}
          onChange={(e) => update("availability", e.target.value)}
        />
        <Input
          label="Video / intro link (optional)"
          name="videoLink"
          type="url"
          placeholder="https://"
          value={form.videoLink}
          onChange={(e) => update("videoLink", e.target.value)}
          error={errors.videoLink}
        />
      </div>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />
      {message && status === "error" ? (
        <p className="text-sm text-red-300">{message}</p>
      ) : null}
      <Button type="submit" size="lg" disabled={status === "loading"}>
        {status === "loading" ? "Submitting…" : "Submit application"}
      </Button>
    </form>
  );
}
