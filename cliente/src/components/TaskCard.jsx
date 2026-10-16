import React from 'react';
import { useNavigate } from 'react-router-dom';

export function TaskCard({ paquete, onDelete }) {
    const navigate = useNavigate();

    return (
        <article className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-md">
            <div>
                <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Paquete turístico</p>
                    <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            paquete.confirmado
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-amber-50 text-amber-700'
                        }`}
                    >
                        {paquete.confirmado ? 'Confirmado' : 'Pendiente'}
                    </span>
                </div>
                <h2 className="mt-2 text-xl font-bold text-slate-900">{paquete.destino}</h2>
                <dl className="mt-5 space-y-3 text-sm">
                    <div className="flex justify-between gap-3">
                        <dt className="text-slate-500">Duración</dt>
                        <dd className="font-medium text-slate-800">{paquete.duracion_dias} días</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                        <dt className="text-slate-500">Cupos disponibles</dt>
                        <dd className="font-medium text-slate-800">{paquete.cupo_disponible}</dd>
                    </div>
                </dl>
                <p className="mt-5 border-t border-slate-100 pt-4 text-sm text-slate-500">
                    Desde
                    <span className="ml-2 text-xl font-bold text-slate-900">
                        ${Number(paquete.precio_persona).toLocaleString('es-CO')}
                    </span>
                    <span className="ml-1">por persona</span>
                </p>
            </div>
            <div className="mt-5 flex justify-end gap-2">
                <button
                    onClick={() => navigate(`/editar/${paquete.id}`)}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                    Editar
                </button>
                <button
                    onClick={() => onDelete(paquete.id)}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                    Eliminar
                </button>
            </div>
        </article>
    );
}