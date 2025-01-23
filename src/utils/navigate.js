const navigateTo = (route, navigate) => {
  navigate(route);
  window.scrollTo(0, 0);
};

export { navigateTo };
