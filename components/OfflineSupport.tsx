"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";

/** Registers the service worker (production only) and shows a slim bar while the phone has no connection. */
export default function OfflineSupport() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    const update = () => setOffline(!navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  if (!offline) return null;
  return (
    <div className="sticky top-0 z-30 flex items-center justify-center gap-2 bg-amber-500 px-4 py-1.5 pt-[max(0.375rem,env(safe-area-inset-top))] text-xs font-semibold text-navy-900">
      <Icon name="alert" size={14} /> Offline: saved pages and search still work. Ask AI needs a connection.
    </div>
  );
}
