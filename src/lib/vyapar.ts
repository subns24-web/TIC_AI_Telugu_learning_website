import type {
  BusinessType,
  RequiredFile,
  VyaparCategory,
  VyaparPrompt,
} from "./vyapar-types";

export const businessTypes: BusinessType[] = [
  { id: "retail", label: "Shop / Retail", labelTe: "షాప్ / రిటైల్", emoji: "🏪" },
  { id: "clinic", label: "Clinic / Hospital", labelTe: "క్లినిక్ / ఆసుపత్రి", emoji: "🩺" },
  { id: "food", label: "Hotel / Restaurant", labelTe: "హోటల్ / రెస్టారెంట్", emoji: "🍽️" },
  { id: "manufacturing", label: "Manufacturing", labelTe: "తయారీ", emoji: "🏭" },
  { id: "services", label: "Agency / Services", labelTe: "ఏజెన్సీ / సేవలు", emoji: "💼" },
  { id: "education", label: "School / Coaching", labelTe: "స్కూల్ / కోచింగ్", emoji: "🎓" },
  { id: "realestate", label: "Real Estate", labelTe: "రియల్ ఎస్టేట్", emoji: "🏘️" },
  { id: "wellness", label: "Salon / Gym", labelTe: "సెలూన్ / జిమ్", emoji: "💇" },
];

export const categories: VyaparCategory[] = [
  {
    id: "customers",
    title: "Find new customers",
    titleTe: "కొత్త కస్టమర్లు",
    blurb: "Build lists, research your market, write the first message.",
    blurbTe: "లిస్ట్ తయారు చేయండి, మార్కెట్ తెలుసుకోండి, మొదటి సందేశం రాయండి.",
    icon: "M12 4.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM21 21l-4.3-4.3",
    accent: "gold",
  },
  {
    id: "sell",
    title: "Sell more",
    titleTe: "అమ్మకాలు పెంచడం",
    blurb: "Follow-ups, offers, quotations and the awkward money conversations.",
    blurbTe: "ఫాలో-అప్‌లు, ఆఫర్లు, కొటేషన్లు, డబ్బు గురించి ఇబ్బంది సంభాషణలు.",
    icon: "M3 17l6-6 4 4 7-7M14 7h7v7",
    accent: "teal",
  },
  {
    id: "marketing",
    title: "Marketing & content",
    titleTe: "మార్కెటింగ్ & కంటెంట్",
    blurb: "Posts, captions, festival offers, WhatsApp broadcasts, ads.",
    blurbTe: "పోస్ట్‌లు, క్యాప్షన్లు, పండుగ ఆఫర్లు, WhatsApp బ్రాడ్‌కాస్ట్, యాడ్స్.",
    icon: "M4 10v4a1 1 0 001 1h3l5 4V5L8 9H5a1 1 0 00-1 1zM17.5 8.5a5 5 0 010 7",
    accent: "violet",
  },
  {
    id: "daily",
    title: "Daily work",
    titleTe: "రోజువారీ పని",
    blurb: "Replies, complaints, letters, summaries — the things that eat the day.",
    blurbTe: "రిప్లైలు, ఫిర్యాదులు, లేఖలు, సారాంశాలు — రోజును తినేసే పనులు.",
    icon: "M7 4h10a1 1 0 011 1v15l-6-3-6 3V5a1 1 0 011-1z",
    accent: "indigo",
  },
  {
    id: "money",
    title: "Money & numbers",
    titleTe: "డబ్బు & లెక్కలు",
    blurb: "Read your own sales data, find dead stock, price things properly.",
    blurbTe: "మీ అమ్మకాల డేటా చదవండి, డెడ్ స్టాక్ కనుక్కోండి, సరైన ధర పెట్టండి.",
    icon: "M12 3v18M8 7h6.5a2.5 2.5 0 010 5h-5a2.5 2.5 0 000 5H16",
    accent: "silver",
  },
  {
    id: "staff",
    title: "Staff & training",
    titleTe: "సిబ్బంది & శిక్షణ",
    blurb: "Hiring, interview questions, and writing down how your work is done.",
    blurbTe: "నియామకం, ఇంటర్వ్యూ ప్రశ్నలు, మీ పని విధానం రాసి పెట్టడం.",
    icon: "M16 19v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2M9.5 9a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM21 19v-2a4 4 0 00-3-3.9",
    accent: "rose",
  },
];

/* ---------- reusable input definitions ---------- */

const PROFILE_FIELDS = [
  {
    id: "businessName",
    label: "Your business name",
    labelTe: "మీ వ్యాపారం పేరు",
    type: "text" as const,
    placeholder: "Sri Lakshmi Traders",
    placeholderTe: "శ్రీ లక్ష్మీ ట్రేడర్స్",
    required: true,
    fromProfile: "businessName" as const,
  },
  {
    id: "sells",
    label: "What you sell",
    labelTe: "మీరు ఏం అమ్ముతారు",
    type: "text" as const,
    placeholder: "Electrical fittings and wiring",
    placeholderTe: "ఎలక్ట్రికల్ ఫిట్టింగ్స్, వైరింగ్",
    required: true,
    fromProfile: "sells" as const,
  },
  {
    id: "city",
    label: "Your city or area",
    labelTe: "మీ ఊరు లేదా ప్రాంతం",
    type: "text" as const,
    placeholder: "Vijayawada",
    placeholderTe: "విజయవాడ",
    fromProfile: "city" as const,
  },
];

