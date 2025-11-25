import { AppData, Area, Feature, LaggingMetric, CustomMetric, ProductLevelMetric } from '../types';

const createEmptyFeature = (): Feature => ({
  id: crypto.randomUUID(),
  name: '',
  description: '',
  timingInMasterPlan: '',
  pmMetrics: {
    hypothesis: '',
    expectedResults: '',
    measurementResult: '',
    deviation: '',
    successRate: '',
  },
  techMetrics: {
    cycleDeliveryTime: { plan: '', fact: '', deviation: '' },
    releaseProcessSpeed: { plan: '', fact: '', deviation: '' },
    bugWeight: { plan: '', fact: '', deviation: '' },
    serviceUptime: { plan: '', fact: '', deviation: '' },
    timeToInteraction: { fact: '', deviation: '' },
    customMetrics: [],
  },
  linkedMetrics: [],
  collapsed: false,
});

const createEmptyArea = (index: number): Area => ({
  id: crypto.randomUUID(),
  name: `Area ${index + 1}`,
  vision: '',
  goal: '',
  northStarMetric: '',
  laggingMetrics: [
    { id: crypto.randomUUID(), name: '', value: '', linkedToProductMetrics: [] },
    { id: crypto.randomUUID(), name: '', value: '', linkedToProductMetrics: [] },
    { id: crypto.randomUUID(), name: '', value: '', linkedToProductMetrics: [] },
  ],
  features: Array.from({ length: 5 }, () => createEmptyFeature()),
  collapsed: false,
  linkedToProductMetrics: [],
});

const getInitialData = (): AppData => ({
  productLevel: {
    vision: '',
    goal: '',
    nsm: '',
    metrics: [
      { id: crypto.randomUUID(), name: 'MAU', value: '' },
      { id: crypto.randomUUID(), name: 'LTV', value: '' },
      { id: crypto.randomUUID(), name: 'Number of paying users', value: '' },
      { id: crypto.randomUUID(), name: 'Average check', value: '' },
      { id: crypto.randomUUID(), name: 'Retention', value: '' },
    ],
  },
  areas: Array.from({ length: 10 }, (_, i) => createEmptyArea(i)),
  productLevelCollapsed: false,
});

export const loadData = (): AppData => {
  return getInitialData();
};

export const addFeatureToArea = (areaId: string, data: AppData): AppData => {
  return {
    ...data,
    areas: data.areas.map(area =>
      area.id === areaId
        ? { ...area, features: [...area.features, createEmptyFeature()] }
        : area
    ),
  };
};

export const addLaggingMetric = (areaId: string, data: AppData): AppData => {
  const newMetric: LaggingMetric = {
    id: crypto.randomUUID(),
    name: '',
    value: '',
    linkedToProductMetrics: [],
  };
  return {
    ...data,
    areas: data.areas.map(area =>
      area.id === areaId
        ? { ...area, laggingMetrics: [...area.laggingMetrics, newMetric] }
        : area
    ),
  };
};

export const addCustomTechMetric = (areaId: string, featureId: string, data: AppData): AppData => {
  const newMetric: CustomMetric = {
    id: crypto.randomUUID(),
    name: '',
    plan: '',
    fact: '',
    deviation: '',
  };
  return {
    ...data,
    areas: data.areas.map(area =>
      area.id === areaId
        ? {
            ...area,
            features: area.features.map(feature =>
              feature.id === featureId
                ? {
                    ...feature,
                    techMetrics: {
                      ...feature.techMetrics,
                      customMetrics: [...feature.techMetrics.customMetrics, newMetric],
                    },
                  }
                : feature
            ),
          }
        : area
    ),
  };
};

export const addProductLevelMetric = (data: AppData): AppData => {
  const newMetric: ProductLevelMetric = {
    id: crypto.randomUUID(),
    name: '',
    value: '',
  };
  return {
    ...data,
    productLevel: {
      ...data.productLevel,
      metrics: [...data.productLevel.metrics, newMetric],
    },
  };
};

export const removeProductLevelMetric = (metricId: string, data: AppData): AppData => {
  return {
    ...data,
    productLevel: {
      ...data.productLevel,
      metrics: data.productLevel.metrics.filter(m => m.id !== metricId),
    },
  };
};
