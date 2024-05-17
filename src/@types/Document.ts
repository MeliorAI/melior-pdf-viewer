export interface IDocument {
  name: string;
  status?: string;
  clauses: ClauseData;
  entities: EntityType;
  box_details?: StorageDetails;
}

export interface ClauseData {
  [key: string]: ClauseDataExtraction[];
}

export interface ClauseDataExtraction {
  _predicted: {
    answer: string;
    score: number;
    page: number;
    bboxes: number[][];
    end: number | null;
    start: number | null;
  };
  page: number;
  answer: string;
  bboxes?: number[][];
  value?: string;
}

export interface EntityType {
  [key: string]: EntityData[];
}

export interface EntityData {
  text: string;
  detections: EntityDetection[];
}

export interface EntityDetection {
  text: string;
  page: number;
  value: string | number | null;
  unit: string | null;
  bbox?: number[][];
}

export interface StorageDetails {
  file_id: string;
  user_id: string;
}
