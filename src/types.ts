export interface ProductLevelMetric {
  id: string;
  name: string;
  value: string;
}

export interface ProductLevel {
  vision: string;
  goal: string;
  nsm: string;
  metrics: ProductLevelMetric[];
}

export interface LaggingMetric {
  id: string;
  name: string;
  value: string;
  linkedToProductMetrics: string[];
}

export interface Area {
  id: string;
  name: string;
  vision: string;
  goal: string;
  northStarMetric: string;
  laggingMetrics: LaggingMetric[];
  features: Feature[];
  collapsed: boolean;
  linkedToProductMetrics: string[];
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  timingInMasterPlan: string;
  pmMetrics: PMMetrics;
  techMetrics: TechMetrics;
  linkedMetrics: string[];
  collapsed: boolean;
}

export interface PMMetrics {
  hypothesis: string;
  expectedResults: string;
  measurementResult: string;
  deviation: string;
  successRate: string;
}

export interface TechMetrics {
  cycleDeliveryTime: PlanFactDeviation;
  releaseProcessSpeed: PlanFactDeviation;
  bugWeight: PlanFactDeviation;
  serviceUptime: PlanFactDeviation;
  timeToInteraction: FactDeviation;
  customMetrics: CustomMetric[];
}

export interface PlanFactDeviation {
  plan: string;
  fact: string;
  deviation: string;
}

export interface FactDeviation {
  fact: string;
  deviation: string;
}

export interface CustomMetric {
  id: string;
  name: string;
  plan: string;
  fact: string;
  deviation: string;
}

export interface AppData {
  productLevel: ProductLevel;
  areas: Area[];
  productLevelCollapsed: boolean;
}

export type FilterType = 'all' | 'unfilled' | 'byArea' | 'byQuarter' | 'byStatus';
export type SortType = 'area' | 'quarter' | 'status';
