(function() {
  var el, insertStatus, privateRepo, project, shaRequest;

  insertStatus = function(el, status) {
    var color, link;
    switch (status.state) {
      case 'success':
        color = '#6cc644';
        break;
      case 'failure':
        color = '#bd2c00';
        break;
      case 'pending':
        color = '#ff9933';
        break;
      default:
        return;
    }
    document.styleSheets[0].insertRule("#github-status-extension{margin: 7px; display: inline-block; width: 9px; height: 9px; border-radius: 50%; background-color: " + color + "}", 1);
    link = window.document.createElement('a');
    link.href = status.target_url || '#';
    link.title = status.description || status.state;
    link.id = 'github-status-extension';
    return el.appendChild(link);
  };

  /*
  We first check whether the required elements exist on the webpage. If they
  do not, it means that either the user is looking at something other than
  a project page, or that github changed their layout and we need to adapt
  this code. Either way, this ensures that no errors are generated by this
  extension due to missing DOM elements.
  */


  el = window.document.querySelector('.title-actions-bar h1 strong');

  privateRepo = window.document.querySelector('.entry-title.private');

  if (el && !privateRepo) {
    project = window.location.pathname.split('/').splice(1, 3);
    shaRequest = new XMLHttpRequest;
    shaRequest.open('GET', "https://api.github.com/repos/" + project[0] + "/" + project[1] + "/commits", true);
    shaRequest.onreadystatechange = function() {
      var sha, statusRequest, _ref;
      if (shaRequest.readyState === 4) {
        sha = (_ref = JSON.parse(shaRequest.responseText)[0]) != null ? _ref.sha : void 0;
        if (!sha) {
          return;
        }
        statusRequest = new XMLHttpRequest;
        statusRequest.open('GET', "https://api.github.com/repos/" + project[0] + "/" + project[1] + "/statuses/" + sha, true);
        statusRequest.onreadystatechange = function() {
          var status;
          if (statusRequest.readyState === 4) {
            debugger;
            status = JSON.parse(statusRequest.responseText)[0];
            if (status != null) {
              return insertStatus(el, status);
            }
          }
        };
        return statusRequest.send(null);
      }
    };
    shaRequest.send(null);
  }

}).call(this);
