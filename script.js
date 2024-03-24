let btn=document.getElementById("searchbtn");
let btn2=document.getElementById("searchbtn2");
let btn3=document.getElementById("searchbtn3");
let search=document.getElementById("searchbox");
let url="https://api.giphy.com/v1/gifs/search?api_key=A0JVznQjUyNcyEBhtbpEB3os5ma3NNr2&q=";

btn.addEventListener("click",function(){
  let input=search.value;
  url+=input+"&rating=g";
 getImagesUsingXHR(input);
});

btn2.addEventListener("click",function(){
    let input=search.value;
    url+=input+"&rating=g";
    getImagesUsingFetch(input);
});

btn3.addEventListener("click",function(){
    let input=search.value;
    url+=input+"&rating=g";
    getImagesUsingAsyncAwait(input);
});

async function getImagesUsingAsyncAwait(input){
    let imgs=[];
    let respon= await fetch(url);
    let responObj= await respon.json();
    console.log(responObj);
    for(let item of responObj.data){
        imgs.push(item.images.downsized_medium.url)
    }
    genrateImgElements(imgs);
}
function getImagesUsingFetch(input){
    let imgs=[];
    fetch(url).then(function(reponse){
        return reponse.json();
    })
    .then(function(responObj){
        console.log(responObj);
    
        for(let item of responObj.data){
            imgs.push(item.images.downsized_medium.url)
        }
        genrateImgElements(imgs);
    })
    .catch(function(e){
        console.log("error",e);
    })
}

function getImagesUsingXHR(input){
    let imgs=[];

    //send an http using xhr
    let xhr=new XMLHttpRequest();
    xhr.onreadystatechange= function(){
        if(xhr.readyState === 4  && xhr.status === 200){
            let respond= xhr.responseText;
            let resObj=JSON.parse(respond);
            console.log(resObj);

            for(let item of resObj.data){
                imgs.push(item.images.downsized_medium.url)
            }
            genrateImgElements(imgs);
        }
    }
    xhr.open("get",url,true);
    xhr.send();
}

function genrateImgElements(imgsUrl){
    let divresult=document.getElementById("searchRezult");
    for(let url of imgsUrl){
        let imgele=document.createElement("img");
        imgele.src=url;
        imgele.height=200;
        imgele.width=200;
        divresult.appendChild(imgele);
    }
}