import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Subject from './models/Subject';
import Practical from './models/Practical';
import Notes from './models/Notes';
import PYQ from './models/PYQ';
import Viva from './models/Viva';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://devbulchandani:kPZmr8LhcPCxfPdm@seedmoney.eamrqg3.mongodb.net/seedmoney_academics";

const seedData = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB for seeding');

        // Clear existing data
        await Subject.deleteMany({});
        await Practical.deleteMany({});
        await Notes.deleteMany({});
        await PYQ.deleteMany({});
        await Viva.deleteMany({});

        // 1. Data Structures
        const ds = await Subject.create({
            name: 'Data Structures and Algorithms',
            semester: 3,
            courses: ['B.Tech', 'BCA', 'B.Sc CS'],
            description: 'Understanding core data structures and algorithm analysis.',
        });

        await Practical.create({
            subjectId: ds._id,
            title: 'Implement Array Stack',
            problemStatement: 'Write a program to implement a Stack using Array with push, pop and peek operations.',
            solution: 'class Stack {\n  constructor() { this.items = []; }\n  push(elem) { this.items.push(elem); }\n  pop() { return this.items.pop(); }\n}'
        });

        await Notes.create({
            subjectId: ds._id,
            title: 'Unit 1 - Introduction to Data Structures',
            driveUrl: 'https://drive.google.com/file/d/sample-ds-unit1',
            unit: 1
        });

        await PYQ.create({
            subjectId: ds._id,
            company: 'Google',
            question: 'Implement a LRU Cache with O(1) operations',
            type: 'code',
            difficulty: 'Hard',
            tags: ['Hash Map', 'Doubly Linked List', 'Design']
        });

        await PYQ.create({
            subjectId: ds._id,
            company: 'Amazon',
            question: 'What is the time complexity of searching in a balanced BST?',
            type: 'mcq',
            difficulty: 'Easy',
            tags: ['BST', 'Time Complexity'],
            options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
            correctAnswer: 1,
            explanation: 'In a balanced BST, the height is log n, so search takes O(log n) time.'
        });

        await Viva.create({
            subjectId: ds._id,
            question: 'Which data structure uses LIFO (Last In First Out) principle?',
            options: ['Queue', 'Stack', 'Array', 'Linked List'],
            correctAnswer: 1,
            explanation: 'Stack follows LIFO principle where the last element added is the first one to be removed.',
            difficulty: 'Easy'
        });

        await Viva.create({
            subjectId: ds._id,
            question: 'What is the worst-case time complexity of Quick Sort?',
            options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
            correctAnswer: 2,
            explanation: 'Quick Sort has O(n²) worst-case complexity when the pivot is always the smallest or largest element.',
            difficulty: 'Medium'
        });

        // 2. Database Management Systems
        const dbms = await Subject.create({
            name: 'Database Management Systems',
            semester: 4,
            courses: ['B.Tech', 'BCA'],
            description: 'Relational database concepts, SQL, and normalization.',
        });

        await Practical.create({
            subjectId: dbms._id,
            title: 'SQL CREATE and INSERT',
            problemStatement: 'Create a student table and insert 5 records.',
            solution: 'CREATE TABLE Student (id INT, name VARCHAR(50));\nINSERT INTO Student VALUES (1, "Alice");'
        });

        await Notes.create({
            subjectId: dbms._id,
            title: 'Unit 1 - Database Architecture',
            driveUrl: 'https://drive.google.com/file/d/sample-dbms-unit1',
            unit: 1
        });

        await PYQ.create({
            subjectId: dbms._id,
            company: 'Amazon',
            question: 'Design a database schema for an e-commerce platform',
            type: 'code',
            difficulty: 'Medium',
            tags: ['Database Design', 'Normalization', 'ER Diagram']
        });

        await PYQ.create({
            subjectId: dbms._id,
            company: 'Oracle',
            question: 'Which normal form eliminates transitive dependencies?',
            type: 'mcq',
            difficulty: 'Medium',
            tags: ['Normalization', 'Database Theory'],
            options: ['1NF', '2NF', '3NF', 'BCNF'],
            correctAnswer: 2,
            explanation: 'Third Normal Form (3NF) eliminates transitive dependencies.'
        });

        await Viva.create({
            subjectId: dbms._id,
            question: 'What does ACID stand for in database transactions?',
            options: [
                'Atomicity, Consistency, Isolation, Durability',
                'Accuracy, Consistency, Integrity, Durability',
                'Atomicity, Correctness, Isolation, Data',
                'Accuracy, Completeness, Isolation, Durability'
            ],
            correctAnswer: 0,
            explanation: 'ACID stands for Atomicity, Consistency, Isolation, and Durability.',
            difficulty: 'Easy'
        });

        // 3. Operating Systems
        const os = await Subject.create({
            name: 'Operating Systems',
            semester: 4,
            courses: ['B.Tech', 'BCA'],
            description: 'Process management, memory management, and file systems.',
        });

        await Practical.create({
            subjectId: os._id,
            title: 'Fork system call',
            problemStatement: 'Write a C program to create a child process using fork().',
            solution: '#include <stdio.h>\n#include <unistd.h>\nint main() { fork(); printf("Hello\\n"); return 0; }'
        });

        await Notes.create({
            subjectId: os._id,
            title: 'Unit 2 - Process Scheduling',
            driveUrl: 'https://drive.google.com/file/d/sample-os-unit2',
            unit: 2
        });

        await PYQ.create({
            subjectId: os._id,
            company: 'Microsoft',
            question: 'Explain deadlock and how to prevent it in operating systems',
            type: 'code',
            difficulty: 'Medium',
            tags: ['Deadlock', 'Concurrency', 'Resource Management']
        });

        await PYQ.create({
            subjectId: os._id,
            company: 'Intel',
            question: 'Which scheduling algorithm can cause starvation?',
            type: 'mcq',
            difficulty: 'Medium',
            tags: ['Scheduling', 'Process Management'],
            options: ['Round Robin', 'FCFS', 'Priority Scheduling', 'SJF'],
            correctAnswer: 2,
            explanation: 'Priority Scheduling can cause starvation when high-priority processes keep arriving.'
        });

        await Viva.create({
            subjectId: os._id,
            question: 'What is a context switch?',
            options: [
                'Switching between user mode and kernel mode',
                'Switching from one process to another',
                'Switching between threads',
                'Switching between memory pages'
            ],
            correctAnswer: 1,
            explanation: 'Context switch is the process of storing and restoring the state of a process so that execution can be resumed later.',
            difficulty: 'Easy'
        });

        // 4. Computer Networks
        const cn = await Subject.create({
            name: 'Computer Networks',
            semester: 5,
            courses: ['B.Tech', 'B.Sc CS'],
            description: 'OSI model, TCP/IP, routing protocols, and network security.',
        });

        await Practical.create({
            subjectId: cn._id,
            title: 'Socket Programming in Python',
            problemStatement: 'Create a simple TCP client-server chat program.',
            solution: 'import socket\n# Server code handling binding and listening...'
        });

        await Notes.create({
            subjectId: cn._id,
            title: 'Unit 1 - Physical Layer',
            driveUrl: 'https://drive.google.com/file/d/sample-cn-unit1',
            unit: 1
        });

        await PYQ.create({
            subjectId: cn._id,
            company: 'Cisco',
            question: 'Explain TCP 3-way handshake and its importance',
            type: 'code',
            difficulty: 'Easy',
            tags: ['TCP/IP', 'Networking', 'Protocols']
        });

        await PYQ.create({
            subjectId: cn._id,
            company: 'Juniper',
            question: 'Which layer of OSI model is responsible for routing?',
            type: 'mcq',
            difficulty: 'Easy',
            tags: ['OSI Model', 'Networking'],
            options: ['Data Link Layer', 'Network Layer', 'Transport Layer', 'Session Layer'],
            correctAnswer: 1,
            explanation: 'The Network Layer (Layer 3) is responsible for routing packets across networks.'
        });

        await Viva.create({
            subjectId: cn._id,
            question: 'What is the default subnet mask for a Class C network?',
            options: ['255.0.0.0', '255.255.0.0', '255.255.255.0', '255.255.255.255'],
            correctAnswer: 2,
            explanation: 'Class C networks use 255.255.255.0 as the default subnet mask.',
            difficulty: 'Easy'
        });

        // 5. Software Engineering
        const se = await Subject.create({
            name: 'Software Engineering',
            semester: 5,
            courses: ['B.Tech', 'BCA'],
            description: 'Software development life cycles, agile, and testing.',
        });

        await Practical.create({
            subjectId: se._id,
            title: 'Create ER Diagram',
            problemStatement: 'Draw an ER diagram for a Library Management System.',
            solution: '[Diagram description: Entities include Book, Member, Librarian with corresponding attributes and relationships.]'
        });

        await Notes.create({
            subjectId: se._id,
            title: 'Unit 3 - Agile Methodologies',
            driveUrl: 'https://drive.google.com/file/d/sample-se-unit3',
            unit: 3
        });

        await PYQ.create({
            subjectId: se._id,
            company: 'Atlassian',
            question: 'What are the key differences between Agile and Waterfall methodologies?',
            type: 'code',
            difficulty: 'Easy',
            tags: ['SDLC', 'Agile', 'Waterfall']
        });

        await PYQ.create({
            subjectId: se._id,
            company: 'Thoughtworks',
            question: 'Which testing technique is used to test individual units of code?',
            type: 'mcq',
            difficulty: 'Easy',
            tags: ['Testing', 'Software Quality'],
            options: ['Integration Testing', 'Unit Testing', 'System Testing', 'Acceptance Testing'],
            correctAnswer: 1,
            explanation: 'Unit Testing focuses on testing individual units or components of the software.'
        });

        await Viva.create({
            subjectId: se._id,
            question: 'What does CI/CD stand for?',
            options: [
                'Continuous Integration/Continuous Deployment',
                'Code Integration/Code Deployment',
                'Continuous Improvement/Continuous Development',
                'Central Integration/Central Deployment'
            ],
            correctAnswer: 0,
            explanation: 'CI/CD stands for Continuous Integration and Continuous Deployment/Delivery.',
            difficulty: 'Easy'
        });

        console.log('Database seeded successfully with 5 sample subjects!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedData();
