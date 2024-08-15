const saveUpload = document.querySelector(".save-upload");
const all = {
    string: () => {
        return localStorage.getItem("jStorage");
    },
    object: () => {
        return JSON.parse(localStorage.getItem("jStorage"));
    },
    pure: () => {
        let e = all.object();
        delete e.__jstorage_meta;
        return e;
    },
};

const exportSaveData = () => {
    let e = JSON.stringify(all.pure());
    return e;
};

const exportSave = () => {
    let e = exportSaveData();
    let blob = new Blob([e], { type: "text/uhs" });
    let a = document.createElement("a");
    a.download = "Unhinged Hangman 檔案.uhs";
    a.href = URL.createObjectURL(blob);
    a.click();
};

const importSave = (importSaveData) => {
    let e = JSON.parse(importSaveData);
    $.jStorage.flush()
    Object.keys(e).forEach((key) => {
        $.jStorage.set(key, e[key]);
        window.location.reload()
    });
};

saveUpload.addEventListener('change', () => {
    let fr = new FileReader()
    fr.readAsText(saveUpload.files[0])
    fr.onload = () => {
        console.log(fr.result)
        importSave(fr.result)
    }
})