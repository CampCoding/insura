"use client";

import DatePicker from "@/components/form/DatePicker";
import Input from "@/components/form/Input";
import PhoneInput from "@/components/form/PhoneInput";
import Button from "@/components/common/Button";
import Logo from "@/components/layout/Logo";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/components/layout/LanguageProvider";

export default function RegisterPage() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError(t("Passwords don't match.", "كلمتا المرور غير متطابقتين."));
      return;
    }
    setError("");
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-12">
      <Logo className="mb-6" imageClassName="h-24" />

      <div className="w-full max-w-3xl rounded-card border border-border bg-surface p-8">
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl md:text-3xl">
          {t("Create an account", "إنشاء حساب")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("Sign up to start learning with Insura.", "سجّل لتبدأ التعلّم مع Insura.")}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label={t("Name", "الاسم")}
              placeholder="Ahmed Mostafa"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <DatePicker
              label={t("Birthdate", "تاريخ الميلاد")}
              value={birthdate}
              onChange={setBirthdate}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label={t("Email", "البريد الإلكتروني")}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <PhoneInput
              label={t("Phone number", "رقم الهاتف")}
              value={phone}
              onChange={setPhone}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label={t("Password", "كلمة المرور")}
              type="password"
              placeholder={t("At least 8 characters", "8 أحرف على الأقل")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Input
              label={t("Confirm password", "تأكيد كلمة المرور")}
              type="password"
              placeholder={t("Re-enter your password", "أعد إدخال كلمة المرور")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={error}
              required
            />
          </div>

          <Button type="submit" className="mt-2 w-full">
            {t("Create account", "إنشاء الحساب")}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {t("Already have an account?", "لديك حساب بالفعل؟")}{" "}
          <Link href="/login" className="font-medium text-primary">
            {t("Log in", "تسجيل الدخول")}
          </Link>
        </p>
      </div>
    </div>
  );
}
