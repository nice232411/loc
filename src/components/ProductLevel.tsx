import { ChevronDown, ChevronRight } from 'lucide-react';
import { ProductLevel as ProductLevelType } from '../types';

interface ProductLevelProps {
  data: ProductLevelType;
  collapsed: boolean;
  onChange: (data: ProductLevelType) => void;
  onToggleCollapse: () => void;
}

export default function ProductLevel({ data, collapsed, onChange, onToggleCollapse }: ProductLevelProps) {
  const handleChange = (field: keyof ProductLevelType, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleMetricChange = (metric: keyof ProductLevelType['metrics'], value: string) => {
    onChange({
      ...data,
      metrics: { ...data.metrics, [metric]: value },
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
            <h3 className="text-lg font-bold text-gray-800 mb-4">5 ключевых продуктовых метрик</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">MAU</label>
                <input
                  type="text"
                  value={data.metrics.mau}
                  onChange={(e) => handleMetricChange('mau', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Значение MAU"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">LTV</label>
                <input
                  type="text"
                  value={data.metrics.ltv}
                  onChange={(e) => handleMetricChange('ltv', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Значение LTV"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of paying users
                </label>
                <input
                  type="text"
                  value={data.metrics.payingUsers}
                  onChange={(e) => handleMetricChange('payingUsers', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Количество платящих пользователей"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Average check per paying user
                </label>
                <input
                  type="text"
                  value={data.metrics.averageCheck}
                  onChange={(e) => handleMetricChange('averageCheck', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Средний чек"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Retention</label>
                <input
                  type="text"
                  value={data.metrics.retention}
                  onChange={(e) => handleMetricChange('retention', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Значение Retention"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
