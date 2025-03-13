'use client';

import { useState } from 'react';
import { useServer } from '@/hooks/useServer';

export default function Home() {
    const { resultado, loading, error, fetchData } = useServer();
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [operation, setOperation] = useState('suma');
    const [message, setMessage] = useState<string | null>(null);

    const handleClick = async () => {
        if (!num1.trim() || !num2.trim()) {
            setMessage('Por favor, introduce ambos números.');
            return;
        }

        const parsedNum1 = parseFloat(num1);
        const parsedNum2 = parseFloat(num2);

        if (isNaN(parsedNum1) || isNaN(parsedNum2)) {
            setMessage('Ambos valores deben ser números válidos.');
            return;
        }

        setMessage(null);
        await fetchData(parsedNum1, operation, parsedNum2);
    };

    return (
        <main className="min-h-screen min-w-screen flex flex-col justify-center items-center gap-10">
            <div className="flex gap-4">
                <input placeholder="Introduce un número" type="number" value={num1} onChange={(e) => setNum1(e.target.value)} className="border p-2 rounded-md" />

                <select name="operation" id="operation" className="text-xl font-bold border p-2 rounded-md" value={operation} onChange={(e) => setOperation(e.target.value)}>
                    <option value="suma">+</option>
                    <option value="resta">-</option>
                    <option value="multiplicacion">×</option>
                    <option value="division">÷</option>
                </select>

                <input placeholder="Introduce un número" type="number" value={num2} onChange={(e) => setNum2(e.target.value)} className="border p-2 rounded-md" />
            </div>

            <button className="bg-orange-500 rounded-xl hover:bg-indigo-800 px-10 py-2 text-3xl text-white transition-all" onClick={handleClick} disabled={loading}>Calcular</button>

            {loading && (<div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            )}

            {error && <span className="text-red-500">{error}</span>}

            {message && <span className="font-bold">{message}</span>}

            {resultado !== null && <span className="text-2xl font-bold">Resultado: {resultado}</span>}
        </main>
    );
}