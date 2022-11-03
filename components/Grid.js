export default function Grid({ children, className = "" }) {
    return <div className={"w-full grid grid-cols-12 " + className}>
        {children}
    </div>
}