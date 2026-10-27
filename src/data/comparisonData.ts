export interface MethodMetric {
  metric: string;
  modelA: number; // Citra Saja (%)
  modelB: number; // Citra + Geografis (%)
  diff: number;   // Difference (%)
}

export const comparisonMetrics: MethodMetric[] = [
  {
    metric: 'Accuracy',
    modelA: 88.7,
    modelB: 92.3,
    diff: 3.6
  },
  {
    metric: 'Precision',
    modelA: 86.3,
    modelB: 90.8,
    diff: 4.5
  },
  {
    metric: 'Recall',
    modelA: 84.5,
    modelB: 89.7,
    diff: 5.2
  },
  {
    metric: 'F1-Score',
    modelA: 85.4,
    modelB: 90.2,
    diff: 4.8
  }
];

export const experimentSummary = {
  conclusion:
    'Penambahan informasi geografis memberikan peningkatan performa identifikasi sebesar 3.6% dibandingkan hanya menggunakan citra saja.',
  datasetInfo: {
    datasetName: 'IndoFlora Vision-Geo Dataset (10.000 Citra Spesies Tropis)',
    evaluationProtocol: '5-Fold Stratified Cross Validation',
    baselineVisionModel: 'Vision Transformer (ViT-B/16) + ResNet-50 Ensemble',
    geoModel: 'Spatial Probability Prior (KDE + Elevation & Köppen Climate Features)'
  }
};
