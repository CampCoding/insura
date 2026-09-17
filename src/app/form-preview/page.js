"use client";

import { useState } from "react";
import Container from "@/components/common/Container";
import Input from "@/components/form/Input";
import Select from "@/components/form/Select";
import DatePicker from "@/components/form/DatePicker";

const SAMPLE_OPTIONS = [
  { value: "eg", label: "Egypt" },
  { value: "sa", label: "Saudi Arabia" },
  { value: "ae", label: "United Arab Emirates" },
  { value: "us", label: "United States" },
];

export default function FormPreviewPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState(null);
  const [birthdate, setBirthdate] = useState(null);

  return (
    <Container as="section" className="max-w-lg py-16">
      <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
        Form primitives preview
      </h1>
      <div className="mt-8 flex flex-col gap-5">
        <Input
          label="Name"
          placeholder="Ahmed Mostafa"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Select
          label="Country"
          options={SAMPLE_OPTIONS}
          value={country}
          onChange={setCountry}
          placeholder="Choose a country"
        />
        <DatePicker
          label="Birthdate"
          value={birthdate}
          onChange={setBirthdate}
        />
      </div>
    </Container>
  );
}
