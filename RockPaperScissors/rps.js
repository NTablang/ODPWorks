var $slides = $('.slide_item');

$('.slide_thumbs > div').on('mouseenter', function() {
  var $this = $(this);
  var index = $this.data('index');
  var $target = $slides.eq(index);
  $slides.addClass('hidden');
  $target.removeClass('hidden');
});