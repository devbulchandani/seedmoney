import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Subject from './models/Subject';
import Practical from './models/Practical';
import Notes from './models/Notes';

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
            unit: 1,
            content: 'Introduction to Data Structures. A data structure is a specialized format for organizing and storing data.'
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
            unit: 1,
            content: 'Database architecture, 3-schema architecture, and data independence.'
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
            unit: 2,
            content: 'Process scheduling algorithms: FCFS, SJF, Round Robin.'
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
            unit: 1,
            content: 'Physical Layer: Transmission media, signaling, and multiplexing.'
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
            unit: 3,
            content: 'Agile methodologies: Scrum roles, sprint planning, and retrospectives.'
        });

        console.log('Database seeded successfully with 5 sample subjects!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedData();
