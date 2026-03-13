import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Subject from './models/Subject';
import Question from './models/Question';
import Test from './models/Test';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://devbulchandani:kPZmr8LhcPCxfPdm@seedmoney.eamrqg3.mongodb.net/seedmoney_academics";

const seedData = async () => {
    try {
            await mongoose.connect(MONGO_URI);
            console.log('Connected to MongoDB for seeding questions and tests');
    
            // Clear existing questions and tests
            await Question.deleteMany({});
            await Test.deleteMany({});
    
            console.log('Creating question bank and tests...');
    
            // Get existing subjects
            const subjects = await Subject.find();
            
            if (subjects.length === 0) {
                console.log('No subjects found. Please run the main seed file first.');
                return;
            }
    
            // Create questions for each subject
            for (const subject of subjects) {
                console.log(`Creating questions for ${subject.name}...`);
                
                // Create 20 questions per subject with various difficulties and companies
                const questions = [];
                
                // Easy questions (8)
                for (let i = 0; i < 8; i++) {
                    questions.push({
                        subjectId: subject._id,
                        question: `${subject.name} - Easy Question ${i + 1}: What is the basic concept?`,
                        options: [
                            'Option A - Incorrect',
                            'Option B - Correct Answer',
                            'Option C - Incorrect',
                            'Option D - Incorrect'
                        ],
                        correctAnswer: 1,
                        explanation: 'This is the correct answer because it demonstrates the fundamental concept.',
                        difficulty: 'Easy',
                        tags: ['Basics', 'Fundamentals'],
                        companies: i % 2 === 0 ? ['Google', 'Microsoft'] : ['Amazon', 'Facebook'],
                        category: subject.name
                    });
                }
                
                // Medium questions (8)
                for (let i = 0; i < 8; i++) {
                    questions.push({
                        subjectId: subject._id,
                        question: `${subject.name} - Medium Question ${i + 1}: How would you implement this feature?`,
                        options: [
                            'Option A - Partially correct',
                            'Option B - Incorrect',
                            'Option C - Correct Answer',
                            'Option D - Incorrect'
                        ],
                        correctAnswer: 2,
                        explanation: 'This approach is optimal because it balances time and space complexity.',
                        difficulty: 'Medium',
                        tags: ['Implementation', 'Design'],
                        companies: i % 3 === 0 ? ['Apple', 'Netflix'] : i % 3 === 1 ? ['Uber', 'Airbnb'] : ['LinkedIn', 'Twitter'],
                        category: subject.name
                    });
                }
                
                // Hard questions (4)
                for (let i = 0; i < 4; i++) {
                    questions.push({
                        subjectId: subject._id,
                        question: `${subject.name} - Hard Question ${i + 1}: Analyze the complex scenario and optimize.`,
                        options: [
                            'Option A - Incorrect',
                            'Option B - Incorrect',
                            'Option C - Incorrect',
                            'Option D - Correct Answer'
                        ],
                        correctAnswer: 3,
                        explanation: 'This solution uses advanced techniques to achieve optimal performance.',
                        difficulty: 'Hard',
                        tags: ['Advanced', 'Optimization'],
                        companies: i % 2 === 0 ? ['Google', 'Amazon'] : ['Microsoft', 'Apple'],
                        category: subject.name
                    });
                }
                
                // Insert all questions for this subject
                const createdQuestions = await Question.insertMany(questions);
                console.log(`Created ${createdQuestions.length} questions for ${subject.name}`);
                
                // Create 3 tests for this subject using the created questions
                
                // Test 1: Easy Quick Quiz (10 questions, 15 minutes)
                const easyQuestions = createdQuestions.filter(q => q.difficulty === 'Easy').slice(0, 10);
                await Test.create({
                    subjectId: subject._id,
                    title: `${subject.name} - Quick Quiz`,
                    description: 'A quick assessment covering basic concepts',
                    duration: 15,
                    totalQuestions: easyQuestions.length,
                    difficulty: 'Easy',
                    questions: easyQuestions.map(q => q._id)
                });
                
                // Test 2: Mixed Comprehensive Test (15 questions, 30 minutes)
                const mixedQuestions = [
                    ...createdQuestions.filter(q => q.difficulty === 'Easy').slice(0, 5),
                    ...createdQuestions.filter(q => q.difficulty === 'Medium').slice(0, 7),
                    ...createdQuestions.filter(q => q.difficulty === 'Hard').slice(0, 3)
                ];
                await Test.create({
                    subjectId: subject._id,
                    title: `${subject.name} - Comprehensive Test`,
                    description: 'A thorough test covering all difficulty levels',
                    duration: 30,
                    totalQuestions: mixedQuestions.length,
                    difficulty: 'Mixed',
                    questions: mixedQuestions.map(q => q._id)
                });
                
                // Test 3: Hard Challenge (10 questions, 25 minutes)
                const hardQuestions = [
                    ...createdQuestions.filter(q => q.difficulty === 'Medium').slice(0, 6),
                    ...createdQuestions.filter(q => q.difficulty === 'Hard').slice(0, 4)
                ];
                await Test.create({
                    subjectId: subject._id,
                    title: `${subject.name} - Advanced Challenge`,
                    description: 'A challenging test for advanced learners',
                    duration: 25,
                    totalQuestions: hardQuestions.length,
                    difficulty: 'Hard',
                    questions: hardQuestions.map(q => q._id)
                });
                
                console.log(`Created 3 tests for ${subject.name}`);
            }
    
            console.log('✅ Question bank and tests seeded successfully!');
            console.log(`Total Questions: ${await Question.countDocuments()}`);
            console.log(`Total Tests: ${await Test.countDocuments()}`);
            
            // Show some statistics
            const questionsByDifficulty = await Question.aggregate([
                { $group: { _id: '$difficulty', count: { $sum: 1 } } }
            ]);
            console.log('\nQuestions by Difficulty:');
            questionsByDifficulty.forEach(stat => {
                console.log(`  ${stat._id}: ${stat.count}`);
            });
            
            const allCompanies = await Question.distinct('companies');
            console.log(`\nCompanies represented: ${allCompanies.length}`);
            console.log(`Companies: ${allCompanies.join(', ')}`);
    
        } catch (error) {
            console.error('Error seeding data:', error);
        } finally {
            await mongoose.connection.close();
            console.log('Database connection closed');
        }
};

seedData();
