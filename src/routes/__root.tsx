import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Pagina niet gevonden</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          De pagina die je zoekt bestaat niet of is verplaatst.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Ga naar Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Toko 4kids Rental — Premium houten speelgoedmeubels huren" },
      { name: "description", content: "Huur premium houten speelgoedmeubels voor je kind. Duurzaam, educatief en oneindig veel speelplezier!" },
      { property: "og:title", content: "Toko 4kids Rental — Premium houten speelgoedmeubels huren" },
      { name: "twitter:title", content: "Toko 4kids Rental — Premium houten speelgoedmeubels huren" },
      { property: "og:description", content: "Huur premium houten speelgoedmeubels voor je kind. Duurzaam, educatief en oneindig veel speelplezier!" },
      { name: "twitter:description", content: "Huur premium houten speelgoedmeubels voor je kind. Duurzaam, educatief en oneindig veel speelplezier!" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/cJpuCtqyBDQ9AAVbvuJfu3hCdWi2/social-images/social-1779651799661-8607f7_fac5133f050f4ad5871d8393c150a8a2~mv2-2496645071.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/cJpuCtqyBDQ9AAVbvuJfu3hCdWi2/social-images/social-1779651799661-8607f7_fac5133f050f4ad5871d8393c150a8a2~mv2-2496645071.webp" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-center" richColors />
    </div>
  );
}
