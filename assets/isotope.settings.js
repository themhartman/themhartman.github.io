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

  var fitRows = Isotope.LayoutMode.modes.fitRows.prototype;
fitRows._resetLayout = function() {

  // pre-calculate offsets for centering each row
  this.x = 0;
  this.y = 0;
  this.maxY = 0;
  this._getMeasurement( 'gutter', 'outerWidth' );
  this.centerX = [];
  this.currentRow = 0;
  this.initializing = true;
  for ( var i=0, len = this.items.length; i < len; i++ ) {
      var item = this.items[i];
      this._getItemLayoutPosition(item);
  }
  this.centerX[this.currentRow].offset = (this.isotope.size.innerWidth +this.gutter-this.x) / 2;
  this.initializing = false;
  this.currentRow = 0;

  // centered offsets were calculated, reset layout
  this.x = 0;
  this.y = 0;
  this.maxY = 0;
  this._getMeasurement( 'gutter', 'outerWidth' );
};
fitRows._getItemLayoutPosition = function( item ) {
  item.getSize();
  var itemWidth = item.size.outerWidth + this.gutter;
  // if this element cannot fit in the current row
  var containerWidth = this.isotope.size.innerWidth + this.gutter;
  if ( this.x !== 0 && itemWidth + this.x > containerWidth ) {

    if (this.initializing)
        this.centerX[this.currentRow].offset = (containerWidth-this.x) / 2;
    this.currentRow++;

    this.x = 0;
    this.y = this.maxY;
  }

  if (this.initializing && this.x == 0) {
    this.centerX.push({ offset: 0});
  }
  //if (this.centerX[this.currentRow].offset < 0)
  //  this.centerX[this.currentRow].offset = 0;

  var position = {
    x: this.x+(this.initializing?0:this.centerX[this.currentRow].offset),
    y: this.y
  };

  this.maxY = Math.max( this.maxY, this.y + item.size.outerHeight );
  this.x += itemWidth;

  return position;
};

  $('.filter-button-group').on( 'click', '.button', function () {
    $('.active').toggleClass( 'active' );
    $(this).toggleClass( 'active' );
  });
});

window.onload = function() { $container.isotope('layout'); };
