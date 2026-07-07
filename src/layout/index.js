import { Header } from "@/layout/header";

import { Footer } from "@layout/footer";


export function Layout({ children }) {
  return /* html */ `
    ${Header()}

    <main class="main">
    ${children}
    </main>

    ${Footer()}
  `;
}