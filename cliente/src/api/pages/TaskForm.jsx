import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPaquete, fetchPaquete, getApiErrorMessage, updatePaquete } from '../entidades';

export function TaskForm() {
    const [destino, setDestino] = useState('');
    const [duracionDias, setDuracionDias] = useState('');
    const [precioPersona, setPrecioPersona] = useState('');
    const [cupoDisponible, setCupoDisponible] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [guardando, setGuardando] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (!id) {
            return;
        }

        let activo = true;
        const cargarPaquete = async () => {
            try {
                const paquete = await fetchPaquete(id);
                if (activo) {
                    setDestino(paquete.destino);
                    setDuracionDias(String(paquete.duracion_dias));
                    setPrecioPersona(String(paquete.precio_persona));
                    setCupoDisponible(String(paquete.cupo_disponible));
                }
            } catch (error) {
                if (activo) {
                    setErrorMsg(getApiErrorMessage(error, 'No se pudo cargar el paquete para editar.'));
                }
            }
        };
        cargarPaquete();
        return () => {
            activo = false;
        };
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        const payload = {
            destino: destino.trim(),
            duracion_dias: parseInt(duracionDias),
            precio_persona: parseFloat(precioPersona),
            cupo_disponible: parseInt(cupoDisponible)
        };

        try {
            setGuardando(true);
            if (id) {
                await updatePaquete(id, payload);
            } else {
                await createPaquete(payload);
            }
            navigate('/');
        } catch (error) {
            setErrorMsg(getApiErrorMessage(error, 'Ocurrió un error al guardar el paquete.'));
        } finally {
            setGuardando(false);
        }
    };

    return (
        <main className="mx-auto max-w-2xl px-5 py-12">
            <div className="mb-6">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
                    Agencia de viajes
                </p>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    {id ? 'Editar paquete' : 'Agregar un paquete'}
                </h1>
                <p className="mt-2 text-slate-500">
                    Completa los datos del destino turístico.
                </p>
            </div>
            <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
                {errorMsg && (
                    <div role="alert" className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-slate-700">Destino</label>
                    <input
                        type="text"
                        value={destino}
                        onChange={(e) => setDestino(e.target.value)}
                        required
                        className="mt-2 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        placeholder="Ej: Cartagena, Colombia"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700">Duración (días)</label>
                    <input
                        type="number"
                        value={duracionDias}
                        onChange={(e) => setDuracionDias(e.target.value)}
                        required
                        min="1"
                        className="mt-2 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        placeholder="Ej: 5"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700">Precio por persona ($)</label>
                    <input
                        type="number"
                        step="0.01"
                        value={precioPersona}
                        onChange={(e) => setPrecioPersona(e.target.value)}
                        required
                        min="0.01"
                        className="mt-2 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        placeholder="Ej: 1200.00"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700">Cupos disponibles</label>
                    <input
                        type="number"
                        value={cupoDisponible}
                        onChange={(e) => setCupoDisponible(e.target.value)}
                        required
                        min="0"
                        className="mt-2 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        placeholder="Ej: 15"
                    />
                </div>
                <div className="flex flex-col-reverse justify-end gap-3 border-t border-slate-100 pt-5 sm:flex-row">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={guardando}
                        className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {guardando ? 'Guardando...' : id ? 'Actualizar' : 'Guardar'}
                    </button>
                </div>
                </form>
            </section>
        </main>
    );
}