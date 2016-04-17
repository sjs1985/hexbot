//It gets the id of any software
function getSoftwareId(name, version) {
    var elements = document.getElementsByTagName("tbody")[0].getElementsByTagName("*");
    var count, textNodeValue;
    var itemIsFound = false;
    var foundId = null;

    for (count = 0; count <= elements.length - 1; count++) {
        if (elements[count].childNodes[0] != undefined) {
            if (elements[count].childNodes[0].nodeValue != null) {
                if (elements[count].childNodes[0].nodeValue.search(name.trim()) >= 0) {
                    switch (elements[count].tagName) {
                        case "A":
                            itemIsFound = true;
                            break;
                        case "TD":
                            try {
                                switch (elements[count].nextElementSibling.childNodes[1].childNodes[0].tagName) {
                                    case undefined:
                                        if (elements[count].nextElementSibling.childNodes[1].childNodes[0].nodeValue.search(version.trim()) >= 0) {
                                            itemIsFound = true;
                                        }
                                        break;
                                    case "B":
                                        if (elements[count].nextElementSibling.childNodes[1].childNodes[0].childNodes[0].nodeValue.search(version.trim()) >= 0) {
                                            itemIsFound = true;
                                        }
                                        break;
                                    case "I":
                                        if (elements[count].nextElementSibling.childNodes[1].childNodes[0].childNodes[0].nodeValue.search(version.trim()) >= 0) {
                                            itemIsFound = true;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            } catch (error) { console.log(error.message) }
                            break;
                        case "B":
                            try {
                                switch (elements[count].parentElement.nextElementSibling.childNodes[1].childNodes[0].tagName) {
                                    case undefined:
                                        if (elements[count].parentElement.nextElementSibling.childNodes[1].childNodes[0].nodeValue.search(version.trim()) >= 0) {
                                            itemIsFound = true;
                                        }
                                        break;
                                    case "B":
                                        if (elements[count].parentElement.nextElementSibling.childNodes[1].childNodes[0].childNodes[0].nodeValue.search(version.trim()) >= 0) {
                                            itemIsFound = true;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            } catch (error) { console.log(error.message) }
                            break;
                        case "I":
                            try {
                                switch (elements[count].parentElement.nextElementSibling.childNodes[1].childNodes[0].tagName) {
                                    case undefined:
                                        if (elements[count].parentElement.nextElementSibling.childNodes[1].childNodes[0].nodeValue.search(version.trim()) >= 0) {
                                            itemIsFound = true;
                                        }
                                        break;
                                    case "B":
                                        if (elements[count].parentElement.nextElementSibling.childNodes[1].childNodes[0].childNodes[0].nodeValue.search(version.trim()) >= 0) {
                                            itemIsFound = true;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            } catch (error) { console.log(error.message) }
                            break;
                        default:
                            break;
                    }
                };
            }
        }
        if (itemIsFound == true) {
            foundId = elements[count].parentElement.tagName;
            switch (elements[count].tagName) {
                case "B":
                    foundId = elements[count].parentElement.parentElement.getAttribute("id");
                    break;
                case "TD":
                    foundId = elements[count].parentElement.getAttribute("id");
                    break;
                case "I":
                    foundId = elements[count].parentElement.parentElement.getAttribute("id");
                    break;
                case "A":
                    foundId = elements[count].parentElement.parentElement.getAttribute("id");
                default:
                    break;
            }
            break;
        }
    }
    return foundId;
}