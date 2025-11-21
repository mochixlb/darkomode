(function() {
  try {
    var theme = localStorage.getItem('theme');
    var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var initialTheme = theme || (systemPrefersDark ? 'dark' : 'light');
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {
    // Fallback to system preference if localStorage fails
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }
})();

