/**
 * CKEditor plugin: Chrome helper
 * - Fixes the triple click bug in chrome
 *
 */
(function() {
  "use strict";

  var PLUGIN_NAME = "chromehelper";

  /**
   * Initializes the plugin
   */
  CKEDITOR.plugins.add(PLUGIN_NAME, {
    init: function(editor) {
      editor.on("contentDom", function(evt) {
        init(editor);
      });
    }
  });

  function handleMouseup(editor, event) {
    if (event.data.$.detail >= 3) {
      var selection = editor.getSelection();
      console.log(selection);
      var range = selection.getRanges()[0];
      var actualStartContainer = range.startContainer;

      var hasFoundBlock = false;
      if (actualStartContainer.$.nodeType === 1 && getComputedStyle(actualStartContainer.$, null).display == "block") {
        hasFoundBlock = true;
      }

      while (!hasFoundBlock && actualStartContainer.getParent() && getComputedStyle(actualStartContainer.getParent().$, null).display == "block") {
        hasFoundBlock = true;
        actualStartContainer = actualStartContainer.getParent();
      }

      range.selectNodeContents(actualStartContainer);
      selection.selectRanges([range]);
    }
  }

  function init(editor) {
    var editable = editor.editable();
    editor
      .editable()
      .attachListener(
        editor.editable(),
        "click",
        handleMouseup.bind(handleMouseup, editor)
      );
  }
})();