const TONE_FIELD = {
  id: "tone",
  label: "How should it sound",
  labelTe: "ఎలా అనిపించాలి",
  type: "select" as const,
  fromProfile: "tone" as const,
  options: [
    { value: "warm and respectful", label: "Warm and respectful", labelTe: "ఆప్యాయంగా, గౌరవంగా" },
    { value: "short and direct", label: "Short and direct", labelTe: "చిన్నగా, నేరుగా" },
    { value: "friendly and casual", label: "Friendly and casual", labelTe: "స్నేహంగా, మామూలుగా" },
    { value: "formal and professional", label: "Formal and professional", labelTe: "అధికారికంగా" },
  ],
};

/** The sales export, with the three ways a Telugu MSME actually keeps books. */
const SALES_FILE: RequiredFile = {
  id: "sales",
  name: "Your sales for the last 3 months",
  nameTe: "గత 3 నెలల అమ్మకాలు",
  format: "Excel or CSV file",
  formatTe: "Excel లేదా CSV ఫైల్",
  why: "This is what the AI reads to tell you what is selling, what is not, and who your best customers are. Without it you only get generic advice.",
  whyTe: "ఏది అమ్ముడవుతోంది, ఏది కాదు, మీ మంచి కస్టమర్లు ఎవరు — ఇది చదివే AI చెబుతుంది. ఇది లేకపోతే సాధారణ సలహా మాత్రమే వస్తుంది.",
  contains: ["Date", "Item name", "Quantity", "Amount", "Customer name (if you have it)"],
  containsTe: ["తేదీ", "వస్తువు పేరు", "ఎన్ని", "మొత్తం", "కస్టమర్ పేరు (ఉంటే)"],
  howToGet: [
    {
      source: "Vyapar app",
      sourceTe: "Vyapar యాప్",
      steps: ["Open Vyapar", "Reports → Sale Report", "Set the date range to the last 3 months", "Tap the Excel icon at the top and save the file"],
      stepsTe: ["Vyapar తెరవండి", "Reports → Sale Report", "తేదీ పరిధి గత 3 నెలలకు పెట్టండి", "పైన Excel గుర్తు నొక్కి ఫైల్ సేవ్ చేయండి"],
    },
    {
      source: "Tally",
      sourceTe: "Tally",
      steps: ["Gateway of Tally → Display → Account Books → Sales Register", "Choose the period", "Press Alt+E to export", "Pick Excel as the format"],
      stepsTe: ["Gateway of Tally → Display → Account Books → Sales Register", "కాలం ఎంచుకోండి", "ఎగుమతికి Alt+E నొక్కండి", "ఫార్మాట్‌గా Excel ఎంచుకోండి"],
    },
    {
      source: "A notebook or no software",
      sourceTe: "నోట్‌బుక్ లేదా సాఫ్ట్‌వేర్ లేదు",
      steps: ["Open Google Sheets on your phone", "Make 4 columns: Date, Item, Quantity, Amount", "Type in even 30 recent bills — that is enough to start", "File → Download → CSV"],
      stepsTe: ["ఫోన్‌లో Google Sheets తెరవండి", "4 కాలమ్స్ చేయండి: తేదీ, వస్తువు, ఎన్ని, మొత్తం", "ఇటీవలి 30 బిల్లులు టైప్ చేసినా చాలు", "File → Download → CSV"],
    },
  ],
};

const CUSTOMER_LIST_FILE: RequiredFile = {
  id: "customers",
  name: "Your customer list",
  nameTe: "మీ కస్టమర్ల లిస్ట్",
  format: "Excel or CSV file",
  formatTe: "Excel లేదా CSV ఫైల్",
  why: "So each message uses the person's real name and what they last bought, instead of reading like a mass forward.",
  whyTe: "ప్రతి సందేశంలో ఆ వ్యక్తి పేరు, వాళ్ళు చివరిగా కొన్నది ఉంటాయి — మాస్ ఫార్వార్డ్‌లా అనిపించదు.",
  contains: ["Name", "Phone number", "What they last bought", "Last purchase date"],
  containsTe: ["పేరు", "ఫోన్ నంబర్", "చివరిగా కొన్నది", "చివరి కొనుగోలు తేదీ"],
  howToGet: [
    {
      source: "Vyapar app",
      sourceTe: "Vyapar యాప్",
      steps: ["Open Vyapar", "Parties → All Parties", "Tap the menu, then Export to Excel"],
      stepsTe: ["Vyapar తెరవండి", "Parties → All Parties", "మెనూ నొక్కి Export to Excel"],
    },
    {
      source: "Your phone contacts",
      sourceTe: "మీ ఫోన్ కాంటాక్ట్స్",
      steps: ["Google Contacts on a computer", "Select the customers you want", "Export → Google CSV"],
      stepsTe: ["కంప్యూటర్‌లో Google Contacts", "కావలసిన కస్టమర్లను ఎంచుకోండి", "Export → Google CSV"],
    },
  ],
};

