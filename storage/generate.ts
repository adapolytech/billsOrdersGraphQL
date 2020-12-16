import ejs from "ejs"
// import * as pdf from "html-pdf"
import * as path from "path";
import randomString from "crypto-random-string";

function randString():string{
    let str = randomString({length:32})
    return `ordonnance-${str}.pdf`;
}

export function createPdfOrder(){
    let filePath = randString()
    
}