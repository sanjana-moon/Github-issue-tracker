let allIssuesCard = [];
const cardContainer = document.getElementById('card-container')
const loadSpinner = document.getElementById("load-spinner")
const buttons = document.querySelectorAll('.btn-container')

async function loadAllIssues() {
    showSpinner()
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    const data = await res.json()
    allIssuesCard = data.data;
    displayAllIssues(allIssuesCard)
    hideSpinner()
}
const showSpinner = () => {
    loadSpinner.classList.remove("hidden")
}
const hideSpinner = () => {
    loadSpinner.classList.add("hidden")
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
            ${issue.status === "open" ? "border-t-4 border-t-green-500" : "border-t-4 border-t-violet-600"}">
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
selectCategory(buttons)



loadAllIssues()