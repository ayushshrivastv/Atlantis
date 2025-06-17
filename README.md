# Atlantis: The Search for a Lost City

As Earth's temperature climbs and the shadow of global warming grows longer, understanding our world has never been more urgent. Atlantis uses the power of artificial intelligence and MongoDB’s advanced search capabilities to help researchers, activists, and everyday citizens explore public climate data with ease and clarity. Whether comparing air quality in New Delhi and London or analysing decades of rainfall shifts, Atlantis turns complex datasets into simple, human readable insights.

This is about more than data—this is about protecting the only home we’ve ever known. Atlantis gives voice to the numbers, so we can make better choices, tell better stories, and build a future where Earth can breathe again.

For a detailed technical architecture and component flow diagrams, please refer to the [YouTube](https://youtu.be/mIFipOSwufE?feature=shared)

P.S. After 48 hours of coding, debugging, and more coffee than water—here’s the project. The backend isn’t quite where I want it yet—there’s still a lot of work ahead.

![Screenshot 2025-06-18 at 1 49 03 AM](https://github.com/user-attachments/assets/859de50e-4b92-4028-91db-b922eb6f2940)

### Inspiration

I was inspired by the growing urgency of climate change—and the painful truth that, while data is everywhere, understanding it remains out of reach for many. I've imagined Atlantis not as a lost city, but as a second chance: a platform where artificial intelligence becomes the voice of Earth itself. I wanted to build something that could help people see the warning signs before they fade into history.

### What I've Learned

Building Atlantis taught me how to combine structured and unstructured data from public climate sources, and how to apply MongoDB full text and vector search to retrieve the most relevant, meaningful information. I explored prompt engineering, embedding strategies, and semantic search—learning how to turn raw numbers into human context using AI. To enhance AI driven reasoning and summarisation, I also integrated the Gemini API, enabling more natural and multimodal understanding of complex climate data.

```mermaid
graph TD
    A[User] -- Natural Language Query --> B{Next.js Frontend};
    B -- API Request --> C{Next.js API Route: /api/chat};
    C -- Determines Intent --> D[Google Gemini Pro];
    D -- Extracts Entities & Location --> C;
    C -- If Data Needed --> E[External APIs: Open-Meteo];
    C -- If Context Needed --> F[MongoDB Atlas];
    F -- Vector Search --> G[Climate Data Embeddings];
    G -- Returns Similar Documents --> F;
    E -- Returns Live Data --> C;
    F -- Returns Contextual Data --> C;
    C -- Compiles Data & Context --> D;
    D -- Generates Human-like Response --> C;
    C -- Sends Response --> B;
    B -- Displays Response --> A;
    C -- Logs Conversation (Async) --> F;

    subgraph "Frontend (Vercel)"
        B
    end

    subgraph "Backend (Serverless Functions)"
        C
    end

    subgraph "AI & Data Layer"
        D
        E
        F
    end
```

### The Role of MongoDB Atlas: The Intelligent Data Foundation

At the heart of Project Atlantis lies **MongoDB Atlas**. It is not just a database; it is the lifeblood of our application, the engine that turns raw data into profound climate intelligence. We chose MongoDB for two critical reasons: its flexible document model and its state-of-the-art **Vector Search**.

Climate data is inherently messy, diverse, and semi-structured. MongoDB's JSON-like documents allow us to store this varied information—from satellite imagery metadata to historical weather patterns—in a single, unified repository without rigid schemas. This flexibility is paramount.

More importantly, we leverage **MongoDB's Vector Search** to find the hidden signals in the noise. By converting climate data points into high-dimensional vector embeddings, we can perform lightning-fast similarity searches. When a user asks, "Which areas are experiencing weather patterns similar to the 2012 Dust Bowl?", we aren't just querying for keywords. We are searching for conceptual similarity across millions of data points, uncovering analogous events and providing a level of context that would be impossible with traditional databases. This is the future of data analysis, and it's built on MongoDB


![Screenshot 2025-06-18 at 1 48 12 AM](https://github.com/user-attachments/assets/5368482a-3bbe-4e0e-971b-b9a8bc0fc4e3)


### The Role of Gemini Pro: The Conversational Soul

If MongoDB is the foundation, **Google's Gemini Pro** is the soul of our platform. It is the user's brilliant and tireless research assistant. Gemini's role is twofold:

1.  **Intent Recognition & Orchestration:** Gemini first deciphers the user's natural language query. It understands the nuances of human language, extracts key entities (like locations, dates, and climate phenomena), and determines the user's underlying intent. It then acts as an orchestrator, deciding whether to fetch live data from an external API, query MongoDB for historical context, or simply provide a direct answer.

2.  **Synthesis & Narrative Generation:** Once the necessary data is gathered, it is handed back to Gemini. The model then synthesizes this raw information—live weather data, historical analogues from MongoDB, and its own vast knowledge base—into a clear, concise, and scientifically grounded narrative. It transforms tables of numbers into a story you can understand.

The synergy between Gemini's advanced reasoning and MongoDB's vector search capabilities creates a seamless and extraordinarily powerful analytical experience.

## File Structure

```
/Users/ayushsrivastava/OpenAPI/
├── .next/                     # Next.js build output
├── node_modules/              # Project dependencies
├── public/                    # Static assets (images, fonts)
├── src/
│   ├── app/
│   │   ├── api/                 # API routes (e.g., /api/chat)
│   │   │   └── chat/route.ts
│   │   ├── documentation/     # Documentation page
│   │   │   └── page.tsx
│   │   ├── news/              # News page
│   │   │   └── page.tsx
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout with global sidebar
│   │   └── page.tsx           # Homepage component
│   ├── components/
│   │   ├── ui/                # Shadcn UI components
│   │   ├── ChatInput.tsx      # Reusable chat input component
│   │   ├── ContentFeed.tsx    # Content feed for the homepage
│   │   ├── FloatingChatContainer.tsx # Main chat interface
│   │   └── LeftSidebar.tsx    # Global navigation sidebar
│   └── lib/
│       └── utils.ts           # Utility functions (e.g., cn for Tailwind)
├── .env.local                 # Environment variables (GIT-IGNORED)
├── next.config.js             # Next.js configuration
├── package.json               # Project manifest
├── README.md                  # You are here!
└── tsconfig.json              # TypeScript configuration
```

## Getting Started

First, ensure you have Node.js and npm installed. Then, set up your environment variables by creating a `.env.local` file in the root directory:

```
GEMINI_API_KEY=your_gemini_api_key_here
MONGO_URI=your_mongodb_atlas_connection_string_here
```

Next, install the project dependencies:

```bash
npm install
```

Finally, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see Project Atlantis in action.
