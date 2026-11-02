import {
    getAlertColor,
    getConfidenceColor,
    getPriceChange,
    getPriorityColor,
    getStageColor,
    getTrendColor,
} from "../index";

describe("Utility Functions Suite", () => {
    describe("getPriorityColor", () => {
        it("should return red for high priority", () => {
            expect(getPriorityColor("high")).toBe("#ef4444");
        });

        it("should return amber/yellow for medium priority", () => {
            expect(getPriorityColor("medium")).toBe("#f59e0b");
        });

        it("should return green for low priority", () => {
            expect(getPriorityColor("low")).toBe("#09712f");
        });

        it("should return gray for unknown or fallback priorities", () => {
            expect(getPriorityColor("critical")).toBe("#6b7280");
            expect(getPriorityColor("")).toBe("#6b7280");
        });
    });

    describe("getStageColor", () => {
        it("should return green for vegetative/reproductive stages (tillering, flowering)", () => {
            expect(getStageColor("tillering")).toBe("#09712f");
            expect(getStageColor("flowering")).toBe("#09712f");
        });

        it("should return amber/yellow for late development stages (grain filling, silking)", () => {
            expect(getStageColor("grain filling")).toBe("#f59e0b");
            expect(getStageColor("silking")).toBe("#f59e0b");
        });

        it("should handle mixed casing correctly by transforming to lowercase", () => {
            expect(getStageColor("Tillering")).toBe("#09712f");
            expect(getStageColor("GRAIN FILLING")).toBe("#f59e0b");
        });

        it("should return blue for default or unmapped crop stages", () => {
            expect(getStageColor("harvested")).toBe("#3b82f6");
        });
    });

    describe("getAlertColor", () => {
        it("should return red for high alerts", () => {
            expect(getAlertColor("high")).toBe("#ef4444");
        });

        it("should return amber for medium alerts", () => {
            expect(getAlertColor("medium")).toBe("#f59e0b");
        });

        it("should return a brighter green for low alerts", () => {
            expect(getAlertColor("low")).toBe("#22c55e");
        });

        it("should return fallback gray for unexpected values", () => {
            expect(getAlertColor("none")).toBe("#6b7280");
        });
    });

    describe("getConfidenceColor", () => {
        it("should return green for high confidence metrics (>= 80)", () => {
            expect(getConfidenceColor(95)).toBe("#09712f");
            expect(getConfidenceColor(80)).toBe("#09712f");
        });

        it("should return amber for moderate confidence metrics (60 to 79)", () => {
            expect(getConfidenceColor(75)).toBe("#f59e0b");
            expect(getConfidenceColor(60)).toBe("#f59e0b");
        });

        it("should return red for poor confidence metrics (< 60)", () => {
            expect(getConfidenceColor(59)).toBe("#ef4444");
            expect(getConfidenceColor(30)).toBe("#ef4444");
        });
    });

    describe("getTrendColor", () => {
        it("should return green when market trends up", () => {
            expect(getTrendColor("up")).toBe("#09712f");
        });

        it("should return red when market trends down", () => {
            expect(getTrendColor("down")).toBe("#ef4444");
        });

        it("should return gray when market trend is stable or neutral", () => {
            expect(getTrendColor("stable")).toBe("#6b7280");
        });
    });

    describe("getPriceChange", () => {
        it("should calculate positive price changes and return correct percentages", () => {
            const result = getPriceChange(150, 100);
            expect(result.change).toBe(50);
            expect(result.percentage).toBe("50.0");
        });

        it("should calculate negative price changes and return correct percentages", () => {
            const result = getPriceChange(80, 100);
            expect(result.change).toBe(-20);
            expect(result.percentage).toBe("-20.0");
        });

        it("should return zero values gracefully when prices are identical", () => {
            const result = getPriceChange(100, 100);
            expect(result.change).toBe(0);
            expect(result.percentage).toBe("0.0");
        });

        it("should maintain single-decimal precision for floating point numbers", () => {
            const result = getPriceChange(105.45, 100);
            expect(result.change).toBeCloseTo(5.45);
            expect(result.percentage).toBe("5.5"); // Rounds up cleanly
        });
    });
});
