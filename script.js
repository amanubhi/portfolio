'use strict';
const cases = [
 {title:'Case 01 / The suspicious order', question:'A fictional order export contains these rows. Each order should appear exactly once.', rows:'Order 1042 · $28\nOrder 1043 · $35\nOrder 1042 · $28', answers:['Add all three rows to revenue.','Investigate the repeated order ID before summing.','Remove every order worth $28.'], correct:1, why:'A repeated order ID may be a duplicate. Check the source and the intended row grain before removing it or calculating revenue.'},
 {title:'Case 02 / The salary trap', question:'A fictional job dataset has 100 postings. Only 20 disclose salary. Their median is $95,000. What can you safely report?', answers:['The median for all 100 jobs is $95,000.','Every job pays at least $95,000.','The median among the 20 salary-disclosing postings is $95,000.'], correct:2, why:'The median describes the disclosed salaries. Missing salary data may introduce selection bias, so coverage belongs beside the number.'},
 {title:'Case 03 / The bigger number', question:'Two fictional channels: Store earns $1,000 revenue with $900 in costs. Events earn $700 revenue with $400 in costs. Which has more profit?', answers:['Events: $300 profit versus $100 for Store.','Store, because revenue is higher.','They have the same profit.'], correct:0, why:'Profit is revenue minus the stated costs: Events = $300, Store = $100. The largest revenue number is not always the best answer.'}
];
const content=document.getElementById('game-content');
const progress=document.getElementById('progress');
let current=0,score=0;
function begin(){current=0;score=0;render();}
function render(){
 const c=cases[current]; progress.textContent=`CASE ${current+1} OF ${cases.length} · SCORE ${score}`;
 content.replaceChildren();
 const h=document.createElement('h3');h.textContent=c.title;h.tabIndex=-1;content.append(h);
 const p=document.createElement('p');p.textContent=c.question;content.append(p);
 if(c.rows){const pre=document.createElement('pre');pre.textContent=c.rows;pre.style.fontSize='12px';content.append(pre);}
 const choices=document.createElement('div');choices.className='choices';
 c.answers.forEach((answer,index)=>{const b=document.createElement('button');b.className='choice';b.textContent=answer;b.addEventListener('click',()=>answerCase(index,choices));choices.append(b);});content.append(choices);h.focus();
}
function answerCase(selected,choices){
 const c=cases[current];if(selected===c.correct)score++;
 [...choices.children].forEach((b,i)=>{b.disabled=true;if(i===c.correct)b.classList.add('correct');else if(i===selected)b.classList.add('wrong');});
 const feedback=document.createElement('p');feedback.className='feedback';feedback.setAttribute('role','status');feedback.textContent=(selected===c.correct?'Good catch! ':'Here’s the catch: ')+c.why;content.append(feedback);
 progress.textContent=`CASE ${current+1} OF ${cases.length} · SCORE ${score}`;
 const next=document.createElement('button');next.className='button';next.textContent=current===cases.length-1?'See your result ↗':'Next case →';next.addEventListener('click',()=>{current++;if(current<cases.length)render();else finish();});content.append(next);
}
function finish(){progress.textContent='INVESTIGATION COMPLETE';content.innerHTML='<span class="case-icon" aria-hidden="true">✓</span><h3 tabindex="-1">'+score+' / 3 cases solved</h3><p>'+(score===3?'Sharp instincts. You checked the data before trusting the headline.':'Every good analyst keeps asking questions. Now you’ve seen three common traps to watch for.')+'</p><p>That’s the mindset behind my projects: understand the data, challenge assumptions, make the result useful.</p><button class="button" id="restart">Play again ↻</button>';document.getElementById('restart').addEventListener('click',begin);content.querySelector('h3').focus();}
document.getElementById('start').addEventListener('click',begin);
document.getElementById('year').textContent=new Date().getFullYear();
