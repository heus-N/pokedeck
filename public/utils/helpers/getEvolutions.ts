export function getEvolutions(chain: any): string[]{
    if(!chain) return [];

    const rawId = chain.species.url.split('pokemon-species/')[1];
    const cleanId = rawId.replace('/', '');

    const ids = [cleanId];

    if(chain?.evolves_to.length){
        chain.evolves_to.forEach((evolution: any) => {
            ids.push(...getEvolutions(evolution))
        });
    }

    return ids
}