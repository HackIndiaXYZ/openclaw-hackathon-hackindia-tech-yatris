let movements=0,startTime=0,uniqueZones=new Set();
let pauses=0,lastMoveTime=Date.now(),tabSwitches=0;
let hesitationTimes=[];

const area=document.getElementById("interactionArea");
const button=document.getElementById("startBtn");

button.onclick=()=>{
  movements=0;
  startTime=Date.now();
  uniqueZones.clear();
  pauses=0;
  tabSwitches=0;
  hesitationTimes=[];
};

area.addEventListener("mousemove",(e)=>{
  movements++;

  let x=Math.floor(e.offsetX/50);
  let y=Math.floor(e.offsetY/50);
  uniqueZones.add(x+"-"+y);

  let now=Date.now();
  if(now-lastMoveTime>500) pauses++;
  lastMoveTime=now;

  let dot=document.createElement("div");
  dot.style.position="absolute";
  dot.style.width="5px";
  dot.style.height="5px";
  dot.style.background="cyan";
  dot.style.left=e.pageX+"px";
  dot.style.top=e.pageY+"px";
  document.body.appendChild(dot);
  setTimeout(()=>dot.remove(),500);
});

area.addEventListener("click",()=>{
  hesitationTimes.push(Date.now()-lastMoveTime);
});

document.addEventListener("visibilitychange",()=>{
  if(document.hidden) tabSwitches++;
});

setInterval(()=>{
  if(startTime!==0){
    let t=(Date.now()-startTime)/1000;
    if(t>5){

      let movementScore=Math.min(movements,40);
      let curiosityScore=Math.min(uniqueZones.size*5,30);
      let attentionScore=pauses>0?20:10;

      let avg=hesitationTimes.length?
        hesitationTimes.reduce((a,b)=>a+b)/hesitationTimes.length:0;

      let flowScore=avg>50?20:10;

      let total=movementScore+curiosityScore+attentionScore+flowScore;

      document.getElementById("score").innerText="Human Score: "+total;
      document.getElementById("curiosity").innerText=curiosityScore;
      document.getElementById("attention").innerText=attentionScore;
      document.getElementById("flow").innerText=flowScore;

      document.getElementById("progressBar").style.width=total+"%";

      let verdict=document.getElementById("verdict");
      let insight=document.getElementById("insight");

      if(total>80){
        verdict.innerText="Verdict: Human 🟢";
        verdict.style.color="green";
        insight.innerText="Behavior looks human-like";
      } else if(total>50){
        verdict.innerText="Verdict: Suspicious 🟡";
        verdict.style.color="orange";
        insight.innerText="Some suspicious patterns detected";
      } else{
        verdict.innerText="Verdict: Bot 🔴";
        verdict.style.color="red";
        insight.innerText="Behavior looks automated";
      }

      startTime=0;
    }
  }
},1000);

document.getElementById("botBtn").onclick=()=>{
  let total=20;

  document.getElementById("score").innerText="Human Score: "+total;
  document.getElementById("progressBar").style.width=total+"%";
  document.getElementById("verdict").innerText="Verdict: Bot 🔴";
  document.getElementById("verdict").style.color="red";
  document.getElementById("insight").innerText="Automated pattern detected";
};

function showTest(type) {
  document.querySelectorAll(".test-box").forEach(el => {
    el.classList.remove("active");
  });

  if (type === "behavior") {
    document.getElementById("behaviorTest").classList.add("active");
  }

  if (type === "drawing") {
    document.getElementById("drawingTest").classList.add("active");
  }

  if (type === "click") {
    document.getElementById("clickTest").classList.add("active");
  }

  if (type === "bot") {
    simulateBot();
  }
}

const canvas = document.getElementById("drawingTest");
const ctx = canvas.getContext("2d");

let drawing = false;

canvas.addEventListener("mousedown", () => drawing = true);
canvas.addEventListener("mouseup", () => drawing = false);

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;

  ctx.fillStyle = "cyan";
  ctx.fillRect(e.offsetX, e.offsetY, 4, 4);
});

let clicks = 0;

document.getElementById("clickTest").addEventListener("click", () => {
  clicks++;
});