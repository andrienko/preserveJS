(function(preserveJS) {

    preserveJS.attributeName = 'preserve';
    preserveJS.variableName = 'preserveJS';

    preserveJS.init = function () {

        if(window.localStorage[this.variableName] != undefined)
            this.preservedValues = JSON.parse(window.localStorage[this.variableName]);
        else this.preservedValues = {};

        var preservedElements = document.querySelectorAll('['+this.attributeName+']');
        preservedElements = [].slice.call(preservedElements); // NodeList to Array

        for(elementIndex in preservedElements){
            this.initElement(preservedElements[elementIndex]);
        }
    };

    preserveJS.getElementResponsibleField = function(element){
        if(element.tagName == 'textarea')return 'innerHTML';
        else if(element.tagName == 'option')return 'selected';
        else if(['checkbox','radio'].indexOf(element.type)!=-1)return 'checked';
        else return 'value';
    };

    preserveJS.initElement = function(element){
        var preserveOption = element.getAttribute(this.attributeName);
        var elementID = element.id!=''?element.id:element.name;

        if(preserveOption=='preserve' || preserveOption=='')
            preserveOption = document.location.href.replace(/#.*/,'').replace(/.*:\/\//,'')+'#'+elementID;

        if(typeof this.preservedValues[preserveOption] != 'undefined'){
            element[this.getElementResponsibleField(element)]=this.preservedValues[preserveOption];
        }

        var saver = function(){preserveJS.saveChanges(element,preserveOption)};
        element.addEventListener('keyup',saver);
        element.addEventListener('change',saver);

    };

    preserveJS.saveChanges = function(element,preserveOption){

        var value = element[this.getElementResponsibleField(element)];

        if(value === false || value === '')delete this.preservedValues[preserveOption];
        else this.preservedValues[preserveOption]=value;

        window.localStorage[this.variableName] = JSON.stringify(this.preservedValues);
    };

    document.addEventListener('DOMContentLoaded', function () {
        preserveJS.init();
    });
})({});