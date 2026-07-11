import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

function getAic() {
  if (!aiClient) {
    if (!apiKey) {
      console.warn("GEMINI_API_KEY environment variable is not defined. SAFAL Teacher AI sandbox will run in simulation mode.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for SAFAL Teacher AI (Curriculum Assistant Demo)
  app.post("/api/teacher-ai", async (req, res) => {
    try {
      const { grade, subject, topic, language, focusArea } = req.body;

      if (!grade || !subject || !topic) {
        return res.status(400).json({ error: "Please provide grade, subject, and topic." });
      }

      const client = getAic();
      const promptLang = language === "Nepali" ? "Nepali language" : "English language";
      
      const prompt = `You are SAFAL Teacher AI, a high-end curriculum-aligned AI teaching assistant built specifically for teachers in Nepal.
Your goal is to generate a comprehensive, highly practical, and professional educational lesson planning document in ${promptLang}.

Context for generation:
- Grade: ${grade} (aligned with Curriculum Development Centre - CDC Nepal framework)
- Subject: ${subject}
- Topic/Chapter: ${topic}
- Focus Area / Highlight: ${focusArea || "General Comprehensive Lesson Plan"}

Your output must be structured as a beautifully formatted markdown document. It should include:
1. **CDC Nepal Curriculum Context**: Brief overview of matching competencies from the Nepalese curriculum standards for this Grade level.
2. **Specific Learning Objectives**: 3 clear, action-oriented objectives (what student will be able to do, knowledge, skills).
3. **Materials & Resources**: Practical, low-cost or locally available materials (perfect for Schools in Nepal).
4. **Detailed Lesson Delivery Steps (45-Minute Period)**:
   - Warmup & Hook (5 mins)
   - Core Explanation & Concepts (15 mins)
   - Interactive Group Activity / Practical Exercise (15 mins)
   - Wrap-up, Reflection & Assessment (10 mins)
5. **Classroom Assessment / Evaluation**: 3-4 assessment questions (mix of local application and conceptual questions).
6. **Teacher Tips**: 2 insightful pedagogical guidelines to help teachers handle mixed-ability classrooms in public or private Nepalese classrooms.

Use very clear markdown formatting, with tables or lists as appropriate. Make it incredibly helpful and realistic. If Nepali was selected, write the responses in beautiful, professional and grammatically correct Nepali.`;

      if (!client) {
        // Return a high-quality simulated mock curriculum response if API key is missing
        const simulatedDoc = `## CDC Nepal Curriculum Context
This lesson is designed in alignment with the **Nepalese National Curriculum Development Centre (CDC)** guidelines for Grade ${grade} ${subject}. It promotes critical thinking and practical execution of **${topic}**.

### Specific Learning Objectives
By the end of this 45-minute lesson, students will be able to:
1. Define and explain the primary concepts of **${topic}** with precision.
2. Outline the real-world applications of **${topic}** within the contexts of Nepal's development.
3. Solve basic practical problems utilizing modern conceptual methods.

### Materials & Resources Required
- Local community examples or references.
- Chalkboard, textbook, and graphic posters.
- SAFAL digital concept sheets (where projection is available).

### Step-by-Step Delivery (45-Minute Period)
1. **Warmup & Hook (5 mins):** Engage pupils with high-relevance brainstorming questions linked directly to Nepalese geography, economy, or daily routines.
2. **Core Explanation (15 mins):** Deep dive into the fundamentals of **${topic}**. Use active board-diagrams.
3. **Structured Group Work (15 mins):** Break classroom into 4 dynamic peer-led rows to model and build a practical application map.
4. **Syllabus Synthesis (10 mins):** Quick summary collection, and 2-minute student share-back session.

### Classroom Assessment
- Explain how **${topic}** is critical to Nepal's modern digital transformation.
- Solved sample scenarios checking understanding of intermediate terms.

### SAFAL Teacher Pro-Tips
- *Inclusivity:* Use localized bilingual analogies if abstract concepts require deeper explanation for certain learners.
- *Active Engagement:* Walk around the room during the 15-minute row workshops, prompting quieter students to present.

*(Note: Active API response can be enabled by saving your GEMINI_API_KEY in the Secrets menu.)*`;

        return res.json({ content: simulatedDoc, isSimulated: true });
      }

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are SAFAL Teacher AI. You generate complete, world-class pedagogical materials and lesson plans tailored to Nepal's education system. Provide outstanding markdown styling. Be encouraging, precise, and completely aligned with Nepalese curriculum guidelines.",
        },
      });

      return res.json({ content: response.text, isHtml: false });
    } catch (err: any) {
      console.error("Gemini API Error in /api/teacher-ai:", err);
      return res.status(500).json({ error: "Failed to generate lesson blueprint. This might be due to API rate limits or connectivity." });
    }
  });

  // API Route for Consultation Booking Simulation
  app.post("/api/book-consultation", (req, res) => {
    const { name, email, organization, sector, message, phone } = req.body;
    if (!name || !email || !organization || !sector) {
      return res.status(400).json({ error: "Please provide Name, Email, Organization and Sector." });
    }
    // Simulation logic
    return res.json({
      success: true,
      message: `Namaste, ${name}! Your consultation request regarding '${sector}' for ${organization} has been forwarded to SAFAL AI Innovation team. We will reach back to you at ${email} or via phone within 24 business hours. Let's shape Nepal's AI era!`,
    });
  });

  // API Route for general inquiries
  app.post("/api/contact", (req, res) => {
    const { name, organization, email, phone, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email and message are required fields." });
    }
    return res.json({
      success: true,
      message: `Thank you, ${name}. Your message has been securely submitted to SAFAL AI. Our response coordinators will contact you shortly.`,
    });
  });

  // API Route for AI Chatbot Assistance
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid request. 'messages' array is required." });
      }

      const systemInstruction = `You are 'SAFAL AI Mitra' (सफल एआई मित्र), an intelligent, warm, and highly professional AI advisor chatbot integrated on the SAFAL AI corporate website.
Your objective:
1. Greet users warmly (using "Namaste!" or similar politely) and answer FAQs about SAFAL AI services, products, and training programs correctly.
2. Maintain high contextual alignment with Nepal's cultural, linguistic, and regulatory settings.
3. Guide users to relevant sections of the website by mentioning anchor hashes:
   - For finding the SAFAL Teacher AI Sandbox interactive demo, guide them to '#sandbox'.
   - For booking a consultation or contacting our desk, guide them to '#contact'.
   - For seeing solutions details, guide them to '#solutions'.
   - For learning programs details, guide them to '#training'.
   - For research highlights, guide them to '#research'.
Your grounding facts:
- Services: AI Training & Capacity Building, AI Automation Solutions, AI Product Development, AI Consulting, and Research & Innovation.
- Core Products:
  * SAFAL Teacher AI (National curriculum CDC aligned lesson planning assistant. Educators can practice directly in the Sandbox section on this page!)
  * SAFAL Business AI (Enterprise and SME workflow integrations, customer portals, custom local-language chat bots. Status: Coming Soon)
  * SAFAL Municipal AI (Document cataloging systems, regional dialect speech-to-text, and public grievance processing systems for local governments. Status: Coming Soon)
- Training Streams:
  * AI for Teachers (2-Week Certification on designing rubrics, curriculum integrations)
  * AI for Students (4-Week practical bootcamp on Prompt Engineering, custom chatbots)
  * AI for Professionals (1-Week masterclass on automated copywriting, admin workflows)
  * AI for Organizations (Custom institutional planning, compliance, policy blueprints)
- Contact Info: Level 3, Star Complex, Putalisadak, Kathmandu, Nepal. Ph: +977 1 4455667. Email: info@safalai.org.

Guidelines:
- Keep responses concise, friendly, and structured in clean markdown list or paragraphs. Do not write too much, be helpful and clear.
- Encourage users to click 'Book Consultation' or go to '#contact' to request custom proposals.
- If the user writes in Nepali or requests responses in Nepali, answer in beautiful, polite, grammatically perfect Nepali language.`;

      const client = getAic();
      if (!client) {
        // High quality simulated response if key is not defined yet
        const lastUserMessage = messages[messages.length - 1]?.parts?.[0]?.text || "";
        const query = lastUserMessage.toLowerCase();
        let simulatedText = "";

        if (query.includes("teacher") || query.includes("lesson") || query.includes("cdc") || query.includes("शिक्षक")) {
          simulatedText = `**Namaste!** SAFAL Teacher AI is our flagship product designed specifically for educators in Nepal. It is aligned with the National Curriculum Development Centre (CDC) standards. 

It helps teachers generate comprehensive lesson plans, student assessments, and activity guides instantly. You can test it out right now in our interactive **Sandbox** by scrolling down to the **[#sandbox](#sandbox)** section of this page! 

Would you like to speak to our academic advisors about integrating it into your school list? Please consider clicking the **Book Consultation** button above!`;
        } else if (query.includes("training") || query.includes("course") || query.includes("bootcamp") || query.includes("तालिम")) {
          simulatedText = `**Namaste!** SAFAL AI provides outcome-oriented educational courses in Nepal:
1. **AI for Teachers & Educators** (2-Week Certification)
2. **AI for Students & Learners** (4-Week Practical Bootcamp)
3. **AI for Professionals & Creatives** (1-Week Masterclass)
4. **AI for Organizations & Public Bodies** (Custom Institutional Training)

You can find more detailed syllabi in the **[#training](#training)** section of this page. Let me know if you want me to guide you on how to register!`;
        } else if (query.includes("consult") || query.includes("book") || query.includes("price") || query.includes("contact") || query.includes("परामर्श")) {
          simulatedText = `**Namaste!** We would love to collaborate with you. You can easily book a 30-minute integration consultation call with our leads:
- Simply click the **Book Consultation** button in this chat window to open the booking calendar form.
- Or scroll down to the **[#contact](#contact)** section at the bottom of this page to submit an inquiry blueprint.
- You can also email us directly at **info@safalai.org** or call our Lab Desk at **+977 1 4455667**.`;
        } else if (query.includes("product") || query.includes("service") || query.includes("काम") || query.includes("सेवा")) {
          simulatedText = `**Namaste!** SAFAL AI empowers Nepal's modernization through tailored AI systems:
- **Products:** *SAFAL Teacher AI* (Active Beta, try it in the **[#sandbox](#sandbox)**), *SAFAL Business AI* (Coming Soon), and *SAFAL Municipal AI* (Coming Soon).
- **Core Services:** AI Training & Capacity Building, Custom Workflow Automation, Product Engineering, Strategy Consulting, and localized Research.

To explore our specific services, head to the **[#solutions](#solutions)** section of this page. What specific challenge are you trying to automate today?`;
        } else {
          simulatedText = `**Namaste!** Thank you for visiting SAFAL AI & Innovation Centre. I am SAFAL AI Mitra, your intelligence assistant. 

I can answer questions regarding:
- Our curriculum-aligned **SAFAL Teacher AI** (Beta sandbox on-site)
- Our **AI Training Bootcamps & Certifications** (for educators, professionals, and students)
- Custom **workflow automations and enterprise services**

Feel free to ask me anything! If you want to discuss a specific institutional requirement, you can also click the **Book Consultation** action button in this chatbot anytime.

*(Note: Active AI responses using Gemini are fully functional! Save your GEMINI_API_KEY in the Settings > Secrets menu to activate.)*`;
        }

        return res.json({ content: simulatedText, isSimulated: true });
      }

      // Prepare Gemini contents from the incoming history
      const formattedContents = messages.map(msg => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: msg.parts.map((p: any) => ({ text: p.text }))
      }));

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction,
        }
      });

      return res.json({ content: response.text, isSimulated: false });
    } catch (err: any) {
      console.error("Gemini API Error in /api/chat:", err);
      return res.status(500).json({ error: "Failed to query chat assistant. Please try again." });
    }
  });

  // Vite Integration in Development / Production
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SAFAL AI Server] Running securely on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Fatal server startup crash:", err);
});
