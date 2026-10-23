function renderSaved() {
  const list = properties.filter((p) => isSaved(p.id));
  const grid = document.getElementById("savedGrid");
  const count = document.getElementById("savedCount");
  count.textContent = `${list.length} saved`;
  grid.innerHTML = list.length
    ? list.map(renderCard).join("")
    : `<div class="empty-state"><p>No saved properties yet. Click the heart icon on a listing to save it.</p></div>`;
  bindCardEvents(grid, renderSaved);
}

renderSaved();