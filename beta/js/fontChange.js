 /**
   * Font Selector - jQuery plugin 0.1
   *
   * Copyright (c) 2012 Chris Dyer
   *
   * All rights reserved.
   *
   * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following
   * conditions are met:
   *
   * Redistributions of source code must retain the above copyright notice, this list of conditions and the following
   * disclaimer. Redistributions in binary form must reproduce the above copyright notice, this list of conditions
   * and the following disclaimer in the documentation and/or other materials provided with the distribution.
   *
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING,
   * BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
   * EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
   * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
   * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
   * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
   * SUCH DAMAGE.
   *
   */

  function setEndOfContenteditable(contentEditableElement) {
    var range, selection;
    if (document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
      range = document.createRange();//Create a range (a range is a like the selection but invisible)
      range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
      range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
      selection = window.getSelection();//get the selection object (allows you to change selection)
      selection.removeAllRanges();//remove any selections already made
      selection.addRange(range);//make the range you have just created the visible selection
    }
    else if (document.selection)//IE 8 and lower
    {
      range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
      range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
      range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
      range.select();//Select the range (make it the visible selection
    }
  }

  (function($) {

    var settings;

    var methods = {
      init: function(options) {

        settings = $.extend({
          'hide_fallbacks': false,
          'selected': function(style) {},
          'opened': function() {},
          'closed': function() {},
          'initial': '',
          'fonts': []
        }, options);

        var root = this;
        var $root = $(this);
        root.selectedCallback = settings['selected'];
        root.openedCallback = settings['opened'];
        root.closedCallback = settings['closed'];
        var visible = false;
        var selected = false;
        var openedClass = 'fontSelectOpen';

        var displayName = function(font) {
          if (settings['hide_fallbacks'])
            return font.substr(0, font.indexOf(','));
          else
            return font;
        }

        var select = function(font) {
          root.find('span').html(displayName(font).replace(/["']{1}/gi, ""));
          root.css('font-family', font);
          selected = font;

          root.selectedCallback(selected);
        }

        var positionUl = function() {
          var left, top;
          left = $(root).offset().left;
          top = $(root).offset().top + $(root).outerHeight();

          $(ul).css({
            'position': 'absolute',
            'left': left + 'px',
            'top': top + 'px',
            'width': $(root).outerWidth() + 'px'
          });
        }

        var closeUl = function() {
          ul.slideUp('fast', function() {
            visible = false;
          });

          $root.removeClass(openedClass);

          root.closedCallback();
        }

        var openUi = function() {
          ul.slideDown('fast', function() {
            visible = true;
          });

          $root.addClass(openedClass);

          root.openedCallback();
        }

        // Setup markup
        $root.prepend('<span>' + settings['initial'].replace(/'/g, '&#039;') + '</span>');
        var ul = $('<ul class="fontSelectUl"></ul>').appendTo('body');
        ul.hide();
        positionUl();

        for (var i = 0; i < settings['fonts'].length; i++) {
          var item = $('<li>' + displayName(settings['fonts'][i]) + '</li>').appendTo(ul);
          $(item).css('font-family', settings['fonts'][i]);
        }

        if (settings['initial'] != '')
          select(settings['initial']);

        ul.find('li').click(function() {

          if (!visible)
            return;

          positionUl();
          closeUl();

          select($(this).css('font-family'));
        });

        $root.click(function(event) {

          if (visible)
            return;

          event.stopPropagation();

          positionUl();
          openUi();
        });

        $('html').click(function() {
          if (visible) {
            closeUl();
          }
        })
      },
      selected: function() {
        return this.css('font-family');
      },
      select: function(font) {
        this.find('span').html(font.substr(0, font.indexOf(',')).replace(/["']{1}/gi, ""));
        this.css('font-family', font);
        selected = font;
      }
    };

    $.fn.fontSelector = function(method) {
      if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof method === 'object' || !method) {
        return methods.init.apply(this, arguments);
      } else {
        $.error('Method ' + method + ' does not exist on jQuery.fontSelector');
      }
    }
  })(jQuery);
  
  $(function() {
    $('#fontSelect').fontSelector({
      'hide_fallbacks': true,
      'initial': 'Courier New,Courier New,Courier,monospace',
      'selected': function(style) {
       $('#tidocsContent').focus()
       setEndOfContenteditable(document.getElementById("tidocsContent"));
       document.execCommand('styleWithCSS',false,true);
       document.execCommand('fontName',false,style);
      },
      'fonts': [
        'Arial,Arial,Helvetica,sans-serif',
        'Arial Black,Arial Black,Gadget,sans-serif',
        'Comic Sans MS,Comic Sans MS,cursive',
        'Courier New,Courier New,Courier,monospace',
        'Georgia,Georgia,serif',
        'Impact,Charcoal,sans-serif',
        'Lucida Console,Monaco,monospace',
        'Lucida Sans Unicode,Lucida Grande,sans-serif',
        'Palatino Linotype,Book Antiqua,Palatino,serif',
        'Tahoma,Geneva,sans-serif',
        'Times New Roman,Times,serif',
        'Trebuchet MS,Helvetica,sans-serif',
        'Verdana,Geneva,sans-serif',
        'Gill Sans,Geneva,sans-serif'
      ]
    });
   $('#fontSelectSheets').fontSelector({
      'hide_fallbacks': true,
      'initial': 'Courier New,Courier New,Courier,monospace',
      'selected': function(style) {
       document.getElementById('sheetsContent').style.fontFamily = style;
      },
      'fonts': [
        'Arial,Arial,Helvetica,sans-serif',
        'Arial Black,Arial Black,Gadget,sans-serif',
        'Comic Sans MS,Comic Sans MS,cursive',
        'Courier New,Courier New,Courier,monospace',
        'Georgia,Georgia,serif',
        'Impact,Charcoal,sans-serif',
        'Lucida Console,Monaco,monospace',
        'Lucida Sans Unicode,Lucida Grande,sans-serif',
        'Palatino Linotype,Book Antiqua,Palatino,serif',
        'Tahoma,Geneva,sans-serif',
        'Times New Roman,Times,serif',
        'Trebuchet MS,Helvetica,sans-serif',
        'Verdana,Geneva,sans-serif',
        'Gill Sans,Geneva,sans-serif'
      ]
    });
  });
