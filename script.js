// script.js

// Toggle sidebar menu
function toggleMenu(){
  const nav = document.querySelector('.navlist');
  if(nav){ nav.classList.toggle('active'); }
}

// Footer year
(function(){
  const y = document.getElementById('currentYear');
  if(y) y.textContent = new Date().getFullYear();
})();

// Language toggle (demo)
(function(){
  const btn = document.getElementById('languageToggle');
  if(btn){
    btn.addEventListener('click', ()=>{
      if(btn.textContent === 'ภาษาไทย'){
        btn.textContent = 'English';
      } else {
        btn.textContent = 'ภาษาไทย';
      }
    });
  }
})();

// Analysis page: sampling step live update
(function(){
  const step = document.getElementById('sampleStep');
  const out = document.getElementById('sampleStepVal');
  if(step && out){
    step.addEventListener('input', ()=>{
      out.textContent = step.value + ' px';
    });
  }
})();

// Camera control (mock)
let stream=null;
const btnCapture = document.getElementById('captureFromCamera');
const btnStop = document.getElementById('stopCamera');
if(btnCapture && btnStop){
  btnCapture.addEventListener('click', async ()=>{
    try{
      stream = await navigator.mediaDevices.getUserMedia({video:true});
      const video = document.getElementById('video');
      video.srcObject = stream;
      video.style.display = 'block';
      btnStop.disabled = false;
    }catch(err){ alert('ไม่สามารถเปิดกล้องได้: '+err); }
  });
  btnStop.addEventListener('click', ()=>{
    if(stream){
      stream.getTracks().forEach(t=>t.stop());
      stream = null;
      btnStop.disabled = true;
    }
  });
}
