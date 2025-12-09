export type DetailEntryType = {
  title: string;
  text: string;
};

export type Project = {
  project_id: string;
  project_name: string;
  project_creation_date: string;
  project_team_lead: string | null;
  project_lifecycle_type: string;
  current_stage_name: string;
  project_critical_status: string | null;
  project_next_required_action: string | null;
  project_stage_notes: string | null;
  project_stage_status: string | null;
  project_stage_attachment_links: string[] | null;
};

export type DetailSectionType = {
  title: string;
  data: DetailEntryType[];
};
