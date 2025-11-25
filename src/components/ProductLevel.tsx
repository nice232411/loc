import { ChevronDown, ChevronRight, Plus, X } from 'lucide-react';
import { ProductLevel as ProductLevelType } from '../types';

interface ProductLevelProps {
  data: ProductLevelType;
  collapsed: boolean;
  onChange: (data: ProductLevelType) => void;
  onToggleCollapse: () => void;
  onAddMetric: () => void;
  onRemoveMetric: (metricId: string) => void;
}

export default function ProductLevel({
  data,
  collapsed,
  onChange,
  onToggleCollapse,
  onAddMetric,
  onRemoveMetric,
}: ProductLevelProps) {
  const handleChange = (field: keyof ProductLevelType, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleMetricChange = (metricId: string, field: 'name' | 'value', value: string) => {
    onChange({
      ...data,
      metrics: data.metrics.map((m) => (m.id === metricId ? { ...m, [field]: value } : m)),
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-6 border-2 border-blue-500">
      <div
        className="flex items-center gap-2 p-4 cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors"
        onClick={onToggleCollapse}
      >
        {collapsed ? <ChevronRight size={20} /> : <ChevronDown size={20} />}
        <h2 className="text-xl font-bold text-blue-900">Product Level</h2>
      </div>

      {!collapsed && (
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Vision продукта
              </label>
              <textarea
                value={data.vision}
                onChange={(e) => handleChange('vision', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Введите vision продукта..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Goal продукта
              </label>
              <textarea
                value={data.goal}
                onChange={(e) => handleChange('goal', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Введите goal продукта..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                NSM продукта
              </label>
              <input
                type="text"
                value={data.nsm}
                onChange={(e) => handleChange('nsm', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Введите NSM продукта..."
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Ключевые продуктовые метрики</h3>
              <button
                onClick={onAddMetric}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Plus size={16} />
                Добавить метрику
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.metrics.map((metric) => (
                <div key={metric.id} className="relative bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <button
                    onClick={() => onRemoveMetric(metric.id)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    title="Удалить метрику"
                  >
                    <X size={16} />
                  </button>
                  <div className="mb-2">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Название метрики
                    </label>
                    <input
                      type="text"
                      value={metric.name}
                      onChange={(e) => handleMetricChange(metric.id, 'name', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Например: MAU"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Значение
                    </label>
                    <input
                      type="text"
                      value={metric.value}
                      onChange={(e) => handleMetricChange(metric.id, 'value', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Введите значение"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
