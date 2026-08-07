import type { Track } from "@/types";
import media from "./tracks/media.json";
import financeEntrepreneurship from "./tracks/finance-entrepreneurship.json";
import literaryArts from "./tracks/literary-arts.json";
import tech from "./tracks/tech.json";
import leadership from "./tracks/leadership.json";
import political from "./tracks/political.json";
import communityService from "./tracks/community-service.json";
import educationalDawah from "./tracks/educational-dawah.json";
import intellectual from "./tracks/intellectual.json";
import palestine from "./tracks/palestine.json";

export const tracks: Track[] = [
  media,
  financeEntrepreneurship,
  literaryArts,
  tech,
  leadership,
  political,
  communityService,
  educationalDawah,
  intellectual,
  palestine,
] as Track[];

export function getTrackNameForTeam(teamSlug: string): string | undefined {
  return tracks.find(t => t.teamSlugs.includes(teamSlug))?.name;
}

export function getTrackNameForProject(projectSlug: string): string | undefined {
  return tracks.find(t => t.projectSlugs.includes(projectSlug))?.name;
}
