import type {
  BusinessType,
  RequiredFile,
  VyaparCategory,
  VyaparPrompt,
} from "./vyapar-types";

/* Telugu here is written the way people actually speak it in Andhra and
 * Telangana, not the way textbooks write it. That means keeping the English
 * words traders genuinely use — కస్టమర్, స్టాక్, ఆఫర్, బిల్లు, రేటు, ప్రాఫిట్ —
 * instead of reaching for Sanskritised equivalents nobody says out loud.
 * "తప్పనిసరి కాదు" is machine Telugu; "తప్పనిసరి కాదు" is what a shop owner says.
 */

export const businessTypes: BusinessType[] = [
  { id: "kirana", label: "Kirana / General store", labelTe: "కిరాణా / జనరల్ స్టోర్", emoji: "🏪" },
  { id: "medical", label: "Medical shop", labelTe: "మెడికల్ షాప్", emoji: "💊" },
  { id: "clothes", label: "Clothes / Saree shop", labelTe: "బట్టల / చీరల షాప్", emoji: "👗" },
  { id: "jewellery", label: "Jewellery", labelTe: "బంగారం షాప్", emoji: "💍" },
  { id: "hardware", label: "Hardware / Cement / Steel", labelTe: "హార్డ్‌వేర్ / సిమెంట్ / స్టీల్", emoji: "🧱" },
  { id: "electronics", label: "Electronics / Mobile shop", labelTe: "ఎలక్ట్రానిక్స్ / మొబైల్ షాప్", emoji: "📱" },
  { id: "hotel", label: "Hotel / Tiffin centre", labelTe: "హోటల్ / టిఫిన్ సెంటర్", emoji: "🍛" },
  { id: "catering", label: "Catering / Function hall", labelTe: "క్యాటరింగ్ / ఫంక్షన్ హాల్", emoji: "🎪" },
  { id: "clinic", label: "Clinic / Diagnostics", labelTe: "క్లినిక్ / డయాగ్నోస్టిక్స్", emoji: "🩺" },
  { id: "agri", label: "Seeds / Fertiliser / Pesticide", labelTe: "విత్తనాలు / ఎరువులు / పురుగుమందులు", emoji: "🌾" },
  { id: "aqua", label: "Aqua / Fish / Prawn", labelTe: "ఆక్వా / చేపలు / రొయ్యలు", emoji: "🦐" },
  { id: "poultry", label: "Poultry / Dairy", labelTe: "పౌల్ట్రీ / డైరీ", emoji: "🐓" },
  { id: "mill", label: "Rice mill / Flour mill", labelTe: "రైస్ మిల్ / ఫ్లోర్ మిల్", emoji: "⚙️" },
  { id: "transport", label: "Transport / Lorry", labelTe: "ట్రాన్స్‌పోర్ట్ / లారీ", emoji: "🚛" },
  { id: "construction", label: "Construction / Contractor", labelTe: "కన్‌స్ట్రక్షన్ / కాంట్రాక్టర్", emoji: "🏗️" },
  { id: "realestate", label: "Real estate", labelTe: "రియల్ ఎస్టేట్", emoji: "🏘️" },
  { id: "tuition", label: "Tuition / Coaching", labelTe: "ట్యూషన్ / కోచింగ్", emoji: "📚" },
  { id: "salon", label: "Salon / Parlour / Gym", labelTe: "సెలూన్ / పార్లర్ / జిమ్", emoji: "💇" },
  { id: "tailoring", label: "Tailoring / Boutique", labelTe: "టైలరింగ్ / బోటిక్", emoji: "✂️" },
  { id: "garage", label: "Garage / Service centre", labelTe: "గ్యారేజ్ / సర్వీస్ సెంటర్", emoji: "🔧" },
  { id: "printing", label: "Printing / Xerox / DTP", labelTe: "ప్రింటింగ్ / జిరాక్స్ / DTP", emoji: "🖨️" },
  { id: "services", label: "Agency / IT / Services", labelTe: "ఏజెన్సీ / IT / సర్వీసెస్", emoji: "💼" },
];

/* Categories are the worries a shop owner actually carries around, broken
 * small enough that each one is a single afternoon's job. */
export const categories: VyaparCategory[] = [
  {
    id: "customers",
    title: "Get new customers",
    titleTe: "కొత్త కస్టమర్లు రావాలి",
    blurb: "Who to go after, where to find them, what to say first.",
    blurbTe: "ఎవరి దగ్గరికి వెళ్ళాలి, వాళ్ళు ఎక్కడ దొరుకుతారు, మొదట ఏం చెప్పాలి.",
    icon: "M12 4.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM21 21l-4.3-4.3",
    accent: "gold",
  },
  {
    id: "sell",
    title: "Close the sale",
    titleTe: "అమ్మకం క్లోజ్ చేయాలి",
    blurb: "Quotations, rates, offers, and the customer who says it is too costly.",
    blurbTe: "కొటేషన్లు, రేట్లు, ఆఫర్లు, 'చాలా రేటు' అనే కస్టమర్.",
    icon: "M3 17l6-6 4 4 7-7M14 7h7v7",
    accent: "teal",
  },
  {
    id: "repeat",
    title: "Bring old customers back",
    titleTe: "పాత కస్టమర్లు మళ్ళీ రావాలి",
    blurb: "People who bought once and vanished. Usually your cheapest sale.",
    blurbTe: "ఒకసారి కొని మాయమైనవాళ్ళు. సాధారణంగా వీళ్ళే చౌకైన అమ్మకం.",
    icon: "M3 12a9 9 0 1015-6.7M3 4v5h5",
    accent: "violet",
  },
  {
    id: "whatsapp",
    title: "WhatsApp & messages",
    titleTe: "WhatsApp & మెసేజ్‌లు",
    blurb: "Broadcasts, new stock news, review requests, payment reminders.",
    blurbTe: "బ్రాడ్‌కాస్ట్, కొత్త స్టాక్ సమాచారం, రివ్యూ అడగడం, పేమెంట్ గుర్తు చేయడం.",
    icon: "M21 11.5a8.4 8.4 0 01-12.3 7.5L3 21l2-5.6A8.4 8.4 0 1121 11.5z",
    accent: "teal",
  },
  {
    id: "social",
    title: "Social media & ads",
    titleTe: "సోషల్ మీడియా & యాడ్స్",
    blurb: "Posts, reels, festival offers, and ads that do not waste money.",
    blurbTe: "పోస్ట్‌లు, రీల్స్, పండగ ఆఫర్లు, డబ్బు వృథా కాని యాడ్స్.",
    icon: "M4 10v4a1 1 0 001 1h3l5 4V5L8 9H5a1 1 0 00-1 1zM17.5 8.5a5 5 0 010 7",
    accent: "rose",
  },
  {
    id: "money",
    title: "Money, stock & accounts",
    titleTe: "డబ్బు, స్టాక్, లెక్కలు",
    blurb: "Read your own sale reports, find stuck stock, fix your rates.",
    blurbTe: "మీ సేల్ రిపోర్ట్ మీరే చదవండి, ఆగిపోయిన స్టాక్ కనిపెట్టండి, రేట్లు సరిచేయండి.",
    icon: "M12 3v18M8 7h6.5a2.5 2.5 0 010 5h-5a2.5 2.5 0 000 5H16",
    accent: "silver",
  },
  {
    id: "suppliers",
    title: "Suppliers & buying",
    titleTe: "సప్లయర్లు & కొనుగోలు",
    blurb: "Compare rates, ask for better terms, stop paying more than you should.",
    blurbTe: "రేట్లు పోల్చండి, మంచి టర్మ్స్ అడగండి, ఎక్కువ కట్టడం ఆపండి.",
    icon: "M4 7h12l2 5v5H4zM7 17a2 2 0 104 0 2 2 0 00-4 0zM14 17a2 2 0 104 0 2 2 0 00-4 0z",
    accent: "indigo",
  },
  {
    id: "staff",
    title: "Staff",
    titleTe: "పనివాళ్ళు",
    blurb: "Hiring, interview questions, training, and writing down how work is done.",
    blurbTe: "మనుషులు పెట్టుకోవడం, ఇంటర్వ్యూ ప్రశ్నలు, ట్రైనింగ్, పని ఎలా చేయాలో రాసి పెట్టడం.",
    icon: "M16 19v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2M9.5 9a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM21 19v-2a4 4 0 00-3-3.9",
    accent: "gold",
  },
  {
    id: "paperwork",
    title: "Office work & complaints",
    titleTe: "ఆఫీస్ పని & ఫిర్యాదులు",
    blurb: "Letters, replies, angry customers, and the paperwork nobody enjoys.",
    blurbTe: "లెటర్లు, రిప్లైలు, కోపంగా ఉన్న కస్టమర్లు, ఎవరికీ నచ్చని పేపర్ పని.",
    icon: "M7 4h10a1 1 0 011 1v15l-6-3-6 3V5a1 1 0 011-1z",
    accent: "violet",
  },
];

