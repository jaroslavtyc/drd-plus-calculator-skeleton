var form = document.getElementById('configurator');
var inputs = document.getElementsByTagName('input');
var selects = document.getElementsByTagName('select');
var buttons = document.getElementsByTagName('button');
var controls = [];
for (var inputIndex = 0, inputsLength = inputs.length; inputIndex < inputsLength; inputIndex++) {
    var input = inputs[inputIndex];
    if (input.type !== 'hidden') {
        controls.push(inputs[inputIndex]);
    }
}
for (var selectIndex = 0, selectsLength = selects.length; selectIndex < selectsLength; selectIndex++) {
    controls.push(selects[selectIndex]);
}
for (var buttonIndex = 0, buttonsLength = buttons.length; buttonIndex < buttonsLength; buttonIndex++) {
    if (buttons[buttonIndex].type === 'button') {
        controls.push(buttons[buttonIndex]);
    }
}
var submitForm = function () {
    form.submit();
};
var enableControls = function () {
    for (var j = 0, length = controls.length; j < length; j++) {
        controls[j].disabled = null;
    }
};
var disableControls = function (forMilliSeconds) {
    for (var j = 0, length = controls.length; j < length; j++) {
        controls[j].disabled = true;
    }
    if (forMilliSeconds) {
        window.setTimeout(enableControls, forMilliSeconds /* unlock after */)
    }
};
var invalidateResult = function () {
    var result = document.getElementById('result');
    if (!result) {
        return;
    }
    result.classList.add('obsolete');
    result.style.opacity = '0.5';
};
for (selectIndex = 0; selectIndex < selectsLength; selectIndex++) {
    selects[selectIndex].addEventListener('change', (function (selectIndex) {
        return function () {
            var inputsWithSelects = selects[selectIndex].parentNode.parentNode.getElementsByTagName('input');
            for (var inputWithSelectIndex = 0, inputsWithSelectsLength = inputsWithSelects.length; inputWithSelectIndex < inputsWithSelectsLength; inputWithSelectIndex++) {
                inputsWithSelects[inputWithSelectIndex].checked = true;
            }
        }
    })(selectIndex));
}
var submitOnChange = function () {
    submitForm();
    disableControls(5000);
    invalidateResult();
};
for (var i = 0, controlsLength = controls.length; i < controlsLength; i++) {
    var control = controls[i];
    if (typeof control.type === 'undefined' || control.type !== 'button') {
        control.addEventListener('change', function () {
            submitOnChange()
        });
    } else {
        control.addEventListener('click', function () {
            submitOnChange()
        });
    }
}