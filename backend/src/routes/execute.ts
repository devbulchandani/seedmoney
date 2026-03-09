import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();

const PISTON_URL = process.env.PISTON_URL || 'http://localhost:2000/api/v2/execute';

const LANGUAGE_MAP: Record<string, { lang: string; version: string }> = {
    'python': { lang: 'python', version: '3.10.0' },
    'java': { lang: 'java', version: '15.0.2' },
    'c': { lang: 'c', version: '10.2.0' },
    'cpp': { lang: 'cpp', version: '10.2.0' },
    'c++': { lang: 'cpp', version: '10.2.0' },
    'node': { lang: 'javascript', version: '18.15.0' },
    'sqlite3': { lang: 'sqlite3', version: '3.36.0' },
};

const getFileName = (language: string): string => {
    switch (language.toLowerCase()) {
        case 'java': return 'Main.java';
        case 'c': return 'main.c';
        case 'cpp':
        case 'c++': return 'main.cpp';
        default: return 'index'; 
    }
};

interface PistonResponse {
    language: string;
    version: string;
    run: {
        stdout: string;
        stderr: string;
        output: string;
        code: number;
        signal: string | null;
    };
}

router.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const { source_code, language } = req.body;

        if (!source_code || !language) {
            res.status(400).json({ error: 'Missing source_code or language.' });
            return;
        }

        const config = LANGUAGE_MAP[language.toLowerCase()];

        if (!config) {
            res.status(400).json({ error: `Unsupported language: ${language}` });
            return;
        }

        const response = await axios.post<PistonResponse>(PISTON_URL, {
            language: config.lang,
            version: config.version,
            files: [
                {
                    name: getFileName(language),
                    content: source_code
                }
            ]
        });

        const { run, language: usedLang, version: usedVer } = response.data;

        res.json({
            stdout: run.stdout,
            stderr: run.stderr,
            output: run.output,
            exitCode: run.code,
            meta: {
                language: usedLang,
                version: usedVer
            }
        });

    } catch (error: any) {
        const details = error.response?.data?.message || error.message;
        console.error('Execution Error:', details);

        res.status(500).json({
            error: 'Code execution failed',
            details
        });
    }
});

export default router;