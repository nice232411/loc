import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { ProductLevelMetric } from '../types';

interface MetricLinkModalProps {
  title: string;
  availableMetrics: ProductLevelMetric[];
  linkedMetrics: string[];
  onClose: () => void;
  onSave: (linkedMetrics: string[]) => void;
}

export default function MetricLinkModal({
  title,
  availableMetrics,
  linkedMetrics,
  onClose,
  onSave,
}: MetricLinkModalProps) {
  const [selected, setSelected] = useState<string[]>(linkedMetrics);

  const toggleMetric = (metricId: string) => {
    if (selected.includes(metricId)) {
      setSelected(selected.filter((id) => id !== metricId));
    } else {
      setSelected([...selected, metricId]);
    }
  };

  const handleSave = () => {
    onSave(selected);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <p className="text-sm text-gray-600 mb-4">
            Выберите метрики Product Level, на которые влияет данная метрика:
          </p>

          <div className="space-y-2">
            {availableMetrics.length === 0 ? (
              <p className="text-sm text-gray-500 italic">
                Нет доступных метрик Product Level
              </p>
            ) : (
              availableMetrics.map((metric) => (
                <button
                  key={metric.id}
                  onClick={() => toggleMetric(metric.id)}
                  className={`w-full flex items-center justify-between p-3 border rounded-lg transition-colors ${
                    selected.includes(metric.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900">
                      {metric.name || 'Unnamed'}
                    </div>
                    {metric.value && (
                      <div className="text-sm text-gray-600">Значение: {metric.value}</div>
                    )}
                  </div>
                  {selected.includes(metric.id) && (
                    <Check size={20} className="text-blue-600 ml-2" />
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Отмена
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
