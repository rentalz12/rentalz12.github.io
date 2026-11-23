var box = document.getElementById("hero-particles");
var hero = document.querySelector(".hero");
var canvas = document.createElement("canvas");
box.appendChild(canvas);
var ctx = canvas.getContext("2d");
var dots = [];
var mouse = { x: -1000, y: -1000 };

function setSize() {
  canvas.width = box.offsetWidth;
  canvas.height = box.offsetHeight;
}

function makeDots() {
  dots = [];
  var count = Math.floor((canvas.width * canvas.height) / 12000);
  for (var i = 0; i < count; i++) {
    dots.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: 1 + Math.random() * 2
    });
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < dots.length; i++) {
    var d = dots[i];
    d.x += d.vx;
    d.y += d.vy;

    if (d.x < 0) d.x = canvas.width;
    if (d.x > canvas.width) d.x = 0;
    if (d.y < 0) d.y = canvas.height;
    if (d.y > canvas.height) d.y = 0;

    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fill();

    for (var j = i + 1; j < dots.length; j++) {
      var o = dots[j];
      var dist = Math.hypot(d.x - o.x, d.y - o.y);
      if (dist < 130) {
        ctx.strokeStyle = "rgba(255, 255, 255, " + (0.2 * (1 - dist / 130)) + ")";
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(o.x, o.y);
        ctx.stroke();
      }
    }

    var md = Math.hypot(d.x - mouse.x, d.y - mouse.y);
    if (md < 160) {
      ctx.strokeStyle = "rgba(255, 255, 255, " + (0.5 * (1 - md / 160)) + ")";
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }
  }

  requestAnimationFrame(draw);
}

hero.addEventListener("mousemove", function (e) {
  var rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

hero.addEventListener("mouseleave", function () {
  mouse.x = -1000;
  mouse.y = -1000;
});

window.addEventListener("resize", function () {
  setSize();
  makeDots();
});

setSize();
makeDots();
draw();