import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import {sql} from "@codemirror/lang-sql"
import { javascript } from '@codemirror/lang-javascript';
import axios from 'axios';
import { Play, Loader2, RefreshCcw, AlertTriangle } from 'lucide-react';
import clsx from 'clsx';

const TEMPLATES: Record<string, string> = {
    c: '#include <stdio.h>\n\nint main() {\n    printf("Hello World\\n");\n    return 0;\n}',
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello World" << endl;\n    return 0;\n}',
    java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}',
    python: 'print("Hello World")',
    node: 'console.log("Hello World from Node.js!");',
    sqlite3: '-- SQL Practice\nCREATE TABLE users (id INTEGER, name TEXT);\nINSERT INTO users VALUES (1, "Dev");\nSELECT * FROM users;'
};
interface CodeEditorProps {
    initialLanguage?: string;
    initialCode?: string;
}

const CodeEditor = ({ initialLanguage = 'c', initialCode }: CodeEditorProps) => {
    const [language, setLanguage] = useState(initialLanguage);
    const [code, setCode] = useState(initialCode || TEMPLATES[initialLanguage]);
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLang = e.target.value;
        setLanguage(newLang);
        // Only reset code to template if they haven't written much custom code
        // For simplicity of MVP, just reset
        setCode(TEMPLATES[newLang]);
        setOutput('');
        setError('');
    };

    const executeCode = async () => {
        setLoading(true);
        setOutput('');
        setError('');

        try {
            const response = await axios.post('http://localhost:5001/api/execute', {
                source_code: code,
                language: language,
            });

            const { stdout, stderr, compile_output, status } = response.data;

            if (compile_output) {
                setError(`Compilation Error:\n${compile_output}`);
            } else if (stderr) {
                setError(`Runtime Error:\n${stderr}`);
            } else if (status && status.id !== 3 && status.description !== 'Accepted') {
                setError(`Status: ${status.description}\n${stderr || compile_output || ''}`);
            } else {
                setOutput(stdout || 'Code executed successfully with no output.');
            }
        } catch (err: any) {
            console.error(err);
            setError(
                err.response?.data?.error ||
                err.response?.data?.details?.error ||
                'Execution request failed. Ensure backend and Judge0 are running.'
            );
        } finally {
            setLoading(false);
        }
    };

    // Select CodeMirror extension based on language
   const getLanguageExtension = () => {
        switch (language) {
            case 'c': case 'cpp': return [cpp()];
            case 'java': return [java()];
            case 'python': return [python()];
            case 'node': return [javascript()];
            case 'sqlite3': return [sql()];
            default: return [python()];
        }
    };

    return (
        <div className="card mt-6 overflow-hidden border border-gray-200 shadow-sm rounded-xl bg-white">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <label htmlFor="language" className="text-sm font-medium text-gray-700">Language:</label>
                    <select
                        id="language"
                        value={language}
                        onChange={handleLanguageChange}
                        disabled={loading}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-white px-3 py-1.5 border outline-none"
                    >
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="c">C</option>
                        <option value="cpp">C++</option>
                        <option value="node">Node.js</option>
                        <option value="sqlite3">SQL (SQLite)</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCode(TEMPLATES[language])}
                        disabled={loading}
                        title="Reset to Default Template"
                        className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
                    >
                        <RefreshCcw size={16} />
                    </button>
                    <button
                        onClick={executeCode}
                        disabled={loading}
                        className={clsx(
                            "inline-flex items-center px-4 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors",
                            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                        )}
                    >
                        {loading ? (
                            <>
                                <Loader2 size={16} className="animate-spin mr-2" />
                                Running...
                            </>
                        ) : (
                            <>
                                <Play size={16} className="mr-2" />
                                Run Code
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Code Editor Area */}
            <div className="h-[400px] w-full overflow-hidden border-b border-gray-200 text-sm">
                <CodeMirror
                    value={code}
                    height="400px"
                    extensions={getLanguageExtension()}
                    onChange={(value) => setCode(value)}
                    className="h-full font-mono"
                    basicSetup={{
                        lineNumbers: true,
                        indentOnInput: true,
                        bracketMatching: true,
                        closeBrackets: true,
                        autocompletion: true,
                    }}
                />
            </div>

            {/* Output Panel */}
            <div className="bg-gray-100 p-4 max-h-[250px] overflow-y-auto">
                <div className="flex items-center text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Output
                </div>

                {loading && (
                    <div className="flex items-center text-gray-400 text-sm py-2">
                        <Loader2 size={16} className="animate-spin mr-2" />
                        Waiting for execution results...
                    </div>
                )}

                {!loading && !output && !error && (
                    <div className="text-gray-400 text-sm italic py-2">Run the code to see output here.</div>
                )}

                {output && (
                    <pre className="text-sm font-mono text-green-700 bg-green-50/50 p-3 rounded border border-green-100 whitespace-pre-wrap">
                        {output}
                    </pre>
                )}

                {error && (
                    <div className="text-sm font-mono text-red-700 bg-red-50 p-3 rounded border border-red-100 whitespace-pre-wrap flex flex-col gap-2">
                        <div className="flex items-center font-bold">
                            <AlertTriangle size={16} className="mr-2" />
                            Execution Error
                        </div>
                        <pre>{error}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CodeEditor;
