/**
 * A light tap of vibration on supported phones.
 *
 * Android browsers support navigator.vibrate. iPhone Safari does not, but from iOS 18
 * tapping a "switch" checkbox gives a system haptic tick, so on iPhone we toggle a hidden one.
 * Anywhere neither works, this quietly does nothing.
 */
let label: HTMLLabelElement | null = null;

function iosSwitch() {
  if (!label) {
    const id = "njpr-haptic";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = id;
    input.setAttribute("switch", "");
    input.setAttribute("aria-hidden", "true");
    input.tabIndex = -1;
    label = document.createElement("label");
    label.htmlFor = id;
    label.setAttribute("aria-hidden", "true");
    for (const el of [input, label]) {
      el.style.position = "fixed";
      el.style.left = "-9999px";
      el.style.opacity = "0";
      el.style.pointerEvents = "none";
    }
    document.body.append(input, label);
  }
  label.click();
}

export function haptic(kind: "light" | "success" = "light") {
  if (typeof window === "undefined") return;
  try {
    if (localStorage.getItem("njpr.haptics") === "off") return;
  } catch {}
  try {
    if (typeof navigator.vibrate === "function") {
      navigator.vibrate(kind === "success" ? [12, 60, 12] : 10);
      return;
    }
    if (/iP(hone|ad|od)/.test(navigator.userAgent)) iosSwitch();
  } catch {}
}
