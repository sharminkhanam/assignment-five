let issues =[];
let currentTab = "all";

//fetch api

async function loadIssues() {
    const res = await fetch ("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const result = await res.json()
    issues =result.data
    renderIssues()
    
}
loadIssues()

// formate date
function formateDate (date){
    const d = new Date(date);
    return d.toLocaleDateString()
}



      function renderIssues () {
        // loading 
        const loader = document.getElementById("loader"); //optationl
      
        ///
        const grid = document.getElementById("issuesGrid")
        const search = document.getElementById("searchInput").value.toLowerCase();
        //
          loader.classList.remove("hidden"); //optationl
          //
          setTimeout(() => {  //op
                grid.innerHTML = "";
        let visibleCount = 0;
        issues.forEach(issue => {
            const matchTab = currentTab === "all" || issue.status === currentTab
            const matchSearch = issue.title.toLowerCase().includes(search)
            if(matchTab && matchSearch) {
                visibleCount++
                const borderColor = issue.status === "open" ? "border-green-500" : "border-purple-500"
                const priorityColor = {
                    high : "bg-red-100 text-red-600",
                    medium : "bg-yellow-100 text-yellow-500",
                    low : "bg-gray-200 text-gray-600"
                } [issue.priority]
                const labels = issue.labels.map(l => `
                    <span class="text-xs bg-orange-100 text-orange-500 border px-2 py-1 rounded-2xl">${l}</span>`).join(" ")
                    grid.innerHTML+= `
                        <div onclick="openIssue (${issue.id})" class="bg-white p-4 rounded-3xl shadow 
                        border-t-4 cursor-pointer hover:shadow-lg transition ${borderColor}">
                        <div class="flex justify-between ">
                        <span class="text-xs ${priorityColor} px-2 py-1 rounded-full">
                           ${issue.priority.toUpperCase()}</span>
                        </div>
                         <h3 class="font-semibold mt-2">${issue.title}</h3>
                     <p class="text-sm text-gray-500 mt-2">${issue.description.substring(0,80)}</p>
                     <div class="flex flex-wrap gap-2 mt-3 ">${labels}</div>
                     <p class="text-sm text-gray-400 mt-3">#${issue.id} by ${issue.author} <br>• ${formateDate(issue.createdAt)}</p>
                        </div>`
            };
        });

          document.getElementById("issueCount").innerText = visibleCount+ " Issues ";
        //
        loader.classList.add("hidden");
         }, 800) //
        
      
        //
      }

          const tabs = document.querySelectorAll(".tab")
    tabs.forEach(tab => {
        tab.addEventListener('click', () =>{
            tabs.forEach(t => {
                t.classList.remove("bg-indigo-600", "text-white");
                t.classList.add("bg-white")
            })
            tab.classList.remove("bg-white")
            tab.classList.add("bg-indigo-600", "text-white");
            currentTab = tab.dataset.tab
            renderIssues()
        })
    })
    document.getElementById("searchInput").addEventListener("keyup", renderIssues)



     /* -------------------
      TAB FILTER
      ------------------- */

 
      async function openIssue(id) {
        const modal = document.getElementById("issueModal")
        modal.classList.remove("hidden")
        modal.classList.add("flex")
        const res = await fetch (`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
          const result = await res.json()
        issues =result.data
        document.getElementById("modalTitle").innerText = issues.title
         document.getElementById("modalDesc").innerText = issues.description
          document.getElementById("modalAuthor").innerText = issues.author
        document.getElementById("modalDate").innerText = new Date (issues.createdAt).toLocaleDateString()
        document.getElementById("modalAssignee").innerText = issues.assignee || "Unassigned"
        const priority =document.getElementById("modalPriority")
        priority.innerText = issues.priority.toUpperCase()
        priority.className ="px-2 py-1 text-xs rounded-full"
        if(issues.priority === "high") priority.classList.add("bg-red-100" ,"text-red-600")
        if(issues.priority === "medium") priority.classList.add("bg-yellow-100" ,"text-yellow-600")
        if(issues.priority === "low") priority.classList.add("bg-gray-100" ,"text-gray-600")
        const labelsHTML = issues.labels.map(l => `
                    <span class="text-xs bg-orange-100 text-orange-500 border px-2 py-1 rounded-2xl">${l}</span>`).join(" ")
        document.getElementById("modalLabels").innerHTML = labelsHTML
      }
      function  closeModal(params) {
            document.getElementById("issueModal").classList.add("hidden")
      }
     