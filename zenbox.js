!function($) {

  "use strict"

  if ($.zenbox !== undefined) return;

  var elements, backdrop, frame, close,
    isShown = false, isModal = false,

    _init = function() {
      _injectDom();
      _attachListeners();
    },

    _injectDom = function() {
      if ($("#zenbox-elements").length) return;

      elements = $('<div id="zenbox-elements">');
      backdrop = $('<div id="zenbox-backdrop">');
      frame = $('<div id="zenbox-frame">');
      close = $('<div id="zenbox-close">&times;</div>');

      elements.append(backdrop, frame, close);
      $('body').append(elements);
    },

    _attachListeners = function() {
      backdrop.click(function (e) {
        e.preventDefault();
        if (isShown && !isModal) $.zenbox.close();
      });

      close.click(function(e) {
        e.preventDefault();
        if (isShown && !isModal) $.zenbox.close();
      });

      $(document).on('keyup', function(e) {
        if (isShown && !isModal && e.keyCode == 27 /* esc */) {
          e.stopPropagation();
          e.preventDefault();
          $.zenbox.close();
        }
      });
    },

    _stage = function(target) {
      if (target.is('#zenbox-frame > *:first-child') === true) return;
      if (target.parent().is('#zenbox-frame') === false) {
        $('<div class="zenbox-marker" style="display:none;">')
          .insertBefore(target)
          .on('zenbox-cleanup', function() {
            $(this).replaceWith(target);
          });
      }
      target.css("opacity", 0); // this is a hack
      frame.prepend(target).css({
        margin: Math.floor(-target[0].offsetHeight/2) + "px 0 0 " + Math.floor(-target[0].offsetWidth/2) + "px",
        height: target[0].offsetHeight,
        width:  target[0].offsetWidth
      });
      target.css("opacity", ""); // this is a hack
    }
  ;

  $.zenbox = function() {};

  $.zenbox.show = function(target) {
    if (!(target instanceof $)) target = $(target);
    if (!isShown) {
      isShown = true;
      elements.addClass("visible");
      _stage(target);
    } else {
      elements.addClass("transitional");
      _stage(target);
    }
  };

  $.zenbox.close = function() {
    if (!isShown) return;

    isShown = false;
    elements.removeClass("visible transitional");
    if (frame.css('visibility') === 'visible') {
      frame.one("TransitionEnd webkitTransitionEnd transitionend oTransitionEnd", function() {
        $.event.trigger('zenbox-cleanup');
      });
    } else {
      $.event.trigger('zenbox-cleanup');
    }
  };

  $.zenbox.modal = function(setModal) {
    isModal = setModal;
    if (isModal) elements.addClass("modal");
    else elements.removeClass("modal");
  };

  $.fn.zenbox = function(method) {
    if (method === "show") $.zenbox.show(this);
    return this;
  };

  $(document).ready(function() {
    _init();
  });
}(window.jQuery);
