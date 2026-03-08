let allIssuesCard = [];
const cardContainer = document.getElementById('card-container')
const loadSpinner = document.getElementById("load-spinner")
const buttons = document.querySelectorAll('.btn-container')
const cardsCount = document.getElementById('cards-count')
const issueDetailsModal = document.getElementById('issue_details_modal')
const modalContainer = document.getElementById('modal-container')
const btnSearch = document.getElementById('btn-search')

const showSpinner = () => {
    loadSpinner.classList.remove("hidden")
}
const hideSpinner = () => {
    loadSpinner.classList.add("hidden")
}

async function loadAllIssues() {
    showSpinner()
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    const data = await res.json()
    allIssuesCard = data.data;
    displayAllIssues(allIssuesCard)
    hideSpinner()
}

const createElements = (arr) => {
    const badge = arr.map((el, i) => `<span class="badge badge-soft ${["badge-secondary", "badge-warning"][i]}">${["./assets/BugDroid.png", "./assets/Lifebuoy.png"][i] ? `<img src="${["./assets/BugDroid.png", "./assets/Lifebuoy.png"][i]}">` : ""}${el}
    </span>`)
    return badge.join(" ");
};

const displayAllIssues = (allIssues) => {
    cardContainer.innerHTML = ""

    allIssues.forEach(issue => {
        const card = document.createElement("div");
        card.innerHTML = `
         <div class="card p-4 shadow-lg/20 space-y-3 h-[350px] pt-8
            ${issue.status === "open" ? "border-t-4 border-t-green-500" : "border-t-4 border-t-violet-600"}" onclick="openIssueModal(${issue.id})">
            <div class="flex justify-between mb-4">
                <div>
                    ${issue.status === "open" ? `<i class="fa-regular fa-circle-dot text-green-500"></i>` :
                `<i class="fa-regular fa-circle-check text-violet-600"></i>`
            }
                </div>
                <div class="badge badge-soft ${issue.priority === "high" ? "badge-secondary" :
                issue.priority === "medium" ? "badge-warning" : "badge-primary"}">${issue.priority}</div>
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
    cardsCount.innerText = allIssues.length
}

async function selectCategory(buttons) {
    const allBtn = document.getElementById('all-btn')
    allBtn.classList.add("btn-primary")
    allBtn.classList.remove("btn-outline")
    buttons.forEach(button => {
        button.onclick = () => {
            buttons.forEach(btn => {
                btn.classList.remove("btn-primary")
                btn.classList.add("btn-outline")
            });
            button.classList.add("btn-primary")
            button.classList.remove("btn-outline")
            showSpinner()
            const filteredValue = button.innerText.toLowerCase()
            if (filteredValue === "all") {
                displayAllIssues(allIssuesCard)
            }
            else {
                const filteredCard = allIssuesCard.filter(issue => issue.status === filteredValue)
                displayAllIssues(filteredCard)
            }
            hideSpinner()
        }
    });
}

async function openIssueModal(issueId) {

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`)
    const data = await res.json()
    const issueDetails = data.data

    modalContainer.innerHTML = `
         <div class="card p-4 shadow-lg/20 h-full pt-8
        ${issueDetails.status === "open" ? "border-t-4 border-t-green-500" : "border-t-4 border-t-violet-600"}">
            <div class="space-y-4">
                <div class="card-body p-0">
                    <h2 class="card-title mb-3">${issueDetails.title}</h2>
                    <div class="flex justify-start gap-4">
                        <div class="badge badge-soft mb-4 ${issueDetails.status === "open" ? "badge-success"
            : "badge-primary"}">${issueDetails.priority}</div>
                        <p class="text-gray-500">Opened by: ${issueDetails.author}</p>
                        <p class="text-gray-500">created at: ${new Date(issueDetails.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <div class="flex justify-between mb-3">
                        ${createElements(issueDetails.labels)}
                    </div>
                    <p class=" text-justify">${issueDetails.description}</p>
                    <div class="flex justify-between items-center text-xs">
                        <div class="flex justify-between items-center bg-gray-100 w-full py-4 px-6">
                            <div class="space-y-2">
                                <p class="text-gray-500">Assignee: </p>
                                <h2 class="font-semibold">${issueDetails.assignee}</h2>
                            </div>
                            <div class="space-y-2">
                                <p class="text-gray-500">Priority:</p>
                                <div class="badge badge-soft ${issueDetails.priority === "high" ? "badge-secondary" :
            issueDetails.priority === "medium" ? "badge-warning" : "badge-primary"}">
                                    ${issueDetails.priority}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <form method="dialog" class="mt-3 text-right">
                <button class="btn btn-outline btn-primary">Close</button>
            </form>
        </div>
    `
    issueDetailsModal.showModal();
}

btnSearch.addEventListener("click", () => {
    showSpinner()
    const input = document.getElementById("input-search")
    const searchValue = input.value.trim().toLowerCase();

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
        .then(res => res.json())
        .then((data) => {
            const allIssues = data.data;
            displayAllIssues(allIssues)
            buttons.forEach(btn => {
                btn.classList.remove("btn-primary")
                btn.classList.add("btn-outline")
            });
            hideSpinner()
        });
})

selectCategory(buttons)
loadAllIssues()