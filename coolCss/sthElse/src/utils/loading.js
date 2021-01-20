var showLoading = () => {
  var loadingElSpan = document.getElementById("progressTextNumber");
  var loadingEl = document.getElementById("loading");
  var imgs = [...document.getElementsByTagName("IMG")];
  var imgCount = 0;
  var autoCount = 0;

  //如果读取时间少于0.5s,则观看固定读取动画,防止直接100%过于生硬(那Loading不是白做了?)
  setTimeout(() => {
    var autoAnimation = setInterval(() => {
      autoCount += 1.23;
      let progressNumber = Math.min(((imgCount / imgs.length) * 100).toFixed(2),autoCount.toFixed(2));
      loadingElSpan.innerText = progressNumber + "%";
      if (autoCount > 98 || progressNumber >= 100) {
        loadingElSpan.innerText = "100.00%";
        setTimeout(() => {
          loadingEl.style.cssText = "animation:closeFlash .5s linear";
          setTimeout(() => {
            loadingEl.style.cssText = "animation:closeLoading .5s linear;animation-fill-mode:forwards";
            setTimeout(() => {
              loadingEl.style.cssText = "display:none";
            }, 500)
          }, 500)
        }, 1000)
        clearInterval(autoAnimation)
      }
      return autoCount;
    }, 20)
  }, 100)
  imgs.forEach((element) => {
    var img = new Image();
    img.onload = () => {
      imgCount = loadCallBack(imgCount);
    };

    img.onerror = () => {
      imgCount = loadCallBack(imgCount);
    };

    img.src = element.src;
  });
}

var loadCallBack = (imgCount) => {
  imgCount++;
  //Loading关闭动画
  // if (imgCount == imgs.length) {
  //   loadingElSpan.innerText = ((imgCount / imgs.length) * 100).toFixed(2) + "%";
  //   setTimeout(()=>{
  //     loadingEl.style.cssText = "animation:closeFlash .5s linear";
  //     setTimeout(()=>{
  //       loadingEl.style.cssText = "animation:closeLoading .5s linear;animation-fill-mode:forwards";
  //       setTimeout(()=>{
  //         loadingEl.style.cssText = "display:none";
  //       },500)
  //     },500)
  //   },1000)
  // }
  return imgCount;
}

export {
  showLoading
}