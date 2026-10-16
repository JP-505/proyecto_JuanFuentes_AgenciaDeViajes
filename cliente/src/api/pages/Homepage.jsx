import React, { useEffect, useState } from 'react';
import { deletePaquete, fetchPaquetes, getApiErrorMessage } from '../entidades';
import { TaskCard } from '../../components/TaskCard';

export function Homepage() {
    const [paquetes, setPaquetes] = useState([]);
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(true);

    const cargarPaquetes = async () => {
        try {
            setError('');
            const data = await fetchPaquetes();
            setPaquetes(data);
        } catch (error) {
            setError(getApiErrorMessage(error, 'No se pudo conectar con el servidor. Verifica que la API esté iniciada.'));
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarPaquetes();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este paquete turístico?')) {
            try {
                await deletePaquete(id);
                setPaquetes((paquetesActuales) => paquetesActuales.filter((paquete) => paquete.id !== id));
            } catch (error) {
                setError(getApiErrorMessage(error, 'No se pudo eliminar el paquete.'));
            }
        }
    };

    return (
        <main className="mx-auto max-w-6xl px-5 py-12">
            <header className="mb-8">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
                    Agencia de viajes
                </p>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Encuentra tu próximo destino
                </h1>
                <p className="mt-2 text-slate-500">
                    Explora nuestros paquetes turísticos y planea tu siguiente aventura.
                </p>
            </header>
            {error && (
                <p role="alert" className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </p>
            )}
            {cargando ? (
                <p className="rounded-lg border border-slate-200 bg-white px-5 py-8 text-center text-slate-500">
                    Cargando paquetes...
                </p>
            ) : paquetes.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
                    <h2 className="text-lg font-semibold text-slate-800">Aún no hay paquetes</h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Agrega el primer destino para comenzar a organizar tus viajes.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {paquetes.map((paquete) => (
                        <TaskCard key={paquete.id} paquete={paquete} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </main>
    );
}