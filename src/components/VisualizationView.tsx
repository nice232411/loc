import { X, TrendingUp } from 'lucide-react';
import { AppData } from '../types';

interface VisualizationViewProps {
  data: AppData;
  onClose: () => void;
}

export default function VisualizationView({ data, onClose }: VisualizationViewProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp size={24} className="text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">Визуализация дерева метрик</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-300">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Product Level</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-600">Vision:</p>
                <p className="text-gray-800">{data.productLevel.vision || '—'}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Goal:</p>
                <p className="text-gray-800">{data.productLevel.goal || '—'}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-semibold text-gray-600">NSM:</p>
                <p className="text-gray-800">{data.productLevel.nsm || '—'}</p>
              </div>
            </div>
            <div className="mt-4 border-t pt-4">
              <p className="text-sm font-semibold text-gray-600 mb-2">Ключевые метрики:</p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="bg-white rounded p-3">
                  <p className="text-xs text-gray-600">MAU</p>
                  <p className="font-semibold">{data.productLevel.metrics.mau || '—'}</p>
                </div>
                <div className="bg-white rounded p-3">
                  <p className="text-xs text-gray-600">LTV</p>
                  <p className="font-semibold">{data.productLevel.metrics.ltv || '—'}</p>
                </div>
                <div className="bg-white rounded p-3">
                  <p className="text-xs text-gray-600">Paying Users</p>
                  <p className="font-semibold">{data.productLevel.metrics.payingUsers || '—'}</p>
                </div>
                <div className="bg-white rounded p-3">
                  <p className="text-xs text-gray-600">Avg Check</p>
                  <p className="font-semibold">{data.productLevel.metrics.averageCheck || '—'}</p>
                </div>
                <div className="bg-white rounded p-3">
                  <p className="text-xs text-gray-600">Retention</p>
                  <p className="font-semibold">{data.productLevel.metrics.retention || '—'}</p>
                </div>
              </div>
            </div>
          </div>

          {data.areas.map((area) => (
            <div key={area.id} className="bg-green-50 rounded-lg p-6 border-2 border-green-300 ml-8">
              <h4 className="text-lg font-bold text-green-900 mb-3">{area.name}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600">Vision:</p>
                  <p className="text-gray-800 text-sm">{area.vision || '—'}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Goal:</p>
                  <p className="text-gray-800 text-sm">{area.goal || '—'}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-semibold text-gray-600">North Star Metric:</p>
                  <p className="text-gray-800 font-semibold">{area.northStarMetric || '—'}</p>
                </div>
              </div>

              {area.laggingMetrics.some(m => m.name || m.value) && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-600 mb-2">Lagging Metrics:</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {area.laggingMetrics
                      .filter(m => m.name || m.value)
                      .map((metric) => (
                        <div key={metric.id} className="bg-white rounded p-2">
                          <p className="text-xs text-gray-600">{metric.name || '—'}</p>
                          <p className="font-semibold text-sm">{metric.value || '—'}</p>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {area.features.some(f => f.name) && (
                <div className="mt-4 border-t pt-4">
                  <p className="text-sm font-semibold text-gray-600 mb-3">Фичи:</p>
                  <div className="space-y-3">
                    {area.features
                      .filter(f => f.name)
                      .map((feature) => (
                        <div
                          key={feature.id}
                          className="bg-white rounded-lg p-4 border border-gray-200 ml-4"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-semibold text-gray-800">{feature.name}</p>
                              {feature.description && (
                                <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                              )}
                            </div>
                            {feature.timingInMasterPlan && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                                {feature.timingInMasterPlan}
                              </span>
                            )}
                          </div>

                          {feature.linkedMetrics.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs font-semibold text-gray-600 mb-1">
                                Связанные метрики:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {feature.linkedMetrics.map((metric, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs"
                                  >
                                    {metric}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {feature.pmMetrics.hypothesis && (
                            <div className="mt-3 pt-3 border-t">
                              <p className="text-xs font-semibold text-gray-600">PM Hypothesis:</p>
                              <p className="text-sm text-gray-700 mt-1">
                                {feature.pmMetrics.hypothesis}
                              </p>
                            </div>
                          )}

                          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                            {feature.pmMetrics.expectedResults && (
                              <div>
                                <p className="text-gray-600 font-semibold">Expected:</p>
                                <p className="text-gray-700">{feature.pmMetrics.expectedResults}</p>
                              </div>
                            )}
                            {feature.pmMetrics.measurementResult && (
                              <div>
                                <p className="text-gray-600 font-semibold">Fact:</p>
                                <p className="text-gray-700">{feature.pmMetrics.measurementResult}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
