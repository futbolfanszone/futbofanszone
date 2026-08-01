"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

type Props = {
  defaultSubject?: string;
};

export function ContactForm({ defaultSubject = "" }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(defaultSubject);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [feedback, setFeedback] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message, website: "" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to send message");
      setStatus("ok");
      setFeedback("Message sent. We'll get back to you soon.");
      setName("");
      setEmail("");
      setSubject(defaultSubject);
      setMessage("");
    } catch (err) {
      setStatus("error");
      setFeedback(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <Input
          label="Name"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Input
        label="Subject"
        name="subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <Textarea
        label="Message"
        name="message"
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />
      {feedback ? (
        <p
          className={
            status === "ok" ? "text-sm text-green-bright" : "text-sm text-orange-bright"
          }
        >
          {feedback}
        </p>
      ) : null}
      <Button type="submit" size="lg" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
