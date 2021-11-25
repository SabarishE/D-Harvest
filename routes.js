
const express=require("express")
const cheerio =require("cheerio");
const axios = require('axios');

const router =express.Router();


const {ARStechnica,Olx,Recipes}=require("./urlDB")

// -----ARS TECHNICA-----

router.get("/ARStechnica/:category",async(req,res)=>{

const extractedData=[];

    try{
       const filtered=ARStechnica.filter((ele)=>ele.category===req.params.category)
       
        const response= await axios({method:"get",url:filtered[0].url})
        
        let $=cheerio.load(response.data);

        $("li.tease").each((ind,ele)=>{
    
            const heading=$(ele).find("header>h2").text();
            const excerpt=$(ele).find(".excerpt").text();
            const author=$(ele).find("span[itemprop=name]").text();
            const time=$(ele).find("time").text();
            const commentsCount=$(ele).find(".comment-count-number").text();
            extractedData.push({heading,excerpt,author,time,commentsCount});

        })

    }

    catch(err){

        console.log("Erro in data extraction >>>",err);
        return res.status(200).send({Error:err,msg:"Error in data extraction"})
    }

    console.log("Data extracted successfully >>>",extractedData)
    return res.status(200).send({Data:extractedData,msg:"Data extracted successfully"})

})
    
// ------OLX-------

router.get("/OLX/:category",async(req,res)=>{

    const extractedData=[];
    
        try{
           const filtered=Olx.filter((ele)=>ele.category===req.params.category)
           
            const response= await axios({method:"get",url:filtered[0].url})
            
            let $=cheerio.load(response.data);
    
            let selector="li.EIR5N"
            
            $(selector).each((ind,ele)=>{

        const Name=$(ele).find("span[data-aut-id=itemTitle]").text();
        const Price=$(ele).find("span[data-aut-id=itemPrice]").text();
        const Location=$(ele).find("span[data-aut-id=item-location]").text();
        const PostedOn=$(ele).find(".zLvFQ >span").text();
        const DetailsLink=$(ele).find("a").attr("href");

        extractedData.push({Name,Price,Location,PostedOn,DetailsLink:"https://www.olx.in"+DetailsLink});

            })
     }
    catch(err){
    
            console.log("Erro in data extraction >>>",err);
            return res.status(200).send({Error:err,msg:"Error in data extraction"})
        }
    
        console.log("Data extracted successfully >>>",extractedData)
        return res.status(200).send({Data:extractedData,msg:"Data extracted successfully"})
    
    })


 // ---------AllRecipes----------

router.get("/Allrecipes/:category",async(req,res)=>{

        const extractedData=[];
        
            try{
               const filtered=Recipes.filter((ele)=>ele.category===req.params.category)
               
                const response= await axios({method:"get",url:filtered[0].url})
                
                let $=cheerio.load(response.data);
        
                let selector="div.component.card.card__category"
                
                $(selector).each((ind,ele)=>{
    
                    const Name= $(ele).find("div.card__detailsContainer a h3").text();
                    const URL=$(ele).find("div.card__detailsContainer a").attr("href");        
                    const Rating=$(ele).find("div.card__ratingContainer .review-star-text").text();   
                    const Author=$(ele).find("span.card__authorName").text();
                    const Summary=$(ele).find("div.card__summary").text();
    
                    extractedData.push({Name,Rating,Author,URL,Summary});
    
                })
         }
        catch(err){
        
                console.log("Erro in data extraction >>>",err);
                return res.status(200).send({Error:err,msg:"Error in data extraction"})
            }
        
            console.log("Data extracted successfully >>>",extractedData)
            return res.status(200).send({Data:extractedData,msg:"Data extracted successfully"})
        
        })



module.exports={
    router
}