export type ProjectStatus = "open" | "active" | "completed";

export type TeamAvailability = "available" | "full";

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  icon: string;
  description: string;
  longDescription: string;
  vision: string;
  mission: string;
  status: ProjectStatus;
  objectives: string[];
  // legacy / optional
  teamsCount?: number;
  participantsCount?: number;
  duration?: string;
  image?: string;
  relatedTeamSlugs?: string[];
};

export type Team = {
  id: string;
  slug: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  longDescription: string;
  vision: string;
  mission: string;
  objectives: string[];
  availability: TeamAvailability;
  // legacy / optional
  projectSlug?: string;
  projectName?: string;
  leadName?: string;
  membersCount?: number;
  image?: string;
};

export type RegistrationFormData = {
  fullName: string;
  email: string;
  phone: string;
  wilaya: string;
  age: string;
  educationLevel: string;
  selectedProject: string;
  preferredTeam?: string;
  motivation: string;
};

export type SkillLevel = "" | "weak" | "medium" | "good" | "excellent";

export type FullRegistrationFormData = {
  // Step 1 – personal
  fullName: string;
  age: string;
  educationLevel: string;
  specialty: string;
  job: string;
  wilaya: string;
  groupName: string;
  batch: string;
  phone: string;
  email: string;
  telegramLink: string;
  linkedinLink: string;
  // Step 2 – engagement & experience
  hoursPerWeek: string;
  activityTypes: string[];
  hasTransportation: string;
  hasVolunteerExperience: string;
  volunteerOrgName: string;
  volunteerActivityNature: string;
  volunteerDuration: string;
  volunteerTasks: string;
  notableProject: string;
  heldPosition: string;
  positionType: string;
  skillsGained: string;
  // Step 3 – motivation
  whyThisTeam: string;
  whatYouAdd: string;
  whatYouGain: string;
  currentIssue: string;
  teamworkExperience: string;
  persistenceReason: string;
  // Step 4 – management & skills
  hasLedTeam: string;
  ledTeamDescription: string;
  taskPressureHandling: string;
  nonCompliantMemberHandling: string;
  conflictHandling: string;
  workPreference: string;
  timeOrganization: string;
  lateTaskHandling: string;
  acceptsFeedback: string;
  skillPlanning: SkillLevel;
  skillTimeManagement: SkillLevel;
  skillTeamwork: SkillLevel;
  skillProblemSolving: SkillLevel;
  skillLeadership: SkillLevel;
  skillCommunication: SkillLevel;
  possessedSkills: string[];
  otherPossessedSkill: string;
  // Step 5 – team selection
  selectedTeams: string[];
  // Step 6 – per-team answers
  teamAnswers: Record<string, Record<string, string | string[]>>;
  // Step 7 – conclusion
  selectionReason: string;
  vision: string;
  additionalNotes: string;
};

