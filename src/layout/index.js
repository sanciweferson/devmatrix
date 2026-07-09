import { Header } from "@/layout/header";
import { Footer } from "@layout/footer";
import { ProfilePanel } from "@core/profilePanel";

export function Layout({ children }) {
  return /* html */ `
    ${Header()}

    <main class="main">
    ${children}
    </main>

    ${Footer()}

    ${ProfilePanel()}
  `;
}