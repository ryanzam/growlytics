import {
    detectPlantDisease,
    getUserDetections,
    saveDetectionResult,
} from "../aiService";

import { supabase } from "@/libs/supabase";

const mockFetch = jest.fn();
global.fetch = mockFetch;

const consoleErrorSpy = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});

const mockFrom = supabase.from as jest.Mock;

describe("AI Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.EXPO_PUBLIC_PLANTNET_API_KEY = "test-api-key";
    });

    afterAll(() => {
        consoleErrorSpy.mockRestore();
    });

    describe("detectPlantDisease", () => {
        const mockBlob = { size: 1024, type: "image/jpeg" };

        it("should complete classification when the PlantNet API returns 200 OK", async () => {
            mockFetch.mockResolvedValueOnce({
                blob: jest.fn().mockResolvedValueOnce(mockBlob),
            });

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: jest
                    .fn()
                    .mockResolvedValueOnce({ bestMatch: "crops_healthy_data" }),
            });

            const result = await detectPlantDisease("ph://test-photo-uri");

            expect(mockFetch).toHaveBeenNthCalledWith(
                2,
                `https://my-api.plantnet.org/v1/identify/crops?api-key=${process.env.EXPO_PUBLIC_PLANTNET_API_KEY}`,
                expect.objectContaining({
                    method: "POST",
                    body: expect.any(FormData),
                }),
            );

            expect(result).toHaveProperty("disease");
            expect(result).toHaveProperty("nepaliName");
            expect(result.confidence).toBeGreaterThanOrEqual(75);
            expect(result.confidence).toBeLessThanOrEqual(95);
        });

        it("should fall back to mock data if the PlantNet API returns a non-200 response", async () => {
            mockFetch.mockResolvedValueOnce({
                blob: jest.fn().mockResolvedValueOnce(mockBlob),
            });

            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 500,
            });

            const result = await detectPlantDisease("ph://test-photo-uri");

            expect(consoleErrorSpy).toHaveBeenCalled();
            expect(result.disease).toBe("Brown Spot");
            expect(result.confidence).toBe(87);
        });
    });

    describe("saveDetectionResult", () => {
        const mockDetectionResult = {
            disease: "Leaf Blight",
            nepaliName: "पात सुकाउने रोग",
            confidence: 90,
            severity: "high" as const,
            description: "Bacterial leaf damage.",
            treatment: ["Treatment 1"],
            prevention: ["Prevention 1"],
        };

        it("should map the payload fields and save them to the detections table", async () => {
            const mockInsert = jest.fn().mockResolvedValueOnce({ error: null });
            mockFrom.mockReturnValue({ insert: mockInsert });

            await saveDetectionResult(
                "user-123",
                "https://storage.com",
                mockDetectionResult,
                "crop-456",
            );

            expect(mockFrom).toHaveBeenCalledWith("detections");
            expect(mockInsert).toHaveBeenCalledWith({
                user_id: "user-123",
                crop_id: "crop-456",
                image_url: "https://storage.com",
                disease_name: "Leaf Blight",
                disease_nepali_name: "पात सुकाउने रोग",
                confidence: 90,
                severity: "high",
                description: "Bacterial leaf damage.",
                treatment: ["Treatment 1"],
                prevention: ["Prevention 1"],
            });
        });

        it("should catch errors cleanly if the insertion query fails", async () => {
            const mockInsert = jest
                .fn()
                .mockResolvedValueOnce({ error: { message: "RLS Restrict" } });
            mockFrom.mockReturnValue({ insert: mockInsert });

            await saveDetectionResult(
                "user-123",
                "https://storage.com",
                mockDetectionResult,
            );

            expect(consoleErrorSpy).toHaveBeenCalled();
        });
    });

    describe("getUserDetections", () => {
        it("should query detection list sorted by date descending", async () => {
            const mockRows = [{ id: "det-1", disease_name: "Powdery Mildew" }];

            const mockOrder = jest
                .fn()
                .mockResolvedValueOnce({ data: mockRows, error: null });
            const mockEq = jest.fn().mockReturnValue({ order: mockOrder });
            const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
            mockFrom.mockReturnValue({ select: mockSelect });

            const results = await getUserDetections("user-123");

            expect(mockFrom).toHaveBeenCalledWith("detections");
            expect(mockSelect).toHaveBeenCalledWith("*");
            expect(mockEq).toHaveBeenCalledWith("user_id", "user-123");
            expect(mockOrder).toHaveBeenCalledWith("created_at", {
                ascending: false,
            });
            expect(results).toEqual(mockRows);
        });

        it("should safely return an empty array if database fetching errors occur", async () => {
            const mockOrder = jest.fn().mockResolvedValueOnce({
                data: null,
                error: { message: "Timeout" },
            });
            const mockEq = jest.fn().mockReturnValue({ order: mockOrder });
            const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
            mockFrom.mockReturnValue({ select: mockSelect });

            const results = await getUserDetections("user-123");

            expect(results).toEqual([]);
            expect(consoleErrorSpy).toHaveBeenCalled();
        });
    });
});
