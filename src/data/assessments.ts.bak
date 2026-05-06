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
  questions: AssessmentQuestion[];
  results: AssessmentResult[];
}

export const ASSESSMENTS: Assessment[] = [
  {
    slug: 'sugar-dependency',
    title: 'Sugar Dependency Assessment',
    description: 'Discover how dependent your brain and body are on sugar — and what to do about it.',
    subtitle: '10 questions · 5 minutes · No email required',
    questions: [
      {
        id: 'q1',
        text: 'How often do you experience strong cravings for sweet foods or drinks?',
        options: [
          { value: 0, label: 'Rarely or never' },
          { value: 1, label: 'A few times a week' },
          { value: 2, label: 'Daily' },
          { value: 3, label: 'Multiple times per day' },
        ],
      },
      {
        id: 'q2',
        text: 'When you try to cut back on sugar, do you experience symptoms like headaches, irritability, fatigue, or brain fog?',
        options: [
          { value: 0, label: 'No, I feel fine' },
          { value: 1, label: 'Mild discomfort for a day or two' },
          { value: 2, label: 'Noticeable symptoms lasting several days' },
          { value: 3, label: 'Significant symptoms that make it hard to function' },
        ],
      },
      {
        id: 'q3',
        text: 'How often do you eat or drink something sweet even when you\'re not hungry?',
        options: [
          { value: 0, label: 'Almost never' },
          { value: 1, label: 'Occasionally' },
          { value: 2, label: 'Often' },
          { value: 3, label: 'Very frequently — it\'s almost automatic' },
        ],
      },
      {
        id: 'q4',
        text: 'Do you experience energy crashes (feeling suddenly tired, foggy, or irritable) 1-3 hours after eating?',
        options: [
          { value: 0, label: 'No, my energy is fairly stable' },
          { value: 1, label: 'Occasionally' },
          { value: 2, label: 'Frequently' },
          { value: 3, label: 'Almost every day — it\'s my normal' },
        ],
      },
      {
        id: 'q5',
        text: 'When you eat something sweet, do you find it hard to stop at a small amount?',
        options: [
          { value: 0, label: 'No, I can have a little and stop' },
          { value: 1, label: 'Sometimes I eat more than I intended' },
          { value: 2, label: 'Often — one leads to many' },
          { value: 3, label: 'Almost always — I eat until it\'s gone' },
        ],
      },
      {
        id: 'q6',
        text: 'How often do you use sweet foods or drinks to manage your mood, stress, or emotions?',
        options: [
          { value: 0, label: 'I don\'t use food for emotional regulation' },
          { value: 1, label: 'Occasionally when stressed' },
          { value: 2, label: 'Regularly — it\'s a go-to comfort' },
          { value: 3, label: 'It\'s my primary way of coping with difficult emotions' },
        ],
      },
      {
        id: 'q7',
        text: 'Do you think about food — especially sweet or high-carb foods — frequently throughout the day?',
        options: [
          { value: 0, label: 'Rarely — I eat when hungry and move on' },
          { value: 1, label: 'Sometimes' },
          { value: 2, label: 'Often — food thoughts are a regular distraction' },
          { value: 3, label: 'Constantly — it\'s hard to focus on other things' },
        ],
      },
      {
        id: 'q8',
        text: 'How do you feel when you wake up in the morning before eating?',
        options: [
          { value: 0, label: 'Energized and clear-headed' },
          { value: 1, label: 'Fine but a bit slow to start' },
          { value: 2, label: 'Foggy and in need of something sweet or caffeinated' },
          { value: 3, label: 'Terrible — I need sugar or caffeine immediately to function' },
        ],
      },
      {
        id: 'q9',
        text: 'Have you ever tried to significantly reduce your sugar intake and failed to maintain it beyond a week?',
        options: [
          { value: 0, label: 'I\'ve never needed to — or I succeeded easily' },
          { value: 1, label: 'I\'ve struggled but managed for a few weeks' },
          { value: 2, label: 'I\'ve tried multiple times and reverted within days' },
          { value: 3, label: 'Every attempt has failed within 24-48 hours' },
        ],
      },
      {
        id: 'q10',
        text: 'How would you describe your relationship with sugar overall?',
        options: [
          { value: 0, label: 'Neutral — it\'s just food' },
          { value: 1, label: 'I enjoy it but feel in control' },
          { value: 2, label: 'It\'s a struggle — I want to eat less but can\'t seem to' },
          { value: 3, label: 'It feels like an addiction — I feel out of control around it' },
        ],
      },
    ],
    results: [
      {
        minScore: 0,
        maxScore: 7,
        title: 'Low Sugar Dependency',
        description: 'Your relationship with sugar appears to be relatively balanced. You may enjoy sweet foods occasionally but don\'t show strong signs of physiological or psychological dependency. Your glucose regulation is likely functioning reasonably well.',
        recommendations: [
          'Continue eating whole foods with fiber, fat, and protein to maintain stable glucose',
          'Stay aware of hidden sugars in processed foods and beverages',
          'Consider reading about glucose science to understand how to maintain your current balance',
          'A continuous glucose monitor (CGM) for 2 weeks can be illuminating even at this level',
        ],
        articles: ['what-is-sugar-addiction', 'glucose-spikes-explained', 'vinegar-hack-glucose'],
      },
      {
        minScore: 8,
        maxScore: 15,
        title: 'Moderate Sugar Dependency',
        description: 'You show meaningful signs of sugar dependency — particularly around cravings, energy crashes, and difficulty stopping once you start. Your dopamine system has likely adapted to regular sugar input, making moderation genuinely difficult (not a character flaw).',
        recommendations: [
          'Start with the "savory breakfast" protocol to break the morning glucose spike cycle',
          'Try the vinegar hack before meals to blunt glucose spikes',
          'Experiment with eating vegetables before carbohydrates at meals',
          'Track your energy levels for one week to identify your personal crash patterns',
          'Consider a 10-day sugar reduction experiment — not elimination, just reduction',
        ],
        articles: ['dopamine-sugar-reward', 'savory-breakfast-protocol', 'glucose-crash-cycle', 'vinegar-hack-glucose'],
      },
      {
        minScore: 16,
        maxScore: 22,
        title: 'High Sugar Dependency',
        description: 'Your scores indicate significant sugar dependency with clear neurological and metabolic patterns. The cravings, crashes, emotional eating, and failed reduction attempts are not about willpower — they reflect real changes in your dopamine and insulin systems. This is biology, not character.',
        recommendations: [
          'Read about the neuroscience of sugar addiction before attempting any change',
          'Start with the "clothing test" — add fiber, fat, and protein before reducing sugar',
          'Avoid cold-turkey approaches; they trigger stronger withdrawal and rebound',
          'Focus on glucose flattening strategies rather than sugar elimination initially',
          'Consider working with a functional medicine practitioner',
          'Track sleep — poor sleep dramatically increases sugar cravings',
        ],
        articles: ['sugar-addiction-neuroscience', 'dopamine-sugar-reward', 'how-to-quit-sugar', 'insulin-resistance-explained', 'sleep-blood-sugar'],
      },
      {
        minScore: 23,
        maxScore: 30,
        title: 'Severe Sugar Dependency',
        description: 'Your responses indicate severe sugar dependency with significant impact on daily functioning, mood, and energy. This level of dependency involves deep neurological adaptation — your brain\'s reward system has fundamentally reorganized around sugar input. The good news: this is completely reversible. But it requires understanding the mechanism, not fighting willpower.',
        recommendations: [
          'Start by reading the neuroscience articles — understanding the mechanism reduces shame and increases effectiveness',
          'Do not attempt cold-turkey elimination — use a gradual glucose-flattening approach',
          'The "savory first" protocol is your most important first step',
          'Consider a functional medicine evaluation for insulin resistance markers',
          'Address sleep as a priority — it\'s likely making cravings significantly worse',
          'Explore the psychological dimensions — emotional eating patterns need attention alongside the biology',
          'Give yourself 6-8 weeks, not 6-8 days',
        ],
        articles: ['sugar-addiction-neuroscience', 'how-to-quit-sugar', 'insulin-resistance-explained', 'emotional-eating-biology', 'sleep-blood-sugar', 'dopamine-sugar-reward'],
      },
    ],
  },
  {
    slug: 'glucose-awareness',
    title: 'Glucose Awareness Quiz',
    description: 'How well do you understand what\'s happening in your body after you eat? Test your glucose knowledge.',
    subtitle: '8 questions · 3 minutes',
    questions: [
      {
        id: 'gq1',
        text: 'A glucose spike typically peaks how long after eating?',
        options: [
          { value: 0, label: 'Immediately (within 5 minutes)' },
          { value: 3, label: '30-60 minutes after eating' },
          { value: 1, label: '2-3 hours after eating' },
          { value: 0, label: 'It doesn\'t spike — it stays flat' },
        ],
      },
      {
        id: 'gq2',
        text: 'Which of the following is most effective at blunting a glucose spike?',
        options: [
          { value: 1, label: 'Eating slowly' },
          { value: 3, label: 'Eating vegetables before carbohydrates' },
          { value: 2, label: 'Drinking water with meals' },
          { value: 0, label: 'Choosing "low-fat" options' },
        ],
      },
      {
        id: 'gq3',
        text: 'What happens to your energy and mood during a glucose crash?',
        options: [
          { value: 0, label: 'Nothing — your body compensates automatically' },
          { value: 3, label: 'Fatigue, brain fog, irritability, and cravings increase' },
          { value: 1, label: 'You feel slightly hungry' },
          { value: 0, label: 'Your metabolism speeds up' },
        ],
      },
      {
        id: 'gq4',
        text: 'Which breakfast option would produce the flattest glucose curve?',
        options: [
          { value: 0, label: 'Orange juice and granola' },
          { value: 1, label: 'Whole wheat toast with jam' },
          { value: 2, label: 'Oatmeal with honey' },
          { value: 3, label: 'Eggs with avocado and vegetables' },
        ],
      },
      {
        id: 'gq5',
        text: 'What does insulin resistance mean?',
        options: [
          { value: 0, label: 'Your body doesn\'t produce enough insulin' },
          { value: 3, label: 'Your cells stop responding effectively to insulin\'s signal' },
          { value: 1, label: 'You\'re resistant to developing diabetes' },
          { value: 0, label: 'Your insulin levels are too low' },
        ],
      },
      {
        id: 'gq6',
        text: 'A 10-minute walk after a meal primarily helps by:',
        options: [
          { value: 1, label: 'Burning the calories you just ate' },
          { value: 3, label: 'Using glucose in muscles, reducing the spike' },
          { value: 0, label: 'Speeding up digestion' },
          { value: 2, label: 'Reducing cortisol from the meal' },
        ],
      },
      {
        id: 'gq7',
        text: 'Which of the following is a "hidden sugar" that spikes glucose significantly?',
        options: [
          { value: 2, label: 'White rice' },
          { value: 1, label: 'Whole grain bread' },
          { value: 3, label: 'Fruit juice (even 100% natural)' },
          { value: 2, label: 'Honey' },
        ],
      },
      {
        id: 'gq8',
        text: 'Poor sleep affects blood sugar by:',
        options: [
          { value: 0, label: 'It has no significant effect on blood sugar' },
          { value: 1, label: 'Slightly reducing appetite' },
          { value: 3, label: 'Increasing cortisol and insulin resistance, worsening glucose control' },
          { value: 2, label: 'Making you crave protein instead of sugar' },
        ],
      },
    ],
    results: [
      {
        minScore: 0,
        maxScore: 8,
        title: 'Glucose Beginner',
        description: 'You\'re at the start of your glucose education journey. The good news: the fundamentals are simple and the impact is immediate once you understand them.',
        recommendations: [
          'Start with "Glucose Spikes Explained" — the foundational article',
          'Read about the vinegar hack — it\'s the easiest first intervention',
          'Learn the "food order" principle — it changes everything',
        ],
        articles: ['glucose-spikes-explained', 'vinegar-hack-glucose', 'food-order-glucose'],
      },
      {
        minScore: 9,
        maxScore: 16,
        title: 'Glucose Intermediate',
        description: 'You have a solid foundation in glucose science. You understand the basics but there are some nuances and advanced strategies worth exploring.',
        recommendations: [
          'Explore the research on post-meal walking',
          'Learn about the protein-first principle',
          'Read about CGM data and what flat curves actually look like',
        ],
        articles: ['post-meal-walking-glucose', 'protein-satiety-glucose', 'cgm-guide-beginners'],
      },
      {
        minScore: 17,
        maxScore: 24,
        title: 'Glucose Fluent',
        description: 'You have strong glucose literacy. You understand the mechanisms and likely apply several strategies already. The advanced articles on metabolic health and insulin resistance will take you further.',
        recommendations: [
          'Explore insulin resistance markers and lab testing',
          'Read about the metabolic syndrome spectrum',
          'Consider tracking with a CGM to see your personal patterns',
        ],
        articles: ['insulin-resistance-explained', 'metabolic-syndrome-spectrum', 'cgm-guide-beginners'],
      },
    ],
  },
];

export default ASSESSMENTS;
