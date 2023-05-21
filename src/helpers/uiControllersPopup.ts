export const handleOpenMenu = () => {
  const popup = document.getElementById("popup");
  popup?.classList.add("open");
}

export const handleCloseMenu = () => {
  const popup = document.getElementById("popup");
  popup?.classList.remove("open");
}