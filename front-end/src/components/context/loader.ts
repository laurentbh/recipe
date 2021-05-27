import { Entity } from "../../data/entity";

// function delay(ms: number) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

async function loadEntity(url: string): Promise<Entity[]> {
    console.log('fecthing ' + url);
    const res = await fetch(url);
    return await res.json();
}
function initData(baseUrl: string, cb: Function, data: Map<string, Entity>): void {
    Promise.all(
        [
            loadEntity(baseUrl + '/ingredients'),
            loadEntity(baseUrl + '/categories'),
            loadEntity(baseUrl + '/utensils'),
            loadEntity(baseUrl + '/measures'),
        ]).then(responses => {
            responses.forEach(
                a => {
                    a.forEach(e => data.set(e.name, e))
                    // console.log(data.size);
                })
        }).then(final => {
            cb()
        }
        );
};

export function filter(filter: string, data: Map<string, Entity> | null): Entity[] {
    const ret: Entity[] = [];
    if (data === null) {
        return ret;
    }

    Array.from(data.entries()).map((entry) => {
        const [, value] = entry;
        // console.log(filter + " vs " + value.type)
        if (value.type === filter) {
            ret.push(value)
        }
        return null
    })
    // console.log("FILTERED size= " + ret.length);
    return ret;
}
// function addEntity(entity : Entity) {
//     console.log("adding " + entity)
//     this.data.set(entity.name, entity)
// }
// delEntity(id: number) {
//     console.log("del  id" + id)
//     Array.from(this.data.entries()).map((entry) => {
//         const [ ,value] = entry;
//         // console.log(filter + " vs " + value.type)
//         if (value.id === id) {
//         this.data.delete(value.name)
//         }
//     })
// }
export default initData