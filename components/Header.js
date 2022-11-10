export default function Header({ title }) {
    return (
        <>
            <h1 className="md:hidden pb-10">~</h1>
            <h2 className="text-3xl font-bold sig col-start-1 md:col-start-2 col-end-4">Roadmap</h2>
            <h2 className="text-3xl col-start-1 md:col-start-4 col-span-8 mt-4 md:mt-0 font-normal">{title}</h2>
        </>
    )
}