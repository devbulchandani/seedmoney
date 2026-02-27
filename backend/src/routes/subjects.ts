import { Router, Request, Response } from 'express';
import Subject from '../models/Subject';
import Practical from '../models/Practical';
import Notes from '../models/Notes';

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

export default router;
