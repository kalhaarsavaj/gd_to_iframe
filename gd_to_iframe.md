```markdown
# Google Drive Link to Iframe Converter - Chrome Extension

This document outlines the files and structure of a Chrome extension designed to convert Google Drive links into iframe embed codes.

## File Structure

```
google-drive-iframe-converter/
├── manifest.json
├── popup.html
└── popup.js
```

## File Contents

### `manifest.json`

```json
{
  "manifest_version": 3,
  "name": "Google Drive Iframe Converter",
  "version": "1.0",
  "description": "Converts Google Drive links to iframe embed codes.",
  "action": {
    "default_popup": "popup.html"
  },
  "permissions": [
    "activeTab",
    "clipboardWrite"
  ]
}
```

* `manifest_version`: Specifies the manifest version (3 for modern Chrome extensions).
* `name`: The name of the extension.
* `version`: The version of the extension.
* `description`: A brief description of the extension.
* `action.default_popup`: Specifies the HTML file to display when the extension icon is clicked.
* `permissions`: Declares the permissions the extension needs, including access to the active tab and the clipboard.

### `popup.html`

```html
<!DOCTYPE html>
<html>
<head>
    <title>Google Drive Iframe Converter</title>
    <style>
        body {
            font-family: sans-serif;
            width: 300px;
            padding: 10px;
        }

        input[type="text"] {
            width: 100%;
            padding: 5px;
            margin-bottom: 10px;
        }

        button {
            padding: 8px 15px;
            background-color: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
        }

        textarea {
            width: 100%;
            height: 100px;
            margin-top: 10px;
            box-sizing: border-box;
        }
    </style>
</head>
<body>
    <h1>Drive to Iframe</h1>
    <input type="text" id="driveLink" placeholder="Enter Google Drive Link">
    <button id="convertButton">Convert & Copy</button>
    <textarea id="iframeCode" readonly style="display: none;"></textarea>

    <script src="popup.js"></script>
</body>
</html>
```

* A simple HTML form with an input field for the Google Drive link, a "Convert & Copy" button, and a textarea to display the generated iframe code.
* Basic inline CSS styling for the popup window.
* Links to the `popup.js` script.

### `popup.js`

```javascript
document.getElementById("convertButton").addEventListener("click", convertLink);

function convertLink() {
    const driveLink = document.getElementById("driveLink").value;
    let iframeCode = "";
    let previewUrl = "";

    if (driveLink.includes("/file/d/")) {
        const match = driveLink.match(/file\/d\/([a-zA-Z0-9_-]+)/);
        if (match && match[1]) {
            const fileId = match[1];
            previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;
            iframeCode = `<iframe src="${previewUrl}" width="600" height="400" frameborder="0" allowfullscreen></iframe>`;
        }
    } else if (driveLink.includes("/folders/")) {
        const match = driveLink.match(/folders\/([a-zA-Z0-9_-]+)/);
        if (match && match[1]) {
            const folderId = match[1];
            previewUrl = `https://drive.google.com/embeddedfolderview?id=${folderId}&usp=sharing`;
            iframeCode = `<iframe src="${previewUrl}" width="600" height="400" frameborder="0" allowfullscreen></iframe>`;
        }
    }

    if (iframeCode) {
        document.getElementById("iframeCode").value = iframeCode;
        document.getElementById("iframeCode").style.display = "block";
        navigator.clipboard.writeText(iframeCode).then(() => {
          alert('Iframe code copied to clipboard!');
        }).catch(err => {
          console.error('Could not copy text: ', err);
          alert('Could not copy. Iframe code is in the text area.');
        });
    } else {
        alert("Invalid Google Drive Link.");
        document.getElementById("iframeCode").style.display = "none";
    }
}
```

* JavaScript logic to handle the link conversion when the button is clicked.
* Uses regular expressions to extract the file or folder ID from the input link.
* Constructs the iframe code and copies it to the clipboard using `navigator.clipboard.writeText()`.
* Displays an alert to indicate success or failure.
* Displays the iframe code in the text area.
