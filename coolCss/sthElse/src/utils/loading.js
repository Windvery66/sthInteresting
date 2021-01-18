var showLoading = ()=>{
  var loadingElSpan = document.getElementById("progressTextNumber");
  var loadingEl = document.getElementById("loading");
  var imgs = [...document.getElementsByTagName("IMG")];
  var imgCount = 0;
  imgs.forEach((element) => {
    var img = new Image();

    img.onload = () => {
      imgCount = loadCallBack(loadingEl,loadingElSpan,imgCount,imgs);
    };

    img.onerror = () => {
      imgCount = loadCallBack(loadingEl,loadingElSpan,imgCount,imgs);
    };

    img.src = element.src;
  });
}

var loadCallBack = (loadingEl,loadingElSpan,imgCount,imgs)=>{
  imgCount++;
  loadingElSpan.innerText = ((imgCount / imgs.length) * 100).toFixed(2) + "%";
  if (imgCount == imgs.length) {
    setTimeout(()=>{
      loadingEl.style.cssText = "animation:closeFlash .5s linear";
      setTimeout(()=>{
        loadingEl.style.cssText = "animation:closeLoading .5s linear;animation-fill-mode:forwards";
        setTimeout(()=>{
          loadingEl.style.cssText = "display:none"
        },500)
      },500)
    },1000)
  }
  return imgCount;
}

export {
  showLoading
}