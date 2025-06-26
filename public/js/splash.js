document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('hasSeenSplash') === 'true') {
    const splashElement = document.getElementById('splash');
    const mainContent = document.getElementById('site-content');
    
    if (splashElement) 
      splashElement.style.display = 'none'; 
    if(mainContent)
        mainContent.classList.remove('hidden');
    document.body.classList.remove('overflow-hidden');
    return; 
  }
  


  const riveCanvas = document.getElementById('rive-canvas');
  const r = new rive.Rive({
    src: '/animations/plant-parent-splash.riv',
    stateMachines: 'State Machine 1',
    canvas: riveCanvas,
    autoplay: true,
    fit: rive.Fit.Cover,
    alignment: rive.Alignment.Center,
    onLoad: () => {
      r.resizeDrawingSurfaceToCanvas();
    },
    onError: (error) => {
      console.error('Erro ao carregar a animação Rive:', error);
    }
  });

  r.on('statechange', (e) => {
    if (e.data.includes('exit')) {
      finishSplash();
    }
  });
});

function finishSplash() {
  sessionStorage.setItem('hasSeenSplash', 'true');

  const splash = document.getElementById('splash');
  const siteContent = document.getElementById('site-content');
  
  if (splash) {
    splash.style.opacity = '0';
    splash.addEventListener('transitionend', () => {
      splash.remove();
      if (siteContent) {
        siteContent.classList.remove('hidden');
      }
      document.body.classList.remove('overflow-hidden');
    }, { once: true });
  }
}