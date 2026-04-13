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
  create: "bg-green-900 text-green-300",
  update: "bg-blue-900 text-blue-300",
  delete: "bg-red-900 text-red-300",
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

const Cell = ({ children, title, mono = false, max = "max-w-[180px]" }) => (
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
    <Dialog open={open} onClose={setOpen} className="relative z-[60]">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/50" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
          <DialogPanel className="relative bg-gray-900 rounded-lg p-4 sm:p-5 w-full max-w-6xl mx-2">
            <div className="flex items-start justify-between mb-3">
              <div>
                <DialogTitle className="text-gray-100 text-lg">
                  Betting Activity — {title || `${type} #${refId}`}
                </DialogTitle>
                <p className="text-xs text-gray-400 mt-0.5">
                  {logs?.length ? `${logs.length} event(s) · hover a cell to see full value` : null}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-200"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {isLoading || isFetching ? (
              <div className="py-8 flex justify-center">
                <Loader />
              </div>
            ) : isError ? (
              <div className="text-red-400 text-sm py-4 text-center">
                {error?.data?.message || "Failed to load logs"}
              </div>
            ) : !logs || logs.length === 0 ? (
              <div className="text-gray-400 text-sm py-6 text-center">
                No activity logs found for this {type?.toLowerCase()}.
              </div>
            ) : (
              <div className="overflow-auto max-h-[70vh]">
                <table className="min-w-full text-left text-xs">
                  <thead className="bg-gray-800 uppercase text-gray-400 sticky top-0">
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
                  <tbody className="divide-y divide-gray-700 text-gray-200">
                    {logs.map((log, i) => {
                      const actionKey = (log.action || "").toLowerCase();
                      const badgeClass =
                        ACTION_STYLES[actionKey] || "bg-gray-700 text-gray-200";
                      const timeStr = log.time
                        ? new Date(log.time).toLocaleString()
                        : "—";
                      return (
                        <tr
                          key={log.id ?? i}
                          className={i % 2 === 0 ? "bg-gray-800" : "bg-gray-900"}
                        >
                          <Cell title={timeStr} max="max-w-[160px]">
                            {timeStr}
                          </Cell>
                          <td className="px-3 py-2">
                            <span
                              className={`px-2 py-0.5 rounded capitalize ${badgeClass}`}
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
                          <Cell title={log.user_agent} mono max="max-w-[120px]">
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
