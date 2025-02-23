import { Link } from "react-router";

export default function Navbar() {
    return (
        <>
            <header className="flex justify-between items-center px-6 py-4 bg-black bg-opacity-20 bg-gradient-to-r from-purple-900 via-black to-purple-900 shadow-lg flicker fixed top-0 z-3 w-full glitch flicker glow-border">
                <h1 className="text-2xl text-purple-400 font-bold glow-text">GG Gaming gaes</h1>
                <nav className="space-x-4">
                    <Link to="/" className="px-4 py-2 text-white bg-purple-700 rounded-lg hover:bg-purple-800 hover:shadow-lg hover:shadow-purple-500 transition-all">
                    Home
                    </Link>
                </nav>
                <nav className="space-x-4">
                    <Link to="/animation" className="px-4 py-2 text-white bg-purple-700 rounded-lg hover:bg-purple-800 hover:shadow-lg hover:shadow-purple-500 transition-all">
                    wanna see something?
                    </Link>
                </nav>
            </header>
        </>
    )
}