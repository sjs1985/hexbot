//It searches for all elements with the specified tagName, then filter those elements that have the specified attribName valued as attribValue.
//Next it gets one element from specified position on the elements array and returns it 
function getDOMElement(tagName, attribName, attribValue, position) {
    if (tagName != null) {
        element = document.getElementsByTagName(tagName);
    } else {
        element = document.getElementsByTagName("*");
    }
    resultElements = [];
    var count;
    if (attribName != null) {
        for (count = 0; count <= element.length - 1; count++) {
            if (element[count].getAttribute(attribName) == attribValue) {
                resultElements.push(element[count]);
            }
        }
    } else {
        resultElements = element;
    };
    if (resultElements.length > 0) {
        try {
            resultElements[position].style.fontSize = "15px";
            resultElements[position].style.color = "red";
        } catch (error) {
            console.log(error.message);
        }
        return resultElements[position];
    } else {
        return null;
    }
}