// Event delegation on document instead of per-button listeners.
// Blazor Server replaces the prerendered DOM once its SignalR circuit connects,
// which would silently drop listeners attached directly to the buttons on page load.
document.addEventListener('click', function (e) {
  var thumb = e.target.closest('[data-thumbs] button[data-slide]');
  if (!thumb) return;

  var thumbGroup = thumb.closest('[data-thumbs]');
  var name = thumbGroup.getAttribute('data-thumbs');
  var media = name
    ? document.querySelector('[data-slideshow="' + name + '"]')
    : thumbGroup.previousElementSibling;

  if (!media) return;

  var targetId = thumb.getAttribute('data-slide');
  media.querySelectorAll('img').forEach(function (img) {
    img.classList.toggle('active', !targetId || img.id === targetId);
  });
  thumbGroup.querySelectorAll('button').forEach(function (t) {
    t.classList.toggle('active', t === thumb);
  });
});
