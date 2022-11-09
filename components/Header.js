export default function Header({ title }) {
    return (
        <>
            <h2 className="text-3xl font-semibold sig col-start-2 col-end-4">Roadmap</h2>
            <h2 className="text-3xl col-start-2 md:col-start-4 col-span-8 mt-4 md:mt-0">{title}</h2>
        </>
    )
}