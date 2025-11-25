import { useState, useEffect } from 'react';
import { Save, Eye, RotateCcw, Grid3x3, LayoutList } from 'lucide-react';
import { AppData, Area, Feature } from './types';
import { loadData, saveData, addFeatureToArea, addLaggingMetric } from './utils/storage';
import ProductLevel from './components/ProductLevel';
import AreaItem from './components/AreaItem';
import FilterPanel from './components/FilterPanel';
import VisualizationView from './components/VisualizationView';
import CompactTableView from './components/CompactTableView';

type ViewMode = 'detailed' | 'compact';

function App() {
  const [data, setData] = useState<AppData>(loadData());
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [showUnfilledOnly, setShowUnfilledOnly] = useState(false);
  const [showVisualization, setShowVisualization] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('compact');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    const autoSave = setInterval(() => {
      saveData(data);
      setLastSaved(new Date());
    }, 30000);

    return () => clearInterval(autoSave);
  }, [data]);

  const handleSave = () => {
    saveData(data);
    setLastSaved(new Date());
  };

  const handleReset = () => {
    if (confirm('Вы уверены, что хотите сбросить все данные? Это действие нельзя отменить.')) {
      localStorage.clear();
      setData(loadData());
      setLastSaved(null);
    }
  };

  const handleProductLevelChange = (productLevel: typeof data.productLevel) => {
    setData({ ...data, productLevel });
  };

  const handleAreaChange = (areaId: string, updatedArea: Area) => {
    setData({
      ...data,
      areas: data.areas.map((a) => (a.id === areaId ? updatedArea : a)),
    });
  };

  const handleFeatureChange = (areaId: string, featureId: string, updatedFeature: Feature) => {
    setData({
      ...data,
      areas: data.areas.map((a) =>
        a.id === areaId
          ? {
              ...a,
              features: a.features.map((f) => (f.id === featureId ? updatedFeature : f)),
            }
          : a
      ),
    });
  };

  const handleAddFeature = (areaId: string) => {
    setData(addFeatureToArea(areaId, data));
  };

  const handleAddLaggingMetricToArea = (areaId: string) => {
    setData(addLaggingMetric(areaId, data));
  };

  const toggleProductLevelCollapse = () => {
    setData({ ...data, productLevelCollapsed: !data.productLevelCollapsed });
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
        area.features.some(
          (f) =>
            !f.name ||
            !f.description ||
            !f.timingInMasterPlan
        );
      if (!hasUnfilledFields) return false;
    }

    return true;
  });

  const collapseAll = () => {
    setData({
      ...data,
      productLevelCollapsed: true,
      areas: data.areas.map((area) => ({
        ...area,
        collapsed: true,
        features: area.features.map((f) => ({ ...f, collapsed: true })),
      })),
    });
  };

  const expandAll = () => {
    setData({
      ...data,
      productLevelCollapsed: false,
      areas: data.areas.map((area) => ({
        ...area,
        collapsed: false,
        features: area.features.map((f) => ({ ...f, collapsed: false })),
      })),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Продуктовое дерево метрик
          </h1>
          <p className="text-gray-600">
            Управление продуктовыми эриями, метриками и фичами мастер-плана
          </p>
        </header>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            <Save size={20} />
            Сохранить
          </button>

          <button
            onClick={() => setShowVisualization(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
          >
            <Eye size={20} />
            Визуализация
          </button>

          <div className="flex gap-2 ml-auto">
            <button
              onClick={() => setViewMode('compact')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors shadow-md ${
                viewMode === 'compact'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
              title="Компактная таблица"
            >
              <Grid3x3 size={18} />
            </button>
            <button
              onClick={() => setViewMode('detailed')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors shadow-md ${
                viewMode === 'detailed'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
              title="Подробный вид"
            >
              <LayoutList size={18} />
            </button>
          </div>

          {viewMode === 'detailed' && (
            <>
              <button
                onClick={collapseAll}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md"
              >
                Свернуть всё
              </button>

              <button
                onClick={expandAll}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md"
              >
                Развернуть всё
              </button>
            </>
          )}

          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md"
          >
            <RotateCcw size={20} />
            Сбросить
          </button>
        </div>

        {lastSaved && (
          <div className="mb-4 text-sm text-gray-600">
            Последнее сохранение: {lastSaved.toLocaleTimeString('ru-RU')}
          </div>
        )}

        <FilterPanel
          selectedArea={selectedArea}
          selectedMonth={selectedMonth}
          showUnfilledOnly={showUnfilledOnly}
          onAreaChange={setSelectedArea}
          onMonthChange={setSelectedMonth}
          onUnfilledToggle={() => setShowUnfilledOnly(!showUnfilledOnly)}
          areas={data.areas.map((a) => ({ id: a.id, name: a.name }))}
        />

        {viewMode === 'compact' ? (
          <CompactTableView
            data={data}
            onProductLevelChange={handleProductLevelChange}
            onAreaChange={handleAreaChange}
            onFeatureChange={handleFeatureChange}
            onAddFeature={handleAddFeature}
            onAddLaggingMetric={handleAddLaggingMetricToArea}
            selectedArea={selectedArea}
            selectedMonth={selectedMonth}
            showUnfilledOnly={showUnfilledOnly}
          />
        ) : (
          <div className="space-y-6">
            <ProductLevel
              data={data.productLevel}
              collapsed={data.productLevelCollapsed}
              onChange={handleProductLevelChange}
              onToggleCollapse={toggleProductLevelCollapse}
            />

            {filteredAreas.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-600">
                  Нет эрий, соответствующих выбранным фильтрам
                </p>
              </div>
            ) : (
              filteredAreas.map((area) => (
                <AreaItem
                  key={area.id}
                  area={area}
                  onChange={(updated) => handleAreaChange(area.id, updated)}
                  onAddFeature={() => handleAddFeature(area.id)}
                  onAddLaggingMetric={() => handleAddLaggingMetricToArea(area.id)}
                />
              ))
            )}
          </div>
        )}

        {showVisualization && (
          <VisualizationView data={data} onClose={() => setShowVisualization(false)} />
        )}
      </div>
    </div>
  );
}

export default App;