/* ---------- shared inputs ---------- */

const PROFILE_FIELDS = [
  {
    id: "businessName",
    label: "Your business name",
    labelTe: "మీ షాప్ / బిజినెస్ పేరు",
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
    label: "Your town or area",
    labelTe: "మీ ఊరు / ఏరియా",
    type: "text" as const,
    placeholder: "Vijayawada",
    placeholderTe: "విజయవాడ",
    fromProfile: "city" as const,
  },
];

const TONE_FIELD = {
  id: "tone",
  label: "How should it sound",
  labelTe: "ఎలా ఉండాలి",
  type: "select" as const,
  fromProfile: "tone" as const,
  options: [
    { value: "warm and respectful", label: "Warm and respectful", labelTe: "ఆప్యాయంగా, మర్యాదగా" },
    { value: "short and direct", label: "Short and direct", labelTe: "షార్ట్‌గా, నేరుగా" },
    { value: "friendly and casual", label: "Friendly and casual", labelTe: "ఫ్రెండ్లీగా, మామూలుగా" },
    { value: "formal and professional", label: "Formal and professional", labelTe: "ఫార్మల్‌గా" },
  ],
};

const SALES_FILE: RequiredFile = {
  id: "sales",
  name: "Your sales for the last 3 months",
  nameTe: "గత 3 నెలల సేల్స్",
  format: "Excel or CSV file",
  formatTe: "Excel లేదా CSV ఫైల్",
  why: "This is what the AI reads to tell you what is selling, what is not, and who your best customers are. Without it you only get general advice.",
  whyTe: "ఏది అమ్ముడవుతోంది, ఏది కాదు, మంచి కస్టమర్లు ఎవరు — ఇది చూసే AI చెప్తుంది. ఇది లేకపోతే మామూలు సలహా మాత్రమే వస్తుంది.",
  contains: ["Date", "Item name", "Quantity", "Amount", "Customer name (if you have it)"],
  containsTe: ["తేదీ", "ఐటమ్ పేరు", "ఎన్ని", "అమౌంట్", "కస్టమర్ పేరు (ఉంటే)"],
  howToGet: [
    {
      source: "Vyapar app",
      sourceTe: "Vyapar యాప్",
      steps: ["Open Vyapar", "Reports → Sale Report", "Set the date range to the last 3 months", "Tap the Excel icon on top and save the file"],
      stepsTe: ["Vyapar ఓపెన్ చేయండి", "Reports → Sale Report", "తేదీ రేంజ్ గత 3 నెలలు పెట్టండి", "పైన Excel గుర్తు నొక్కి ఫైల్ సేవ్ చేయండి"],
    },
    {
      source: "Tally",
      sourceTe: "Tally",
      steps: ["Gateway of Tally → Display → Account Books → Sales Register", "Choose the period", "Press Alt+E to export", "Pick Excel as the format"],
      stepsTe: ["Gateway of Tally → Display → Account Books → Sales Register", "పీరియడ్ సెలెక్ట్ చేయండి", "Alt+E నొక్కి ఎక్స్‌పోర్ట్ చేయండి", "ఫార్మాట్ Excel పెట్టండి"],
    },
    {
      source: "Notebook, no software",
      sourceTe: "నోట్‌బుక్, సాఫ్ట్‌వేర్ లేదు",
      steps: ["Open Google Sheets on your phone", "Make 4 columns: Date, Item, Quantity, Amount", "Type in even 30 recent bills — that is enough to start", "File → Download → CSV"],
      stepsTe: ["ఫోన్‌లో Google Sheets ఓపెన్ చేయండి", "4 కాలమ్స్ పెట్టండి: తేదీ, ఐటమ్, ఎన్ని, అమౌంట్", "ఇటీవలి 30 బిల్లులు కొట్టినా చాలు", "File → Download → CSV"],
    },
  ],
};

const CUSTOMER_LIST_FILE: RequiredFile = {
  id: "customers",
  name: "Your customer list",
  nameTe: "మీ కస్టమర్ల లిస్ట్",
  format: "Excel or CSV file",
  formatTe: "Excel లేదా CSV ఫైల్",
  why: "So each message uses the person's real name and what they last bought, instead of reading like a forward.",
  whyTe: "ప్రతి మెసేజ్‌లో వాళ్ళ పేరు, చివరిసారి కొన్నది ఉంటుంది — ఫార్వార్డ్ మెసేజ్‌లా అనిపించదు.",
  contains: ["Name", "Phone number", "What they last bought", "Last purchase date"],
  containsTe: ["పేరు", "ఫోన్ నంబర్", "చివరిసారి కొన్నది", "చివరి కొనుగోలు తేదీ"],
  howToGet: [
    {
      source: "Vyapar app",
      sourceTe: "Vyapar యాప్",
      steps: ["Open Vyapar", "Parties → All Parties", "Tap the menu, then Export to Excel"],
      stepsTe: ["Vyapar ఓపెన్ చేయండి", "Parties → All Parties", "మెనూ నొక్కి Export to Excel"],
    },
    {
      source: "Your phone contacts",
      sourceTe: "మీ ఫోన్ కాంటాక్ట్స్",
      steps: ["Google Contacts on a computer", "Select the customers you want", "Export → Google CSV"],
      stepsTe: ["కంప్యూటర్‌లో Google Contacts", "కావలసిన కస్టమర్లను సెలెక్ట్ చేయండి", "Export → Google CSV"],
    },
  ],
};

const STOCK_FILE: RequiredFile = {
  id: "stock",
  name: "Your current stock list",
  nameTe: "ఇప్పుడున్న స్టాక్ లిస్ట్",
  format: "Excel or CSV file",
  formatTe: "Excel లేదా CSV ఫైల్",
  why: "The AI compares what is sitting in your shop against what actually sold. That gap is where your money is stuck.",
  whyTe: "షాప్‌లో ఉన్నది, నిజంగా అమ్ముడైనది — ఈ తేడాలోనే మీ డబ్బు ఆగిపోయింది.",
  contains: ["Item name", "Quantity in hand", "Purchase rate", "Selling rate", "Date it came in"],
  containsTe: ["ఐటమ్ పేరు", "ఉన్న స్టాక్", "కొన్న రేటు", "అమ్మే రేటు", "వచ్చిన తేదీ"],
  howToGet: [
    {
      source: "Vyapar app",
      sourceTe: "Vyapar యాప్",
      steps: ["Reports → Stock Summary", "Export to Excel"],
      stepsTe: ["Reports → Stock Summary", "Export to Excel"],
    },
  ],
};

const PURCHASE_FILE: RequiredFile = {
  id: "purchases",
  name: "What you bought, and at what rate",
  nameTe: "మీరు కొన్నవి, ఏ రేటుకు కొన్నారు",
  format: "Excel, CSV, or photos of purchase bills",
  formatTe: "Excel, CSV, లేదా పర్చేజ్ బిల్లుల ఫోటోలు",
  why: "Without your actual buying rates the AI cannot tell you where you are overpaying — it will only guess.",
  whyTe: "మీ నిజమైన కొనుగోలు రేట్లు లేకపోతే ఎక్కడ ఎక్కువ కడుతున్నారో AI చెప్పలేదు — ఊహిస్తుంది అంతే.",
  contains: ["Supplier name", "Item", "Rate", "Quantity", "Date"],
  containsTe: ["సప్లయర్ పేరు", "ఐటమ్", "రేటు", "ఎన్ని", "తేదీ"],
  howToGet: [
    {
      source: "Vyapar app",
      sourceTe: "Vyapar యాప్",
      steps: ["Reports → Purchase Report", "Set the period", "Export to Excel"],
      stepsTe: ["Reports → Purchase Report", "పీరియడ్ పెట్టండి", "Export to Excel"],
    },
    {
      source: "Just photograph the bills",
      sourceTe: "బిల్లులు ఫోటో తీస్తే చాలు",
      steps: ["Lay the bills flat in good light", "Take a clear photo of each one", "Attach the photos in the chat — ChatGPT, Claude and Gemini all read bills from photos"],
      stepsTe: ["బిల్లులు మంచి వెలుతురులో పెట్టండి", "ఒక్కొక్కటి క్లియర్‌గా ఫోటో తీయండి", "చాట్‌లో ఫోటోలు జత చేయండి — ChatGPT, Claude, Gemini మూడూ బిల్లుల ఫోటో చదువుతాయి"],
    },
  ],
};

