var typed = new Typed(".type-anim", { 
  strings: ["Hello!!!", "TJ",
  "Wishing you a Happy New Year", "May God bless you more in this year", "Make 2024 a great year!","Thank you😊"],
    
  typeSpeed: 150, 
  backSpeed: 80, 
  loop: true, 
  onStringTyped: function(index, self) {
    if (self.strings[index] === "TJ") {
      self.el.innerHTML += '<img src="./TJ.png">';
    }
  }
}); 


function write_fire(e) {
    var t, n, r;
    stars[e + "r"] = createDiv("|", 12);
    boddie.appendChild(stars[e + "r"]);
    for (t = bits * e; t < bits + bits * e; t++) {
      stars[t] = createDiv("*", 15);
      boddie.appendChild(stars[t]);
    }
  }
  
  function createDiv(e, t) {
    var n = document.createElement("div");
    n.style.font = t + "px monospace";
    n.style.position = "absolute";
    n.style.backgroundColor = "transparent";
    n.appendChild(document.createTextNode(e));
    return n;
  }
  
  function launch(e) {
    colour[e] = Math.floor(Math.random() * colours.length);
    Xpos[e + "r"] = swide * 0.5;
    Ypos[e + "r"] = shigh - 5;
    bangheight[e] = Math.round((0.5 + Math.random()) * shigh * 0.4);
    dX[e + "r"] = (Math.random() - 0.5) * swide / bangheight[e];
    if (dX[e + "r"] > 1.25) stars[e + "r"].firstChild.nodeValue = "/";
    else if (dX[e + "r"] < -1.25) stars[e + "r"].firstChild.nodeValue = "\\";
    else stars[e + "r"].firstChild.nodeValue = "|";
    stars[e + "r"].style.color = colours[colour[e]];
  }
  
  function bang(e) {
    var t, n, r = 0;
    for (t = bits * e; t < bits + bits * e; t++) {
      n = stars[t].style;
      n.left = Xpos[t] + "px";
      n.top = Ypos[t] + "px";
      if (decay[t]) decay[t]--;
      else r++;
      if (decay[t] == 15) n.fontSize = "7px";
      else if (decay[t] == 7) n.fontSize = "2px";
      else if (decay[t] == 1) n.visibility = "hidden";
      Xpos[t] += dX[t];
      Ypos[t] += dY[t] += 1.25 / intensity[e];
    }
    if (r != bits) setTimeout("bang(" + e + ")", speed);
  }
  
  function stepthrough(e) {
    var t, n, r;
    var i = Xpos[e + "r"];
    var s = Ypos[e + "r"];
    Xpos[e + "r"] += dX[e + "r"];
    Ypos[e + "r"] -= 4;
    if (Ypos[e + "r"] < bangheight[e]) {
      n = Math.floor(Math.random() * 3 * colours.length);
      intensity[e] = 5 + Math.random() * 4;
      for (t = e * bits; t < bits + bits * e; t++) {
        Xpos[t] = Xpos[e + "r"];
        Ypos[t] = Ypos[e + "r"];
        dY[t] = (Math.random() - 0.5) * intensity[e];
        dX[t] = (Math.random() - 0.5) * (intensity[e] - Math.abs(dY[t])) * 1.25;
        decay[t] = 16 + Math.floor(Math.random() * 16);
        r = stars[t];
        if (n < colours.length) r.style.color = colours[t % 2 ? colour[e] : n];
        else if (n < 2 * colours.length) r.style.color = colours[colour[e]];
        else r.style.color = colours[t % colours.length];
        r.style.fontSize = "13px";
        r.style.visibility = "visible";
      }
      bang(e);
      launch(e);
    }
    stars[e + "r"].style.left = i + "px";
    stars[e + "r"].style.top = s + "px";
  }
  
  function set_width() {
    var e = 999999;
    var t = 999999;
    if (document.documentElement && document.documentElement.clientWidth) {
      if (document.documentElement.clientWidth > 0) e = document.documentElement.clientWidth;
      if (document.documentElement.clientHeight > 0) t = document.documentElement.clientHeight;
    }
    if (self.innerWidth) {
      if (self.innerWidth > 0 && self.innerWidth < e) e = self.innerWidth;
      if (self.innerHeight > 0 && self.innerHeight < t) t = self.innerHeight;
    }
    if (document.body.clientWidth) {
      if (document.body.clientWidth > 0 && document.body.clientWidth < e) e = document.body.clientWidth;
      if (document.body.clientHeight > 0 && document.body.clientHeight < t) t = document.body.clientHeight;
    }
    if (e == 999999 || t == 999999) {
      e = 800;
      t = 600;
    }
    swide = e;
    shigh = t;
  }
  
  var bits = 60;
  var speed = 50;
  var bangs = 5;
  var colours = ["#03f", "#f03", "#0e0", "#93f", "#0cf", "#f93", "#f0c"];
  var bangheight = [];
  var intensity = [];
  var colour = [];
  var Xpos = [];
  var Ypos = [];
  var dX = [];
  var dY = [];
  var stars = [];
  var decay = [];
  var boddie;
  
  window.onload = function () {

    if (document.getElementById) {
      var e;
      boddie = document.createElement("div");
      boddie.style.position = "fixed";
      boddie.style.top = "0px";
      boddie.style.left = "0px";
      boddie.style.overflow = "visible";
      boddie.style.width = "1px";
      boddie.style.height = "1px";
      boddie.style.backgroundColor = "transparent";
      document.body.appendChild(boddie);
      set_width();
      for (e = 0; e < bangs; e++) {
        write_fire(e);
        launch(e);
        setInterval("stepthrough(" + e + ")", speed);
      }
    }
  };

  function crackers() {
    var audio = new Audio("./fireworks-29629.mp3");
    audio.play();
  }
  
  window.onresize = set_width;
