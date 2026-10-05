"use client";

import AccountCard from "@/components/account/AccountCard";
import Container from "@/components/common/Container";
import { useLanguage } from "@/components/layout/LanguageProvider";
import { refreshProfile } from "@/lib/auth";
import { useAuth } from "@/lib/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { t } = useLanguage();
  const router = useRouter();
  const { ready, isAuthenticated, session } = useAuth();

  useEffect(() => {
    if (ready && !isAuthenticated) router.replace("/login");
  }, [ready, isAuthenticated, router]);

  useEffect(() => {
    // Picks up anything that changed server-side since login (e.g. an admin
    // edit) without forcing a re-login; a failed refresh just keeps showing
    // the existing session instead of blocking the page.
    if (isAuthenticated) refreshProfile().catch(() => {});
  }, [isAuthenticated]);

  if (!ready || !isAuthenticated) return null;

  return (
    <Container as="section" className="py-16">
      <h1 className="text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
        {t("Profile", "الملف الشخصي")}
      </h1>
      <p className="mt-2 max-w-xl text-base text-muted-foreground">
        {t(
          "Update your contact details and password.",
          "عدّل بيانات التواصل وكلمة المرور الخاصة بك.",
        )}
      </p>

      <div className="mt-8 w-full">
        <AccountCard session={session} />
      </div>
    </Container>
  );
}
