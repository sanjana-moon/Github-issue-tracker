const loadAllIssues = () => {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
        .then((res) => res.json())
        .then(data => displayAllIssues(data.data))
}

// {
// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"
// }

const createElements = (arr) => {
    const badge = arr.map((el, i) => `<span class="badge badge-soft ${["badge-secondary", "badge-warning"][i]}">${["./assets/BugDroid.png", "./assets/Lifebuoy.png"][i] ? `<img src="${["./assets/BugDroid.png", "./assets/Lifebuoy.png"][i]}">` : ""}${el}
    </span>`)
    return badge.join(" ");
};


const displayAllIssues = (allIssues) => {
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = ""

    allIssues.forEach(issue => {
        const card = document.createElement("div");
        card.innerHTML = `
         <div class="card p-4 shadow-lg/20 space-y-3 h-[350px] pt-8c
            ${issue.status === "open" ? "border-t-4 border-t-green-500" : "border-t-4 border-t-violet-600" }">
            <div class="flex justify-between mb-4">
                <div>
                    ${issue.status === "open" ? `<i class="fa-regular fa-circle-dot text-green-500"></i>` :
                    `<i class="fa-regular fa-circle-check text-violet-600"></i>`
                    }
                </div>
                <div class="badge badge-soft ${issue.priority === " high" ? "badge-secondary" :
                    issue.priority==="medium" ? "badge-warning" : "badge-primary" }">${issue.priority}</div>
            </div>
            <div class="card-body p-0">
                <h2 class="card-title">${issue.title}</h2>
                <p class=" text-justify">${issue.description.length > 70 ? issue.description.substring(0, 70) + "..." :
                    issue.description}</p>
                <div class="flex justify-between">
                    ${createElements(issue.labels)}
                </div>
                <hr class="text-gray-300 my-4">
                <div class="flex justify-between items-center text-xs">
                    <div>
                        <p class="text-gray-500">Author: ${issue.author}</p>
                        <p class="text-gray-500">Assignee: ${issue.assignee}</p>
                    </div>
                    <div>
                        <p class="text-gray-500">created at: ${new Date(issue.createdAt).toLocaleDateString()}</p>
                        <p class="text-gray-500">updated at: ${new Date(issue.updatedAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
        `
        cardContainer.appendChild(card)
    });
}
loadAllIssues()