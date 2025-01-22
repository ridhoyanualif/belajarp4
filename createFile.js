const fs = require("fs");
const readline = require("readline");

// Path folder di mana file akan dibuat
const folderPath = "docs";

// Buat interface readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Pastikan folder "docs" ada
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath); // Buat folder jika belum ada
}

// Fungsi untuk membuat file baru
const createFile = (fileName, content) => {
    const filePath = `${folderPath}/${fileName}`;
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error("Gagal membuat file:", err);
        } else {
            console.log(`File "${fileName}" berhasil dibuat di folder "${folderPath}"!`);
        }
        rl.close(); // Tutup readline
    });
};

// Baca nama file dari pengguna
rl.question("Masukkan nama file (contoh: fileBaru.txt): ", (fileName) => {
    if (!fileName.endsWith(".txt")) {
        console.log("Nama file harus diakhiri dengan .txt");
        rl.close();
        return;
    }

    // Baca konten file dari pengguna
    rl.question("Masukkan konten untuk file: ", (content) => {
        createFile(fileName, content);
    });
});
