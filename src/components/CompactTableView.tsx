import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { AppData, Area, Feature } from '../types';
import { useState } from 'react';

interface CompactTableViewProps {
  data: AppData;
  onAreaChange: (areaId: string, updatedArea: Area) => void;
  onFeatureChange: (areaId: string, featureId: string, updatedFeature: Feature) => void;
  onAddFeature: (areaId: string) => void;
  selectedArea: string;
  selectedMonth: string;
  showUnfilledOnly: boolean;
}

export default function CompactTableView({
  data,
  onAreaChange,
  onFeatureChange,
  onAddFeature,
  selectedArea,
  selectedMonth,
  showUnfilledOnly,
}: CompactTableViewProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const filteredAreas = data.areas.filter((area) => {
    if (selectedArea && area.id !== selectedArea) return false;

    if (selectedMonth) {
      const hasMatchingFeature = area.features.some(
        (f) => f.timingInMasterPlan === selectedMonth
      );
      if (!hasMatchingFeature) return false;
    }

    if (showUnfilledOnly) {
      const hasUnfilledFields =
        !area.name ||
        !area.vision ||
        !area.goal ||
        !area.northStarMetric ||
        area.features.some((f) => !f.name || !f.description || !f.timingInMasterPlan);
      if (!hasUnfilledFields) return false;
    }

    return true;
  });

  return (
    <div className="space-y-4">
      {/* Product Level Summary */}
      <div className="bg-blue-50 rounded-lg border-2 border-blue-500 p-3 overflow-x-auto">
        <div className="text-xs font-bold text-blue-900 mb-2">Product Level</div>
        <div className="grid grid-cols-3 gap-2 text-xs mb-3">
          <div className="truncate">
            <div className="font-semibold text-gray-600">Vision</div>
            <div className="text-gray-700 truncate">{data.productLevel.vision || '-'}</div>
          </div>
          <div className="truncate">
            <div className="font-semibold text-gray-600">Goal</div>
            <div className="text-gray-700 truncate">{data.productLevel.goal || '-'}</div>
          </div>
          <div className="truncate">
            <div className="font-semibold text-gray-600">NSM</div>
            <div className="text-gray-700 truncate">{data.productLevel.nsm || '-'}</div>
          </div>
        </div>
        <div className="border-t border-blue-200 pt-2">
          <div className="font-semibold text-gray-600 text-xs mb-2">Метрики:</div>
          <div className="grid grid-cols-5 gap-2 text-xs">
            {data.productLevel.metrics.map((metric) => (
              <div key={metric.id} className="truncate">
                <div className="font-semibold text-gray-600">{metric.name || '-'}</div>
                <div className="text-gray-700 truncate">{metric.value || '-'}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Areas and Features Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-300">
        <table className="w-full text-xs border-collapse">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="border border-gray-300 p-2 text-left font-bold text-gray-700 w-6"></th>
              <th className="border border-gray-300 p-2 text-left font-bold text-gray-700 min-w-[120px]">
                Area / Feature
              </th>
              <th className="border border-gray-300 p-2 text-left font-bold text-gray-700 min-w-[80px]">
                Vision/Name
              </th>
              <th className="border border-gray-300 p-2 text-left font-bold text-gray-700 min-w-[80px]">
                Goal/Desc
              </th>
              <th className="border border-gray-300 p-2 text-left font-bold text-gray-700 min-w-[100px]">
                NSM/Timing
              </th>
              <th className="border border-gray-300 p-2 text-left font-bold text-gray-700 min-w-[80px]">
                Metrics
              </th>
              <th className="border border-gray-300 p-2 text-left font-bold text-gray-700 min-w-[120px]">
                PM Metrics
              </th>
              <th className="border border-gray-300 p-2 text-center font-bold text-gray-700 w-8">
                +
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAreas.map((area) => {
              const areaId = `area-${area.id}`;
              const isAreaExpanded = expandedRows.has(areaId);
              const areaCellsBG = 'bg-green-50';

              return (
                <tbody key={areaId}>
                  {/* Area Row */}
                  <tr className={`${areaCellsBG} border-b-2 border-green-200`}>
                    <td className={`border border-gray-300 p-1 text-center ${areaCellsBG}`}>
                      <button
                        onClick={() => toggleRow(areaId)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        {isAreaExpanded ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </button>
                    </td>
                    <td className={`border border-gray-300 p-1 font-bold text-green-900 ${areaCellsBG}`}>
                      {area.name || 'Unnamed'}
                    </td>
                    <td className={`border border-gray-300 p-1 text-gray-700 truncate ${areaCellsBG}`}>
                      <input
                        type="text"
                        value={area.vision}
                        onChange={(e) =>
                          onAreaChange(area.id, { ...area, vision: e.target.value })
                        }
                        className="w-full p-0.5 border border-gray-300 rounded text-xs"
                        placeholder="Vision"
                      />
                    </td>
                    <td className={`border border-gray-300 p-1 text-gray-700 truncate ${areaCellsBG}`}>
                      <input
                        type="text"
                        value={area.goal}
                        onChange={(e) =>
                          onAreaChange(area.id, { ...area, goal: e.target.value })
                        }
                        className="w-full p-0.5 border border-gray-300 rounded text-xs"
                        placeholder="Goal"
                      />
                    </td>
                    <td className={`border border-gray-300 p-1 text-gray-700 truncate ${areaCellsBG}`}>
                      <input
                        type="text"
                        value={area.northStarMetric}
                        onChange={(e) =>
                          onAreaChange(area.id, { ...area, northStarMetric: e.target.value })
                        }
                        className="w-full p-0.5 border border-gray-300 rounded text-xs"
                        placeholder="NSM"
                      />
                    </td>
                    <td className={`border border-gray-300 p-1 text-gray-600 text-center ${areaCellsBG}`}>
                      <span className="inline-block bg-green-200 px-2 py-0.5 rounded text-xs font-medium">
                        {area.laggingMetrics.filter((m) => m.name).length}/
                        {area.laggingMetrics.length}
                      </span>
                    </td>
                    <td className={`border border-gray-300 p-1 text-gray-600 text-center ${areaCellsBG}`}>
                      <span className="inline-block bg-blue-200 px-2 py-0.5 rounded text-xs font-medium">
                        {area.features.filter((f) => f.pmMetrics.hypothesis).length}/
                        {area.features.length}
                      </span>
                    </td>
                    <td className={`border border-gray-300 p-1 text-center ${areaCellsBG}`}>
                      <button
                        onClick={() => onAddFeature(area.id)}
                        className="text-green-600 hover:text-green-900 text-sm"
                        title="Add feature"
                      >
                        <Plus size={14} />
                      </button>
                    </td>
                  </tr>

                  {/* Features Rows */}
                  {isAreaExpanded &&
                    area.features.map((feature) => (
                      <tr key={`feature-${feature.id}`} className="bg-white border-b border-gray-200">
                        <td className="border border-gray-300 p-1 text-center">
                          <ChevronRight size={14} className="text-gray-400" />
                        </td>
                        <td className="border border-gray-300 p-1 text-gray-700 font-medium truncate">
                          <span className="ml-4 text-xs">├ {feature.name || 'Unnamed'}</span>
                        </td>
                        <td className="border border-gray-300 p-1">
                          <input
                            type="text"
                            value={feature.name}
                            onChange={(e) =>
                              onFeatureChange(area.id, feature.id, {
                                ...feature,
                                name: e.target.value,
                              })
                            }
                            className="w-full p-0.5 border border-gray-300 rounded text-xs"
                            placeholder="Feature name"
                          />
                        </td>
                        <td className="border border-gray-300 p-1">
                          <textarea
                            value={feature.description}
                            onChange={(e) =>
                              onFeatureChange(area.id, feature.id, {
                                ...feature,
                                description: e.target.value,
                              })
                            }
                            className="w-full p-0.5 border border-gray-300 rounded text-xs"
                            placeholder="Description"
                            rows={1}
                          />
                        </td>
                        <td className="border border-gray-300 p-1">
                          <input
                            type="month"
                            value={feature.timingInMasterPlan}
                            onChange={(e) =>
                              onFeatureChange(area.id, feature.id, {
                                ...feature,
                                timingInMasterPlan: e.target.value,
                              })
                            }
                            className="w-full p-0.5 border border-gray-300 rounded text-xs"
                          />
                        </td>
                        <td className="border border-gray-300 p-1 text-center">
                          <span className="text-xs font-medium text-gray-600">
                            {feature.linkedMetrics.length}
                          </span>
                        </td>
                        <td className="border border-gray-300 p-1 text-center">
                          <span
                            className={`text-xs font-medium px-1 py-0.5 rounded ${
                              feature.pmMetrics.hypothesis
                                ? 'bg-blue-200 text-blue-900'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            {feature.pmMetrics.hypothesis ? '✓' : '○'}
                          </span>
                        </td>
                        <td className="border border-gray-300 p-1"></td>
                      </tr>
                    ))}
                </tbody>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredAreas.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-600">
          Нет данных, соответствующих выбранным фильтрам
        </div>
      )}
    </div>
  );
}
