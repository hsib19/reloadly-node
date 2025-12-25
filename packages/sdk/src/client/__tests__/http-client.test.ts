import { describe, it, expect, vi, beforeEach } from "vitest";
import { HttpClient } from "../http-client.js";
import { ReloadlyAPIError } from "../../errors/reloadly-error.js";

const mockConfig = {} as any;
const mockTokenManager = { getToken: vi.fn() } as any;

describe("HttpClient", () => {
    let client: HttpClient;

    beforeEach(() => {
        mockTokenManager.getToken.mockResolvedValue("mock-token");
        global.fetch = vi.fn();
        client = new HttpClient(mockConfig, mockTokenManager, "https://api.test.com/", "application/json");
    });

    it("should perform GET request and return data", async () => {
        (fetch as any).mockResolvedValue({
            ok: true,
            status: 200,
            text: async () => JSON.stringify({ success: true })
        });

        const result = await client.request<{ success: boolean }>({ path: "/test" });
        expect(result).toEqual({ success: true });
        expect(fetch).toHaveBeenCalledWith("https://api.test.com/test", expect.any(Object));
    });

    it("should append query parameters", async () => {
        (fetch as any).mockResolvedValue({
            ok: true,
            status: 200,
            text: async () => JSON.stringify({ query: "ok" })
        });

        await client.request({ path: "/query", query: { a: 1, b: "test" } });
        expect(fetch).toHaveBeenCalledWith("https://api.test.com/query?a=1&b=test", expect.any(Object));
    });

    it("should send POST request with body", async () => {
        (fetch as any).mockResolvedValue({
            ok: true,
            status: 200,
            text: async () => JSON.stringify({ posted: true })
        });

        const result = await client.request<{ posted: boolean }>({
            path: "/post",
            method: "POST",
            body: { key: "value" }
        });

        expect(result).toEqual({ posted: true });
        const call = (fetch as any).mock.calls[0][1];
        expect(call.method).toBe("POST");
        expect(call.body).toBe(JSON.stringify({ key: "value" }));
    });

    it("should throw ReloadlyAPIError on non-ok response", async () => {
        (fetch as any).mockResolvedValue({
            ok: false,
            status: 400,
            text: async () => JSON.stringify({ error: "Bad Request" })
        });

        await expect(client.request({ path: "/error" })).rejects.toBeInstanceOf(ReloadlyAPIError);
    });

    it("should send correct headers", async () => {
        (fetch as any).mockResolvedValue({
            ok: true,
            status: 200,
            text: async () => JSON.stringify({}),
        });

        await client.request({ path: "/headers" });

        const [, options] = (fetch as any).mock.calls[0];

        expect(options.headers).toEqual({
            Authorization: "Bearer mock-token",
            Accept: "application/json",
            "Content-Type": "application/json",
        });
    });

    it("should return null when response body is empty", async () => {
        (fetch as any).mockResolvedValue({
            ok: true,
            status: 204,
            text: async () => "",
        });

        const result = await client.request({ path: "/empty" });

        expect(result).toBeNull();
    });

});
