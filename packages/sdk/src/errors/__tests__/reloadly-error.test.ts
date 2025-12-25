import { describe, it, expect } from "vitest";
import {
    ReloadlyAPIError,
    ReloadlyNetworkError,
} from "../reloadly-error.js";

describe("ReloadlyAPIError", () => {
    it("should create error with status and data", () => {
        const error = new ReloadlyAPIError(400, { message: "Bad Request" });

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(ReloadlyAPIError);
        expect(error.name).toBe("ReloadlyAPIError");
        expect(error.message).toBe("Reloadly API Error: 400");
        expect(error.status).toBe(400);
        expect(error.data).toEqual({ message: "Bad Request" });
    });

    it("should preserve prototype chain", () => {
        const error = new ReloadlyAPIError(500, null);

        expect(Object.getPrototypeOf(error)).toBe(ReloadlyAPIError.prototype);
    });
});

describe("ReloadlyNetworkError", () => {
    it("should wrap original error", () => {
        const original = new Error("Network down");
        const error = new ReloadlyNetworkError(original);

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(ReloadlyNetworkError);
        expect(error.name).toBe("ReloadlyNetworkError");
        expect(error.message).toBe("Reloadly Network Error");
        expect(error.originalError).toBe(original);
    });

    it("should preserve prototype chain", () => {
        const error = new ReloadlyNetworkError("timeout");

        expect(Object.getPrototypeOf(error)).toBe(ReloadlyNetworkError.prototype);
    });
});
