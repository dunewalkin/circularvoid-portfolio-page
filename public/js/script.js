document.addEventListener('DOMContentLoaded', () => {
   const links = document.querySelectorAll('.sidebar a');
   const contentDiv = document.getElementById('content');

   const setActiveLink = (activeLink) => {
      links.forEach(link => link.classList.remove('link-active'));
      activeLink.classList.add('link-active');
   };

   const loadPage = (page, updateHistory = true) => {
      fetch(`/views/${page}.html`)
         .then(response => response.text())
         .then(data => {
            contentDiv.innerHTML = data;

            updateAllHeights();

            if (updateHistory) {
               window.history.pushState({page: page}, "", page === 'about' ? '/' : `#${page}`);
            }
         })
         .catch(error => console.error('Ошибка загрузки:', error));
   };

   links.forEach(link => {
      link.addEventListener('click', (event) => {
         event.preventDefault();
         const page = event.target.getAttribute('data-page');
         loadPage(page);
         setActiveLink(event.target);
      });
   });

   const initialPage = window.location.hash ? window.location.hash.slice(1) : 'about';
   loadPage(initialPage, initialPage !== 'about');
   setActiveLink(document.querySelector(`.sidebar a[data-page="${initialPage}"]`));

   window.addEventListener('popstate', (event) => {
      const page = event.state ? event.state.page : 'about';
      loadPage(page, false);
      setActiveLink(document.querySelector(`.sidebar a[data-page="${page}"]`));
   });
});

function updateAllHeights() {
   const boxes = document.querySelectorAll('.bandcamp-item iframe');
   const maxWidth1 = 989; 
   const maxWidth2 = 899;
   const maxWidth3 = 768;
   const maxWidth4 = 659;
   const maxWidth5 = 500;
   const maxWidth6 = 331;
   const baseHeight = 470; 
   const thirdHeight = 440;
   const secondaryHeight = 520; 
   const baseWidth = 350; 

   boxes.forEach(box => {
      let height = baseHeight; 


      if (window.innerWidth <= maxWidth6) {
         const extraHeight = 0.6 * (maxWidth6 - window.innerWidth); 
         height = secondaryHeight + extraHeight; 
      } else if (window.innerWidth <= maxWidth5) {
         const extraHeight = 0.29 * (maxWidth5 - window.innerWidth); 
         height = thirdHeight + extraHeight; 
      } else if (window.innerWidth <= maxWidth4) {
         const extraHeight = 0.4 * (maxWidth4 - window.innerWidth); 
         height = secondaryHeight + extraHeight; 
      } else if (window.innerWidth <= maxWidth3) {
         const extraHeight = 0.2 * (maxWidth3 - window.innerWidth); 
         height = baseHeight + extraHeight; 
      } else if (window.innerWidth <= maxWidth2) {
         const extraHeight = 0.4 * (maxWidth2 - window.innerWidth); 
         height = secondaryHeight + extraHeight; 
      } else if (window.innerWidth <= maxWidth1) {
         
         const extraHeight = 0.2 * (maxWidth1 - window.innerWidth); 
         height = baseHeight + extraHeight;
      }

      box.style.aspectRatio = `${baseWidth} / ${height}`;
   });
}

window.addEventListener('load', () => {
   setTimeout(updateAllHeights, 100); 
   window.addEventListener('resize', updateAllHeights);
});




