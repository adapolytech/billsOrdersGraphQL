import ejs from "ejs"
var pdfMake = require("pdfmake/build/pdfmake");
var pdfFonts = require("pdfmake/build/vfs_fonts");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import fs from "fs"
import path from 'path';
import jsdom from "jsdom";
var { JSDOM } = jsdom;
var { window } = new JSDOM("");
var htmlToPdfMake = require("html-to-pdfmake");
import randomString from "crypto-random-string";

function randString():string[]{
    let str = randomString({length: 32})
    return [path.join(__dirname,'..','..','temp',`bill-${str}.pdf`), `bill-${str}.pdf`];
}

async function getString(billInput: any){
    return await ejs.renderFile(path.join(__dirname,'/bill.ejs'),{bill: billInput});
}

export async function createBillPdf(bill: any): Promise<string>{
    let [fullPath, filePath] = randString();
    let data = await getString(bill);
    let html = htmlToPdfMake(data, { window : window });
    let docDefinition = {
        content: [html],
        pageMargins: [ 60, 60, 60, 60 ],
        footer:[
                {text: 'Freedocteur, votre site de prise de rendez-vous médicaux en ligne ', alignment: 'center'},
                {text: 'Site web: www.freedocteur.com Email: contact@freedocteur.com Tel: (+221)773575661', alignment:'center' }
        ],
        styles:{
            'tableBody':{
                margin: [20, 0, 0, 0]
            },
            'ar':{
                alignment: 'right'
            }
        }
    }
    
    var pdfGenerate = pdfMake.createPdf(docDefinition);
    pdfGenerate.getBuffer((result: any): void=>{
        fs.writeFileSync(fullPath, result);
    });
        
    return filePath;
}