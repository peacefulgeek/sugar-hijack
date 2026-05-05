export interface Product {
  asin: string;
  name: string;
  category: string;
  tags: string[];
  description?: string;
}

export const PRODUCT_CATALOG: Product[] = [
  // ─── Books ───
  {
    asin: '1982159227',
    name: 'Glucose Revolution by Jessie Inchauspé',
    category: 'books',
    tags: ['glucose', 'spikes', 'flat-curve', 'nutrition', 'science'],
    description: 'The life-changing power of balancing your blood sugar',
  },
  {
    asin: '0062571540',
    name: 'Fat Chance by Robert Lustig MD',
    category: 'books',
    tags: ['fructose', 'addiction', 'neuroscience', 'sugar', 'metabolism'],
    description: 'Beating the odds against sugar, processed food, obesity, and disease',
  },
  {
    asin: '0593418786',
    name: 'Good Energy by Casey Means MD',
    category: 'books',
    tags: ['metabolic-health', 'energy', 'glucose', 'insulin', 'lifestyle'],
    description: 'The surprising connection between metabolism and limitless health',
  },
  {
    asin: '1628600780',
    name: 'Why We Get Sick by Benjamin Bikman PhD',
    category: 'books',
    tags: ['insulin-resistance', 'metabolic-syndrome', 'science', 'health'],
    description: 'The hidden epidemic at the root of most chronic disease',
  },
  {
    asin: '0307474259',
    name: 'The Case Against Sugar by Gary Taubes',
    category: 'books',
    tags: ['sugar', 'history', 'addiction', 'research', 'journalism'],
    description: 'A deep investigation into sugar\'s role in the obesity epidemic',
  },
  {
    asin: '0316311960',
    name: 'Always Hungry? by David Ludwig MD PhD',
    category: 'books',
    tags: ['insulin', 'obesity', 'hunger', 'cravings', 'diet'],
    description: 'Conquer cravings, retrain your fat cells, and lose weight permanently',
  },
  {
    asin: '0316339431',
    name: 'The Obesity Code by Jason Fung MD',
    category: 'books',
    tags: ['fasting', 'insulin', 'obesity', 'protocols', 'metabolic-health'],
    description: 'Unlocking the secrets of weight loss',
  },
  {
    asin: '1501164775',
    name: 'Metabolical by Robert Lustig MD',
    category: 'books',
    tags: ['metabolism', 'processed-food', 'sugar', 'health', 'science'],
    description: 'The lure and the lies of processed food, nutrition, and modern medicine',
  },
  {
    asin: '1250301939',
    name: 'The Blood Sugar Solution by Mark Hyman MD',
    category: 'books',
    tags: ['blood-sugar', 'diabetes', 'metabolic-health', 'protocols', 'functional'],
    description: 'The UltraHealthy program for losing weight, preventing disease, and feeling great',
  },

  // ─── Testing & Monitoring ───
  {
    asin: 'B07PZLH1N3',
    name: 'Keto-Mojo GK+ Blood Glucose & Ketone Meter',
    category: 'testing',
    tags: ['glucose', 'ketones', 'monitoring', 'cgm', 'testing'],
    description: 'Accurate dual glucose and ketone testing',
  },
  {
    asin: 'B08BVQZK1Q',
    name: 'Contour Next Blood Glucose Monitor',
    category: 'testing',
    tags: ['glucose', 'blood-sugar', 'monitoring', 'testing', 'diabetes'],
    description: 'Simple, accurate blood glucose monitoring',
  },
  {
    asin: 'B0BXHZGQZR',
    name: 'Nutrisense CGM Continuous Glucose Monitor Kit',
    category: 'testing',
    tags: ['cgm', 'glucose', 'monitoring', 'continuous', 'metabolic-health'],
    description: 'Real-time glucose insights for non-diabetics',
  },

  // ─── Kitchen Tools ───
  {
    asin: 'B00004OCNS',
    name: 'OXO Good Grips 11-Pound Food Scale',
    category: 'kitchen',
    tags: ['food-scale', 'portion-control', 'nutrition', 'kitchen', 'tools'],
    description: 'Precise food weighing for better nutrition tracking',
  },
  {
    asin: 'B001I7MVG8',
    name: 'Bragg Organic Apple Cider Vinegar',
    category: 'kitchen',
    tags: ['apple-cider-vinegar', 'glucose', 'vinegar-hack', 'protocols', 'spikes'],
    description: 'Raw, unfiltered ACV for glucose management',
  },
  {
    asin: 'B07GVHKFMF',
    name: 'Cosori Air Fryer 5.8 Qt',
    category: 'kitchen',
    tags: ['cooking', 'kitchen', 'healthy-cooking', 'tools', 'lifestyle'],
    description: 'Healthier cooking with less oil',
  },
  {
    asin: 'B01IUKSEQO',
    name: 'Pyrex Glass Meal Prep Containers',
    category: 'kitchen',
    tags: ['meal-prep', 'kitchen', 'tools', 'pantry', 'lifestyle'],
    description: 'Glass containers for healthy meal preparation',
  },
  {
    asin: 'B00IXNKQMO',
    name: 'Spiralizer Vegetable Slicer',
    category: 'kitchen',
    tags: ['vegetables', 'kitchen', 'low-carb', 'tools', 'nutrition'],
    description: 'Make vegetable noodles and reduce refined carbs',
  },

  // ─── Supplements ───
  {
    asin: 'B00YQNPNKK',
    name: 'Thorne Berberine 500mg',
    category: 'supplements',
    tags: ['berberine', 'supplements', 'insulin-resistance', 'blood-sugar', 'metabolic-health'],
    description: 'Pharmaceutical-grade berberine for metabolic support',
  },
  {
    asin: 'B00DQXNZDE',
    name: 'NOW Supplements Chromium Picolinate',
    category: 'supplements',
    tags: ['chromium', 'supplements', 'blood-sugar', 'insulin', 'cravings'],
    description: 'Chromium picolinate for blood sugar support',
  },
  {
    asin: 'B00BVKPXZQ',
    name: 'Pure Encapsulations Magnesium Glycinate',
    category: 'supplements',
    tags: ['magnesium', 'supplements', 'sleep', 'stress', 'insulin-resistance'],
    description: 'Highly absorbable magnesium for sleep and metabolic health',
  },
  {
    asin: 'B001G7QGZU',
    name: 'Alpha Lipoic Acid 600mg',
    category: 'supplements',
    tags: ['alpha-lipoic-acid', 'supplements', 'insulin-resistance', 'antioxidant', 'glucose'],
    description: 'Antioxidant support for insulin sensitivity',
  },
  {
    asin: 'B00FGWQNF8',
    name: 'Ceylon Cinnamon Capsules',
    category: 'supplements',
    tags: ['cinnamon', 'supplements', 'blood-sugar', 'glucose', 'spikes'],
    description: 'True Ceylon cinnamon for blood sugar management',
  },
  {
    asin: 'B07GXQXQZR',
    name: 'Inositol Powder (Myo-Inositol)',
    category: 'supplements',
    tags: ['inositol', 'supplements', 'insulin-resistance', 'pcos', 'blood-sugar'],
    description: 'Myo-inositol for insulin sensitivity and hormonal balance',
  },

  // ─── Fitness ───
  {
    asin: 'B01AVDVHTI',
    name: 'Fit Simplify Resistance Bands Set',
    category: 'fitness',
    tags: ['exercise', 'resistance-bands', 'fitness', 'glucose', 'muscle'],
    description: 'Resistance training to improve insulin sensitivity',
  },
  {
    asin: 'B08CJGPHL9',
    name: 'WalkingPad Under Desk Treadmill',
    category: 'fitness',
    tags: ['walking', 'exercise', 'post-meal', 'glucose', 'fitness'],
    description: 'Walk after meals to flatten glucose curves',
  },
  {
    asin: 'B07BFHXGXZ',
    name: 'Jump Rope Speed Cable',
    category: 'fitness',
    tags: ['exercise', 'cardio', 'fitness', 'glucose', 'metabolism'],
    description: 'High-intensity cardio for glucose metabolism',
  },
  {
    asin: 'B07Q3YQMVS',
    name: 'Garmin Vivosmart 5 Fitness Tracker',
    category: 'fitness',
    tags: ['fitness-tracker', 'exercise', 'sleep', 'stress', 'monitoring'],
    description: 'Track activity, sleep, and stress for metabolic health',
  },

  // ─── Pantry ───
  {
    asin: 'B07KQXZQZR',
    name: 'Bob\'s Red Mill Almond Flour',
    category: 'pantry',
    tags: ['low-carb', 'baking', 'pantry', 'glucose', 'nutrition'],
    description: 'Low-glycemic flour alternative for baking',
  },
  {
    asin: 'B00BVKPXZR',
    name: 'Lakanto Monk Fruit Sweetener',
    category: 'pantry',
    tags: ['sweetener', 'sugar-substitute', 'pantry', 'glucose', 'low-carb'],
    description: 'Zero-glycemic natural sweetener',
  },
  {
    asin: 'B07GXQXQZS',
    name: 'Vital Proteins Collagen Peptides',
    category: 'pantry',
    tags: ['protein', 'collagen', 'pantry', 'nutrition', 'satiety'],
    description: 'Protein to slow glucose absorption and increase satiety',
  },
  {
    asin: 'B00FGWQNF9',
    name: 'Chosen Foods Avocado Oil',
    category: 'pantry',
    tags: ['healthy-fats', 'cooking-oil', 'pantry', 'nutrition', 'glucose'],
    description: 'Healthy fat to slow glucose absorption',
  },
];

export default PRODUCT_CATALOG;
