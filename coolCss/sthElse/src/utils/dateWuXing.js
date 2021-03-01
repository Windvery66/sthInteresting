import {
  calendar
} from "@/utils/calendar.js-master/calendar.js";

export var dateWuXing = (timestamp) => {
  let userDate = new Date(timestamp);
  let yy = userDate.getFullYear();
  let mm = userDate.getMonth() + 1;
  let dd = userDate.getDate();
  let hh = userDate.getHours();
  let dateInfo = calendar.solar2lunar(yy, mm, dd);

  let tg = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
  let dz = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

  // 时辰
  let hoursGz = [];
  for (let i = 0; i < 10; i++) {
    if (~dateInfo.gzDay.indexOf(tg[i])) {
      let j;
      if (i < 5) {
        j = i * 2
      } else {
        j = (i - 5) * 2
      }
      for (let k = 0; k < 12; k++) {
        hoursGz.push(tg[j]);
        j++;
        if (j >= 10) {
          j = 0
        }
      }
    }
  }
  if (hh == 0 || hh == 23) {
    dateInfo.gzHour = hoursGz[0] + dz[0];
  } else {
    dateInfo.gzHour = hoursGz[Math.ceil((hh + 1.5) / 2) - 1] + dz[Math.ceil((hh + 1.5) / 2) - 1];
  }

  // 八字
  dateInfo.bazi = dateInfo.gzYear + dateInfo.gzMonth + dateInfo.gzDay + dateInfo.gzHour;

  //五行
  let baziArr = [...dateInfo.bazi];
  let wuxingCounts = [{
    wuxing: "金",
    count: 0
  }, {
    wuxing: "木",
    count: 0
  }, {
    wuxing: "水",
    count: 0
  }, {
    wuxing: "火",
    count: 0
  }, {
    wuxing: "土",
    count: 0
  }];
  let wuxingStr = "";
  baziArr.forEach((item, index) => {
    switch (item) {
      case "甲":
      case "乙":
      case "寅":
      case "卯":
        wuxingCounts[1].count++;
        wuxingStr += "木";
        break;
      case "丙":
      case "丁":
      case "巳":
      case "午":
        wuxingCounts[3].count++;
        wuxingStr += "火";
        break;
      case "戊":
      case "己":
      case "辰":
      case "戌":
      case "丑":
      case "未":
        wuxingCounts[4].count++;
        wuxingStr += "土";
        break;
      case "庚":
      case "辛":
      case "申":
      case "酉":
        wuxingCounts[0].count++;
        wuxingStr += "金";
        break;
      case "壬":
      case "癸":
      case "亥":
      case "子":
        wuxingCounts[2].count++;
        wuxingStr += "水";
        break;
    }
    if (index % 2) {
      wuxingStr += " ";
    }
  })
  dateInfo.wuxingTotal = "金" + wuxingCounts[0].count + " 木" + wuxingCounts[1].count + " 水" + wuxingCounts[2].count + " 火" + wuxingCounts[3].count + " 土" + wuxingCounts[4].count;
  dateInfo.wuxingStr = wuxingStr;
  dateInfo.wuxingCounts = wuxingCounts;

  //阴阳
  let yinyangCounts = [{
    yinyang: "阳",
    count: 0
  }, {
    yinyang: "阴",
    count: 0
  }];
  let yinyangStr = "";
  baziArr.forEach((item, index) => {
    switch (item) {
      case "甲":
      case "丙":
      case "戊":
      case "庚":
      case "壬":
      case "子":
      case "辰":
      case "寅":
      case "午":
      case "申":
      case "戌":
        yinyangCounts[0].count++;
        yinyangStr += "阳";
        break;

      case "乙":
      case "卯":
      case "丁":
      case "巳":
      case "己":
      case "丑":
      case "未":
      case "辛":
      case "酉":
      case "癸":
      case "亥":
        yinyangCounts[1].count++;
        yinyangStr += "阴";
        break;
    }
    if (index % 2) {
      yinyangStr += " ";
    }
  })

  dateInfo.yinyangTotal = "阳" + yinyangCounts[0].count + " 阴" + yinyangCounts[1].count;
  dateInfo.yinyangStr = yinyangStr;
  dateInfo.yinyangCounts = yinyangCounts;


  return dateInfo;
}