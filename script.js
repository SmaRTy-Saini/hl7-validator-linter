
function validateHL7() {
    const raw = document.getElementById('hl7Input').value.trim();
    if (!raw) {
        document.getElementById('report').innerHTML = '<p class="error">Please paste an HL7 message.</p>';
        return;
    }

    const lines = raw.split(/\r?\n/);
    const errors = [];
    const requiredSegments = ['MSH', 'PID'];
    const foundSegments = [];

    for (const line of lines) {
        if (!line.trim()) continue;
        const segment = line.split('|')[0];
        foundSegments.push(segment);
        if (!segment.match(/^[A-Z0-9]{3}$/)) {
            errors.push(`Invalid segment name: ${segment}`);
        }
    }

    for (const required of requiredSegments) {
        if (!foundSegments.includes(required)) {
            errors.push(`Missing required segment: ${required}`);
        }
    }

    let reportHTML = '';
    if (errors.length > 0) {
        reportHTML += '<p class="error"><strong>Validation Errors:</strong></p><ul>';
        errors.forEach(err => {
            reportHTML += `<li class="error">${err}</li>`;
        });
        reportHTML += '</ul>';
    } else {
        reportHTML = '<p class="valid"><strong>No structural errors found.</strong></p>';
    }

    document.getElementById('report').innerHTML = reportHTML;
}
