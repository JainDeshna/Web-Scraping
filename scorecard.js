const url="https://www.espncricinfo.com//series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard";
const request=require("request");
const cheerio=require("cheerio")
const path=require("path")
const fs=require("fs")
const xlsx=require("xlsx")
function processScoreCard(url)
{
    request(url,cb);
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
    //venue,date,oponent,result runs balls fours sixes sr
    //ipl
         //teams
                 // player
                
   //venue date and result are same for both of the teams
   //.header-info .description
   //.event .status-text
let $=cheerio.load(html);
let desc=$(".header-info .description")
let res=$(".event .status-text")
//console.log(desc.text())
//console.log(result.text())
let stringArr=desc.text().split(",");
let venue=stringArr[1].trim();
let date=stringArr[2].trim();
let result=res.text().trim();
let innings=$(".card.content-block.match-scorecard-table>.Collapsible")
let htmlString="";
for(let i=0;i<innings.length;i++)
{
htmlString=$(innings[i]).html();
//team
//player
//runs balls fours sixes sr opponent
let teamname=$(innings[i]).find("h5").text()
teamname=teamname.split("INNINGS")[0].trim()
let opponentindex=i==0? 1:0;
let opponentname=$(innings[opponentindex]).find("h5").text();
opponentname=opponentname.split("INNINGS")[0].trim()
//console.log(`${venue}| ${date}| ${teamname} |${opponentname} |${result}`)
let cinning=$(innings[i]);
let allrows=$(".table.batsman tbody tr")
for(let i=0;i<allrows.length;i++)
{
let allcols=$(allrows[i]).find("td")
let isworthy=$(allcols[0]).hasClass("batsman-cell")
if(isworthy==true)
{
    let playername=$(allcols[0]).text().trim();
    let runs=$(allcols[2]).text().trim();
    let balls=$(allcols[3]).text().trim();
    let fours=$(allcols[5]).text().trim();
    let sixes=$(allcols[6]).text().trim();
    let sr=$(allcols[7]).text().trim();
   
    console.log(`${playername} ${runs} ${balls} ${fours} ${sixes} ${sr}`);
    processplayer(teamname,playername,runs,balls,fours,sixes,sr,opponentname)
}
}

}
//console.log(htmlString);



}
function processplayer(teamname,playername,runs,balls,fours,sixes,sr,opponentname,result)
{
let teampath=path.join(__dirname,"ipl",teamname)
dircreater(teampath)
let filepath=path.join(teampath,playername+".xlsx")
let content=excelreader(filepath,playername)
let playerobj={
    teamname,playername,runs,balls,fours,sixes,sr,opponentname,result

}
content.push(playerobj)
excelwriter(filepath,content,playername)
}
function dircreater(filepath)
{
    if(fs.existsSync(filepath)==false)
    {
        fs.mkdirSync(filepath)
    }
}

function excelwriter(filepath,data,sheetname)
{
    let newwb=xlsx.utils.book_new()
    let newws=xlsx.utils.json_to_sheet(data)
    xlsx.utils.book_append_sheet(newwb,newws,sheetname)
    xlsx.writeFile(newwb,filepath)
}
function excelreader(filepath,sheetname)
{
    if(fs.existsSync(filepath)==false)
    {
        return []
    }
//for read
//workbook load
let wb=xlsx.readFile(filepath)
//sheet
let exceladata=wb.Sheets[sheetname]
//sheet data get
let ans=xlsx.utils.sheet_to_json(exceladata)
return ans;
}


module.exports={
    ps:processScoreCard
}