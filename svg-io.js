/*
 * svgcanvas.js
 *
 * Licensed under the MIT License
 *
 * Copyright(c) 2010 Alexis Deveria
 * Copyright(c) 2010 Pavol Rusnak
 * Copyright(c) 2010 Jeff Schiller
 * Copyright(c) 2013 Mark Kreitler
 *
 */

/**
 * Send the svg data to the database for storage.
 */
SvgIO = function() {
  this.loadFromDatabase = function(filename, onLoadedCallback, onFailedCallback, observer) {
    var xhr = new XMLHttpRequest();
    var url = "http://freegamersjournal.com/svg-edit-2.6/php/loadSVG.php";
    var title = null;
    var matches = null;

    xhr.open("POST", url, true);

    // Send the proper header information along with the request
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 && onLoadedCallback) {
          onLoadedCallback.call(observer, xhr.responseText);
        }
        else if (onFailedCallback) {
          onFailedCallback(observer, filename);
        }
      }
    }

    xhr.send("name=" + filename);  
  };

  this.saveToDatabase = function(title, data) {
    var xhr = new XMLHttpRequest();
    var url = "http://freegamersjournal.com/svg-edit-2.6/php/saveSVG.php";
    var matches = null;

    xhr.open("POST", url, true);

    // Send the proper header information along with the request
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // Look for a title.
    if (!title) {
      matches = /<Title>(.)+<\/Title>/i.exec(data);
      if (matches) {
        title = /\>(.)+\</.exec(matches[0]);
        title = title && title.length ? title[0].substring(1, title[0].indexOf('<')) : null;
      }
    }

    if (!title) {
      title = "SVG_" + parseInt("" + (new Date).getTime() + Math.floor(Math.random() * 1000000), 16);
    }

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          alert(xhr.responseText);
        }
        else if (xhr.responseText) {
          alert("Save failed: " + xhr.responseText);
        }
      }
    }

    xhr.send("name=" + title + "&svg=" + data);  
  }
};

svgIO = new SvgIO();

