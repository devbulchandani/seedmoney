import { Router, Request, Response } from 'express';
import Test from '../models/Test';
import Subject from '../models/Subject';

const router = Router();

// GET /api/tests - Get all tests with optional filters
router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const { subjectId, semester, course, search } = req.query;
        
        let tests = await Test.find().populate('subjectId');
        
        // Filter by subject
        if (subjectId) {
            tests = tests.filter(test => test.subjectId._id.toString() === subjectId);
        }
        
        // Filter by semester
        if (semester) {
            tests = tests.filter(test => (test.subjectId as any).semester === Number(semester));
        }
        
        // Filter by course
        if (course) {
            tests = tests.filter(test => (test.subjectId as any).courses.includes(course));
        }
        
        // Search filter
        if (search) {
            const searchLower = (search as string).toLowerCase();
            tests = tests.filter(test => 
                test.title.toLowerCase().includes(searchLower) ||
                test.description.toLowerCase().includes(searchLower) ||
                (test.subjectId as any).name.toLowerCase().includes(searchLower)
            );
        }
        
        res.json(tests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tests', error });
    }
});

// GET /api/tests/:id - Get specific test
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const test = await Test.findById(req.params.id).populate('subjectId');
        if (!test) {
            res.status(404).json({ message: 'Test not found' });
            return;
        }
        res.json(test);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching test', error });
    }
});

// GET /api/tests/subject/:subjectId - Get tests for a subject
router.get('/subject/:subjectId', async (req: Request, res: Response): Promise<void> => {
    try {
        const tests = await Test.find({ subjectId: req.params.subjectId }).populate('subjectId');
        res.json(tests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tests', error });
    }
});

export default router;
