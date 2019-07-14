window.onload = function(){
    displayIssues();
    document.querySelector("#issue-form").addEventListener('submit', saveIssue);
};

function deleteIssue(id) {
    const issues = JSON.parse(localStorage.getItem("issues"));
    for (let i = 0; i < issues.length; i++) {
        if (issues[i].id === id) {
            issues.splice(i, 1);
        }
    }
    localStorage.setItem("issues", JSON.stringify(issues));
    // e.preventDefault();
    displayIssues();
}


function changeStatus(id) {
    const issues = JSON.parse(localStorage.getItem("issues"));
    for (let i = 0; i < issues.length; i++) {
        if (issues[i].id === id) {
            issues[i].isOpen = !issues[i].isOpen;
        }
    }
    localStorage.setItem("issues", JSON.stringify(issues));
    // e.preventDefault();
    displayIssues();
}


function saveIssue(e){
    let issueId = chance.guid();
    let issueTitle = document.querySelector("#title").value;
    let issueDesc = document.querySelector("#description").value;
    let issueSeverity = document.querySelector("#priority").value;
    let issueAssignee = document.querySelector("#assignee").value;
    let isOpen = isOpen;

    let issue = {
        id: issueId,
        title: issueTitle,
        desc: issueDesc,
        priority: issueSeverity,
        assignee: issueAssignee,
        isOpen: isOpen
    };

    let issues = JSON.parse(localStorage.getItem("issues")) || [];
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));

    document.querySelector('#issue-form').reset();
    displayIssues();
    // e.preventDefault();
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
        let isOpen = issues[i].isOpen;

        issueList.innerHTML += `
            <div class="card">
                <div class="card-header">
                    ${title}
                </div>
                <div class="card-body">
                    <dl class="row">
        
                        <dt class="col-sm-3">Status: </dt>
                        <dt class="col-sm-9">${isOpen === true ? `Open` : `Closed`}</dt>
        
                        <dt class="col-sm-3">Assignee: </dt>
                        <dt class="col-sm-9">${assignee}</dt>
        
                        <dt class="col-sm-3">Priority: </dt>
                        <dt class="col-sm-9">${priority}</dt>
        
                        <dt class="col-sm-3">Id: </dt>
                        <dt class="col-sm-9">${id}</dt>
        
                        <dt class="col-sm-3">Description: </dt>
                        <dd class="col-sm-9">
                            <p>${desc}</p>
                        </dd>
                        
                    </dl>
                    
                    <div class="button-box">
                        <a onclick="changeStatus('${id}')" class="btn btn-secondary">Change status</a>
                        <a onclick="deleteIssue('${id}')" class="btn btn-danger">Delete</a>                
                    </div>
                </div>
                
                                
            </div>`;
    }
}