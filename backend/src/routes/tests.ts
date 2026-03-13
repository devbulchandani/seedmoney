import { Router, Request, Response } from 'express';
import Test from '../models/Test';
import Question from '../models/Question';

const router = Router();

// GET /api/tests - Get all tests with optional filters
router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const { subjectId, semester, course, search, difficulty } = req.query;
        
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
        
        // Filter by difficulty
        if (difficulty) {
            tests = tests.filter(test => test.difficulty === difficulty);
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

// GET /api/tests/:id - Get specific test with populated questions
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const test = await Test.findById(req.params.id)
            .populate('subjectId')
            .populate('questions');
        
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

// POST /api/tests - Create new test
router.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const test = new Test(req.body);
        await test.save();
        res.status(201).json(test);
    } catch (error) {
        res.status(400).json({ message: 'Error creating test', error });
    }
});

// PUT /api/tests/:id - Update test
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const test = await Test.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!test) {
            res.status(404).json({ message: 'Test not found' });
            return;
        }
        res.json(test);
    } catch (error) {
        res.status(400).json({ message: 'Error updating test', error });
    }
});

// DELETE /api/tests/:id - Delete test
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const test = await Test.findByIdAndDelete(req.params.id);
        if (!test) {
            res.status(404).json({ message: 'Test not found' });
            return;
        }
        res.json({ message: 'Test deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting test', error });
    }
});

export default router;
