document.getElementById('generateButton').addEventListener('click', () => {
  const fileInput = document.getElementById('fileInput');
  const output = document.getElementById('output');

  if (fileInput.files.length === 0) {
    alert('Please select a settings file');
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
    const content = event.target.result;
    try {
      const data = JSON.parse(content);
      const settings = JSON.parse(data.settings);
      const parsedSettings = JSON.parse(settings.settings);
      const extensions = JSON.parse(data.extensions);

      let htmlContent = `<h2>Settings (Edited: ${Object.keys(parsedSettings).length})</h2>`;
      htmlContent += '<table><thead><tr><th>Key</th><th>Value</th></tr></thead><tbody>';

      for (let [key, value] of Object.entries(parsedSettings)) {
        htmlContent += `<tr><td>${key}</td><td>${JSON.stringify(value)}</td></tr>`;
      }
      
      htmlContent += '</tbody></table>';

      htmlContent += `<h2>Installed Extensions (Installer: ${extensions.length})</h2>`;
      htmlContent += '<table><thead><tr><th>Extension ID</th><th>Display Name</th></tr></thead><tbody>';

      extensions.forEach(ext => {
        htmlContent += `<tr><td>${ext.identifier.id}</td><td>${ext.displayName}</td></tr>`;
      });

      htmlContent += '</tbody></table>';

      output.innerHTML = htmlContent;
    } catch (error) {
      alert('Error parsing JSON: ' + error.message);
    }
  };

  reader.readAsText(file);
});