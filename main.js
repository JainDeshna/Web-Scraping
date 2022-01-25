const url="https://www.espncricinfo.com/series/ipl-2020-21-1210595";
const request=require("request");
const cheerio=require("cheerio")
const path=require("path")
const fs=require("fs")

const allmatcgobj=require("./allmatch.js")
request(url,cb);
const iplpath=path.join(__dirname,"ipl")
dircreater(iplpath)
function dircreater(filepath)
{
    if(fs.existsSync(filepath)==false)
    {
        fs.mkdirSync(filepath)
    }
}
// home page
function cb(err,request,html)
{
    if(err)
    {
        console.log(err);
    }
    else{
        extractLink(html);
    }
}
function extractLink(html)
{
    let $=cheerio.load(html);
    let anchorelement=$("a[data-hover='View All Results']")
    let link=anchorelement.attr("href");
    //console.log(link);

  let fullLink="https://www.espncricinfo.com/"+link
//console.log(fullLink)


allmatcgobj.gAlmatches(fullLink);
}

