import { cx, escapeHtml } from "@utils/helpers"

export function Logo({ className = "", alt = "DevMatrix" } = {}) {
  const gradId = `dm-accent-${Math.random().toString(36).slice(2, 7)}`;
  const font = "Inter, system-ui, sans-serif";

  return /* html */ `
    <svg
      class="${escapeHtml(className)}"
      viewBox="0 0 680 200"
      width="680"
      height="200"
      role="img"
      aria-labelledby="dm-title-${gradId}"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="dm-title-${gradId}">${escapeHtml(alt)}</title>
      <desc>Logo do DevMatrix — modular JavaScript control system</desc>

      <defs>
        <linearGradient id="${gradId}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="var(--primary)" />
          <stop offset="100%" stop-color="var(--chart-2)" />
        </linearGradient>
      </defs>

      <rect x="20" y="16" width="156" height="156" rx="30" fill="var(--secondary)" />

      <rect x="41" y="37" width="36" height="36" rx="8" fill="var(--foreground)" opacity="0.07" />
      <rect x="86" y="37" width="36" height="36" rx="8" fill="var(--foreground)" opacity="0.13" />
      <rect x="131" y="37" width="36" height="36" rx="8" fill="var(--foreground)" opacity="0.05" />

      <rect x="41" y="81" width="36" height="36" rx="8" fill="var(--foreground)" opacity="0.10" />
      <rect x="86" y="81" width="36" height="36" rx="8" fill="url(#${gradId})" />
      <rect x="131" y="81" width="36" height="36" rx="8" fill="var(--foreground)" opacity="0.08" />

      <rect x="41" y="125" width="36" height="36" rx="8" fill="var(--foreground)" opacity="0.05" />
      <rect x="86" y="125" width="36" height="36" rx="8" fill="var(--foreground)" opacity="0.15" />
      <rect x="131" y="125" width="36" height="36" rx="8" fill="var(--foreground)" opacity="0.20" />

      <line x1="59" y1="55" x2="149" y2="143"
            stroke="var(--primary)" stroke-width="2.5"
            stroke-linecap="round" opacity="0.85" />

      <circle cx="59"  cy="55"  r="4.5" fill="var(--primary)" />
      <circle cx="104" cy="99"  r="3"   fill="var(--card)" />
      <circle cx="149" cy="143" r="4.5" fill="var(--primary)" />

      <text x="197" y="108" fill="var(--foreground)" font-family="${font}" font-size="64" font-weight="300" letter-spacing="-2">Dev</text>
      <text x="319" y="108" fill="var(--primary)" font-family="${font}" font-size="64" font-weight="700" letter-spacing="-2">Matrix</text>
      <text x="199" y="138" fill="var(--muted-foreground)" font-family="${font}" font-size="14" font-weight="400" letter-spacing="3">MODULAR JAVASCRIPT CONTROL</text>

    </svg>
  `;
}


/**
 * createLogo — wrapper clicável do Logo (link pra home).
 *
 * FIX: antes "className" tentava servir dois donos ao mesmo tempo — o <a>
 * (via cx) e o <svg> (que na real nunca recebia, pois Logo() era chamado
 * com "logo__svg" fixo). Agora são dois parâmetros com donos claros:
 *   - className  → vai pro <a> (wrapper do link)
 *   - svgVariant → vai pro <svg>, combinado com a classe base "logo__svg"
 *                  (ex: "logo__svg--lg" bate com o modificador do CSS)
 */
export const createLogo = ({
  href = "/",
  ariaLabel = "Ir para a página inicial",
  className = "",
  svgVariant = "",
} = {}) => {
  const logoSvg = Logo({ className: cx("logo__svg", svgVariant) });
  return /* html */ `
    <a href="${escapeHtml(href)}" class="${cx("logo", className)}" aria-label="${escapeHtml(ariaLabel)}">
      ${logoSvg}
    </a>
  `;
};