(()=>{"use strict";const e=void 0,t=void 0;let a=document.querySelector(".chat-area"),l=document.querySelector(".message-area"),s=(document.querySelector(".bot-avatar-ball"),document.querySelector(".user-avatar-ball"),t),n={method:"POST",headers:{Authorization:e,"Content-Type":"application/json"},body:JSON.stringify({model:"gpt-3.5-turbo",messages:[],temperature:.7,n:1})},o=(e,t)=>{let a={role:t,content:e},l=JSON.parse(n.body).messages;l.push(a);let s=JSON.parse(n.body);s.messages=l,n.body=JSON.stringify(s)},r=(e,t)=>{let s=document.createElement("div");s.classList.add("role");let n=document.createElement("div");n.classList.add("message-bubble"),n.classList.add(t),n.textContent=e;let o=(()=>{let e=new Date,t=e.getFullYear(),a=e.getMonth()+1;a<10&&(a="0"+a.toString());let l=e.getDate();l<10&&(l="0"+l.toString());let s=e.getHours();s<10&&(s="0"+s.toString());let n=e.getMinutes();n<10&&(n="0"+n.toString());let o=`${t}/${a}/${l}:${s}:${n}`;console.log(o);let r=document.createElement("div");return r.classList.add("timeBlock"),r.textContent=o,r})();if("user"===t){s.appendChild(n);let e=document.createElement("div");e.classList.add("user-avatar-ball"),e.appendChild(o),s.appendChild(e)}else{let e=document.createElement("div");e.classList.add("bot-avatar-ball"),e.appendChild(o),s.appendChild(e),s.appendChild(n)}l.appendChild(s),a.value="",a.removeAttribute("readonly"),s.scrollIntoView(!1)};a.onkeydown=e=>{if("Enter"!==e.code)return;let t=a.value.trim();""!==t?(o(t,"user"),r(t,"user"),a.value="Chat-bot is thinking now...",a.style.color="gray",a.setAttribute("readonly",""),fetch(s,n).then((e=>e.json())).then((e=>{let t=e.choices[0].message.content;o(t,"assistant"),r(t,"assistant")})),a.blur()):alert("Please input something")}})();