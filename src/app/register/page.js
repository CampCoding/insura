"use client";

import DatePicker from "@/components/form/DatePicker";
import Input from "@/components/form/Input";
import PhoneInput from "@/components/form/PhoneInput";
import Button from "@/components/common/Button";
import Logo from "@/components/layout/Logo";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
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
      setError("Passwords don't match.");
      return;
    }
    setError("");
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-12">
      <Logo className="mb-6" imageClassName="h-24" />

      <div className="w-full max-w-3xl rounded-card border border-border bg-surface p-8">
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl md:text-3xl">
          Create an account
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Sign up to start learning with Insura.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Name"
              placeholder="Ahmed Mostafa"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <DatePicker
              label="Birthdate"
              value={birthdate}
              onChange={setBirthdate}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <PhoneInput
              label="Phone number"
              value={phone}
              onChange={setPhone}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Password"
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Input
              label="Confirm password"
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={error}
              required
            />
          </div>

          <Button type="submit" className="mt-2 w-full">
            Create account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
