import ejs from "ejs"
var pdfMake = require("pdfmake/build/pdfmake");
var pdfFonts = require("pdfmake/build/vfs_fonts");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import fs from "fs"
import path from 'path';
const jsdom = require("jsdom");
var { JSDOM } = jsdom;
var { window } = new JSDOM("");
var htmlToPdfMake = require("html-to-pdfmake");
import randomString from "crypto-random-string";

function randString():string[]{
    let str = randomString({length:32})
    return [path.join(__dirname,'..','temp',`ord-${str}.pdf`),`ord-${str}.pdf`];
}

async function getString(ord: any){
    return await ejs.renderFile(path.join(__dirname,'/order.ejs'),{order: ord});
}

export async function createPdfOrder(ord: any): Promise<string>{
    let [fullPath, filePath] = randString();
    let data = await getString(ord);
    // console.log(filePath, data)
    let html = htmlToPdfMake(data, {window:window});
    let docDefinition = {
        content: [html],
        pageMargins: [ 60, 60, 60, 60 ],
        footer:[
                {text: 'Freedocteur, votre site de prise de rendez-vous médicaux en ligne ', alignment: 'center'},
                {text: 'Site web: www.freedocteur.com Email: contact@freedocteur.com Tel: (+221)773575661', alignment:'center' }
        ],
        styles:{
            'ar':{
                alignment: 'right'
            },
            'mm':{
                margin: 5
            },
            'mlr':{
                margin: [60, 0, 60, 0]
            }
        }
    }
    
    var pdfGenerate = pdfMake.createPdf(docDefinition);
    pdfGenerate.getBuffer((result: any)=>{
        fs.writeFileSync(fullPath, result);
    });
        
    return filePath;
}