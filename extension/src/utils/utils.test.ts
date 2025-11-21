import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getErrorMessage, debounce, throttle } from "./utils";

describe("getErrorMessage", () => {
  it("returns message from Error instance", () => {
    const error = new Error("boom");
    expect(getErrorMessage(error, "fallback")).toBe("boom");
  });

  it("returns fallback for non-Error values", () => {
    expect(getErrorMessage("nope", "fallback")).toBe("fallback");
    expect(getErrorMessage(null, "fallback")).toBe("fallback");
    expect(getErrorMessage(undefined, "fallback")).toBe("fallback");
  });
});

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("delays function execution until wait time has passed", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(99);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("only calls function once for rapid successive calls", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    debounced();
    debounced();

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe("throttle", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("invokes immediately, then throttles subsequent calls", () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled(); // immediate
    expect(fn).toHaveBeenCalledTimes(1);

    // Rapid calls within the throttle window should not call immediately
    throttled();
    throttled();
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);

    // After the remaining time, the last call should execute
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});


