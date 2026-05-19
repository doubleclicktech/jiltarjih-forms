import type { FullRegistrationFormData, SkillLevel } from "@/types";

export type FormErrors = Partial<Record<keyof FullRegistrationFormData, string>>;
export type Setter = <K extends keyof FullRegistrationFormData>(k: K, v: FullRegistrationFormData[K]) => void;
export type StepProps = { data: FullRegistrationFormData; set: Setter; errors: FormErrors };

export const WILAYAS = [
  "أدرار","الشلف","الأغواط","أم البواقي","باتنة","بجاية","بسكرة","بشار",
  "البليدة","البويرة","تمنراست","تبسة","تلمسان","تيارت","تيزي وزو","الجزائر",
  "الجلفة","جيجل","سطيف","سعيدة","سكيكدة","سيدي بلعباس","عنابة","قالمة",
  "قسنطينة","المدية","مستغانم","المسيلة","معسكر","ورقلة","وهران","البيض",
  "إليزي","برج بوعريريج","بومرداس","الطارف","تندوف","تيسمسيلت","الوادي",
  "خنشلة","سوق أهراس","تيبازة","ميلة","عين الدفلى","النعامة","عين تموشنت",
  "غرداية","غليزان","تيميمون","برج باجي مختار","أولاد جلال","بني عباس",
  "عين صالح","عين قزام","توقرت","جانت","المغير","المنيعة",
];

export const POSSESSED_SKILLS = [
  "التصميم الجرافيكي","صناعة المحتوى","التصوير والمونتاج",
  "إدارة مواقع التواصل","البرمجة","كتابة التقارير",
  "الإلقاء والتقديم","التنسيق والتنظيم","التدريب والتيسير",
  "الكتابة الأدبية","البحث والتحليل",
];

export const SKILL_LEVELS: { value: SkillLevel; label: string }[] = [
  { value: "weak",      label: "ضعيف"  },
  { value: "medium",    label: "متوسط" },
  { value: "good",      label: "جيد"   },
  { value: "excellent", label: "ممتاز" },
];

export const SKILL_ROWS: {
  key: keyof Pick<FullRegistrationFormData,
    "skillPlanning"|"skillTimeManagement"|"skillTeamwork"|
    "skillProblemSolving"|"skillLeadership"|"skillCommunication">;
  label: string;
}[] = [
  { key: "skillPlanning",       label: "التخطيط والتنظيم" },
  { key: "skillTimeManagement", label: "إدارة الوقت"      },
  { key: "skillTeamwork",       label: "العمل الجماعي"    },
  { key: "skillProblemSolving", label: "حل المشكلات"      },
  { key: "skillLeadership",     label: "القيادة"          },
  { key: "skillCommunication",  label: "التواصل والإقناع" },
];

export const TEAM_STEPS = [
  { id: 1, title: "البيانات الشخصية",    icon: "person"            },
  { id: 2, title: "الانخراط والتجربة",   icon: "volunteer_activism" },
  { id: 3, title: "الدافعية",            icon: "psychology"        },
  { id: 4, title: "المهارات والإدارة",   icon: "star"              },
  { id: 5, title: "اختيار الفريق",       icon: "groups"            },
  { id: 6, title: "أسئلة تخصصية",       icon: "quiz"              },
  { id: 7, title: "ختاماً",             icon: "check_circle"      },
];

export const PROJECT_STEPS = [
  { id: 1, title: "البيانات الشخصية",    icon: "person"            },
  { id: 2, title: "الانخراط والتجربة",   icon: "volunteer_activism" },
  { id: 3, title: "الدافعية",            icon: "psychology"        },
  { id: 4, title: "المهارات والإدارة",   icon: "star"              },
  { id: 5, title: "اختيار المشروع",      icon: "rocket_launch"     },
  { id: 6, title: "ختاماً",             icon: "check_circle"      },
];

// kept for backward compat with StepPreamble (team default)
export const STEPS = TEAM_STEPS;

export const INITIAL: FullRegistrationFormData = {
  registrationType: "team",
  fullName:"", age:"", educationLevel:"", specialty:"", job:"",
  wilaya:"", groupName:"", batch:"", phone:"", email:"",
  telegramLink:"", linkedinLink:"",
  hoursPerWeek:"", activityTypes:[], hasTransportation:"",
  hasVolunteerExperience:"", volunteerOrgName:"", volunteerActivityNature:"",
  volunteerDuration:"", volunteerTasks:"", notableProject:"",
  heldPosition:"", positionType:"", skillsGained:"",
  whyThisTeam:"", whatYouAdd:"", whatYouGain:"", currentIssue:"",
  teamworkExperience:"", persistenceReason:"",
  hasLedTeam:"", ledTeamDescription:"", taskPressureHandling:"",
  nonCompliantMemberHandling:"", conflictHandling:"", workPreference:"",
  timeOrganization:"", lateTaskHandling:"", acceptsFeedback:"",
  skillPlanning:"", skillTimeManagement:"", skillTeamwork:"",
  skillProblemSolving:"", skillLeadership:"", skillCommunication:"",
  possessedSkills:[], otherPossessedSkill:"",
  selectedTeams:[], selectedProjects:[],
  teamAnswers:{},
  selectionReason:"", vision:"", additionalNotes:"",
};
