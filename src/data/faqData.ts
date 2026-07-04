export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqData {
  [category: string]: FaqItem[];
}

export const FAQ_DATA: FaqData = {
  general: [
    {
      question: "What is Aioncy and how does it help Nepali SMEs?",
      answer:
        "Aioncy is an AI-powered digital worker (virtual employee) built for Nepali businesses. It's more than a simple chatbot – Aioncy understands your products and FAQs, then works 24/7 on WhatsApp, Instagram, Facebook and your website to answer customer queries instantly and capture leads automatically. In practice, this means no more missed messages even outside office hours. Aioncy's AI can handle common questions (pricing, availability, policies) and qualify sales leads while you sleep.",
    },
    {
      question: "How is Aioncy different from a regular chatbot?",
      answer:
        "Unlike a rule-based FAQ chatbot, Aioncy is a full-fledged AI digital assistant trained on your actual business data. It doesn't just match keywords – it uses natural language understanding to handle complex questions across channels. In other words, it behaves like a virtual employee, not just a simple bot. Aioncy maintains context, learns from your website and chat history, and escalates only really tough issues to a human agent. This makes it far more flexible and human-like than basic chatbots.",
    },
    {
      question: "Does Aioncy support Nepali language and multi-channel messaging?",
      answer:
        "Yes. Aioncy understands both Nepali (देवनागरी) and English natively, so your customers can write in their preferred language. It also supports omnichannel messaging: customers can reach you via WhatsApp, Instagram DMs, Facebook Messenger, or your website chat widget, and Aioncy will reply on any channel. In short, you get one AI that manages every messaging app for your business.",
    },
    {
      question: "Can Aioncy capture leads and automate sales inquiries?",
      answer:
        "Absolutely. Aioncy's AI automatically collects contact details and qualifying info from customers during chats. For example, if someone asks about pricing, the AI can prompt them to enter their email or phone. All leads (name, email/phone, interest) are stored so your team can follow up. Nepali businesses using AI automation report they capture leads automatically and respond faster to inquiries. Aioncy turns every chat into a potential sales opportunity without you lifting a finger.",
    },
    {
      question: "What is Aioncy's Smart Booking Assistant?",
      answer:
        "The Smart Booking Assistant is Aioncy's feature for scheduling appointments or reservations through chat. Instead of back-and-forth text, Aioncy checks your calendar and instantly books the slot the customer picks. For example, a customer can ask to Book a table this Saturday and Aioncy confirms it on the spot. The booking details are saved for you – all via an AI chat on your website or WhatsApp.",
    },
    {
      question: "Who can benefit from using Aioncy?",
      answer:
        "Aioncy is designed for any SME in Nepal that uses digital channels to reach customers. This includes retail shops, e-commerce stores, tourism/hospitality, clinics, schools, real estate, consultancies, and more. If your business gets customer questions via WhatsApp, Instagram, Facebook or your website, Aioncy can help. By automating replies and lead capture, it saves staff time and prevents missed sales – ideal for businesses that want 24/7 support without hiring more people.",
    },
    {
      question: "How do I train or set up Aioncy's AI assistant?",
      answer:
        "Training is done via the Aioncy Dashboard. You simply add your business information (about us, FAQs, product catalog, etc.) and the AI learns from it. For example, you can copy-paste your FAQ list into the knowledge base, or connect your online store. Aioncy then auto-generates intents and responses from this data. There's no coding: just click Add Data on the dashboard, and the AI will quickly grasp how to answer customer questions based on your real info.",
    },
    {
      question: "How do I get started with Aioncy?",
      answer:
        "It's easy to try Aioncy. Sign up on our website for a free demo or trial. We'll help you connect one channel (e.g. WhatsApp) and onboard your first batch of business data. You'll immediately see the AI responding to test queries. We suggest starting with a 14-day free trial and 100 free credits (see Pricing). During trial, you can test lead capture and booking features without charge. When ready, choose a paid plan to go live. Our support team can guide you step-by-step.",
    },
  ],
  pricing: [
    {
      question: "How much does Aioncy cost for businesses in Nepal?",
      answer:
        "Aioncy offers flexible, budget-friendly options starting with a Freemium plan so you can easily test our AI chatbot features. Once you're ready to scale, our entry-level tier is the Essential plan, priced at NRS 2,999 per month. This plan allows you to integrate up to 2 channels (like your website and WhatsApp). We will be rolling out more advanced plans in the future to support larger messaging volumes and custom integrations as your business grows. All plans are transparently billed in NPR, making it incredibly accessible for local Nepali businesses compared to expensive international platforms.",
    },
    {
      question: "Are there free trials or demos available?",
      answer:
        "Yes. We provide a free trial so you can test Aioncy risk-free. New users get 100 free AI credits (valid for 14 days) to try all features (WhatsApp, lead capture, booking, etc.). There's no credit card required to start. You can also request a live demo with our team. After the trial, you can subscribe to a paid plan or purchase additional credits.",
    },
    {
      question: "What are the different pricing plans or tiers?",
      answer:
        "We offer two straightforward plans designed to get your business started with AI automation right away. We start with our Freemium plan, which allows you to completely test out the AI and see the magic for yourself at zero cost. Once you are ready to scale, we offer the Essential plan for just NRS 2,999 per month, which unlocks the ability to integrate up to 2 channels (such as your website and WhatsApp) along with automated messaging capabilities. We will be expanding our packages very soon to include more advanced tiers for larger operations, but you can get started today on either of our current plans right from our Pricing section!",
    },
    {
      question: "Do I pay in Nepali rupees, and what payment methods are accepted?",
      answer:
        "Yes, all pricing and billing are in Nepalese Rupees (NPR). We accept local payment methods: bank transfer, eSewa, Khalti and major credit cards. Invoices are sent in NPR for transparency. For example, you can pay with a Nepali debit card or mobile wallet after purchasing credits or a subscription.",
    },
    {
      question: "Are there volume discounts or enterprise packages?",
      answer:
        "Yes. If you purchase annually or buy large credit bundles upfront, you get a discount (typically 10–20%). We also offer custom enterprise plans for high-volume businesses, which include dedicated support and SLAs. For example, an annual prepayment for an enterprise account can include bonus credits. Contact us for a tailored quote.",
    },
    {
      question: "Is there a setup or one-time fee?",
      answer:
        "No, Aioncy is cloud-based with no separate installation fee. Everything is included in the subscription. You can sign up and connect your first channel instantly. There's no hidden setup charge– you only pay the monthly or credit fees.",
    },
    {
      question: "How do I upgrade, downgrade or cancel my plan?",
      answer:
        "Managing your subscription is easy. From your Aioncy dashboard, go to Account Settings → Billing. You can switch plans anytime – upgrades take effect immediately, downgrades apply from the next billing cycle. To cancel, simply disable auto-renew; you'll still retain access and any unused credits until the end of the paid period. There are no penalties or notice periods.",
    },
  ],
  dashboard: [
    {
      question: "What features are available on the Aioncy dashboard?",
      answer:
        "The Aioncy dashboard is your control hub. It lets you: train the AI (upload FAQs, product info), view live conversations (WhatsApp/Instagram chat logs), see analytics (chat volume, response times, leads per channel), manage leads (contact info of captured leads), and configure settings (connect channels, set working hours). Think of it as a CRM-like interface: monitor your AI's performance and tweak its knowledge base all in one place.",
    },
    {
      question: "How do I train Aioncy's AI and add business info?",
      answer:
        "On the dashboard, go to the Knowledge Base section. Here you can upload or copy-paste your business FAQs, product catalogs or policy pages. The AI auto-processes this data. You can also add custom Q&A pairs or conversation flows manually. Every time you update the knowledge base, Aioncy re-trains itself. No programming is required – just provide your content and click Train. The AI will then use this information to answer similar customer questions.",
    },
    {
      question: "Can I view customer conversations and leads in the dashboard?",
      answer:
        "Yes. The Conversations tab shows real-time chat logs for each channel. You can click any conversation to see the full transcript between Aioncy and the customer. In the Leads section, you'll see every captured lead (with name, email/phone and notes). You can search, filter by date or channel, and export these leads (e.g. CSV) for your sales team. This way, you always know how customers interacted with the AI and can follow up easily.",
    },
    {
      question: "Does the dashboard provide analytics and reporting?",
      answer:
        "Yes. Aioncy's analytics include chat volume (how many messages handled), response times, resolution rate, and leads generated per period. You can filter by channel (WhatsApp, Instagram, etc.) or date range. Charts visualize trends, and you can download reports. These metrics help you see ROI: for example, Our AI answered 500 messages last month with 95% customer satisfaction.",
    },
    {
      question: "How do I connect or configure new messaging channels?",
      answer:
        "From the dashboard's Integrations section, just click Connect next to each channel. We support major channels: choose WhatsApp Business API, log in with Facebook to enable Instagram/FB Messenger, or copy-paste the website chat snippet into your site. The system walks you through authentication (e.g. linking your WhatsApp number via a partner). No coding is needed. Once connected, Aioncy's AI will automatically reply on that channel. You can add or remove channels anytime from the same Integrations page.",
    },
    {
      question: "Can I set up multiple team users or roles on the dashboard?",
      answer:
        "Yes, Aioncy supports multiple user accounts with role-based access. In Settings → User Management, you can invite your staff and assign roles (Admin, Agent, Editor). For example, you might allow agents to respond to chats but restrict them from changing AI training. Each user signs in with their own email; permissions ensure they only see what they need. This way, your sales team, marketers or support staff can collaborate safely without sharing login credentials.",
    },
    {
      question: "Is the Aioncy dashboard mobile-friendly?",
      answer:
        "Yes. The Aioncy dashboard is a web app that works on any device. On smartphones or tablets, the layout adjusts so you can check chats and leads on the go. For example, you can log in from your phone and reply to a customer or view analytics. We also send email or app notifications for new leads if enabled. A dedicated mobile app is in development, but the current responsive site is fully functional.",
    },
  ],
  integrations: [
    {
      question: "Which messaging channels does Aioncy support?",
      answer:
        "Aioncy is omnichannel. It integrates with WhatsApp Business, Instagram Direct Messages, Facebook Messenger, and website chat widgets out of the box. All messages from these channels feed into Aioncy's single inbox. In short: wherever your customers text you, Aioncy can too.",
    },
    {
      question: "How do I integrate Aioncy with WhatsApp Business?",
      answer:
        "We make WhatsApp setup easy. In the dashboard, go to Integrations → WhatsApp and follow the prompts. Aioncy will connect to your WhatsApp Business number via a provider (Twilio, Gupshup, etc.). You'll need to authenticate via the WhatsApp API (usually scanning a QR code once). After that, Aioncy will immediately start sending/receiving on WhatsApp. No technical skills are needed – our guide walks you through it.",
    },
    {
      question: "Can Aioncy connect to Instagram and Facebook Messenger?",
      answer:
        "Yes. In the same Integrations area, just choose Instagram and/or Facebook. The dashboard will redirect you to log in to your business Facebook account and select the relevant pages. Once linked, Aioncy will handle all incoming Instagram DMs and Facebook messages just like any other channel. This means one team (or the AI) can reply to Instagram inquiries right from the Aioncy dashboard.",
    },
    {
      question: "What about website chat?",
      answer:
        "For your website, Aioncy provides a simple JavaScript chat widget. Just paste the code snippet into your site header (works on WordPress, Shopify, any CMS). Visitors can then chat directly on your site and Aioncy will respond.",
    },
    {
      question: "Does Aioncy integrate with CRMs or helpdesk tools?",
      answer:
        "Yes. Aioncy can sync leads and conversations to your existing tools. We support direct integrations with popular CRMs (Zoho, HubSpot) and helpdesk systems via API. For other apps, use Zapier or our REST API: for example, create a zap that sends new leads from Aioncy into Google Sheets or sends Slack notifications. You can also export conversation logs for compliance. These integrations ensure your AI doesn't sit in isolation but becomes part of your workflow.",
    },
    {
      question: "Is my data secure when connecting channels?",
      answer:
        "Absolutely. Aioncy uses industry-standard encryption for all API connections. Our integrations route directly through secure, official platform protocols (like the official Meta API for WhatsApp), ensuring your credentials are never exposed. Your data is stored on secure cloud servers and is strictly used to run and train your specific AI chatbot—we never sell or publicly share your business or customer information. Your channel integrations are just as secure as the platforms themselves.",
    },
  ],
  credits: [
    {
      question: "How does Aioncy's credit system work?",
      answer:
        "Aioncy uses credits as the unit of consumption. Each time the AI sends or processes a message, it uses some credits. For example, one text message might cost 1 credit. Rich content (images, audio) may cost more (2–3 credits). A booking interaction or data lookup might cost ~5 credits. You purchase credit packs (e.g. 1000 credits) from the dashboard. As customers chat, the dashboard deducts the credits. Think of credits like call-minutes or SMS tokens – they let you pay only for what you use.",
    },
    {
      question: "How many credits does each chat or feature use?",
      answer:
        "It varies by content. A plain text message typically costs 1 credit (incoming or outgoing). If Aioncy replies with an image or audio file, that might cost 2–3 credits. Complex actions like booking a service or generating a detailed answer might cost 5–10 credits. (Exact values depend on your plan.) You can always check your usage in real time on the dashboard. Generally, 1 credit ≈ 1 short message; so, 100 credits might cover a few days of light chatting.",
    },
    {
      question: "How do I add or buy more credits?",
      answer:
        "In the Aioncy dashboard, go to Billing → Add Credits. There you can select a pack (e.g. 500 credits, 1000 credits) and pay via NPR bank transfer, eSewa, Khalti or card. Once payment is confirmed, the credits immediately appear in your account. You can top up anytime, even mid-subscription. For convenience, we offer discounts on larger bundles (for example, 10% off a 10,000-credit pack).",
    },
    {
      question: "Do unused AI credits expire?",
      answer:
        "It depends on the type of credit you are using. To ensure you always get the best value, our system naturally uses your subscription plan credits first, before touching any of your top-up balances. Here is how they expire: Subscription Plan Credits: The credits included in your monthly Essential plan (or any future packages) do expire. If they are not used within your billing cycle, they do not carry over and will reset when your monthly subscription renews. Top-Up Credits: Any extra credits you purchase as an add-on top-up never expire. They stay safely in your account balance indefinitely and will only be used once your regular monthly subscription credits are completely exhausted.",
    },
    {
      question: "What happens if I run out of credits?",
      answer:
        "When you reach zero credits, Aioncy will notify you in the dashboard and stop the AI from responding to new messages. (You'll see a red No Credits warning.) Customers can still send messages, but the AI will pause. To continue automation, simply purchase more credits or upgrade your plan. You can still export your conversation history or download transcripts even if the AI is inactive.",
    },
    {
      question: "Are there free or trial credits for new users?",
      answer:
        "Yes. Every new account is credited with 100 free trial credits upon signup. These let you try out Aioncy's features (WhatsApp responses, lead capture, booking) at no cost for 14 days. The trial is a one-time gift – once you exhaust those credits or the trial period ends, you'll need to purchase more credits or start a paid plan.",
    },
    {
      question: "Can I get a refund for unused credits?",
      answer:
        "Typically, credits are non-refundable once purchased. However, you can simply stop buying more. Unused credits can remain in your account indefinitely or be used later. For very large or special purchases, please contact us – in some cases we can offer account credit or adjustments. Our goal is transparency: no hidden fees, so you pay only for what you use.",
    },
  ],
};
