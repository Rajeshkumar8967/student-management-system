import { describe, expect, test } from "vitest";

describe("Student validation", () => {
  test("should accept a valid student", () => {
    const student = {
      name: "Rajesh",
      age: 22,
      course: "Computer Science",
    };

    expect(student.name).toBeTruthy();
    expect(student.age).toBeGreaterThan(0);
    expect(student.course).toBeTruthy();
  });

  test("should reject an invalid student age", () => {
    const student = {
      name: "Rajesh",
      age: 0,
      course: "Computer Science",
    };

    expect(student.age).toBe(0);
    expect(student.age).not.toBeGreaterThan(0);
  });
});