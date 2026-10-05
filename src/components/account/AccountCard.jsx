"use client";

import Button from "@/components/common/Button";
import DatePicker from "@/components/form/DatePicker";
import Input from "@/components/form/Input";
import PhoneInput from "@/components/form/PhoneInput";
import { useLanguage } from "@/components/layout/LanguageProvider";
import { logoutUser, updateProfile } from "@/lib/auth";
import { LogOut } from "lucide-react";
import { useState } from "react";

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDate(value) {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export default function AccountCard({ session }) {
  const { t } = useLanguage();
  const [name, setName] = useState(session.name ?? "");
  const [phone, setPhone] = useState(session.phone ?? "");
  const [birthdate, setBirthdate] = useState(() =>
    parseDate(session.birthdate),
  );
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);
    try {
      await updateProfile({
        name,
        phone,
        birthdate: birthdate ? formatDate(birthdate) : "",
        oldPassword: oldPassword || undefined,
        newPassword: newPassword || undefined,
      });
      setOldPassword("");
      setNewPassword("");
      setSuccess(t("Profile updated.", "تم تحديث البيانات بنجاح."));
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-card border border-border bg-surface p-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            {t("Account", "الحساب")}
          </h2>
          <p className="text-sm text-muted-foreground">{session.email}</p>
        </div>
        <button
          type="button"
          onClick={logoutUser}
          className="flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-red-300 hover:text-red-600"
        >
          <LogOut size={15} />
          {t("Log out", "تسجيل الخروج")}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label={t("Name", "الاسم")}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <PhoneInput
            label={t("Phone number", "رقم الهاتف")}
            value={phone}
            onChange={setPhone}
          />
        </div>

        <DatePicker
          label={t("Birthdate", "تاريخ الميلاد")}
          value={birthdate}
          onChange={setBirthdate}
        />

        <div className="grid gap-4 border-t border-border pt-4 sm:grid-cols-2">
          <Input
            label={t("Current password", "كلمة المرور الحالية")}
            type="password"
            placeholder={t(
              "Leave empty to keep your password",
              "اتركه فارغًا للإبقاء على كلمة المرور",
            )}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <Input
            label={t("New password", "كلمة المرور الجديدة")}
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            error={error}
          />
        </div>

        {success && <p className="text-sm text-green-600">{success}</p>}

        <Button type="submit" disabled={saving} className="w-fit">
          {saving
            ? t("Saving...", "جارٍ الحفظ...")
            : t("Save changes", "حفظ التعديلات")}
        </Button>
      </form>
    </div>
  );
}