const STOCK_FILE: RequiredFile = {
  id: "stock",
  name: "Your current stock list",
  nameTe: "ప్రస్తుత స్టాక్ లిస్ట్",
  format: "Excel or CSV file",
  formatTe: "Excel లేదా CSV ఫైల్",
  why: "The AI compares what is sitting on your shelves against what actually sold, and that gap is where your money is stuck.",
  whyTe: "షెల్ఫ్‌లో ఉన్నది, నిజంగా అమ్ముడైనది — ఈ తేడాలోనే మీ డబ్బు ఇరుక్కుపోయింది.",
  contains: ["Item name", "Quantity in hand", "Purchase price", "Selling price", "Date it came in"],
  containsTe: ["వస్తువు పేరు", "ఉన్న స్టాక్", "కొన్న ధర", "అమ్మే ధర", "వచ్చిన తేదీ"],
  howToGet: [
    {
      source: "Vyapar app",
      sourceTe: "Vyapar యాప్",
      steps: ["Reports → Stock Summary", "Export to Excel"],
      stepsTe: ["Reports → Stock Summary", "Export to Excel"],
    },
  ],
};

/* ---------- the prompts ---------- */

export const prompts: VyaparPrompt[] = [
  {
    slug: "whatsapp-followup",
    category: "sell",
    title: "WhatsApp follow-up for customers who stopped buying",
    titleTe: "కొనడం ఆపేసిన కస్టమర్లకు WhatsApp ఫాలో-అప్",
    outcome: "A personal WhatsApp message for each customer who has not bought in a while — in Telugu, using their name and what they bought last.",
    outcomeTe: "చాలా రోజులుగా కొనని ప్రతి కస్టమర్‌కు ఒక వ్యక్తిగత WhatsApp సందేశం — తెలుగులో, వాళ్ళ పేరు, చివరిగా కొన్నదానితో.",
    minutes: 10,
    businessTypes: ["all"],
    featured: true,
    fields: [...PROFILE_FIELDS, TONE_FIELD,
      {
        id: "gap",
        label: "Count someone lost after how many months?",
        labelTe: "ఎన్ని నెలలు కొనకపోతే పోయినట్టు?",
        type: "number",
        placeholder: "3",
        placeholderTe: "3",
        required: true,
      },
      {
        id: "offer",
        label: "Any offer to mention? (leave blank if none)",
        labelTe: "చెప్పాల్సిన ఆఫర్ ఏదైనా? (లేకపోతే ఖాళీ)",
        type: "text",
        placeholder: "10% off this week on fans",
        placeholderTe: "ఈ వారం ఫ్యాన్లపై 10% తగ్గింపు",
      },
    ],
    files: [CUSTOMER_LIST_FILE],
    template: `You are helping {{businessName}}, a business in {{city}} that sells {{sells}}.

I am attaching a file with my customer list.

Find every customer who has not bought anything in the last {{gap}} months.

For each one, write a WhatsApp message in Telugu that:
- uses their name
- mentions what they bought from us last time, naturally, not like a record
- sounds {{tone}}
- is under 60 words, because nobody reads long WhatsApp messages
- does not beg, guilt or over-apologise for being out of touch
{{offer|- mention this offer naturally: }}

Write it the way a shop owner in {{city}} actually talks, not translated English.
Avoid formal written Telugu that nobody speaks.

Give me the result as a table: Name, Phone, Message.
Then tell me which 5 customers are worth a phone call instead of a message, and why.`,
    tips: [
      "Send 20 a day by hand, not 200 at once — WhatsApp blocks numbers that blast messages",
      "Read the first five messages before sending any. If one sounds wrong, tell the AI what felt off and ask again",
      "The five phone-call names are usually your biggest accounts. Call those yourself",
    ],
    tipsTe: [
      "ఒకేసారి 200 కాదు, రోజుకు 20 చేతితో పంపండి — ఒకేసారి పంపితే WhatsApp నంబర్ బ్లాక్ చేస్తుంది",
      "పంపే ముందు మొదటి ఐదు సందేశాలు చదవండి. ఏదైనా తప్పుగా అనిపిస్తే AI కి చెప్పి మళ్ళీ అడగండి",
      "ఫోన్ కాల్ పేర్లు సాధారణంగా మీ పెద్ద ఖాతాలే. వాటికి మీరే కాల్ చేయండి",
    ],
    bestWith: ["chatgpt", "claude"],
  },

  {
    slug: "monthly-sales-review",
    category: "money",
    title: "Read my sales and tell me what is actually happening",
    titleTe: "నా అమ్మకాలు చదివి నిజంగా ఏం జరుగుతోందో చెప్పండి",
    outcome: "A plain-Telugu summary of what sold, what died, which month was weak and the three things to change next month.",
    outcomeTe: "ఏది అమ్ముడైంది, ఏది ఆగిపోయింది, ఏ నెల బలహీనం, వచ్చే నెల మార్చాల్సిన మూడు విషయాలు — సాధారణ తెలుగులో.",
    minutes: 12,
    businessTypes: ["all"],
    featured: true,
    fields: [...PROFILE_FIELDS,
      {
        id: "worry",
        label: "What worries you most right now?",
        labelTe: "ఇప్పుడు మిమ్మల్ని ఎక్కువగా బాధపెడుతున్నది ఏమిటి?",
        type: "textarea",
        placeholder: "Sales look fine but there is never money in hand",
        placeholderTe: "అమ్మకాలు బాగానే ఉన్నాయి కానీ చేతిలో డబ్బు ఉండట్లేదు",
        help: "Say it the way you would to a friend. This shapes the whole answer.",
        helpTe: "స్నేహితుడితో చెప్పినట్టే చెప్పండి. సమాధానం అంతా దీని మీదే ఆధారపడుతుంది.",
        required: true,
      },
    ],
    files: [SALES_FILE],
    template: `You are a straight-talking business advisor for {{businessName}}, a {{sells}} business in {{city}}.

I am attaching my sales data for the last 3 months.

What is on my mind: {{worry}}

Read the data and tell me:
1. My top 10 items by revenue, and separately my top 10 by profit if the data allows it. Say clearly if it does not.
2. Items that have barely moved — the money sitting still on my shelves.
3. Which weeks or months were weak, and what the data suggests about why.
4. Anything surprising that I would probably not have noticed myself.
5. Three specific things to do next month. Not advice like "improve marketing" — tell me what to do, to which item, at what price.

Rules:
- Explain in simple Telugu. A person who never went to business school should understand every line.
- No jargon. If you must use a business term, explain it in the same sentence.
- If the data is incomplete or looks wrong, say so plainly instead of guessing.
- Give rupee figures, not percentages alone.`,
    tips: [
      "Ask follow-up questions in the same chat — 'why did October drop?' — it still has your data",
      "If the answer feels generic, your file is probably missing the item names or amounts",
      "Do this on the 1st of every month and keep the answers. The pattern across months is worth more than any single one",
    ],
    tipsTe: [
      "అదే చాట్‌లో మళ్ళీ అడగండి — 'అక్టోబర్ ఎందుకు తగ్గింది?' — డేటా ఇంకా దాని దగ్గరే ఉంటుంది",
      "సమాధానం మామూలుగా అనిపిస్తే, మీ ఫైల్‌లో వస్తువు పేర్లు లేదా మొత్తాలు లేవేమో చూడండి",
      "ప్రతి నెల 1వ తేదీన ఇది చేసి సమాధానాలు దాచండి. నెలల మధ్య కనిపించే తీరు ఒక్క నెల కంటే విలువైనది",
    ],
    bestWith: ["claude", "chatgpt"],
  },

  {
    slug: "dead-stock-clearance",
    category: "money",
    title: "Turn dead stock back into cash",
    titleTe: "డెడ్ స్టాక్‌ను తిరిగి డబ్బుగా మార్చండి",
    outcome: "A list of what is stuck, how much cash it is holding, and a clearance plan with prices that still leave you a margin.",
    outcomeTe: "ఏది ఇరుక్కుంది, ఎంత డబ్బు ఆగిపోయింది, మార్జిన్ పోకుండా క్లియరెన్స్ ప్లాన్.",
    minutes: 15,
    businessTypes: ["retail", "manufacturing", "food", "wellness"],
    fields: [...PROFILE_FIELDS,
      {
        id: "cashNeeded",
        label: "How much cash do you want to free up?",
        labelTe: "ఎంత డబ్బు విడిపించుకోవాలి?",
        type: "text",
        placeholder: "₹2,00,000",
        placeholderTe: "₹2,00,000",
      },
      {
        id: "minMargin",
        label: "Lowest margin you will accept",
        labelTe: "మీరు ఒప్పుకునే కనీస మార్జిన్",
        type: "text",
        placeholder: "5%",
        placeholderTe: "5%",
        help: "Below this you would rather keep the stock.",
        helpTe: "దీని కంటే తక్కువైతే స్టాక్ ఉంచుకోవడమే మేలు.",
      },
    ],
    files: [STOCK_FILE, { ...SALES_FILE, optional: true }],
    template: `You are helping {{businessName}} in {{city}}, which sells {{sells}}.

I am attaching my current stock list, and my sales data if available.

I want to free up about {{cashNeeded}} in cash. I will not sell below {{minMargin}} margin.

Work out:
1. Which items have not sold, or sold very slowly, compared with how much stock I am holding.
2. How much cash is tied up in each of those items, at purchase price.
3. A clearance price for each that stays above my minimum margin — show the maths.
4. Which items I should simply stop reordering, separate from the ones to discount.
5. A realistic order to clear them in, over the next 6 weeks.

Also write me two short Telugu WhatsApp messages to announce the clearance — one for regular customers, one for a broadcast list.

Be honest: if an item is not worth discounting and I should just accept the loss, say so.`,
    tips: [
      "Do the biggest cash-stuck items first, not the most items",
      "If an item has not moved in a year, the discount that clears it is almost always bigger than feels comfortable",
      "Keep one unit of anything you might be asked for again, even after clearing the rest",
    ],
    tipsTe: [
      "ఎక్కువ వస్తువులు కాదు — ఎక్కువ డబ్బు ఇరుక్కున్న వాటితో మొదలుపెట్టండి",
      "ఒక సంవత్సరంగా కదలని వస్తువుకు, క్లియర్ అయ్యే తగ్గింపు మనకు నచ్చే దాని కంటే ఎప్పుడూ ఎక్కువే",
      "మిగతావి అమ్మేసినా, మళ్ళీ అడిగే అవకాశం ఉన్న వస్తువు ఒకటి ఉంచుకోండి",
    ],
    bestWith: ["claude"],
  },

  {
    slug: "find-customers-nearby",
    category: "customers",
    title: "Find businesses near me who could buy from me",
    titleTe: "నా దగ్గర నా దగ్గర కొనగలిగే వ్యాపారాలు కనుక్కోండి",
    outcome: "A list of specific business types and areas worth approaching, with the first message written for each.",
    outcomeTe: "సంప్రదించదగ్గ వ్యాపార రకాలు, ప్రాంతాల లిస్ట్ — ప్రతి దానికీ మొదటి సందేశంతో.",
    minutes: 8,
    businessTypes: ["all"],
    featured: true,
    fields: [...PROFILE_FIELDS,
      {
        id: "bestCustomer",
        label: "Describe your best existing customer",
        labelTe: "మీ ఇప్పటి మంచి కస్టమర్‌ను వివరించండి",
        type: "textarea",
        placeholder: "A 20-bed hospital that orders housekeeping supplies every month",
        placeholderTe: "ప్రతి నెల హౌస్‌కీపింగ్ సామాను ఆర్డర్ చేసే 20 పడకల ఆసుపత్రి",
        help: "The more exact you are, the better the list. 'Everyone' gives you nothing.",
        helpTe: "ఎంత కచ్చితంగా చెబితే లిస్ట్ అంత బాగుంటుంది. 'అందరూ' అంటే ఏమీ రాదు.",
        required: true,
      },
      {
        id: "radius",
        label: "How far can you serve?",
        labelTe: "ఎంత దూరం వరకు సేవ చేయగలరు?",
        type: "text",
        placeholder: "30 km around Vijayawada",
        placeholderTe: "విజయవాడ చుట్టూ 30 కి.మీ",
      },
    ],
    files: [],
    template: `I run {{businessName}} in {{city}}. We sell {{sells}} and can serve customers within {{radius}}.

My best customer today looks like this: {{bestCustomer}}

Help me find more like them.

1. List 10 specific types of business that would need what I sell. Be specific — "hospitals" is useless, "20-50 bed private hospitals doing their own housekeeping" is useful.
2. For each type, tell me roughly where in my area they cluster, and how I would find them. Google Maps searches, local associations, trade bodies, markets — name the actual search terms.
3. Rank them: which to approach first, based on how easy they are to reach and how much they would likely spend.
4. For the top 3, write me a first WhatsApp message in Telugu. Short. No "Dear Sir, I hope this finds you well." Sound like a person from {{city}}, not a sales script.
5. Tell me what each type will most likely object to, and how to answer honestly.

Do not invent business names, phone numbers or addresses. Only tell me categories and how to find them myself.`,
    tips: [
      "That last rule matters — AI will cheerfully invent phone numbers if you let it. Always collect real contacts yourself",
      "Try the Google Maps search terms it gives you before trusting the list",
      "If a category feels wrong for your area, say so in the chat and ask for different ones",
    ],
    tipsTe: [
      "చివరి నియమం ముఖ్యం — అనుమతిస్తే AI ఫోన్ నంబర్లు కల్పిస్తుంది. నిజమైన కాంటాక్ట్‌లు మీరే సేకరించండి",
      "ఇచ్చిన Google Maps సెర్చ్ పదాలు ముందు ప్రయత్నించి చూడండి",
      "ఏదైనా వర్గం మీ ప్రాంతానికి సరిపోదని అనిపిస్తే, చాట్‌లో చెప్పి వేరేవి అడగండి",
    ],
    bestWith: ["chatgpt", "gemini"],
  },

  {
    slug: "month-of-posts",
    category: "marketing",
    title: "One month of social media posts in one sitting",
    titleTe: "ఒకేసారి కూర్చుని నెల సోషల్ మీడియా పోస్ట్‌లు",
    outcome: "30 days of posts with Telugu captions, what photo to take for each, and the best day to put it up.",
    outcomeTe: "30 రోజుల పోస్ట్‌లు — తెలుగు క్యాప్షన్లు, ఏ ఫోటో తీయాలి, ఏ రోజు పెట్టాలి.",
    minutes: 20,
    businessTypes: ["all"],
    fields: [...PROFILE_FIELDS, TONE_FIELD,
      {
        id: "platform",
        label: "Where do you post?",
        labelTe: "ఎక్కడ పోస్ట్ చేస్తారు?",
        type: "select",
        options: [
          { value: "Instagram and WhatsApp Status", label: "Instagram + WhatsApp Status", labelTe: "Instagram + WhatsApp స్టేటస్" },
          { value: "Facebook and WhatsApp Status", label: "Facebook + WhatsApp Status", labelTe: "Facebook + WhatsApp స్టేటస్" },
          { value: "LinkedIn", label: "LinkedIn", labelTe: "LinkedIn" },
          { value: "all of them", label: "All of them", labelTe: "అన్నీ" },
        ],
        required: true,
      },
      {
        id: "month",
        label: "Which month?",
        labelTe: "ఏ నెల?",
        type: "text",
        placeholder: "December",
        placeholderTe: "డిసెంబర్",
        help: "So festivals and local events in that month get included.",
        helpTe: "ఆ నెలలో వచ్చే పండుగలు, స్థానిక కార్యక్రమాలు కలపడానికి.",
        required: true,
      },
    ],
    files: [
      {
        id: "photos",
        name: "A few photos of your shop, products or team",
        nameTe: "మీ షాప్, వస్తువులు లేదా టీమ్ ఫోటోలు",
        format: "Photos from your phone",
        formatTe: "మీ ఫోన్‌లోని ఫోటోలు",
        why: "Shown the real thing, the AI writes captions about what is actually in the picture instead of generic lines.",
        whyTe: "నిజమైనది చూస్తే, బొమ్మలో ఉన్నదాని గురించే క్యాప్షన్ రాస్తుంది — మామూలు మాటలు కాదు.",
        optional: true,
        howToGet: [
          {
            source: "Your phone",
            sourceTe: "మీ ఫోన్",
            steps: ["Take 5-10 photos in daylight", "Shop front, your busiest shelf, your team working, your top product", "Attach them in the chat"],
            stepsTe: ["పగటి వెలుతురులో 5-10 ఫోటోలు తీయండి", "షాప్ ముందు, బిజీ షెల్ఫ్, పని చేసే టీమ్, బాగా అమ్ముడయ్యే వస్తువు", "చాట్‌లో జత చేయండి"],
          },
        ],
      },
    ],
    template: `I run {{businessName}} in {{city}}. We sell {{sells}}.
I post on {{platform}}. Plan {{month}} for me.

Give me 30 posts. For each one:
- Day number and the best day of the week to post it
- A Telugu caption that sounds {{tone}} — written for people in {{city}}, not translated from English
- Exactly what photo or video to take, described so my staff could shoot it without me
- 5 hashtags, mixing Telugu and English as people here actually search

Mix the types so it does not become one long advertisement:
- about 10 showing products or work
- about 6 useful tips my customers would want even if they never buy
- about 5 behind the scenes — staff, deliveries, an ordinary morning
- about 4 customer stories or reviews
- about 5 tied to festivals and events falling in {{month}} in Andhra Pradesh and Telangana

Lay it out as a table I can print and hand to whoever does the posting.
Keep captions under 40 words. Nobody reads more on a phone.`,
    tips: [
      "Shoot a whole week of photos in one go on a Sunday. The writing is never the bottleneck — the photos are",
      "Keep the festival posts and reuse them next year with new pictures",
      "If a caption sounds like a translated English advertisement, it is. Ask for it again in spoken Telugu",
    ],
    tipsTe: [
      "ఆదివారం ఒకేసారి వారం ఫోటోలు తీయండి. రాయడం ఎప్పుడూ ఆలస్యం కాదు — ఫోటోలే",
      "పండుగ పోస్ట్‌లు దాచి వచ్చే సంవత్సరం కొత్త ఫోటోలతో వాడండి",
      "క్యాప్షన్ అనువదించిన ఇంగ్లీష్ ప్రకటనలా అనిపిస్తే, అది అదే. మాట్లాడే తెలుగులో మళ్ళీ అడగండి",
    ],
    bestWith: ["chatgpt", "claude"],
  },

  {
    slug: "complaint-reply",
    category: "daily",
    title: "Reply to an angry customer without losing them",
    titleTe: "కోపంగా ఉన్న కస్టమర్‌కు, వాళ్ళను పోగొట్టుకోకుండా సమాధానం",
    outcome: "Three versions of a reply — one to send now, one if they are right, one if they are not — plus what to do internally.",
    outcomeTe: "మూడు రకాల సమాధానాలు — ఇప్పుడే పంపేది, వాళ్ళు సరైనవారైతే, కాకపోతే — లోపల ఏం చేయాలో కూడా.",
    minutes: 5,
    businessTypes: ["all"],
    fields: [...PROFILE_FIELDS, TONE_FIELD,
      {
        id: "complaint",
        label: "Paste what the customer said",
        labelTe: "కస్టమర్ చెప్పినది ఇక్కడ అతికించండి",
        type: "textarea",
        placeholder: "Paste their WhatsApp message, review or email here",
        placeholderTe: "వాళ్ళ WhatsApp సందేశం, రివ్యూ లేదా ఈమెయిల్ ఇక్కడ అతికించండి",
        required: true,
      },
      {
        id: "truth",
        label: "Between us — were we at fault?",
        labelTe: "మన మధ్య — తప్పు మనదేనా?",
        type: "select",
        options: [
          { value: "yes, we were clearly wrong", label: "Yes, we were wrong", labelTe: "అవును, మనదే తప్పు" },
          { value: "partly, there is fault on both sides", label: "Partly", labelTe: "కొంతవరకు" },
          { value: "no, but the customer believes we were", label: "No, but they think so", labelTe: "కాదు, కానీ వాళ్ళు అలా అనుకుంటున్నారు" },
          { value: "I do not know yet", label: "I do not know yet", labelTe: "ఇంకా తెలియదు" },
        ],
        required: true,
      },
    ],
    files: [],
    template: `I run {{businessName}} in {{city}}, selling {{sells}}.

A customer said this:
"""
{{complaint}}
"""

Honestly, our position is: {{truth}}

Write me three replies in Telugu, each {{tone}} and under 80 words:
1. One to send in the next ten minutes, so they know a human read it.
2. One for after I have checked — assuming we were at fault.
3. One for after I have checked — assuming we were not, but written so they do not feel called a liar.

For every reply:
- No corporate language. No "we regret the inconvenience caused."
- Apologise once at most. Repeated apologies read as weakness, not care.
- Say what happens next and by when. Never a vague "we will look into it."

Then, separately, tell me:
- What probably went wrong inside my business for this to happen
- One change that stops it recurring
- Whether this is worth a refund, a replacement, or neither — and why`,
    tips: [
      "Send reply 1 immediately even before you know the facts. Silence turns a complaint into a review",
      "The internal note at the end is the valuable part. One complaint usually means ten silent ones",
      "Never paste a customer's phone number or address into the chat — just their message",
    ],
    tipsTe: [
      "విషయం తెలియకముందే మొదటి సమాధానం వెంటనే పంపండి. మౌనమే ఫిర్యాదును రివ్యూగా మారుస్తుంది",
      "చివర ఇచ్చే లోపలి సూచనే విలువైనది. ఒక ఫిర్యాదు అంటే సాధారణంగా పది మౌన ఫిర్యాదులు",
      "కస్టమర్ ఫోన్ నంబర్, చిరునామా చాట్‌లో ఎప్పుడూ పెట్టకండి — వాళ్ళ సందేశం మాత్రమే",
    ],
    bestWith: ["claude", "chatgpt"],
  },

  {
    slug: "hire-and-interview",
    category: "staff",
    title: "Write the job post and the interview questions",
    titleTe: "ఉద్యోగ ప్రకటన, ఇంటర్వ్యూ ప్రశ్నలు రాయండి",
    outcome: "A job post for WhatsApp groups and local boards, interview questions that reveal real ability, and a simple scoring sheet.",
    outcomeTe: "WhatsApp గ్రూప్‌లకు, స్థానిక బోర్డులకు ఉద్యోగ ప్రకటన, నిజమైన సామర్థ్యం తెలిసే ఇంటర్వ్యూ ప్రశ్నలు, సులభమైన స్కోరింగ్ షీట్.",
    minutes: 10,
    businessTypes: ["all"],
    fields: [...PROFILE_FIELDS,
      {
        id: "role",
        label: "What is the job?",
        labelTe: "ఉద్యోగం ఏమిటి?",
        type: "text",
        placeholder: "Counter sales and billing",
        placeholderTe: "కౌంటర్ సేల్స్, బిల్లింగ్",
        required: true,
      },
      {
        id: "salary",
        label: "Salary you can pay",
        labelTe: "మీరు ఇవ్వగల జీతం",
        type: "text",
        placeholder: "₹15,000 to ₹18,000 a month",
        placeholderTe: "నెలకు ₹15,000 నుంచి ₹18,000",
      },
      {
        id: "dealbreaker",
        label: "What goes wrong when you hire badly?",
        labelTe: "తప్పు మనిషిని తీసుకుంటే ఏం జరుగుతుంది?",
        type: "textarea",
        placeholder: "They cannot handle a rush and customers walk out",
        placeholderTe: "రద్దీ సమయంలో తట్టుకోలేరు, కస్టమర్లు వెళ్ళిపోతారు",
        help: "This is what the interview questions will be built to catch.",
        helpTe: "ఇదే పట్టుకోవడానికి ఇంటర్వ్యూ ప్రశ్నలు తయారవుతాయి.",
        required: true,
      },
    ],
    files: [],
    template: `I run {{businessName}} in {{city}}, selling {{sells}}.
I am hiring for: {{role}}. I can pay {{salary}}.

When I hire the wrong person, this is what happens: {{dealbreaker}}

Give me:

1. A job post in Telugu for WhatsApp groups and local notice boards. Short enough to read on a phone. Honest about the work — no "exciting opportunity with a dynamic team."

2. Ten interview questions that would actually reveal whether someone can do this job. Not "what is your greatest weakness." Questions about real situations from {{role}} in a business like mine.

3. For each question, what a good answer sounds like and what a worrying one sounds like.

4. A practical task I can set in 15 minutes during the interview that shows me their ability directly.

5. A one-page scoring sheet I can print, so if two of us interview we judge on the same things.

Write everything in Telugu except standard job terms people expect in English.`,
    tips: [
      "The 15-minute task tells you more than the whole interview. Make everyone do it",
      "Score immediately after each candidate leaves, not at the end of the day",
      "Be honest about the hard parts in the job post. People who leave in a month cost more than an empty chair",
    ],
    tipsTe: [
      "15 నిమిషాల పని మొత్తం ఇంటర్వ్యూ కంటే ఎక్కువ చెబుతుంది. అందరికీ పెట్టండి",
      "రోజు చివర కాదు — ప్రతి అభ్యర్థి వెళ్ళిన వెంటనే స్కోర్ రాయండి",
      "ప్రకటనలో కష్టమైన భాగాల గురించి నిజం చెప్పండి. నెలలో వెళ్ళిపోయేవారు ఖాళీ కుర్చీ కంటే ఖరీదు",
    ],
    bestWith: ["claude", "chatgpt"],
  },

  {
    slug: "festival-offer",
    category: "marketing",
    title: "Plan a festival offer that does not kill your margin",
    titleTe: "మార్జిన్ పోకుండా పండుగ ఆఫర్ ప్లాన్",
    outcome: "An offer structure with the maths shown, the messages to announce it, and what to stock before it starts.",
    outcomeTe: "లెక్కలతో సహా ఆఫర్ నిర్మాణం, ప్రకటించే సందేశాలు, ముందుగా ఏం స్టాక్ చేయాలి.",
    minutes: 12,
    businessTypes: ["retail", "food", "wellness", "services"],
    fields: [...PROFILE_FIELDS,
      {
        id: "festival",
        label: "Which festival or occasion?",
        labelTe: "ఏ పండుగ లేదా సందర్భం?",
        type: "text",
        placeholder: "Sankranti",
        placeholderTe: "సంక్రాంతి",
        required: true,
      },
      {
        id: "margin",
        label: "Your usual margin",
        labelTe: "మీ సాధారణ మార్జిన్",
        type: "text",
        placeholder: "About 25%",
        placeholderTe: "సుమారు 25%",
        help: "Roughly is fine. Without it the AI will suggest discounts that lose you money.",
        helpTe: "సుమారుగా చాలు. ఇది లేకపోతే నష్టం వచ్చే తగ్గింపులు సూచిస్తుంది.",
        required: true,
      },
      {
        id: "goal",
        label: "What do you want from this offer?",
        labelTe: "ఈ ఆఫర్ నుంచి మీకు ఏం కావాలి?",
        type: "select",
        options: [
          { value: "more new customers, even at low profit", label: "New customers", labelTe: "కొత్త కస్టమర్లు" },
          { value: "clear old stock", label: "Clear old stock", labelTe: "పాత స్టాక్ క్లియర్" },
          { value: "higher bill value from existing customers", label: "Bigger bills", labelTe: "పెద్ద బిల్లులు" },
          { value: "cash in hand quickly", label: "Quick cash", labelTe: "వెంటనే డబ్బు" },
        ],
        required: true,
      },
    ],
    files: [{ ...SALES_FILE, optional: true }],
    template: `I run {{businessName}} in {{city}}, selling {{sells}}.
My usual margin is {{margin}}. For {{festival}}, what I want is: {{goal}}

Design the offer for me.

1. Three different offer structures that fit my goal. For each, show the maths: what I give up per sale, how many extra sales I need to break even, and what I make if it works.
2. Say clearly which one you recommend and why, given my margin.
3. Tell me what could go wrong with each — including customers who would have paid full price anyway.
4. What I should stock up on before {{festival}}, based on what people in Andhra Pradesh and Telangana actually buy for it.
5. A WhatsApp message, an Instagram caption and a shop banner line to announce it — all in Telugu, all short.
6. When to start and stop the offer, and why those dates.

Do not suggest a discount that leaves me below cost. If my margin is too thin for a discount at all, tell me that and suggest something else — a bundle, a free add-on, longer credit.`,
    tips: [
      "Point 6 matters: an offer with no end date trains customers to wait for the next one",
      "Bundles usually beat straight discounts when your margin is thin",
      "Keep what you spent and what you earned. Next year this prompt gets much sharper with last year's numbers attached",
    ],
    tipsTe: [
      "6వ పాయింట్ ముఖ్యం: ముగింపు తేదీ లేని ఆఫర్ — తరువాతి ఆఫర్ కోసం ఎదురుచూడటం కస్టమర్లకు నేర్పుతుంది",
      "మార్జిన్ తక్కువగా ఉన్నప్పుడు నేరుగా తగ్గింపు కంటే బండిల్స్ మేలు",
      "ఎంత ఖర్చు, ఎంత వచ్చిందో రాసి పెట్టండి. వచ్చే సంవత్సరం ఈ ప్రాంప్ట్ ఆ లెక్కలతో చాలా బాగా పని చేస్తుంది",
    ],
    bestWith: ["claude", "chatgpt"],
  },
];

