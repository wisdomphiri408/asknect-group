import sharp from 'sharp';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image');
    let resizeWidth = formData.get('resizeWidth');

    if (!imageFile) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
    }

    // Convert image file to buffer
    const buffer = Buffer.from(await imageFile.arrayBuffer());

    // Get image metadata
    const metadata = await sharp(buffer).metadata();
    const fileSizeKB = buffer.length / 1024; // Convert bytes to KB

    // Ensure valid image format
    const allowedFormats = ['jpeg', 'jpg', 'png', 'gif', 'tiff', 'bmp', 'svg', 'avif'];
    if (!metadata.format || !allowedFormats.includes(metadata.format)) {
      return NextResponse.json({ error: 'Unsupported image format' }, { status: 400 });
    }

    // Convert resizeWidth to a valid number
    resizeWidth = parseInt(resizeWidth);
    if (isNaN(resizeWidth) || resizeWidth <= 0) {
      resizeWidth = metadata.width; // Use original width if invalid
    }

    // Adjust compression quality dynamically
    let quality;
    if (fileSizeKB > 1000) {
      quality = 80; // Large file, lower quality
    } else if (fileSizeKB > 500) {
      quality = 85; // Medium file, balanced quality
    } else if (fileSizeKB > 100) {
      quality = 90; // Small file, higher quality
    } else {
      quality = 80; // Tiny files → Keep quality lower to prevent size increase
    }

    // Skip resizing for very small images (<50KB)
    let sharpInstance = sharp(buffer);
    if (fileSizeKB > 50 && resizeWidth < metadata.width) {
      sharpInstance = sharpInstance.resize({ width: resizeWidth });
    }

    // Convert to WebP
    const webpImage = await sharpInstance
      .toFormat('webp', { quality })
      .toBuffer();

    // Return the WebP image
    return new NextResponse(webpImage, {
      headers: {
        'Content-Type': 'image/webp',
        'Content-Disposition': `attachment; filename="${imageFile.name.replace(/\.\w+$/, '.webp')}"`,
      },
    });

  } catch (error) {
    console.error('Error converting image to WebP:', error);
    return NextResponse.json({ error: 'Failed to convert image to WebP' }, { status: 500 });
  }
}
