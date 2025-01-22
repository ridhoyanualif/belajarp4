const fs = require("fs");
const readline = require("readline");

// Path ke folder tempat file disimpan
const folderPath = "docs";

// Buat interface readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Fungsi untuk memodifikasi file
const modifyFile = (fileName, newContent) => {
    const filePath = `${folderPath}/${fileName}`;
    fs.writeFile(filePath, newContent, (err) => {
        if (err) {
            console.error("Gagal memodifikasi file:", err);
        } else {
            console.log(`Isi file "${fileName}" berhasil dimodifikasi!`);
        }
        rl.close(); // Tutup readline
    });
};

// Cek apakah folder "docs" ada
if (!fs.existsSync(folderPath)) {
    console.error(`Folder "${folderPath}" tidak ditemukan!`);
    rl.close();
} else {
    // Tampilkan daftar file di folder "docs"
    const files = fs.readdirSync(folderPath).filter((file) => file.endsWith(".txt"));

    if (files.length === 0) {
        console.log(`Tidak ada file .txt ditemukan di folder "${folderPath}".`);
        rl.close();
    } else {
        console.log("File yang tersedia untuk dimodifikasi:");
        files.forEach((file, index) => {
            console.log(`${index + 1}. ${file}`);
        });

        // Pilih file yang ingin dimodifikasi
        rl.question("Masukkan nomor file yang ingin dimodifikasi: ", (fileIndex) => {
            const index = parseInt(fileIndex) - 1;

            if (isNaN(index) || index < 0 || index >= files.length) {
                console.log("Pilihan tidak valid!");
                rl.close();
            } else {
                const fileName = files[index];
                rl.question(`Masukkan konten baru untuk file "${fileName}": `, (newContent) => {
                    modifyFile(fileName, newContent);
                });
            }
        });
    }
}
