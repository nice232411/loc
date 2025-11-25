import { ChevronDown, ChevronRight, Plus, X } from 'lucide-react';
import { Feature } from '../types';

interface FeatureItemProps {
  feature: Feature;
  onChange: (feature: Feature) => void;
  availableMetrics: string[];
}

export default function FeatureItem({ feature, onChange, availableMetrics }: FeatureItemProps) {
  const handleChange = (field: keyof Feature, value: string) => {
    onChange({ ...feature, [field]: value });
  };

  const handlePMMetricChange = (field: string, value: string) => {
    onChange({
      ...feature,
      pmMetrics: { ...feature.pmMetrics, [field]: value },
    });
  };

  const handleTechMetricChange = (metric: string, field: string, value: string) => {
    onChange({
      ...feature,
      techMetrics: {
        ...feature.techMetrics,
        [metric]: { ...feature.techMetrics[metric as keyof typeof feature.techMetrics], [field]: value },
      },
    });
  };

  const handleCustomMetricChange = (id: string, field: string, value: string) => {
    onChange({
      ...feature,
      techMetrics: {
        ...feature.techMetrics,
        customMetrics: feature.techMetrics.customMetrics.map(m =>
          m.id === id ? { ...m, [field]: value } : m
        ),
      },
    });
  };

  const addCustomMetric = () => {
    onChange({
      ...feature,
      techMetrics: {
        ...feature.techMetrics,
        customMetrics: [
          ...feature.techMetrics.customMetrics,
          { id: crypto.randomUUID(), name: '', plan: '', fact: '', deviation: '' },
        ],
      },
    });
  };

  const removeCustomMetric = (id: string) => {
    onChange({
      ...feature,
      techMetrics: {
        ...feature.techMetrics,
        customMetrics: feature.techMetrics.customMetrics.filter(m => m.id !== id),
      },
    });
  };

  const toggleLinkedMetric = (metric: string) => {
    const linkedMetrics = feature.linkedMetrics.includes(metric)
      ? feature.linkedMetrics.filter(m => m !== metric)
      : [...feature.linkedMetrics, metric];
    onChange({ ...feature, linkedMetrics });
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div
        className="flex items-center gap-2 cursor-pointer mb-4"
        onClick={() => handleChange('collapsed', !feature.collapsed)}
      >
        {feature.collapsed ? <ChevronRight size={18} /> : <ChevronDown size={18} />}
        <h5 className="font-semibold text-gray-800">
          {feature.name || 'Новая фича'}
        </h5>
      </div>

      {!feature.collapsed && (
        <div className="space-y-4 ml-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Feature name
              </label>
              <input
                type="text"
                value={feature.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                placeholder="Название фичи"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Timing in MasterPlan
              </label>
              <input
                type="month"
                value={feature.timingInMasterPlan}
                onChange={(e) => handleChange('timingInMasterPlan', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Feature description
            </label>
            <textarea
              value={feature.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              rows={2}
              placeholder="Описание фичи"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Связь с метриками выше
            </label>
            <div className="flex flex-wrap gap-2">
              {availableMetrics.map(metric => (
                <button
                  key={metric}
                  onClick={() => toggleLinkedMetric(metric)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    feature.linkedMetrics.includes(metric)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {metric}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <h6 className="font-semibold text-gray-800 mb-3">Product Manager metrics</h6>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Feature hypothesis
                </label>
                <textarea
                  value={feature.pmMetrics.hypothesis}
                  onChange={(e) => handlePMMetricChange('hypothesis', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  rows={3}
                  placeholder="Описание гипотезы"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expected results
                  </label>
                  <input
                    type="text"
                    value={feature.pmMetrics.expectedResults}
                    onChange={(e) => handlePMMetricChange('expectedResults', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    placeholder="Ожидаемые результаты"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Measurement result (Fact)
                  </label>
                  <input
                    type="text"
                    value={feature.pmMetrics.measurementResult}
                    onChange={(e) => handlePMMetricChange('measurementResult', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    placeholder="Фактический результат"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deviation
                  </label>
                  <input
                    type="text"
                    value={feature.pmMetrics.deviation}
                    onChange={(e) => handlePMMetricChange('deviation', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    placeholder="Отклонение"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    % of successful features
                  </label>
                  <input
                    type="text"
                    value={feature.pmMetrics.successRate}
                    onChange={(e) => handlePMMetricChange('successRate', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    placeholder="Процент успешных фич"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h6 className="font-semibold text-gray-800 mb-3">Tech Manager metrics</h6>
            <div className="space-y-3">
              {[
                { key: 'cycleDeliveryTime', label: 'Cycle delivery time' },
                { key: 'releaseProcessSpeed', label: 'Release process speed' },
                { key: 'bugWeight', label: 'Bug weight / defect escape rate' },
                { key: 'serviceUptime', label: 'Service uptime' },
              ].map(({ key, label }) => (
                <div key={key} className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      {label} (Plan)
                    </label>
                    <input
                      type="text"
                      value={feature.techMetrics[key as keyof typeof feature.techMetrics].plan}
                      onChange={(e) => handleTechMetricChange(key, 'plan', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      placeholder="План"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Fact</label>
                    <input
                      type="text"
                      value={feature.techMetrics[key as keyof typeof feature.techMetrics].fact}
                      onChange={(e) => handleTechMetricChange(key, 'fact', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      placeholder="Факт"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Deviation
                    </label>
                    <input
                      type="text"
                      value={feature.techMetrics[key as keyof typeof feature.techMetrics].deviation}
                      onChange={(e) => handleTechMetricChange(key, 'deviation', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      placeholder="Отклонение"
                    />
                  </div>
                </div>
              ))}

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Time to Interaction (Fact)
                  </label>
                  <input
                    type="text"
                    value={feature.techMetrics.timeToInteraction.fact}
                    onChange={(e) => handleTechMetricChange('timeToInteraction', 'fact', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    placeholder="Факт"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Deviation
                  </label>
                  <input
                    type="text"
                    value={feature.techMetrics.timeToInteraction.deviation}
                    onChange={(e) => handleTechMetricChange('timeToInteraction', 'deviation', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    placeholder="Отклонение"
                  />
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Кастомные метрики
                  </label>
                  <button
                    onClick={addCustomMetric}
                    className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
                  >
                    <Plus size={16} />
                    Добавить
                  </button>
                </div>
                {feature.techMetrics.customMetrics.map(metric => (
                  <div key={metric.id} className="grid grid-cols-4 gap-2 mb-2">
                    <input
                      type="text"
                      value={metric.name}
                      onChange={(e) => handleCustomMetricChange(metric.id, 'name', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      placeholder="Название метрики"
                    />
                    <input
                      type="text"
                      value={metric.plan}
                      onChange={(e) => handleCustomMetricChange(metric.id, 'plan', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      placeholder="План"
                    />
                    <input
                      type="text"
                      value={metric.fact}
                      onChange={(e) => handleCustomMetricChange(metric.id, 'fact', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      placeholder="Факт"
                    />
                    <div className="flex gap-1">
                      <input
                        type="text"
                        value={metric.deviation}
                        onChange={(e) =>
                          handleCustomMetricChange(metric.id, 'deviation', e.target.value)
                        }
                        className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        placeholder="Отклонение"
                      />
                      <button
                        onClick={() => removeCustomMetric(metric.id)}
                        className="px-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
