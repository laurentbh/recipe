import { ParsingRequest } from "./parsing_pb"
import { ParserClient} from "./parsing_grpc_web_pb"
import configData from "../config.json";

var client = new ParserClient(configData.BACKEND_SERVER+":" +configData.BACKEND_GRPC_PORT)



// const logParseStream = (resp) => {
//   console.log("logParseStream " +resp.getWord() + " identified " + resp.getIdentified())
// }
export async function parseStreamRecipe(data, cb) {
  var request = new ParsingRequest();
  request.setInput(data);

  var stream = client.streamParse(request,{})
  stream.on('data', function(response){
    // logParseStream(response)
    cb(response)
});
}
export async function parseRecipe(data, cb) {
  var request = new ParsingRequest();
  // console.log("parseRecipe:" + data)
  request.setInput(data);
  client.parse(request, {}, cb)
  // client.parse(request, {}, (err, response ) => {
  //   if (response == null) {
  //     console.log(err)
  //   } else {
  //     var list = response.getResultsList()
  //     list.forEach(e => {
  //       ret = ret.concat(
  //         {
  //           id: e.getId(),
  //           word: e.getWord(),
  //           identified: e.getIdentified(),
  //           entity: e.getEntity(),
  //           pos: e.getPosition(),
  //           index: e.getIndex()
  //           }
  //       )
  //     });
  //   }
  // })
  // return []
}
export default parseStreamRecipe