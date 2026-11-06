import type { Course, Track } from "./types";

/* ------------------------------------------------------------------ *
 *  PLACEHOLDER VIDEOS
 *  Every `video` below points at a stand-in YouTube id so the player
 *  is visibly working. Replace each one as real recordings land —
 *  see /admin for the paste-a-link helper, and README for the three
 *  supported hosts (youtube | vimeo | mp4). Zoom share links cannot
 *  be embedded, so they render as an "open recording" button.
 * ------------------------------------------------------------------ */
const PLACEHOLDER = "aircAruvnKk";
const yt = (id: string = PLACEHOLDER) => ({ kind: "youtube", id }) as const;

export const tracks: Track[] = [
  {
    id: "foundations",
    title: "AI Foundations",
    titleTe: "AI మూలాలు",
    blurb: "Start from zero. What AI actually is, and where it earns money in a business.",
    blurbTe: "సున్నా నుంచి మొదలు. AI అంటే ఏమిటి, వ్యాపారంలో ఎక్కడ డబ్బు సంపాదిస్తుంది.",
    icon: "spark",
  },
  {
    id: "prompting",
    title: "Prompting & ChatGPT",
    titleTe: "ప్రాంప్టింగ్ & ChatGPT",
    blurb: "Get usable output on the first try instead of arguing with a chatbot.",
    blurbTe: "చాట్‌బాట్‌తో వాదించకుండా మొదటి ప్రయత్నంలోనే పని అయ్యే ఫలితం.",
    icon: "chat",
  },
  {
    id: "growth",
    title: "Sales & Marketing",
    titleTe: "సేల్స్ & మార్కెటింగ్",
    blurb: "Leads, follow-ups, content and ads — run by AI, reviewed by you.",
    blurbTe: "లీడ్స్, ఫాలో-అప్, కంటెంట్, యాడ్స్ — AI నడిపిస్తుంది, మీరు చూస్తారు.",
    icon: "growth",
  },
  {
    id: "automation",
    title: "Automation & Agents",
    titleTe: "ఆటోమేషన్ & ఏజెంట్లు",
    blurb: "Wire your tools together so the boring work finishes overnight.",
    blurbTe: "మీ టూల్స్ కలిపి కట్టండి — బోరింగ్ పని రాత్రికే పూర్తవుతుంది.",
    icon: "flow",
  },
];

