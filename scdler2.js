function loadjscssfile(filename) {
    if (filename.substr(filename.length - 4) == ".css") { // 'endsWith' is not IE supported.
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("href", filename)
        //fileref.setAttribute("type", "text/css")
    }
    else if (filename.substr(filename.length - 3) == ".js") {
        var fileref = document.createElement('script')
        fileref.setAttribute("src", filename)
        //fileref.setAttribute("type", "text/javascript")
    }
    $("head").append(fileref);
}


loadjscssfile("https://mrvv.net/scdl/scdler.js");
console.log("sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsfsdfsfsdfsd");
