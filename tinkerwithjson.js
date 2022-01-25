let fs=require("fs")
//let buffer=fs.readFileSync("./example.json")
//console.log(buffer)
//let data=JSON.parse(buffer)
//console.log(data)
//let stringdata=JSON.stringify(data)
//fs.writeFileSync("example.json",stringdata)
//*/
//second method to read data from json 
//let fs=require("fs")

//let stringdata=JSON.stringify(data)
//fs.writeFileSync("example.json",stringdata)
//xlsx module

let xlsx=require("xlsx")
let data=require("./example.json")
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
