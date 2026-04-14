import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useGetBetActivityLogsQuery } from "../../../../app/Services/Admin/analyticsApi";
import Loader from "../../../Loader";

const ACTION_STYLES = {
  create: "border border-emerald-400/35 bg-emerald-500/12 text-emerald-300",
  update: "border border-sky-400/35 bg-sky-500/12 text-sky-300",
  delete: "border border-rose-400/35 bg-rose-500/12 text-rose-300",
};

const dash = (v) =>
  v === null || v === undefined || v === "" ? "—" : String(v);

const fmtLocation = (log) =>
  [log.city, log.region, log.country].filter(Boolean).join(", ") || "—";

const fmtBrowser = (log) =>
  log.browser_name
    ? `${log.browser_name} ${log.browser_major || log.browser_version || ""}`.trim()
    : "—";

const fmtOs = (log) =>
  log.os_name ? `${log.os_name} ${log.os_version || ""}`.trim() : "—";

const fmtDevice = (log) => {
  const vm = [log.device_vendor, log.device_model].filter(Boolean).join(" ");
  if (vm) return `${vm}${log.device_type ? ` (${log.device_type})` : ""}`;
  return log.device_type || "—";
};

const Cell = ({
  children,
  title,
  mono = false,
  max = "max-w-[180px]",
}) => (
  <td
    className={`px-3 py-2 align-top ${mono ? "font-mono text-xs" : ""}`}
    title={title}
  >
    <div className={`truncate ${max}`}>{children}</div>
  </td>
);

export default function BetActivityLogsPopup({
  open,
  setOpen,
  type,
  userId,
  refId,
  title,
}) {
  const lowerType = (type || "").toLowerCase();
  const { data: logs, isLoading, isFetching, isError, error } =
    useGetBetActivityLogsQuery(
      { type: lowerType, userId, refId },
      { skip: !open || !userId || !refId || !lowerType }
    );

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-[70]">
      <DialogBackdrop className="fixed inset-0 bg-[#03070e]/80 backdrop-blur-[2px]" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
          <DialogPanel className="relative mx-2 w-full max-w-6xl overflow-hidden rounded-2xl border border-[#f8d06f]/25 bg-[linear-gradient(140deg,#071321_0%,#0a2238_56%,#081828_100%)] p-4 text-[#f6efdd] shadow-[0_26px_52px_rgba(0,0,0,0.5)] sm:p-5">
            <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(248,208,111,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(248,208,111,0.045)_1px,transparent_1px)] [background-size:28px_28px]" />
            <div className="pointer-events-none absolute -left-16 top-12 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(248,208,111,0.2)_0%,rgba(248,208,111,0)_72%)] blur-2xl" />
            <div className="pointer-events-none absolute -right-14 bottom-10 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(81,205,255,0.2)_0%,rgba(81,205,255,0)_72%)] blur-2xl" />

            <div className="flex items-start justify-between mb-3">
              <div>
                <DialogTitle className="text-[#fff2cf] text-lg font-black uppercase tracking-[0.03em]">
                  Betting Activity — {title || `${type} #${refId}`}
                </DialogTitle>
                <p className="mt-0.5 text-xs text-[#c9d5e8]">
                  {logs?.length ? `${logs.length} event(s) · hover a cell to see full value` : null}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-1 rounded-full border border-[#f8d06f]/45 bg-[#081523]/85 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.08em] text-[#f8d88a] transition-colors hover:bg-[#102840]"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {isLoading || isFetching ? (
              <div className="py-8 flex justify-center">
                <Loader />
              </div>
            ) : isError ? (
              <div className="py-4 text-center text-sm text-rose-300">
                {error?.data?.message || "Failed to load logs"}
              </div>
            ) : !logs || logs.length === 0 ? (
              <div className="py-6 text-center text-sm text-[#c8d5e8]">
                No activity logs found for this {type?.toLowerCase()}.
              </div>
            ) : (
              <div className="relative z-10 max-h-[70vh] overflow-x-auto overflow-y-auto rounded-xl border border-[#f8d06f]/16 bg-[#06111d]/82">
                <table className="min-w-[1180px] text-left text-xs">
                  <thead className="sticky top-0 bg-[#0d2135] uppercase text-[#f8d88a]">
                    <tr>
                      <th className="px-3 py-2">Time</th>
                      <th className="px-3 py-2">Action</th>
                      <th className="px-3 py-2">IP</th>
                      <th className="px-3 py-2">Browser</th>
                      <th className="px-3 py-2">OS</th>
                      <th className="px-3 py-2">Device</th>
                      <th className="px-3 py-2">Location</th>
                      <th className="px-3 py-2">Timezone</th>
                      <th className="px-3 py-2">User Agent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f8d06f]/12 text-[#e5edf8]">
                    {logs.map((log, i) => {
                      const actionKey = (log.action || "").toLowerCase();
                      const badgeClass =
                        ACTION_STYLES[actionKey] ||
                        "border border-zinc-400/35 bg-zinc-500/12 text-zinc-200";
                      const timeStr = log.time
                        ? new Date(log.time).toLocaleString()
                        : "—";
                      return (
                        <tr
                          key={log.id ?? i}
                          className={
                            i % 2 === 0
                              ? "bg-[#0a1b2d]/82"
                              : "bg-[#071321]/84"
                          }
                        >
                          <Cell title={timeStr} max="max-w-[160px]">
                            {timeStr}
                          </Cell>
                          <td className="px-3 py-2">
                            <span
                              className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-[0.08em] ${badgeClass}`}
                            >
                              {log.action || "-"}
                            </span>
                          </td>
                          <Cell title={log.ip_address} mono max="max-w-[130px]">
                            {dash(log.ip_address)}
                          </Cell>
                          <Cell title={fmtBrowser(log)}>{fmtBrowser(log)}</Cell>
                          <Cell title={fmtOs(log)}>{fmtOs(log)}</Cell>
                          <Cell title={fmtDevice(log)}>{fmtDevice(log)}</Cell>
                          <Cell title={fmtLocation(log)}>
                            {fmtLocation(log)}
                          </Cell>
                          <Cell title={log.timezone} max="max-w-[120px]">
                            {dash(log.timezone)}
                          </Cell>
                          <Cell title={log.user_agent} mono max="max-w-[180px]" onHover={(e) => {
                            // show full user agent in tooltip on hover
                            const ua = log.user_agent || "—";
                            e.currentTarget.setAttribute("title", ua);
                          }}>
                            {dash(log.user_agent)}
                          </Cell>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
