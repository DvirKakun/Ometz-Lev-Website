import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';

const SOURCE_IMAGE = './public/favicon.png';

const SIZES = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-192x192.png', size: 192 },
  { name: 'favicon-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
];

async function generateFavicons() {
  try {
    // Get source image metadata
    const metadata = await sharp(SOURCE_IMAGE).metadata();
    console.log(`Source image dimensions: ${metadata.width}x${metadata.height}`);

    // Calculate square size with padding (use the larger dimension + 10% padding)
    const maxDimension = Math.max(metadata.width, metadata.height);
    const squareSize = Math.ceil(maxDimension * 1.1); // Add 10% padding

    // Calculate position to center the image
    const left = Math.floor((squareSize - metadata.width) / 2);
    const top = Math.floor((squareSize - metadata.height) / 2);

    console.log(`Creating square canvas: ${squareSize}x${squareSize}`);
    console.log(`Image positioned at: left=${left}, top=${top}`);

    // Create a square version with white background and padding
    const squareBuffer = await sharp(SOURCE_IMAGE)
      .extend({
        top: top,
        bottom: squareSize - metadata.height - top,
        left: left,
        right: squareSize - metadata.width - left,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .toBuffer();

    // Generate all sizes
    for (const { name, size } of SIZES) {
      await sharp(squareBuffer)
        .resize(size, size, {
          kernel: sharp.kernel.lanczos3,
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .toFile(`./public/${name}`);

      console.log(`✓ Generated ${name} (${size}x${size})`);
    }

    // Generate ICO file (32x32)
    await sharp(squareBuffer)
      .resize(32, 32, {
        kernel: sharp.kernel.lanczos3,
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .toFormat('png')
      .toFile('./public/favicon.ico');

    console.log('✓ Generated favicon.ico (32x32)');
    console.log('\n✅ All favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();