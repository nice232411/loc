import { AppData, Area, Feature, LaggingMetric, CustomMetric } from '../types';

const STORAGE_KEY = 'product_tree_data';

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
    { id: crypto.randomUUID(), name: '', value: '' },
    { id: crypto.randomUUID(), name: '', value: '' },
    { id: crypto.randomUUID(), name: '', value: '' },
  ],
  features: Array.from({ length: 5 }, () => createEmptyFeature()),
  collapsed: false,
});

const getInitialData = (): AppData => ({
  productLevel: {
    vision: '',
    goal: '',
    nsm: '',
    metrics: {
      mau: '',
      ltv: '',
      payingUsers: '',
      averageCheck: '',
      retention: '',
    },
  },
  areas: Array.from({ length: 10 }, (_, i) => createEmptyArea(i)),
  productLevelCollapsed: false,
});

export const loadData = (): AppData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading data:', error);
  }
  return getInitialData();
};

export const saveData = (data: AppData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data:', error);
  }
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
