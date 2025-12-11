export type Project = {
  project_id: string;
  project_name: string;
  project_creation_date: string;
  project_team_lead: string | null;
  project_lifecycle_type: string;
  current_stage_name: string;
  project_critical_status: string | null;
  project_lead_department: string | null;
  project_poc_phone: string | null;
  project_poc_email: string | null;
  project_next_required_action: string | null;
  project_stage_notes: string | null;
  project_stage_status: string | null;
  project_stage_attachment_links: string[] | null;
};

export type DetailEntryType = {
  title: string;
  text: string | undefined | null;
};

export type DetailSectionType = {
  title: string | null | undefined;
  data: DetailEntryType[];
};

export type StatusTypes = "Complete" | "Started" | "NotStarted";

export type Stages = {
  stage_id: string;
  stage_name: string;
  sequence_order: number;
};

export type StageDetailType = {
  stage_detail_id: string;
  project_id: string;
  stage_id: string;
  project_stage_status: StatusTypes;
  timestamp: string;
  project_stage_notes: string;
  project_stage_attachment_links: string[];
};
