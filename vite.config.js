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
      },
    },
  },
};