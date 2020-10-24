const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const tableBody = document.getElementById('tableBody');

const rearrangeDataRandomly = () => {
  const data = [...TABLE_DATA];
  data.sort(randomSort);
  populateTableRows(data);
};

const randomSort = () => {
  return Math.ceil(Math.random() * 10) - Math.floor(Math.random() * 10);
};

const onStartButtonClicked = () => {
  startButton.setAttribute('disabled', true);
  stopButton.removeAttribute('disabled');
  functionId = setInterval(rearrangeDataRandomly, 1000);
};

const onStopButtonClicked = () => {
  if (functionId) {
    startButton.removeAttribute('disabled');
    stopButton.setAttribute('disabled', true);
    clearInterval(functionId);
  }
};

const createTableRow = (item) => {
  const tr = document.createElement('tr');
  Object.keys(item).forEach((key) => {
    const td = document.createElement('td');
    if (key === 'thumbnailUrl') {
      td.innerHTML = `<img src="${item.thumbnailUrl}" />`;
    } else {
      td.innerHTML = item[key];
    }
    tr.append(td);
  })

  return tr;
}

const populateTableRows = (data) => {
  if (tableBody.innerHTML) {
    tableBody.innerHTML = '';
  }

  data.forEach((item) => {
    const tableRow = createTableRow(item);
    tableBody.append(tableRow);
  });
};

const onDocumentReady = () => {
  populateTableRows([...TABLE_DATA]);
  startButton.addEventListener('click', onStartButtonClicked);
  stopButton.addEventListener('click', onStopButtonClicked);
};

if (document.readyState !== 'loading') {
  onDocumentReady();
} else {
  document.addEventListener('DOMContentLoaded', onDocumentReady);
}
