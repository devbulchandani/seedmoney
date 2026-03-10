import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Subject from './models/Subject';
import Practical from './models/Practical';
import Notes from './models/Notes';
import PYQ from './models/PYQ';
import Viva from './models/Viva';
import Test from './models/Test';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://devbulchandani:kPZmr8LhcPCxfPdm@seedmoney.eamrqg3.mongodb.net/seedmoney_academics";

const seedData = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB for seeding');

        await Subject.deleteMany({});
        await Practical.deleteMany({});
        await Notes.deleteMany({});
        await PYQ.deleteMany({});
        await Viva.deleteMany({});
        await Test.deleteMany({});

        console.log('Creating 10 subjects with comprehensive data...');
        
        const subjects = [];

        // Subject 1: Data Structures
        const ds = await Subject.create({ name: 'Data Structures and Algorithms', semester: 3, courses: ['B.Tech', 'BCA', 'B.Sc CS'], description: 'Core data structures and algorithm analysis.' });
        subjects.push(ds);
        await Practical.insertMany([
            { subjectId: ds._id, title: 'Array Stack Implementation', problemStatement: 'Implement Stack using Array with push, pop, peek operations.', solution: 'class Stack { constructor() { this.items = []; } push(x) { this.items.push(x); } pop() { return this.items.pop(); } }' },
            { subjectId: ds._id, title: 'Linked List Operations', problemStatement: 'Create singly linked list with insert, delete, search.', solution: 'class Node { constructor(data) { this.data = data; this.next = null; } }' },
            { subjectId: ds._id, title: 'Binary Search Tree', problemStatement: 'Implement BST with insert, search, inorder traversal.', solution: 'class TreeNode { constructor(val) { this.val = val; this.left = this.right = null; } }' },
            { subjectId: ds._id, title: 'Queue using Stacks', problemStatement: 'Implement queue using two stacks.', solution: 'class Queue { constructor() { this.s1 = []; this.s2 = []; } enqueue(x) { this.s1.push(x); } }' },
            { subjectId: ds._id, title: 'Hash Table with Chaining', problemStatement: 'Implement hash table with collision handling.', solution: 'class HashTable { constructor(size) { this.table = new Array(size); } }' }
        ]);
        await PYQ.insertMany([
            { subjectId: ds._id, company: 'Google', question: 'Implement LRU Cache with O(1) operations', type: 'code', difficulty: 'Hard', tags: ['Hash Map', 'Design'] },
            { subjectId: ds._id, company: 'Amazon', question: 'Time complexity of balanced BST search?', type: 'mcq', difficulty: 'Easy', tags: ['BST'], options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'], correctAnswer: 1, explanation: 'Balanced BST has O(log n) search.' },
            { subjectId: ds._id, company: 'Microsoft', question: 'Find middle of linked list in one pass', type: 'code', difficulty: 'Medium', tags: ['Linked List'] },
            { subjectId: ds._id, company: 'Facebook', question: 'Best average-case sorting algorithm?', type: 'mcq', difficulty: 'Medium', tags: ['Sorting'], options: ['Bubble Sort', 'Merge Sort', 'Selection Sort', 'Insertion Sort'], correctAnswer: 1, explanation: 'Merge Sort has O(n log n) average case.' },
            { subjectId: ds._id, company: 'Apple', question: 'Detect cycle in linked list', type: 'code', difficulty: 'Medium', tags: ['Linked List'] }
        ]);
        await Viva.insertMany([
            { subjectId: ds._id, question: 'Which uses LIFO principle?', options: ['Queue', 'Stack', 'Array', 'List'], correctAnswer: 1, explanation: 'Stack uses LIFO.', difficulty: 'Easy' },
            { subjectId: ds._id, question: 'Quick Sort worst-case complexity?', options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'], correctAnswer: 2, explanation: 'O(n²) worst case.', difficulty: 'Medium' },
            { subjectId: ds._id, question: 'BFS uses which structure?', options: ['Stack', 'Queue', 'Array', 'Tree'], correctAnswer: 1, explanation: 'BFS uses Queue.', difficulty: 'Easy' },
            { subjectId: ds._id, question: 'Recursive space complexity?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correctAnswer: 1, explanation: 'O(n) for call stack.', difficulty: 'Medium' },
            { subjectId: ds._id, question: 'Preorder visits which first?', options: ['Left', 'Right', 'Root', 'Leaf'], correctAnswer: 2, explanation: 'Root first in preorder.', difficulty: 'Easy' }
        ]);
        await Notes.create({ subjectId: ds._id, title: 'Unit 1 - Data Structures Intro', driveUrl: 'https://drive.google.com/file/d/ds-unit1', unit: 1 });

        // Subject 2: DBMS
        const dbms = await Subject.create({ name: 'Database Management Systems', semester: 4, courses: ['B.Tech', 'BCA'], description: 'Relational databases, SQL, normalization.' });
        subjects.push(dbms);
        await Practical.insertMany([
            { subjectId: dbms._id, title: 'SQL CREATE & INSERT', problemStatement: 'Create student table, insert 5 records.', solution: 'CREATE TABLE Student (id INT, name VARCHAR(50)); INSERT INTO Student VALUES (1, "Alice");' },
            { subjectId: dbms._id, title: 'SQL Joins', problemStatement: 'Demonstrate INNER, LEFT, RIGHT joins.', solution: 'SELECT * FROM Students s INNER JOIN Courses c ON s.course_id = c.id;' },
            { subjectId: dbms._id, title: 'Normalization to 3NF', problemStatement: 'Normalize table to 3NF.', solution: '-- Decompose eliminating transitive dependencies' },
            { subjectId: dbms._id, title: 'Stored Procedures', problemStatement: 'Create procedure for grade calculation.', solution: 'CREATE PROCEDURE CalcGrade(IN marks INT, OUT grade CHAR) BEGIN IF marks >= 90 THEN SET grade = "A"; END IF; END;' },
            { subjectId: dbms._id, title: 'Triggers', problemStatement: 'Create trigger to log salary changes.', solution: 'CREATE TRIGGER salary_log AFTER UPDATE ON employees FOR EACH ROW INSERT INTO audit VALUES (NEW.id);' }
        ]);
        await PYQ.insertMany([
            { subjectId: dbms._id, company: 'Amazon', question: 'Design e-commerce database schema', type: 'code', difficulty: 'Medium', tags: ['Design', 'Normalization'] },
            { subjectId: dbms._id, company: 'Oracle', question: 'Which NF eliminates transitive dependencies?', type: 'mcq', difficulty: 'Medium', tags: ['Normalization'], options: ['1NF', '2NF', '3NF', 'BCNF'], correctAnswer: 2, explanation: '3NF eliminates transitive dependencies.' },
            { subjectId: dbms._id, company: 'IBM', question: 'Find second highest salary', type: 'code', difficulty: 'Medium', tags: ['SQL'] },
            { subjectId: dbms._id, company: 'SAP', question: 'Purpose of indexing?', type: 'mcq', difficulty: 'Easy', tags: ['Indexing'], options: ['Faster writes', 'Faster reads', 'Validation', 'Encryption'], correctAnswer: 1, explanation: 'Indexing speeds up reads.' },
            { subjectId: dbms._id, company: 'MongoDB', question: 'Explain ACID properties', type: 'code', difficulty: 'Easy', tags: ['Transactions'] }
        ]);
        await Viva.insertMany([
            { subjectId: dbms._id, question: 'ACID stands for?', options: ['Atomicity, Consistency, Isolation, Durability', 'Accuracy, Consistency, Integrity, Durability', 'Atomicity, Correctness, Isolation, Data', 'Other'], correctAnswer: 0, explanation: 'ACID = Atomicity, Consistency, Isolation, Durability.', difficulty: 'Easy' },
            { subjectId: dbms._id, question: 'Remove table command?', options: ['DELETE', 'DROP', 'REMOVE', 'TRUNCATE'], correctAnswer: 1, explanation: 'DROP removes table.', difficulty: 'Easy' },
            { subjectId: dbms._id, question: 'Foreign key is?', options: ['Primary key of another table', 'Unique ID', 'Index', 'Encrypted key'], correctAnswer: 0, explanation: 'References primary key.', difficulty: 'Easy' },
            { subjectId: dbms._id, question: 'Join returning all records?', options: ['INNER', 'LEFT', 'RIGHT', 'FULL OUTER'], correctAnswer: 3, explanation: 'FULL OUTER returns all.', difficulty: 'Medium' },
            { subjectId: dbms._id, question: 'Denormalization is?', options: ['Adding redundancy', 'Removing redundancy', 'Creating indexes', 'Deleting data'], correctAnswer: 0, explanation: 'Adds redundancy for performance.', difficulty: 'Medium' }
        ]);
        await Notes.create({ subjectId: dbms._id, title: 'Unit 1 - DB Architecture', driveUrl: 'https://drive.google.com/file/d/dbms-unit1', unit: 1 });

        // Subject 3: Operating Systems
        const os = await Subject.create({ name: 'Operating Systems', semester: 4, courses: ['B.Tech', 'BCA'], description: 'Process management, memory, file systems.' });
        subjects.push(os);
        await Practical.insertMany([
            { subjectId: os._id, title: 'Fork System Call', problemStatement: 'Create child process using fork().', solution: '#include <stdio.h>\n#include <unistd.h>\nint main() { fork(); printf("Hello\\n"); return 0; }' },
            { subjectId: os._id, title: 'FCFS Scheduling', problemStatement: 'Implement FCFS CPU scheduling.', solution: '// Calculate waiting time and turnaround time for FCFS' },
            { subjectId: os._id, title: 'Producer-Consumer', problemStatement: 'Solve using semaphores.', solution: '// Use semaphores for synchronization' },
            { subjectId: os._id, title: 'Page Replacement', problemStatement: 'Implement LRU page replacement.', solution: '// Track page access order, replace least recently used' },
            { subjectId: os._id, title: 'Banker Algorithm', problemStatement: 'Implement deadlock avoidance.', solution: '// Check safe state before resource allocation' }
        ]);
        await PYQ.insertMany([
            { subjectId: os._id, company: 'Microsoft', question: 'Explain deadlock prevention methods', type: 'code', difficulty: 'Medium', tags: ['Deadlock', 'Concurrency'] },
            { subjectId: os._id, company: 'Intel', question: 'Which causes starvation?', type: 'mcq', difficulty: 'Medium', tags: ['Scheduling'], options: ['Round Robin', 'FCFS', 'Priority', 'SJF'], correctAnswer: 2, explanation: 'Priority scheduling can cause starvation.' },
            { subjectId: os._id, company: 'IBM', question: 'Implement thread synchronization', type: 'code', difficulty: 'Hard', tags: ['Threads', 'Synchronization'] },
            { subjectId: os._id, company: 'Red Hat', question: 'Virtual memory purpose?', type: 'mcq', difficulty: 'Easy', tags: ['Memory'], options: ['Increase RAM', 'Use disk as RAM', 'Faster access', 'Data security'], correctAnswer: 1, explanation: 'Virtual memory uses disk as extended RAM.' },
            { subjectId: os._id, company: 'Oracle', question: 'Explain context switching', type: 'code', difficulty: 'Easy', tags: ['Process Management'] }
        ]);
        await Viva.insertMany([
            { subjectId: os._id, question: 'Context switch is?', options: ['User to kernel mode', 'Process to process', 'Thread switch', 'Memory page'], correctAnswer: 1, explanation: 'Switching between processes.', difficulty: 'Easy' },
            { subjectId: os._id, question: 'Deadlock conditions count?', options: ['2', '3', '4', '5'], correctAnswer: 2, explanation: '4 conditions: mutual exclusion, hold and wait, no preemption, circular wait.', difficulty: 'Medium' },
            { subjectId: os._id, question: 'Kernel mode allows?', options: ['User programs', 'All instructions', 'Limited access', 'Network only'], correctAnswer: 1, explanation: 'Kernel mode allows all instructions.', difficulty: 'Easy' },
            { subjectId: os._id, question: 'Thrashing occurs when?', options: ['High CPU usage', 'Excessive paging', 'Low memory', 'Disk full'], correctAnswer: 1, explanation: 'Excessive paging causes thrashing.', difficulty: 'Hard' },
            { subjectId: os._id, question: 'Semaphore is used for?', options: ['Scheduling', 'Synchronization', 'Memory allocation', 'File access'], correctAnswer: 1, explanation: 'Semaphores provide synchronization.', difficulty: 'Medium' }
        ]);
        await Notes.create({ subjectId: os._id, title: 'Unit 2 - Process Scheduling', driveUrl: 'https://drive.google.com/file/d/os-unit2', unit: 2 });

        // Subject 4: Computer Networks
        const cn = await Subject.create({ name: 'Computer Networks', semester: 5, courses: ['B.Tech', 'B.Sc CS'], description: 'OSI model, TCP/IP, routing, security.' });
        subjects.push(cn);
        await Practical.insertMany([
            { subjectId: cn._id, title: 'Socket Programming', problemStatement: 'Create TCP client-server chat.', solution: 'import socket\n# Server binding and listening' },
            { subjectId: cn._id, title: 'Subnet Calculation', problemStatement: 'Calculate subnet mask and hosts.', solution: '// Given IP and CIDR, calculate network details' },
            { subjectId: cn._id, title: 'HTTP Server', problemStatement: 'Build simple HTTP server.', solution: 'const http = require("http");\nhttp.createServer((req, res) => { res.end("Hello"); }).listen(8080);' },
            { subjectId: cn._id, title: 'Packet Sniffer', problemStatement: 'Capture and analyze packets.', solution: '// Use pcap library to capture network packets' },
            { subjectId: cn._id, title: 'DNS Lookup', problemStatement: 'Implement DNS query program.', solution: 'import dns.resolver\nresult = dns.resolver.resolve("example.com", "A")' }
        ]);
        await PYQ.insertMany([
            { subjectId: cn._id, company: 'Cisco', question: 'Explain TCP 3-way handshake', type: 'code', difficulty: 'Easy', tags: ['TCP/IP', 'Protocols'] },
            { subjectId: cn._id, company: 'Juniper', question: 'OSI layer for routing?', type: 'mcq', difficulty: 'Easy', tags: ['OSI'], options: ['Data Link', 'Network', 'Transport', 'Session'], correctAnswer: 1, explanation: 'Network layer handles routing.' },
            { subjectId: cn._id, company: 'Google', question: 'Implement sliding window protocol', type: 'code', difficulty: 'Hard', tags: ['Protocols', 'Flow Control'] },
            { subjectId: cn._id, company: 'Amazon', question: 'HTTP vs HTTPS difference?', type: 'mcq', difficulty: 'Easy', tags: ['Protocols'], options: ['Speed', 'Security', 'Port', 'Method'], correctAnswer: 1, explanation: 'HTTPS adds security with SSL/TLS.' },
            { subjectId: cn._id, company: 'Cloudflare', question: 'Explain CDN working', type: 'code', difficulty: 'Medium', tags: ['CDN', 'Web'] }
        ]);
        await Viva.insertMany([
            { subjectId: cn._id, question: 'Class C subnet mask?', options: ['255.0.0.0', '255.255.0.0', '255.255.255.0', '255.255.255.255'], correctAnswer: 2, explanation: 'Class C uses 255.255.255.0.', difficulty: 'Easy' },
            { subjectId: cn._id, question: 'TCP is?', options: ['Connectionless', 'Connection-oriented', 'Unreliable', 'Broadcast'], correctAnswer: 1, explanation: 'TCP is connection-oriented.', difficulty: 'Easy' },
            { subjectId: cn._id, question: 'Default HTTP port?', options: ['21', '22', '80', '443'], correctAnswer: 2, explanation: 'HTTP uses port 80.', difficulty: 'Easy' },
            { subjectId: cn._id, question: 'MAC address length?', options: ['32 bits', '48 bits', '64 bits', '128 bits'], correctAnswer: 1, explanation: 'MAC address is 48 bits.', difficulty: 'Medium' },
            { subjectId: cn._id, question: 'ARP resolves?', options: ['IP to MAC', 'MAC to IP', 'Domain to IP', 'IP to Domain'], correctAnswer: 0, explanation: 'ARP resolves IP to MAC address.', difficulty: 'Medium' }
        ]);
        await Notes.create({ subjectId: cn._id, title: 'Unit 1 - Physical Layer', driveUrl: 'https://drive.google.com/file/d/cn-unit1', unit: 1 });

        // Subject 5: Software Engineering
        const se = await Subject.create({ name: 'Software Engineering', semester: 5, courses: ['B.Tech', 'BCA'], description: 'SDLC, Agile, testing methodologies.' });
        subjects.push(se);
        await Practical.insertMany([
            { subjectId: se._id, title: 'ER Diagram', problemStatement: 'Draw ER for Library Management.', solution: '// Entities: Book, Member, Librarian with relationships' },
            { subjectId: se._id, title: 'Use Case Diagram', problemStatement: 'Create use case for ATM system.', solution: '// Actors: Customer, Bank; Use cases: Withdraw, Deposit, Check Balance' },
            { subjectId: se._id, title: 'Test Cases', problemStatement: 'Write test cases for login.', solution: '// Test valid login, invalid password, empty fields, SQL injection' },
            { subjectId: se._id, title: 'Class Diagram', problemStatement: 'Design classes for online shopping.', solution: '// Classes: User, Product, Cart, Order with attributes and methods' },
            { subjectId: se._id, title: 'Sequence Diagram', problemStatement: 'Model user registration flow.', solution: '// Show interaction between User, UI, Controller, Database' }
        ]);
        await PYQ.insertMany([
            { subjectId: se._id, company: 'Atlassian', question: 'Agile vs Waterfall differences', type: 'code', difficulty: 'Easy', tags: ['SDLC', 'Agile'] },
            { subjectId: se._id, company: 'Thoughtworks', question: 'Unit testing tests?', type: 'mcq', difficulty: 'Easy', tags: ['Testing'], options: ['Integration', 'Unit', 'System', 'Acceptance'], correctAnswer: 1, explanation: 'Unit testing tests individual units.' },
            { subjectId: se._id, company: 'Microsoft', question: 'Design patterns for singleton', type: 'code', difficulty: 'Medium', tags: ['Design Patterns'] },
            { subjectId: se._id, company: 'Google', question: 'Scrum sprint duration?', type: 'mcq', difficulty: 'Easy', tags: ['Agile', 'Scrum'], options: ['1 week', '2-4 weeks', '1 month', '3 months'], correctAnswer: 1, explanation: 'Sprints are typically 2-4 weeks.' },
            { subjectId: se._id, company: 'Amazon', question: 'Explain TDD approach', type: 'code', difficulty: 'Medium', tags: ['Testing', 'TDD'] }
        ]);
        await Viva.insertMany([
            { subjectId: se._id, question: 'CI/CD stands for?', options: ['Continuous Integration/Deployment', 'Code Integration/Deployment', 'Continuous Improvement/Development', 'Central Integration/Deployment'], correctAnswer: 0, explanation: 'CI/CD = Continuous Integration/Deployment.', difficulty: 'Easy' },
            { subjectId: se._id, question: 'Black box testing checks?', options: ['Code structure', 'Functionality', 'Performance', 'Security'], correctAnswer: 1, explanation: 'Black box tests functionality without code knowledge.', difficulty: 'Easy' },
            { subjectId: se._id, question: 'Waterfall model is?', options: ['Iterative', 'Sequential', 'Incremental', 'Spiral'], correctAnswer: 1, explanation: 'Waterfall is sequential.', difficulty: 'Easy' },
            { subjectId: se._id, question: 'Code review benefits?', options: ['Faster development', 'Better quality', 'Less documentation', 'More features'], correctAnswer: 1, explanation: 'Code review improves quality.', difficulty: 'Medium' },
            { subjectId: se._id, question: 'Refactoring means?', options: ['Adding features', 'Improving code structure', 'Fixing bugs', 'Writing tests'], correctAnswer: 1, explanation: 'Refactoring improves code structure.', difficulty: 'Medium' }
        ]);
        await Notes.create({ subjectId: se._id, title: 'Unit 3 - Agile Methodologies', driveUrl: 'https://drive.google.com/file/d/se-unit3', unit: 3 });

        // Subject 6: Web Development
        const web = await Subject.create({ name: 'Web Development', semester: 5, courses: ['B.Tech', 'BCA', 'B.Sc CS'], description: 'HTML, CSS, JavaScript, React, Node.js.' });
        subjects.push(web);
        await Practical.insertMany([
            { subjectId: web._id, title: 'Responsive Layout', problemStatement: 'Create responsive webpage with flexbox.', solution: '<div class="container">\n  <div class="item">Item 1</div>\n</div>\n.container { display: flex; }' },
            { subjectId: web._id, title: 'REST API', problemStatement: 'Build CRUD API with Express.', solution: 'app.get("/api/users", (req, res) => { res.json(users); });' },
            { subjectId: web._id, title: 'React Component', problemStatement: 'Create reusable button component.', solution: 'function Button({ onClick, children }) { return <button onClick={onClick}>{children}</button>; }' },
            { subjectId: web._id, title: 'Form Validation', problemStatement: 'Validate email and password.', solution: 'function validateEmail(email) { return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email); }' },
            { subjectId: web._id, title: 'JWT Authentication', problemStatement: 'Implement JWT-based auth.', solution: 'const token = jwt.sign({ userId: user.id }, SECRET_KEY);' }
        ]);
        await PYQ.insertMany([
            { subjectId: web._id, company: 'Facebook', question: 'Implement infinite scroll', type: 'code', difficulty: 'Medium', tags: ['React', 'Performance'] },
            { subjectId: web._id, company: 'Netflix', question: 'CSS box model includes?', type: 'mcq', difficulty: 'Easy', tags: ['CSS'], options: ['Content only', 'Content, padding', 'Content, padding, border', 'Content, padding, border, margin'], correctAnswer: 3, explanation: 'Box model includes all four.' },
            { subjectId: web._id, company: 'Airbnb', question: 'Build autocomplete search', type: 'code', difficulty: 'Hard', tags: ['JavaScript', 'UI'] },
            { subjectId: web._id, company: 'Twitter', question: 'Virtual DOM purpose?', type: 'mcq', difficulty: 'Medium', tags: ['React'], options: ['Faster rendering', 'Better SEO', 'Security', 'Styling'], correctAnswer: 0, explanation: 'Virtual DOM optimizes rendering.' },
            { subjectId: web._id, company: 'Uber', question: 'Implement debouncing', type: 'code', difficulty: 'Medium', tags: ['JavaScript', 'Performance'] }
        ]);
        await Viva.insertMany([
            { subjectId: web._id, question: 'HTTP methods for CRUD?', options: ['GET, POST, PUT, DELETE', 'READ, WRITE, UPDATE, REMOVE', 'FETCH, SEND, MODIFY, ERASE', 'LOAD, SAVE, CHANGE, DROP'], correctAnswer: 0, explanation: 'GET, POST, PUT, DELETE for CRUD.', difficulty: 'Easy' },
            { subjectId: web._id, question: 'localStorage vs sessionStorage?', options: ['Same thing', 'Persistence', 'Size limit', 'Security'], correctAnswer: 1, explanation: 'localStorage persists, sessionStorage clears on close.', difficulty: 'Medium' },
            { subjectId: web._id, question: 'CORS stands for?', options: ['Cross-Origin Resource Sharing', 'Common Origin Resource System', 'Cross-Origin Request Security', 'Common Object Resource Sharing'], correctAnswer: 0, explanation: 'CORS = Cross-Origin Resource Sharing.', difficulty: 'Easy' },
            { subjectId: web._id, question: 'Promise states?', options: ['2', '3', '4', '5'], correctAnswer: 1, explanation: 'Pending, fulfilled, rejected.', difficulty: 'Medium' },
            { subjectId: web._id, question: 'Semantic HTML improves?', options: ['Speed', 'Accessibility', 'Security', 'Styling'], correctAnswer: 1, explanation: 'Semantic HTML improves accessibility.', difficulty: 'Easy' }
        ]);
        await Notes.create({ subjectId: web._id, title: 'Unit 1 - HTML & CSS Basics', driveUrl: 'https://drive.google.com/file/d/web-unit1', unit: 1 });

        // Subject 7: Machine Learning
        const ml = await Subject.create({ name: 'Machine Learning', semester: 6, courses: ['B.Tech', 'B.Sc CS'], description: 'Supervised, unsupervised learning, neural networks.' });
        subjects.push(ml);
        await Practical.insertMany([
            { subjectId: ml._id, title: 'Linear Regression', problemStatement: 'Implement linear regression from scratch.', solution: 'import numpy as np\nclass LinearRegression:\n  def fit(self, X, y):\n    self.coef_ = np.linalg.inv(X.T @ X) @ X.T @ y' },
            { subjectId: ml._id, title: 'K-Means Clustering', problemStatement: 'Implement K-means algorithm.', solution: '// Initialize centroids, assign points, update centroids, repeat' },
            { subjectId: ml._id, title: 'Decision Tree', problemStatement: 'Build decision tree classifier.', solution: 'from sklearn.tree import DecisionTreeClassifier\nclf = DecisionTreeClassifier()' },
            { subjectId: ml._id, title: 'Neural Network', problemStatement: 'Create simple neural network.', solution: 'import tensorflow as tf\nmodel = tf.keras.Sequential([tf.keras.layers.Dense(10)])' },
            { subjectId: ml._id, title: 'Data Preprocessing', problemStatement: 'Handle missing values and scaling.', solution: 'from sklearn.preprocessing import StandardScaler\nscaler = StandardScaler()' }
        ]);
        await PYQ.insertMany([
            { subjectId: ml._id, company: 'Google', question: 'Implement gradient descent', type: 'code', difficulty: 'Hard', tags: ['Optimization', 'Algorithms'] },
            { subjectId: ml._id, company: 'OpenAI', question: 'Supervised learning requires?', type: 'mcq', difficulty: 'Easy', tags: ['ML Basics'], options: ['Labeled data', 'Unlabeled data', 'No data', 'Big data'], correctAnswer: 0, explanation: 'Supervised learning needs labeled data.' },
            { subjectId: ml._id, company: 'DeepMind', question: 'Build CNN for image classification', type: 'code', difficulty: 'Hard', tags: ['Deep Learning', 'CNN'] },
            { subjectId: ml._id, company: 'Tesla', question: 'Overfitting means?', type: 'mcq', difficulty: 'Medium', tags: ['Model Evaluation'], options: ['Poor training', 'Poor generalization', 'Fast training', 'High accuracy'], correctAnswer: 1, explanation: 'Overfitting = poor generalization to new data.' },
            { subjectId: ml._id, company: 'Amazon', question: 'Implement cross-validation', type: 'code', difficulty: 'Medium', tags: ['Validation', 'Evaluation'] }
        ]);
        await Viva.insertMany([
            { subjectId: ml._id, question: 'Bias-variance tradeoff?', options: ['Speed vs accuracy', 'Underfitting vs overfitting', 'Training vs testing', 'Precision vs recall'], correctAnswer: 1, explanation: 'Bias-variance relates to underfitting vs overfitting.', difficulty: 'Hard' },
            { subjectId: ml._id, question: 'Activation function purpose?', options: ['Speed up training', 'Introduce non-linearity', 'Reduce overfitting', 'Normalize data'], correctAnswer: 1, explanation: 'Activation functions add non-linearity.', difficulty: 'Medium' },
            { subjectId: ml._id, question: 'Gradient descent updates?', options: ['Weights', 'Data', 'Labels', 'Features'], correctAnswer: 0, explanation: 'Gradient descent updates weights.', difficulty: 'Easy' },
            { subjectId: ml._id, question: 'K in K-NN is?', options: ['Clusters', 'Neighbors', 'Features', 'Layers'], correctAnswer: 1, explanation: 'K is number of neighbors.', difficulty: 'Easy' },
            { subjectId: ml._id, question: 'Confusion matrix shows?', options: ['Training time', 'Classification results', 'Feature importance', 'Data distribution'], correctAnswer: 1, explanation: 'Confusion matrix shows classification performance.', difficulty: 'Medium' }
        ]);
        await Notes.create({ subjectId: ml._id, title: 'Unit 1 - ML Introduction', driveUrl: 'https://drive.google.com/file/d/ml-unit1', unit: 1 });

        // Subject 8: Cloud Computing
        const cloud = await Subject.create({ name: 'Cloud Computing', semester: 6, courses: ['B.Tech'], description: 'AWS, Azure, Docker, Kubernetes, microservices.' });
        subjects.push(cloud);
        await Practical.insertMany([
            { subjectId: cloud._id, title: 'EC2 Instance Setup', problemStatement: 'Launch and configure EC2 instance.', solution: '// Use AWS Console or CLI to launch EC2, configure security groups' },
            { subjectId: cloud._id, title: 'Docker Container', problemStatement: 'Create Dockerfile for Node app.', solution: 'FROM node:14\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nEXPOSE 3000\nCMD ["npm", "start"]' },
            { subjectId: cloud._id, title: 'S3 Bucket Operations', problemStatement: 'Upload and retrieve files from S3.', solution: 'import boto3\ns3 = boto3.client("s3")\ns3.upload_file("file.txt", "bucket", "file.txt")' },
            { subjectId: cloud._id, title: 'Load Balancer', problemStatement: 'Configure application load balancer.', solution: '// Create ALB, configure target groups, health checks' },
            { subjectId: cloud._id, title: 'Kubernetes Deployment', problemStatement: 'Deploy app with K8s.', solution: 'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: myapp' }
        ]);
        await PYQ.insertMany([
            { subjectId: cloud._id, company: 'AWS', question: 'Design scalable architecture', type: 'code', difficulty: 'Hard', tags: ['Architecture', 'Scalability'] },
            { subjectId: cloud._id, company: 'Microsoft', question: 'IaaS vs PaaS vs SaaS?', type: 'mcq', difficulty: 'Easy', tags: ['Cloud Models'], options: ['Same thing', 'Service levels', 'Pricing models', 'Security levels'], correctAnswer: 1, explanation: 'Different service levels: Infrastructure, Platform, Software.' },
            { subjectId: cloud._id, company: 'Google Cloud', question: 'Implement auto-scaling', type: 'code', difficulty: 'Medium', tags: ['Scalability', 'DevOps'] },
            { subjectId: cloud._id, company: 'IBM', question: 'Docker vs VM?', type: 'mcq', difficulty: 'Medium', tags: ['Containers'], options: ['Same thing', 'Isolation level', 'Speed', 'Cost'], correctAnswer: 1, explanation: 'Docker provides container-level isolation, VMs provide hardware-level.' },
            { subjectId: cloud._id, company: 'Oracle', question: 'Setup CI/CD pipeline', type: 'code', difficulty: 'Medium', tags: ['DevOps', 'CI/CD'] }
        ]);
        await Viva.insertMany([
            { subjectId: cloud._id, question: 'Public vs private cloud?', options: ['Cost', 'Ownership', 'Speed', 'Security'], correctAnswer: 1, explanation: 'Public is shared, private is dedicated infrastructure.', difficulty: 'Easy' },
            { subjectId: cloud._id, question: 'Horizontal scaling means?', options: ['Bigger servers', 'More servers', 'Faster network', 'More storage'], correctAnswer: 1, explanation: 'Horizontal scaling adds more servers.', difficulty: 'Easy' },
            { subjectId: cloud._id, question: 'Container orchestration tool?', options: ['Docker', 'Kubernetes', 'Jenkins', 'Terraform'], correctAnswer: 1, explanation: 'Kubernetes orchestrates containers.', difficulty: 'Medium' },
            { subjectId: cloud._id, question: 'Serverless means?', options: ['No servers', 'Managed servers', 'Virtual servers', 'Cloud servers'], correctAnswer: 1, explanation: 'Serverless = provider manages servers.', difficulty: 'Medium' },
            { subjectId: cloud._id, question: 'CDN purpose?', options: ['Storage', 'Content delivery', 'Computing', 'Database'], correctAnswer: 1, explanation: 'CDN delivers content from edge locations.', difficulty: 'Easy' }
        ]);
        await Notes.create({ subjectId: cloud._id, title: 'Unit 1 - Cloud Fundamentals', driveUrl: 'https://drive.google.com/file/d/cloud-unit1', unit: 1 });

        // Subject 9: Artificial Intelligence
        const ai = await Subject.create({ name: 'Artificial Intelligence', semester: 6, courses: ['B.Tech', 'B.Sc CS'], description: 'Search algorithms, knowledge representation, expert systems.' });
        subjects.push(ai);
        await Practical.insertMany([
            { subjectId: ai._id, title: 'BFS and DFS', problemStatement: 'Implement graph traversal algorithms.', solution: 'def bfs(graph, start):\n  visited = set()\n  queue = [start]\n  while queue:\n    node = queue.pop(0)' },
            { subjectId: ai._id, title: 'A* Algorithm', problemStatement: 'Implement A* pathfinding.', solution: '// Use priority queue with f(n) = g(n) + h(n)' },
            { subjectId: ai._id, title: 'Minimax Algorithm', problemStatement: 'Implement for Tic-Tac-Toe.', solution: 'def minimax(board, depth, isMax):\n  if terminal(board): return evaluate(board)' },
            { subjectId: ai._id, title: 'Expert System', problemStatement: 'Build rule-based system.', solution: '// Define rules: IF condition THEN action' },
            { subjectId: ai._id, title: 'Genetic Algorithm', problemStatement: 'Solve optimization problem.', solution: '// Initialize population, selection, crossover, mutation' }
        ]);
        await PYQ.insertMany([
            { subjectId: ai._id, company: 'Google', question: 'Implement alpha-beta pruning', type: 'code', difficulty: 'Hard', tags: ['Game Theory', 'Search'] },
            { subjectId: ai._id, company: 'IBM Watson', question: 'Heuristic function is?', type: 'mcq', difficulty: 'Medium', tags: ['Search'], options: ['Exact cost', 'Estimated cost', 'Random value', 'Fixed value'], correctAnswer: 1, explanation: 'Heuristic estimates cost to goal.' },
            { subjectId: ai._id, company: 'DeepMind', question: 'Build constraint satisfaction solver', type: 'code', difficulty: 'Hard', tags: ['CSP', 'Search'] },
            { subjectId: ai._id, company: 'OpenAI', question: 'Turing test evaluates?', type: 'mcq', difficulty: 'Easy', tags: ['AI Basics'], options: ['Speed', 'Intelligence', 'Accuracy', 'Efficiency'], correctAnswer: 1, explanation: 'Turing test evaluates machine intelligence.' },
            { subjectId: ai._id, company: 'Microsoft', question: 'Implement forward chaining', type: 'code', difficulty: 'Medium', tags: ['Knowledge Representation'] }
        ]);
        await Viva.insertMany([
            { subjectId: ai._id, question: 'Strong AI vs Weak AI?', options: ['Speed', 'Consciousness', 'Accuracy', 'Cost'], correctAnswer: 1, explanation: 'Strong AI has consciousness, weak AI simulates intelligence.', difficulty: 'Hard' },
            { subjectId: ai._id, question: 'Informed search uses?', options: ['No information', 'Heuristics', 'Random choice', 'Brute force'], correctAnswer: 1, explanation: 'Informed search uses heuristics.', difficulty: 'Medium' },
            { subjectId: ai._id, question: 'Hill climbing can get stuck in?', options: ['Global maximum', 'Local maximum', 'Minimum', 'Plateau'], correctAnswer: 1, explanation: 'Hill climbing can get stuck in local maximum.', difficulty: 'Medium' },
            { subjectId: ai._id, question: 'Knowledge base contains?', options: ['Data', 'Facts and rules', 'Code', 'Images'], correctAnswer: 1, explanation: 'Knowledge base stores facts and rules.', difficulty: 'Easy' },
            { subjectId: ai._id, question: 'Propositional logic uses?', options: ['Numbers', 'True/False', 'Probabilities', 'Fuzzy values'], correctAnswer: 1, explanation: 'Propositional logic uses boolean values.', difficulty: 'Easy' }
        ]);
        await Notes.create({ subjectId: ai._id, title: 'Unit 1 - AI Introduction', driveUrl: 'https://drive.google.com/file/d/ai-unit1', unit: 1 });

        // Subject 10: Cyber Security
        const cyber = await Subject.create({ name: 'Cyber Security', semester: 7, courses: ['B.Tech'], description: 'Cryptography, network security, ethical hacking.' });
        subjects.push(cyber);
        await Practical.insertMany([
            { subjectId: cyber._id, title: 'Caesar Cipher', problemStatement: 'Implement encryption and decryption.', solution: 'def caesar_encrypt(text, shift):\n  result = ""\n  for char in text:\n    result += chr((ord(char) + shift - 65) % 26 + 65)' },
            { subjectId: cyber._id, title: 'RSA Algorithm', problemStatement: 'Implement public key cryptography.', solution: '// Generate keys, encrypt with public key, decrypt with private key' },
            { subjectId: cyber._id, title: 'Password Strength Checker', problemStatement: 'Validate password complexity.', solution: 'function checkStrength(pwd) {\n  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/.test(pwd);\n}' },
            { subjectId: cyber._id, title: 'SQL Injection Prevention', problemStatement: 'Secure database queries.', solution: '// Use prepared statements: cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))' },
            { subjectId: cyber._id, title: 'Firewall Rules', problemStatement: 'Configure iptables rules.', solution: 'iptables -A INPUT -p tcp --dport 22 -j ACCEPT\niptables -A INPUT -j DROP' }
        ]);
        await PYQ.insertMany([
            { subjectId: cyber._id, company: 'Palo Alto', question: 'Implement AES encryption', type: 'code', difficulty: 'Hard', tags: ['Cryptography', 'Encryption'] },
            { subjectId: cyber._id, company: 'Cisco', question: 'Symmetric vs asymmetric encryption?', type: 'mcq', difficulty: 'Medium', tags: ['Cryptography'], options: ['Speed', 'Key usage', 'Security level', 'Algorithm'], correctAnswer: 1, explanation: 'Symmetric uses same key, asymmetric uses key pair.' },
            { subjectId: cyber._id, company: 'CrowdStrike', question: 'Detect and prevent XSS attacks', type: 'code', difficulty: 'Medium', tags: ['Web Security', 'XSS'] },
            { subjectId: cyber._id, company: 'McAfee', question: 'What is a zero-day exploit?', type: 'mcq', difficulty: 'Easy', tags: ['Security'], options: ['Old vulnerability', 'Unknown vulnerability', 'Fixed vulnerability', 'Harmless bug'], correctAnswer: 1, explanation: 'Zero-day is unknown/unpatched vulnerability.' },
            { subjectId: cyber._id, company: 'Fortinet', question: 'Implement JWT token validation', type: 'code', difficulty: 'Medium', tags: ['Authentication', 'Security'] }
        ]);
        await Viva.insertMany([
            { subjectId: cyber._id, question: 'CIA triad stands for?', options: ['Central Intelligence Agency', 'Confidentiality, Integrity, Availability', 'Computer Internet Access', 'Cyber Information Analysis'], correctAnswer: 1, explanation: 'CIA = Confidentiality, Integrity, Availability.', difficulty: 'Easy' },
            { subjectId: cyber._id, question: 'Phishing is?', options: ['Hacking technique', 'Social engineering', 'Virus type', 'Firewall'], correctAnswer: 1, explanation: 'Phishing is social engineering attack.', difficulty: 'Easy' },
            { subjectId: cyber._id, question: 'HTTPS uses which port?', options: ['80', '443', '8080', '22'], correctAnswer: 1, explanation: 'HTTPS uses port 443.', difficulty: 'Easy' },
            { subjectId: cyber._id, question: 'Hash function is?', options: ['Reversible', 'One-way', 'Symmetric', 'Asymmetric'], correctAnswer: 1, explanation: 'Hash functions are one-way.', difficulty: 'Medium' },
            { subjectId: cyber._id, question: 'DDoS attack targets?', options: ['Data theft', 'Availability', 'Confidentiality', 'Integrity'], correctAnswer: 1, explanation: 'DDoS attacks target availability.', difficulty: 'Medium' }
        ]);
        await Notes.create({ subjectId: cyber._id, title: 'Unit 1 - Security Fundamentals', driveUrl: 'https://drive.google.com/file/d/cyber-unit1', unit: 1 });

        // Create Tests for each subject
        console.log('Creating tests...');
        
        for (const subject of subjects) {
            // Create 2 tests per subject
            await Test.create({
                subjectId: subject._id,
                title: `${subject.name} - Quick Quiz`,
                description: 'Test your knowledge with this quick 10-question quiz',
                duration: 15,
                totalQuestions: 10,
                difficulty: 'Easy',
                questions: [
                    { question: 'Sample question 1 for quick understanding', options: ['Option A', 'Option B', 'Option C', 'Option D'], correctAnswer: 0 },
                    { question: 'Sample question 2 for basic concepts', options: ['Option A', 'Option B', 'Option C', 'Option D'], correctAnswer: 1 },
                    { question: 'Sample question 3 for fundamentals', options: ['Option A', 'Option B', 'Option C', 'Option D'], correctAnswer: 2 },
                    { question: 'Sample question 4 for core topics', options: ['Option A', 'Option B', 'Option C', 'Option D'], correctAnswer: 3 },
                    { question: 'Sample question 5 for key concepts', options: ['Option A', 'Option B', 'Option C', 'Option D'], correctAnswer: 0 },
                    { question: 'Sample question 6 for important topics', options: ['Option A', 'Option B', 'Option C', 'Option D'], correctAnswer: 1 },
                    { question: 'Sample question 7 for essential knowledge', options: ['Option A', 'Option B', 'Option C', 'Option D'], correctAnswer: 2 },
                    { question: 'Sample question 8 for basic understanding', options: ['Option A', 'Option B', 'Option C', 'Option D'], correctAnswer: 3 },
                    { question: 'Sample question 9 for quick revision', options: ['Option A', 'Option B', 'Option C', 'Option D'], correctAnswer: 0 },
                    { question: 'Sample question 10 for practice', options: ['Option A', 'Option B', 'Option C', 'Option D'], correctAnswer: 1 }
                ]
            });

            await Test.create({
                subjectId: subject._id,
                title: `${subject.name} - Comprehensive Test`,
                description: 'In-depth test covering all major topics',
                duration: 30,
                totalQuestions: 20,
                difficulty: 'Mixed',
                questions: Array.from({ length: 20 }, (_, i) => ({
                    question: `Comprehensive question ${i + 1} covering advanced topics`,
                    options: ['Option A', 'Option B', 'Option C', 'Option D'],
                    correctAnswer: i % 4
                }))
            });
        }

        console.log(`✅ Successfully seeded ${subjects.length} subjects!`);
        console.log('📚 Each subject has:');
        console.log('   - 5 Practicals');
        console.log('   - 5 PYQs (mix of MCQ and Coding)');
        console.log('   - 5 Viva Questions');
        console.log('   - 1 Notes resource');
        console.log('   - 2 Timed Tests');
        console.log(`📝 Total tests created: ${subjects.length * 2}`);
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedData();
