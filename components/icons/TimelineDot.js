export default function TimelineDot({ className = "" }) {
    return <svg width="18" height="18" viewBox="0 0 18 18" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="9" r="8" className="fill-white stroke-black" strokeWidth="2" />
        <circle cx="9" cy="9" r="4" className="fill-black" />
    </svg>
}