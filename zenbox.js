/* =========================================================
 * zenbox v0.2.0
 * https://github.com/goaway/zenbox
 * =========================================================
 * Copyright 2012 Michael Schore
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

!function($) {

  "use strict";

  var elements, backdrop, frame, close,
    isShown = false, isModal = false,
    transitionEnd = "TransitionEnd webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd",

    _init = function() {
      if ($("#zenbox-elements").length) return;
      _injectDom();
      _attachListeners();
    },

    _injectDom = function() {
      elements = $('<div id="zenbox-elements">').append(
        backdrop = $('<div id="zenbox-backdrop">'),
        frame = $('<div id="zenbox-frame">').append(
          close = $('<div id="zenbox-close">&times;</div>')
        )
      );
      $('body').append(elements);
    },

    _attachListeners = function() {
      close.add(backdrop).click(function(e) {
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
      if (target[0] === frame.children()[0]) return;
      if (target.parent()[0] !== frame[0]) {
        var marker = $('<div class="zenbox-marker" style="display:none;">')
          .insertBefore(target);
        $(document).one('zenbox-closed', function() {
          $(marker).replaceWith(target);
          $(target).trigger('zenbox-reset');
        });
      }
      elements.addClass("staging");
      frame.prepend(target).css({
        margin: Math.floor(-target[0].offsetHeight/2) + "px 0 0 " + Math.floor(-target[0].offsetWidth/2) + "px",
        height: target[0].offsetHeight,
        width:  target[0].offsetWidth
      });
      elements.removeClass("staging");
    }
  ;

  $.zenbox = function() {};

  $.zenbox.defaults = {
    modal: false,
    style: "fancy"
  };

  $.zenbox.show = function(target, options) {
    if (!(target instanceof $)) target = $(target);
    target.trigger('zenbox-show');
    options = $.extend({}, this.defaults, typeof options === 'object' && options);

    if (!isShown) elements.attr('class', "visible " + options.style);
    else {
      $(frame.children()[0]).trigger('zenbox-transition')
      elements.addClass("transitional");
    }

    this.modal(options.modal);
    isShown = true;
    _stage(target);
    target.trigger('zenbox-shown');
  };

  $.zenbox.close = function() {
    if (!isShown) return;
    var target = frame.children().first();
    target.trigger('zenbox-close');
    isShown = false;
    elements.removeClass("visible transitional");
    if (frame.css('visibility') === 'visible') {
      frame.one(transitionEnd, function() {
        target.trigger('zenbox-closed');
      });
    } else {
      target.trigger('zenbox-closed');
    }
  };

  $.zenbox.modal = function(setModal) {
    isModal = setModal;
    if (isModal) elements.addClass("modal");
    else elements.removeClass("modal");
  };

  $.fn.zenbox = function(method, options) {
    if (method === "show") $.zenbox.show(this, options);
    return this;
  };

  $(document).ready(function() {
    _init();
  });
}(window.jQuery);
