const request=require("request");
const cheerio=require("cheerio")
// home page
const scorecardobj=require("./scorecard")
function GetAllMatchFullLink(url)
{
    
    request(url,function(err,response,html)
    {
        if(err)
        {
            console.log(err);
        }
        else{
            
            getAll(html);
        }    
    })
}
function getAll(html)
{
    
    let $=cheerio.load(html) 
    let scorecard=$("a[data-hover='Scorecard']")
   // console.log(scorecard);
    for(let i=0;i<scorecard.length;i++)
    {
     let link=$(scorecard[i]).attr("href");
     let fullLink="https://www.espncricinfo.com/"+link
     console.log(fullLink);
     scorecardobj.ps(fullLink);
    }
}

module.exports={
    gAlmatches : GetAllMatchFullLink
}
