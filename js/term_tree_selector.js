(function(){
  var selectors = {
    /**
     * The base URL of the JSON endpoint.
     */
    baseUrl: '/term-tree-selector/',

    /**
     * Initialize term tree selectors.
     */
    init: function() {
      var forms = document.querySelectorAll('form.term-tree-selector');
      for (var i = 0; i < forms.length; i++) {
        var root_select = forms[i].querySelector('[name=root]');
        var leaf_select = forms[i].querySelector('[name=leaf]');
        var submit_button = forms[i].querySelector('[name=submit]');
        var vocabulary = forms[i].dataset.vocabulary;
        var level = forms[i].dataset.level;

        this.populateRootOptions(root_select, vocabulary, level);
        this.initSubmit(submit_button, root_select);
        this.initRootOnChange(root_select, leaf_select, vocabulary, level);
        this.initLeafOnChange(leaf_select);
      }
    },

    /**
     * Populate root options.
     *
     * @param submit_button
     * @param root_select
     */
    initSubmit: function(submit_button, root_select) {
      submit_button.onclick = function(e) {
        e.preventDefault();
        var url = root_select.options[root_select.selectedIndex].dataset.url;
        if (url) {
          window.location = url;
        }
      }
    },

    /**
     * Populate root options.
     *
     * @param root_select
     * @param vocabulary
     * @param level
     */
    populateRootOptions: function(root_select, vocabulary, level) {
      var url = this.baseUrl + encodeURIComponent(vocabulary) + '/level/' + encodeURIComponent(level);
      selectors.getJSON(url, function (data) {
        for (var x = 0; x < data.length; x++) {
          root_select.appendChild(selectors.optionElement(data[x]));
        }
      });
    },

    /**
     * Initialise the root onchange event.
     *
     * @param root_select
     * @param leaf_select
     * @param vocabulary
     * @param level
     */
    initRootOnChange: function(root_select, leaf_select, vocabulary, level) {
      // Change leaf options when root item is changed.
      root_select.onchange = function(e) {
        selectors.populateLeafOptions(leaf_select, vocabulary, e.target.value, level);
      }
    },

    /**
     * Initialise the leaf onchange event.
     *
     * @param leaf_select
     */
    initLeafOnChange: function(leaf_select) {
      // Go to leaf URL when chosen.
      leaf_select.onchange = function(e) {
        window.location =  e.target.options[e.target.selectedIndex].dataset.url;
      }
    },

    /**
     * Populate leaf options.
     *
     * @param leaf_select
     * @param vocabulary
     * @param tid
     * @param level
     */
    populateLeafOptions: function(leaf_select, vocabulary, tid, level) {
      // Remove current child elements.
      leaf_select.querySelectorAll('option[value]').forEach(function(el){
        leaf_select.removeChild(el);
      });

      var url = this.baseUrl +  encodeURIComponent(vocabulary) + '/' + encodeURIComponent(tid) + '/level/' + encodeURIComponent(level);
      selectors.getJSON(url, function(data){
        for (var x = 0; x < data.length; x++) {
          // Add new elements.
          for (var x = 0; x < data.length; x++) {
            leaf_select.appendChild(selectors.optionElement(data[x]));
          }
        }
      });
    },

    /**
     * Fetches JSON and passes to callback.
     *
     * @param url
     * @param callback
     */
    getJSON: function(url, callback) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('GET', url, true);
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4) {
          if(xmlhttp.status === 200) {
            var data = JSON.parse(xmlhttp.responseText);
            if (data.length > 0) {
              callback(data);
            }
          }
        }
      };
      xmlhttp.send(null);
    },

    /**
     * Create option element from provided data.
     * @param data
     * @returns {HTMLOptionElement}
     */
    optionElement: function(data) {
      var el = document.createElement('option');
      el.dataset.url = data.url;
      el.value = data.tid;
      el.innerHTML = data.name;
      return el;
    }

  }

  selectors.init();
})();
