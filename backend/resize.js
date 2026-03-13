import sharp from "sharp";
import fs from "fs";
import path from "path";

const basePath = "./public/images";
const tempFolder = "./public/temp";

// Create temp folder if not exists
if (!fs.existsSync(tempFolder)) {
  fs.mkdirSync(tempFolder);
}

async function resizeAll() {
  const categories = ["vegetables", "fruits", "dairy", "nuts"];

  for (const category of categories) {
    const folder = path.join(basePath, category);

    const files = fs.readdirSync(folder);

    for (const file of files) {
      const inputPath = path.join(folder, file);
      const outputPath = path.join(tempFolder, `${category}_${file}`);

      await sharp(inputPath)
        .resize(600, 600, { fit: "cover" })
        .toFile(outputPath);

      console.log("Resized:", outputPath);
    }
  }

  console.log("✔ All resized images saved in /public/temp");
}

resizeAll();
