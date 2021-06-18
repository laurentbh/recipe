import {Descendant} from "slate";

const RawToSLate = (input : string | undefined) : Descendant[] => {
    let ret : Descendant[] = [];

    if (input === undefined) {
        input=""
    }
    const lines = input.split("\n")
    lines.forEach(l  => {
        const item = "{\"type\":\"paragraph\", \"children\":[{\"text\":" +
            "\"" +l + "\"}]}"
        ret.push(JSON.parse(item));
    });
    return ret;
}
interface EditorToken  {
    value: string;
    offset : number;
    length: number;
}

const isSpace = (input : string) : boolean => {
   return  (input ===  ' ' || input === '\t' || input === '\n')
}
const ParseLine = (input : string) : EditorToken[] => {
    let ret : EditorToken[] = [];
    let i : number
    let token : string = ""
    let length : number = 0
    let offset : number = -1;
    for (i =0; i < input.length; i++) {
        if (! isSpace(input[i])) {
            token = token + input[i];
            length++;
            if (offset === -1) {offset = i}
        }
        else {
           const tk : EditorToken={length: length, offset: offset, value: token}
            ret.push(tk)
            length = 0;
            offset = -1;
            token = "";
        }
    }
    if (offset !== -1) {
        const tk : EditorToken={length: length, offset: offset, value: token}
        ret.push(tk)
    }
    return ret;
}
export default RawToSLate
export {
    ParseLine
};
export type { EditorToken };

