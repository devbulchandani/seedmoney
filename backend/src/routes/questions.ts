import express from 'express';
import Question from '../models/Question';

const router = express.Router();

// Get all questions (with optional filters)
router.get('/', async (req, res) => {
    try {
        const { subjectId, difficulty, company, tag } = req.query;
        
        const filter: any = {};
        if (subjectId) filter.subjectId = subjectId;
        if (difficulty) filter.difficulty = difficulty;
        if (company) filter.companies = company;
        if (tag) filter.tags = tag;

        const questions = await Question.find(filter).populate('subjectId', 'name semester courses');
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching questions', error });
    }
});

// Get question by ID
router.get('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id).populate('subjectId', 'name semester courses');
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.json(question);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching question', error });
    }
});

// Create new question
router.post('/', async (req, res) => {
    try {
        const question = new Question(req.body);
        await question.save();
        res.status(201).json(question);
    } catch (error) {
        res.status(400).json({ message: 'Error creating question', error });
    }
});

// Update question
router.put('/:id', async (req, res) => {
    try {
        const question = await Question.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.json(question);
    } catch (error) {
        res.status(400).json({ message: 'Error updating question', error });
    }
});

// Delete question
router.delete('/:id', async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.json({ message: 'Question deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting question', error });
    }
});

// Get questions by subject
router.get('/subject/:subjectId', async (req, res) => {
    try {
        const questions = await Question.find({ subjectId: req.params.subjectId });
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching questions', error });
    }
});

// Get questions by company
router.get('/company/:companyName', async (req, res) => {
    try {
        const questions = await Question.find({ companies: req.params.companyName })
            .populate('subjectId', 'name semester courses');
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching questions', error });
    }
});

export default router;
