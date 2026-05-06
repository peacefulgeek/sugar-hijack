export interface AssessmentQuestion {
  id: string;
  text: string;
  options: { value: number; label: string }[];
}

export interface AssessmentResult {
  minScore: number;
  maxScore: number;
  title: string;
  description: string;
  recommendations: string[];
  articles: string[];
}

export interface Assessment {
  slug: string;
  title: string;
  description: string;
  subtitle?: string;
  icon?: string;
  color?: string;
  questions: AssessmentQuestion[];
  results: AssessmentResult[];
}

export const ASSESSMENTS: Assessment[] = [
  // ─── 1. Sugar Dependency Assessment ─────────────────────────────────────────
  {
    slug: 'sugar-dependency',
    title: 'Sugar Dependency Assessment',
    description: 'Discover how dependent your brain and body are on sugar — and what to do about it.',
    subtitle: '10 questions · 5 minutes · No email required',
    icon: '🍬',
    color: '#C0392B',
    questions: [
      {
        id: 'q1',
        text: 'How often do you consume sweet foods or drinks (candy, soda, juice, pastries, sweetened coffee)?',
        options: [
          { value: 0, label: 'Rarely or never' },
          { value: 1, label: '1–2 times per week' },
          { value: 2, label: '3–5 times per week' },
          { value: 3, label: 'Daily' },
          { value: 4, label: 'Multiple times per day' },
        ],
      },
      {
        id: 'q2',
        text: 'When you try to cut back on sugar, how do you feel?',
        options: [
          { value: 0, label: 'Fine — no noticeable change' },
          { value: 1, label: 'Slightly irritable or tired' },
          { value: 2, label: 'Headaches, mood swings, or fatigue' },
          { value: 3, label: 'Strong cravings and difficulty concentrating' },
          { value: 4, label: 'Intense withdrawal — irritable, anxious, shaky' },
        ],
      },
      {
        id: 'q3',
        text: "Do you eat sweet foods even when you're not hungry?",
        options: [
          { value: 0, label: 'Never' },
          { value: 1, label: 'Occasionally' },
          { value: 2, label: 'Sometimes, especially when stressed' },
          { value: 3, label: "Often — it's a habit" },
          { value: 4, label: "Almost always — I eat sugar regardless of hunger" },
        ],
      },
      {
        id: 'q4',
        text: 'How do you feel 1–2 hours after eating a sugary meal or snack?',
        options: [
          { value: 0, label: 'Fine — no change' },
          { value: 1, label: 'Slightly tired' },
          { value: 2, label: 'Energy crash and brain fog' },
          { value: 3, label: 'Strong cravings for more sugar' },
          { value: 4, label: 'Irritable, shaky, or anxious — need more sugar' },
        ],
      },
      {
        id: 'q5',
        text: 'Have you ever tried to cut out sugar and failed within a few days?',
        options: [
          { value: 0, label: "Never tried — I don't feel I need to" },
          { value: 1, label: 'Tried once and succeeded' },
          { value: 2, label: 'Tried and lasted 1–2 weeks before slipping' },
          { value: 3, label: 'Tried multiple times and failed each time' },
          { value: 4, label: "I've tried many times — it feels impossible" },
        ],
      },
      {
        id: 'q6',
        text: 'Do you use sugar to manage your emotions (stress, boredom, sadness, reward)?',
        options: [
          { value: 0, label: 'Never' },
          { value: 1, label: 'Occasionally, as a treat' },
          { value: 2, label: 'Sometimes when stressed or bored' },
          { value: 3, label: "Often — it's my go-to comfort" },
          { value: 4, label: 'Almost always — sugar is how I cope' },
        ],
      },
      {
        id: 'q7',
        text: 'Do you find yourself eating more sugar than you intended?',
        options: [
          { value: 0, label: 'Never — I can stop when I want' },
          { value: 1, label: 'Occasionally I overindulge' },
          { value: 2, label: 'Sometimes I eat more than planned' },
          { value: 3, label: "Often — I lose control once I start" },
          { value: 4, label: 'Almost always — one bite leads to a binge' },
        ],
      },
      {
        id: 'q8',
        text: 'How often do you experience energy crashes, brain fog, or mood swings during the day?',
        options: [
          { value: 0, label: 'Rarely or never' },
          { value: 1, label: 'Once or twice a week' },
          { value: 2, label: 'A few times a week' },
          { value: 3, label: 'Daily' },
          { value: 4, label: 'Multiple times per day' },
        ],
      },
      {
        id: 'q9',
        text: "Do you think about sugar or sweet foods when you're not eating?",
        options: [
          { value: 0, label: 'Never' },
          { value: 1, label: 'Occasionally' },
          { value: 2, label: 'Sometimes, especially in the afternoon' },
          { value: 3, label: 'Often throughout the day' },
          { value: 4, label: "Constantly — it occupies my thoughts" },
        ],
      },
      {
        id: 'q10',
        text: 'How does your sugar consumption affect your daily life, relationships, or health goals?',
        options: [
          { value: 0, label: "Not at all — it's not an issue" },
          { value: 1, label: 'Minor — occasionally feel guilty' },
          { value: 2, label: 'Moderate — it gets in the way of health goals' },
          { value: 3, label: 'Significant — it affects my mood and energy daily' },
          { value: 4, label: "Major — it's disrupting my life and health significantly" },
        ],
      },
    ],
    results: [
      {
        minScore: 0,
        maxScore: 10,
        title: 'Sugar Aware',
        description: "Your relationship with sugar is relatively balanced. You have good awareness and control. A few mindful adjustments can optimize your metabolic health even further.",
        recommendations: [
          'Continue your current balanced approach',
          'Consider tracking glucose variability with a CGM for 2 weeks',
          'Explore the science of glucose optimization',
        ],
        articles: ['glucose-spikes-explained', 'cgm-guide-beginners', 'food-order-glucose'],
      },
      {
        minScore: 11,
        maxScore: 20,
        title: 'Mild Sugar Dependency',
        description: "You show some signs of sugar dependency — particularly around energy crashes and emotional eating. Your brain's reward system has been conditioned to expect regular sugar hits, but this is very reversible.",
        recommendations: [
          'Start a 7-day sugar audit — track all added sugar',
          'Add protein and fat to every meal to stabilize glucose',
          'Practice the 5-minute craving interrupt technique',
        ],
        articles: ['how-to-quit-sugar', 'dopamine-sugar-reward', 'emotional-eating-biology'],
      },
      {
        minScore: 21,
        maxScore: 30,
        title: 'Moderate Sugar Dependency',
        description: "Sugar has a significant hold on your daily energy, mood, and behavior. The dopamine-reward cycle is well-established, but your brain is highly neuroplastic — this can be rewired with the right protocol.",
        recommendations: [
          'Begin the 21-Day Sugar Reset protocol',
          'Address the emotional eating component directly',
          'Support dopamine recovery with magnesium and sleep',
        ],
        articles: ['sugar-addiction-neuroscience', 'glucose-crash-cycle', 'stress-sugar-cravings'],
      },
      {
        minScore: 31,
        maxScore: 40,
        title: 'Strong Sugar Dependency',
        description: "Your brain and body are significantly dependent on sugar. This is not a willpower failure — it's neurobiology. The opioid and dopamine systems are deeply conditioned. With the right approach, full recovery is absolutely possible.",
        recommendations: [
          'Start with a medically-informed 30-day detox protocol',
          'Address withdrawal symptoms proactively with electrolytes and adaptogens',
          'Consider working with a functional medicine practitioner',
          'Focus on neuroplasticity — your brain can and will rewire',
        ],
        articles: ['sugar-addiction-neuroscience', 'dopamine-sugar-reward', 'how-to-quit-sugar', 'berberine-blood-sugar'],
      },
    ],
  },

  // ─── 2. Glucose Awareness Quiz ───────────────────────────────────────────────
  {
    slug: 'glucose-awareness',
    title: 'Glucose Awareness Quiz',
    description: "How well do you understand what's happening in your body after you eat? Test your glucose IQ.",
    subtitle: '10 questions · 5 minutes · Learn the science',
    icon: '📊',
    color: '#2980B9',
    questions: [
      {
        id: 'q1',
        text: 'What is a "glucose spike"?',
        options: [
          { value: 0, label: 'When blood sugar drops suddenly' },
          { value: 3, label: 'When blood sugar rises rapidly after eating' },
          { value: 0, label: 'When insulin stops working' },
          { value: 0, label: 'When you feel energized after eating' },
        ],
      },
      {
        id: 'q2',
        text: 'Which of these foods is MOST likely to cause a rapid glucose spike?',
        options: [
          { value: 0, label: 'A handful of almonds' },
          { value: 0, label: 'A piece of salmon with vegetables' },
          { value: 3, label: 'A glass of orange juice' },
          { value: 0, label: 'An avocado' },
        ],
      },
      {
        id: 'q3',
        text: 'What does insulin do in response to a glucose spike?',
        options: [
          { value: 1, label: 'Converts glucose to fat for storage' },
          { value: 1, label: 'Signals cells to absorb glucose from the blood' },
          { value: 0, label: 'Increases appetite' },
          { value: 3, label: 'Both A and B' },
        ],
      },
      {
        id: 'q4',
        text: 'What is the "food order" hack for reducing glucose spikes?',
        options: [
          { value: 0, label: 'Eat carbs first, then protein' },
          { value: 3, label: 'Eat vegetables and protein first, carbs last' },
          { value: 0, label: 'Eat everything at the same time' },
          { value: 1, label: 'Drink water before eating' },
        ],
      },
      {
        id: 'q5',
        text: 'Which activity is most effective at lowering blood sugar after a meal?',
        options: [
          { value: 0, label: 'Sitting on the couch' },
          { value: 3, label: 'Taking a 10-minute walk' },
          { value: 1, label: 'Drinking a glass of milk' },
          { value: 1, label: 'Eating more protein' },
        ],
      },
      {
        id: 'q6',
        text: 'What does "insulin resistance" mean?',
        options: [
          { value: 0, label: 'The body produces no insulin' },
          { value: 3, label: "Cells don't respond effectively to insulin signals" },
          { value: 0, label: 'Blood sugar is always low' },
          { value: 0, label: 'The pancreas is overactive' },
        ],
      },
      {
        id: 'q7',
        text: 'What does vinegar (acetic acid) do to glucose absorption?',
        options: [
          { value: 0, label: 'Speeds up glucose absorption' },
          { value: 0, label: 'Has no effect' },
          { value: 3, label: 'Slows glucose absorption by inhibiting digestive enzymes' },
          { value: 0, label: 'Converts glucose to fat' },
        ],
      },
      {
        id: 'q8',
        text: 'What is the "dawn phenomenon"?',
        options: [
          { value: 0, label: 'Blood sugar drops at dawn from overnight fasting' },
          { value: 3, label: 'Blood sugar rises in the early morning due to cortisol and growth hormone' },
          { value: 1, label: 'Insulin sensitivity peaks at dawn' },
          { value: 0, label: 'The best time to eat breakfast for glucose stability' },
        ],
      },
      {
        id: 'q9',
        text: 'Which macronutrient has the LEAST impact on blood glucose?',
        options: [
          { value: 0, label: 'Carbohydrates' },
          { value: 1, label: 'Protein' },
          { value: 3, label: 'Fat' },
          { value: 0, label: 'They all impact glucose equally' },
        ],
      },
      {
        id: 'q10',
        text: 'What does HbA1c measure?',
        options: [
          { value: 0, label: 'Your blood sugar right now' },
          { value: 3, label: 'Your average blood sugar over the past 3 months' },
          { value: 0, label: 'How much insulin you produce' },
          { value: 1, label: 'Your fasting glucose level' },
        ],
      },
    ],
    results: [
      {
        minScore: 0,
        maxScore: 10,
        title: 'Glucose Beginner',
        description: "You're just starting your glucose education journey. The good news: the science is fascinating and the interventions are simple. Start with the basics and you'll be amazed how quickly your understanding — and your health — transforms.",
        recommendations: [
          'Read "Glucose Spikes Explained" first',
          'Learn the food order hack — it\'s free and immediate',
          'Start a 10-minute post-meal walk habit',
        ],
        articles: ['glucose-spikes-explained', 'food-order-glucose', 'post-meal-walking-glucose'],
      },
      {
        minScore: 11,
        maxScore: 20,
        title: 'Glucose Curious',
        description: 'You have a solid foundation of glucose knowledge. You understand the basics but there\'s rich science ahead that will deepen your practice and give you more precise tools.',
        recommendations: [
          'Explore continuous glucose monitoring',
          'Learn about glucose variability vs. average',
          'Dive into the vinegar and berberine protocols',
        ],
        articles: ['cgm-guide-beginners', 'insulin-resistance-explained', 'vinegar-hack-glucose'],
      },
      {
        minScore: 21,
        maxScore: 26,
        title: 'Glucose Informed',
        description: 'You have strong glucose literacy. You understand the mechanisms and can apply them. Now it\'s time to go deeper into the nuances — glucose variability, metabolic flexibility, and advanced protocols.',
        recommendations: [
          'Explore metabolic flexibility training',
          'Learn about CGM data interpretation',
          'Investigate berberine and alpha-lipoic acid protocols',
        ],
        articles: ['metabolic-syndrome-spectrum', 'berberine-blood-sugar', 'cgm-guide-beginners'],
      },
      {
        minScore: 27,
        maxScore: 30,
        title: 'Glucose Expert',
        description: 'You have exceptional glucose literacy. You understand the mechanisms at a deep level. You\'re ready for advanced metabolic optimization — CGM data analysis, metabolic flexibility training, and precision nutrition.',
        recommendations: [
          'Consider wearing a CGM for 30 days to validate your knowledge',
          'Explore advanced metabolic testing',
          'Share your knowledge — teach others the glucose basics',
        ],
        articles: ['cgm-guide-beginners', 'metabolic-syndrome-spectrum', 'insulin-resistance-explained'],
      },
    ],
  },

  // ─── 3. Metabolic Health Score ───────────────────────────────────────────────
  {
    slug: 'metabolic-health-score',
    title: 'Metabolic Health Score',
    description: 'Assess your overall metabolic health across 5 key dimensions: blood sugar, inflammation, energy, body composition, and sleep.',
    subtitle: '12 questions · 7 minutes · Get your score',
    icon: '⚡',
    color: '#27AE60',
    questions: [
      {
        id: 'q1',
        text: 'How would you describe your energy levels throughout the day?',
        options: [
          { value: 4, label: 'Consistently high and stable — no crashes' },
          { value: 3, label: 'Generally good with occasional dips' },
          { value: 2, label: 'Moderate — afternoon crash is common' },
          { value: 1, label: 'Low — I rely on caffeine or sugar to function' },
          { value: 0, label: 'Very low — exhausted most of the day' },
        ],
      },
      {
        id: 'q2',
        text: 'How is your sleep quality?',
        options: [
          { value: 4, label: 'Excellent — 7–9 hours, wake refreshed' },
          { value: 3, label: 'Good — mostly restful with occasional issues' },
          { value: 2, label: 'Fair — often tired despite sleeping' },
          { value: 1, label: 'Poor — difficulty falling or staying asleep' },
          { value: 0, label: 'Very poor — chronic sleep problems' },
        ],
      },
      {
        id: 'q3',
        text: 'How often do you experience brain fog or difficulty concentrating?',
        options: [
          { value: 4, label: 'Rarely or never' },
          { value: 3, label: 'Occasionally' },
          { value: 2, label: 'A few times a week' },
          { value: 1, label: 'Daily' },
          { value: 0, label: 'Almost constantly' },
        ],
      },
      {
        id: 'q4',
        text: 'How would you describe your waist circumference relative to your height?',
        options: [
          { value: 4, label: 'Slim — clearly below half my height' },
          { value: 3, label: 'Moderate — roughly half my height' },
          { value: 2, label: 'Slightly elevated — just above half my height' },
          { value: 1, label: 'Elevated — noticeably above half my height' },
          { value: 0, label: 'High — significantly above half my height' },
        ],
      },
      {
        id: 'q5',
        text: 'How often do you experience inflammation symptoms (joint pain, skin issues, bloating, headaches)?',
        options: [
          { value: 4, label: 'Rarely or never' },
          { value: 3, label: 'Occasionally' },
          { value: 2, label: 'Weekly' },
          { value: 1, label: 'Several times a week' },
          { value: 0, label: 'Daily' },
        ],
      },
      {
        id: 'q6',
        text: 'How is your digestion and gut health?',
        options: [
          { value: 4, label: 'Excellent — no bloating, regular, comfortable' },
          { value: 3, label: 'Good — occasional minor issues' },
          { value: 2, label: 'Fair — bloating or irregularity is common' },
          { value: 1, label: 'Poor — frequent digestive discomfort' },
          { value: 0, label: 'Very poor — chronic digestive issues' },
        ],
      },
      {
        id: 'q7',
        text: 'How often do you exercise or engage in physical activity?',
        options: [
          { value: 4, label: '5+ times per week — mix of cardio and strength' },
          { value: 3, label: '3–4 times per week' },
          { value: 2, label: '1–2 times per week' },
          { value: 1, label: 'Occasionally — less than once a week' },
          { value: 0, label: 'Rarely or never' },
        ],
      },
      {
        id: 'q8',
        text: 'How would you describe your stress levels?',
        options: [
          { value: 4, label: 'Low — I have effective stress management tools' },
          { value: 3, label: 'Moderate — manageable most of the time' },
          { value: 2, label: 'Elevated — stress affects my daily life' },
          { value: 1, label: 'High — chronic stress is a significant issue' },
          { value: 0, label: 'Very high — overwhelmed most of the time' },
        ],
      },
      {
        id: 'q9',
        text: 'How is your mood stability throughout the day?',
        options: [
          { value: 4, label: 'Very stable — consistent mood' },
          { value: 3, label: 'Generally stable with minor fluctuations' },
          { value: 2, label: 'Moderate swings — irritable at times' },
          { value: 1, label: 'Significant swings — mood affects relationships' },
          { value: 0, label: 'Very unstable — mood is unpredictable' },
        ],
      },
      {
        id: 'q10',
        text: 'How is your hunger and appetite regulation?',
        options: [
          { value: 4, label: 'Excellent — I eat when hungry, stop when full' },
          { value: 3, label: 'Good — mostly in tune with hunger signals' },
          { value: 2, label: 'Fair — sometimes eat beyond fullness' },
          { value: 1, label: 'Poor — frequent cravings override hunger signals' },
          { value: 0, label: 'Very poor — I rarely feel satisfied' },
        ],
      },
      {
        id: 'q11',
        text: 'How would you rate your cardiovascular health markers (blood pressure, resting heart rate)?',
        options: [
          { value: 4, label: 'Excellent — all in optimal range' },
          { value: 3, label: 'Good — within normal range' },
          { value: 2, label: 'Fair — borderline in one area' },
          { value: 1, label: 'Poor — elevated in one or more areas' },
          { value: 0, label: "I don't know / haven't been tested" },
        ],
      },
      {
        id: 'q12',
        text: 'How often do you eat whole, unprocessed foods?',
        options: [
          { value: 4, label: 'Most meals — 80%+ whole foods' },
          { value: 3, label: 'Often — 60–80% whole foods' },
          { value: 2, label: 'Sometimes — 40–60% whole foods' },
          { value: 1, label: 'Rarely — mostly processed foods' },
          { value: 0, label: 'Almost never — highly processed diet' },
        ],
      },
    ],
    results: [
      {
        minScore: 0,
        maxScore: 18,
        title: 'Metabolic Recovery Needed',
        description: "Your metabolic health needs significant attention across multiple dimensions. This is not a judgment — it's information. Your body is communicating clearly, and the path forward is well-established. Small, consistent changes compound dramatically.",
        recommendations: [
          "Start with sleep — it's the foundation of metabolic recovery",
          'Reduce ultra-processed foods by 50% in the first 2 weeks',
          'Begin a daily 10-minute post-meal walk',
          'Consider functional medicine testing for baseline markers',
        ],
        articles: ['insulin-resistance-explained', 'sleep-blood-sugar', 'metabolic-syndrome-spectrum'],
      },
      {
        minScore: 19,
        maxScore: 30,
        title: 'Metabolic Rebuilding',
        description: 'You have some metabolic health challenges but also clear strengths to build on. Your body has significant capacity for recovery. Targeted interventions in your weakest areas will produce noticeable results within weeks.',
        recommendations: [
          'Identify your 2 weakest metabolic dimensions and focus there first',
          'Add strength training 2x per week to improve insulin sensitivity',
          'Optimize sleep quality with a consistent bedtime routine',
        ],
        articles: ['exercise-insulin-sensitivity', 'sleep-blood-sugar', 'stress-sugar-cravings'],
      },
      {
        minScore: 31,
        maxScore: 40,
        title: 'Metabolic Moderate',
        description: "Your metabolic health is in reasonable shape with room for meaningful optimization. You have good foundations — now it's about precision and dialing in the details that separate good from excellent.",
        recommendations: [
          'Consider wearing a CGM for 2 weeks to identify hidden glucose spikes',
          'Optimize meal timing and food order',
          'Add targeted supplements based on your specific gaps',
        ],
        articles: ['cgm-guide-beginners', 'food-order-glucose', 'magnesium-insulin-sensitivity'],
      },
      {
        minScore: 41,
        maxScore: 48,
        title: 'Metabolically Thriving',
        description: "Your metabolic health is excellent. You've built strong foundations across energy, sleep, inflammation, and body composition. Now you can focus on optimization and longevity — the advanced protocols that take good to extraordinary.",
        recommendations: [
          'Explore metabolic flexibility training',
          'Consider advanced longevity protocols',
          'Share your approach — your example helps others',
        ],
        articles: ['metabolic-syndrome-spectrum', 'berberine-blood-sugar', 'cgm-guide-beginners'],
      },
    ],
  },

  // ─── 4. Emotional Eating Assessment ─────────────────────────────────────────
  {
    slug: 'emotional-eating',
    title: 'Emotional Eating Assessment',
    description: 'Understand the emotional triggers behind your sugar cravings and how to address the root cause.',
    subtitle: '8 questions · 4 minutes · No judgment',
    icon: '💙',
    color: '#8E44AD',
    questions: [
      {
        id: 'q1',
        text: 'When you feel stressed, what is your most common response?',
        options: [
          { value: 0, label: "I don't typically reach for food when stressed" },
          { value: 1, label: 'I might have a small treat occasionally' },
          { value: 2, label: 'I often reach for comfort food when stressed' },
          { value: 3, label: 'Food is my primary stress relief tool' },
          { value: 4, label: "I eat compulsively when stressed — I can't stop" },
        ],
      },
      {
        id: 'q2',
        text: "Do you eat differently when you're alone vs. with others?",
        options: [
          { value: 0, label: "No difference — I eat the same either way" },
          { value: 1, label: "Slightly — I'm a bit more indulgent alone" },
          { value: 2, label: 'Noticeably — I eat more or differently when alone' },
          { value: 3, label: 'Significantly — I hide my eating from others' },
          { value: 4, label: 'Very differently — I binge when alone and restrict with others' },
        ],
      },
      {
        id: 'q3',
        text: 'How do you feel after eating emotionally (eating when not physically hungry)?',
        options: [
          { value: 0, label: "I don't eat emotionally" },
          { value: 1, label: "Fine — it's an occasional treat" },
          { value: 2, label: 'Slightly guilty but okay' },
          { value: 3, label: 'Significant guilt and shame' },
          { value: 4, label: 'Intense shame and self-criticism' },
        ],
      },
      {
        id: 'q4',
        text: 'Can you identify the emotional trigger before you reach for sugar?',
        options: [
          { value: 4, label: "Yes — I'm very aware of my emotional triggers" },
          { value: 3, label: 'Usually — I can identify them most of the time' },
          { value: 2, label: 'Sometimes — I notice after the fact' },
          { value: 1, label: "Rarely — I usually don't notice until I've eaten" },
          { value: 0, label: 'Never — I have no awareness of what triggers me' },
        ],
      },
      {
        id: 'q5',
        text: 'Do you use food as a reward for accomplishments or good behavior?',
        options: [
          { value: 0, label: "Never — I don't use food as a reward" },
          { value: 1, label: 'Occasionally for special achievements' },
          { value: 2, label: "Often — treats are how I celebrate" },
          { value: 3, label: "Frequently — food rewards are built into my daily routine" },
          { value: 4, label: "Always — I can't celebrate without food" },
        ],
      },
      {
        id: 'q6',
        text: 'How does boredom affect your eating?',
        options: [
          { value: 0, label: "Not at all — I don't eat when bored" },
          { value: 1, label: 'Occasionally I snack when bored' },
          { value: 2, label: 'Boredom is a common eating trigger for me' },
          { value: 3, label: 'I almost always eat when bored' },
          { value: 4, label: 'Boredom is my primary eating trigger' },
        ],
      },
      {
        id: 'q7',
        text: "When you're sad or grieving, what role does food play?",
        options: [
          { value: 0, label: "No role — I don't turn to food when sad" },
          { value: 1, label: 'Minor — occasionally comfort food helps' },
          { value: 2, label: "Moderate — food is part of how I cope with sadness" },
          { value: 3, label: "Significant — food is my main comfort when sad" },
          { value: 4, label: 'Primary — food is how I manage all difficult emotions' },
        ],
      },
      {
        id: 'q8',
        text: 'Have you ever eaten to the point of physical discomfort because of emotions?',
        options: [
          { value: 0, label: 'Never' },
          { value: 1, label: 'Once or twice in my life' },
          { value: 2, label: 'Occasionally — a few times a year' },
          { value: 3, label: 'Regularly — monthly or more' },
          { value: 4, label: 'Frequently — weekly or more' },
        ],
      },
    ],
    results: [
      {
        minScore: 0,
        maxScore: 8,
        title: 'Emotionally Grounded Eater',
        description: 'You have a healthy relationship between emotions and eating. You eat primarily for physical hunger and have good emotional regulation tools. Continue building your emotional intelligence toolkit.',
        recommendations: [
          'Maintain your current healthy emotional eating patterns',
          'Explore mindful eating to deepen your awareness',
          'Share your approach with others who struggle',
        ],
        articles: ['mindful-eating-glucose', 'emotional-eating-biology'],
      },
      {
        minScore: 9,
        maxScore: 16,
        title: 'Occasional Emotional Eater',
        description: 'You use food emotionally in some situations, particularly stress and boredom. This is very common and very addressable. Building a few alternative coping strategies will significantly reduce this pattern.',
        recommendations: [
          'Identify your top 3 emotional eating triggers',
          'Build a "craving interrupt" toolkit with 5 non-food alternatives',
          'Practice the HALT check before eating (Hungry, Angry, Lonely, Tired)',
        ],
        articles: ['emotional-eating-biology', 'stress-sugar-cravings', 'mindful-eating-glucose'],
      },
      {
        minScore: 17,
        maxScore: 24,
        title: 'Regular Emotional Eater',
        description: "Emotional eating is a significant pattern in your life. Food has become a primary emotional regulation tool, which is understandable — it works in the short term. The biology is clear, and so is the path forward.",
        recommendations: [
          'Begin a food-mood journal to map your emotional eating patterns',
          'Explore the trauma-food connection with a therapist or counselor',
          'Build a robust emotional regulation toolkit beyond food',
          'Consider somatic therapy or EFT tapping for emotional release',
        ],
        articles: ['emotional-eating-biology', 'stress-sugar-cravings', 'dopamine-sugar-reward'],
      },
      {
        minScore: 25,
        maxScore: 32,
        title: 'Deep Emotional Eating Pattern',
        description: "Food is deeply intertwined with your emotional life. This is not a character flaw — it's a learned survival strategy that once served you. With compassionate support and the right tools, this pattern can be transformed.",
        recommendations: [
          'Seek support from a therapist specializing in emotional eating or trauma',
          'Explore the ACE (Adverse Childhood Experiences) connection to food',
          'Begin with self-compassion practices before trying to change behavior',
          'Consider a structured emotional eating recovery program',
        ],
        articles: ['emotional-eating-biology', 'sugar-addiction-neuroscience', 'stress-sugar-cravings'],
      },
    ],
  },

  // ─── 5. Insulin Resistance Risk Assessment ───────────────────────────────────
  {
    slug: 'insulin-resistance-risk',
    title: 'Insulin Resistance Risk Assessment',
    description: 'Evaluate your risk factors for insulin resistance — the silent metabolic shift that precedes type 2 diabetes.',
    subtitle: '10 questions · 5 minutes · Know your risk',
    icon: '🔬',
    color: '#E67E22',
    questions: [
      {
        id: 'q1',
        text: 'Do you carry excess weight around your midsection (belly fat)?',
        options: [
          { value: 0, label: 'No — my waist is slim' },
          { value: 1, label: 'Slightly — minor belly fat' },
          { value: 2, label: 'Moderately — noticeable belly fat' },
          { value: 3, label: 'Significantly — substantial belly fat' },
          { value: 4, label: 'Yes — this is my primary weight storage area' },
        ],
      },
      {
        id: 'q2',
        text: 'Do you have a family history of type 2 diabetes?',
        options: [
          { value: 0, label: 'No family history' },
          { value: 1, label: 'Distant relatives (grandparents, aunts/uncles)' },
          { value: 2, label: 'One parent or sibling' },
          { value: 3, label: 'Both parents or multiple siblings' },
          { value: 4, label: 'Multiple generations affected' },
        ],
      },
      {
        id: 'q3',
        text: 'How often do you experience intense sugar or carb cravings?',
        options: [
          { value: 0, label: 'Rarely or never' },
          { value: 1, label: 'Occasionally' },
          { value: 2, label: 'Weekly' },
          { value: 3, label: 'Daily' },
          { value: 4, label: 'Multiple times per day' },
        ],
      },
      {
        id: 'q4',
        text: 'Do you experience fatigue, especially after meals?',
        options: [
          { value: 0, label: 'Never — I feel energized after eating' },
          { value: 1, label: 'Occasionally — mild tiredness' },
          { value: 2, label: 'Often — post-meal fatigue is common' },
          { value: 3, label: 'Almost always — I need to rest after meals' },
          { value: 4, label: 'Always — severe post-meal fatigue' },
        ],
      },
      {
        id: 'q5',
        text: 'Do you have high blood pressure or have you been told your blood pressure is elevated?',
        options: [
          { value: 0, label: 'No — blood pressure is optimal' },
          { value: 1, label: 'Normal but on the higher end' },
          { value: 2, label: 'Prehypertension (120-139/80-89)' },
          { value: 3, label: 'Stage 1 hypertension (140-159/90-99)' },
          { value: 4, label: 'Stage 2 hypertension or on medication' },
        ],
      },
      {
        id: 'q6',
        text: 'How would you describe your physical activity level?',
        options: [
          { value: 0, label: 'Very active — strength training + cardio 5+ days/week' },
          { value: 1, label: 'Active — exercise 3–4 days/week' },
          { value: 2, label: 'Moderately active — 1–2 days/week' },
          { value: 3, label: 'Lightly active — mostly sedentary with some walking' },
          { value: 4, label: 'Sedentary — little to no regular exercise' },
        ],
      },
      {
        id: 'q7',
        text: 'Do you have dark patches of skin in skin folds (neck, armpits, groin) — a condition called acanthosis nigricans?',
        options: [
          { value: 0, label: 'No' },
          { value: 2, label: "I'm not sure" },
          { value: 4, label: 'Yes — I have noticed dark patches in skin folds' },
        ],
      },
      {
        id: 'q8',
        text: 'Have you been diagnosed with or do you have symptoms of PCOS (polycystic ovary syndrome)?',
        options: [
          { value: 0, label: 'No / Not applicable' },
          { value: 2, label: 'Possible symptoms but no diagnosis' },
          { value: 4, label: 'Yes — diagnosed with PCOS' },
        ],
      },
      {
        id: 'q9',
        text: 'What are your triglyceride levels (from blood work)?',
        options: [
          { value: 0, label: 'Optimal (under 100 mg/dL)' },
          { value: 1, label: 'Normal (100-149 mg/dL)' },
          { value: 2, label: 'Borderline high (150-199 mg/dL)' },
          { value: 3, label: 'High (200-499 mg/dL)' },
          { value: 4, label: 'Very high (500+ mg/dL) or unknown' },
        ],
      },
      {
        id: 'q10',
        text: 'How would you describe your diet?',
        options: [
          { value: 0, label: 'Whole foods, low sugar, high protein and fat' },
          { value: 1, label: 'Mostly whole foods with occasional processed' },
          { value: 2, label: 'Mixed — some whole foods, some processed' },
          { value: 3, label: 'Mostly processed foods with some whole foods' },
          { value: 4, label: 'Highly processed — fast food, packaged foods, high sugar' },
        ],
      },
    ],
    results: [
      {
        minScore: 0,
        maxScore: 10,
        title: 'Low Insulin Resistance Risk',
        description: 'Your risk factors for insulin resistance are low. You have strong metabolic foundations. Continue your current approach and consider periodic monitoring to stay ahead of any changes.',
        recommendations: [
          'Continue your current healthy lifestyle',
          'Consider annual fasting insulin and HbA1c testing',
          "Maintain your exercise routine — it's your best insulin sensitizer",
        ],
        articles: ['insulin-resistance-explained', 'exercise-insulin-sensitivity'],
      },
      {
        minScore: 11,
        maxScore: 20,
        title: 'Moderate Insulin Resistance Risk',
        description: 'You have some risk factors for insulin resistance. This is a critical window — the changes you make now can prevent progression. Your body is sending early signals that deserve attention.',
        recommendations: [
          'Get a fasting insulin test and HbA1c from your doctor',
          'Add strength training 3x per week',
          'Reduce refined carbohydrates and added sugar',
          'Consider berberine or magnesium supplementation',
        ],
        articles: ['insulin-resistance-explained', 'berberine-blood-sugar', 'exercise-insulin-sensitivity'],
      },
      {
        minScore: 21,
        maxScore: 30,
        title: 'Elevated Insulin Resistance Risk',
        description: "You have multiple significant risk factors for insulin resistance. It's important to get tested and take action now. Insulin resistance is highly reversible with the right interventions — but the window matters.",
        recommendations: [
          'Get comprehensive metabolic testing (fasting insulin, HbA1c, triglycerides, HDL)',
          'Consider working with a functional medicine doctor',
          'Begin a structured low-sugar, high-protein dietary protocol',
          'Add daily movement — especially post-meal walks',
        ],
        articles: ['insulin-resistance-explained', 'metabolic-syndrome-spectrum', 'berberine-blood-sugar'],
      },
      {
        minScore: 31,
        maxScore: 40,
        title: 'High Insulin Resistance Risk',
        description: 'You have numerous significant risk factors for insulin resistance or may already have it. Please get tested. The good news: insulin resistance is one of the most reversible metabolic conditions with the right protocol.',
        recommendations: [
          'See a doctor for comprehensive metabolic testing immediately',
          'Begin a structured dietary intervention (low-carb or Mediterranean)',
          'Add daily exercise — even walking significantly improves insulin sensitivity',
          'Consider berberine, magnesium, and alpha-lipoic acid under medical guidance',
        ],
        articles: ['insulin-resistance-explained', 'metabolic-syndrome-spectrum', 'berberine-blood-sugar', 'exercise-insulin-sensitivity'],
      },
    ],
  },

  // ─── 6. Gut Health & Sugar Assessment ───────────────────────────────────────
  {
    slug: 'gut-health-sugar',
    title: 'Gut Health & Sugar Assessment',
    description: 'Discover how sugar is affecting your gut microbiome, digestion, and the gut-brain axis.',
    subtitle: '8 questions · 4 minutes · Gut intelligence',
    icon: '🌿',
    color: '#16A085',
    questions: [
      {
        id: 'q1',
        text: 'How often do you experience bloating, gas, or abdominal discomfort?',
        options: [
          { value: 0, label: 'Rarely or never' },
          { value: 1, label: 'Occasionally — once a week or less' },
          { value: 2, label: 'Weekly — 2–3 times per week' },
          { value: 3, label: 'Daily' },
          { value: 4, label: 'After almost every meal' },
        ],
      },
      {
        id: 'q2',
        text: 'How would you describe your bowel regularity?',
        options: [
          { value: 0, label: 'Very regular — 1–2 times daily, well-formed' },
          { value: 1, label: 'Regular — daily with occasional variation' },
          { value: 2, label: 'Irregular — every 2–3 days' },
          { value: 3, label: 'Constipated — less than 3 times per week' },
          { value: 4, label: 'Alternating constipation and diarrhea' },
        ],
      },
      {
        id: 'q3',
        text: 'Do you experience strong cravings for sweet or starchy foods?',
        options: [
          { value: 0, label: 'Rarely — my cravings are minimal' },
          { value: 1, label: 'Occasionally' },
          { value: 2, label: 'Regularly — especially in the afternoon' },
          { value: 3, label: 'Daily and strong' },
          { value: 4, label: 'Constant and overwhelming' },
        ],
      },
      {
        id: 'q4',
        text: 'How much fermented food do you eat (yogurt, kefir, kimchi, sauerkraut, kombucha)?',
        options: [
          { value: 4, label: 'Daily — fermented foods are a regular part of my diet' },
          { value: 3, label: 'Several times a week' },
          { value: 2, label: 'Occasionally — once a week or less' },
          { value: 1, label: 'Rarely' },
          { value: 0, label: 'Never' },
        ],
      },
      {
        id: 'q5',
        text: 'Have you taken antibiotics in the past 2 years?',
        options: [
          { value: 0, label: 'No' },
          { value: 1, label: 'Once, more than 1 year ago' },
          { value: 2, label: 'Once in the past year' },
          { value: 3, label: 'Multiple courses in the past year' },
          { value: 4, label: 'Frequent antibiotic use' },
        ],
      },
      {
        id: 'q6',
        text: 'How much dietary fiber do you consume daily?',
        options: [
          { value: 4, label: 'High — lots of vegetables, legumes, whole grains (25g+)' },
          { value: 3, label: 'Moderate — some vegetables and whole foods (15–25g)' },
          { value: 2, label: 'Low — mostly processed foods with some vegetables (8–15g)' },
          { value: 1, label: 'Very low — highly processed diet (under 8g)' },
          { value: 0, label: 'Minimal — almost no fiber-rich foods' },
        ],
      },
      {
        id: 'q7',
        text: 'Do you experience mood changes, anxiety, or depression that seem connected to what you eat?',
        options: [
          { value: 0, label: "No — my mood is stable regardless of food" },
          { value: 1, label: 'Occasionally — minor mood shifts after certain foods' },
          { value: 2, label: 'Sometimes — I notice food-mood connections' },
          { value: 3, label: 'Often — my mood is significantly affected by food' },
          { value: 4, label: 'Always — food is a major driver of my mood' },
        ],
      },
      {
        id: 'q8',
        text: 'Do you experience symptoms that might indicate candida overgrowth (thrush, yeast infections, white tongue, intense sugar cravings, fatigue)?',
        options: [
          { value: 0, label: 'None of these symptoms' },
          { value: 1, label: 'One symptom occasionally' },
          { value: 2, label: 'One or two symptoms regularly' },
          { value: 3, label: 'Multiple symptoms regularly' },
          { value: 4, label: 'Many of these symptoms — this sounds like me' },
        ],
      },
    ],
    results: [
      {
        minScore: 0,
        maxScore: 10,
        title: 'Gut Resilient',
        description: 'Your gut health appears strong. You have good microbial diversity indicators and minimal sugar-gut disruption. Continue supporting your microbiome with fiber and fermented foods.',
        recommendations: [
          'Maintain your fiber and fermented food intake',
          'Consider a probiotic supplement for additional support',
          'Continue limiting processed sugar',
        ],
        articles: ['gut-microbiome-sugar', 'fructose-liver-damage'],
      },
      {
        minScore: 11,
        maxScore: 20,
        title: 'Gut Rebuilding',
        description: 'Your gut health has some areas that need attention. Sugar and processed foods are likely disrupting your microbiome diversity. The gut is highly responsive to dietary changes.',
        recommendations: [
          'Increase dietary fiber to 25–35g per day',
          'Add 1–2 servings of fermented foods daily',
          'Reduce added sugar and ultra-processed foods',
          'Consider a high-quality probiotic',
        ],
        articles: ['gut-microbiome-sugar', 'fructose-liver-damage', 'how-to-quit-sugar'],
      },
      {
        minScore: 21,
        maxScore: 32,
        title: 'Gut Disrupted',
        description: 'Your gut health shows significant signs of disruption — likely from sugar, processed foods, antibiotics, or a combination. This is affecting not just digestion but your mood, energy, and cravings through the gut-brain axis.',
        recommendations: [
          'Begin a 30-day gut healing protocol: eliminate sugar, add fiber and fermented foods',
          'Consider a comprehensive probiotic and prebiotic protocol',
          'Address potential candida overgrowth with your doctor',
          'Explore the gut-brain connection — your cravings may be microbiome-driven',
        ],
        articles: ['gut-microbiome-sugar', 'fructose-liver-damage', 'sugar-addiction-neuroscience'],
      },
    ],
  },

  // ─── 7. Sleep & Blood Sugar Assessment ──────────────────────────────────────
  {
    slug: 'sleep-blood-sugar',
    title: 'Sleep & Blood Sugar Assessment',
    description: 'Explore the bidirectional relationship between your sleep quality and blood sugar stability.',
    subtitle: '8 questions · 4 minutes · Sleep intelligence',
    icon: '🌙',
    color: '#2C3E50',
    questions: [
      {
        id: 'q1',
        text: 'How many hours of sleep do you typically get per night?',
        options: [
          { value: 4, label: '7–9 hours — the optimal range' },
          { value: 3, label: '6–7 hours — slightly below optimal' },
          { value: 2, label: '5–6 hours — noticeably sleep deprived' },
          { value: 1, label: 'Under 5 hours — significantly sleep deprived' },
          { value: 0, label: 'Highly variable — no consistent sleep schedule' },
        ],
      },
      {
        id: 'q2',
        text: 'How would you rate your sleep quality?',
        options: [
          { value: 4, label: 'Excellent — deep, restorative, wake refreshed' },
          { value: 3, label: 'Good — mostly restful with occasional disturbances' },
          { value: 2, label: 'Fair — light sleep, sometimes wake during the night' },
          { value: 1, label: 'Poor — frequent waking, unrefreshing sleep' },
          { value: 0, label: 'Very poor — chronic insomnia or sleep disorder' },
        ],
      },
      {
        id: 'q3',
        text: 'Do you wake up in the middle of the night hungry or craving sweet foods?',
        options: [
          { value: 0, label: 'Never' },
          { value: 1, label: 'Occasionally — once a month or less' },
          { value: 2, label: 'Sometimes — a few times a month' },
          { value: 3, label: 'Often — weekly' },
          { value: 4, label: 'Almost nightly' },
        ],
      },
      {
        id: 'q4',
        text: 'Do you eat within 2 hours of bedtime?',
        options: [
          { value: 0, label: 'Never — I stop eating 3+ hours before bed' },
          { value: 1, label: 'Occasionally — once a week or less' },
          { value: 2, label: 'Sometimes — a few times a week' },
          { value: 3, label: 'Often — most nights' },
          { value: 4, label: 'Always — I eat right before bed' },
        ],
      },
      {
        id: 'q5',
        text: 'Do you experience sugar or carb cravings the day after poor sleep?',
        options: [
          { value: 0, label: "No — poor sleep doesn't affect my cravings" },
          { value: 1, label: 'Slightly — minor increase in appetite' },
          { value: 2, label: 'Noticeably — I want more carbs after bad sleep' },
          { value: 3, label: 'Significantly — poor sleep drives strong sugar cravings' },
          { value: 4, label: "Severely — I can't resist sugar after poor sleep" },
        ],
      },
      {
        id: 'q6',
        text: 'Do you use screens (phone, TV, computer) in the hour before bed?',
        options: [
          { value: 0, label: 'Never — I have a screen-free wind-down routine' },
          { value: 1, label: 'Rarely — occasional screen use before bed' },
          { value: 2, label: 'Sometimes — a few nights a week' },
          { value: 3, label: 'Often — most nights' },
          { value: 4, label: 'Always — screens are part of my bedtime routine' },
        ],
      },
      {
        id: 'q7',
        text: 'Do you consume caffeine after 2pm?',
        options: [
          { value: 0, label: 'Never — I cut off caffeine by noon' },
          { value: 1, label: 'Rarely — occasional afternoon coffee' },
          { value: 2, label: 'Sometimes — 2–4pm coffee a few times a week' },
          { value: 3, label: 'Often — daily afternoon or evening caffeine' },
          { value: 4, label: 'Always — caffeine throughout the day including evenings' },
        ],
      },
      {
        id: 'q8',
        text: 'How consistent is your sleep schedule (bedtime and wake time)?',
        options: [
          { value: 4, label: 'Very consistent — same time every day including weekends' },
          { value: 3, label: 'Mostly consistent — minor variation on weekends' },
          { value: 2, label: 'Somewhat consistent — 1–2 hour variation' },
          { value: 1, label: 'Inconsistent — 2–4 hour variation' },
          { value: 0, label: 'No schedule — completely variable' },
        ],
      },
    ],
    results: [
      {
        minScore: 0,
        maxScore: 10,
        title: 'Sleep-Glucose Disrupted',
        description: 'Your sleep patterns are significantly disrupting your blood sugar regulation. Poor sleep raises cortisol, increases ghrelin (hunger hormone), and reduces insulin sensitivity — creating a perfect storm for sugar cravings and metabolic dysfunction.',
        recommendations: [
          'Prioritize sleep as a metabolic intervention — it\'s as important as diet',
          'Create a screen-free 60-minute wind-down routine',
          'Stop eating 3 hours before bed',
          'Consider magnesium glycinate for sleep quality',
        ],
        articles: ['sleep-blood-sugar', 'stress-sugar-cravings', 'magnesium-insulin-sensitivity'],
      },
      {
        minScore: 11,
        maxScore: 20,
        title: 'Sleep-Glucose Improving',
        description: 'Your sleep has some areas affecting your blood sugar. You have a foundation to build on. Small improvements in sleep hygiene will have disproportionate benefits for your glucose stability and cravings.',
        recommendations: [
          'Establish a consistent sleep and wake time',
          'Reduce screen exposure 1 hour before bed',
          'Avoid eating within 2 hours of bedtime',
        ],
        articles: ['sleep-blood-sugar', 'stress-sugar-cravings'],
      },
      {
        minScore: 21,
        maxScore: 32,
        title: 'Sleep-Glucose Aligned',
        description: 'Your sleep patterns are supporting your blood sugar stability. You have good sleep hygiene and your circadian rhythm is working with your metabolic health. Fine-tune the remaining areas for optimal glucose regulation.',
        recommendations: [
          'Continue your excellent sleep habits',
          'Consider tracking sleep with a wearable to optimize further',
          'Explore the dawn phenomenon if you notice morning glucose elevation',
        ],
        articles: ['sleep-blood-sugar', 'glucose-crash-cycle'],
      },
    ],
  },

  // ─── 8. Stress & Cortisol Assessment ────────────────────────────────────────
  {
    slug: 'stress-cortisol',
    title: 'Stress & Cortisol Assessment',
    description: 'Understand how chronic stress and cortisol are driving your sugar cravings and metabolic dysfunction.',
    subtitle: '8 questions · 4 minutes · Stress intelligence',
    icon: '🧠',
    color: '#E74C3C',
    questions: [
      {
        id: 'q1',
        text: 'How would you rate your overall stress level?',
        options: [
          { value: 0, label: 'Low — I feel calm and in control most of the time' },
          { value: 1, label: 'Mild — manageable stress with good coping' },
          { value: 2, label: 'Moderate — stress is a regular presence' },
          { value: 3, label: 'High — chronic stress affects my daily functioning' },
          { value: 4, label: 'Severe — I feel overwhelmed most of the time' },
        ],
      },
      {
        id: 'q2',
        text: 'Do you experience sugar or carb cravings when stressed?',
        options: [
          { value: 0, label: "Never — stress doesn't affect my food choices" },
          { value: 1, label: 'Occasionally — minor increase in sweet cravings' },
          { value: 2, label: 'Often — stress reliably triggers sugar cravings' },
          { value: 3, label: 'Almost always — stress and sugar cravings are linked' },
          { value: 4, label: 'Always — sugar is my primary stress response' },
        ],
      },
      {
        id: 'q3',
        text: 'Do you have a regular stress management practice (meditation, exercise, therapy, nature)?',
        options: [
          { value: 4, label: 'Yes — daily practice, multiple tools' },
          { value: 3, label: 'Yes — a few times a week' },
          { value: 2, label: "Occasionally — when things get bad" },
          { value: 1, label: "Rarely — I know I should but don't" },
          { value: 0, label: "No — I don't have stress management tools" },
        ],
      },
      {
        id: 'q4',
        text: 'Do you experience physical symptoms of stress (tight shoulders, jaw clenching, headaches, digestive issues)?',
        options: [
          { value: 0, label: 'Rarely or never' },
          { value: 1, label: 'Occasionally' },
          { value: 2, label: 'Weekly' },
          { value: 3, label: 'Daily' },
          { value: 4, label: 'Constant physical stress symptoms' },
        ],
      },
      {
        id: 'q5',
        text: "How does your appetite change when you're stressed?",
        options: [
          { value: 0, label: "No change — I eat the same when stressed" },
          { value: 1, label: 'Slightly increased appetite for comfort foods' },
          { value: 2, label: 'Noticeably increased — I eat more when stressed' },
          { value: 3, label: 'Significantly increased — stress eating is a pattern' },
          { value: 4, label: "I either binge or can't eat at all when stressed" },
        ],
      },
      {
        id: 'q6',
        text: 'Do you experience "wired but tired" — feeling exhausted but unable to relax or sleep?',
        options: [
          { value: 0, label: 'Never' },
          { value: 1, label: 'Occasionally' },
          { value: 2, label: 'Sometimes' },
          { value: 3, label: "Often — this is my default state" },
          { value: 4, label: "Always — I can't remember feeling any other way" },
        ],
      },
      {
        id: 'q7',
        text: 'Do you have work-life boundaries that protect your recovery time?',
        options: [
          { value: 4, label: 'Strong boundaries — I protect my downtime fiercely' },
          { value: 3, label: 'Good boundaries — mostly protected' },
          { value: 2, label: "Weak boundaries — work often bleeds into personal time" },
          { value: 1, label: "Poor boundaries — I'm always \"on\"" },
          { value: 0, label: 'No boundaries — I work constantly and feel guilty resting' },
        ],
      },
      {
        id: 'q8',
        text: 'How often do you spend time in nature, doing creative activities, or in genuine rest?',
        options: [
          { value: 4, label: 'Daily — rest and recovery are non-negotiable' },
          { value: 3, label: 'Several times a week' },
          { value: 2, label: 'Weekly' },
          { value: 1, label: 'Rarely — I feel guilty resting' },
          { value: 0, label: "Never — I don't have time or it doesn't feel okay" },
        ],
      },
    ],
    results: [
      {
        minScore: 0,
        maxScore: 10,
        title: 'High Cortisol-Sugar Risk',
        description: 'Chronic stress is significantly driving your sugar cravings and metabolic dysfunction. Cortisol raises blood sugar, increases appetite for sweet foods, and promotes fat storage around the belly. Stress management is metabolic medicine.',
        recommendations: [
          'Treat stress management as a metabolic intervention — not a luxury',
          'Begin a daily 10-minute meditation or breathwork practice',
          'Establish firm work-life boundaries',
          'Consider adaptogenic herbs: ashwagandha, rhodiola, holy basil',
        ],
        articles: ['stress-sugar-cravings', 'emotional-eating-biology', 'sleep-blood-sugar'],
      },
      {
        minScore: 11,
        maxScore: 20,
        title: 'Moderate Cortisol-Sugar Connection',
        description: 'Stress is a meaningful factor in your sugar cravings and metabolic health. You have some coping tools but they need strengthening. Building a more robust stress management practice will directly improve your glucose stability.',
        recommendations: [
          'Add a consistent daily stress management practice',
          'Explore adaptogenic herbs for HPA axis support',
          "Protect your sleep — it's your cortisol reset button",
        ],
        articles: ['stress-sugar-cravings', 'sleep-blood-sugar'],
      },
      {
        minScore: 21,
        maxScore: 32,
        title: 'Stress-Resilient',
        description: 'You have good stress management and your cortisol-glucose connection is relatively healthy. Continue building your resilience toolkit and maintaining the boundaries that protect your metabolic health.',
        recommendations: [
          'Continue your excellent stress management practices',
          'Explore advanced resilience tools: HRV training, cold exposure',
          'Share your approach — your example helps others',
        ],
        articles: ['stress-sugar-cravings', 'exercise-insulin-sensitivity'],
      },
    ],
  },

  // ─── 9. Family & Children Sugar Habits ──────────────────────────────────────
  {
    slug: 'family-sugar-habits',
    title: 'Family & Children Sugar Habits',
    description: "Assess the sugar environment in your home and how it's affecting your children's metabolic health and relationship with food.",
    subtitle: '8 questions · 4 minutes · Family health',
    icon: '👨‍👩‍👧',
    color: '#F39C12',
    questions: [
      {
        id: 'q1',
        text: 'How much added sugar do children in your household consume daily?',
        options: [
          { value: 0, label: 'Very little — we limit added sugar strictly' },
          { value: 1, label: 'Moderate — occasional treats, mostly whole foods' },
          { value: 2, label: 'Regular — daily sugary snacks or drinks' },
          { value: 3, label: 'High — multiple sugary items per day' },
          { value: 4, label: 'Very high — sugar is a major part of their diet' },
        ],
      },
      {
        id: 'q2',
        text: 'Do you use sugar as a reward for good behavior or accomplishments?',
        options: [
          { value: 0, label: 'Never — we use non-food rewards' },
          { value: 1, label: 'Rarely — only for very special occasions' },
          { value: 2, label: 'Sometimes — treats are a common reward' },
          { value: 3, label: 'Often — sugar rewards are a regular parenting tool' },
          { value: 4, label: 'Always — sugar is our primary reward system' },
        ],
      },
      {
        id: 'q3',
        text: 'What beverages do children in your household primarily drink?',
        options: [
          { value: 0, label: 'Water and plain milk — no sugary drinks' },
          { value: 1, label: 'Mostly water with occasional juice or flavored drinks' },
          { value: 2, label: 'Mix of water, juice, and some soda' },
          { value: 3, label: 'Regular juice, sports drinks, or flavored milk' },
          { value: 4, label: 'Soda, juice, or sweetened drinks are the primary beverages' },
        ],
      },
      {
        id: 'q4',
        text: 'How often do children in your household eat breakfast?',
        options: [
          { value: 4, label: 'Daily — protein-rich, low-sugar breakfast' },
          { value: 3, label: 'Most days — varies in quality' },
          { value: 2, label: 'Sometimes — often skipped or sugary cereal' },
          { value: 1, label: 'Rarely — usually skip breakfast' },
          { value: 0, label: 'Never — no breakfast routine' },
        ],
      },
      {
        id: 'q5',
        text: 'Do children in your household show signs of sugar dependency (tantrums when denied sugar, intense cravings, energy crashes)?',
        options: [
          { value: 0, label: 'No signs — they accept limits without issue' },
          { value: 1, label: 'Minor — occasional resistance to sugar limits' },
          { value: 2, label: 'Moderate — regular tantrums or strong protests' },
          { value: 3, label: 'Significant — sugar refusal causes major behavior issues' },
          { value: 4, label: 'Severe — sugar is a major behavioral and emotional issue' },
        ],
      },
      {
        id: 'q6',
        text: 'How much processed or packaged food do children in your household eat?',
        options: [
          { value: 0, label: 'Very little — mostly whole, home-cooked foods' },
          { value: 1, label: 'Some — occasional packaged snacks' },
          { value: 2, label: 'Regular — packaged snacks are a daily staple' },
          { value: 3, label: 'High — mostly packaged and processed foods' },
          { value: 4, label: 'Almost entirely processed — whole foods are rare' },
        ],
      },
      {
        id: 'q7',
        text: 'Do you talk openly with children about nutrition, sugar, and how food affects their body and mood?',
        options: [
          { value: 4, label: 'Yes — regular, age-appropriate nutrition conversations' },
          { value: 3, label: 'Sometimes — occasional conversations about food' },
          { value: 2, label: "Rarely — we don't discuss nutrition much" },
          { value: 1, label: "Never — food is just food in our house" },
          { value: 0, label: "No — and I'm not sure how to approach it" },
        ],
      },
      {
        id: 'q8',
        text: 'Do children in your household have access to sugar freely (candy bowls, unlimited snacks)?',
        options: [
          { value: 0, label: 'No — sugar is a structured, occasional treat' },
          { value: 1, label: 'Limited — treats are available but controlled' },
          { value: 2, label: 'Moderate — some free access to snacks' },
          { value: 3, label: 'High — candy and sugary snacks are always available' },
          { value: 4, label: 'Unlimited — children can access sugar freely anytime' },
        ],
      },
    ],
    results: [
      {
        minScore: 0,
        maxScore: 10,
        title: 'High Sugar Home Environment',
        description: "Your home environment has significant sugar exposure for children. Early sugar conditioning shapes lifelong eating patterns and metabolic health. The good news: children's brains and taste preferences are highly adaptable with consistent, compassionate change.",
        recommendations: [
          'Begin gradually reducing sugary beverages — replace with water and sparkling water',
          'Introduce non-food rewards for behavior and achievements',
          'Make whole food snacks more accessible than sugary ones',
          'Have age-appropriate conversations about how sugar affects energy and mood',
        ],
        articles: ['children-sugar-addiction', 'hidden-sugars-guide', 'dopamine-sugar-reward'],
      },
      {
        minScore: 11,
        maxScore: 20,
        title: 'Moderate Sugar Home Environment',
        description: "Your home has some sugar management in place but there's room for meaningful improvement. Small, consistent changes in the home food environment have outsized effects on children's long-term metabolic health.",
        recommendations: [
          'Audit your home for hidden sugars in "healthy" foods',
          'Strengthen the breakfast routine with protein-rich options',
          'Expand nutrition conversations with your children',
        ],
        articles: ['children-sugar-addiction', 'hidden-sugars-guide'],
      },
      {
        minScore: 21,
        maxScore: 32,
        title: 'Healthy Sugar Home Environment',
        description: "You're creating a healthy relationship with food for the children in your household. Your approach to sugar is balanced, educational, and supportive of long-term metabolic health. Continue building on this strong foundation.",
        recommendations: [
          'Continue your excellent approach to family nutrition',
          'Deepen nutrition education with age-appropriate resources',
          'Consider involving children in meal preparation',
        ],
        articles: ['children-sugar-addiction', 'hidden-sugars-guide'],
      },
    ],
  },
];

export default ASSESSMENTS;
