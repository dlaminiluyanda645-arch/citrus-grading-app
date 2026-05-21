let editingIndex = -1;

/* ---------- INITIAL LOAD ---------- */

window.onload = function () {
    document.getElementById("date").valueAsDate = new Date();
    generateRecordNumber();
    loadRecords();
    calculate();
};

/* ---------- RECORD NUMBER ---------- */

function generateRecordNumber() {
    const number = "REC-" + Date.now();
    document.getElementById("recordNumber").value = number;
}

/* ---------- CALCULATIONS ---------- */

document.addEventListener("input", calculate);

function calculate() {

    const weighed =
        Number(document.getElementById("weighed").value) || 0;

    const avgWeight =
        Number(document.getElementById("avgWeight").value) || 0;

    const mBins =
        Number(document.getElementById("mBins").value) || 0;

    const lBins =
        Number(document.getElementById("lBins").value) || 0;

    const mTonnage =
        mBins * avgWeight;

    const lTonnage =
        lBins * avgWeight;

    const total =
        mTonnage + lTonnage;

    const juice =
        weighed - total;

    const mPercent =
        weighed > 0
            ? ((mTonnage / weighed) * 100).toFixed(2)
            : 0;

    const lPercent =
        weighed > 0
            ? ((lTonnage / weighed) * 100).toFixed(2)
            : 0;

    const juicePercent =
        weighed > 0
            ? ((juice / weighed) * 100).toFixed(2)
            : 0;

    document.getElementById("displayMBins").value = mBins;
    document.getElementById("displayLBins").value = lBins;

    document.getElementById("mTonnage").value = mTonnage;
    document.getElementById("lTonnage").value = lTonnage;

    document.getElementById("totalTonnage").textContent =
        total.toLocaleString();

    document.getElementById("fruitJuice").textContent =
        juice.toLocaleString();

    document.getElementById("mPercent").textContent =
        mPercent + "%";

    document.getElementById("lPercent").textContent =
        lPercent + "%";

    document.getElementById("juicePercent").textContent =
        juicePercent + "%";
}

/* ---------- CLEAR FORM ---------- */

function clearForm() {

    document
        .querySelectorAll("input")
        .forEach(input => {

            if (
                input.id !== "date" &&
                input.id !== "recordNumber"
            ) {
                input.value = "";
            }

        });

    document.getElementById("date").valueAsDate =
        new Date();

    generateRecordNumber();

    editingIndex = -1;

    calculate();
}

/* ---------- SAVE RECORD ---------- */

function saveRecord() {

    const record = {

        recordNumber:
            document.getElementById("recordNumber").value,

        date:
            document.getElementById("date").value,

        dateCode:
            document.getElementById("dateCode").value,

        shift:
            document.getElementById("shift").value,

        supplier:
            document.getElementById("supplier").value,

        variety:
            document.getElementById("variety").value,

        controlNo:
            document.getElementById("controlNo").value,

        weighed:
            document.getElementById("weighed").value,

        avgWeight:
            document.getElementById("avgWeight").value,

        mBins:
            document.getElementById("mBins").value,

        lBins:
            document.getElementById("lBins").value,

        storageM:
            document.getElementById("storageM").value,

        storageL:
            document.getElementById("storageL").value,

        juiceBin:
            document.getElementById("juiceBin").value,

        recorder:
            document.getElementById("recorder").value,

        supervisor:
            document.getElementById("supervisor").value,

        weighbridge:
            document.getElementById("weighbridge").value,

        mTonnage:
            document.getElementById("mTonnage").value,

        lTonnage:
            document.getElementById("lTonnage").value,

        total:
            document.getElementById("totalTonnage").textContent,

        juice:
            document.getElementById("fruitJuice").textContent
    };

    let records =
        JSON.parse(
            localStorage.getItem("gradingRecords")
        ) || [];

    if (editingIndex >= 0) {
        records[editingIndex] = record;
        editingIndex = -1;
    } else {
        records.push(record);
    }

    localStorage.setItem(
        "gradingRecords",
        JSON.stringify(records)
    );

    loadRecords();

    alert("Record Saved");
}

/* ---------- LOAD RECORDS ---------- */

