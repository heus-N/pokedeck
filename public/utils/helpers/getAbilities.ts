export function getAbilitiesIds(abilities: any): string[]{
    if(!abilities) return [];

    const rawId = abilities?.map((ab: any) => ab.ability.url.split('ability/')[1])
    const cleanId = rawId.map((id: string) => id.replace('/', ''));

    return cleanId
}