import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { Area } from '../types';
import FeatureItem from './FeatureItem';

interface AreaItemProps {
  area: Area;
  onChange: (area: Area) => void;
  onAddFeature: () => void;
  onAddLaggingMetric: () => void;
}

export default function AreaItem({ area, onChange, onAddFeature, onAddLaggingMetric }: AreaItemProps) {
  const handleChange = (field: keyof Area, value: string) => {
    onChange({ ...area, [field]: value });
  };

  const handleLaggingMetricChange = (id: string, field: 'name' | 'value', value: string) => {
    onChange({
      ...area,
      laggingMetrics: area.laggingMetrics.map(m =>
        m.id === id ? { ...m, [field]: value } : m
      ),
    });
  };

  const handleFeatureChange = (featureId: string, updatedFeature: typeof area.features[0]) => {
    onChange({
      ...area,
      features: area.features.map(f => (f.id === featureId ? updatedFeature : f)),
    });
  };

  const availableMetrics = [
    area.northStarMetric,
    ...area.laggingMetrics.map(m => m.name).filter(Boolean),
  ].filter(Boolean);

  return (
    <div className="bg-white rounded-lg shadow-md mb-4 border-2 border-green-500">
      <div
        className="flex items-center gap-2 p-4 cursor-pointer bg-green-50 hover:bg-green-100 transition-colors"
        onClick={() => handleChange('collapsed', !area.collapsed)}
      >
        {area.collapsed ? <ChevronRight size={20} /> : <ChevronDown size={20} />}
        <h3 className="text-lg font-bold text-green-900">{area.name}</h3>
      </div>

      {!area.collapsed && (
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Название эрии
              </label>
              <input
                type="text"
                value={area.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Введите название эрии..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Vision эрии
              </label>
              <textarea
                value={area.vision}
                onChange={(e) => handleChange('vision', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows={2}
                placeholder="Введите vision эрии..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Goal эрии
              </label>
              <textarea
                value={area.goal}
                onChange={(e) => handleChange('goal', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows={2}
                placeholder="Введите goal эрии..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                North Star метрика
              </label>
              <input
                type="text"
                value={area.northStarMetric}
                onChange={(e) => handleChange('northStarMetric', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Введите North Star метрику..."
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-md font-bold text-gray-800">Lagging метрики</h4>
              <button
                onClick={onAddLaggingMetric}
                className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
              >
                <Plus size={16} />
                Добавить метрику
              </button>
            </div>
            <div className="space-y-2">
              {area.laggingMetrics.map((metric) => (
                <div key={metric.id} className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={metric.name}
                    onChange={(e) => handleLaggingMetricChange(metric.id, 'name', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Название метрики"
                  />
                  <input
                    type="text"
                    value={metric.value}
                    onChange={(e) => handleLaggingMetricChange(metric.id, 'value', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Значение"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-bold text-gray-800">Фичи мастер-плана</h4>
              <button
                onClick={onAddFeature}
                className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus size={18} />
                Добавить фичу
              </button>
            </div>
            <div className="space-y-3">
              {area.features.map((feature) => (
                <FeatureItem
                  key={feature.id}
                  feature={feature}
                  onChange={(updated) => handleFeatureChange(feature.id, updated)}
                  availableMetrics={availableMetrics}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
