"use client";

import Input from "@/components/form/Input";
import Button from "@/components/common/Button";
import Logo from "@/components/layout/Logo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/layout/LanguageProvider";
import { loginUser } from "@/lib/auth";

export default function LoginPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [justRegistered, setJustRegistered] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Avoids useSearchParams()'s Suspense-boundary requirement for a single
    // one-off flag read on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setJustRegistered(new URLSearchParams(window.location.search).get("registered") === "1");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginUser({ email, password });
      router.push("/my-courses");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-12">
      <Logo className="mb-8" imageClassName="h-24" />

      <div className="w-full max-w-md rounded-card border border-border bg-surface p-8">
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
          {t("Log in", "تسجيل الدخول")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("Welcome back, log in to continue.", "أهلًا بعودتك، سجّل الدخول للمتابعة.")}
        </p>

        {justRegistered && (
          <p className="mt-4 rounded-control border border-green-200 bg-green-50 px-4 py-2.5 text-sm text-green-700">
            {t(
              "Account created. Log in to continue.",
              "تم إنشاء الحساب بنجاح. سجّل الدخول للمتابعة."
            )}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <Input
            label={t("Email", "البريد الإلكتروني")}
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label={t("Password", "كلمة المرور")}
            type="password"
            placeholder={t("Your password", "كلمة المرور الخاصة بك")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error}
            required
          />

          <Button type="submit" disabled={loading} className="mt-2 w-full">
            {loading ? t("Logging in...", "جارٍ تسجيل الدخول...") : t("Log in", "تسجيل الدخول")}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {t("Don't have an account?", "ليس لديك حساب؟")}{" "}
          <Link href="/register" className="font-medium text-primary">
            {t("Create one", "أنشئ حسابًا")}
          </Link>
        </p>
      </div>
    </div>
  );
}
