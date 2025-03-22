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