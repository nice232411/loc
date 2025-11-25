import { X, TrendingUp, ArrowUp } from 'lucide-react';
import { AppData } from '../types';

interface VisualizationViewProps {
  data: AppData;
  onClose: () => void;
}

export default function VisualizationView({ data, onClose }: VisualizationViewProps) {
  const getMetricNameById = (id: string) => {
    const metric = data.productLevel.metrics.find((m) => m.id === id);
    return metric?.name || 'Unknown';
  };

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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {data.productLevel.metrics.map((metric) => (
                  <div key={metric.id} className="bg-white rounded p-3 border border-blue-200">
                    <p className="text-xs text-gray-600">{metric.name || 'Unnamed'}</p>
                    <p className="font-semibold">{metric.value || '—'}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {data.areas.map((area) => (
            <div key={area.id} className="bg-green-50 rounded-lg p-6 border-2 border-green-300 ml-8">
              <h4 className="text-lg font-bold text-green-900 mb-3">{area.name}</h4>

              {area.linkedToProductMetrics.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="text-xs font-semibold text-gray-600">Связь с метриками:</span>
                  {area.linkedToProductMetrics.map((metricId) => (
                    <span
                      key={metricId}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-blue-200 text-blue-900 rounded text-xs"
                    >
                      <ArrowUp size={12} />
                      {getMetricNameById(metricId)}
                    </span>
                  ))}
                </div>
              )}

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

              {area.laggingMetrics.some((m) => m.name || m.value) && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-600 mb-2">Lagging Metrics:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {area.laggingMetrics
                      .filter((m) => m.name || m.value)
                      .map((metric) => (
                        <div key={metric.id} className="bg-white rounded p-2 border border-green-200">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-xs text-gray-600">{metric.name || '—'}</p>
                              <p className="font-semibold text-sm">{metric.value || '—'}</p>
                            </div>
                            {metric.linkedToProductMetrics.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {metric.linkedToProductMetrics.map((metricId) => (
                                  <span
                                    key={metricId}
                                    className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded text-[10px]"
                                    title={`Влияет на: ${getMetricNameById(metricId)}`}
                                  >
                                    <ArrowUp size={10} />
                                    {getMetricNameById(metricId).substring(0, 3)}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {area.features.some((f) => f.name) && (
                <div className="ml-4 space-y-2">
                  <p className="text-sm font-semibold text-gray-600">Features:</p>
                  {area.features
                    .filter((f) => f.name)
                    .map((feature) => (
                      <div
                        key={feature.id}
                        className="bg-yellow-50 rounded p-3 border border-yellow-300"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800">{feature.name}</p>
                            {feature.description && (
                              <p className="text-xs text-gray-600 mt-1">{feature.description}</p>
                            )}
                            {feature.timingInMasterPlan && (
                              <p className="text-xs text-gray-500 mt-1">
                                Timing: {feature.timingInMasterPlan}
                              </p>
                            )}
                          </div>
                          {feature.linkedMetrics.length > 0 && (
                            <div className="ml-2 flex flex-wrap gap-1">
                              {feature.linkedMetrics.map((metricName, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-green-100 text-green-800 rounded text-[10px]"
                                >
                                  <ArrowUp size={10} />
                                  {metricName}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {(feature.pmMetrics.hypothesis || feature.pmMetrics.expectedResults) && (
                          <div className="mt-2 pt-2 border-t border-yellow-200">
                            <p className="text-xs font-semibold text-gray-600">PM Metrics:</p>
                            {feature.pmMetrics.hypothesis && (
                              <p className="text-xs text-gray-700 mt-1">
                                <span className="font-semibold">Hypothesis:</span>{' '}
                                {feature.pmMetrics.hypothesis}
                              </p>
                            )}
                            {feature.pmMetrics.expectedResults && (
                              <p className="text-xs text-gray-700">
                                <span className="font-semibold">Expected:</span>{' '}
                                {feature.pmMetrics.expectedResults}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
