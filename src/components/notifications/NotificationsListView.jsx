"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "@/components/common/Container";
import Reveal from "@/components/common/Reveal";
import NotificationModal from "@/components/notifications/NotificationModal";
import { useLanguage } from "@/components/layout/LanguageProvider";
import { markNotificationRead } from "@/lib/notifications";
import { useNotificationsRead } from "@/lib/useNotificationsRead";

export default function NotificationsListView({ notifications }) {
  const { t, tf, lang } = useLanguage();
  const { isRead } = useNotificationsRead();
  const [active, setActive] = useState(null);
  const unreadCount = notifications.filter((n) => !isRead(n.id)).length;

  function openNotification(notification) {
    markNotificationRead(notification.id);
    setActive(notification);
  }

  return (
    <Container as="section" className="py-16">
      <Reveal className="max-w-2xl">
        <h1 className="text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
          {t("Notifications", "الإشعارات")}
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          {unreadCount > 0
            ? t(
                `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}.`,
                `لديك ${unreadCount} إشعار${unreadCount > 1 ? "ات" : ""} غير مقروءة.`
              )
            : t(
                "Updates, posters and attachments shared by the Insura team.",
                "تحديثات وملصقات ومرفقات يشاركها فريق Insura."
              )}
        </p>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {notifications.map((notification, index) => {
          const unread = !isRead(notification.id);
          return (
            <Reveal key={notification.id} delay={index * 90}>
              <button
                type="button"
                onClick={() => openNotification(notification)}
                className={`group relative flex h-full w-full flex-col overflow-hidden rounded-card border bg-surface text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  unread
                    ? "border-primary/40 hover:border-primary/60"
                    : "border-border hover:border-primary/40"
                }`}
              >
                {unread && (
                  <span className="absolute top-3 z-10 flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground rtl:right-3 ltr:left-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                    {t("New", "جديد")}
                  </span>
                )}
                <div className="relative aspect-video overflow-hidden bg-background">
                  <Image
                    src={notification.image}
                    alt={tf(notification.title)}
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 320px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <time className="text-xs font-medium text-muted-foreground">
                    {new Date(notification.date).toLocaleDateString(
                      lang === "ar" ? "ar-EG" : "en-US",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </time>
                  <h2 className="mt-2 text-xl font-semibold leading-snug text-foreground">
                    {tf(notification.title)}
                  </h2>
                  <p className="mt-2 line-clamp-3 flex-1 text-base leading-7 text-muted-foreground">
                    {tf(notification.body)}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 border-t border-border pt-4 text-sm font-medium text-primary">
                    {t("View details", "عرض التفاصيل")}
                  </span>
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>

      {active && (
        <NotificationModal notification={active} onClose={() => setActive(null)} />
      )}
    </Container>
  );
}