/* ---------- the prompts ---------- */

export const prompts: VyaparPrompt[] = [
  {
    slug: "find-customers-nearby",
    category: "customers",
    title: "Find businesses near me who could buy from me",
    titleTe: "నా దగ్గర కొనగలిగే బిజినెస్‌లు ఎక్కడున్నాయో కనిపెట్టండి",
    outcome: "A list of exactly which kinds of business to approach, where they sit in your area, and the first message for each.",
    outcomeTe: "ఏ రకం బిజినెస్‌ల దగ్గరికి వెళ్ళాలి, మీ ఏరియాలో అవి ఎక్కడున్నాయి, ఒక్కొక్కరికీ మొదటి మెసేజ్.",
    minutes: 8,
    businessTypes: ["all"],
    featured: true,
    fields: [...PROFILE_FIELDS,
      {
        id: "bestCustomer",
        label: "Describe your best customer today",
        labelTe: "ఇప్పుడున్న మీ బెస్ట్ కస్టమర్ గురించి చెప్పండి",
        type: "textarea",
        placeholder: "A 20-bed hospital that orders housekeeping supplies every month",
        placeholderTe: "ప్రతి నెలా హౌస్‌కీపింగ్ సామాను ఆర్డర్ చేసే 20 బెడ్ల హాస్పిటల్",
        help: "The more exact you are, the better the list. 'Everyone' gives you nothing.",
        helpTe: "ఎంత కరెక్ట్‌గా చెబితే లిస్ట్ అంత బాగుంటుంది. 'అందరూ' అంటే ఏమీ రాదు.",
        required: true,
      },
      {
        id: "radius",
        label: "How far can you serve?",
        labelTe: "ఎంత దూరం వరకు సప్లై చేయగలరు?",
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
2. For each type, tell me roughly where in my area they cluster, and how I would find them. Google Maps searches, local associations, trade bodies, markets — give me the actual search terms.
3. Rank them: which to approach first, based on how easy they are to reach and how much they would likely spend.
4. For the top 3, write me a first WhatsApp message in spoken Telugu. Short. No "Dear Sir, I hope this finds you well." Sound like a person from {{city}}, not a sales script.
5. Tell me what each type will most likely object to, and how to answer honestly.

Do not invent business names, phone numbers or addresses. Only give me categories and how to find them myself.`,
    tips: [
      "That last rule matters — AI will cheerfully invent phone numbers if you let it. Collect real contacts yourself",
      "Try the Google Maps search terms it gives you before trusting the list",
      "If a category feels wrong for your area, say so in the chat and ask for different ones",
    ],
    tipsTe: [
      "చివరి రూల్ ముఖ్యం — ఒదిలేస్తే AI ఫోన్ నంబర్లు కల్పించి చెప్తుంది. నిజమైన నంబర్లు మీరే సేకరించండి",
      "ఇచ్చిన Google Maps సెర్చ్ మాటలు ముందు ట్రై చేసి చూడండి",
      "ఏదైనా కేటగిరీ మీ ఏరియాకు సరిపోదంటే, చాట్‌లో చెప్పి వేరేవి అడగండి",
    ],
    bestWith: ["chatgpt", "gemini"],
  },

  {
    slug: "price-objection",
    category: "sell",
    title: "Answer the customer who says your rate is too high",
    titleTe: "'రేటు ఎక్కువ' అనే కస్టమర్‌కు ఏం చెప్పాలి",
    outcome: "Four different ways to answer, depending on why they are really saying it — plus when to simply let them walk.",
    outcomeTe: "వాళ్ళు ఎందుకు అలా అంటున్నారో బట్టి నాలుగు రకాల సమాధానాలు — ఎప్పుడు వదిలేయాలో కూడా.",
    minutes: 6,
    businessTypes: ["all"],
    featured: true,
    fields: [...PROFILE_FIELDS, TONE_FIELD,
      {
        id: "item",
        label: "Which item or service?",
        labelTe: "ఏ ఐటమ్ లేదా సర్వీస్?",
        type: "text",
        placeholder: "Copper wiring, 90 metre roll",
        placeholderTe: "కాపర్ వైరింగ్, 90 మీటర్ల రోల్",
        required: true,
      },
      {
        id: "yourRate",
        label: "Your rate",
        labelTe: "మీ రేటు",
        type: "text",
        placeholder: "₹4,200",
        placeholderTe: "₹4,200",
        required: true,
      },
      {
        id: "competitor",
        label: "What rate are they quoting you from elsewhere?",
        labelTe: "వేరేచోట ఎంత రేటు చెప్పారంటున్నారు?",
        type: "text",
        placeholder: "₹3,800",
        placeholderTe: "₹3,800",
      },
      {
        id: "better",
        label: "Why is yours actually better?",
        labelTe: "మీది నిజంగా ఎందుకు మంచిది?",
        type: "textarea",
        placeholder: "ISI mark, replacement if it fails, same-day delivery",
        placeholderTe: "ISI మార్క్, పాడైతే మార్చి ఇస్తాం, అదే రోజు డెలివరీ",
        help: "Be honest. If it is not actually better, the answer will be about terms instead of quality.",
        helpTe: "నిజం చెప్పండి. నిజంగా మంచిది కాకపోతే, క్వాలిటీ కాదు — టర్మ్స్ గురించి సమాధానం వస్తుంది.",
        required: true,
      },
    ],
    files: [],
    template: `I run {{businessName}} in {{city}}, selling {{sells}}.

A customer says my rate is too high.
Item: {{item}}
My rate: {{yourRate}}
Rate they claim to be getting elsewhere: {{competitor}}
Why mine is genuinely better: {{better}}

Give me four different replies in spoken Telugu, each {{tone}} and under 60 words:

1. If they genuinely cannot afford it — offer terms, a smaller quantity, or a lower option, without insulting them.
2. If they are comparing against something that is not the same quality — explain the difference in a way a normal person feels, not a spec sheet.
3. If they are just testing whether I will drop the rate — hold the rate without sounding arrogant.
4. If they are a big repeat customer worth protecting — what I can give that is not a discount.

For each, tell me how to recognise which situation I am actually in, from what the customer says or does.

Then tell me honestly: at what point should I let this customer go instead of chasing them? Give me a clear line.`,
    tips: [
      "Most 'too costly' is situation 3 — a test. Dropping the rate immediately teaches every customer to push you",
      "Situation 4 is where discounts quietly kill a business. Give extra service, longer credit, free delivery — not a lower rate",
      "The 'let them go' line is the most valuable part. Write it down and stick to it",
    ],
    tipsTe: [
      "'రేటు ఎక్కువ' అనేది చాలావరకు 3వ సిచ్యుయేషనే — టెస్ట్ చేస్తున్నారు. వెంటనే రేటు తగ్గిస్తే, ప్రతి కస్టమర్ అదే చేస్తారు",
      "4వ సిచ్యుయేషన్‌లోనే డిస్కౌంట్లు బిజినెస్‌ను మెల్లగా చంపేస్తాయి. ఎక్స్‌ట్రా సర్వీస్, ఎక్కువ టైమ్, ఫ్రీ డెలివరీ ఇవ్వండి — రేటు కాదు",
      "'వదిలేయాలి' అనే లైన్ చాలా విలువైనది. రాసి పెట్టుకుని దానికి కట్టుబడండి",
    ],
    bestWith: ["claude", "chatgpt"],
  },

  {
    slug: "quotation",
    category: "sell",
    title: "Write a quotation that gets accepted",
    titleTe: "ఒప్పుకునేలా కొటేషన్ రాయండి",
    outcome: "A clean quotation in Telugu and English, with the terms written so you do not get stuck later.",
    outcomeTe: "తెలుగు, ఇంగ్లీష్ రెండింట్లో క్లీన్ కొటేషన్ — తరువాత ఇబ్బంది రాకుండా టర్మ్స్‌తో.",
    minutes: 8,
    businessTypes: ["all"],
    fields: [...PROFILE_FIELDS,
      {
        id: "customer",
        label: "Who is it for?",
        labelTe: "ఎవరికి ఇస్తున్నారు?",
        type: "text",
        placeholder: "Sai Constructions, Guntur",
        placeholderTe: "సాయి కన్‌స్ట్రక్షన్స్, గుంటూరు",
        required: true,
      },
      {
        id: "work",
        label: "What is the work or the items?",
        labelTe: "పని ఏమిటి లేదా ఐటమ్స్ ఏమిటి?",
        type: "textarea",
        placeholder: "Wiring for a 3-floor building, material and labour",
        placeholderTe: "3 ఫ్లోర్ల బిల్డింగ్ వైరింగ్, మెటీరియల్ + లేబర్",
        required: true,
      },
      {
        id: "amount",
        label: "Your price",
        labelTe: "మీ రేటు",
        type: "text",
        placeholder: "₹2,40,000 plus GST",
        placeholderTe: "₹2,40,000 + GST",
        required: true,
      },
      {
        id: "terms",
        label: "Payment terms you want",
        labelTe: "మీకు కావలసిన పేమెంట్ టర్మ్స్",
        type: "text",
        placeholder: "40% advance, rest on completion",
        placeholderTe: "40% అడ్వాన్స్, మిగతాది పని అయ్యాక",
      },
    ],
    files: [
      {
        id: "oldquote",
        name: "An old quotation of yours",
        nameTe: "మీ పాత కొటేషన్ ఏదైనా",
        format: "A photo or PDF",
        formatTe: "ఫోటో లేదా PDF",
        why: "Attach one and the AI copies your existing format and wording instead of inventing a new one you then have to fix.",
        whyTe: "ఒకటి జత చేస్తే, మీ ఫార్మాట్, మీ భాషలోనే రాస్తుంది — కొత్తది కల్పించి మీరు మళ్ళీ సరిచేయాల్సిన పని ఉండదు.",
        optional: true,
        howToGet: [
          {
            source: "Just photograph it",
            sourceTe: "ఫోటో తీస్తే చాలు",
            steps: ["Take any old quotation you sent", "Photograph it in good light, or save the PDF", "Attach it in the chat"],
            stepsTe: ["మీరు గతంలో ఇచ్చిన ఏదైనా కొటేషన్ తీసుకోండి", "మంచి వెలుతురులో ఫోటో తీయండి, లేదా PDF సేవ్ చేయండి", "చాట్‌లో జత చేయండి"],
          },
        ],
      },
    ],
    template: `I run {{businessName}} in {{city}}, selling {{sells}}.

Write a quotation for: {{customer}}
Work or items: {{work}}
My price: {{amount}}
Payment terms I want: {{terms}}

Give me the quotation twice — once in English, once in spoken Telugu — with:
- A clear line-by-line breakdown, so they can see what they are paying for
- Validity period for the rate
- What is included and, more importantly, what is NOT included
- Payment terms stated plainly
- Delivery or completion time

Then tell me:
- Which two lines in this quotation are most likely to cause a dispute later, and how to word them tighter
- What I have forgotten to mention that businesses in my trade usually forget

If I attached an old quotation, follow its format and wording style rather than making your own.`,
    tips: [
      "The 'what is NOT included' section prevents most arguments. Never leave it out",
      "Attach one old quotation and everything afterwards comes out in your own format",
      "Always put a validity date. Rates move, and an old quotation will be waved at you a year later",
    ],
    tipsTe: [
      "'ఇందులో లేనివి' అనే భాగమే చాలా గొడవలు ఆపుతుంది. ఎప్పుడూ వదలకండి",
      "ఒక పాత కొటేషన్ జత చేస్తే, తరువాతవన్నీ మీ ఫార్మాట్‌లోనే వస్తాయి",
      "వాలిడిటీ తేదీ తప్పకుండా పెట్టండి. రేట్లు మారతాయి, సంవత్సరం తరువాత పాత కొటేషన్ చూపిస్తారు",
    ],
    bestWith: ["claude", "chatgpt"],
  },

  {
    slug: "festival-offer",
    category: "sell",
    title: "Plan a festival offer that does not kill your margin",
    titleTe: "మార్జిన్ పోకుండా పండగ ఆఫర్ ప్లాన్ చేయండి",
    outcome: "An offer with the maths shown, the messages to announce it, and what to stock before it starts.",
    outcomeTe: "లెక్కలతో సహా ఆఫర్, ప్రకటించే మెసేజ్‌లు, ముందుగా ఏం స్టాక్ పెట్టాలి.",
    minutes: 12,
    businessTypes: ["kirana", "clothes", "jewellery", "electronics", "hotel", "salon", "tailoring", "medical", "hardware"],
    fields: [...PROFILE_FIELDS,
      {
        id: "festival",
        label: "Which festival or occasion?",
        labelTe: "ఏ పండగ లేదా సందర్భం?",
        type: "text",
        placeholder: "Sankranti",
        placeholderTe: "సంక్రాంతి",
        required: true,
      },
      {
        id: "margin",
        label: "Your usual margin",
        labelTe: "మీ మామూలు మార్జిన్",
        type: "text",
        placeholder: "About 25%",
        placeholderTe: "సుమారు 25%",
        help: "Roughly is fine. Without it you will get discounts that lose you money.",
        helpTe: "సుమారుగా చెప్పినా చాలు. ఇది లేకపోతే నష్టం వచ్చే డిస్కౌంట్లు చెప్తుంది.",
        required: true,
      },
      {
        id: "goal",
        label: "What do you want out of this offer?",
        labelTe: "ఈ ఆఫర్ వల్ల మీకు ఏం కావాలి?",
        type: "select",
        options: [
          { value: "more new customers, even at low profit", label: "New customers", labelTe: "కొత్త కస్టమర్లు" },
          { value: "clear old stock", label: "Clear old stock", labelTe: "పాత స్టాక్ క్లియర్ కావాలి" },
          { value: "higher bill value from existing customers", label: "Bigger bills", labelTe: "బిల్లు అమౌంట్ పెరగాలి" },
          { value: "cash in hand quickly", label: "Quick cash", labelTe: "వెంటనే డబ్బు కావాలి" },
        ],
        required: true,
      },
    ],
    files: [{ ...SALES_FILE, optional: true }],
    template: `I run {{businessName}} in {{city}}, selling {{sells}}.
My usual margin is {{margin}}. For {{festival}}, what I want is: {{goal}}

Design the offer for me.

1. Three different offer structures that fit my goal. For each, show the maths: what I give up per sale, how many extra sales I need just to break even, and what I make if it works.
2. Say clearly which one you recommend and why, given my margin.
3. Tell me what could go wrong with each — including customers who would have paid full rate anyway.
4. What I should stock up on before {{festival}}, based on what people in Andhra Pradesh and Telangana actually buy for it.
5. A WhatsApp message, an Instagram caption and a shop banner line — all in spoken Telugu, all short.
6. When to start and stop the offer, and why those dates.

Do not suggest a discount that puts me below cost. If my margin is too thin for a discount at all, say so and suggest something else — a combo, a free add-on, longer credit.`,
    tips: [
      "Point 6 matters: an offer with no end date teaches customers to wait for the next one",
      "Combos usually beat straight discounts when your margin is thin",
      "Write down what you spent and what came in. Next year this prompt gets much sharper with last year's numbers attached",
    ],
    tipsTe: [
      "6వ పాయింట్ ముఖ్యం: ముగింపు తేదీ లేని ఆఫర్ — తరువాతి ఆఫర్ కోసం ఎదురుచూడటం కస్టమర్లకు నేర్పుతుంది",
      "మార్జిన్ తక్కువగా ఉన్నప్పుడు సింపుల్ డిస్కౌంట్ కంటే కాంబో ఆఫర్లే మేలు",
      "ఎంత ఖర్చయింది, ఎంత వచ్చిందో రాసి పెట్టండి. వచ్చే ఏడాది ఆ లెక్కలతో ఇది చాలా బాగా పని చేస్తుంది",
    ],
    bestWith: ["claude", "chatgpt"],
  },

  {
    slug: "whatsapp-followup",
    category: "repeat",
    title: "WhatsApp the customers who stopped coming",
    titleTe: "రావడం మానేసిన కస్టమర్లకు WhatsApp",
    outcome: "A personal message for each customer who has gone quiet — in Telugu, using their name and what they bought last.",
    outcomeTe: "చాలా రోజులుగా రాని ప్రతి కస్టమర్‌కు ఒక పర్సనల్ మెసేజ్ — తెలుగులో, వాళ్ళ పేరు, చివరిసారి కొన్నదానితో.",
    minutes: 10,
    businessTypes: ["all"],
    featured: true,
    fields: [...PROFILE_FIELDS, TONE_FIELD,
      {
        id: "gap",
        label: "After how many months do you count someone as lost?",
        labelTe: "ఎన్ని నెలలు రాకపోతే పోయినట్టు లెక్క?",
        type: "number",
        placeholder: "3",
        placeholderTe: "3",
        required: true,
      },
      {
        id: "offer",
        label: "Any offer to mention? (leave blank if none)",
        labelTe: "చెప్పాల్సిన ఆఫర్ ఏదైనా ఉందా? (లేకపోతే ఖాళీ)",
        type: "text",
        placeholder: "10% off this week on fans",
        placeholderTe: "ఈ వారం ఫ్యాన్లపై 10% తగ్గింపు",
      },
    ],
    files: [CUSTOMER_LIST_FILE],
    template: `You are helping {{businessName}}, a business in {{city}} that sells {{sells}}.

I am attaching a file with my customer list.

Find every customer who has not bought anything in the last {{gap}} months.

For each one, write a WhatsApp message in spoken Telugu that:
- uses their name
- mentions what they bought from us last time, naturally, not like reading out a record
- sounds {{tone}}
- is under 60 words, because nobody reads long WhatsApp messages
- does not beg, guilt, or over-apologise for being out of touch
{{offer|- mention this offer naturally: }}

Write it the way a shop owner in {{city}} actually talks. Use the English words people really use when speaking Telugu — ఆఫర్, స్టాక్, డెలివరీ — instead of translating them. Avoid formal written Telugu nobody speaks.

Give me the result as a table: Name, Phone, Message.
Then tell me which 5 customers are worth a phone call instead of a message, and why.`,
    tips: [
      "Send 20 a day by hand, not 200 at once — WhatsApp blocks numbers that blast messages",
      "Read the first five before sending any. If one sounds wrong, tell the AI what felt off and ask again",
      "The five phone-call names are usually your biggest accounts. Call those yourself",
    ],
    tipsTe: [
      "ఒకేసారి 200 కాదు — రోజుకు 20 చేతితో పంపండి. ఒకేసారి పంపితే WhatsApp నంబర్ బ్లాక్ చేస్తుంది",
      "పంపే ముందు మొదటి ఐదు చదవండి. ఏదైనా తేడాగా అనిపిస్తే AI కి చెప్పి మళ్ళీ అడగండి",
      "ఫోన్ చేయమన్న ఐదుగురూ సాధారణంగా మీ పెద్ద పార్టీలే. వాళ్ళకు మీరే కాల్ చేయండి",
    ],
    bestWith: ["chatgpt", "claude"],
  },

  {
    slug: "whatsapp-new-stock",
    category: "whatsapp",
    title: "Tell customers new stock has arrived",
    titleTe: "కొత్త స్టాక్ వచ్చిందని కస్టమర్లకు చెప్పండి",
    outcome: "A short broadcast message plus separate versions for the customers who actually buy that item.",
    outcomeTe: "ఒక షార్ట్ బ్రాడ్‌కాస్ట్ మెసేజ్, అలాగే ఆ ఐటమ్ కొనే కస్టమర్లకు ప్రత్యేక వెర్షన్లు.",
    minutes: 5,
    businessTypes: ["all"],
    fields: [...PROFILE_FIELDS, TONE_FIELD,
      {
        id: "newStock",
        label: "What has come in?",
        labelTe: "ఏం వచ్చింది?",
        type: "textarea",
        placeholder: "New Diwali collection sarees, 40 designs, ₹1,200 to ₹6,000",
        placeholderTe: "కొత్త దీపావళి కలెక్షన్ చీరలు, 40 డిజైన్లు, ₹1,200 నుంచి ₹6,000",
        required: true,
      },
    ],
    files: [
      {
        id: "stockphotos",
        name: "Photos of the new stock",
        nameTe: "కొత్త స్టాక్ ఫోటోలు",
        format: "Photos from your phone",
        formatTe: "మీ ఫోన్ ఫోటోలు",
        why: "Show it the actual photos and the message describes what is really in them — colour, design, how it looks — instead of generic lines.",
        whyTe: "నిజమైన ఫోటోలు చూపిస్తే, అందులో ఉన్నదాని గురించే రాస్తుంది — కలర్, డిజైన్, ఎలా ఉంది — మామూలు మాటలు కాదు.",
        optional: true,
        howToGet: [
          {
            source: "Your phone",
            sourceTe: "మీ ఫోన్",
            steps: ["Photograph the new items in daylight, plain background", "4 or 5 photos is enough", "Attach them in the chat"],
            stepsTe: ["పగటి వెలుతురులో, ప్లెయిన్ బ్యాక్‌గ్రౌండ్‌లో ఫోటోలు తీయండి", "4-5 ఫోటోలు చాలు", "చాట్‌లో జత చేయండి"],
          },
        ],
      },
      { ...CUSTOMER_LIST_FILE, optional: true },
    ],
    template: `I run {{businessName}} in {{city}}, selling {{sells}}.

New stock has arrived: {{newStock}}

If I attached photos, look at them and describe what is actually there — colours, designs, what stands out — instead of writing in general terms.

Give me:
1. One broadcast message in spoken Telugu, under 40 words, {{tone}}. Something people will actually read, not skip.
2. A shorter version for WhatsApp Status — under 15 words.
3. If I attached my customer list: pick the customers most likely to want THIS item based on what they bought before, and write a personal message for each one. Give it as a table: Name, Phone, Message.
4. Three things I could say that would make someone come to the shop this week rather than "sometime."

Rules:
- No ALL CAPS, no rows of emojis, no "hurry up limited stock" if it is not true.
- Use the English words Telugu speakers really use — కలెక్షన్, డిజైన్, స్టాక్, రేంజ్.
- Mention the price range. Messages that hide the rate get ignored.`,
    tips: [
      "Point 3 is the one that sells. A broadcast to everyone gets ignored; eight personal messages do not",
      "Mention the price range. People assume expensive when you hide it",
      "Put the same message on Status — many customers read Status who never reply to messages",
    ],
    tipsTe: [
      "3వ పాయింట్ వల్లే అమ్మకం జరుగుతుంది. అందరికీ బ్రాడ్‌కాస్ట్ పంపితే ఎవరూ చూడరు, ఎనిమిది పర్సనల్ మెసేజ్‌లు పని చేస్తాయి",
      "రేంజ్ చెప్పండి. రేటు దాస్తే ఖరీదు అనుకుంటారు",
      "అదే మెసేజ్ స్టేటస్‌లో కూడా పెట్టండి — రిప్లై ఇవ్వని చాలామంది స్టేటస్ చూస్తారు",
    ],
    bestWith: ["chatgpt", "gemini"],
  },

  {
    slug: "google-review-request",
    category: "whatsapp",
    title: "Ask happy customers for a Google review",
    titleTe: "సంతోషంగా ఉన్న కస్టమర్లను Google రివ్యూ అడగండి",
    outcome: "A message that actually gets reviews written, plus what to do about the bad ones already there.",
    outcomeTe: "నిజంగా రివ్యూలు రాయించే మెసేజ్, అలాగే ఇప్పటికే ఉన్న చెడ్డ రివ్యూలకు ఏం చేయాలో.",
    minutes: 5,
    businessTypes: ["all"],
    fields: [...PROFILE_FIELDS, TONE_FIELD,
      {
        id: "reviewLink",
        label: "Your Google review link",
        labelTe: "మీ Google రివ్యూ లింక్",
        type: "text",
        placeholder: "Paste it here",
        placeholderTe: "ఇక్కడ పేస్ట్ చేయండి",
        help: "Google Business Profile → Ask for reviews → copy the link.",
        helpTe: "Google Business Profile → Ask for reviews → లింక్ కాపీ చేయండి.",
      },
    ],
    files: [
      {
        id: "badreview",
        name: "Screenshot of a bad review you received",
        nameTe: "మీకు వచ్చిన చెడ్డ రివ్యూ స్క్రీన్‌షాట్",
        format: "A screenshot",
        formatTe: "స్క్రీన్‌షాట్",
        why: "Attach it and you also get a reply written for it. A bad review answered well does more good than ten silent five-star ones.",
        whyTe: "జత చేస్తే దానికి రిప్లై కూడా రాసి ఇస్తుంది. చెడ్డ రివ్యూకు మంచి సమాధానం ఇస్తే, పది మౌనమైన 5-స్టార్ రివ్యూల కంటే ఎక్కువ పని చేస్తుంది.",
        optional: true,
        howToGet: [
          {
            source: "Your phone",
            sourceTe: "మీ ఫోన్",
            steps: ["Open Google Maps and find your shop", "Go to the reviews", "Screenshot the one you want answered", "Attach it in the chat"],
            stepsTe: ["Google Maps ఓపెన్ చేసి మీ షాప్ వెతకండి", "రివ్యూలకు వెళ్ళండి", "సమాధానం కావాల్సిన దానికి స్క్రీన్‌షాట్ తీయండి", "చాట్‌లో జత చేయండి"],
          },
        ],
      },
    ],
    template: `I run {{businessName}} in {{city}}, selling {{sells}}.

I want more Google reviews from customers who are already happy.
My review link: {{reviewLink}}

Give me:
1. A WhatsApp message in spoken Telugu, {{tone}}, under 35 words, asking for a review. It must not sound like begging and must not promise anything in return.
2. A different version for a customer who has been coming for years.
3. A line my staff can say at the counter, in Telugu, right after a customer says they are happy.
4. The best moment to send it — tell me exactly when, not "soon after purchase."

If I attached a screenshot of a bad review, also:
5. Read it and write a public reply in Telugu and English. Do not argue, do not make excuses, do not repeat their complaint back at them. Say what we will do.
6. Tell me whether this review is worth replying to at all, honestly.

Never offer a discount or gift in exchange for a review. That is against Google's rules and it shows in the writing.`,
    tips: [
      "Timing beats wording. Ask within an hour of a customer saying they are happy, not days later",
      "Never pay for reviews, in cash or discounts. Google removes them and can penalise your listing",
      "Reply to every bad review within a day. New customers read your replies more closely than the reviews",
    ],
    tipsTe: [
      "మాటల కంటే టైమింగ్ ముఖ్యం. కస్టమర్ సంతోషం చెప్పిన గంటలోపే అడగండి, రోజుల తరువాత కాదు",
      "రివ్యూల కోసం డబ్బు గానీ డిస్కౌంట్ గానీ ఇవ్వకండి. Google తీసేస్తుంది, లిస్టింగ్‌కు నష్టం కూడా",
      "చెడ్డ రివ్యూకు ఒక్క రోజులో సమాధానం ఇవ్వండి. కొత్త కస్టమర్లు రివ్యూల కంటే మీ రిప్లైలే శ్రద్ధగా చదువుతారు",
    ],
    bestWith: ["chatgpt", "claude"],
  },

  {
    slug: "month-of-posts",
    category: "social",
    title: "One month of social media posts in one sitting",
    titleTe: "ఒకేసారి కూర్చుని నెల రోజుల పోస్ట్‌లు",
    outcome: "30 days of posts with Telugu captions, which photo to take for each, and the best day to put it up.",
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
          { value: "all of them", label: "All of them", labelTe: "అన్నింట్లో" },
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
        help: "So the festivals and local events in that month get included.",
        helpTe: "ఆ నెలలో వచ్చే పండగలు, లోకల్ ఈవెంట్లు కలపడానికి.",
        required: true,
      },
    ],
    files: [
      {
        id: "photos",
        name: "A few photos of your shop, products or team",
        nameTe: "మీ షాప్, ఐటమ్స్, టీమ్ ఫోటోలు",
        format: "Photos from your phone",
        formatTe: "మీ ఫోన్ ఫోటోలు",
        why: "Shown the real thing, it writes captions about what is actually in the picture instead of generic lines.",
        whyTe: "నిజమైనది చూపిస్తే, ఫోటోలో ఉన్నదాని గురించే క్యాప్షన్ రాస్తుంది — మామూలు మాటలు కాదు.",
        optional: true,
        howToGet: [
          {
            source: "Your phone",
            sourceTe: "మీ ఫోన్",
            steps: ["Take 5-10 photos in daylight", "Shop front, your busiest shelf, the team working, your top item", "Attach them in the chat"],
            stepsTe: ["పగటి వెలుతురులో 5-10 ఫోటోలు తీయండి", "షాప్ ముందు, బాగా అమ్ముడయ్యే రాక్, పని చేస్తున్న టీమ్, టాప్ ఐటమ్", "చాట్‌లో జత చేయండి"],
          },
        ],
      },
    ],
    template: `I run {{businessName}} in {{city}}. We sell {{sells}}.
I post on {{platform}}. Plan {{month}} for me.

Give me 30 posts. For each one:
- Day number and the best day of the week to post it
- A caption in spoken Telugu that sounds {{tone}} — written for people in {{city}}, not translated from English
- Exactly what photo or video to take, described so my staff could shoot it without me
- 5 hashtags, mixing Telugu and English the way people here actually search

Mix the types so it does not turn into one long advertisement:
- about 10 showing products or work
- about 6 useful tips my customers would want even if they never buy
- about 5 behind the scenes — staff, deliveries, an ordinary morning
- about 4 customer stories or reviews
- about 5 tied to festivals and events falling in {{month}} in Andhra Pradesh and Telangana

Lay it out as a table I can print and hand to whoever does the posting.
Keep captions under 40 words. Nobody reads more on a phone.`,
    tips: [
      "Shoot a whole week of photos on one Sunday. The writing is never the bottleneck — the photos are",
      "Keep the festival posts and reuse them next year with new pictures",
      "If a caption sounds like a translated English advertisement, it is. Ask for it again in spoken Telugu",
    ],
    tipsTe: [
      "ఆదివారం ఒకేసారి వారం ఫోటోలు తీయండి. రాయడం ఎప్పుడూ ఆలస్యం కాదు — ఫోటోలే",
      "పండగ పోస్ట్‌లు దాచి వచ్చే ఏడాది కొత్త ఫోటోలతో వాడండి",
      "క్యాప్షన్ ట్రాన్స్‌లేట్ చేసిన ఇంగ్లీష్ యాడ్‌లా అనిపిస్తే, అది అదే. మాట్లాడే తెలుగులో మళ్ళీ అడగండి",
    ],
    bestWith: ["chatgpt", "claude"],
  },

  {
    slug: "monthly-sales-review",
    category: "money",
    title: "Read my sales and tell me what is actually happening",
    titleTe: "నా సేల్స్ చూసి నిజంగా ఏం జరుగుతోందో చెప్పండి",
    outcome: "A plain-Telugu summary of what sold, what died, which month was weak, and three things to change next month.",
    outcomeTe: "ఏది అమ్ముడైంది, ఏది ఆగిపోయింది, ఏ నెల వీక్‌గా ఉంది, వచ్చే నెల మార్చాల్సిన మూడు విషయాలు.",
    minutes: 12,
    businessTypes: ["all"],
    featured: true,
    fields: [...PROFILE_FIELDS,
      {
        id: "worry",
        label: "What is worrying you most right now?",
        labelTe: "ఇప్పుడు మిమ్మల్ని ఎక్కువగా బాధపెడుతున్నది ఏమిటి?",
        type: "textarea",
        placeholder: "Sales look fine but there is never money in hand",
        placeholderTe: "సేల్స్ బాగానే ఉన్నాయి కానీ చేతిలో డబ్బు ఉండట్లేదు",
        help: "Say it the way you would to a friend. This shapes the whole answer.",
        helpTe: "ఫ్రెండ్‌తో చెప్పినట్టే చెప్పండి. సమాధానం అంతా దీని మీదే ఆధారపడుతుంది.",
        required: true,
      },
    ],
    files: [SALES_FILE],
    template: `You are a straight-talking business advisor for {{businessName}}, a {{sells}} business in {{city}}.

I am attaching my sales data for the last 3 months.

What is on my mind: {{worry}}

Read the data and tell me:
1. My top 10 items by revenue, and separately my top 10 by profit if the data allows it. Say clearly if it does not.
2. Items that have barely moved — the money sitting still in my shop.
3. Which weeks or months were weak, and what the data suggests about why.
4. Anything surprising that I would probably not have noticed myself.
5. Three specific things to do next month. Not advice like "improve marketing" — tell me what to do, to which item, at what rate.

Rules:
- Explain in spoken Telugu. Someone who never went to business school should understand every line.
- No jargon. If you must use a business term, explain it in the same sentence.
- If the data is incomplete or looks wrong, say so plainly instead of guessing.
- Give rupee figures, not just percentages.`,
    tips: [
      "Ask follow-up questions in the same chat — 'why did October drop?' — it still has your data",
      "If the answer feels generic, your file is probably missing item names or amounts",
      "Do this on the 1st of every month and keep the answers. The pattern across months is worth more than any single month",
    ],
    tipsTe: [
      "అదే చాట్‌లో మళ్ళీ అడగండి — 'అక్టోబర్ ఎందుకు తగ్గింది?' — డేటా ఇంకా దాని దగ్గరే ఉంటుంది",
      "సమాధానం మామూలుగా అనిపిస్తే, మీ ఫైల్‌లో ఐటమ్ పేర్లు లేదా అమౌంట్లు లేవేమో చూడండి",
      "ప్రతి నెల 1వ తేదీన ఇది చేసి సమాధానాలు దాచండి. నెలల మధ్య కనిపించే తీరు ఒక్క నెల కంటే విలువైనది",
    ],
    bestWith: ["claude", "chatgpt"],
  },

  {
    slug: "dead-stock-clearance",
    category: "money",
    title: "Turn stuck stock back into cash",
    titleTe: "ఆగిపోయిన స్టాక్‌ను తిరిగి డబ్బుగా మార్చండి",
    outcome: "What is stuck, how much cash it is holding, and a clearance plan with rates that still leave you something.",
    outcomeTe: "ఏది ఆగిపోయింది, ఎంత డబ్బు ఇరుక్కుంది, కొంతైనా మిగిలేలా క్లియరెన్స్ ప్లాన్.",
    minutes: 15,
    businessTypes: ["kirana", "clothes", "jewellery", "electronics", "hardware", "medical", "agri", "mill", "tailoring"],
    fields: [...PROFILE_FIELDS,
      {
        id: "cashNeeded",
        label: "How much cash do you want to free up?",
        labelTe: "ఎంత డబ్బు బయటికి తీయాలి?",
        type: "text",
        placeholder: "₹2,00,000",
        placeholderTe: "₹2,00,000",
      },
      {
        id: "minMargin",
        label: "Lowest margin you will accept",
        labelTe: "మీరు ఒప్పుకునే మినిమమ్ మార్జిన్",
        type: "text",
        placeholder: "5%",
        placeholderTe: "5%",
        help: "Below this you would rather keep the stock.",
        helpTe: "దీనికంటే తక్కువైతే స్టాక్ ఉంచుకోవడమే మేలు.",
      },
    ],
    files: [STOCK_FILE, { ...SALES_FILE, optional: true }],
    template: `You are helping {{businessName}} in {{city}}, which sells {{sells}}.

I am attaching my current stock list, and my sales data if available.

I want to free up about {{cashNeeded}} in cash. I will not sell below {{minMargin}} margin.

Work out:
1. Which items have not sold, or sold very slowly, compared with how much stock I am holding.
2. How much cash is tied up in each of those items, at purchase rate.
3. A clearance rate for each that stays above my minimum margin — show the maths.
4. Which items I should simply stop reordering, kept separate from the ones to discount.
5. A realistic order to clear them in, over the next 6 weeks.

Also write me two short Telugu WhatsApp messages to announce the clearance — one for regular customers, one for a broadcast list.

Be honest: if an item is not worth discounting and I should just accept the loss, say so.`,
    tips: [
      "Start with the biggest cash-stuck items, not the most items",
      "If something has not moved in a year, the discount that clears it is almost always bigger than feels comfortable",
      "Keep one piece of anything you might be asked for again, even after clearing the rest",
    ],
    tipsTe: [
      "ఎక్కువ ఐటమ్స్ కాదు — ఎక్కువ డబ్బు ఇరుక్కున్న వాటితో మొదలుపెట్టండి",
      "ఏడాదిగా కదలని ఐటమ్‌కు, క్లియర్ అయ్యే డిస్కౌంట్ మనకు నచ్చే దానికంటే ఎప్పుడూ ఎక్కువే",
      "మిగతావి అమ్మేసినా, మళ్ళీ ఎవరైనా అడిగే అవకాశం ఉన్న ఐటమ్ ఒకటి ఉంచుకోండి",
    ],
    bestWith: ["claude"],
  },

  {
    slug: "supplier-negotiation",
    category: "suppliers",
    title: "Get a better rate from your supplier",
    titleTe: "సప్లయర్ దగ్గర మంచి రేటు రాబట్టండి",
    outcome: "Where you are overpaying, what to ask for, and the exact words to ask with — without souring the relationship.",
    outcomeTe: "ఎక్కడ ఎక్కువ కడుతున్నారు, ఏం అడగాలి, ఎలా అడగాలి — సంబంధం చెడకుండా.",
    minutes: 12,
    businessTypes: ["all"],
    fields: [...PROFILE_FIELDS,
      {
        id: "supplier",
        label: "Which supplier?",
        labelTe: "ఏ సప్లయర్?",
        type: "text",
        placeholder: "Our main cement dealer, 6 years with them",
        placeholderTe: "మా మెయిన్ సిమెంట్ డీలర్, 6 ఏళ్ళుగా",
        required: true,
      },
      {
        id: "spend",
        label: "Roughly how much do you buy from them a month?",
        labelTe: "నెలకు సుమారు ఎంత కొంటారు?",
        type: "text",
        placeholder: "₹3,00,000",
        placeholderTe: "₹3,00,000",
        required: true,
      },
      {
        id: "want",
        label: "What do you want from them?",
        labelTe: "వాళ్ళ దగ్గర నుంచి ఏం కావాలి?",
        type: "select",
        options: [
          { value: "a lower rate", label: "Lower rate", labelTe: "తక్కువ రేటు" },
          { value: "longer credit days", label: "More credit days", labelTe: "ఎక్కువ క్రెడిట్ రోజులు" },
          { value: "faster or free delivery", label: "Better delivery", labelTe: "మంచి డెలివరీ" },
          { value: "return or replacement on unsold stock", label: "Returns on unsold stock", labelTe: "అమ్ముడుకాని స్టాక్ వాపసు" },
        ],
        required: true,
      },
    ],
    files: [PURCHASE_FILE],
    template: `I run {{businessName}} in {{city}}, selling {{sells}}.

My supplier: {{supplier}}
I buy roughly {{spend}} from them each month.
What I want: {{want}}

I am attaching my purchase records (or photos of my purchase bills).

1. Read my buying rates. Where do they look high for my trade and my volume? Say clearly if you cannot tell from this data.
2. Based on how much I buy, what is a fair thing to ask for? Do not tell me to demand something unreasonable — I need this supplier.
3. Write out exactly what to say, in spoken Telugu, as if I am speaking to them on the phone. Give me the opening line, what to say when they say no, and how to close.
4. What can I offer them in return that costs me little? Faster payment, bigger single orders, a yearly commitment.
5. What are the signs that I should quietly start looking for a second supplier?

Do not suggest I bluff about a competitor's rate. If I get caught, I lose the relationship and my credit line with it.`,
    tips: [
      "Never bluff about a rival's rate in a small market. It gets back to them the same week",
      "Faster payment is the cheapest thing you can offer — suppliers value it more than volume",
      "Ask for credit days before asking for rate. It is easier for them to give and often worth more to you",
    ],
    tipsTe: [
      "చిన్న మార్కెట్‌లో వేరేవాళ్ళ రేటు గురించి అబద్ధం చెప్పకండి. ఆ వారంలోనే వాళ్ళకు తెలిసిపోతుంది",
      "తొందరగా పేమెంట్ ఇవ్వడం — మీకు అతి తక్కువ ఖర్చుతో ఇవ్వగలిగేది. వాల్యూమ్ కంటే సప్లయర్లకు ఇదే ఎక్కువ విలువ",
      "రేటు అడిగే ముందు క్రెడిట్ రోజులు అడగండి. వాళ్ళకు ఇవ్వడం సులభం, మీకు విలువ ఎక్కువ",
    ],
    bestWith: ["claude", "chatgpt"],
  },

  {
    slug: "hire-and-interview",
    category: "staff",
    title: "Write the job post and the interview questions",
    titleTe: "జాబ్ పోస్ట్, ఇంటర్వ్యూ ప్రశ్నలు రాయండి",
    outcome: "A job post for WhatsApp groups, interview questions that show real ability, and a simple scoring sheet.",
    outcomeTe: "WhatsApp గ్రూపులకు జాబ్ పోస్ట్, నిజమైన సత్తా తెలిసే ఇంటర్వ్యూ ప్రశ్నలు, సింపుల్ స్కోరింగ్ షీట్.",
    minutes: 10,
    businessTypes: ["all"],
    fields: [...PROFILE_FIELDS,
      {
        id: "role",
        label: "What is the job?",
        labelTe: "ఏ పని?",
        type: "text",
        placeholder: "Counter sales and billing",
        placeholderTe: "కౌంటర్ సేల్స్, బిల్లింగ్",
        required: true,
      },
      {
        id: "salary",
        label: "Salary you can pay",
        labelTe: "ఇవ్వగలిగే జీతం",
        type: "text",
        placeholder: "₹15,000 to ₹18,000 a month",
        placeholderTe: "నెలకు ₹15,000 నుంచి ₹18,000",
      },
      {
        id: "dealbreaker",
        label: "What goes wrong when you hire the wrong person?",
        labelTe: "తప్పు మనిషిని పెట్టుకుంటే ఏం జరుగుతుంది?",
        type: "textarea",
        placeholder: "They cannot handle a rush and customers walk out",
        placeholderTe: "రద్దీ టైమ్‌లో తట్టుకోలేరు, కస్టమర్లు వెళ్ళిపోతారు",
        help: "The interview questions get built to catch exactly this.",
        helpTe: "ఇదే పట్టుకోవడానికి ఇంటర్వ్యూ ప్రశ్నలు తయారవుతాయి.",
        required: true,
      },
    ],
    files: [],
    template: `I run {{businessName}} in {{city}}, selling {{sells}}.
I am hiring for: {{role}}. I can pay {{salary}}.

When I hire the wrong person, this is what happens: {{dealbreaker}}

Give me:

1. A job post in spoken Telugu for WhatsApp groups and local notice boards. Short enough to read on a phone. Honest about the work — no "exciting opportunity with a dynamic team."

2. Ten interview questions that would actually reveal whether someone can do this job. Not "what is your greatest weakness." Questions about real situations from {{role}} in a business like mine.

3. For each question, what a good answer sounds like and what a worrying one sounds like.

4. A practical task I can set in 15 minutes during the interview that shows me their ability directly.

5. A one-page scoring sheet I can print, so if two of us interview we judge on the same things.

Write everything in Telugu except the job words people expect in English.`,
    tips: [
      "The 15-minute task tells you more than the whole interview. Make everyone do it",
      "Score immediately after each person leaves, not at the end of the day",
      "Be honest about the hard parts in the job post. Someone who quits in a month costs more than an empty chair",
    ],
    tipsTe: [
      "15 నిమిషాల పని మొత్తం ఇంటర్వ్యూ కంటే ఎక్కువ చెప్తుంది. అందరికీ పెట్టండి",
      "రోజు చివర కాదు — ప్రతి ఒక్కరూ వెళ్ళిన వెంటనే స్కోర్ రాయండి",
      "ప్రకటనలో కష్టమైన భాగాల గురించి నిజం చెప్పండి. నెలలో మానేసేవాళ్ళు ఖాళీ కుర్చీ కంటే ఖరీదు",
    ],
    bestWith: ["claude", "chatgpt"],
  },

  {
    slug: "complaint-reply",
    category: "paperwork",
    title: "Reply to an angry customer without losing them",
    titleTe: "కోపంగా ఉన్న కస్టమర్‌ను పోగొట్టుకోకుండా సమాధానం",
    outcome: "Three versions of a reply — one to send now, one if they are right, one if they are not — plus what to fix inside.",
    outcomeTe: "మూడు రకాల రిప్లైలు — ఇప్పుడే పంపేది, వాళ్ళది కరెక్ట్ అయితే, కాకపోతే — లోపల ఏం సరిచేయాలో కూడా.",
    minutes: 5,
    businessTypes: ["all"],
    fields: [...PROFILE_FIELDS, TONE_FIELD,
      {
        id: "complaint",
        label: "Paste what the customer said",
        labelTe: "కస్టమర్ ఏమన్నారో ఇక్కడ పేస్ట్ చేయండి",
        type: "textarea",
        placeholder: "Paste their WhatsApp message, review or email here",
        placeholderTe: "వాళ్ళ WhatsApp మెసేజ్, రివ్యూ లేదా ఈమెయిల్ ఇక్కడ పెట్టండి",
        required: true,
      },
      {
        id: "truth",
        label: "Between us — was it our mistake?",
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
    files: [
      {
        id: "screenshot",
        name: "Screenshot of the complaint",
        nameTe: "ఫిర్యాదు స్క్రీన్‌షాట్",
        format: "A screenshot",
        formatTe: "స్క్రీన్‌షాట్",
        why: "Attach it instead of typing the message out, and it also reads the tone — how angry they are, and whether this is heading for a public review.",
        whyTe: "టైప్ చేయడం బదులు జత చేస్తే, టోన్ కూడా చదువుతుంది — ఎంత కోపంగా ఉన్నారు, ఇది పబ్లిక్ రివ్యూ వైపు వెళ్తుందా అని.",
        optional: true,
        howToGet: [
          {
            source: "Your phone",
            sourceTe: "మీ ఫోన్",
            steps: ["Open the chat or the review", "Take a screenshot", "Cover their phone number before attaching", "Attach it in the chat"],
            stepsTe: ["ఆ చాట్ లేదా రివ్యూ ఓపెన్ చేయండి", "స్క్రీన్‌షాట్ తీయండి", "జత చేసే ముందు వాళ్ళ ఫోన్ నంబర్ కవర్ చేయండి", "చాట్‌లో జత చేయండి"],
          },
        ],
      },
    ],
    template: `I run {{businessName}} in {{city}}, selling {{sells}}.

A customer said this:
"""
{{complaint}}
"""

Honestly, our position is: {{truth}}

Write me three replies in spoken Telugu, each {{tone}} and under 80 words:
1. One to send in the next ten minutes, so they know a human read it.
2. One for after I have checked — assuming it was our mistake.
3. One for after I have checked — assuming it was not, but written so they are not called a liar.

For every reply:
- No corporate language. No "we regret the inconvenience caused."
- Apologise once at most. Repeated apologies read as weakness, not care.
- Say what happens next and by when. Never a vague "we will look into it."

Then, separately, tell me:
- What probably went wrong inside my business for this to happen
- One change that stops it happening again
- Whether this is worth a refund, a replacement, or neither — and why`,
    tips: [
      "Send reply 1 immediately, even before you know the facts. Silence turns a complaint into a public review",
      "The internal note at the end is the valuable part. One complaint usually means ten silent ones",
      "Cover the customer's phone number before attaching any screenshot",
    ],
    tipsTe: [
      "విషయం తెలియకముందే మొదటి రిప్లై వెంటనే పంపండి. మౌనమే ఫిర్యాదును పబ్లిక్ రివ్యూగా మారుస్తుంది",
      "చివర ఇచ్చే లోపలి సూచనే విలువైనది. ఒక ఫిర్యాదు అంటే సాధారణంగా పది మౌన ఫిర్యాదులు",
      "స్క్రీన్‌షాట్ జత చేసే ముందు కస్టమర్ ఫోన్ నంబర్ కవర్ చేయండి",
    ],
    bestWith: ["claude", "chatgpt"],
  },
];

/* ---------- helpers ---------- */

export type ToolId = "chatgpt" | "claude" | "gemini";

/** All three are offered everywhere. `bestWith` on a prompt only marks the
 *  recommendation — it never limits the choice, because people use whichever
 *  one they already pay for. */
export const TOOLS: {
  id: ToolId;
  name: string;
  url: string;
  note: string;
  noteTe: string;
  takesFiles: boolean;
}[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    url: "https://chatgpt.com/",
    note: "Best all-rounder. Reads Excel, photos and PDFs.",
    noteTe: "అన్నింటికీ బాగుంటుంది. Excel, ఫోటోలు, PDF చదువుతుంది.",
    takesFiles: true,
  },
  {
    id: "claude",
    name: "Claude",
    url: "https://claude.ai/new",
    note: "Best for long files and careful numbers work.",
    noteTe: "పెద్ద ఫైళ్ళు, లెక్కల పనికి బాగుంటుంది.",
    takesFiles: true,
  },
  {
    id: "gemini",
    name: "Gemini",
    url: "https://gemini.google.com/app",
    note: "Free with a Google account. Good with photos.",
    noteTe: "Google అకౌంట్ ఉంటే ఫ్రీ. ఫోటోలతో బాగా పని చేస్తుంది.",
    takesFiles: true,
  },
];

export function getTool(id: ToolId) {
  return TOOLS.find((t) => t.id === id) ?? TOOLS[0];
}

export function getPrompt(slug: string) {
  return prompts.find((p) => p.slug === slug);
}

export function getCategory(id: string) {
  return categories.find((c) => c.id === id);
}

export function promptsFor(businessType?: string) {
  if (!businessType || businessType === "all") return prompts;
  return prompts.filter(
    (p) => p.businessTypes.includes("all") || p.businessTypes.includes(businessType),
  );
}

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

  const out: string[] = [];

  for (const line of prompt.template.split("\n")) {
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
