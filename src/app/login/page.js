"use client";

import Input from "@/components/form/Input";
import Button from "@/components/common/Button";
import Logo from "@/components/layout/Logo";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-12">
      <Logo className="mb-8" imageClassName="h-24" />

      <div className="w-full max-w-md rounded-card border border-border bg-surface p-8">
        <h1 className="text-2xl font-semibold text-foreground">Log in</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome back, log in to continue.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" className="mt-2 w-full">
            Log in
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-primary">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
