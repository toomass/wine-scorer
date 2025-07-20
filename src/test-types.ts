// Type definitions for testing
import { expect } from "vitest";
import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

declare module "vitest" {
  interface Assertion<T = any> extends TestingLibraryMatchers<T, void> {}
}
