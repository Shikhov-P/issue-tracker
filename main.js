window.onload = function(){
    // el = document.querySelector("#issue-form");
    // el.addEventListener('submit', saveIssue);
    document.querySelector("#issue-form").addEventListener('submit', saveIssue);
    // document.getElementById("issue-form").addEventListener("submit", saveIssue);
};

function deleteIssue(e, id) {
    const issues = JSON.parse(localStorage.getItem("issues"));
    for (let i = 0; i < issues.length; i++) {
        if (issues[i].id === id) {
            issues.splice(i, 1);
        }
    }
    localStorage.setItem("issues", JSON.stringify(issues));
    e.preventDefault();
    displayIssues();
}


function setStatusClosed(e, id) {
    const issues = JSON.parse(localStorage.getItem("issues"));
    for (let i = 0; i < issues.length; i++) {
        if (issues[i].id === id) {
            issues[i].open = false;
        }
    }
    localStorage.setItem("issues", JSON.stringify(issues));
    e.preventDefault();
    displayIssues();
}


function saveIssue(e){
    // e.preventDefault();

    let issueId = chance.guid();
    // let issueId = "abc123";
    console.log(issueId);
    let issueTitle = document.querySelector("#title").value;
    let issueDesc = document.querySelector("#description").value;
    let issueSeverity = document.querySelector("#priority").value;
    let issueAssignee = document.querySelector("#assignee").value;
    let issueStatus = true;

    let issue = {
        id: issueId,
        title: issueTitle,
        desc: issueDesc,
        priority: issueSeverity,
        assignee: issueAssignee,
        isOpen: issueStatus
    };
    console.log(issue);

    // let issues = [];

    if (localStorage.getItem("issues") === null) {
        let issues = [];
        issues.push(issue);
        localStorage.setItem("issues", JSON.stringify(issues));
    } else {
        let issues = JSON.parse(localStorage.getItem("issues"));
        issues.push(issue);
        localStorage.setItem("issues", JSON.stringify(issues));
    }

    document.querySelector('#issue-form').reset();
    displayIssues();
    e.preventDefault();
}


function displayIssues(){
    const issues = JSON.parse(localStorage.getItem("issues"));
    if (!issues) {
        return;
    }
    let issueList = document.querySelector("#issue-list");
    issueList.innerHTML = '';

    for (let i = 0; i < issues.length; i++) {
        let id = issues[i].id;
        let title = issues[i].title;
        let desc = issues[i].desc;
        let assignee = issues[i].assignee;
        let priority = issues[i].priority;
        // let isOpen = issues[i].isOpen;
        let status = (issues[i].isOpen === true) ? "Open" : "Closed";

        issueList.innerHTML +=   '<div class="well">'+
            '<h6>ID: ' + id + '</h6>'+
            '<p><span class="label label-info">' + status + '</span></p>'+
            '<h3>' + desc + '</h3>'+
            '<p><span class="glyphicon glyphicon-time"></span> ' + priority + ' '+
            '<span class="glyphicon glyphicon-user"></span> ' + assignee + '</p>'+
            '<a href="#" class="btn btn-warning" onclick="setStatusClosed(e, \''+id+'\')">Close</a> '+
            '<a href="#" class="btn btn-danger" onclick="deleteIssue(e, \''+id+'\')">Delete</a>'+
            '</div>';

        // let itemDiv = document.createElement("div");
        // let h6Id = document.createElement("h6");
        // let pStatus = document.createElement("p");
        // let h3Desc = document.createElement("h3");
        // let pSeverityAndAssignee = document.createElement("p");
        // let aDelete = document.createElement("a");
        // let aClose = document.createElement("a");
        //
        // itemDiv.classList.add("issue-item");
        // pStatus.classList.add("label", "label-info");
        // aDelete.classList.add("btn", "btn-warning");
        // aClose.classList.add("btn", "btn-danger");
        // aDelete.setAttribute("onclick", `deleteIssue(${id})`);
        // aClose.setAttribute("onclick", `setStatusClosed(${id})`);
        //
        // h6Id.appendChild(document.createTextNode(`ID: ${id}`));
        // // pStatus.appendChild(document.createTextNode(`Open: ${status}`));
        // pStatus.appendChild(document.createTextNode(`${isOpen === true ? 'Open' : 'Closed'}`));
        // h3Desc.appendChild(document.createTextNode(desc));
        // pSeverityAndAssignee.appendChild(document.createTextNode(`Priority: ${priority}; Assignee: ${assignee}`));
        // aDelete.appendChild(document.createTextNode("Delete"));
        // aClose.appendChild(document.createTextNode("Close"));
        //
        // itemDiv.appendChild(h6Id);
        // itemDiv.appendChild(pStatus);
        // itemDiv.appendChild(h3Desc);
        // itemDiv.appendChild(pSeverityAndAssignee);
        // itemDiv.appendChild(aDelete);
        // itemDiv.appendChild(aClose);

        // let issueItem = document.createElement("div");
        // issueItem.classList.add("issue-item");
        // let h6 = document.createElement("h6");
        // issueList.innerHTML = `<div class="issue-item"></div><h6>Issue ID: ${id}</h6><p><span class="label label-info">${status}</span></p><h3>${desc}</h3><p><span class="glyphicon glyphicon-time"></span>${priority} <span class="glyphicon glyphicon-user"></span>${assignee}</p><a href="#" class="btn btn-warning" onclick="setStatusClosed(${id})">Close</a><a href="#" class="btn btn-danger" onclick="deleteIssue(${id})">Delete</a>`;
    }
}