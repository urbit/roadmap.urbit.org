export function dateToDa(d, mil = false) {
    return (
        `~${d.getUTCFullYear()}.` +
        `${d.getUTCMonth() + 1}`
    );
}