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

