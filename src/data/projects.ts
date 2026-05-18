import type { Project } from "@/types";
import qawim from "./projects/qawim.json";
import kafaMukhadarat from "./projects/kafa-mukhadarat.json";
import jilRiyadhi from "./projects/jil-riyadhi.json";
import shahabTak from "./projects/shabab-tak.json";
import badr from "./projects/badr.json";

export const projects: Project[] = [
  qawim,
  kafaMukhadarat,
  jilRiyadhi,
  shahabTak,
  badr,
] as Project[];
