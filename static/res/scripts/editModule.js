/**
 * Created by Administrator on 2016/11/7 0007.
 */
$(document).ready(function () {
    var editor;
    setTimeout(function () {
        editor = CodeMirror.fromTextArea(document.getElementById("editModule"), {
            styleActiveLine: true,
            lineNumbers: true,
            lineWrapping: true,
            indentWithTabs: true,
            smartIndent: true,
            matchBrackets: true,
            viewportMargin: Infinity,
            matchBrackets: true,
            autofocus: true,
            highlightSelectionMatches: {showToken: /\w/, annotateScrollbar: true},
            theme: 'night',
            extraKeys: {
                "Alt-/": "autocomplete"
            }
        })
    }, 1);
})