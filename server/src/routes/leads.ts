import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { saveLead, getLeads } from '../services/firebase';
import { LeadData } from '../types';

const router = Router();

// In-memory store as fallback
const leadsStore: (LeadData & { id: string; createdAt: number })[] = [];

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, intent, conversationId } = req.body as LeadData;

    if (!email || typeof email !== 'string') {
      res.status(400).json({ error: 'Email is required' });
      return;
    }

    const lead = {
      id: uuidv4(),
      name: name || '',
      email,
      phone: phone || '',
      intent: intent || '',
      conversationId: conversationId || '',
    };

    // Save to Firebase
    await saveLead(lead);

    // Also keep in memory
    leadsStore.push({ ...lead, createdAt: Date.now() });

    res.status(201).json({ success: true, leadId: lead.id });
  } catch (error) {
    console.error('Lead capture error:', error);
    res.status(500).json({ error: 'Failed to capture lead' });
  }
});

router.get('/', async (_req: Request, res: Response) => {
  try {
    const leads = await getLeads();
    res.json(leads.length > 0 ? leads : leadsStore);
  } catch (error) {
    console.error('Get leads error:', error);
    res.json(leadsStore);
  }
});

export default router;
