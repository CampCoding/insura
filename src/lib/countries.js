import { getCountries, getCountryCallingCode } from "libphonenumber-js";

const regionNames =
  typeof Intl !== "undefined" && Intl.DisplayNames
    ? new Intl.DisplayNames(["en"], { type: "region" })
    : null;

export const COUNTRIES = getCountries()
  .map((iso) => ({
    iso,
    name: regionNames ? regionNames.of(iso) : iso,
    dialCode: getCountryCallingCode(iso),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export const COUNTRY_BY_ISO = Object.fromEntries(
  COUNTRIES.map((c) => [c.iso, c])
);
