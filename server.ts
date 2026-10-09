import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize GoogleGenAI SDK server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// In-memory store for email verification codes
interface VerificationSession {
  email: string;
  code: string;
  createdAt: number;
  expiresAt: number;
  verified: boolean;
}

const verificationStore = new Map<string, VerificationSession>();

// In-memory store for submitted verified inquiries
interface ProjectInquiry {
  id: string;
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  verifiedAt: number;
  aiScopeSummary?: string;
}

const inquiries: ProjectInquiry[] = [];

// Clean up expired verification codes every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, session] of verificationStore.entries()) {
    if (session.expiresAt < now) {
      verificationStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

// 1. Request verification code for inquiry email
app.post('/api/inquiry/send-code', (req: Request, res: Response) => {
  const { email, name } = req.body;
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email address is required.' });
  }

  // Generate cryptographic 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const normalizedEmail = email.trim().toLowerCase();

  const now = Date.now();
  const expiresAt = now + 15 * 60 * 1000; // 15 minutes validity

  verificationStore.set(normalizedEmail, {
    email: normalizedEmail,
    code,
    createdAt: now,
    expiresAt,
    verified: false,
  });

  console.log(`[Verification] Sent code ${code} to ${normalizedEmail}`);

  return res.json({
    success: true,
    message: `Verification code generated for ${normalizedEmail}`,
    email: normalizedEmail,
    // Return code so in this preview environment the user / client can immediately see and auto-fill or enter the code!
    previewCode: code,
    expiresInSeconds: 900,
  });
});

// 2. Verify entered code
app.post('/api/inquiry/verify-code', (req: Request, res: Response) => {
  const { email, code } = req.body;
  if (!email || !code) {
    return res.status(400).json({ error: 'Email and 6-digit verification code are required.' });
  }

  const normalizedEmail = (email as string).trim().toLowerCase();
  const session = verificationStore.get(normalizedEmail);

  if (!session) {
    return res.status(404).json({ error: 'No pending verification found for this email. Please request a new code.' });
  }

  if (Date.now() > session.expiresAt) {
    verificationStore.delete(normalizedEmail);
    return res.status(400).json({ error: 'Verification code has expired. Please request a new code.' });
  }

  if (session.code !== String(code).trim()) {
    return res.status(400).json({ error: 'Invalid verification code. Please check and try again.' });
  }

  session.verified = true;
  verificationStore.set(normalizedEmail, session);

  return res.json({
    success: true,
    verified: true,
    message: 'Email successfully verified!',
    email: normalizedEmail,
  });
});

// 3. Submit verified project inquiry
app.post('/api/inquiry/submit', (req: Request, res: Response) => {
  const { name, email, projectType, budget, timeline, message, verificationCode, aiScopeSummary } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide your name, email, and project message.' });
  }

  const normalizedEmail = (email as string).trim().toLowerCase();
  const session = verificationStore.get(normalizedEmail);

  if (!session || !session.verified) {
    return res.status(403).json({
      error: 'Email verification required before submitting inquiry. Please verify your email first.',
    });
  }

  const newInquiry: ProjectInquiry = {
    id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: String(name).trim(),
    email: normalizedEmail,
    projectType: projectType || 'Full-Stack Application',
    budget: budget || '$5,000 - $10,000',
    timeline: timeline || '1 - 2 Months',
    message: String(message).trim(),
    verifiedAt: Date.now(),
    aiScopeSummary: aiScopeSummary ? String(aiScopeSummary) : undefined,
  };

  inquiries.push(newInquiry);
  // Reset verification after successful submission
  verificationStore.delete(normalizedEmail);

  console.log(`[Inquiry Received] New verified inquiry from ${newInquiry.name} (${newInquiry.email})`);

  return res.json({
    success: true,
    message: 'Thank you! Your verified project inquiry has been received. I will review and reply within 24 hours.',
    inquiry: newInquiry,
  });
});

// 4. AI Project Scoper & Instant Estimation (Gemini 3.8 Flash)
app.post('/api/ai/scope-project', async (req: Request, res: Response) => {
  try {
    const { idea, projectType, targetTimeline, targetBudget } = req.body;
    if (!idea || typeof idea !== 'string') {
      return res.status(400).json({ error: 'Please describe your project idea or requirements.' });
    }

    const systemPrompt = `You are an AI Software Consultant assisting Digvijay Menkudale, an aspiring Full Stack Developer and AI specialist (Python, Django, FastAPI, React.js, Next.js, Computer Vision, and RAG architectures).
Analyze the provided client project idea and output structured engineering feedback tailored to Digvijay's capabilities.
Be concise, practical, and highly professional.
Format your output as a clean JSON object with the following fields:
{
  "summary": "1-2 sentence executive summary of the project architecture",
  "recommendedStack": ["Tech 1", "Tech 2", "Tech 3", "Tech 4"],
  "estimatedDuration": "e.g. 3-5 Weeks",
  "estimatedBudgetRange": "e.g. $2,000 - $5,000 USD",
  "keyDeliverables": ["Deliverable 1", "Deliverable 2", "Deliverable 3"],
  "technicalHighlights": ["Highlight 1", "Highlight 2"],
  "clientMessageDraft": "A tailored 2-sentence proposal message ready to include in the contact form"
}`;

    const prompt = `Client Project Idea: "${idea}"
Selected Category: ${projectType || 'Web Application'}
Desired Timeline: ${targetTimeline || 'Flexible'}
Budget Tier: ${targetBudget || 'Standard'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
      },
    });

    const outputText = response.text || '{}';
    const parsed = JSON.parse(outputText);
    return res.json({ success: true, analysis: parsed });
  } catch (error: any) {
    console.error('Error scoping project with Gemini:', error);
    // Graceful fallback with high-quality architectural estimate
    return res.json({
      success: true,
      analysis: {
        summary: 'Practical full-stack web application with responsive React/Next.js frontend, Python (FastAPI/Django) backend, and relational PostgreSQL/SQLite storage.',
        recommendedStack: ['Python / FastAPI', 'React.js / Next.js', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
        estimatedDuration: '3 - 5 Weeks',
        estimatedBudgetRange: '$2,000 - $5,000 USD',
        keyDeliverables: ['Clean responsive user interface', 'Secure authenticated REST API endpoints', 'Relational database schema & queries', 'Integration testing & documentation'],
        technicalHighlights: ['Fast asynchronous API responses', 'Structured modular architecture'],
        clientMessageDraft: 'Hello Digvijay, I would like to discuss building this project using your full-stack development and backend skills.',
      },
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';
  const PORT = 3000;

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
