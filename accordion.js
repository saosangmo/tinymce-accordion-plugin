'use strict';

tinymce.PluginManager.add('accordion', function(editor, url) {
    var openDialog = function () {
      return editor.windowManager.open({
        title: 'Accordion content',
        body: {
          type: 'panel',
          items: [
            {
              type: 'input',
              name: 'number',
              label: 'Number of tabs'
            }
          ]
        },
        buttons: [
          {
            type: 'cancel',
            text: 'Close'
          },
          {
            type: 'submit',
            text: 'Save',
            primary: true
          }
        ],
        onSubmit: function (api) {
          var data = api.getData();
          // Insert content when the window form is submitted
          var accordionSet = [];
          var curAccordion = Date.now();
          var accordionCount = parseInt(data.number);
          for (var i = 0; i < accordionCount; i++) {
            var panel = '\n                    <div class="panel panel-default">\n                      <div class="panel-heading mceNonEditable productAccordion" role="tab" id="heading' + (curAccordion + i) + '">\n                        <h4 class="panel-title">\n                          <a role="button" data-toggle="collapse" class="mceEditable collapsed" data-parent="#accordion' + curAccordion + '" href="#collapse' + (curAccordion + i) + '" aria-expanded="true" aria-controls="collapse' + (curAccordion + i) + '">\n                            Change this header!\n                          </a>\n                        </h4>\n                      </div>\n                      <div id="collapse' + (curAccordion + i) + '" class="panel-collapse collapse mceNonEditable" role="tabpanel" aria-labelledby="heading' + (curAccordion + i) + '">\n                        <div class="panel-body mceEditable">\n                          <p>Change this content</p>\n                        </div>\n                      </div>\n                    </div>\n                ';
            accordionSet.push(panel);
          }

          var accordion = '\n                    <div class="panel-group" id="accordion' + curAccordion + '" role="tablist" aria-multiselectable="true">\n                      ' + accordionSet.join('') + '\n                  </div>';
          editor.insertContent(accordion);

          api.close();
        }
      });
    };
    // Add a button that opens a window
    editor.ui.registry.addButton('accordion', {
        tooltip: 'Tabs content',
        icon: 'line-height',
        onAction: function () {
        // Open window
        openDialog();
        }
    });

    return {
        getMetadata: function () {
        return  {
            name: "Accordion content",
            url: "https://osd.vn"
        };
        }
    };
});
