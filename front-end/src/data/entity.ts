// import Entity from '../components/entities/Entity';
import CountdownLatch from '../components/utils/latch'
export interface Entity {
    name: string;
    id: number;
    type: string;
}

// export interface Entities {
//     [type: string] : Entity;
// }

export class Entities {
    private data: Map<string, Entity>;
    // data: [type: string] : Entity;

    constructor() {
        this.data = new Map<string, Entity>()
        
    }
    addEntity(entity : Entity) {
        console.log("adding " + entity)
        this.data.set(entity.name, entity)
    }
    delEntity(id: number) {
        console.log("del  id" + id)
        Array.from(this.data.entries()).map((entry) => {
            const [ ,value] = entry;
            // console.log(filter + " vs " + value.type)
            if (value.id === id) {
            this.data.delete(value.name)
            }
        })
    }

    filtered(filter : string)  : Entity[]{
        // looks stupid but can't find another way
        const ret : Entity[] = [];
        Array.from(this.data.entries()).map((entry) => {
            const [ ,value] = entry;
            // console.log(filter + " vs " + value.type)
            if (value.type === filter) {
                ret.push(value)
            }
        })
        // console.log("FILTERED size= " + ret.length);
        return ret;
    }

    get intenalData() : Map<string, Entity> {
        return this.data;
    }

    private async loadEntity(url : string) : Promise<Entity[]> {
            console.log('fecthing ' + url);
        const res = await fetch(url);
        return await res.json();
        // could also to some work like,
        // .then(res => res.map((e: any) => format(e))
    }
    loadAll2(baseUrl:string, cb: Function) {
        Promise.all(
            [
                this.loadEntity(baseUrl+'/ingredients'),
                this.loadEntity(baseUrl+'/categories'),
                this.loadEntity(baseUrl+'/ustensils'),
                this.loadEntity(baseUrl+'/measures'),
        ]).then(responses => {
            responses.forEach(
                a => {
                    a.forEach(e => this.data.set(e.name, e))
                })
        }).then(
            cb()

        );
    }
    loadAll(baseUrl: string, cb : Function) {
        var barrier = new CountdownLatch(4);
        this.loadIngredient(barrier, baseUrl);
        this.loadUstensils(barrier, baseUrl);
        this.loadMeasures(barrier, baseUrl);
        this.loadCategories(barrier, baseUrl);
        
        barrier.await(function(){
            console.log('done all');
            
            cb();
          });
          this.data.forEach( (v : Entity, k: String ) => {
            console.log(k + "" + v); 
            
        });
        console.log("<<<< loadAll");
    }
    loadIngredient(barrier: CountdownLatch, baseUrl :string) {
        let url = baseUrl + '/ingredients'
        const ret = this.loadEntity(url)
        ret.then(res => {
            res.forEach(e => this.data.set(e.name, e))
        });
        ret.catch( err=> {
            console.log("loadIngredient error")
        })
        barrier.countDown();
    }
    loadUstensils(barrier: CountdownLatch, baseUrl :string) {
        let url = baseUrl + '/ustensils'
        const ret = this.loadEntity(url)
        ret.then(res => {
            res.forEach(e => this.data.set(e.name, e))
        });
        ret.catch( err=> {
            console.log("loadUstensils error")
        })
        barrier.countDown();
    }
    loadMeasures(barrier: CountdownLatch, baseUrl :string) {
        let url = baseUrl + '/measures'
        const ret = this.loadEntity(url)
        ret.then(res => {
            res.forEach(e => this.data.set(e.name, e))
        });
        ret.catch( err=> {
            console.log("loadMeasures error")
        })
        barrier.countDown();
    }
    loadCategories(barrier: CountdownLatch,  baseUrl :string) {
        let url = baseUrl + '/categories'
        const ret = this.loadEntity(url)
        ret.then(res => {
            res.forEach(e => this.data.set(e.name, e))
        });
        ret.catch( err=> {
            console.log("loadCategories error")
        })
        barrier.countDown();
    }
}