import { pageMetadata } from "@/lib/seo";
import { AdminLoginClient } from "./ui";

export const generateMetadata = () =>
  pageMetadata({
    title: "Admin",
    description: "Admin login.",
    path: "/admin",
    noindex: true,
  });

export default function AdminLoginPage() {
  return <AdminLoginClient />;
}

