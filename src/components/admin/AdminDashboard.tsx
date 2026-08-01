"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import type { Application, ApplicationStatus } from "@/lib/supabase";

const STATUSES: ApplicationStatus[] = [
  "new",
  "shortlisted",
  "picked",
  "rejected",
];

export function AdminDashboard() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [configured, setConfigured] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    confirmed: 0,
    pending: 0,
  });
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const qs = new URLSearchParams({
        status: statusFilter,
        type: typeFilter,
      });
      const [appsRes, subRes] = await Promise.all([
        fetch(`/api/admin/applications?${qs}`),
        fetch("/api/admin/subscribers"),
      ]);

      if (appsRes.status === 401 || subRes.status === 401) {
        router.push("/admin/login");
        return;
      }

      const appsData = await appsRes.json();
      const subData = await subRes.json();
      setApplications(appsData.applications || []);
      setConfigured(appsData.configured !== false);
      setStats({
        total: subData.total || 0,
        confirmed: subData.confirmed || 0,
        pending: subData.pending || 0,
      });
    } catch {
      setError("Failed to load admin data.");
    } finally {
      setLoading(false);
    }
  }, [router, statusFilter, typeFilter]);

  useEffect(() => {
    void load();
  }, [load]);

  async function updateStatus(id: string, status: ApplicationStatus) {
    const res = await fetch(`/api/admin/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      setError("Could not update status.");
      return;
    }
    const data = await res.json();
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? data.application : app)),
    );
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const csv = useMemo(() => {
    const header = [
      "id",
      "type",
      "name",
      "email",
      "phone",
      "status",
      "message",
      "created_at",
    ];
    const rows = applications.map((a) =>
      [
        a.id,
        a.type,
        a.name,
        a.email,
        a.phone || "",
        a.status,
        (a.message || "").replace(/\n/g, " "),
        a.created_at,
      ]
        .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
        .join(","),
    );
    return [header.join(","), ...rows].join("\n");
  }, [applications]);

  function downloadCsv() {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ffz-applications-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="section-pad mx-auto max-w-6xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow">
            Admin
          </p>
          <h1 className="mt-2 font-display text-5xl text-ice">Dashboard</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={downloadCsv}>
            Export CSV
          </Button>
          <Button variant="ghost" onClick={logout}>
            Log out
          </Button>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Subscribers" value={stats.total} />
        <StatCard label="Confirmed" value={stats.confirmed} />
        <StatCard label="Pending confirm" value={stats.pending} />
      </div>

      {!configured ? (
        <p className="mt-6 border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
          Supabase is not configured. Forms and subscriber counts will activate
          once env vars are set.
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-3">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-ice/15 bg-navy-deep px-3 py-2 text-sm text-ice"
        >
          <option value="all">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border border-ice/15 bg-navy-deep px-3 py-2 text-sm text-ice"
        >
          <option value="all">All types</option>
          <option value="quiz">Quiz</option>
          <option value="job">Job</option>
          <option value="general">General</option>
        </select>
      </div>

      {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}

      <div className="mt-6 overflow-x-auto border border-ice/10">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-ice/5 text-ice/50">
            <tr>
              <th className="px-3 py-3 font-medium">Name</th>
              <th className="px-3 py-3 font-medium">Type</th>
              <th className="px-3 py-3 font-medium">Contact</th>
              <th className="px-3 py-3 font-medium">Message</th>
              <th className="px-3 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-3 py-8 text-ice/50">
                  Loading…
                </td>
              </tr>
            ) : applications.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-3 py-8 text-ice/50">
                  No applications yet.
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr key={app.id} className="border-t border-ice/10 align-top">
                  <td className="px-3 py-3 text-ice">
                    <div className="font-medium">{app.name}</div>
                    <div className="text-xs text-ice/40">
                      {new Date(app.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-3 py-3 capitalize text-ice/70">
                    {app.type}
                  </td>
                  <td className="px-3 py-3 text-ice/70">
                    <div>{app.email}</div>
                    <div className="text-xs">{app.phone || "—"}</div>
                  </td>
                  <td className="max-w-xs px-3 py-3 text-ice/60">
                    <p className="line-clamp-3">{app.message}</p>
                  </td>
                  <td className="px-3 py-3">
                    <select
                      value={app.status}
                      onChange={(e) =>
                        updateStatus(
                          app.id,
                          e.target.value as ApplicationStatus,
                        )
                      }
                      className="border border-ice/15 bg-navy-deep px-2 py-1.5 text-xs text-ice"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-ice/10 bg-navy/40 p-5">
      <p className="text-xs uppercase tracking-[0.18em] text-ice/40">
        {label}
      </p>
      <p className="mt-2 font-display text-4xl text-yellow">{value}</p>
    </div>
  );
}
