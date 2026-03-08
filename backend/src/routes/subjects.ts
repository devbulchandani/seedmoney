import { Router, Request, Response } from 'express';
import Subject from '../models/Subject';
import Practical from '../models/Practical';
import Notes from '../models/Notes';
import PYQ from '../models/PYQ';
import Viva from '../models/Viva';

const router = Router();

// GET /api/subjects
router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const subjects = await Subject.find();
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subjects', error });
    }
});

// GET /api/subjects/:id
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const subject = await Subject.findById(req.params.id);
        if (!subject) {
            res.status(404).json({ message: 'Subject not found' });
            return;
        }
        res.json(subject);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subject', error });
    }
});

// GET /api/subjects/:id/practicals
router.get('/:id/practicals', async (req: Request, res: Response): Promise<void> => {
    try {
        const practicals = await Practical.find({ subjectId: req.params.id });
        res.json(practicals);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching practicals', error });
    }
});

// GET /api/subjects/:id/notes
router.get('/:id/notes', async (req: Request, res: Response): Promise<void> => {
    try {
        const notes = await Notes.find({ subjectId: req.params.id }).sort('unit');
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notes', error });
    }
});

// GET /api/subjects/:id/pyqs
router.get('/:id/pyqs', async (req: Request, res: Response): Promise<void> => {
    try {
        const pyqs = await PYQ.find({ subjectId: req.params.id });
        res.json(pyqs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching PYQs', error });
    }
});

// GET /api/subjects/:id/vivas
router.get('/:id/vivas', async (req: Request, res: Response): Promise<void> => {
    try {
        const vivas = await Viva.find({ subjectId: req.params.id });
        res.json(vivas);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching viva questions', error });
    }
});

// GET /api/practicals/:id
router.get('/practical/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const practical = await Practical.findById(req.params.id);
        if (!practical) {
            res.status(404).json({ message: 'Practical not found' });
            return;
        }
        res.json(practical);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching practical', error });
    }
});

// GET /api/pyqs/:id
router.get('/pyq/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const pyq = await PYQ.findById(req.params.id);
        if (!pyq) {
            res.status(404).json({ message: 'PYQ not found' });
            return;
        }
        res.json(pyq);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching PYQ', error });
    }
});

// GET /api/viva/:id
router.get('/viva/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const viva = await Viva.findById(req.params.id);
        if (!viva) {
            res.status(404).json({ message: 'Viva question not found' });
            return;
        }
        res.json(viva);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching viva question', error });
    }
});

export default router;
