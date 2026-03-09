// Helper functions to create seed data
export const createPracticals = (subjectId: any, practicals: any[]) => {
    return practicals.map(p => ({
        subjectId,
        title: p.title,
        problemStatement: p.problem,
        solution: p.solution
    }));
};

export const createPYQs = (subjectId: any, pyqs: any[]) => {
    return pyqs.map(p => ({
        subjectId,
        company: p.company,
        question: p.question,
        type: p.type,
        difficulty: p.difficulty,
        tags: p.tags,
        ...(p.type === 'mcq' && {
            options: p.options,
            correctAnswer: p.correctAnswer,
            explanation: p.explanation
        })
    }));
};

export const createVivas = (subjectId: any, vivas: any[]) => {
    return vivas.map(v => ({
        subjectId,
        question: v.question,
        options: v.options,
        correctAnswer: v.correctAnswer,
        explanation: v.explanation,
        difficulty: v.difficulty
    }));
};

export const createNotes = (subjectId: any, notes: any[]) => {
    return notes.map(n => ({
        subjectId,
        title: n.title,
        driveUrl: n.url,
        unit: n.unit
    }));
};
