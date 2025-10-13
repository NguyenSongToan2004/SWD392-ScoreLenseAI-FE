import type { SearchRequest } from "../../../models/ModelExtensions/SearchExtensions";

export interface ModeSearchRequest extends SearchRequest {
  queryType: "all" | "byId";
  modeId?: number;
  year?: number;
}