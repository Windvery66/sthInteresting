var showLoading = ()=>{
  var loadingEl1 = document.getElementById("progressBar1");
  var loadingEl2 = document.getElementById("progressBar2");
  var imgs = [...document.getElementsByTagName("IMG")];
  var imgCount = 0;
  imgs.forEach((element) => {
    var img = new Image();

    img.onload = () => {
      imgCount = loadCallBack(loadingEl1,loadingEl2,imgCount,imgs);
    };

    img.onerror = () => {
      imgCount = loadCallBack(loadingEl1,loadingEl2,imgCount,imgs);
    };

    img.src = element.src;
  });
}

var loadCallBack = (loadingEl1,loadingEl2,imgCount,imgs)=>{
  imgCount++;
  loadingEl1.innerText = "LOADING " + ((imgCount / imgs.length) * 90 + 10).toFixed(2) + "%";
  loadingEl2.innerText = "LOADING " + ((imgCount / imgs.length) * 90 + 10).toFixed(2) + "%";
  loadingEl2.style.cssText = "clip-path:inset(-50px " + ((90 - ((imgCount / imgs.length) * 90)) / 2) + "% -50px " + ((90 - ((imgCount / imgs.length) * 90)) / 2) + "% round 5vh)";
  if (imgCount == imgs.length) {
    // setTimeout(() => {
    //   document.getElementById("loading").classList.add("animate__fadeOut");
    //   setTimeout(() => {
    //     document.body.style.cssText = ""
    //     document.getElementById("loading").style.cssText = "display:none";
    //   }, 1000)
    // }, 500)
  } else {
    // setTimeout(() => {
    //   loadingEl1.innerText = "LOADING 100%";
    //   loadingEl2.innerText = "LOADING 100%";
    //   loadingEl2.style.cssText = "clip-path:inset(-50px 0 -50px 0 round 5vh)";
    //   document.getElementById("loading").classList.add("animate__fadeOut");
    //   setTimeout(() => {
    //     document.body.style.cssText = ""
    //     document.getElementById("loading").style.cssText = "display:none";
    //   }, 1000)
    // }, 10000)
  }
  return imgCount;
}

export {
  showLoading
}