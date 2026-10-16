import React from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
    return (
        <nav className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
                <Link to="/" className="text-lg font-bold tracking-tight text-slate-900">
                    Viaja<span className="text-blue-600">Fácil</span>
                </Link>
                <div className="flex items-center gap-5">
                    <Link to="/" className="text-sm font-medium text-slate-600 transition hover:text-blue-600">
                        Paquetes
                    </Link>
                    <Link
                        to="/nuevo"
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                        Nuevo paquete
                    </Link>
                </div>
            </div>
        </nav>
    );
}