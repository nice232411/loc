import { Filter } from 'lucide-react';

interface FilterPanelProps {
  selectedArea: string;
  selectedMonth: string;
  showUnfilledOnly: boolean;
  onAreaChange: (area: string) => void;
  onMonthChange: (month: string) => void;
  onUnfilledToggle: () => void;
  areas: { id: string; name: string }[];
}

export default function FilterPanel({
  selectedArea,
  selectedMonth,
  showUnfilledOnly,
  onAreaChange,
  onMonthChange,
  onUnfilledToggle,
  areas,
}: FilterPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter size={20} className="text-gray-600" />
        <h3 className="text-lg font-bold text-gray-800">Фильтры и сортировка</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Фильтр по эрии
          </label>
          <select
            value={selectedArea}
            onChange={(e) => onAreaChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Все эрии</option>
            {areas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Фильтр по месяцу
          </label>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-end">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showUnfilledOnly}
              onChange={onUnfilledToggle}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Показать только незаполненные
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
