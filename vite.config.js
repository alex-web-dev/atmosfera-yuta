export default {
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        projects: 'projects.html',
        project: 'project.html',
        favourites: 'favourites.html',
        about: 'about.html',
        contacts: 'contacts.html',
        articles: 'articles.html',
        article: 'article.html',
        reviews: 'reviews.html',
        completedWorks: 'completed-works.html',
        completedProject: 'completed-project.html',
        mortgage: 'mortgage.html',
        design: 'design.html',
        geology: 'geology.html',
      },
    },
  },
};