export const courses: Course[] = [
  /* ============================== 1 ============================== */
  {
    slug: "ai-for-business-foundations",
    title: "AI for Business — Foundations",
    titleTe: "వ్యాపారం కోసం AI — మూలాలు",
    tagline:
      "The 6-hour grounding every Telugu business owner should have before spending a rupee on AI.",
    taglineTe:
      "AI మీద ఒక్క రూపాయి ఖర్చు పెట్టే ముందు ప్రతి తెలుగు వ్యాపారి తెలుసుకోవాల్సిన 6 గంటల పాఠం.",
    track: "foundations",
    level: "beginner",
    language: "telugu",
    priceInr: 0,
    accent: "gold",
    featured: true,
    outcomes: [
      "Explain in plain Telugu what an LLM can and cannot do for your business",
      "Spot the three places AI pays back fastest in a small Indian business",
      "Pick tools without getting sold ₹50,000 of software you will not use",
      "Write your first working prompt for a real task in your own shop or office",
      "Build a one-page AI plan for the next 90 days",
    ],
    outcomesTe: [
      "LLM మీ వ్యాపారానికి ఏం చేయగలదు, ఏం చేయలేదు — సాధారణ తెలుగులో చెప్పగలరు",
      "చిన్న భారతీయ వ్యాపారంలో AI వేగంగా డబ్బు తిరిగి ఇచ్చే మూడు చోట్లు గుర్తిస్తారు",
      "పని రాని ₹50,000 సాఫ్ట్‌వేర్ కొనకుండా సరైన టూల్స్ ఎంచుకుంటారు",
      "మీ షాప్ లేదా ఆఫీస్‌లో నిజమైన పనికి మొదటి ప్రాంప్ట్ రాస్తారు",
      "తరువాతి 90 రోజులకు ఒక పేజీ AI ప్లాన్ తయారు చేస్తారు",
    ],
    forWhom: [
      "Shop, clinic, factory and agency owners in AP & Telangana",
      "Anyone who has heard 'use AI' twenty times and still does not know where to start",
      "Team leads asked to 'do something with AI' this quarter",
    ],
    tools: ["ChatGPT", "Google Gemini", "Claude", "WhatsApp Business"],
    instructor: {
      name: "Santhosh Nimmani",
      role: "Founder, SN Trinetra Global AI & IT Solutions",
      roleTe: "ఫౌండర్, SN Trinetra Global AI & IT Solutions",
      initials: "SN",
    },
    modules: [
      {
        id: "m1",
        title: "What AI actually is",
        titleTe: "AI అసలు ఏమిటి",
        lessons: [
          {
            id: "l1",
            title: "Welcome to TIC AI",
            titleTe: "TIC AI కి స్వాగతం",
            minutes: 8,
            video: yt(),
            preview: true,
            summary:
              "Why a Telugu-first AI council exists, how to use this platform, and what you will have built by the end.",
            summaryTe:
              "తెలుగు-ఫస్ట్ AI కౌన్సిల్ ఎందుకు, ఈ ప్లాట్‌ఫామ్ ఎలా వాడాలి, చివరికి మీరు ఏం తయారు చేస్తారు.",
          },
          {
            id: "l2",
            title: "LLM in one whiteboard",
            titleTe: "ఒక వైట్‌బోర్డ్‌లో LLM",
            minutes: 22,
            video: yt(),
            preview: true,
            summary:
              "No maths. One diagram that makes every later lesson obvious — prediction, context and why it hallucinates.",
            summaryTe:
              "లెక్కలు లేవు. ఒక డయాగ్రామ్ — ప్రిడిక్షన్, కాంటెక్స్ట్, ఎందుకు తప్పు చెబుతుంది.",
          },
          {
            id: "l3",
            title: "AI vs automation vs a human",
            titleTe: "AI vs ఆటోమేషన్ vs మనిషి",
            minutes: 18,
            video: yt(),
            summary: "A decision table for which of the three should own a given task.",
            summaryTe: "ఏ పని ఎవరికి ఇవ్వాలో చెప్పే డెసిషన్ టేబుల్.",
          },
        ],
      },
      {
        id: "m2",
        title: "Where AI pays back",
        titleTe: "AI డబ్బు తిరిగి ఇచ్చే చోట్లు",
        lessons: [
          {
            id: "l4",
            title: "The money map of your business",
            titleTe: "మీ వ్యాపారం డబ్బు మ్యాప్",
            minutes: 26,
            video: yt(),
            resources: [
              { label: "Money Map worksheet", labelTe: "మనీ మ్యాప్ వర్క్‌షీట్", href: "#", type: "sheet" },
            ],
          },
          {
            id: "l5",
            title: "Customer replies that run themselves",
            titleTe: "తమకు తామే నడిచే కస్టమర్ రిప్లైలు",
            minutes: 24,
            video: yt(),
          },
          {
            id: "l6",
            title: "Quotes, invoices and follow-ups",
            titleTe: "కోట్స్, ఇన్‌వాయిస్‌లు, ఫాలో-అప్‌లు",
            minutes: 21,
            video: yt(),
          },
        ],
      },
      {
        id: "m3",
        title: "Your 90-day plan",
        titleTe: "మీ 90-రోజుల ప్లాన్",
        lessons: [
          {
            id: "l7",
            title: "Choosing tools without regret",
            titleTe: "పశ్చాత్తాపం లేకుండా టూల్స్ ఎంపిక",
            minutes: 19,
            video: yt(),
          },
          {
            id: "l8",
            title: "Build your one-page AI plan",
            titleTe: "మీ ఒక పేజీ AI ప్లాన్ తయారు చేయండి",
            minutes: 28,
            video: yt(),
            resources: [
              { label: "90-day AI plan template", labelTe: "90-రోజుల AI ప్లాన్ టెంప్లేట్", href: "#", type: "template" },
            ],
          },
        ],
      },
    ],
  },

  /* ============================== 2 ============================== */
  {
    slug: "prompting-mastery-telugu",
    title: "Prompting Mastery",
    titleTe: "ప్రాంప్టింగ్ నైపుణ్యం",
    tagline:
      "Stop fighting ChatGPT. Learn the five-part prompt that gets a usable answer first time, every time.",
    taglineTe:
      "ChatGPT తో పోరాటం ఆపండి. మొదటి ప్రయత్నంలోనే పని అయ్యే ఐదు-భాగాల ప్రాంప్ట్ నేర్చుకోండి.",
    track: "prompting",
    level: "beginner",
    language: "telugu",
    priceInr: 499,
    mrpInr: 1999,
    accent: "indigo",
    featured: true,
    outcomes: [
      "Write prompts with role, context, task, format and constraint — in Telugu or English",
      "Build a reusable prompt library for your own recurring work",
      "Get clean Telugu output instead of translated-sounding Telugu",
      "Use files, images and long documents as context without confusing the model",
      "Know when a prompt will never work and you need automation instead",
    ],
    outcomesTe: [
      "రోల్, కాంటెక్స్ట్, టాస్క్, ఫార్మాట్, కన్‌స్ట్రెయింట్ — తెలుగులో లేదా ఇంగ్లీష్‌లో ప్రాంప్ట్‌లు",
      "మీ రోజువారీ పనికి తిరిగి వాడే ప్రాంప్ట్ లైబ్రరీ తయారు చేస్తారు",
      "అనువాదంలా అనిపించని శుభ్రమైన తెలుగు ఫలితం",
      "ఫైల్స్, ఇమేజ్‌లు, పెద్ద డాక్యుమెంట్‌లు కాంటెక్స్ట్‌గా వాడతారు",
      "ప్రాంప్ట్ ఎప్పుడు పని చేయదు, ఆటోమేషన్ ఎప్పుడు కావాలి — తెలుస్తుంది",
    ],
    forWhom: [
      "Anyone already using ChatGPT but getting mediocre results",
      "Teams writing content, replies or reports every day",
      "Freelancers and consultants billing for output",
    ],
    tools: ["ChatGPT", "Claude", "Gemini", "Perplexity"],
    instructor: {
      name: "Santhosh Nimmani",
      role: "Founder, SN Trinetra Global AI & IT Solutions",
      roleTe: "ఫౌండర్, SN Trinetra Global AI & IT Solutions",
      initials: "SN",
    },
    modules: [
      {
        id: "m1",
        title: "The anatomy of a prompt",
        titleTe: "ప్రాంప్ట్ నిర్మాణం",
        lessons: [
          {
            id: "l1",
            title: "Why your prompts fail",
            titleTe: "మీ ప్రాంప్ట్‌లు ఎందుకు విఫలమవుతాయి",
            minutes: 14,
            video: yt(),
            preview: true,
          },
          {
            id: "l2",
            title: "Role, context, task, format, constraint",
            titleTe: "రోల్, కాంటెక్స్ట్, టాస్క్, ఫార్మాట్, కన్‌స్ట్రెయింట్",
            minutes: 27,
            video: yt(),
            preview: true,
            resources: [
              { label: "Five-part prompt card", labelTe: "ఐదు-భాగాల ప్రాంప్ట్ కార్డ్", href: "#", type: "pdf" },
            ],
          },
          {
            id: "l3",
            title: "Examples beat instructions",
            titleTe: "ఉదాహరణలు సూచనలను గెలుస్తాయి",
            minutes: 20,
            video: yt(),
          },
        ],
      },
      {
        id: "m2",
        title: "Telugu that sounds Telugu",
        titleTe: "తెలుగులా అనిపించే తెలుగు",
        lessons: [
          {
            id: "l4",
            title: "Killing translation-smell",
            titleTe: "అనువాద వాసన తీయడం",
            minutes: 23,
            video: yt(),
          },
          {
            id: "l5",
            title: "Style guides and tone locking",
            titleTe: "స్టైల్ గైడ్‌లు, టోన్ లాక్ చేయడం",
            minutes: 25,
            video: yt(),
          },
        ],
      },
      {
        id: "m3",
        title: "Your prompt library",
        titleTe: "మీ ప్రాంప్ట్ లైబ్రరీ",
        lessons: [
          {
            id: "l6",
            title: "Fifty prompts for Indian SMEs",
            titleTe: "భారతీయ MSME లకు ఏభై ప్రాంప్ట్‌లు",
            minutes: 31,
            video: yt(),
            resources: [
              { label: "50-prompt pack", labelTe: "50-ప్రాంప్ట్ ప్యాక్", href: "#", type: "prompt" },
            ],
          },
          {
            id: "l7",
            title: "Testing and improving a prompt",
            titleTe: "ప్రాంప్ట్ పరీక్షించి మెరుగుపరచడం",
            minutes: 18,
            video: yt(),
          },
        ],
      },
    ],
  },

  /* ============================== 3 ============================== */
  {
    slug: "ai-sales-marketing-telugu",
    title: "AI for Sales & Marketing",
    titleTe: "సేల్స్ & మార్కెటింగ్ కోసం AI",
    tagline:
      "Fill the pipeline, follow up without forgetting, and ship a month of content in an afternoon.",
    taglineTe:
      "పైప్‌లైన్ నింపండి, ఫాలో-అప్ మర్చిపోకండి, ఒక మధ్యాహ్నంలో నెల కంటెంట్ తయారు చేయండి.",
    track: "growth",
    level: "intermediate",
    language: "telugu-english",
    priceInr: 1499,
    mrpInr: 4999,
    accent: "teal",
    featured: true,
    outcomes: [
      "Build a lead list from Google Maps and public sources, legally",
      "Write outreach that sounds like a human from Vijayawada, not a bot",
      "Run a WhatsApp follow-up sequence that does not get you blocked",
      "Produce a month of LinkedIn and Instagram content in one sitting",
      "Read ad performance and let AI write the next three variants",
    ],
    outcomesTe: [
      "Google Maps, పబ్లిక్ సోర్సుల నుంచి చట్టబద్ధంగా లీడ్ లిస్ట్ తయారు చేస్తారు",
      "బాట్‌లా కాదు — విజయవాడ మనిషిలా అనిపించే ఔట్‌రీచ్ రాస్తారు",
      "బ్లాక్ అవ్వకుండా WhatsApp ఫాలో-అప్ సీక్వెన్స్ నడుపుతారు",
      "ఒకేసారి కూర్చుని నెల LinkedIn, Instagram కంటెంట్ తయారు చేస్తారు",
      "యాడ్ పర్ఫార్మెన్స్ చదివి AI తో తరువాతి మూడు వెర్షన్లు రాయిస్తారు",
    ],
    forWhom: [
      "Agency owners and freelancers selling services",
      "Sales teams in real estate, education, healthcare and manufacturing",
      "Founders doing their own marketing",
    ],
    tools: ["ChatGPT", "Google Maps", "WhatsApp Business", "Canva", "Meta Ads"],
    instructor: {
      name: "Santhosh Nimmani",
      role: "Founder, SN Trinetra Global AI & IT Solutions",
      roleTe: "ఫౌండర్, SN Trinetra Global AI & IT Solutions",
      initials: "SN",
    },
    modules: [
      {
        id: "m1",
        title: "Finding the right leads",
        titleTe: "సరైన లీడ్స్ కనుక్కోవడం",
        lessons: [
          {
            id: "l1",
            title: "Who is actually your buyer",
            titleTe: "మీ కొనుగోలుదారు అసలు ఎవరు",
            minutes: 17,
            video: yt(),
            preview: true,
          },
          { id: "l2", title: "Lead lists from public data", titleTe: "పబ్లిక్ డేటా నుంచి లీడ్ లిస్ట్", minutes: 29, video: yt() },
          { id: "l3", title: "Scoring leads before you call", titleTe: "కాల్ చేసే ముందు లీడ్ స్కోరింగ్", minutes: 22, video: yt() },
        ],
      },
      {
        id: "m2",
        title: "Outreach that gets replies",
        titleTe: "రిప్లై వచ్చే ఔట్‌రీచ్",
        lessons: [
          { id: "l4", title: "The human-voice rule", titleTe: "మనిషి-గొంతు నియమం", minutes: 24, video: yt(), preview: true },
          { id: "l5", title: "WhatsApp sequences done right", titleTe: "WhatsApp సీక్వెన్స్ సరైన పద్ధతి", minutes: 26, video: yt() },
          { id: "l6", title: "Handling 'we already have someone'", titleTe: "'మాకు ఇప్పటికే ఒకరు ఉన్నారు' అంటే", minutes: 19, video: yt() },
        ],
      },
      {
        id: "m3",
        title: "Content at scale",
        titleTe: "స్కేల్‌లో కంటెంట్",
        lessons: [
          { id: "l7", title: "A month of posts in an afternoon", titleTe: "ఒక మధ్యాహ్నంలో నెల పోస్ట్‌లు", minutes: 33, video: yt() },
          { id: "l8", title: "Repurposing one webinar ten ways", titleTe: "ఒక వెబినార్ పది రకాలుగా", minutes: 21, video: yt() },
          { id: "l9", title: "Ads: read, rewrite, repeat", titleTe: "యాడ్స్: చదవండి, తిరిగి రాయండి", minutes: 27, video: yt() },
        ],
      },
    ],
  },

  /* ============================== 4 ============================== */
  {
    slug: "ai-automation-n8n-telugu",
    title: "AI Automation with n8n",
    titleTe: "n8n తో AI ఆటోమేషన్",
    tagline:
      "Connect WhatsApp, Sheets, Gmail and an LLM so the repetitive work finishes while you sleep.",
    taglineTe:
      "WhatsApp, Sheets, Gmail, LLM కలపండి — మీరు నిద్రపోతున్నప్పుడే పని పూర్తవుతుంది.",
    track: "automation",
    level: "intermediate",
    language: "telugu-english",
    priceInr: 2499,
    mrpInr: 7999,
    accent: "violet",
    outcomes: [
      "Install and run n8n, self-hosted or cloud",
      "Build a WhatsApp enquiry bot that logs to Google Sheets",
      "Auto-draft replies with an LLM and keep a human approval step",
      "Schedule daily reports that land in your inbox before you wake up",
      "Debug a broken workflow without panicking",
    ],
    outcomesTe: [
      "n8n ఇన్‌స్టాల్ చేసి నడిపిస్తారు — సెల్ఫ్-హోస్ట్ లేదా క్లౌడ్",
      "Google Sheets కి లాగ్ చేసే WhatsApp ఎంక్వైరీ బాట్ తయారు చేస్తారు",
      "LLM తో రిప్లై డ్రాఫ్ట్ చేసి, మనిషి ఆమోదం స్టెప్ ఉంచుతారు",
      "మీరు లేచే ముందే ఇన్‌బాక్స్‌లో ఉండే రోజువారీ రిపోర్ట్‌లు",
      "పని చేయని వర్క్‌ఫ్లో కలవరపడకుండా బాగు చేస్తారు",
    ],
    forWhom: [
      "Operations and admin teams drowning in copy-paste",
      "Agency owners who want to deliver automation to clients",
      "Anyone who finished the Foundations course",
    ],
    tools: ["n8n", "Google Sheets", "WhatsApp Cloud API", "OpenAI API", "Gmail"],
    instructor: {
      name: "Santhosh Nimmani",
      role: "Founder, SN Trinetra Global AI & IT Solutions",
      roleTe: "ఫౌండర్, SN Trinetra Global AI & IT Solutions",
      initials: "SN",
    },
    modules: [
      {
        id: "m1",
        title: "Setting up",
        titleTe: "సెటప్",
        lessons: [
          { id: "l1", title: "n8n in twenty minutes", titleTe: "ఇరవై నిమిషాల్లో n8n", minutes: 20, video: yt(), preview: true },
          { id: "l2", title: "Nodes, triggers and credentials", titleTe: "నోడ్స్, ట్రిగ్గర్స్, క్రెడెన్షియల్స్", minutes: 25, video: yt() },
        ],
      },
      {
        id: "m2",
        title: "Your first three workflows",
        titleTe: "మీ మొదటి మూడు వర్క్‌ఫ్లోలు",
        lessons: [
          { id: "l3", title: "WhatsApp enquiry to Sheets", titleTe: "WhatsApp ఎంక్వైరీ → Sheets", minutes: 34, video: yt() },
          { id: "l4", title: "LLM drafts, human approves", titleTe: "LLM డ్రాఫ్ట్, మనిషి ఆమోదం", minutes: 30, video: yt() },
          { id: "l5", title: "The 7 a.m. report", titleTe: "ఉదయం 7 గంటల రిపోర్ట్", minutes: 23, video: yt() },
        ],
      },
      {
        id: "m3",
        title: "Keeping it alive",
        titleTe: "నడుస్తూ ఉంచడం",
        lessons: [
          { id: "l6", title: "Errors, retries and alerts", titleTe: "ఎర్రర్లు, రీట్రైలు, అలర్ట్‌లు", minutes: 22, video: yt() },
          { id: "l7", title: "Cost control on API calls", titleTe: "API కాల్స్ ఖర్చు నియంత్రణ", minutes: 18, video: yt() },
        ],
      },
    ],
  },

  /* ============================== 5 ============================== */
  {
    slug: "ai-voice-agents-telugu",
    title: "AI Voice Agents for Business",
    titleTe: "వ్యాపారం కోసం AI వాయిస్ ఏజెంట్లు",
    tagline:
      "Build a phone agent that answers in Telugu, books appointments and never misses a call.",
    taglineTe:
      "తెలుగులో మాట్లాడి, అపాయింట్‌మెంట్ బుక్ చేసి, ఒక్క కాల్ మిస్ చేయని ఫోన్ ఏజెంట్ తయారు చేయండి.",
    track: "automation",
    level: "advanced",
    language: "telugu-english",
    priceInr: 4999,
    mrpInr: 14999,
    accent: "rose",
    comingSoon: true,
    outcomes: [
      "Understand realtime speech-to-speech architecture end to end",
      "Handle Telugu and English in the same call without breaking",
      "Connect a phone number through Twilio and route calls",
      "Book into a real calendar and confirm over WhatsApp",
      "Measure call quality and cost per conversation",
    ],
    outcomesTe: [
      "రియల్‌టైమ్ స్పీచ్-టు-స్పీచ్ ఆర్కిటెక్చర్ పూర్తిగా అర్థం చేసుకుంటారు",
      "ఒకే కాల్‌లో తెలుగు, ఇంగ్లీష్ — ఇబ్బంది లేకుండా",
      "Twilio ద్వారా ఫోన్ నంబర్ కలిపి కాల్స్ రూట్ చేస్తారు",
      "నిజమైన క్యాలెండర్‌లో బుక్ చేసి WhatsApp లో కన్ఫర్మ్ చేస్తారు",
      "కాల్ క్వాలిటీ, ప్రతి సంభాషణ ఖర్చు కొలుస్తారు",
    ],
    forWhom: [
      "Clinics, diagnostic labs and hospitals losing calls",
      "Developers building for Indian-language markets",
      "Agencies selling voice automation",
    ],
    tools: ["Twilio", "Sarvam AI", "OpenAI Realtime", "Node.js"],
    instructor: {
      name: "Santhosh Nimmani",
      role: "Founder, SN Trinetra Global AI & IT Solutions",
      roleTe: "ఫౌండర్, SN Trinetra Global AI & IT Solutions",
      initials: "SN",
    },
    modules: [
      {
        id: "m1",
        title: "How voice agents work",
        titleTe: "వాయిస్ ఏజెంట్లు ఎలా పని చేస్తాయి",
        lessons: [
          { id: "l1", title: "Realtime audio, start to finish", titleTe: "రియల్‌టైమ్ ఆడియో, మొదలు నుంచి చివరి వరకు", minutes: 26, video: yt(), preview: true },
          { id: "l2", title: "Latency is the whole product", titleTe: "లేటెన్సీ అంటేనే ప్రొడక్ట్", minutes: 21, video: yt() },
        ],
      },
      {
        id: "m2",
        title: "Building one",
        titleTe: "ఒకటి తయారు చేయడం",
        lessons: [
          { id: "l3", title: "Twilio media streams", titleTe: "Twilio మీడియా స్ట్రీమ్స్", minutes: 32, video: yt() },
          { id: "l4", title: "Telugu STT and TTS that hold up", titleTe: "నిలబడే తెలుగు STT, TTS", minutes: 29, video: yt() },
          { id: "l5", title: "Booking into a real calendar", titleTe: "నిజమైన క్యాలెండర్‌లో బుకింగ్", minutes: 24, video: yt() },
        ],
      },
    ],
  },

  /* ============================== 6 ============================== */
  {
    slug: "ai-agents-for-business-telugu",
    title: "AI Agents & Workflows",
    titleTe: "AI ఏజెంట్లు & వర్క్‌ఫ్లోలు",
    tagline:
      "Move from one-off prompts to agents that plan, use tools and report back.",
    taglineTe:
      "ఒక్కసారి ప్రాంప్ట్ నుంచి — ప్లాన్ చేసి, టూల్స్ వాడి, రిపోర్ట్ చేసే ఏజెంట్ల వైపు.",
    track: "automation",
    level: "advanced",
    language: "telugu-english",
    priceInr: 3499,
    mrpInr: 9999,
    accent: "silver",
    comingSoon: true,
    outcomes: [
      "Tell the difference between a workflow, an agent and a chatbot",
      "Give an agent tools and keep it on a leash",
      "Design the human checkpoint so nothing embarrassing ships",
      "Evaluate an agent before you let it touch customers",
      "Price and package agent work for clients",
    ],
    outcomesTe: [
      "వర్క్‌ఫ్లో, ఏజెంట్, చాట్‌బాట్ — తేడా స్పష్టంగా తెలుస్తుంది",
      "ఏజెంట్‌కు టూల్స్ ఇస్తూ కట్టుబాటులో ఉంచుతారు",
      "ఇబ్బంది కలిగించేది బయటకు పోకుండా మనిషి చెక్‌పాయింట్ డిజైన్ చేస్తారు",
      "కస్టమర్ల దగ్గరకు పంపే ముందు ఏజెంట్‌ను పరీక్షిస్తారు",
      "క్లయింట్లకు ఏజెంట్ పని ధర, ప్యాకేజీ నిర్ణయిస్తారు",
    ],
    forWhom: [
      "Developers and technical founders",
      "Agency owners moving up from automation to agents",
      "Anyone who finished the n8n course",
    ],
    tools: ["Claude", "OpenAI API", "n8n", "Python"],
    instructor: {
      name: "Santhosh Nimmani",
      role: "Founder, SN Trinetra Global AI & IT Solutions",
      roleTe: "ఫౌండర్, SN Trinetra Global AI & IT Solutions",
      initials: "SN",
    },
    modules: [
      {
        id: "m1",
        title: "Agents, honestly",
        titleTe: "ఏజెంట్లు, నిజాయితీగా",
        lessons: [
          { id: "l1", title: "What an agent is not", titleTe: "ఏజెంట్ ఏది కాదు", minutes: 18, video: yt(), preview: true },
          { id: "l2", title: "Tools, memory and loops", titleTe: "టూల్స్, మెమరీ, లూప్‌లు", minutes: 27, video: yt() },
        ],
      },
      {
        id: "m2",
        title: "Shipping safely",
        titleTe: "సురక్షితంగా విడుదల",
        lessons: [
          { id: "l3", title: "Human in the loop, properly", titleTe: "మనిషి లూప్‌లో, సరిగ్గా", minutes: 23, video: yt() },
          { id: "l4", title: "Evaluating before launch", titleTe: "లాంచ్ ముందు టెస్ట్ చేయడం", minutes: 25, video: yt() },
        ],
      },
    ],
  },
];

/* ----------------------------- helpers ----------------------------- */

export function getCourse(slug: string) {
  return courses.find((c) => c.slug === slug);
}

export function allLessons(course: Course) {
  return course.modules.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleTitle: m.title, moduleTitleTe: m.titleTe })),
  );
}

export function lessonCount(course: Course) {
  return course.modules.reduce((n, m) => n + m.lessons.length, 0);
}

export function totalMinutes(course: Course) {
  return course.modules.reduce(
    (n, m) => n + m.lessons.reduce((s, l) => s + l.minutes, 0),
    0,
  );
}

export function runtime(course: Course) {
  const mins = totalMinutes(course);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
}

export function findLesson(course: Course, lessonId: string) {
  const flat = allLessons(course);
  const index = flat.findIndex((l) => l.id === lessonId);
  if (index === -1) return null;
  return {
    lesson: flat[index],
    index,
    prev: index > 0 ? flat[index - 1] : null,
    next: index < flat.length - 1 ? flat[index + 1] : null,
    total: flat.length,
  };
}

export function getTrack(id: string) {
  return tracks.find((t) => t.id === id);
}
