import { useContext, useEffect } from 'react';
import sseContext from "../context/sse-context";
import appContext from "../context/app-context";
import {  useToasts } from 'react-toast-notifications';

// type LiveEntitiesProps = {
//     serverURL: string
// }
const LiveEntities = (props:any) => {

    const  ctx  = useContext(sseContext)
    const  appctx  = useContext(appContext)
    const { addToast } = useToasts();
    console.log("LiveEntities size " + ctx.data.size)

    useEffect( () => {
        var source = new EventSource(appctx.serverURL+ '/live');
        source.onmessage = (e) =>  {
            // data:{"action":"delete","data":{"domain":"ingredient","payload":{"id":29}}}
            // data:{"action":"new","data":{"domain":"ingredient","payload":{"id":34,"name":"wdsssdw22xwwwwwxqd2"}}}
            const obj = JSON.parse(e.data)
            console.log("json: " + obj);
            let sseaction = obj.action
            const domain = obj.data.domain
            const payload = obj.data.payload
            console.log("action:" + sseaction + " domain: " + domain + " id: "+ payload.id + " name:" + payload.name)

            let tmpType = ''
            switch (domain) {
                case 'ingredient': 
                    tmpType = "Ingredient"
                    break;
                case 'category':
                    tmpType = "Category"
                    break;
                case 'utensil':
                    tmpType = "Utensil"
                    break;
                default:
                    sseaction = 'ignore'
                    break;
            }
            switch (sseaction) {
                case 'new':
                    payload.type = tmpType
                    ctx.data.set(payload.name, payload)
                    ctx.setSize(ctx.size+1)
                    addToast('new ' + tmpType + ' : ' + payload.name, { appearance: 'info', autoDismiss: true});
                    break
                case 'delete':
                    const id = payload.id
                    console.log("LiveEntities delete id " + id)
                    Array.from(ctx.data.entries()).map((entry) => {
                        const [, value] = entry;
                        if (value.id === payload.id) {
                            ctx.data.delete(value.name)
                            ctx.setSize(ctx.size+1)
                            addToast('delete : ' + value.name, { appearance: 'info', autoDismiss: true});
                        }
                        return null
                    })
                    break;
                default:
                    break;
            }
         }
         source.onerror = () => {
            addToast('SSE connection failed', { appearance: 'warning', autoDismiss: true});
            console.log("LiveEntities error")
            source.close();
            source = new EventSource(appctx.serverURL + '/live');
          }

         return () => {
             console.log("LiveEntities unloading ...")
             source.close()
         };
    }, [ ctx, appctx.serverURL, addToast ]);
    return null
}

export default LiveEntities