const allEmployees = document.querySelector(".all-employees");
const taskForce = document.querySelector(".task-force");
const employeeCards = document.querySelectorAll(".employee");
const { top, left } = allEmployees.getBoundingClientRect();

const createPanel = (x, y, name) => {
  const createPanelElement = document.createElement("div");
  createPanelElement.setAttribute("class", "info-panel");
  createPanelElement.innerText = name;
  createPanelElement.style.left = `${x}px`;
  createPanelElement.style.top = `${y}px`;
  return createPanelElement;
};

const removePanel = () => {
  if (!!document.querySelector(".info-panel")) {
    document.querySelector(".info-panel").remove();
  } else return;
};
allEmployees.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  removePanel();
  if (e.target.getAttribute("class") === "employee") {
    const name = e.target.getAttribute("data-name");
    const infoPanel = createPanel(e.clientX - left, e.clientY - top, name);
    allEmployees.append(infoPanel);
  }
});
allEmployees.addEventListener("click", removePanel);

// Drag
employeeCards.forEach((ele) => {
  ele.addEventListener("dragstart", function (e) {
    removePanel();
    const getId = e.target.getAttribute("data-id");
    e.dataTransfer.setData("text/plain", getId);
  });
});

taskForce.addEventListener("dragenter", function (e) {
  e.preventDefault();
  e.currentTarget.classList.add("highlight-drop");
});

taskForce.addEventListener("dragleave", function (e) {
  e.preventDefault();
  e.currentTarget.classList.remove("highlight-drop");
});

taskForce.addEventListener("drop", function (e) {
  e.preventDefault();
  const empId = e.dataTransfer.getData("text/plain");
  e.currentTarget.append(document.querySelector(`div[data-id="${empId}"]`));
  e.currentTarget.classList.remove("highlight-drop");
});

taskForce.addEventListener("dragover", function (e) {
  e.preventDefault();
});
