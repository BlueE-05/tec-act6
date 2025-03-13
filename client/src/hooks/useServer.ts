'use client'

import { useState } from 'react';

export const useServer = () => {
    const [resultado, setResultado] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async (num1: number, operacion: string, num2: number) => {
        setError(null);
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:3000/calcular/${num1}/${operacion}/${num2}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || `Error HTTP: ${response.status}`);
            }

            setResultado(data.resultado);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido');
        } finally {
            setLoading(false);
        }
    };

    return { resultado, loading, error, fetchData };
};