/* ---------- helpers ---------- */

/** Fill a template.
 *
 * `{{id}}`            — straight substitution.
 * `{{id|prefix }}`    — writes "prefix value" when filled; when blank the
 *                       whole LINE is dropped, so optional extras never
 *                       leave a dangling bullet behind.
 * A blank required value is left as a visible [label] so the owner can see
 * what is still missing rather than sending the AI an empty slot.
 */
export function buildPrompt(
  prompt: VyaparPrompt,
  values: Record<string, string>,
): string {
  const labelFor = (id: string) =>
    prompt.fields.find((f) => f.id === id)?.label ?? id;

  const lines = prompt.template.split("\n");
  const out: string[] = [];

  for (const line of lines) {
    let dropLine = false;

    const filled = line.replace(
      /\{\{(\w+)(?:\|([^}]*))?\}\}/g,
      (_match, id: string, prefix?: string) => {
        const value = (values[id] ?? "").trim();
        if (value) return prefix ? `${prefix}${value}` : value;
        // An optional insert with nothing in it takes its line with it.
        if (prefix !== undefined) {
          dropLine = true;
          return "";
        }
        return `[${labelFor(id)}]`;
      },
    );

    if (!dropLine) out.push(filled);
  }

  return out.join("\n").trim();
}

/** Which required fields are still empty, for the progress indicator. */
export function missingFields(
  prompt: VyaparPrompt,
  values: Record<string, string>,
): string[] {
  return prompt.fields
    .filter((f) => f.required && !(values[f.id] ?? "").trim())
    .map((f) => f.id);
}


export function getPrompt(slug: string) {
  return prompts.find((p) => p.slug === slug);
}

export function getCategory(id: string) {
  return categories.find((c) => c.id === id);
}

export function promptsIn(categoryId: string, businessType?: string) {
  return prompts.filter((p) => {
    if (p.category !== categoryId) return false;
    if (!businessType || businessType === "all") return true;
    return p.businessTypes.includes("all") || p.businessTypes.includes(businessType);
  });
}

export function promptsFor(businessType?: string) {
  if (!businessType || businessType === "all") return prompts;
  return prompts.filter(
    (p) => p.businessTypes.includes("all") || p.businessTypes.includes(businessType),
  );
}

export const TOOL_LABEL: Record<string, { name: string; url: string }> = {
  chatgpt: { name: "ChatGPT", url: "https://chatgpt.com/" },
  claude: { name: "Claude", url: "https://claude.ai/new" },
  gemini: { name: "Gemini", url: "https://gemini.google.com/app" },
};
