import { describe, it, expect } from "vitest";
import { registrationSchema } from "./schemas";

const validBase = {
  fullName: "عبد الرحمن بن خلدون",
  age: "25",
  educationLevel: "ليسانس",
  specialty: "علوم الحاسوب",
  job: "طالب",
  wilaya: "الجزائر",
  groupName: "فوج النور",
  batch: "الدفعة الأولى",
  phone: "0551234567",
  email: "test@example.com",
  telegramLink: "",
  linkedinLink: "",
  hoursPerWeek: "3_5",
  activityTypes: ["digital"],
  hasTransportation: "yes",
  hasVolunteerExperience: "no",
  volunteerOrgName: "",
  volunteerActivityNature: "",
  volunteerDuration: "",
  volunteerTasks: "",
  notableProject: "",
  heldPosition: "no",
  positionType: "",
  skillsGained: "",
  whyThisTeam: "لأنني أؤمن بأهداف الفريق وأريد المساهمة في تطوير الشباب",
  whatYouAdd: "خبرة في التصميم والمحتوى",
  whatYouGain: "مهارات قيادية",
  currentIssue: "غياب الوعي الرقمي لدى الشباب",
  teamworkExperience: "",
  persistenceReason: "",
  hasLedTeam: "no",
  ledTeamDescription: "",
  taskPressureHandling: "",
  nonCompliantMemberHandling: "",
  conflictHandling: "",
  workPreference: "collaborative",
  timeOrganization: "",
  lateTaskHandling: "",
  acceptsFeedback: "yes",
  skillPlanning: "good",
  skillTimeManagement: "medium",
  skillTeamwork: "excellent",
  skillProblemSolving: "good",
  skillLeadership: "medium",
  skillCommunication: "good",
  possessedSkills: ["التصميم الجرافيكي"],
  otherPossessedSkill: "",
  selectedTeams: ["doubleclick"],
  teamAnswers: {},
  selectionReason: "أمتلك المهارات التقنية والرغبة الصادقة في خدمة الأكاديمية بكل ما أوتيت من قدرة",
  vision: "",
  additionalNotes: "",
};

describe("registrationSchema", () => {
  it("accepts a fully valid payload", () => {
    const result = registrationSchema.safeParse(validBase);
    expect(result.success).toBe(true);
  });

  it("rejects an invalid phone number", () => {
    const result = registrationSchema.safeParse({ ...validBase, phone: "123" });
    expect(result.success).toBe(false);
  });

  it("rejects a malformed email", () => {
    const result = registrationSchema.safeParse({ ...validBase, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects empty fullName", () => {
    const result = registrationSchema.safeParse({ ...validBase, fullName: "أ" });
    expect(result.success).toBe(false);
  });

  it("rejects age outside 15–60 range", () => {
    const tooYoung = registrationSchema.safeParse({ ...validBase, age: "10" });
    const tooOld   = registrationSchema.safeParse({ ...validBase, age: "61" });
    expect(tooYoung.success).toBe(false);
    expect(tooOld.success).toBe(false);
  });

  it("rejects empty selectedTeams", () => {
    const result = registrationSchema.safeParse({ ...validBase, selectedTeams: [] });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid team id in selectedTeams", () => {
    const result = registrationSchema.safeParse({ ...validBase, selectedTeams: ["nonexistent-team"] });
    expect(result.success).toBe(false);
  });

  it("rejects selectionReason shorter than 20 chars", () => {
    const result = registrationSchema.safeParse({ ...validBase, selectionReason: "قصير" });
    expect(result.success).toBe(false);
  });

  it("accepts Algerian mobile prefixes 05, 06, 07", () => {
    for (const prefix of ["0551234567", "0661234567", "0771234567"]) {
      const result = registrationSchema.safeParse({ ...validBase, phone: prefix });
      expect(result.success).toBe(true);
    }
  });
});