function loadRecords() {

    const recordsDiv =
        document.getElementById("records");

    let records =
        JSON.parse(
            localStorage.getItem("gradingRecords")
        ) || [];

    recordsDiv.innerHTML = "";

    records.forEach((record, index) => {

        recordsDiv.innerHTML += `

        <div class="record-card">

            <div class="record-header">

                <strong>
                    ${record.recordNumber}
                </strong>

                <div class="record-actions">

                    <button
                    class="edit-btn"
                    onclick="editRecord(${index})">
                    Edit
                    </button>

                    <button
                    class="delete-btn"
                    onclick="deleteRecord(${index})">
                    Delete
                    </button>

                </div>

            </div>

            <div>

                <p>
                Supplier:
                ${record.supplier}
                </p>

                <p>
                Variety:
                ${record.variety}
                </p>

                <p>
                Control:
                ${record.controlNo}
                </p>

                <p>
                Weighed:
                ${record.weighed}
                </p>

                <p>
                Total:
                ${record.total}
                </p>

                <p>
                Juice:
                ${record.juice}
                </p>

            </div>

        </div>

        `;
    });
}

/* ---------- DELETE ---------- */

function deleteRecord(index) {

    if (!confirm("Delete record?"))
        return;

    let records =
        JSON.parse(
            localStorage.getItem("gradingRecords")
        ) || [];

    records.splice(index, 1);

    localStorage.setItem(
        "gradingRecords",
        JSON.stringify(records)
    );

    loadRecords();
}

/* ---------- EDIT ---------- */

function editRecord(index) {

    let records =
        JSON.parse(
            localStorage.getItem("gradingRecords")
        ) || [];

    const r = records[index];

    editingIndex = index;

    document.getElementById("recordNumber").value =
        r.recordNumber;

    document.getElementById("date").value =
        r.date;

    document.getElementById("dateCode").value =
        r.dateCode;

    document.getElementById("shift").value =
        r.shift;

    document.getElementById("supplier").value =
        r.supplier;

    document.getElementById("variety").value =
        r.variety;

    document.getElementById("controlNo").value =
        r.controlNo;

    document.getElementById("weighed").value =
        r.weighed;

    document.getElementById("avgWeight").value =
        r.avgWeight;

    document.getElementById("mBins").value =
        r.mBins;

    document.getElementById("lBins").value =
        r.lBins;

    document.getElementById("storageM").value =
        r.storageM;

    document.getElementById("storageL").value =
        r.storageL;

    document.getElementById("juiceBin").value =
        r.juiceBin;

    document.getElementById("recorder").value =
        r.recorder;

    document.getElementById("supervisor").value =
        r.supervisor;

    document.getElementById("weighbridge").value =
        r.weighbridge;

    calculate();
}

/* ---------- SEARCH ---------- */

function searchRecords() {

    const search =
        document
            .getElementById("searchBox")
            .value
            .toLowerCase();

    document
        .querySelectorAll(".record-card")
        .forEach(card => {

            if (
                card.innerText
                    .toLowerCase()
                    .includes(search)
            ) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });
}

/* ---------- CSV EXPORT ---------- */

function downloadCSV() {

    let records =
        JSON.parse(
            localStorage.getItem("gradingRecords")
        ) || [];

    if (records.length === 0) {
        alert("No records.");
        return;
    }

    let csv =
        Object.keys(records[0]).join(",") +
        "\n";

    records.forEach(record => {

        csv +=
            Object.values(record).join(",") +
            "\n";

    });

    const blob =
        new Blob([csv], {
            type: "text/csv"
        });

    const link =
        document.createElement("a");

    link.href =
        URL.createObjectURL(blob);

    link.download =
        "citrus_grading_records.csv";

    link.click();
}

/* ---------- PDF ---------- */

function generatePDF() {

    const { jsPDF } = window.jspdf;

    const doc =
        new jsPDF();

    doc.setFontSize(16);

    doc.text(
        "CITRUS GRADING FORM",
        20,
        20
    );

    doc.setFontSize(10);

    doc.text(
        "Supplier: " +
        document.getElementById("supplier").value,
        20,
        40
    );

    doc.text(
        "Variety: " +
        document.getElementById("variety").value,
        20,
        50
    );

    doc.text(
        "Control No: " +
        document.getElementById("controlNo").value,
        20,
        60
    );

    doc.text(
        "Weighed: " +
        document.getElementById("weighed").value,
        20,
        70
    );

    doc.text(
        "M Tonnage: " +
        document.getElementById("mTonnage").value,
        20,
        80
    );

    doc.text(
        "L Tonnage: " +
        document.getElementById("lTonnage").value,
        20,
        90
    );

    doc.text(
        "Total Segmented: " +
        document.getElementById("totalTonnage").textContent,
        20,
        100
    );

    doc.text(
        "Fruit To Juice: " +
        document.getElementById("fruitJuice").textContent,
        20,
        110
    );

    doc.save(
        "Citrus_Grading_Form.pdf"
    );
}