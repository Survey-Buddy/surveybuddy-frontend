import { describe, it, expect } from "vitest";
import { loginSchema, registerSchema } from "../../utils/userUtils/userSchema";

describe("Auth Schema Validation", () => {
  describe("loginSchema", () => {
    it("validates a correct login payload", () => {
      const validPayload = {
        email: "user@example.com",
        password: "password123",
      };

      expect(() => loginSchema.parse(validPayload)).not.toThrow();
    });

    it("fails when email is invalid", () => {
      const invalidPayload = {
        email: "invalid-email",
        password: "password123",
      };

      expect(() => loginSchema.parse(invalidPayload)).toThrowError(
        /Invalid email address/
      );
    });

    it("fails when password is too short", () => {
      const invalidPayload = {
        email: "user@example.com",
        password: "123",
      };

      expect(() => loginSchema.parse(invalidPayload)).toThrowError(
        /Password must be at least 6 characters long/
      );
    });
  });

  describe("registerSchema", () => {
    it("validates a correct registration payload", () => {
      const validPayload = {
        email: "user@example.com",
        password: "password123",
        username: "testuser",
        firstName: "John",
        lastName: "Doe",
      };

      expect(() => registerSchema.parse(validPayload)).not.toThrow();
    });

    it("fails when username is too short", () => {
      const invalidPayload = {
        email: "user@example.com",
        password: "password123",
        username: "ab",
        firstName: "John",
        lastName: "Doe",
      };

      expect(() => registerSchema.parse(invalidPayload)).toThrowError(
        /Username must be at least 3 characters/
      );
    });

    it("fails when firstName is too short", () => {
      const invalidPayload = {
        email: "user@example.com",
        password: "password123",
        username: "testuser",
        firstName: "Jo",
        lastName: "Doe",
      };

      expect(() => registerSchema.parse(invalidPayload)).toThrowError(
        /Name must be at least 3 characters/
      );
    });

    it("fails when lastName is too short", () => {
      const invalidPayload = {
        email: "user@example.com",
        password: "password123",
        username: "testuser",
        firstName: "John",
        lastName: "Do",
      };

      expect(() => registerSchema.parse(invalidPayload)).toThrowError(
        /Name must be at least 3 characters/
      );
    });

    it("fails when email is invalid", () => {
      const invalidPayload = {
        email: "invalid-email",
        password: "password123",
        username: "testuser",
        firstName: "John",
        lastName: "Doe",
      };

      expect(() => registerSchema.parse(invalidPayload)).toThrowError(
        /Invalid email address/
      );
    });

    it("fails when password is too short", () => {
      const invalidPayload = {
        email: "user@example.com",
        password: "123",
        username: "testuser",
        firstName: "John",
        lastName: "Doe",
      };

      expect(() => registerSchema.parse(invalidPayload)).toThrowError(
        /Password must be at least 6 characters long/
      );
    });
  });
});
