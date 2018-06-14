$(document).ready(function() {
  const $archive = $('.archive');
  $archive.imagesLoaded(function() {
    $archive.isotope({
      // options
      itemSelector: '.preview',
      layoutMode: 'fitRows',
      percentPosition: true,
      fitRows: {
        gutter: 10
      }
    })
  });

  $('.filter-button-group').on( 'click', '.button', function () {
    const filterValue = $(this).attr('data-filter');
    $archive.isotope({ filter: filterValue });
  });

  $('.filter-button-group').on( 'click', '.button', function () {
    $('.active').toggleClass( 'active' );
    $(this).toggleClass( 'active' );
  });
});

window.onload = function() { $container.isotope('layout'); };
