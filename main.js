function fetchIssues() {
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = "";

    for (var i=0; i<issues.length; i++) {
        var id = issues[i].id;
        var desc = issues[i].description;
        var assignedTo = issues[i].assignedTo;
        var severity = issues[i].severity;
        var status = issues[i].status

        issuesList.innerHTML += '<div class="card card-body bg-light">'+
        '<h6 class="card-title">Issue ID: ' + id + '</h6>'+
        '<p><span class="badge badge-info" >Status: ' + status + '</span></p>'+
        '<h3>Ticket: ' + desc + '</h3>'+
        '<p><span class="glyphicon glyphicon-time"></span>Priority: ' + severity + '</p>'+
        '<p><span class="glyphicon glyphicon-user"></span>Assigned to: ' + assignedTo + '</p>'+
            '<div class="btn-group btn-group-sm">' +
                '<a onclick="setStatusClosed(\''+id+'\')" class=" btn-warning custom ">Close</a> '+
                '<a onclick="deleteIssue(\''+id+'\')" class=" btn-danger custom">Delete</a>'+
            '</div>' +
        '</div>';

    }
}

function setStatusClosed(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));

    for(var i=0; i<issues.length; i++) {
        if (issues[i].id == id) {
            issues[i].status = 'Closed';
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

function deleteIssue(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    for(var i=0; i<issues.length; i++) {
        if (issues[i].id == id) {
            issues.splice(i, 1);
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}


document.getElementById('issueInputForm').addEventListener('submit', addIssue);


function addIssue(e) {
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var issueID = chance.guid();
    var issueStatus = 'Open';


    var issue = {
        id: issueID,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus,
    }

    if(issueDesc !== "" && issueAssignedTo !== "") {
        if(localStorage.getItem('issues') == null) {
            var issues = [];
            issues.push(issue);
            localStorage.setItem('issues', JSON.stringify(issues));
        } else {
            var issues = JSON.parse(localStorage.getItem('issues'));
            issues.push(issue);
            localStorage.setItem('issues', JSON.stringify(issues));
        }
    
        document.getElementById('issueInputForm').reset();
    
        fetchIssues();
        //prevents the form from submitting when nothing is in it
        e.preventDefault();
    }    
}




window.addEventListener('load', () => {
    fetchIssues();
});

